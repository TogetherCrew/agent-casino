import { useOwnerOf } from "@/hooks/agentFactory/useOwnerOf";
import { useAppKitAccount } from "@reown/appkit/react";
import { isAddressEqual } from "viem";
import DepositModal from "./DepositModal";
import WithdrawlModal from "./WithdrawlModal";

export const OwnerActions = ({ agentId, fundingAddress }: { agentId: number, fundingAddress: `0x${string}` | null }) => {
  const { address } = useAppKitAccount();
  const { data: owner } = useOwnerOf(agentId);

  if (!owner || !address || !isAddressEqual(owner as `0x${string}`, address as `0x${string}`) || !fundingAddress) {
    return null
  }

  return (
    <>
      <DepositModal targetWallet={fundingAddress} />
      <WithdrawlModal agentId={agentId} agentAddress={fundingAddress} />
    </>
  )
}