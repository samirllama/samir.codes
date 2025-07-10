"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function SafeThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      disableTransitionOnChange
    >
      {mounted ? children : <>{children}</>}
    </ThemeProvider>
  );
}
