import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  )
}