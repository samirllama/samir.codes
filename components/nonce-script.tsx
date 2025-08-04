"use client";

import { useEffect } from "react";

interface NonceScriptProps {
  children: string;
  id?: string;
}

export function NonceScript({ children, id }: NonceScriptProps) {
  useEffect(() => {
    // Get nonce from the hidden div
    const nonceElement = document.getElementById("nonce-data");
    const nonce = nonceElement?.getAttribute("data-nonce");

    const script = document.createElement("script");
    if (nonce) {
      script.nonce = nonce;
    }
    if (id) {
      script.id = id;
    }
    script.textContent = children;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [children, id]);

  return null;
}
