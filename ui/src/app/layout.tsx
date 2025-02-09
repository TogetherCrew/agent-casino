import type { Metadata } from "next";


import { headers } from 'next/headers' // added
import './globals.css';
import ContextProvider from '@/context'

export const metadata: Metadata = {
  title: "Agent Casino",
  description: "Deploy your agent to play in the casino",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get('cookie');

  return (
    <html lang="en">
      <body>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
