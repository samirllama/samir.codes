import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./styles/globals.css";
import { defaultMetadata } from "./metadata";
import { ThemeProvider } from "@/components/theme-provider";
import { PageViewTracker } from "@/features/analytics/components/page-view-tracker";

export const metadata: Metadata = {
  ...defaultMetadata,
};

const monaspaceArgon = localFont({
  src: "./MonaspaceArgonVF.woff2",
  display: "swap",
  variable: "--font-mono-argon", // Define CSS variable for the font
});
const monaspaceNeon = localFont({
  src: "./MonaspaceNeonVF.woff2",
  display: "swap",
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-thin" suppressHydrationWarning>
      <body className={`${monaspaceArgon.variable} ${monaspaceNeon.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>

          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
