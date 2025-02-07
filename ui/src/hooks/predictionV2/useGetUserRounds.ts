import { predictionV2 } from '@/contracts';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';

export const useGetUserRounds = (user: `0x${string}`, cursor: number, size: number) => {
  const { chainId } = useAppKitNetwork();

  return useReadContract({
    abi: predictionV2.abi,
    address: predictionV2.contractAddress[chainId as number],
    functionName: 'getUserRounds',
    args: [user, BigInt(cursor), BigInt(size)],
  })
};
