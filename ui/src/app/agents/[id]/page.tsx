'use client'

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { useParams } from "next/navigation";
import { AgentHero } from "@/components/agents/AgentHero";
import AgentRounds from "@/components/agents/AgentRounds";
import { useState, useEffect } from "react";
import { useAppKitNetwork } from "@reown/appkit/react";
export default function AgentPage() {
  const params = useParams();
  const { id } = params;
  const [fundingAddress, setFundingAddress] = useState<`0x${string}` | null>(null);
  const { chainId } = useAppKitNetwork();

  useEffect(() => {
    (async () => {

      const fetchFundingWallet = async () => {
        const response = await fetch(`https://onchain.togethercrew.de/api/v1/mpc-wallet/${chainId}/${id}/funding-wallet`);
        const data = await response.json();
        return data.fundingAddress;
      }

      const fundingAddress = await fetchFundingWallet();
      setFundingAddress(fundingAddress);
    })();
  }, [chainId, id]);

  if (!id || !fundingAddress) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <div className="flex flex-col gap-4 divide-y divide-gray-200">
          <AgentHero agentId={Number(id)} fundingAddress={fundingAddress as `0x${string}`} />
          <AgentRounds address={fundingAddress as `0x${string}`} />
        </div>
      </div>
    </Layout>
  );
}