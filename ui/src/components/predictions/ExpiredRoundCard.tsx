import { Card } from "../card/Card"
import { CardHeader } from "../card/CardHeader"

export const ExpiredRoundCard = ({ epoch }: { epoch: number }) => {
  return (
    <Card>
      <CardHeader>{epoch}</CardHeader>
    </Card>
  )
}