import { useEffect, useState } from "react";
import { Card } from "../card/Card"
import { CardHeader } from "../card/CardHeader"
import { Loading } from "../Loading";
import { RawRound, Round, transformRound } from "@/app/utils/round.transform";
import { useRounds } from "@/hooks/predictionV2/useRounds";
import { formatEther, Log } from "viem";
import { Position } from "@/app/utils/userBets.transform";
import { predictionV2 } from "@/contracts";
import { useAppKitNetwork } from "@reown/appkit/react";
import { usePublicClient, useWatchContractEvent } from "wagmi";
import { shortenAddress } from "@/app/utils/shortenAddress";


type EventLog = Log & {
  args: {
    epoch: number;
    amount: bigint;
    sender: `0x${string}`;
  };
};

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
    </div>
  )
}

type Bet = {
  position: Position;
  epoch: number;
  amount: bigint;
  address: `0x${string}`;
}

const BetEventListener = ({ epoch }: { epoch: number }) => {

  const client = usePublicClient();
  const [fromBlock, setFromBlock] = useState<bigint | undefined>(undefined);

  useEffect(() => {
    if (!client) return;

    const getBlockFrom5MinAgo = async () => {
      const latestBlock = await client.getBlock(); // Get latest block
      console.log("latestBlock", latestBlock.number);
      const blockNumber = latestBlock.number - BigInt(150);
      console.log("blockNumber", blockNumber);
      return blockNumber;
    };

    (async () => {
      const fromBlock = await getBlockFrom5MinAgo();
      setFromBlock(fromBlock);
    })();
  }, [client]);

  const { chainId } = useAppKitNetwork();
  const [bets, setBets] = useState<Bet[]>([]);

  const processLog = (log: EventLog, position: Position) => {
    setBets([...bets, {
      position,
      epoch: log.args.epoch,
      amount: log.args.amount,
      address: log.args.sender
    }]);
  }

  useWatchContractEvent({
    address: predictionV2.contractAddress[chainId as number],
    abi: predictionV2.abi,
    eventName: 'BetBear',
    fromBlock,
    args: { epoch },
    onLogs: (logs: Log[]) => {
      logs.forEach((log: Log) => {
        processLog(log as EventLog, Position.Bear);
      });
    }
  })

  useWatchContractEvent({
    address: predictionV2.contractAddress[chainId as number],
    abi: predictionV2.abi,
    eventName: "BetBull",
    fromBlock,
    args: { epoch },
    onLogs: (logs: Log[]) => {
      logs.forEach((log: Log) => {
        processLog(log as EventLog, Position.Bull);
      });
    }
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 text-xs font-semibold">
        <div>Address</div>
        <div className="text-center">Position</div>
        <div className="text-right">Amount</div>
      </div>
      {bets.map((bet) => (
        <div key={bet.address} className="grid grid-cols-3 text-xs">
          <div>{shortenAddress(bet.address)}</div>
          <div className="text-center">{bet.position == Position.Bull ? "UP" : "DOWN"}</div>
          <div className="text-right">{formatEther(bet.amount).slice(0, 6)}</div>
        </div>
      ))}
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
          <div className="flex flex-col items-center bg-gray-100 rounded-md p-4 gap-1 text-center">
            <div className="text-lg font-semibold">Pool</div>
            <div className="text-sm">{formatEther(round.totalAmount).slice(0, 6)} ETH</div>
          </div>
          <PositionWidget position={Position.Bear} amount={round.bearAmount} totalAmount={round.totalAmount} />
        </div>
        <BetEventListener epoch={epoch} />
      </div>
    </Card>
  )
}