import { base, baseSepolia } from "viem/chains";

type ContractAddressDict = {
  [key: number]: `0x${string}`
}

export const contractAddress: ContractAddressDict = {
  [base.id]: '0x66267ce45574e41e73e5d8d20690de724b421abe',
  [baseSepolia.id]: '0x0000000000000000000000000000000000000000',
}