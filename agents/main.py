import asyncio
import logging

from crewai import Agent, Crew, Task
from crewai.crews.crew_output import CrewOutput
from dotenv import load_dotenv

from utils.configs import FetchConfigs
from utils.define_crews import create_agents_and_tasks
from utils.prices import FetchHistoricalPrices


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
    agent_configs = FetchConfigs().fetch_agents()

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
