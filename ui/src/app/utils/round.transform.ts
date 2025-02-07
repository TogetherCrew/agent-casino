export type Round = {
  epoch: bigint;
  startTimestamp: bigint;
  lockTimestamp: bigint;
  closeTimestamp: bigint;
  lockPrice: bigint;
  closePrice: bigint;
  lockOracleId: bigint;
  closeOracleId: bigint;
  totalAmount: bigint;
  bullAmount: bigint;
  bearAmount: bigint;
  rewardBaseCalAmount: bigint;
  rewardAmount: bigint;
  oracleCalled: boolean;
}

export type RawRound = [
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  boolean
]

export const transformRound = (data: RawRound): Round => {
  return {
    epoch: data[0],
    startTimestamp: data[1],
    lockTimestamp: data[2],
    closeTimestamp: data[3],
    lockPrice: data[4],
    closePrice: data[5],
    lockOracleId: data[6],
    closeOracleId: data[7],
    totalAmount: data[8],
    bullAmount: data[9],
    bearAmount: data[10],
    rewardBaseCalAmount: data[11],
    rewardAmount: data[12],
    oracleCalled: data[13]
  } as Round;
}