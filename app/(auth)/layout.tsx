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
        <header className="flex items-center justify-between px-4 py-4 md:px-8 md:py-6">
          <h1 className="text-2xl font-medium text-gray-700">Welcome</h1>

          <nav className="flex space-x-4 md:space-x-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}` as Route}
                role="navigation"
                aria-label={`Navigate to ${item}`}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {item}
              </Link>
            ))}
          </nav>
        </header>

        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
