import { base, baseSepolia } from "viem/chains";

type ContractAddressDict = {
  [key: number]: `0x${string}`
}

export const contractAddress: ContractAddressDict = {
  [base.id]: '0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5',
  [baseSepolia.id]: '0x0000000000000000000000000000000000000000',
}