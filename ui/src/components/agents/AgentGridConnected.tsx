import { useTokenIdCounter } from "@/hooks/agentFactory/useTokenIdCounter"
import { Loading } from "../Loading"
import { AgentCard } from "./AgentCard"
import { useGetAgentsByOwner } from "@/hooks/agentFactory/useGetAgentsByOwner"
import { useEffect, useState } from "react"

export const AgentGridConnected = () => {

  const { data: tokenCounter, isPending: tokenCounterPending, isError: tokenCounterError } = useTokenIdCounter()
  const { data, isPending: ownerAgentIdsPending, isError: ownerAgentIdsError } = useGetAgentsByOwner()

  const [ownerAgentIds, setOwnerAgentIds] = useState<number[]>([])

  useEffect(() => {
    if (data) {
      // Convert BigInt values to numbers
      const convertedIds = (data as []).map(id => Number(id))
      setOwnerAgentIds(convertedIds)
    }
  }, [data])

  if (tokenCounterPending || ownerAgentIdsPending) {
    return <Loading />
  }

  if (tokenCounterError || ownerAgentIdsError) {
    return <div>Error reading contract</div>
  }

  if (tokenCounter && ownerAgentIds) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(Number(tokenCounter))].reverse().map((_, index) => {
          const agentId = Number(tokenCounter) - index;
          return <AgentCard key={index} agentId={agentId} isOwnerAgent={ownerAgentIds?.includes(agentId)} />
        })}
      </div>
    )
  }

  return <div>No response</div>
}