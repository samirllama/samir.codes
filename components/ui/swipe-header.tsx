// components/layout/swipe-header.tsx

"use client"; // Needs client-side interactivity

import { useState, useRef } from "react";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "../ui/logo";
import ThemeToggle from "../ThemeToggle";
import DashboardButton from "../DashboardButton";
import { cn } from "@/lib/utils"; // cn utility
import { twMerge } from "tailwind-merge";

// === Potential Use Cases for Imported useEffect ===
// 1. Close menu on route change:
//    import { usePathname } from 'next/navigation';
//    const pathname = usePathname();
//    useEffect(() => {
//      setIsOpen(false);
//    }, [pathname]);
//
// 2. Calculate dynamic height or adjust styles on mount/state change:
//    useEffect(() => {
//      if (headerRef.current && isOpen) {
//        // Example: Log height or adjust based on content
//        // console.log('Menu height:', headerRef.current.scrollHeight);
//      }
//    }, [isOpen]); // Re-run when isOpen changes

// Define links centrally
const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/playbook", label: "Playbook" },
  { href: "/projects", label: "Projects" }, // Added a common portfolio link
  { href: "/contact", label: "Contact" }, // Added a common portfolio link
];

// Define the height of the expanded menu as a percentage of viewport height
const EXPANDED_HEIGHT_VH = 75; // 75vh

export default function SwipeHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null); // Use the more specific type HTMLDivElement

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuHeightClass = isOpen ? `h-[${EXPANDED_HEIGHT_VH}vh]` : "h-0";
  const menuTopClass = isOpen ? "top-0" : `-top-[${EXPANDED_HEIGHT_VH}vh]`;

  const headerBgClass = "bg-surface-page";
  const textColorClass = "text-text-default";
  const borderColorClass = "border-border-default";

  // Color for the hamburger lines (black for now, using dark neutral from theme)
  const hamburgerLineColorClass = "bg-neutral-darkest"; // Resolves to #333333 based on theme

  // Tailwind classes for the two hamburger icon lines
  const hamburgerLineClasses = twMerge(
    cn(
      "w-6 h-0.5 transition-transform duration-300 ease-in-out",
      hamburgerLineColorClass // Apply the line color
      // Add animation classes for when the menu is open if desired.
      // For the simple two lines from the screenshot, maybe just a slight rotate
      // or moving further apart, or no animation if you want them static.
      // Example: isOpen ? 'rotate-3' : ''
    )
  );
  return (
    <>
      <div
        data-testid="header-fixed-bar"
        className={twMerge(
          cn(
            "fixed top-0 left-0 right-0 z-50 flex justify-center items-center",
            "h-16",
            headerBgClass,
            borderColorClass,
            "border-b",
            "backdrop-blur-sm bg-opacity-95"
          )
        )}
      >
        {/* Hamburger Button - Centered */}
        <button
          data-testid="header-hamburger-button"
          onClick={toggleMenu}
          className={twMerge(
            cn(
              "flex flex-col items-center justify-between w-12 h-12 rounded-full",
              "focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:ring-opacity-50",
              "z-50",
              "py-3"
            )
          )}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {/* Hamburger Icon Lines Container */}
          <div className="flex flex-col justify-between h-4 w-6">
            {/* Added data-test ids for lines */}
            <div
              data-testid="hamburger-line-top"
              className={hamburgerLineClasses}
            ></div>
            <div
              data-testid="hamburger-line-bottom"
              className={hamburgerLineClasses}
            ></div>
          </div>
        </button>
      </div>

      {/* Added data-test id */}
      <div
        data-testid="header-expanded-menu"
        ref={headerRef}
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out",
          menuTopClass,
          menuHeightClass,
          headerBgClass,
          textColorClass,
          "overflow-y-auto",
          "shadow-xl",
          "flex flex-col items-center justify-center",
          "pt-20 pb-8"
        )}
      >
        {/* Content inside the Expanded Menu */}
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
          {/* Logo */}
          <div data-testid="header-logo" className="mb-8">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center mb-8 gap-y-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                // Added data-test id
                data-testid={`header-nav-link-${link.label
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className={cn(
                  "text-xl font-medium hover:text-interactive-primary transition-colors",
                  textColorClass
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div data-testid="header-theme-toggle" className="mb-6">
            <ThemeToggle />
          </div>

          {/* Dashboard Button/Auth Links */}
          <Suspense
            fallback={
              <div data-testid="header-dashboard-loading">Loading...</div>
            }
          >
            <DashboardButton data-testid="header-dashboard-button" />
          </Suspense>
        </div>
      </div>
      {/* Expanded Menu Panel */}
      <div
        ref={headerRef}
        className={twMerge(
          cn(
            "fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out",
            menuTopClass,
            menuHeightClass,
            headerBgClass, // Apply theme background to the expanded panel
            textColorClass, // Apply theme text color to the expanded panel
            "overflow-y-auto",
            "shadow-xl",
            "flex flex-col items-center justify-center",
            "pt-20 pb-8" // pt-20 to clear the fixed top bar (h-16 + some buffer)
          )
        )}
      >
        {/* Content inside the Expanded Menu */}
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center mb-8 gap-y-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={twMerge(
                  cn(
                    "text-xl font-medium hover:text-interactive-primary transition-colors",
                    textColorClass
                  )
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="mb-6">
            <ThemeToggle />
          </div>

          {/* Dashboard Button/Auth Links */}
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardButton />
          </Suspense>
        </div>
      </div>
    </>
  );
}

/**

Automated Testing: Providing stable selectors for test frameworks (like React Testing Library, Jest, Cypress) that are less likely to break if you refactor your CSS class names or HTML structure slightly.
Debugging and Inspection: Making it much easier to locate specific elements quickly in the browser's developer tools using attribute selectors (e.g., [data-testid="header-container"]).
I should have included them in the previous code examples. My apologies.


Additions:

data-testid="header-fixed-bar": On the outer fixed div that forms the visible top bar.
data-testid="header-hamburger-button": On the clickable button element.
data-testid="hamburger-line-top" and data-testid="hamburger-line-bottom": On the two inner divs forming the hamburger lines.
data-testid="header-expanded-menu": On the full-screen expanding menu div.
data-testid="header-logo": On the container around the Logo component.
data-testid={header-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}}: Dynamically generated for each navigation link.
data-testid="header-theme-toggle": On the container around the ThemeToggle.
data-testid="header-dashboard-loading": On the fallback loading div for Suspense.
data-testid="header-dashboard-button": Passed as a prop to the DashboardButton component (you'll need to ensure DashboardButton accepts and applies this prop to its root element).
 */
