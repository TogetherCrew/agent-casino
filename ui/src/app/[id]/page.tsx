'use client'

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { useParams } from "next/navigation";
import { AgentHero } from "@/components/agents/AgentHero";

export default function AgentPage() {
  const params = useParams();
  const { id } = params;

  if (!id) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <AgentHero agentId={Number(id)} />
        <div className="bg-gray-200 p-4 py-40 rounded-lg text-gray-500">Placeholder Outcome Data</div>
      </div>
    </Layout>
  );
}