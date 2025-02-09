import { useReducer, useEffect } from "react";

export function RefreshComponent({ children }: { children: React.ReactNode }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate(); // Force re-render
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}