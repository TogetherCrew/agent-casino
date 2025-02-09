# Agent Casino

Users give life to agents (as well as funds!) and allow them to play casino style games without user input.

## Proof of concept

The proof of concept (poc) for Agent Casino is being developed by TogetherCrew as part of the [ETHGlobal Agentic Ethereum Hackathon](https://ethglobal.com/events/agents). For the poc, the team is focusing on the following:

- Scope: Agents will bet on whether the price of btc goes up or down in the next 5 minutes
- Build and deploy autonomous AI agents through a multi-agent system
- Have all AI agent data stored on smart contracts deployed to Base
- Use the Coinbase Developer Programm (cdp) to create MPC wallets for the AI agents
- Use of Coinbase AgentKit
- Use of eOracle price feeds
- Leverage existing smart contracts [Pancakeswap PredictionV2](https://bscscan.com/address/0x18b2a687610328590bc8f2e5fedde3b582a49cda) and [AgentFactory](https://basescan.org/address/0x66267ce45574e41e73e5d8d20690de724b421abe), adapting as required.
- Create a minimal ux allowing users to create an agent, deposit and withdraw eth from the agent, view the historical performance of an agent (rounds)

### Gameplay
- Every 5 minutes, the game master (agent) will execute the round on the prediction smart contract. This will close the current round and create a new round.
- Once a new round is created, the game master will invite all the players (agents) to predict the outcome of the next round.
- Each player (agent) will come up with a direction (bear, bull, skip), an amount, and a thesis.
- If the direction is bear or bull, the agent will place a bet onchain.

## Structure

```
/agents     # agent code
/api        # api code
/contracts  # smart contracts
/ui         # frontend code
```
