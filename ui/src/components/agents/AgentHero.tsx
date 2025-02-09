import { useAgentWallets } from "@/hooks/agentFactory/useAgentWallets";
import { useName } from "@/hooks/agentWallet/useName";
import { useBio } from "@/hooks/agentWallet/useBio";
import { Loading } from "../Loading";
import { OwnerActions } from "./OwnerActions";
import { CardHeader } from "../card/CardHeader";
import { Card } from "../card/Card";
import { useBalance } from "wagmi";
import { formatEther } from "viem";

export const AgentHero = ({ agentId, fundingAddress }: { agentId: number, fundingAddress: `0x${string}` }) => {
  const { data: agentWallets } = useAgentWallets(agentId);
  const { data: name } = useName(agentWallets as `0x${string}`);
  const { data: bio } = useBio(agentWallets as `0x${string}`);

  const { data: balance } = useBalance({ address: fundingAddress as `0x${string}` });

  if (!agentWallets || !name || !bio) {
    return <Loading />
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-2/3">
          <Card>
            <div className="flex flex-col justify-between gap-4">
              <CardHeader>Charcter</CardHeader>
              <h1 className="flex flex-col">
                <span className="text-lg font-semibold">{name as string}</span>
                <span className="text-gray-600 text-xs font-semibold uppercase">Agent #{agentId}</span>
              </h1>
              <p className="text-gray-600 text-sm">{bio as string}</p>
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          <Card>
            <div className="flex flex-col justify-between gap-4">
              <CardHeader>Balance</CardHeader>
              <div className="flex flex-col">
                <p className="text-2xl font-semibold">{formatEther(balance?.value as bigint || BigInt(0)).slice(0, 10)} ETH</p>
                <p className="text-xs font-semibold text-gray-400">{fundingAddress}</p>
              </div>
              <div className="flex gap-2 w-full">
                <OwnerActions agentId={agentId} fundingAddress={fundingAddress} />
              </div>
            </div>
          </Card>
        </div>
      </div >
    </>
  )
}