'use client'

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { Pagination } from "@/components/rounds/Pagination";
import { RoundsList } from "@/components/rounds/RoundsList";
import { useGetUserRoundsLength } from "@/hooks/predictionV2/useGetUserRoundsLength";
import { useEffect, useState } from "react";

export default function RoundsPage() {

  const size = 10;
  const address = "0x36593086d9450E48B172bFC9A4a69AC879abDB5A"; // TODO: get address from user
  const { data: roundsLength } = useGetUserRoundsLength(address);
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const handlePageChange = (page: number) => {
    let cursor = Number(roundsLength) - ((page + 1) * size);
    if (cursor < 0) {
      cursor = 0;
    }
    setCursor(cursor);
  }

  useEffect(() => {
    setCursor(Number(roundsLength) - size);
  }, [roundsLength]);

  if (!roundsLength || (cursor === undefined)) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <h2 className="text-2xl font-bold">{Number(roundsLength)} Rounds</h2>
        <Pagination
          totalItems={Number(roundsLength)}
          itemsPerPage={size}
          onPageChange={handlePageChange}
        />
        <RoundsList cursor={cursor} size={size} address={address} />
        <Pagination
          totalItems={Number(roundsLength)}
          itemsPerPage={size}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  )
}