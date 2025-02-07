"""
An example file showcasing how the agents would be working.
# TODO: Make everything on-chain.
"""

import logging
import asyncio
from crewai import Crew, Agent, Task
from crewai.crews.crew_output import CrewOutput
from dotenv import load_dotenv
from utils.prices import FetchHistoricalPrices
from utils.configs import FetchAgentConfigs
from schema import AgentOutput, AgentConfig


def create_agents_and_tasks(
    agent_configs: list[AgentConfig]
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
    task_description = (
        "Given the historical price data {input_value}, predict if the next value will go 'up' or 'down'. "
        "Explain your reasoning."
    )

    for agent_info in agent_configs:
        agent = Agent(
            role=agent_info.name,
            goal=agent_info.goal,
            backstory=agent_info.backstory,
        )
        agents.append(agent)
        tasks.append(
            Task(
                description=task_description,
                agent=agent,
                expected_output=(
                    "A prediction ('BEAR', 'BULL', or 'SKIP') with a thesis (reasoning) max 1 paragraph for it."
                    f" Please include how much to be invested and it should be less equal than {agent_info.balance}"
                ),
                output_pydantic=AgentOutput,
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

    # Json dump for bets
    # TODO: to be stored on-chain
    import json

    results_data = [
        json.loads(result.tasks_output[0].raw) for result in results
    ]  # Convert each result to a dictionary

    # Save to a JSON file
    with open("results.json", "w", encoding="utf-8") as f:
        json.dump(results_data, f, indent=4)


def main():
    """
    Main function to load configurations, create agents/tasks, and run the asynchronous crew execution.
    """
    load_dotenv()

    # Load agent configuration from a JSON file.
    agent_configs = FetchAgentConfigs("agent_roles.json").fetch()

    # Create agents and tasks related to each
    agents, tasks = create_agents_and_tasks(agent_configs)

    # Define input data for tasks
    # return dict timestamps and prices for each
    input_data = FetchHistoricalPrices().fetch()

    # Run the asynchronous crew execution.
    asyncio.run(execute_crews(agents, tasks, input_data))


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    main()
