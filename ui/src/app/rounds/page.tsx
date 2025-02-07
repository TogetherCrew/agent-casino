'use client'

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { Pagination } from "@/components/rounds/Pagination";
import { RoundsList } from "@/components/rounds/RoundsList";
import { useGetUserRoundsLength } from "@/hooks/predictionV2/useGetUserRoundsLength";
import { useState } from "react";

export default function RoundsPage() {

  const size = 10;
  const address = "0xaE397eCb473cf32341B8eB84cB4bcc5e1Bfa9877"; // TODO: get address from user
  const { data: roundsLength } = useGetUserRoundsLength(address);
  const [cursor, setCursor] = useState(0);
  if (!roundsLength) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <h2 className="text-2xl font-bold">{roundsLength} Rounds</h2>
        <Pagination
          totalItems={Number(roundsLength)}
          itemsPerPage={size}
          onPageChange={setCursor}
        />
        <RoundsList cursor={cursor} size={size} address={address} />
        <Pagination
          totalItems={Number(roundsLength)}
          itemsPerPage={size}
          onPageChange={setCursor}
        />
      </div>
    </Layout>
  )
}