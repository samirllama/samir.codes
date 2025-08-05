// components/AnalogClock.tsx
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

interface AnalogClockProps {
  label: string;
  timeZone: string;
  emoji?: string;
}

export default function AnalogClock({
  label,
  timeZone,
  emoji,
}: AnalogClockProps) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const local = new Date(date.toLocaleString("en-US", { timeZone }));
  const seconds = local.getSeconds();
  const minutes = local.getMinutes();
  const hours = local.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  const digital = format(local, "hh:mm:ss aaaa");

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {emoji} {label}
      </div>
      <div className="relative w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 shadow-inner">
        <div
          className="absolute w-[2px] h-1/3 bg-red-500 origin-bottom left-1/2 top-4"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />
        <div
          className="absolute w-[3px] h-1/4 bg-gray-800 dark:bg-white origin-bottom left-1/2 top-8"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />
        <div
          className="absolute w-[4px] h-[22%] bg-gray-600 dark:bg-white origin-bottom left-1/2 top-[30%]"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />
        {/* center dot */}
        <div className="absolute w-2 h-2 rounded-full bg-black dark:bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="font-mono text-sm mt-2">{digital}</div>
    </div>
  );
}
