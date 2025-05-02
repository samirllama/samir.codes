// components/layout/BodyAttributeManager.tsx
"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Adjust these patterns based routes
const detailPagePatterns: (string | RegExp)[] = [
  "/posts/", // Matches any starting with /posts/
  "/projects/", // Matches any starting with /projects/
  "/items/", // Example: Add other detail route prefixes
  /^\/users\/[^\/]+$/, // Example: Regex for /users/some-id (but not /users/settings)
];

export function BodyAttributeManager() {
  const pathname = usePathname(); // Get the current route path

  useEffect(() => {
    console.log("useEffect(() => Pathname:", pathname);
    // Check if the current pathname matches any detail pattern
    const isDetailPage = detailPagePatterns.some((pattern) => {
      if (typeof pattern === "string") {
        return pathname.startsWith(pattern);
      } else if (pattern instanceof RegExp) {
        return pattern.test(pathname);
      }
      return false;
    });

    if (isDetailPage) {
      document.body.setAttribute("page-type", "detail");
    } else {
      document.body.setAttribute("page-type", "not-detail");
    }

    // Optional: Cleanup function to remove attribute when component unmounts
    // (usually not strictly necessary here as it runs on every path change,
    // but good practice if there were edge cases)
    // return () => {
    //   document.body.removeAttribute('page-type');
    // };
  }, [pathname]); // Re-run the effect whenever the pathname changes

  // This component doesn't render anything visual
  return null;
}
