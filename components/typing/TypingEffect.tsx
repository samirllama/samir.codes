// /components/typing/TypingEffect.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { calculateNextTypingStep } from "@/lib/typing-logic";
import { cn } from "@/lib/utils";

interface TypingEffectProps {
  staticPrefix?: string /** Static text to display before typing animation. */;
  items: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  paragraphClassName?: string;
}

const defaultItems = ["gaming.", "reading.", "coding."];

const TypingEffect: React.FC<TypingEffectProps> = ({
  staticPrefix = "",
  items = defaultItems,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
  paragraphClassName = "text-2xl md:text-3xl font-semibold my-8",
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const step = calculateNextTypingStep(
      { items, currentItemIndex, displayedText, isDeleting },
      { typingSpeed, deletingSpeed, pauseDuration }
    );

    timeoutRef.current = setTimeout(() => {
      setDisplayedText(step.nextText);
      setIsDeleting(step.nextIsDeleting);

      // If we just finished deleting the dynamic part (it became empty)
      if (isDeleting && step.nextText === "") {
        // Move to the next item in the list
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
        // isDeleting will be set to false in the next effect run via step.nextIsDeleting
      }
    }, step.delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    items,
    currentItemIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <p className={cn(paragraphClassName)}>
      {/* Static prefix */}
      {staticPrefix && <span>{staticPrefix}</span>}

      {/* Dynamic part within styled span */}
      <span
        className={cn(
          "bg-gradient-to-r",
          // Colors based on tailwind.config.ts mapping
          "from-primary-500",
          "to-secondary-500",
          "dark:from-primary-400",
          "dark:to-secondary-400",
          "bg-clip-text",
          "text-transparent", // ESSENTIAL: Makes text transparent for gradient bg

          // Layout/Appearance utilities (from old CSS module)
          "inline-block",
          "font-bold", // font-weight: 700
          "relative", // For caret positioning
          "align-bottom",
          "whitespace-nowrap",

          // Add min-height using arbitrary value to prevent collapse
          "min-h-[1.2em]",

          // Custom class  in global CSS
          "blinkingCaret"
        )}
      >
        {/* Render a non-breaking space if dynamic text is empty for layout/caret */}
        {displayedText || "\u00A0"}
      </span>
    </p>
  );
};

export default TypingEffect;
