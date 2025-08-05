// components/AnalogTimeZoneCard.tsx
"use client";

import { useEffect, useState } from "react";
import AnalogClock from "./AnalogClock";

const MY_TIMEZONE = "America/New_York";
const MY_LOCATION = "New York, USA";

function getVisitorTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export default function AnalogTimeZoneCard() {
  const [visitorZone, setVisitorZone] = useState("");

  useEffect(() => {
    setVisitorZone(getVisitorTimeZone());
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900">
      <h2 className="text-xl font-semibold mb-6 text-center">
        🌐 World Clocks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnalogClock label={MY_LOCATION} timeZone={MY_TIMEZONE} emoji="🧑‍💻" />
        {visitorZone && (
          <AnalogClock
            label={`You (${visitorZone})`}
            timeZone={visitorZone}
            emoji="🌍"
          />
        )}
      </div>
    </div>
  );
}
