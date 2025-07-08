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
      
    } else {
      html.classList.remove("is-ready");
      
    }
  }, [isReady]);

  return null;
}