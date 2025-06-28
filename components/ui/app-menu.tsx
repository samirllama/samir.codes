// components/ui/app-menu.tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";


export default function AppMenu({ isMenuOpen }: { isMenuOpen: boolean }) {
  const menuContainerClasses = cn([
    "app-menu",
    "fixed",
    "inset-x-0",
    "top-0",
    "h-screen",
    "transform",
    "menu-slide-transition-custom",
    "z-[9]",
    "overflow-hidden",
    {
      "translate-y-0": isMenuOpen,
      "-translate-y-full": !isMenuOpen,
      "pointer-events-auto": isMenuOpen,
      "pointer-events-none": !isMenuOpen,
      visible: isMenuOpen,
      invisible: !isMenuOpen,
    },
  ]);

  const lightBackgroundPanelClasses = cn([
    "absolute",
    "inset-x-0",
    "top-0",
    "w-full",
    "bg-white",
    "menu-panel-transition-custom",
    "h-[75vh]",
  ]);

  const blackOverlayClasses = cn([
    "absolute",
    "inset-0",
    "bg-black",
    "menu-black-overlay-transition",
    {
      "opacity-100": isMenuOpen,
      "opacity-0": !isMenuOpen,
    },
  ]);

  const menuContentClasses = cn([
    "relative",
    "w-full",
    "h-full",
    "flex",
    "justify-between",
    "items-start",
    "pt-[calc(230/16*1rem)]",
    "px-[calc(150/16*1rem)]",
    "text-black", // Ensure all text content in the menu is black
    {
      "is-ready": true,
      "is-active": isMenuOpen,
    },
  ]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div className={menuContainerClasses}>
      <div className={blackOverlayClasses}></div>

      <div className={lightBackgroundPanelClasses}></div>
      <div
        className={cn(
          "absolute",
          "inset-x-0",
          "top-0",
          "h-full",
          menuContentClasses
        )}
        data-testid="menu-content"
      >
        {/* Left Column: Menu Items Section */}
        <ul className="grid grid-cols-1 gap-y-4 md:gap-6 text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tighter w-fit">
          {navItems.map((item, index) => (
            <li
              key={item.name}
              className={cn(
                "opacity-0 transform -translate-y-full transition-all ease-out-quad duration-700",
                {
                  "opacity-100 translate-y-0": isMenuOpen,
                }
              )}
              style={{
                transitionDelay: isMenuOpen
                  ? `${index * 0.08}s`
                  : `${(navItems.length - index) * 0.08}s`,
              }}
            >
              <Link
                className="relative group inline-flex items-center transition-opacity duration-500 hover:opacity-70"
                href={item.href}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out-quad group-hover:w-full"></span>
                
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
