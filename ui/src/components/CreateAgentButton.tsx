import { useAppKitAccount } from "@reown/appkit/react"
import Link from "next/link"

export const CreateAgentButton = () => {
  const { isConnected } = useAppKitAccount()

  if (!isConnected) return null

  return (
    <Link href="/create">
      <button className="hover:cursor-pointer px-4 py-2 bg-black text-white rounded-full">
        Create Agent
      </button>
    </Link>
  )
}