import { useEffect, useState } from "react";

export default function RoundProgress({ lockTimestamp, closeTimestamp }: { lockTimestamp: bigint, closeTimestamp: bigint }) {

  const [progress, setProgress] = useState(100);

  const interval = setInterval(() => {
    const startMs = Number(lockTimestamp) * 1000;
    const endMs = Number(closeTimestamp) * 1000;
    const nowMs = Date.now();
    const rawProgress = (nowMs - startMs) / (endMs - startMs) * 100;
    const progress = rawProgress <= 100 ? rawProgress : 100
    const inverseProgress = 100 - progress;

    if (inverseProgress <= 100 && inverseProgress >= 0) {
      setProgress(inverseProgress);
    }

  }, 50);

  useEffect(() => {
    return () => clearInterval(interval);
  }, [interval]);

  return (
    <div>
      <div className="w-full bg-gray-200 h-2.5">
        <div
          className="bg-black h-2.5  transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}