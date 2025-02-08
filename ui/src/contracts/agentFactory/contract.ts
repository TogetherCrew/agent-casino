import { base, baseSepolia } from "viem/chains";

type ContractAddressDict = {
  [key: number]: `0x${string}`
}

export const contractAddress: ContractAddressDict = {
  [base.id]: '0x66267ce45574e41e73e5d8d20690de724b421abe',
  [baseSepolia.id]: '0x823aDd76b190b27F5C5F0a9aD07d845f55f540AB',
}