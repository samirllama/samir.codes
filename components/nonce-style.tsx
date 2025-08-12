"use client";

import { useEffect } from "react";

interface NonceStyleProps {
  children: string;
  id?: string;
}

export function NonceStyle({ children, id }: NonceStyleProps) {
  useEffect(() => {
    // Get nonce from the hidden div
    const nonceElement = document.getElementById("nonce-data");
    const nonce = nonceElement?.getAttribute("data-nonce");
    const style = document.createElement("style");

    if (nonce) style.nonce = nonce;
    if (id) style.id = id;

    style.textContent = children;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [children, id]);

  return null;
}
