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
import { BodyAttributeManager } from "@/components/BodyAttributeManager";

export const metadata: Metadata = {
  title: "Samir Codes",
  description: "Personal website and portfolio",
};

const defaultSans = Geist_Mono({
  display: "swap",
  variable: "--font-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  weight: ["400", "700", "900"], // Choose the weights
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
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
      <BodyAttributeManager />
      <body
        className={cn([
          cinzel.variable,
          cinzelDecorative.variable,
          dancingScript.variable,
          defaultSans.variable,
          "antialiased",
          "tracking-tight",
        ])}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Ensures .dark is applied initially
          enableSystem={true}
          themes={["dark"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
