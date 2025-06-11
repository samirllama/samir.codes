"use client";

// src/components/ui/header.tsx
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "./logo";
import StaggeredText from "./staggered-text";

// Hamburger Button component
function BurgerButton() {
  const [isHovered, setIsHovered] = useState(false);

  const [isActive, setIsActive] = useState(false);

  // 'active' state takes precedence over 'hovered'.
  const effectiveState = isActive ? "active" : isHovered ? "hovered" : "";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      role="button" // Improve accessibility
      aria-label={isActive ? "Close menu" : "Open menu"}
      className={cn([
        "pointer-events-auto relative group inline-block w-36px h-15px bg-none text-current",
        `burger-wrapper ${effectiveState}`,
      ])}
    >
      {/* Line 1: with shift-y:-2.5px and burger_close_line1 animation */}
      <div className="line-wrapper line-wrapper-1"></div>

      {/*Line 2: with shift-y:2.5px and burger_close_line2 animation*/}
      <div className="line-wrapper line-wrapper-2"></div>
    </div>
  );
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Example: Base header theme state (e.g., from a context, scroll, or prop)
  const [isHeaderBlockDark, setIsHeaderBlockDark] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // Determines header's actual dark/light state, If menu open, inverse base theme; otherwise, use base theme.
  const effectiveHeaderIsDark = isMenuOpen
    ? !isHeaderBlockDark
    : isHeaderBlockDark;

  // 1. Header Container Classes: Ensure header is above the menu overlay
  const headerContainerClasses = cn(["fixed w-screen z-50"]);

  // 2. Header Block Classes: Apply effective theme state
  const headerBlockClasses = cn([
    "pointer-events-auto flex items-center justify-between",
    "transition-colors duration-500 ease-out-alias",
    "p-10",
    {
      "is-dark": !effectiveHeaderIsDark,
    },
  ]);

  const menuOverlayClasses = cn([
    "fixed inset-0 z-40 transition-opacity duration-500",
    "h-[80vh] w-screen", // Menu covers 80% of viewport height
    "bg-white",
    {
      "opacity-100 visible": isMenuOpen,
      "opacity-0 invisible pointer-events-none": !isMenuOpen,
    },
  ]);

  return (
    <div className={headerContainerClasses}>
      <header className={headerBlockClasses}>
        <Link href="/" className="pointer-events-auto text-white">
          <Logo />
        </Link>

        {/* Burger Button */}
        <div
          onClick={toggleMenu}
          className={cn([
            "pointer-events-auto relative group inline-block w-36px h-15px mr-20 bg-none text-current",
            "menu-button",
            { "is-active": isMenuOpen },
          ])}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          role="button"
          tabIndex={0}
        >
          {/* Burger lines - their color will inherit from headerBlockClasses's color property */}
          <span
            className={cn([
              "burger-line-container shift-y--2-5px transform-custom backface-hidden",
              { "shift-y-0 rotate-45deg": isMenuOpen },
            ])}
          >
            <span className="burger-line-segment origin-[0%_50%] transform-custom"></span>
            <span className="burger-line-segment origin-[100%_50%] transform-custom"></span>
          </span>
          <span
            className={cn([
              "burger-line-container shift-y-2-5px transform-custom backface-hidden",
              { "shift-y-0 rotate-neg-45deg": isMenuOpen },
            ])}
          >
            <span className="burger-line-segment origin-[0%_50%] transform-custom"></span>
            <span className="burger-line-segment origin-[100%_50%] transform-custom"></span>
          </span>
        </div>
      </header>

      {/* Full-screen Menu Overlay */}
      <div className={menuOverlayClasses}>
        {/* Inner div for content alignment within the menu */}
        <div
          className={cn([
            // Ensure this inner div also accounts for the 80vh height of its parent
            "h-full w-screen flex flex-col justify-center items-center overflow-y-auto",
            "pt-130fy pb-217fy",
            "scroll-object",
            {
              "is-ready": true,
              "is-active": isMenuOpen,
            },
          ])}
        >
          <nav className="space-y-195fy text-black text-center">
            {/* Menu text always black for white background */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu} // Close menu on link click
                className="block leading-none font-bold transition-colors duration-500 ease-out-alias hover:text-gray-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
