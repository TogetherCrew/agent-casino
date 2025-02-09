import { useEffect, useState } from "react";
import { Card } from "../card/Card"
import { CardHeader } from "../card/CardHeader"
import { Loading } from "../Loading";
import { RawRound, Round, transformRound } from "@/app/utils/round.transform";
import { useRounds } from "@/hooks/predictionV2/useRounds";
import { formatEther, Log } from "viem";
import { Position } from "@/app/utils/userBets.transform";
// import { predictionV2 } from "@/contracts";
// import { useAppKitNetwork } from "@reown/appkit/react";
// import { useWatchContractEvent } from "wagmi";
// import { shortenAddress } from "@/app/utils/shortenAddress";
import { PositionWidget } from "./PositionWidget";


// type EventLog = Log & {
//   eventName: string;
//   args: {
//     epoch: number;
//     amount: bigint;
//     sender: `0x${string}`;
//   };
// };

// type Bet = {
//   position: Position;
//   epoch: number;
//   amount: bigint;
//   address: `0x${string}`;
// }

// const BetEventListener = ({ epoch }: { epoch: number }) => {

//   const { chainId } = useAppKitNetwork();
//   const [bets, setBets] = useState<Bet[]>([]);

//   function processLog(log: EventLog, position: Position) {
//     setBets([...bets, {
//       position,
//       epoch: log.args.epoch,
//       amount: log.args.amount,
//       address: log.args.sender
//     }]);
//   }

//   useWatchContractEvent({
//     address: predictionV2.contractAddress[chainId as number],
//     abi: predictionV2.abi,
//     eventName: 'BetBear',
//     args: { epoch },
//     onLogs: (logs: Log[]) => {
//       logs.forEach((log: Log) => {
//         processLog(log as EventLog, Position.Bear);
//       });
//     }
//   })

//   useWatchContractEvent({
//     address: predictionV2.contractAddress[chainId as number],
//     abi: predictionV2.abi,
//     eventName: "BetBull",
//     args: { epoch: BigInt(epoch) },
//     onLogs: (logs: Log[]) => {
//       logs.forEach((log: Log) => {
//         processLog(log as EventLog, Position.Bull);
//       });
//     }
//   })

//   return (
//     <div className="flex flex-col gap-2">
//       <div className="grid grid-cols-3 text-xs font-semibold">
//         <div>Address</div>
//         <div className="text-center">Position</div>
//         <div className="text-right">Amount</div>
//       </div>
//       {bets.map((bet) => (
//         <div key={bet.address} className="grid grid-cols-3 text-xs">
//           <div>{shortenAddress(bet.address)}</div>
//           <div className="text-center">{bet.position == Position.Bull ? "UP" : "DOWN"}</div>
//           <div className="text-right">{formatEther(bet.amount).slice(0, 6)}</div>
//         </div>
//       ))}
//     </div>
//   )

// }


export const OpenRoundCard = ({ epoch }: { epoch: number }) => {

  const { data, refetch } = useRounds(BigInt(epoch));
  const [round, setRound] = useState<Round | null>(null);

  useEffect(() => {
    if (data) {
      const round = transformRound(data as RawRound);
      setRound(round);
      console.log("open round", round);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      console.log("refetching");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!round) {
    return <Loading />;
  }



  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <CardHeader>{epoch}</CardHeader>
          <CardHeader>Open</CardHeader>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <PositionWidget position={Position.Bull} amount={round.bullAmount} totalAmount={round.totalAmount} outcome={undefined} />
          <div className="flex flex-col items-center bg-gray-100 rounded-md p-4 gap-1 text-center">
            <div className="text-lg font-semibold">Pool</div>
            <div className="text-xs">{formatEther(round.totalAmount).slice(0, 6)} ETH</div>
          </div>
          <PositionWidget position={Position.Bear} amount={round.bearAmount} totalAmount={round.totalAmount} outcome={undefined} />
        </div>
        {/* <BetEventListener epoch={epoch} /> */}
      </div>
    </Card>
  )
}