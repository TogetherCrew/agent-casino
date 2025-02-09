import { Round } from "@/app/utils/round.transform"
import { Position, UserBet } from "@/app/utils/userBets.transform"
import { formatEther } from "viem"

export const Reward = ({ userBet, round }: { userBet: UserBet, round: Round }) => {

  const reward = (userBet: UserBet, round: Round): bigint => {
    return userBet.bet.amount * round.rewardAmount / round.rewardBaseCalAmount
  }

  const outcome = (round: Round): Position | null => {
    if (round.closePrice > round.lockPrice) {
      return Position.Bull
    } else if (round.closePrice < round.lockPrice) {
      return Position.Bear
    } else {
      return null;
    }
  }

  if (!round.oracleCalled) {
    return <div className="text-gray-500">Ongoing</div>
  }

  if (outcome(round) === userBet.bet.position) {
    return <div className="text-green-500">{formatEther(reward(userBet, round)).slice(0, 5).concat(" ETH")}</div>
  }

  if (outcome(round) !== userBet.bet.position) {
    return <div className="text-red-500">-{formatEther(userBet.bet.amount).slice(0, 5).concat(" ETH")}</div>
  }
}