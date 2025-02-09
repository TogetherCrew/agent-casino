'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ConnectButton } from './ConnectButton'
import { CreateAgentButton } from './CreateAgentButton'

export const Header = () => {

  return (
    <header className="flex items-center justify-between gap-8 py-4 px-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Agent Casino"
            width={60}
            height={60}
            priority
            className='rounded-md'
          />
        </Link>
        <Link href="/agents" className='bg-white px-4 py-2 font-semibold rounded-full hover:bg-gray-200 hover:cursor-pointer'>Agents</Link>
        <Link href="/rounds" className='bg-white px-4 py-2 font-semibold rounded-full hover:bg-gray-200 hover:cursor-pointer'>Rounds</Link>
      </div>

      <div className="flex items-center gap-4">
        <CreateAgentButton />
        <ConnectButton />
      </div>
    </header>
  )
}
