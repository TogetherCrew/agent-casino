import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  )
}