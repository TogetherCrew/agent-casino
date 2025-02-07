import os
from dotenv import load_dotenv


class Credentials:
    def __init__(self):
        load_dotenv()

    def load_web3_provider(self) -> str:
        provider = os.getenv("WEB3_PROVIDER")
        if provider is None:
            raise ValueError("WEB3_PROVIDER doesn't exist!")

        return provider

    def load_contract_address(self) -> str:
        contract_address = os.getenv("CONTRACT_ADDRESS")
        if contract_address is None:
            raise ValueError("CONTRACT_ADDRESS doesn't exist!")

        return contract_address

    def load_cdp_credentials(self) -> dict[str, str]:
        api_key_name = os.getenv("CDP_API_KEY_NAME")
        private_key = os.getenv("CDP_API_KEY_PRIVATE_KEY")

        # To avoid parsing errors
        private_key = private_key.replace("\\n", "\n")

        return {
            "api_key_name": api_key_name,
            "private_key": private_key,
        }
