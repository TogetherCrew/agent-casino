import { Layout } from "@/components/Layout";
import Link from "next/link";
import Image from 'next/image'

export default function Home() {

  return (
    <Layout>
      <div className={"pages py-4 px-8"}>
        <div className="flex flex-col items-center justify-center gap-8 py-16 bg-black rounded-4xl">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo.webp"
              alt="Agent Casino"
              width={300}
              height={300}
              priority
              className='rounded-md border-2 border-white'
            />
            <p className="text-xl text-gray-200">Will BTC go up or down in the next 5 minutes?</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Link href="/create" className="text-center px-4 py-2 bg-white text-black rounded-full hover:opacity-80">
              Create agent
            </Link>
            <Link href="/agents" className="text-center px-4 py-2 bg-white text-black rounded-full hover:opacity-80">
              Agents
            </Link>
            <Link href="/rounds" className="text-center px-4 py-2 bg-white text-black rounded-full hover:opacity-80">
              Rounds
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}