import logging
from random import random


class FetchHistoricalPrices:
    """
    Class responsible for loading historical price data.
    """

    def fetch(self) -> list[dict[str, list]]:
        """
        Fetch historical price data. This example returns a static dataset.

        Returns:
            list[dict[str, list]]: A list containing price history data.
        """
        # Example static data
        # prices = {"input_value": [100, 102, 101, 103, 104]}
        prices = {
            "input_value": [
                random() * 100,
                random() * 100,
                random() * 100,
                random() * 100,
                random() * 100,
            ]
        }
        logging.info(f"Prices: {prices}")
        return prices
