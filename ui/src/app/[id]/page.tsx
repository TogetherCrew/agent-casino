'use client'

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { useParams } from "next/navigation";

export default function AgentPage() {
  const params = useParams();

  const { id } = params;

  if (!id) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <h1>Agent {id}</h1>
      </div>
    </Layout>
  );
}