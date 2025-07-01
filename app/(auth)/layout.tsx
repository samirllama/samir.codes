// (auth)/layout.tsx
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import Footer from "@/components/ui/footer";

const NAV_ITEMS = ["Tag", "View", "Behavior"] as const;

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={cn([
          "grow min-h-screen",
          "bg-hdr-gradient",
          "[background-attachment:fixed]",
        ])}
        style={{ opacity: 1 }}
      >
        

        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
