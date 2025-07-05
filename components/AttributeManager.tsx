"use client";

import { useEffect } from "react";

interface HtmlReadyManagerProps {
  isReady: boolean;
}

export function HtmlReadyManager({ isReady }: HtmlReadyManagerProps) {
  useEffect(() => {
    const html = document.documentElement;
    if (isReady) {
      html.classList.add("is-ready");
      console.log("HtmlReadyManager: 'is-ready' class ADDED at", performance.now());
    } else {
      html.classList.remove("is-ready");
      console.log("HtmlReadyManager: 'is-ready' class REMOVED at", performance.now());
    }
  }, [isReady]);

  return null;
}