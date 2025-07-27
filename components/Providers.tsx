"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ClientHtmlReady } from "./ClientHtmlReady";

interface ProvidersProps {
  children: ReactNode;
  nonce: string;
}

export function Providers({ children, nonce }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      nonce={nonce}
    >
      <ClientHtmlReady />
      {children}
    </ThemeProvider>
  );
}
