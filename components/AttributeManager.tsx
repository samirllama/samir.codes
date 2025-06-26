// components/layout/AttributeManager.tsx
"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HTMLAttributeManager() {
  useEffect(() => {
    const html = document.documentElement;

    html.classList.add("is-ready");

    return () => {
      html.classList.remove("is-ready");
    };
  }, []);

  return null;
}

const detailPagePatterns: (string | RegExp)[] = [
  "/posts/",
  "/projects/", // Matches any starting with /projects/
  "/items/",
  /^\/users\/[^\/]+$/, // Example: Regex for /users/some-id (but not /users/settings)
];

export function BodyAttributeManager() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;

    const isDetailPage = detailPagePatterns.some((pattern) => {
      if (typeof pattern === "string") {
        return pathname.startsWith(pattern);
      } else if (pattern instanceof RegExp) {
        return pattern.test(pathname);
      }
      return false;
    });

    if (isDetailPage) {
      body.setAttribute("page-type", "detail");
    } else {
      body.removeAttribute("page-type");
    }

    return () => {
      body.removeAttribute("page-type");
    };
  }, [pathname]); // Re-run effect if pathname changes

  return null;
}
