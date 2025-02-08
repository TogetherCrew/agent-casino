import { Layout } from "@/components/Layout";
import Link from "next/link";

export default function Home() {

  return (
    <Layout>
      <Link href="/agents">Agents</Link>
    </Layout>
  );
}