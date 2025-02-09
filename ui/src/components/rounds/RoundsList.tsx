import { useGetUserRounds } from "@/hooks/predictionV2/useGetUserRounds";
import { Loading } from "../Loading";
import { useEffect, useState } from "react";
import { UserBet, BetInfo, transformUserBets } from "@/app/utils/userBets.transform";
import { UserRoundRow, UserRoundRowHeader } from "./UserRoundRow";

export const RoundsList = ({ cursor, size, address }: { cursor: number, size: number, address: `0x${string}` }) => {

  const { data } = useGetUserRounds(address, BigInt(cursor | 0), BigInt(size));
  const [userBets, setUserBets] = useState<UserBet[]>([]);

  useEffect(() => {
    if (!data) return;
    const userBets = transformUserBets(data as [bigint[], BetInfo[], bigint]);
    setUserBets(userBets);
  }, [data]);

  if (!data || userBets.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <UserRoundRowHeader />
        {userBets.map((userBet, index) => (
          <UserRoundRow key={index} userBet={userBet} />
        ))}
      </div>
    </div>
  )
}

