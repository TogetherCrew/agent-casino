import json
from schema import AgentConfig


class FetchAgentConfigs:
    """
    Class responsible for loading agent configurations (e.g., from JSON).
    """

    def __init__(self, filepath: str):
        """
        Args:
            filepath (str): Path to the JSON configuration file.
        """
        self.filepath = filepath

    def fetch(self) -> list[AgentConfig]:
        """
        Fetch agent configurations from a JSON file and parse them into AgentConfig objects.
        TODO: Fetch from on-chain data

        Returns:
            List[AgentConfig]: A list of parsed AgentConfig instances.
        """
        with open(self.filepath, "r") as file:
            data = json.load(file)

        # Here we assume the JSON has a key "price_predictor" that contains a list of agents.
        # We map each dictionary to our AgentConfig model by renaming "role" to "name".
        agents = []
        for agent_data in data["price_predictor"]:
            agent = AgentConfig(
                name=agent_data["name"],
                backstory=agent_data["backstory"],
                goal=agent_data.get(
                    "goal",
                    "Predict whether the given price data indicates that the price will go up or down.",
                ),
                balance=agent_data["balance"],
            )
            agents.append(agent)

        return agents

    def persist(self, agents_config: list[AgentConfig]):
        raise NotImplementedError
