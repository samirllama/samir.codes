// src/components/ui/staggered-text.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface StaggeredTextProps {
  text: string;
  baseDelay?: number;
  delayIncrement?: number;
  isActive?: boolean;
}

const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  baseDelay = 0,
  delayIncrement = 0.05,
  isActive = false,
}) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={cn("inline-block transform-custom anim-in", {
            "anim-in-fade-up": !isActive, // Apply initial state when menu is NOT active
          })}
          style={{ transitionDelay: `${baseDelay + index * delayIncrement}s` }}
        >
          {char}
        </span>
      ))}
    </>
  );
};

export default StaggeredText;
