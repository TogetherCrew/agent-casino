from cdp import Cdp
from utils.credentials import Credentials


class ConfigureCdp:
    def __init__(self):
        pass

    def configure(self) -> None:
        credentials = Credentials().load_cdp_credentials()
        Cdp.configure(
            api_key_name=credentials["api_key_name"],
            private_key=credentials["private_key"],
        )
