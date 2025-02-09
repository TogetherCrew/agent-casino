import logging
import time

import schedule
from dotenv import load_dotenv

from round import Round


def job():
    """
    Job function that creates a Round instance and starts it.
    """
    round_instance = Round()
    try:
        round_instance.execute_round()
        round_instance.start()
    except Exception as exp:
        logging.error(f"Running Round failed with exp: {exp}")

def main():
    """
    Main function that loads configurations and schedules the job to run every 5 minutes.
    """
    load_dotenv()

    # Schedule the job to run every 5 minutes
    schedule.every(5).minutes.do(job)

    logging.info("Scheduler started. Running round.start() every 5 minutes.")

    # Keep running pending scheduled tasks
    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    # job()
    main()
