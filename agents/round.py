import os

from web3 import Web3
from utils.schema import AgentConfig, AgentOutput, RoundData
from utils.configs import FetchConfigs

class Round:
    def __init__(self):
        self.config_fetcher = FetchConfigs()

    def start(self, agents: list[AgentConfig]):
        """
        start executing a voting round
        """
        agents = self.config_fetcher.fetch_agents()
        
        # TODO: use the below in future
        # w3 = self.config_fetcher.w3

        w3 = self._define_w3_provider()
        
        prediction_contract = w3.eth.contract(
            address=self.config_fetcher.prediction_contract_address,
            abi=self.config_fetcher.prediction_abi,
        )
        current_epoch = prediction_contract.functions.currentEpoch().call()
        round_data: list = prediction_contract.functions.rounds(current_epoch).call()
        round_data_obj = self._prepare_round_data(data=round_data)


        for agent in agents:
            claimable: bool = prediction_contract.functions.claimable(
                current_epoch,
                agent.address
            ).call()

            if claimable:
                claim_epoch = current_epoch - 1

                prediction_contract.functions.claim(claim_epoch)

                nounce = w3.eth.get_transaction_count(agent.address)
                # TODO: claim stuff

            # agent_contract = w3.eth.contract(
            #     address=agent.address,
            #     abi=self.config_fetcher.agent_abi,
            # )



    def _define_w3_provider(self) -> Web3:
        """
        TODO: REMOVE IN FUTURE.
        In our case, our web3 provider would be the same for prediction and other contracts.
        """
        provider = os.getenv("PREDICTION_CONTRACT_WEB3_PROVIDER")
        if not provider:
            raise ValueError("`PREDICTION_CONTRACT_WEB3_PROVIDER` not provided in envs.")
        w3 = Web3(provider=provider)
        return w3
    
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
            oracleCalled=data[13]
        )
        return round_data
