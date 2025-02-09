from enum import Enum

from cdp import Wallet
from pydantic import BaseModel, Field


class DecisionEnum(str, Enum):
    BEAR = "BEAR"
    BULL = "BULL"
    SKIP = "SKIP"


class AgentConfig(BaseModel):
    model_config = {"arbitrary_types_allowed": True}
    name: str = Field(
        ..., description="The name of an Agent. Could also represent the role."
    )
    bio: str = Field(..., description="The bio of what the Agent should be.")
    goal: str = Field(
        "Predict whether the given price data indicates that the price will go up or down.",
        description="What the Agent is trying to achieve",
    )
    walletId: str = Field(..., description="Their wallet id")
    address: str = Field(..., description="Agent wallet address")
    balance: float | None = Field(None, description="The agent's wallet funds balance")


class AgentOutput(BaseModel):
    decision: DecisionEnum = Field(
        ..., description="The investment decision: BEAR, BULL, or SKIP."
    )
    amount: float = Field(..., description="The amount of investment.")
    thesis: str = Field(..., description="The reasoning behind the decision.")
    walletId: str = Field(..., description="Agent wallet wallet_id")


class RoundData(BaseModel):
    epoch: int
    startTimestamp: int
    lockTimestamp: int
    closeTimestamp: int
    lockPrice: int
    closePrice: int
    lockOracleId: int
    closeOracleId: int
    totalAmount: int
    bullAmount: int
    bearAmount: int
    rewardBaseCalAmount: int
    rewardAmount: int
    oracleCalled: bool
