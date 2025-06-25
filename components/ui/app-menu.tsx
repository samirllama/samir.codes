// components/ui/app-menu.tsx
"use client";

import { cn } from "@/lib/utils";

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
        <ul className="grid grid-cols-1 gap-y-2 md:gap-4 text-xl md:text-2xl lg:text-3xl font-light leading-tight tracking-tighter w-fit">
          {["Home", "About", "Notes", "Contact"].map((item, index) => (
            <li
              key={item}
              className={cn(
                "opacity-0 transform -translate-y-full transition-all ease-out-quad duration-700",
                {
                  "opacity-100 translate-y-0": isMenuOpen,
                }
              )}
              style={{
                transitionDelay: isMenuOpen
                  ? `${index * 0.08}s`
                  : `${(5 - index) * 0.08}s`,
              }}
            >
              <a
                className="relative group inline-block transition-opacity duration-500 hover:opacity-70"
                href={`/${item.toLowerCase()}`}
              >
                {item}
              </a>
            </li>
          ))}

          <li
            key="Resume"
            className={cn(
              "opacity-0 transform -translate-y-full transition-all ease-out-quad duration-700",
              {
                "opacity-100 translate-y-0": isMenuOpen,
              }
            )}
            style={{
              transitionDelay: isMenuOpen
                ? `${4 * 0.08}s`
                : `${(5 - 4) * 0.08}s`,
            }}
          >
            <a
              className="relative group inline-block transition-opacity duration-500 hover:opacity-70"
              href="/Samir_Resume.pdf" // IMPORTANT: Place resume file (e.g., Samir_Resume.pdf) in `public`
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
