import { agentFactory } from "@/contracts"
import { useAppKitNetwork } from "@reown/appkit/react"
import { useReadContract } from "wagmi"

export const useTokenIdCounter = () => {
  const { chainId } = useAppKitNetwork()
  return useReadContract({
    abi: agentFactory.abi,
    address: agentFactory.contractAddress[chainId as number],
    functionName: '_tokenIdCounter'
  })
}