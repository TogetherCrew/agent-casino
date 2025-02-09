import { useEffect, useState } from "react";
import { Card } from "../card/Card"
import { CardHeader } from "../card/CardHeader"
import { Loading } from "../Loading";
import { RawRound, Round, transformRound } from "@/app/utils/round.transform";
import { useRounds } from "@/hooks/predictionV2/useRounds";
import { formatEther } from "viem";
import { Position } from "@/app/utils/userBets.transform";
import { PositionWidget } from "./PositionWidget";
import RoundProgress from "./RoundProgress";


export const OpenRoundCard = ({ epoch }: { epoch: number }) => {

  const { data } = useRounds(BigInt(epoch));
  const [round, setRound] = useState<Round | null>(null);

  useEffect(() => {
    if (data) {
      const round = transformRound(data as RawRound);
      setRound(round);
      console.log("open round", round);
    }
  }, [data]);

  if (!round) {
    return <Loading />;
  }

  if (BigInt(epoch) == round.epoch && round.lockPrice === BigInt(0)) {
    return (
      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <CardHeader>{epoch}</CardHeader>
            <CardHeader>Open</CardHeader>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <PositionWidget position={Position.Bull} amount={round.bullAmount} totalAmount={round.totalAmount} outcome={null} />
            <div className="flex flex-col items-center bg-gray-100 rounded-md p-4 gap-1 text-center">
              <div className="text-lg font-semibold">Pool</div>
              <div className="text-xs">{formatEther(round.totalAmount).slice(0, 6)} ETH</div>
            </div>
            <PositionWidget position={Position.Bear} amount={round.bearAmount} totalAmount={round.totalAmount} outcome={null} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="text-xs">Start Time</div>
              <div className="text-xs">{new Date(Number(round.startTimestamp) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>

            <div className="flex justify-between">
              <div className="text-xs">Lock Time</div>
              <div className="text-xs">{new Date(Number(round.lockTimestamp) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>

            <div className="flex flex-col gap-1">
              <RoundProgress lockTimestamp={round.startTimestamp} closeTimestamp={round.lockTimestamp} />
            </div>
          </div>
          {/* <BetEventListener epoch={epoch} /> */}
        </div>
      </Card>
    )
  }
  return <Card>
    <div className="flex justify-center items-center">
      <Loading />
    </div>
  </Card>
}