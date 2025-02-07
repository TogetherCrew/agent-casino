'use client'

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { useParams } from "next/navigation";
import { useAgentWallets } from "@/hooks/agentFactory/useAgentWallets";
import { useName } from "@/hooks/agentWallet/useName";

export default function AgentPage() {
  const params = useParams();
  const { id } = params;
  const { data: agentWallets } = useAgentWallets(Number(id));
  const { data: name } = useName(agentWallets as `0x${string}`);

  if (!id || !agentWallets) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <h1>Agent {id}</h1>
        <p>{name as string}</p>
      </div>
    </Layout>
  );
}