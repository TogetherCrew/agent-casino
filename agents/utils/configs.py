import json
from schema import AgentConfig
from web3 import Web3
from web3.contract import Contract
from utils import Credentials, ConfigureCdp
from cdp import Wallet


class FetchAgentConfigs:
    """
    Class responsible for loading agent configurations (e.g., from JSON).
    """

    def __init__(
        self, contract_address: str | None = None, provider: str | None = None
    ):
        """
        Args:
            filepath (str): Path to the JSON configuration file.
        """
        ConfigureCdp().configure()

        self.w3: Web3 = (
            Web3(Web3.HTTPProvider(provider))
            if provider
            else Web3(Web3.HTTPProvider(Credentials().load_web3_provider()))
        )
        self.contract_address: str = (
            contract_address
            if contract_address
            else Credentials().load_contract_address()
        )

        # TODO: update it to be something else
        with open("contract_abi.json", "r") as file:
            contract_abi = json.load(file)
        
        with open("agent_abi.json", "r") as file:
            self.agent_abi = json.load(file)

        self.contract: Contract = self.w3.eth.contract(address=contract_address, abi=contract_abi)

    def fetch(self) -> list[AgentConfig]:
        """
        Fetch agent configurations from a JSON file and parse them into AgentConfig objects.
        TODO: Fetch from on-chain data

        Returns:
            List[AgentConfig]: A list of parsed AgentConfig instances.
        """
        token_counter = self._fetch_token_id_counter()

        agents: list[AgentConfig] = []
        for tokenId in range(1, token_counter):
            address = self.contract.functions.agentWallets(tokenId).call()
            agent_contract = self.w3.eth.contract(address=address, abi=self.agent_abi)
            
            backstory = agent_contract.functions.backstory.call()
            coin_base_wallet_id = agent_contract.functions.coin_base_wallet_id.call()
            name = agent_contract.functions.name.call()

            # Fetch wallets
            wallet = Wallet.fetch(address)

            # prepare the agent
            agent = AgentConfig(name=name, backstory=backstory, coinBaseWalletId=coin_base_wallet_id)
            agents.append(agent)


        # TODO: remove previous codes
        # for agent_data in data["price_predictor"]:
        #     agent = AgentConfig(
        #         name=agent_data["name"],
        #         backstory=agent_data["backstory"],
        #         goal=agent_data.get(
        #             "goal",
        #             "Predict whether the given price data indicates that the price will go up or down.",
        #         ),
        #         balance=agent_data["balance"],
        #     )
        #     agents.append(agent)

        return agents
    
    def _fetch_token_id_counter(self) -> int:
        token_counter: int = self.contract.functions._tokenIdCounter().call()
        return token_counter

    def persist(self, agents_config: list[AgentConfig]):
        raise NotImplementedError
