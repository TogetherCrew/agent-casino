import { useAppKitNetwork } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';
import { ens } from '@/contracts';

const useAvailable = (name: string, duration: number) => {
  const { chainId } = useAppKitNetwork()

  return useReadContract({
    abi: ens.abi,
    address: ens.contractAddress[chainId as number],
    functionName: 'registerPrice',
    args: [name, duration]
  })
}

export default useAvailable;