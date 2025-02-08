import { useOwnerOf } from "@/hooks/agentFactory/useOwnerOf";
import { useAppKitAccount } from "@reown/appkit/react";
import { isAddressEqual } from "viem";
import DepositModal from "./DepositModal";
import WithdrawlModal from "./WithdrawlModal";

export const OwnerActions = ({ agentId }: { agentId: number }) => {
  const { address } = useAppKitAccount();
  const { data: owner } = useOwnerOf(agentId);

  if (!owner || !address || !isAddressEqual(owner as `0x${string}`, address as `0x${string}`)) {
    return null
  }

  return (
    <>
      <DepositModal targetWallet={"0x0000000000000000000000000000000000000000"} />
      <WithdrawlModal agentId={agentId} agentAddress={"0x0000000000000000000000000000000000000000"} />
    </>
  )
}