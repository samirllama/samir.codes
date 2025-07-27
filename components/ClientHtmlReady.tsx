"use client";
import { useEffect } from "react";

export function ClientHtmlReady() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("is-ready");

    return () => {
      html.classList.remove("is-ready");
    };
  }, []);

  return null;
}
