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
    "flex-row", // Changed to flex-row for a two-column layout
    "justify-between", // Pushes content to left and right edges
    "items-start", // Aligns content to the top
    "pt-[calc(150/16*1rem)]", // Padding top, assuming header height
    "px-[calc(150/16*1rem)]", // Adjusted horizontal padding to match screenshot's left/right spacing
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

      {/* Menu Content Div: This is where we lay out the menu items and contact info */}
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
        <ul className="grid grid-cols-1 gap-y-2 md:gap-y-4 text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tighter w-fit">
          {["Home", "About", "Portfolio", "News", "Careers", "Contact"].map(
            (item, index) => (
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
            )
          )}
        </ul>

        {/* Right Column: Contact & Accelerator Section */}
        {/* Adjusted flex-col and mt- to ensure correct stacking and spacing */}
        <div className="flex flex-col items-end text-right ml-auto pt-4 md:pt-0">
          <a
            href="mailto:samirllama@gmail.com"
            className="block text-5xl md:text-6xl lg:text-7xl font-light leading-tight underline group relative transition-opacity duration-300 hover:opacity-70"
          >
            samirllama@gmail.com
          </a>
          {/* Accelerator Section */}
          <div className="mt-8 md:mt-12 max-w-xs md:max-w-sm">
            <h4 className="text-xl md:text-2xl font-bold mb-2">
              The Accelerator
            </h4>
            <p className="text-base md:text-lg leading-snug opacity-90">
              Maximize your brand equity while extending your runway.
            </p>
            <a
              href="https://gust.com/programs/q1-q2-2024"
              target="_blank"
              className="mt-4 inline-flex items-center text-blue-600 hover:underline group"
            >
              <span className="mr-2 transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>{" "}
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
