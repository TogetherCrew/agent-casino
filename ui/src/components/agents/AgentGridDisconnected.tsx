import { useTokenIdCounter } from "@/hooks/agentFactory/useTokenIdCounter"
import { Loading } from "../Loading"
import { AgentCard } from "./AgentCard"

export const AgentGridDisconnected = () => {

  const { data, isPending, isError } = useTokenIdCounter()

  if (isPending) {
    return <Loading />
  }

  if (isError) {
    return <div>Error reading contract</div>
  }

  if (data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(Number(data))].reverse().map((_, index) => {
          const agentId = index + 1;
          return <AgentCard key={index} agentId={agentId} isOwnerAgent={false} />
        })}
      </div>
    )
  }

  return <div>No response</div>
}