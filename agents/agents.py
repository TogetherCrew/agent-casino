"""
An example file showcasing how the agents would be working.
# TODO: Make everything on-chain.
"""

import asyncio
import json
from crewai import Crew, Agent, Task
from crewai.crews.crew_output import CrewOutput
from dotenv import load_dotenv


def load_agent_config(filepath: str) -> dict:
    """
    Load agent configurations from a JSON file.
    TODO: Load from on-chain data.

    Args:
        filepath (str): Path to the JSON configuration file.

    Returns:
        dict: The parsed agent configuration data.
    """
    with open(filepath, "r") as file:
        return json.load(file)


def create_agents_and_tasks(
    agent_configs: dict, config_key: str
) -> tuple[list[Agent], list[Task]]:
    """
    Create agents and tasks based on a specific configuration key.

    Args:
        agent_configs (dict): The full agent configuration data.
        config_key (str): The key to extract specific agent configurations (e.g., "price_predictor").

    Returns:
        tuple[list[Agent], list[Task]]: A tuple containing a list of Agent objects and a list of Task objects.

    Raises:
        ValueError: If the specified configuration key is not found.
    """
    price_agent_config = agent_configs.get(config_key)
    if not price_agent_config:
        raise ValueError(
            f"{config_key} configuration not found in the agent configuration file."
        )

    print(f"Loaded {len(price_agent_config)} Agents!")

    agents = []
    tasks = []
    task_description = (
        "Given the historical price data {input_value}, predict if the next value will go 'up' or 'down'. "
        "Explain your reasoning."
    )

    for agent_info in price_agent_config:
        agent = Agent(
            role=agent_info["role"],
            goal=agent_info["goal"],
            backstory=agent_info["backstory"],
            allow_code_execution=True,
        )
        agents.append(agent)
        tasks.append(
            Task(
                description=task_description,
                agent=agent,
                expected_output="A prediction ('up' or 'down') with reasoning.",
            )
        )
    return agents, tasks


async def execute_crews(
    agents: list[Agent], tasks: list[Task], input_data: list[dict]
) -> None:
    """
    Execute the crew's tasks asynchronously with the provided input data.

    Args:
        agents (list[Agent]): The list of agents.
        tasks (list[Task]): The list of tasks to execute.
        input_data (list[dict]): A list of input dictionaries for the tasks.
    """
    results: list[CrewOutput] = []

    crew_tasks = [
        Crew(agents=[agent], tasks=[task]).kickoff_async(inputs=input_data)
        for agent, task in zip(agents, tasks)
    ]

    # Await all the crews concurrently
    results = await asyncio.gather(*crew_tasks)

    for i, result in enumerate(results, 1):
        print("-" * 40)
        print(f"Crew {i} Result:", result)


def load_prices() -> list[dict[str, list]]:
    """
    TODO: Read price histories
    """
    # returning something static
    prices = {"input_value": [100, 102, 101, 103, 104]}
    return prices


def main():
    """
    Main function to load configurations, create agents/tasks, and run the asynchronous crew execution.
    """
    load_dotenv()

    # Load agent configuration from a JSON file.
    agent_configs = load_agent_config("agent_roles.json")

    # Create agents and tasks using the 'price_predictor' configuration.
    agents, tasks = create_agents_and_tasks(agent_configs, "price_predictor")

    # Define input data for tasks.
    input_data = load_prices()

    # Run the asynchronous crew execution.
    asyncio.run(execute_crews(agents, tasks, input_data))


if __name__ == "__main__":
    main()
