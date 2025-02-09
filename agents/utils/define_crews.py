import logging

from crewai import Agent, Task

from utils.schema import AgentConfig, AgentOutput

from random import random

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
    # to be prices in future
    # or community sentiment, or any other things
    seed = random()

    task_description = (
        f"Based on the your personality and a random seed {seed}, predict if the next value will go 'up' or 'down'. "
        "Explain your reasoning."
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
                    "A prediction ('BEAR', 'BULL', or 'SKIP') with a thesis (reasoning) max 1 paragraph for it."
                    f" Please include how much to be invested and it should be less than {agent_info.balance}"
                ),
                output_pydantic=AgentOutput,
            )
        )
    return agents, tasks
