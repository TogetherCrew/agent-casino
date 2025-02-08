import { useEffect, useState } from "react";
import { Card } from "../card/Card"
import { CardHeader } from "../card/CardHeader"
import { Loading } from "../Loading";
import { RawRound, Round, transformRound } from "@/app/utils/round.transform";
import { useRounds } from "@/hooks/predictionV2/useRounds";
import { formatEther } from "viem";
import { Position } from "@/app/utils/userBets.transform";


const PositionWidget = ({ position, amount, totalAmount }: { position: Position, amount: bigint, totalAmount: bigint }) => {

  const payout = (amount: bigint, totalAmount: bigint) => {
    if (amount === BigInt(0)) {
      return 0;
    }
    return Number(totalAmount) / Number(amount);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md p-4 gap-1 text-center">
      <div className="text-lg font-semibold">{position === Position.Bull ? "UP" : "DOWN"}</div>
      <div className="flex items-center gap-2 text-sm">
        {payout(amount, totalAmount).toPrecision(3)}x
      </div>
      <div className="flex items-center gap-2 text-sm">
        Payout
      </div>
    </div>
  )
}
export const OpenRoundCard = ({ epoch }: { epoch: number }) => {

  const { data } = useRounds(BigInt(epoch));
  const [round, setRound] = useState<Round | null>(null);

  useEffect(() => {
    if (data) {
      const round = transformRound(data as RawRound);
      setRound(round);
      console.log("round", round);
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
          <PositionWidget position={Position.Bull} amount={round.bullAmount} totalAmount={round.totalAmount} />
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md p-4 gap-1 text-center">
            <div className="text-lg font-semibold">Pool</div>
            <div className="text-sm">{formatEther(round.totalAmount).slice(0, 6)} ETH</div>
          </div>
          <PositionWidget position={Position.Bear} amount={round.bearAmount} totalAmount={round.totalAmount} />
        </div>
      </div>
    </Card>
  )
}