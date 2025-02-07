import logging
import json

from cdp import Cdp
from utils.schema import AgentConfig
from utils.credentials import Credentials
from web3 import Web3
from web3.contract import Contract


class FetchAgentConfigs:
    """
    Class responsible for loading agent configurations (e.g., from JSON).
    """

    def __init__(
        self,
        contract_address: str | None = None,
        provider: str | None = None,
        contract_abi_file_path: str = "contract_abi.json",
        agent_abi_file_path: str = "agent_abi.json",
    ):
        """
        Args:
            contract_address (str): the contract address. default to be read from env `CONTRACT_ADDRESS`
            provider (str): web3 provider. default to be read from env `WEB3_PROVIDER`
            contract_abi_file_path (str): the contract abi file path. default is `agents/contract_abi.json`
            agent_abi_file_path (str): the contract abi file path. default is `agents/agent_abi.json`
        """
        credentials = Credentials()

        logging.info("Configuring CDP!")
        cdp_creds = credentials.load_cdp_credentials()
        Cdp.configure(
            api_key_name=cdp_creds["api_key_name"],
            private_key=cdp_creds["private_key"],
        )

        logging.info("Connecting to the web3 provider!")
        self.w3: Web3 = (
            Web3(Web3.HTTPProvider(provider))
            if provider
            else Web3(Web3.HTTPProvider(credentials.load_web3_provider()))
        )
        self.contract_address: str = (
            contract_address
            if contract_address
            else credentials.load_contract_address()
        )

        logging.info("Loading ABIs")

        with open(contract_abi_file_path, "r") as file:
            contract_abi = json.load(file)

        with open(agent_abi_file_path, "r") as file:
            self.agent_abi = json.load(file)

        logging.info("Connecting to web3 contract!")

        self.contract: Contract = self.w3.eth.contract(
            address=self.contract_address, abi=contract_abi
        )

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
            logging.info(f"Fetching agent contract {tokenId}/{token_counter}!")

            address = self.contract.functions.agentWallets(tokenId).call()
            agent_contract = self.w3.eth.contract(address=address, abi=self.agent_abi)

            bio = agent_contract.functions.bio.call()
            coin_base_wallet_id = agent_contract.functions.coin_base_wallet_id.call()
            name = agent_contract.functions.name.call()

            # Fetch wallets
            # wallet = Wallet.fetch(address)

            # prepare the agent
            agent = AgentConfig(
                name=name, bio=bio, coinBaseWalletId=coin_base_wallet_id
            )
            agents.append(agent)

        # TODO: remove previous codes
        # for agent_data in data["price_predictor"]:
        #     agent = AgentConfig(
        #         name=agent_data["name"],
        #         bio=agent_data["bio"],
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
