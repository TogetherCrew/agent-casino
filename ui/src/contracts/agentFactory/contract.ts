import { base, baseSepolia } from "viem/chains";

type ContractAddressDict = {
  [key: number]: `0x${string}`
}

export const contractAddress: ContractAddressDict = {
  [base.id]: '0xC0dcE02d690D70E116A08A840FedFcA289AdA514',
  [baseSepolia.id]: '0x823aDd76b190b27F5C5F0a9aD07d845f55f540AB',
}