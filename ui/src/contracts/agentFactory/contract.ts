import { base, baseSepolia } from "viem/chains";

type ContractAddressDict = {
  [key: number]: `0x${string}`
}

export const contractAddress: ContractAddressDict = {
  [base.id]: '0x66267ce45574e41e73e5d8d20690de724b421abe',
  [baseSepolia.id]: '0xB9174f19cF9890b9f901CFE6168D4f09E0cAdd93',
}