import { useAgentWallets } from "@/hooks/agentFactory/useAgentWallets";
import { useName } from "@/hooks/agentWallet/useName";
import { useWalletId } from "@/hooks/agentWallet/useWalletId";
import Link from "next/link"


const LiveBadge = () => {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-medium text-black">
      <span className="mr-1 h-2 w-2 rounded-full bg-green-400"></span>
      <span>Live</span>
    </span>
  )
}

const PendingBadge = () => {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-medium text-black">
      <span className="mr-1 h-2 w-2 rounded-full bg-orange-400"></span>
      <span>Pending</span>
    </span>
  )
}

export const AgentCard = ({ agentId, isOwnerAgent }: { agentId: number, isOwnerAgent: boolean }) => {

  const { data: agentWallets } = useAgentWallets(agentId);
  const { data: name } = useName(agentWallets as `0x${string}`);
  const { data: walletId } = useWalletId(agentWallets as `0x${string}`);

  return (
    <Link href={`/agents/${agentId}`}>
      <div className="bg-black text-white rounded-lg p-4 flex flex-col justify-between gap-12 hover:cursor-pointer hover:opacity-80">

        <div className="flex justify-between">
          <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-medium text-black">
            {walletId ? <LiveBadge /> : <PendingBadge />}
          </span>
          {isOwnerAgent ? (
            <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-medium text-black">
              Your Agent
            </span>
          ) : <span></span>}
        </div>

        <div className="text-center">
          <h3 className="text-xs">Agent {agentId}</h3>
          <h2 className="text-xl font-semibold">{name as string}</h2>
        </div>

        <div>
          <span className="text-xs text-white">
            Balance: 0.00 ETH
          </span>
        </div>
      </div>
    </Link >
  )
}