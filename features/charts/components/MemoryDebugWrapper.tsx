// features/chart/components/DevDebugWrapper.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

const SciChartMemoryDebugWrapper = dynamic(
  () => import("scichart-react").then((mod) => mod.SciChartMemoryDebugWrapper),
  { ssr: false }
);

export function MemoryDebugWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "development") {
    return <SciChartMemoryDebugWrapper>{children}</SciChartMemoryDebugWrapper>;
  }
  return <>{children}</>;
}
