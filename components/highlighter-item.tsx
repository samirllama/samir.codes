// components/highlighter-item.tsx
import React from "react";
import { cn } from "@/lib/utils";

type HighlighterItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function HighlighterItem({
  children,
  className = "",
}: HighlighterItemProps) {
  return (
    <div
      className={cn(
        "highlighterItem",
        "relative h-full overflow-hidden rounded-2xl p-px",
        "bg-slate-800 dark:bg-slate-900",
        "transition-colors duration-300 ease-in-out",
        "group-hover:bg-slate-700 dark:group-hover:bg-slate-800",
        className
      )}
    >
      <div className="relative h-full bg-inherit rounded-[inherit] z-10">
        {children}
      </div>
    </div>
  );
}

export function HighlighterItem02({
  children,
  className = "",
}: HighlighterItemProps) {
  return (
    <div
      className={cn(
        "highlighterItem02",
        "relative h-full overflow-hidden rounded-2xl p-px",
        "bg-slate-800 dark:bg-slate-900",
        "transition-colors duration-300 ease-in-out",
        "group-hover:bg-slate-700 dark:group-hover:bg-slate-800",
        className
      )}
    >
      <div className="relative h-full bg-inherit rounded-[inherit] z-10">
        {children}
      </div>
    </div>
  );
}
