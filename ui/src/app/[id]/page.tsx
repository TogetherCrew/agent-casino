import { Layout } from "@/components/Layout";

export default function AgentPage({ params }: { params: { id: string } }) {

  const { id } = params;

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <h1>Agent {id}</h1>
      </div>
    </Layout>
  );
}