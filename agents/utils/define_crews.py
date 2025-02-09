import logging
from random import random

from crewai import Agent, Task

from utils.schema import AgentConfig, AgentOutput


def create_agents_and_tasks(
    agent_configs: list[AgentConfig],
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
    logging.info(f"Loaded {len(agent_configs)} Agents!")

    agents = []
    tasks = []
    seed = random()

    task_description = (
        f"Based on your personality, wallet details, and a random seed {seed}, predict if the next value will go 'up' or 'down'. "
        "Explain your reasoning. Also, include the coinBaseWalletId "
        "as part of your response."
    )

    for agent_info in agent_configs:
        agent = Agent(
            role=agent_info.name,
            goal=agent_info.goal,
            bio=agent_info.bio,
        )
        agents.append(agent)

        tasks.append(
            Task(
                description=task_description,
                agent=agent,
                expected_output=(
                    "Return a prediction ('BEAR', 'BULL', or 'SKIP') along with a short thesis. "
                    f"Make sure the investment amount is less than {agent_info.balance}. "
                    "Include all your configuration details as specified."
                ),
                output_pydantic=AgentOutput,
            )
        )
    return agents, tasks
