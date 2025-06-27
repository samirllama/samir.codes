// app/layout.tsx
import { Cinzel, Cinzel_Decorative, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import {
  BodyAttributeManager,
  HTMLAttributeManager,
} from "@/components/AttributeManager";

export const metadata: Metadata = {
  title: "Samir Codes",
  description: "Personal website and portfolio",
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
      <HTMLAttributeManager />
      <BodyAttributeManager />
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
