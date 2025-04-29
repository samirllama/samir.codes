// app/layout.tsx
import {
  Cinzel,
  Cinzel_Decorative,
  Dancing_Script,
  Geist_Mono,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import "./styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Samir Codes",
  description: "Personal website and portfolio",
};

const cinzel = Cinzel({
  weight: ["400", "700", "900"], // Choose the weights
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"], // Choose the weights
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel-deco",
});

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing-script",
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
    <html
      lang="en"
      className="scroll-smooth scrollbar-thin"
      suppressHydrationWarning
    >
      <body
        className={cn(
          cinzel.variable,
          cinzelDecorative.variable,
          dancingScript.variable,
          geistMono.variable,
          "antialiased",
          "tracking-tight"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Ensures .dark is applied initially if no preference
          enableSystem={true}
          themes={["dark"]}
        >
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip mx-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
