import { useAppKitAccount } from "@reown/appkit/react"

export const CreateAgentButton = () => {
  const { isConnected } = useAppKitAccount()

  if (!isConnected) return null

  return (
    <button className="hover:cursor-pointer px-4 py-2 bg-black text-white rounded-full">
      Create Agent
    </button>
  )
}