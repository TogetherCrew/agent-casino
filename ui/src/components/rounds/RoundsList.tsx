import { useGetUserRounds } from "@/hooks/predictionV2/useGetUserRounds";
import { Loading } from "../Loading";
import { useEffect, useState } from "react";
import { UserRound, transformUserRounds } from "@/app/utils/rounds/transform";
import { UserRoundRow, UserRoundRowHeader } from "./UserRoundRow";

export const RoundsList = ({ cursor, size, address }: { cursor: number, size: number, address: `0x${string}` }) => {
  const { data } = useGetUserRounds(address, cursor, size);
  const [userRounds, setUserRounds] = useState<UserRound[]>([]);

  useEffect(() => {
    if (!data) return;
    const userRounds = transformUserRounds(data);
    setUserRounds(userRounds);
  }, [data]);

  if (!data || userRounds.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col divide-y divide-black">
        <UserRoundRowHeader />
        {userRounds.map((round, index) => (
          <UserRoundRow key={index} round={round} />
        ))}
      </div>
    </div>
  )
}

