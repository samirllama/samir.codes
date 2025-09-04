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
  variable: "--font-mono-argon",
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
      <head>
        {/*

        After walking through the few settings, RealFaviconGenerator https://realfavicongenerator.net/favicon-generator/nextjs
        will bring you to a page where you can download the generated files.
        Unzip the first package—there should be five files in total:
        1) Copy all of these files
        2) Paste them in the root /app directory of your Next.js project (the same level as your layout.tsx file)

        Files should be directly in /app, not in a subfolder, structure should look like:
        app/
            ├── layout.tsx
            ├── page.tsx
            ├── favicon.ico
            ├── apple-icon.png
            ├── icon.svg
            ├── icon.png
            └── manifest.json

           The manifest file is crucial for mobile users—without it, many Android devices won't properly display your favicon when users add your site to their home screen.

          Replace "Your App Name" with actual application name.
          This controls what text appears when iOS users save the site to their home screen.
        */}
        <meta name="apple-mobile-web-app-title" content="Samir Codes" />
      </head>
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
