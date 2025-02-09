import { useCurrentEpoch } from "@/hooks/predictionV2/useCurrentEpoch";
import { Loading } from "../Loading";
import { ExpiredRoundCard } from "./ExpiredRoundCard";
import { LiveRoundCard } from "./LiveRoundCard";
import { OpenRoundCard } from "./OpenRoundCard";
import { useEffect, useState } from "react";

export const RoundsGrid = () => {

  const { data, refetch, isLoading } = useCurrentEpoch();
  const [epoch, setEpoch] = useState<number>(0);

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setEpoch(Number(data));
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <ExpiredRoundCard epoch={epoch - 2} />
      </div>
      <div>
        <LiveRoundCard epoch={epoch - 1} />
      </div>
      <div>
        <OpenRoundCard epoch={epoch} />
      </div>
    </div>
  )
}