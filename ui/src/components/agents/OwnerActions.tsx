import { useOwnerOf } from "@/hooks/agentFactory/useOwnerOf";
import { useAppKitAccount } from "@reown/appkit/react";
import { isAddressEqual } from "viem";

export const OwnerActions = ({ agentId }: { agentId: number }) => {
  const { address } = useAppKitAccount();
  const { data: owner } = useOwnerOf(agentId);

  if (!owner || !address || !isAddressEqual(owner as `0x${string}`, address as `0x${string}`)) {
    return null
  }

  return (
    <div>
      <div className="inline-flex">
        <button className="border border-white bg-transparent text-white px-4 py-2 rounded-l-full hover:bg-white hover:text-black hover:cursor-pointer">Deposit</button>
        <button className="border-y border-r border-white bg-transparent text-white px-4 py-2 rounded-r-full hover:bg-white hover:text-black hover:cursor-pointer">Withdraw</button>
      </div>
    </div>
  )
}