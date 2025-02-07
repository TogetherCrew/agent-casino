import { agentFactory } from '@/contracts';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';

export const useGetAgentsByOwner = () => {
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useReadContract({
    abi: agentFactory.abi,
    address: agentFactory.contractAddress[chainId as number],
    functionName: 'getAgentsByOwner',
    args: [address]
  })
};
