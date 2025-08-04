import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import { Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import { defaultMetadata } from "./metadata";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  ...defaultMetadata,
};

const defaultSans = Geist_Mono({
  weight: ["300", "500", "700", "800"],
  display: "swap",
  variable: "--font-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const nonce = hdrs.get("x-nonce") || "";
  return (
    <html lang="en" className="scrollbar-thin" suppressHydrationWarning>
      <body className={cn(defaultSans.variable, "antialiased")}>
        <Providers nonce={nonce}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
