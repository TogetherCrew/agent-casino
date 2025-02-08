import { Card } from "../card/Card"
import { CardHeader } from "../card/CardHeader"

export const LiveRoundCard = ({ epoch }: { epoch: number }) => {
  return (
    <Card>
      <CardHeader>{epoch}</CardHeader>
    </Card>
  )
}