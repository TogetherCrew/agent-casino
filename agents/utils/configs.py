import json
import logging

from cdp import Cdp, Wallet
from web3 import Web3
from web3.contract import Contract

from utils.credentials import Credentials
from utils.schema import AgentConfig


class FetchConfigs:
    """
    Class responsible for loading agent configurations (e.g., from JSON).
    """

    def __init__(
        self,
        agent_factory_contract_address: str | None = None,
        prediction_contract_address: str | None = None,
        provider: str | None = None,
        agent_factory_contract_abi_file_path: str = "agent_factory_contract_abi.json",
        agent_abi_file_path: str = "agent_abi.json",
        prediction_abi_file_path: str = "prediction_abi.json",
    ):
        """
        Args:
            agent_factory_contract_address (str): the contract address. default to be read from env `AGENT_FACTORY_CONTRACT_ADDRESS`
            provider (str): web3 provider. default to be read from env `WEB3_PROVIDER`
            agent_factory_contract_abi_file_path (str): the contract abi file path. default is `agents/agent_factory_contract_abi.json`
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
        self.agent_factory_contract_address: str = (
            agent_factory_contract_address
            if agent_factory_contract_address
            else credentials.load_contract_address()
        )

        self.prediction_contract_address: str = (
            prediction_contract_address
            if prediction_contract_address
            else credentials.load_prediction_contract_address()
        )

        logging.info("Loading ABIs")

        with open(agent_factory_contract_abi_file_path, "r") as file:
            agent_factory_contract_abi = json.load(file)

        with open(agent_abi_file_path, "r") as file:
            self.agent_abi = json.load(file)

        with open(prediction_abi_file_path, "r") as file:
            self.prediction_abi = json.load(file)

        logging.info("Connecting to web3 contract!")

        self.agent_factory_contract: Contract = self.w3.eth.contract(
            address=self.agent_factory_contract_address, abi=agent_factory_contract_abi
        )

    def fetch_agents(self) -> list[AgentConfig]:
        """
        Fetch agent configurations from a JSON file and parse them into AgentConfig objects.

        Returns:
            List[AgentConfig]: A list of parsed AgentConfig instances.
        """
        token_counter = self._fetch_token_id_counter()

        agents: list[AgentConfig] = []
        for tokenId in range(1, token_counter):
            try:
                logging.info(f"Fetching agent contract {tokenId}/{token_counter - 1}!")

                address = self.agent_factory_contract.functions.agentWallets(
                    tokenId
                ).call()
                agent_contract = self.w3.eth.contract(
                    address=address, abi=self.agent_abi
                )

                bio = agent_contract.functions.bio.call()
                coin_base_wallet_id = agent_contract.functions.walletId.call()
                name = agent_contract.functions.name.call()

                # prepare the agent
                agent = AgentConfig(
                    name=name,
                    bio=bio,
                    coinBaseWalletId=coin_base_wallet_id,
                    address=address,
                )
                agents.append(agent)
            except Exception as exp:
                logging.error(f"Error while fetching the agent id: {tokenId}! {exp}")

        return agents

    def _fetch_token_id_counter(self) -> int:
        token_counter: int = (
            self.agent_factory_contract.functions._tokenIdCounter().call()
        )
        return token_counter

    def persist(self, agents_config: list[AgentConfig]):
        raise NotImplementedError
