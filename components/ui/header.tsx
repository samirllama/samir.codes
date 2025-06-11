// components/ui/header.tsx

"use client"; // Needs client-side interactivity

import { useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import DashboardButton from "../DashboardButton";
import ThemeToggle from "../ThemeToggle";
import { cn } from "@/lib/utils";

export default function HeaderMinimal() {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-colors ease-[cubic-bezier([0.83,0,0.17,1])] duration-[500ms] delay-[50ms]",
        "selection:bg-[var(--color-accent)] selection:text-black",
        "bg-surface-page"
      )}
      data-testid="header-minimal"
    >
      <div className="px-4 lg:px-5">
        <div className="grid grid-cols-3 lg:grid-cols-4 text-xl leading-none lg:text-2xl lg:leading-none border-b border-b-mousse-terracota pt-4 pb-3 lg:pt-4 lg:pb-3 items-center">
          <div className="align-center text-2xl  font-cinzel-deco">
            Samir Lama
          </div>
          <div className="col-span-2 text-center hidden lg:flex justify-center items-center">
            <div className="relative flex overflow-hidden lg:max-w-[250px] xl:max-w-[300px] pb-[0.25rem]">
              <div className="marquee">
                <span className="mr-4">Software Engineer&nbsp;&nbsp;—</span>
                <span className="mr-4">Chicago Based&nbsp;&nbsp;—</span>
                <span className="mr-4">Web Developer&nbsp;&nbsp;—</span>

                <span className="mr-4">Software Engineer&nbsp;&nbsp;—</span>
                <span className="mr-4">Chicago Based&nbsp;&nbsp;—</span>
                <span className="mr-4">Web Developer&nbsp;&nbsp;—</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeaderWithScrollNav() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className="bg-header border-b border-[var(--header-text)] text-[var(--header-text)] flex items-center py-3 relative"
      data-testid="header-bar-dropdown"
    >
      <div className="align-center text-2xl">Samir Lama</div>
      <div
        className="hamburger flex flex-col justify-center items-center cursor-pointer absolute top-[100%] left-1/2 transform -translate-x-1/2"
        onClick={toggleMenu}
      >
        <div className="w-8 h-0.5 bg-[var(--header-text)] mb-1"></div>
        <div className="w-8 h-0.5 bg-[var(--header-text)] mb-1"></div>
        <div className="w-8 h-0.5 bg-[var(--header-text)]"></div>
      </div>
      <nav
        className={`menu absolute top-full left-0 w-full bg-header transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } z-10`}
      >
        <ul className="list-none p-4 m-0">
          <li className="mb-2">
            <a
              href="#"
              className="text-[var(--header-text)] no-underline hover:underline"
            >
              Home
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-[var(--header-text)] no-underline hover:underline"
            >
              About
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-[var(--header-text)] no-underline hover:underline"
            >
              Services
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-[var(--header-text)] no-underline hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// Define links centrally
const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/playbook", label: "Playbook" },
];

export function Header_() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full", // Sticky positioning
        "border-b border-[rgb(var(--border-subtle-rgb))]", // Subtle border using theme variable
        "bg-[rgb(var(--header-bg-rgb))]/95 backdrop-blur-sm"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 mr-4">
            <Logo />
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-start flex-wrap items-center gap-x-6 lg:gap-x-8">
              {/* Use gap for spacing */}
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
            <ThemeToggle />
            {/* Auth Buttons / Links */}
            <div className="hidden sm:flex items-center gap-x-2">
              <Suspense fallback={<div>Loading...</div>}>
                {/* Keep suspense */}
                <DashboardButton />
              </Suspense>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
