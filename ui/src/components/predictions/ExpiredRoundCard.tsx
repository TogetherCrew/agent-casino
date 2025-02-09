import { useEffect, useState } from "react";
import { Card } from "../card/Card"
import { CardHeader } from "../card/CardHeader"
import { useRounds } from "@/hooks/predictionV2/useRounds";
import { Round, transformRound, RawRound } from "@/app/utils/round.transform";
import { Position } from "@/app/utils/userBets.transform";
import { formatEther, formatUnits } from "viem";
import { Loading } from "../Loading";
import { PositionWidget } from "./PositionWidget";

export const ExpiredRoundCard = ({ epoch }: { epoch: number }) => {

  const { data } = useRounds(BigInt(epoch));
  const [round, setRound] = useState<Round | null>(null);
  const [outcome, setOutcome] = useState<Position | null>(null);

  useEffect(() => {
    if (data) {
      const round = transformRound(data as RawRound);
      console.log("round", round);
      setRound(round);
      if (round.closePrice > round.lockPrice) {
        setOutcome(Position.Bull);
      } else {
        setOutcome(Position.Bear);
      }
    }
  }, [data]);

  if (!round) {
    return <Loading />;
  }

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <CardHeader>{epoch}</CardHeader>
        <div className="grid grid-cols-3 gap-2">
          <PositionWidget position={Position.Bull} amount={round.bullAmount} totalAmount={round.totalAmount} outcome={outcome} />
          <div className="flex flex-col items-center bg-gray-100 rounded-md p-4 gap-1 text-center">
            <div className="text-lg font-semibold">Pool</div>
            <div className="text-xs">{formatEther(round.totalAmount).slice(0, 6)} ETH</div>
          </div>
          <PositionWidget position={Position.Bear} amount={round.bearAmount} totalAmount={round.totalAmount} outcome={outcome} />
        </div>
        <div className="flex flex-col gap-2">

          <div className="flex justify-between">
            <div className="text-xs">Lock Price</div>
            <div className="text-xs">{formatUnits(round.lockPrice, 8).slice(0, 6)} USD</div>
          </div>

          <div className="flex justify-between">
            <div className="text-xs">Close Price</div>
            <div className="text-xs">{formatUnits(round.closePrice || BigInt(0), 8).slice(0, 6)} USD</div>
          </div>
        </div>
      </div>
    </Card>
  )
}