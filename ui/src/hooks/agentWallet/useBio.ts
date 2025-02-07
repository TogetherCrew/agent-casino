import { agentWallet } from '@/contracts';
import { useReadContract } from 'wagmi';

export const useBio = (address: `0x${string}`) => {
  return useReadContract({
    abi: agentWallet.abi,
    address,
    functionName: 'bio',
  })
};
