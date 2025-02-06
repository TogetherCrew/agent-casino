import Link from "next/link"

export const AgentCard = ({ agentId, isOwnerAgent }: { agentId: number, isOwnerAgent: boolean }) => {



  return (
    <Link href={`/${agentId}`}>
      <div className="bg-black text-white rounded-lg p-4 flex flex-col justify-between gap-12 hover:cursor-pointer hover:opacity-80">

        <div className="flex justify-between">
          <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-medium text-black">
            <div className="flex items-center">
              <span>Live</span>
              <span className="ml-1 h-2 w-2 rounded-full bg-green-400"></span>
            </div>
          </span>
          {isOwnerAgent ? (
            <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-medium text-black">
              Your Agent
            </span>
          ) : <span></span>}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold">Agent Name {agentId}</h2>
        </div>

        <div>
          <span className="text-xs text-white">
            Balance: 0.00 ETH
          </span>
        </div>
      </div>
    </Link >
  )
}