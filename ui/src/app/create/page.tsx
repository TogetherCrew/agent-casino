import CreateAgentForm from "@/components/agents/form/CreateAgentForm";
import { Layout } from "@/components/Layout";

export default function Home() {

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <h1 className="text-2xl font-bold">Create Agent</h1>
        <CreateAgentForm />
      </div>
    </Layout>
  );
}