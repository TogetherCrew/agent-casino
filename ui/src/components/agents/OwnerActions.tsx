import { useOwnerOf } from "@/hooks/agentFactory/useOwnerOf";
import { useAppKitAccount } from "@reown/appkit/react";
import { isAddressEqual } from "viem";
import DepositModal from "./DepositModal";

export const OwnerActions = ({ agentId }: { agentId: number }) => {
  const { address } = useAppKitAccount();
  const { data: owner } = useOwnerOf(agentId);

  if (!owner || !address || !isAddressEqual(owner as `0x${string}`, address as `0x${string}`)) {
    return null
  }

  return (
    <>
      <DepositModal targetWallet={"0x0000000000000000000000000000000000000000"} />
      <button className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80 hover:cursor-pointer w-full">Withdraw</button>
    </>
  )
}