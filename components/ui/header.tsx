// components/ui/header.tsx (Refactored for v3 & CSS-Tricks Style)
import Link from "next/link";
import { Suspense } from "react";
import Logo from "./logo"; // Assuming this component is simple
import MobileMenu from "./mobile-menu"; // Assuming this component exists
import DashboardButton from "../DashboardButton"; // Or direct signin/up links
import ThemeToggle from "../ThemeToggle"; // Import the theme toggle
import { cn } from "@/lib/utils"; // If needed for conditional classes

// Define links centrally
const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/playbook", label: "Playbook" },
  // Add other main navigation links here
];

export default function Header() {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full", // Sticky positioning
      "border-b border-[rgb(var(--border-subtle-rgb))]", // Subtle border using theme variable
      "bg-[rgb(var(--header-bg-rgb))]/95 backdrop-blur-sm" // Background with transparency + blur
      // Add a subtle shadow if desired: "shadow-sm"
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6"> {/* Content container */}
        <div className="flex items-center justify-between h-16"> {/* Height and flex layout */}

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-start flex-wrap items-center gap-x-6 lg:gap-x-8"> {/* Use gap for spacing */}
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-x-2 sm:gap-x-4">
            <ThemeToggle /> {/* Add Theme Toggle */}

            {/* Auth Buttons / Links */}
            <div className="hidden sm:flex items-center gap-x-2"> {/* Hide on smallest screens if needed */}
              <Suspense fallback={<div>Loading...</div>}> {/* Keep suspense */}
                <DashboardButton />
              </Suspense>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileMenu /> {/* Render mobile menu component */}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
