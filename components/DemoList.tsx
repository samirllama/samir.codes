// app/components/NavList.tsx
"use client";
import clsx from "clsx";
import { useState } from "react";

type Item = {
  label: string;
};

type NavListProps = {
  items: Item[];
};

export default function NavList({ items }: NavListProps) {
  const [hoverTarget, setHoverTarget] = useState<number | null>(null);
  const siblingCount = items.length;

  return (
    <ul
      className="group fancy-hover"
      onMouseLeave={() => setHoverTarget(null)}
      style={{ "--sibling-count": siblingCount } as React.CSSProperties}
    >
      {items.map((item, index) => {
        const siblingIndex = index + 1;
        const angle = `calc((var(--sibling-index) - var(--target)) * 5deg)`;
        const distanceMultiplier = `calc(abs(var(--sibling-index) - var(--target)) * 15%)`;
        const gradualFadeout = `calc(100% - ${distanceMultiplier})`;

        const liClasses = clsx(
          // Base styles for all list items
          "relative",
          "cursor-pointer",
          "transition-[transform,opacity]",
          "duration-2000", // Matches the 2s transition in the original CSS
          "ease-spring-5",
          "opacity-100",
          // Styles for when the parent is hovered but this item is not
          "group-hover:opacity-[var(--gradual-fadeout)]",
          "group-hover:rotate-z-[var(--angle)]"
        );

        return (
          <li
            key={item.label}
            className={clsx(liClasses, "font-sans font-light text-2xl")}
            onMouseEnter={() => setHoverTarget(siblingIndex)}
            style={
              {
                "--sibling-index": siblingIndex,
                "--target": hoverTarget,
                "--angle": angle,
                "--gradual-fadeout": gradualFadeout,
                transformOrigin: "-200% 50%",
              } as React.CSSProperties
            }
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
