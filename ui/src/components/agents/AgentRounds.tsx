'use client'

import { Loading } from "@/components/Loading";
import { Pagination } from "@/components/rounds/Pagination";
import { RoundsList } from "@/components/rounds/RoundsList";
import { useGetUserRoundsLength } from "@/hooks/predictionV2/useGetUserRoundsLength";
import { useEffect, useState } from "react";
import { CardHeader } from "../card/CardHeader";

export default function AgentRounds({ address }: { address: `0x${string}` }) {

  const size = 10;
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
    <div className="flex flex-col gap-4">
      <CardHeader>{Number(roundsLength)} Rounds</CardHeader>
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
  )
}