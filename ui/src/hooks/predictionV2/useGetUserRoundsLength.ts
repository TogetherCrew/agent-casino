import { predictionV2 } from '@/contracts';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';

export const useGetUserRoundsLength = (address: `0x${string}`) => {
  const { chainId } = useAppKitNetwork();

  return useReadContract({
    abi: predictionV2.abi,
    address: predictionV2.contractAddress[chainId as number],
    functionName: 'getUserRoundsLength',
    args: [address],
  })
};
