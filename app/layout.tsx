// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import "./styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Samir Codes",
  description: "Personal website and portfolio",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          "tracking-tight"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Ensures .dark is applied initially if no preference
          enableSystem={true} // Allows respecting OS preference
          themes={['light', 'dark', 'mocha-mousse']}
        >
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip mx-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
