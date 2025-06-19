// components/ui/app-menu.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

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
    "z-[2]",
    "menu-panel-transition-custom",
    "h-[75vh]",
  ]);

  const blackOverlayClasses = cn([
    "absolute",
    "inset-0",
    "bg-black",
    "z-[1]",
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
    "flex-col",
    "items-start",
    "justify-start",
    "pt-20",
    "px-10",
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
      >
        <ul className="text-3xl font-light leading-snug tracking-tighter pt-[150px] pl-[calc(211/16*1rem)]">
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
                  className="relative group inline-block transition-opacity duration-500 opacity-100 hover:opacity-70"
                  href={`/${item.toLowerCase()}`}
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>

        <div className="flex flex-col justify-between pt-10">
          <a
            href="mailto:samir.lama@gmail.com"
            className="group relative text-5xl font-light leading-tight md:text-xl md:leading-normal border-t border-gray-200 py-10 px-8 block"
          >
            samirllama@gmail.com
          </a>
          <div className="hidden md:block">
            <div className="text-base leading-snug mb-5 w-52 md:w-3/4">
              <h4 className="font-normal">The Accelerator</h4>
              <h4>
                <span className="opacity-70">
                  Maximize your brand equity while extending your runway.
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppMenu_V0({ isMenuOpen }: { isMenuOpen: boolean }) {
  const menuRef = useRef(null);

  // Manage pointer-events and visibility
  useEffect(() => {
    if (menuRef.current) {
      // For immediate transition, set display block
      menuRef.current.style.display = isMenuOpen ? "block" : "none";

      // Set pointer-events based on open state
      menuRef.current.style.pointerEvents = isMenuOpen ? "auto" : "none";
    }
  }, [isMenuOpen]);

  const menuClasses = cn([
    "app-menu",
    "block",
    "z:9",
    "fixed",
    "tl:0",
    "w:fit",
    {
      "mobile-menu": true,
      open: isMenuOpen, // 'open' class to trigger animations
    },
  ]);

  // `is-ready` and `is-active` class logic is common for
  // orchestrating intro animations of sub-elements.
  // Apply it directly to the menu content container when open.
  const menuContentClasses = cn([
    "abs",
    "tl:0",
    "w:fit",
    "h:fit",
    "flex",
    "items:center",
    "just:start",
    "p-l:211fx",
    "p-r:290fx",
    "z:3",
    {
      "is-ready": true,
      "is-active": isMenuOpen,
    },
  ]);

  return (
    <div
      ref={menuRef}
      className={menuClasses}
      style={{
        height: "1060px",
        display: "none", // `display: none` by default, toggled by useEffect
        pointerEvents: "none",
      }}
    >
      {/* Background/Overlay Divs */}
      <div className="h:100vh pointer:none">
        {/* Black Overlay */}
        <div className="abs tl:0 w:fit h:fit bg:black tween-opacity-1-3s-easeOut2 o:0 anim-in:o:1 transform z:1">
          <div
            className={cn([
              "abs tl:0 w:fit h:fit bg:black z:1",
              {
                "o:1": isMenuOpen, // Apply opacity when open
                "o:0": !isMenuOpen, // Hide when closed
              },
            ])}
          ></div>
        </div>

        {/* Light Background Panel */}
        <div className="abs tl:0 w:fit h:800fy bg:light z:2 transform shift-y:-103% anim-in:shift-y:0% tween-all-1-3s-easeOut2 h:100vh@m">
          <div
            className={cn([
              "abs tl:0 w:fit h:800fy bg:light z:2",
              {
                transform: true,
                "shift-y:-103%": !isMenuOpen,
                "anim-in:shift-y:0%": isMenuOpen,
              },
            ])}
          ></div>
        </div>
      </div>

      {/* Menu Content Div */}
      <div className={menuContentClasses}>
        <ul className="fs:30fx fw:300 lh:60fx spacing:-3%">
          {/* Mapping over dummy links for now */}
          {["Home", "About", "Portfolio", "News", "Careers", "Contact"].map(
            (item, index) => (
              <li
                key={item}
                className={cn([
                  "o:0",
                  "transform",
                  "shift-y:-100fy",
                  "tween-1-8s-easeOut",
                  {
                    "anim-in:shift-y:0": isMenuOpen,
                    "anim-in:o:1": isMenuOpen,
                  },
                ])}
                style={
                  {
                    // For now, let's try direct setting of CSS variables for staggering
                    // if the `anim-in` classes don't handle it with their own delays.
                    // This might need more complex CSS variables or a `useEffect` for each li.
                  }
                }
              >
                <a
                  className="rel group iblock tween-0-5s-easeOut o:1"
                  href={`/${item.toLowerCase()}`}
                >
                  {/* <letter-split> and <app-line> components would go here */}
                  {item} {/* Placeholder text */}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Email and Accelerator Section */}
        <div className="flex dir:column just:between p-x:0%@m d:block@m w:fit@m">
          <a
            href="mailto:samir.lama@gmail.com"
            className="group rel fs:48fx lh:72fx fw:300 fs:20fx@m lh:30fx@m b-t:solid,1px,black20@m p-y:50fy@m p-x:8%@m d:block@m"
          >
            samirllama@gmail.com {/* Placeholder text */}
          </a>
          {/* The Accelerator Section */}
          <div className="d:none@m">
            <div className="fs:16fx lh:30fx m-b:19fy w:206fx w:70%@m">
              <h4 className="fw:400">The Accelerator</h4>
              <h4>
                <span className="o:0.7">
                  Maximize your brand equity while extending your runway.
                </span>
              </h4>
            </div>
            {/* <arrow-link> component would go here */}
            {/* <a href="https://gust.com/programs/q1-q2-2024" target="_blank">Learn more</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
