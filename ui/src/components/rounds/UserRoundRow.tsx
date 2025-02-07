import { Position, UserBet } from "@/app/utils/userBets.transform"
import { useRounds } from "@/hooks/predictionV2/useRounds"
import { Loading } from "../Loading"
import { useEffect, useState } from "react";
import { RawRound, Round, transformRound } from "@/app/utils/round.transform";
import { Reward } from "./Reward";



export const UserRoundRowHeader = () => {
  return (
    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500 uppercase p-4">
      <div>Epoch</div>
      <div>Position</div>
      <div className="col-span-2">Thesis</div>
      <div className="text-right">Winnings (ETH)</div>
    </div>
  )
}

export const UserRoundRow = ({ userBet }: { userBet: UserBet }) => {

  const { data } = useRounds(userBet.epoch);
  const [round, setRound] = useState<Round | null>(null);

  const position = userBet.bet.position === Position.Bull ? "UP" : "DOWN";

  useEffect(() => {
    if (!data) {
      return;
    }
    setRound(transformRound(data as RawRound));
  }, [data]);

  if (!round) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-5 gap-4 hover:bg-black hover:text-white p-4 text-sm hover:cursor-default">
      <div className="flex gap-2">
        <div>{userBet.epoch}</div>

      </div>
      <div>
        <div>{position}</div>
      </div>
      <div className="col-span-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      <div className="text-right">
        <Reward userBet={userBet} round={round} />
      </div>
    </div>
  )
}