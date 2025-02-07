
// Enum to represent the Position type
export enum Position {
  Bull,
  Bear
}

// Interface for the BetInfo struct
interface BetInfo {
  position: Position;
  amount: bigint;  // uint256 maps to bigint in TypeScript
  claimed: boolean;
}

export interface UserRound {
  epoch: bigint;
  bet: BetInfo;
}

export const transformUserRounds = (data: [bigint[], BetInfo[], bigint]): UserRound[] => {
  const epochs = data[0];
  const bets = data[1];

  if (epochs.length !== bets.length) {
    throw new Error("Epochs and bets length mismatch");
  }

  const transformed = [];

  for (let i = 0; i < epochs.length; i++) {
    const epoch = epochs[i];
    const bet = bets[i];

    const transformedRound = {
      epoch: epoch,
      bet: bet,
    }
    transformed.push(transformedRound);
  }
  return transformed;
}


