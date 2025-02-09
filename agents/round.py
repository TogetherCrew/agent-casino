import asyncio
import logging

from cdp import Wallet
from crewai import Agent, Crew, Task
from crewai.crews.crew_output import CrewOutput

from utils.configs import FetchConfigs
from utils.define_crews import create_agents_and_tasks
from utils.schema import AgentConfig, AgentOutput, DecisionEnum, RoundData


class Round:
    def __init__(self):
        self.config_fetcher = FetchConfigs()

    def start(self):
        """
        start executing a voting round
        """
        agents = asyncio.run(self.config_fetcher.fetch_agents_concurrently())

        w3 = self.config_fetcher.w3

        prediction_contract = w3.eth.contract(
            address=self.config_fetcher.prediction_contract_address,
            abi=self.config_fetcher.prediction_abi,
        )
        current_epoch = prediction_contract.functions.currentEpoch().call()

        # Claiming the rewards in this loop
        for agent in agents:
            claimable: bool = prediction_contract.functions.claimable(
                current_epoch, agent.address
            ).call()

            if claimable:
                claim_epoch = current_epoch - 1

                self._execute_agent_claim_tx(agent=agent, epoch=current_epoch - 1)
                logging.info(f"Claimed for epoch {claim_epoch - 1}!")

            wallet = self._get_wallet(agent_wallet_id=agent.walletId)
            agent.balance = wallet.balance("eth")

        crewai_agents, crewai_tasks = create_agents_and_tasks(agent_configs=agents)
        agents_decision = asyncio.run(
            self.execute_crews(agents=crewai_agents, tasks=crewai_tasks)
        )

        self.execute_decisions(
            current_epoch=current_epoch,
            agents_output=agents_decision,
            agent_configs=agents,
        )

    def _prepare_round_data(self, data: list[int | bool]) -> RoundData:
        round_data = RoundData(
            epoch=data[0],
            startTimestamp=data[1],
            lockTimestamp=data[2],
            closeTimestamp=data[3],
            lockPrice=data[4],
            closePrice=data[5],
            lockOracleId=data[6],
            closeOracleId=data[7],
            totalAmount=data[8],
            bullAmount=data[9],
            bearAmount=data[10],
            rewardBaseCalAmount=data[11],
            rewardAmount=data[12],
            oracleCalled=data[13],
        )
        return round_data

    def determine_position(self, current_epoch: int) -> dict[str, str]:
        """
        Use Epoch to get OracleIDs and then call oracle to get price for OracleId
        """
        raise NotImplementedError

    async def execute_crews(
        self, agents: list[Agent], tasks: list[Task]
    ) -> list[CrewOutput]:
        """
        Execute the crew's tasks asynchronously with the provided input data.

        Args:
            agents (list[Agent]): The list of agents.
            tasks (list[Task]): The list of tasks to execute.
        """
        results: list[CrewOutput] = []

        crew_tasks = [
            Crew(agents=[agent], tasks=[task]).kickoff_async()
            for agent, task in zip(agents, tasks)
        ]

        # Await all the crews concurrently
        results = await asyncio.gather(*crew_tasks)

        return results

    def execute_decisions(
        self,
        current_epoch: int,
        agents_output: list[CrewOutput],
        agent_configs: list[AgentConfig],
    ) -> None:
        for idx, agent in enumerate(agents_output):
            agent_output: AgentOutput = agent.pydantic
            try:
                self._execute_agent_decision(
                    agent=agent_output,
                    epoch=current_epoch,
                    agent_config=agent_configs[idx],
                )
            except Exception as exp:
                logging.error(
                    f"Errors while executing decision for agent {agent_configs[idx].walletId} decision. Exp: {exp}"
                )

    def _execute_agent_claim_tx(self, agent: AgentConfig, epoch: int):
        # prediction contract's ABI
        abi = self.config_fetcher.prediction_abi
        prediction_contract_address = self.config_fetcher.prediction_contract_address
        wallet = self._get_wallet(agent_wallet_id=agent.walletId)

        invocation = wallet.invoke_contract(
            contract_address=prediction_contract_address,
            abi=abi,
            method="claim",
            args={"epochs": [epoch]},
        )
        invocation.wait()

    def _execute_agent_decision(self, agent: AgentOutput, epoch: int, agent_config: AgentConfig) -> None:
        abi = self.config_fetcher.prediction_abi
        prediction_contract_address = self.config_fetcher.prediction_contract_address

        wallet = self._get_wallet(agent_wallet_id=agent_config.walletId)

        method: str
        if agent.decision.value == DecisionEnum.BEAR.value:
            method = "betBear"
        elif agent.decision.value == DecisionEnum.BULL.value:
            method = "betBull"
        elif agent.decision.value == DecisionEnum.SKIP.value:
            return

        print("agent.amount", agent.amount)
        invocation = wallet.invoke_contract(
            contract_address=prediction_contract_address,
            abi=abi,
            method=method,
            # args={"epoch": int(epoch), "thesis": agent.thesis, "value": 0},
            args={"epoch": str(epoch), "thesis": agent.thesis},
            amount="0.00000001",
            asset_id="eth",
        )
        invocation.wait()
        logging.info(f"Agent {agent_config.walletId} successfully decided!")

    def _get_wallet(self, agent_wallet_id: str) -> Wallet:
        return Wallet.fetch(wallet_id=agent_wallet_id)
