import { Layout } from "@/components/Layout";
import { AgentGrid } from "@/components/agents/AgentGrid";

export default function AgentsPage() {

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <AgentGrid />
      </div>
    </Layout>
  );
}