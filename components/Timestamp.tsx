"use client";

// import { useState, useLayoutEffect } from "react";
import { getYear } from "date-fns";

export function Timestamp() {
  // const [time, setTime] = useState<number | null>(null)
  // useLayoutEffect(() => {

  //   setTime(new Date().getFullYear())
  // }, [])

  const time = getYear(new Date());
  if (time) return time;
  return null;
}
