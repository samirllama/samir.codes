// src/components/ui/staggered-svg-text.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface StaggeredSvgTextProps {
  pathData: string[];
  hoverAnimations: string[];
  viewBox?: string;
  fillColor?: string;
}

const StaggeredSvgText: React.FC<StaggeredSvgTextProps> = ({
  pathData,
  hoverAnimations,
  viewBox = "0 0 60 15",
  fillColor = "currentColor",
}) => {
  return (
    <svg viewBox={viewBox} fill={fillColor}>
      {pathData.map((d, index) => (
        <path
          key={index}
          d={d}
          className={cn([
            "transform-custom",
            `group-hover:animate-[${hoverAnimations[index]}]`,
          ])}
        />
      ))}
    </svg>
  );
};

export default StaggeredSvgText;
