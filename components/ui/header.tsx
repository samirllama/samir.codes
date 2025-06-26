// @/components/ui/header.tsx

"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "./logo";

interface AppHeaderProps {
  isMenuOpen: boolean;
  toggleAction: () => void;
}

export default function AppHeader({
  toggleAction,
  isMenuOpen,
}: AppHeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerContainerStyles = cn("header-container", {
    "header-container-scrolled": hasScrolled && !isMenuOpen,
  });

  const headerBStyles = cn([
    "app-header-block",
    {
      "text-white": !isMenuOpen,
      "text-black": isMenuOpen,
    },
  ]);

  const burgerStyles = cn([
    "hamburger-button",
    "hidden group cursor-pointer relative inline-block w-9 h-4 bg-transparent text-current",
    { "is-active": isMenuOpen },
  ]);

  return (
    <div className={headerContainerStyles}>
      <header>
        <div className={headerBStyles}>
          <Link href="/">
            <Logo />
          </Link>

          <div
            id="hamburger-button"
            role="button"
            onClick={toggleAction}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={burgerStyles}
          >
            <span className="hamburger-line-1 line-wrapper-1 absolute top-1/2 left-0 w-full block h-px opacity-100 tra-translate-y-1.5">
              <span className="hamburger-line-1-start inline-block absolute top-0 left-0 w-full h-full bg-current origin-left transform scale-x-100"></span>
              <span className="hamburger-line-1-end inline-block absolute top-0 left-0 w-full h-full bg-current origin-left transform scale-x-100"></span>
            </span>
            <span className="hamburger-line-2 line-wrapper-2 absolute top-1/2 left-0 w-full block h-px opacity-100  translate-y-1.5">
              <span className="hamburger-line-2-start inline-block absolute top-0 left-0 w-full h-full bg-current origin-right scale-x-100"></span>
              <span className="hamburger-line-2-end inline-block absolute top-0 left-0 w-full h-full bg-current origin-right scale-x-100"></span>
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}
