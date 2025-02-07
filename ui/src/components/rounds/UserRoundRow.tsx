import { Position, UserRound } from "@/app/utils/rounds/transform"
import { formatEther } from "viem"

export const UserRoundRowHeader = () => {
  return (
    <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500 uppercase p-4">
      <div>Epoch</div>
      <div>Position</div>
      <div className="col-span-2">Thesis</div>
      <div className="text-right">Amount</div>
    </div>
  )
}

export const UserRoundRow = ({ round }: { round: UserRound }) => {

  const position = round.bet.position === Position.Bull ? "UP" : "DOWN";

  return (
    <div className="grid grid-cols-5 gap-4 hover:bg-black hover:text-white p-4 text-sm">
      <div>{round.epoch}</div>
      <div>{position}</div>
      <div className="col-span-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      <div className="text-right">{formatEther(round.bet.amount).slice(0, 5).concat(" ETH")}</div>
    </div>
  )
}