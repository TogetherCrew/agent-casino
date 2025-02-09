import { Position } from "@/app/utils/userBets.transform";

export const PositionWidget = ({ position, amount, totalAmount, outcome = null }: { position: Position, amount: bigint, totalAmount: bigint, outcome: Position | null }) => {

  const payout = (amount: bigint, totalAmount: bigint) => {
    if (amount === BigInt(0)) {
      return 0;
    }
    return Number(totalAmount) / Number(amount);
  }

  const isWinning = (position: Position, outcome: Position | null): boolean => {
    const result = position === outcome;
    // console.log("position", position, "outcome", outcome, "result", result);
    return result;
  }

  return (
    <div className={`flex flex-col items-center justify-center bg-gray-100 rounded-md p-4 gap-1 text-center ${isWinning(position, outcome) ? 'bg-green-200' : ''}`}>
      <div className="text-lg font-semibold">{position === Position.Bull ? "UP" : "DOWN"}</div>
      <div className="flex items-center gap-2 text-xs">
        {payout(amount, totalAmount).toPrecision(3)}x
      </div>
    </div >
  )
}