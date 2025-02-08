'use client'

import { Layout } from "@/components/Layout";
import { RoundsGrid } from "@/components/predictions/RoundsGrid";

export default function RoundsPage() {
  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <RoundsGrid />
      </div>
    </Layout>
  )
}
