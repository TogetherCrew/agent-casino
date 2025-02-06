from pydantic import BaseModel, Field
from enum import Enum


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
    backstory: str = Field(
        ..., description="The backstory of what the Agent should be."
    )
    goal: str = Field(
        ...,
        description="What the Agent is trying to achieve",
    )
    balance: float = Field(..., description="Their wallet balance")
