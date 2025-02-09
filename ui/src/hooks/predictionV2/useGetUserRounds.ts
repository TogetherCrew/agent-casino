import { predictionV2 } from '@/contracts';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';

export const useGetUserRounds = (user: `0x${string}`, cursor: bigint, size: bigint) => {
  const { chainId } = useAppKitNetwork();

  console.log(`Loading from ${cursor + size} to ${cursor}`);

  return useReadContract({
    abi: predictionV2.abi,
    address: predictionV2.contractAddress[chainId as number],
    functionName: 'getUserRounds',
    args: [user, cursor, size],
  })
};
