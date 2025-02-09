import { agentFactory } from '@/contracts';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';

export const useOwnerOf = (agentId: number) => {
  const { chainId } = useAppKitNetwork();

  return useReadContract({
    abi: agentFactory.abi,
    address: agentFactory.contractAddress[chainId as number],
    functionName: 'ownerOf',
    args: [agentId]
  })
};
