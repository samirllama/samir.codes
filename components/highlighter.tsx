// components/highlighter.tsx (Refactored with Tailwind v3)
import React, { useRef, useEffect } from "react";
import useMousePosition from "./hooks/mouse-position"; // Assuming hook is moved or path updated
import { cn } from "@/lib/utils";

// --- Highlighter Container ---
// This component manages mouse position and applies CSS variables to children
type HighlighterProps = {
  children: React.ReactNode;
  className?: string;
  refresh?: boolean; // Prop to trigger re-calculation if needed
};

export default function Highlighter({
  children,
  className = "",
  refresh = false,
}: HighlighterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  // No need for boxes state if we apply variables directly

  // Function to initialize container dimensions
  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  // Function to update mouse position variables on children
  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;

      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        // Apply CSS variables to all direct children with the target class
        Array.from(containerRef.current.children).forEach((el) => {
          if (el instanceof HTMLElement && (el.classList.contains('highlighterItem') || el.classList.contains('highlighterItem02'))) {
            const box = el;
            const boxX = -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
            const boxY = -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
            box.style.setProperty("--mouse-x", `${boxX}px`);
            box.style.setProperty("--mouse-y", `${boxY}px`);
          }
        });
      }
    }
  };

  // Initialize container size on mount and resize
  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);
    return () => {
      window.removeEventListener("resize", initContainer);
    };
  }, []);

  // Update mouse variables on mouse move
  useEffect(() => {
    onMouseMove();
  }, [mousePosition]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-initialize if refresh prop changes
  useEffect(() => {
    initContainer();
  }, [refresh]);

  return (
    // Apply passed className to the container
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}

// --- Highlighter Item ---
type HighlighterItemProps = {
  children: React.ReactNode;
  className?: string;
};

// Base Highlighter Item
export function HighlighterItem({
  children,
  className = "",
}: HighlighterItemProps) {
  return (
    <div
      // Apply base Tailwind styles + the custom class for pseudo-elements
      className={cn(
        "highlighterItem", // Custom class for global CSS pseudo-elements
        "relative h-full overflow-hidden rounded-2xl p-px", // Base layout/styles
        "bg-slate-800 dark:bg-slate-900", // Base background
        "transition-colors duration-300 ease-in-out", // Transition for hover
        "group-hover:bg-slate-700 dark:group-hover:bg-slate-800", // Background change on group hover
        className // Allow merging additional classes
      )}
      // Initialize CSS variables (optional, but good practice)
      style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}
    >
      {/* Inner div might be needed if padding interferes with pseudo-elements */}
      <div className="relative h-full bg-inherit rounded-[inherit] z-10"> {/* z-index to keep content above ::after */}
         {children}
      </div>
    </div>
  );
}

// Variant Highlighter Item (uses different pseudo-element styles via class)
export function HighlighterItem02({
  children,
  className = "",
}: HighlighterItemProps) {
  return (
    <div
      // Apply base Tailwind styles + the variant custom class
      className={cn(
        "highlighterItem02", // Custom class for global CSS pseudo-elements (variant)
        "relative h-full overflow-hidden rounded-2xl p-px", // Base layout/styles
        "bg-slate-800 dark:bg-slate-900", // Base background
        "transition-colors duration-300 ease-in-out", // Transition for hover
        "group-hover:bg-slate-700 dark:group-hover:bg-slate-800", // Background change on group hover
        className // Allow merging additional classes
      )}
      style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}
    >
       <div className="relative h-full bg-inherit rounded-[inherit] z-10">
         {children}
      </div>
    </div>
  );
}
