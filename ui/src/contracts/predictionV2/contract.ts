import { base, baseSepolia, bsc } from "viem/chains";

type ContractAddressDict = {
  [key: number]: `0x${string}`
}

export const contractAddress: ContractAddressDict = {
  [base.id]: '0x0000000000000000000000000000000000000000',
  [baseSepolia.id]: '0x273dd34BE112DfAE87D36e32E0674794cA444596',
  [bsc.id]: '0x18b2a687610328590bc8f2e5fedde3b582a49cda',
}