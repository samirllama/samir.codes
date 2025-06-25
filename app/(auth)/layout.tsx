// (auth)/layout.tsx
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import Footer from "@/components/ui/footer";

const NAV_ITEMS = ["Tag", "View", "Behavior"] as const;

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grow bg-[#0e1b07] bg-[radial-gradient(circle,_#173C2B_4%,_#44705F_62%,_#173E2C_88%)] text-gray-200">
      <section>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="absolute inset-0 -z-10 overflow-hidden pointer-events-none -ml-28 -mr-28"
            aria-hidden="true"
          ></div>
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">{children}</div>
        </div>
      </section>
    </main>
  );
}

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
