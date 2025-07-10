import Script from "next/script";
import { cookies } from "next/headers";
import { Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import InitialAppWrapper from "@/components/InitialAppWrapper";
import { SafeThemeProvider } from "../components/SafeThemeProvider";
import { defaultMetadata } from "./metadata";

const nonce = cookies().get("nonce")?.value ?? "";

export const metadata: Metadata = {
  ...defaultMetadata,
};

const defaultSans = Geist_Mono({
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-thin" suppressHydrationWarning>
      <head>
        <Script
          src="/theme-init.js"
          strategy="beforeInteractive"
          nonce={nonce}
        />
      </head>
      <body
        className={cn(defaultSans.variable, "antialiased", "tracking-tight")}
      >
        {/* <ThemeProvider attribute="class" themes={["dark", "light"]}>
          <InitialAppWrapper>{children}</InitialAppWrapper>
        </ThemeProvider> */}
        <SafeThemeProvider>
          <InitialAppWrapper>{children}</InitialAppWrapper>
        </SafeThemeProvider>
      </body>
    </html>
  );
}
