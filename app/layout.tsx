import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import { getNonce } from "@/lib/nonce";
import { defaultMetadata } from "./metadata";
import { ThemeProvider } from "@/components/theme-provider";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { Suspense } from "react";

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
  const nonce = await getNonce();
  return (
    <html lang="en" className="scrollbar-thin" suppressHydrationWarning>
      <head>
        {nonce && (
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                // Set global nonce for dynamic scripts
                window.__NONCE__ = '${nonce}';

                // Helper function to create nonce-compliant scripts
                window.createNonceScript = function(code) {
                  const script = document.createElement('script');
                  script.nonce = '${nonce}';
                  script.textContent = code;
                  return script;
                };
              `,
            }}
          />
        )}
      </head>

      <body className={cn(defaultSans.variable, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div id="nonce-data" data-nonce={nonce} style={{ display: "none" }} />
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
