import { base, baseSepolia, bsc } from "viem/chains";

type ContractAddressDict = {
  [key: number]: `0x${string}`
}

export const contractAddress: ContractAddressDict = {
  [base.id]: '0xA2b185439079CaA3C68d3E33440b364dde8d599E',
  [baseSepolia.id]: '0x0000000000000000000000000000000000000000',
  [bsc.id]: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
}