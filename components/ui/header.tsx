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

export default function AppHeader({
  toggleAction,
  isMenuOpen,
}: AppHeaderProps) {
  const headerBlockClasses = cn([
    "pointer-events-auto",
    "flex items-center justify-between flex-1",
    "transition-colors duration-500 ease-out-alias",
    "bg-transparent",
    {
      "text-white": !isMenuOpen,
      "text-black": isMenuOpen,
    },
  ]);

  const burgerClasses = cn([
    "hamburger-button",
    "group cursor-pointer relative inline-block w-9 h-4 bg-transparent text-current",
    { "is-active": isMenuOpen },
  ]);

  return (
    <div className="header-container">
      <header>
        <div className={headerBlockClasses}>
          <Link href="/">
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
        </div>
      </header>
    </div>
  );
}
