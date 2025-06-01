// components/layout/AttributeManager.tsx
"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HTMLAttributeManager() {
  useEffect(() => {
    const html = document.documentElement;

    console.log("useEffect(() => HTMLAttributeManager:", html);

    html.classList.add("is-ready");

    // Function to update --vw and --vh
    const updateViewportVariables = () => {
      html.style.setProperty("--vw", `${window.innerWidth}px`);
      html.style.setProperty("--vh", `${window.innerHeight}px`);
    };

    updateViewportVariables(); // Set initial values

    window.addEventListener("resize", updateViewportVariables); // resize event listener

    return () => {
      html.classList.remove("is-ready");
      window.removeEventListener("resize", updateViewportVariables);
    };
  }, []);

  return null; // Doesn't render any DOM elements itself
}

// Adjust these patterns based routes
const detailPagePatterns: (string | RegExp)[] = [
  "/posts/", // Matches any starting with /posts/
  "/projects/", // Matches any starting with /projects/
  "/items/", // Example: Add other detail route prefixes
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
