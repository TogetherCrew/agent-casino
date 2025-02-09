import { base, baseSepolia, bsc } from "viem/chains";

type ContractAddressDict = {
  [key: number]: `0x${string}`
}

export const contractAddress: ContractAddressDict = {
  [base.id]: '0x08681ED27a6f80436E7E68F3daae0e8BC56c7517',
  [baseSepolia.id]: '0x8FED0786a3047b916FcBCD3d31a21bBaaDd09a0C',
  [bsc.id]: '0x18b2a687610328590bc8f2e5fedde3b582a49cda',
}