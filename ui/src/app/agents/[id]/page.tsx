'use client'

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { useParams } from "next/navigation";
import { AgentHero } from "@/components/agents/AgentHero";
import AgentRounds from "@/components/agents/AgentRounds";

export default function AgentPage() {
  const params = useParams();
  const { id } = params;

  const address = "0x36593086d9450E48B172bFC9A4a69AC879abDB5A"; // TODO: get address from user

  if (!id) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <div className="flex flex-col gap-4 divide-y divide-gray-200">
          <AgentHero agentId={Number(id)} />
          <AgentRounds address={address} />
        </div>
      </div>
    </Layout>
  );
}