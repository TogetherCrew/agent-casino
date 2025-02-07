import { useAgentWallets } from "@/hooks/agentFactory/useAgentWallets";
import { useName } from "@/hooks/agentWallet/useName";
import { useBio } from "@/hooks/agentWallet/useBio";
import { Loading } from "../Loading";
import { OwnerActions } from "./OwnerActions";

export const AgentHero = ({ agentId }: { agentId: number }) => {
  const { data: agentWallets } = useAgentWallets(agentId);
  const { data: name } = useName(agentWallets as `0x${string}`);
  const { data: bio } = useBio(agentWallets as `0x${string}`);

  if (!agentWallets || !name || !bio) {
    return <Loading />
  }

  return (
    <>
      <div className="bg-black text-white rounded-lg p-4 flex flex-col justify-between gap-3">
        <div className="flex justify-between text-xs">
          <h2>Agent {agentId}</h2>
          <div className="flex gap-2 items-center">
            <span>Balance: 0.00 ETH</span>
            <OwnerActions agentId={agentId} />
          </div>
        </div>
        <h1 className="text-2xl font-bold">{name as string}</h1>
        <div></div>
      </div>
      <div className="bg-white text-black p-4 flex flex-col justify-between gap-3">
        <p className="text-sm">{bio as string}</p>
      </div>
    </>
  )
}