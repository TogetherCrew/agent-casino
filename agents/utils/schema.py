from enum import Enum

from pydantic import BaseModel, Field


class DecisionEnum(str, Enum):
    BEAR = "BEAR"
    BULL = "BULL"
    SKIP = "SKIP"


class AgentOutput(BaseModel):
    decision: DecisionEnum = Field(
        ..., description="The investment decision: BEAR, BULL, or SKIP."
    )
    amount: float = Field(..., description="The amount of investment.")
    thesis: str = Field(..., description="The reasoning behind the decision.")


class AgentConfig(BaseModel):
    name: str = Field(
        ..., description="The name of an Agent. Could also represent the role."
    )
    bio: str = Field(
        ..., description="The bio of what the Agent should be."
    )
    goal: str = Field(
        ...,
        description="What the Agent is trying to achieve",
    )
    coinBaseWalletId: float = Field(..., description="Their wallet id")
