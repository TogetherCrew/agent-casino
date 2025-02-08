import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      {children}
      <footer></footer>
    </div>
  )
}