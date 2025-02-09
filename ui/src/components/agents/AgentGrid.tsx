'use client'

import { useAppKitAccount } from "@reown/appkit/react"
import { AgentGridConnected } from "./AgentGridConnected"
import { AgentGridDisconnected } from "./AgentGridDisconnected"

export const AgentGrid = () => {
  const { address } = useAppKitAccount()

  if (address) {
    return <AgentGridConnected />
  } else {
    return <AgentGridDisconnected />
  }

}