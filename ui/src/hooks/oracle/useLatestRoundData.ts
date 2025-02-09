import { useAppKitNetwork } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';
import { oracle } from '@/contracts';

const useLatestRoundData = () => {
  const { chainId } = useAppKitNetwork()

  return useReadContract({
    abi: oracle.abi,
    address: oracle.contractAddress[chainId as number],
    functionName: 'latestRoundData',
  })
}

export default useLatestRoundData;