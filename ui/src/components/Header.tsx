'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ConnectButton } from './ConnectButton'
import { CreateAgentButton } from './CreateAgentButton'

export const Header = () => {

  return (
    <header className="flex items-center justify-between gap-8 py-4 px-8">
      <Link href="/">
        <Image
          src="/reown.svg"
          alt="Reown"
          width={60}
          height={60}
          priority
        />
      </Link>

      <div className="flex items-center gap-4">
        <CreateAgentButton />
        <ConnectButton />


      </div>
    </header>
  )
}
