// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from 'next/image';
import { Layout } from "@/components/Layout";

export default function Home() {

  return (
    <Layout>
      <div className={"pages"}>
        <Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
        <h1 className="text-3xl font-bold underline">AppKit Wagmi Next.js App Router Example</h1>

        <ConnectButton />
        <ActionButtonList />
        <div className="advice">
          <p>
            This projectId only works on localhost. <br />Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
          </p>
        </div>
        <InfoList />
      </div>
    </Layout>
  );
}