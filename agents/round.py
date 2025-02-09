import asyncio
import os
from typing import Any

from cdp import Wallet
from crewai import Agent, Crew, Task
from crewai.crews.crew_output import CrewOutput
from web3 import Web3

from utils.configs import FetchConfigs
from utils.define_crews import create_agents_and_tasks
from utils.schema import AgentConfig, AgentOutput, DecisionEnum, RoundData


class Round:
    def __init__(self):
        self.config_fetcher = FetchConfigs()

    def start(self, agents: list[AgentConfig]):
        """
        start executing a voting round
        """
        agents = self.config_fetcher.fetch_agents()

        w3 = self.config_fetcher.w3

        prediction_contract = w3.eth.contract(
            address=self.config_fetcher.prediction_contract_address,
            abi=self.config_fetcher.prediction_abi,
        )
        current_epoch = prediction_contract.functions.currentEpoch().call()
        round_data: list = prediction_contract.functions.rounds(current_epoch).call()
        round_data_obj = self._prepare_round_data(data=round_data)

        # Claiming the rewards in this loop
        for agent in agents:
            claimable: bool = prediction_contract.functions.claimable(
                current_epoch, agent.address
            ).call()

            if claimable:
                claim_epoch = current_epoch - 1

                self._execute_agent_claim_tx(agent=agent, epoch=current_epoch - 1)
                print(f"Claimed for epoch {claim_epoch - 1}!")

                agent_contract = w3.eth.contract(
                    address=agent.address,
                    abi=self.config_fetcher.agent_abi,
                )

                # TODO: line not tested yet!
                balance: float = agent_contract.functions.getAgentTokenBalances.call()
                agent.balance = balance

        crewai_agents, crewai_tasks = create_agents_and_tasks(agent_configs=agents)
        input_prices = self.determine_position(current_epoch=current_epoch)
        agents_decision = asyncio.run(
            self.execute_crews(
                agents=crewai_agents, tasks=crewai_tasks, input_prices=input_prices
            )
        )

        # Writing decisions on contract
        # TODO: how to do write operations with cdp????
        self.execute_decisions(
            current_epoch=current_epoch,
            agents_output=agents_decision,
            prediction_contract=prediction_contract,
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
        self, agents: list[Agent], tasks: list[Task], input_prices: list[dict]
    ) -> list[AgentOutput]:
        """
        Execute the crew's tasks asynchronously with the provided input data.

        Args:
            agents (list[Agent]): The list of agents.
            tasks (list[Task]): The list of tasks to execute.
            input_prices (list[dict]): A list of input dictionaries for prices to be included in tasks.
        """
        results: list[CrewOutput] = []

        crew_tasks = [
            Crew(agents=[agent], tasks=[task]).kickoff_async(inputs=input_prices)
            for agent, task in zip(agents, tasks)
        ]

        # Await all the crews concurrently
        results = await asyncio.gather(*crew_tasks)

        return results

    def execute_decisions(
        self,
        current_epoch: int,
        agents_output: list[AgentOutput],
        prediction_contract: Any,
    ) -> None:
        for agent in agents_output:
            if agent.decision.value == DecisionEnum.BEAR.value:
                # TODO: do a bear decision
                prediction_contract.functions.betBear(
                    agent.amount,
                    current_epoch,
                    agent.thesis,
                ).call()
            elif agent.decision.value == DecisionEnum.BULL.value:
                prediction_contract.functions.betBull(
                    agent.amount,
                    current_epoch,
                    agent.thesis,
                ).call()
            elif agent.decision.value == DecisionEnum.SKIP.value:
                pass

    def _execute_agent_claim_tx(self, agent: AgentConfig, epoch: int):
        # prediction contract's ABI
        abi = self.config_fetcher.prediction_abi
        prediction_contract_address = self.config_fetcher.prediction_contract_address

        invocation = agent.wallet.invoke_contract(
            contract_address=prediction_contract_address,
            abi=abi,
            method="claim",
            args={"to": agent.wallet.addresses, "value": epoch},
        )
        invocation.wait()
