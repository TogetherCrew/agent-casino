import { useAppKitNetwork } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';
import { ens } from '@/contracts';

const useAvailable = (name: string) => {
  const { chainId } = useAppKitNetwork()

  return useReadContract({
    abi: ens.abi,
    address: ens.contractAddress[chainId as number],
    functionName: 'available',
    args: [name]
  })
}

export default useAvailable;