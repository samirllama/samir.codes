// components/Highlighter.tsx
import React, { useRef, useEffect } from "react";
import useMousePosition from "./hooks/mouse-position";
import { cn } from "@/lib/utils";

type HighlighterProps = {
  children: React.ReactNode;
  className?: string;
  refresh?: boolean;
};

export default function Highlighter({
  children,
  className = "",
  refresh = false,
}: HighlighterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const containerSize = useRef({ w: 0, h: 0 });

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);
    return () => window.removeEventListener("resize", initContainer);
  }, []);
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;

      const inside = x < w && x > 0 && y < h && y > 0;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;

        Array.from(containerRef.current.children).forEach((el) => {
          if (
            el instanceof HTMLElement &&
            (el.classList.contains("highlighterItem") ||
              el.classList.contains("highlighterItem02"))
          ) {
            const boxRect = el.getBoundingClientRect();
            const boxX = -(boxRect.left - rect.left) + mouse.current.x;
            const boxY = -(boxRect.top - rect.top) + mouse.current.y;
            el.style.setProperty("--mouse-x", `${boxX}px`);
            el.style.setProperty("--mouse-y", `${boxY}px`);
          }
        });
      }
    }
  }, [mousePosition]);

  useEffect(() => {
    initContainer();
  }, [refresh]);

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}
