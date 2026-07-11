import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import type { Metadata } from "next";
// Token source first, base styles second - globals.css aliases legacy vars
// onto theme.css semantic tokens, so order matters.
import "./styles/theme.css";
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
  variable: "--font-mono-argon",
});
const monaspaceNeon = localFont({
  src: "./MonaspaceNeonVF.woff2",
  display: "swap",
  variable: "--font-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scrollbar-thin" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Samir Codes" />
      </head>
      <body className={`${monaspaceArgon.variable} ${monaspaceNeon.variable}`}>
        {/* Dark is the canonical presentation; light stays available via the toggle. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange={false}
        >
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>

          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
