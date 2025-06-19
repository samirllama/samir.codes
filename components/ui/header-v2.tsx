// @/components/ui/header.tsx

"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "./logo";
import StaggeredText from "./staggered-text";

interface BurgerButtonProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

function BurgerBtn({ isActive, onClick, className }: BurgerButtonProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      aria-label={isActive ? "Close menu" : "Open menu"}
      className={cn([
        "pointer-events-auto relative group inline-block w-36px h-15px bg-none text-current",
        "line-wrapper",
        { "is-active": isActive },
        className,
      ])}
    >
      <span
        className={cn([
          "line-wrapper-1",
          "transform-custom h-5px w-fit-fx block",
        ])}
        style={
          isActive
            ? ({
                "--translateY": "0px",
                "--rotate": "45deg",
                "--scaleX": "0.7",
                "--scaleY": "1",
              } as React.CSSProperties)
            : {}
        }
      ></span>

      <span
        className={cn([
          "line-wrapper-2",
          "transform-custom h-5px w-fit-fx block",
        ])}
        style={
          isActive
            ? ({
                "--translateY": "0px",
                "--rotate": "-45deg",
                "--scaleX": "0.7",
                "--scaleY": "1",
              } as React.CSSProperties)
            : {}
        } // Type assertion for custom CSS properties
      ></span>
    </div>
  );
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

interface AppHeaderProps {
  isMenuOpen: boolean;
  toggleAction: () => void;
}

export function AppHeader({ toggleAction, isMenuOpen }: AppHeaderProps) {
  const headerContainerClasses = cn([
    "fixed",
    "w-100vw",
    "z-50",
    "pointer:none",
  ]);

  const headerBlockClasses = cn([
    "pointer-events-auto flex items-center justify-between",
    "transition-colors duration-500 ease-out-alias",
    "p-10",
    "bg-transparent",
    {
      "text-white": !isMenuOpen, // Default: Black background, White text/elements
      "text-black": isMenuOpen, // Menu Open: White background, Black text/elements
    },
  ]);

  const burgerClasses = cn([
    "hamburger-button",
    "group cursor-pointer relative inline-block w-9 h-4 bg-transparent text-current",
    { "is-active": isMenuOpen },
  ]);

  return (
    <div className={headerContainerClasses}>
      <header className={headerBlockClasses}>
        <Link
          href="/"
          className={`pointer-events-auto ${
            isMenuOpen ? "text-black" : "text-white"
          }`}
        >
          <Logo />
        </Link>

        <div
          id="hamburger-button"
          role="button"
          onClick={toggleAction}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={burgerClasses}
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
      </header>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const headerContainerClasses = cn(["fixed w-screen"]);

  const headerBlockClasses = cn([
    "pointer-events-auto flex items-center justify-between",
    "transition-colors duration-500 ease-out-alias",
    "p-10",
    "z-50",
    {
      "bg-black text-white": !isMenuOpen, // Default: Black background, White text/elements
      "bg-white text-black": isMenuOpen, // Menu Open: White background, Black text/elements
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

  const burgerClasses = cn([
    "hamburger-button",
    "group cursor-pointer relative inline-block w-9 h-4 bg-transparent text-current",
    { "is-active": isMenuOpen },
  ]);

  return (
    <div className={headerContainerClasses}>
      <header className={headerBlockClasses}>
        <Link
          href="/"
          className={`pointer-events-auto ${
            isMenuOpen ? "text-black" : "text-white"
          }`}
        >
          <Logo />
        </Link>

        {/* <BurgerBtn
          isActive={isMenuOpen}
          onClick={toggleMenu}
          className="mr-20"
        /> */}

        <div
          id="hamburger-btn"
          role="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={burgerClasses}
        >
          <span className="hamburger-line-1 absolute top-1/2 left-0 w-full block h-px opacity-100 transform -translate-y-1.5">
            <span className="hamburger-line-1-start inline-block absolute top-0 left-0 w-full h-full bg-current origin-left transform scale-x-100"></span>
            <span className="hamburger-line-1-end inline-block absolute top-0 left-0 w-full h-full bg-current origin-left transform scale-x-100"></span>
          </span>
          <span className="hamburger-line-2 absolute top-1/2 left-0 w-full block h-px opacity-100 transform translate-y-1.5">
            <span className="hamburger-line-2-start inline-block absolute top-0 left-0 w-full h-full bg-current origin-right transform scale-x-100"></span>
            <span className="hamburger-line-2-end inline-block absolute top-0 left-0 w-full h-full bg-current origin-right transform scale-x-100"></span>
          </span>
        </div>
      </header>

      <div className={menuOverlayClasses}>
        <div
          className={cn([
            "h-full w-screen flex flex-col justify-center items-center overflow-y-auto",
            "pt-130fy pb-217fy",
            "scroll-object",
            { "is-active": isMenuOpen },
          ])}
        >
          <nav className="space-y-195fy text-black text-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="block leading-none font-bold transition-colors duration-500 ease-out-alias hover:text-gray-500 text-3xl"
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
