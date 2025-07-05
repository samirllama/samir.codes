// app/layout.tsx
import { Cinzel, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import InitialAppWrapper from "@/components/InitialAppWrapper";

import { defaultMetadata } from "./metadata";

export const metadata: Metadata = {
  ...defaultMetadata,
};

const defaultSans = Geist_Mono({
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-thin" suppressHydrationWarning>
      <body
        className={cn(
          cinzel.variable,
          defaultSans.variable,
          "antialiased",
          "tracking-tight"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          themes={["dark", "light"]}
        >
          <InitialAppWrapper>{children}</InitialAppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
