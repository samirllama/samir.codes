// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import "./styles/globals.css"; // Ensure globals.css is imported
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Samir Llama",
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
          // REMOVED: "bg-slate-900",
          // REMOVED: "text-slate-100", // Or text-slate-200
          "tracking-tight"
          // Add any other layout-specific, non-color body classes here
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Ensures .dark is applied initially if no preference
          enableSystem={true} // Allows respecting OS preference
        >
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
