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
  paragraphClassName = "font-semibold",
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
      if (isDeleting && step.nextText === "") {
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
      }
    }, step.delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
      {staticPrefix && (
        <span className="inline-block align-bottom pr-3 min-h-[1.2em] ">{staticPrefix}</span>
      )}

      {/* Dynamic part within styled span */}
      <span
        className={cn(
          // Base styles needed for effect
          "inline-block relative align-bottom whitespace-nowrap min-h-[1.2em]",
          // Custom class for caret (styles in global CSS)
          "blinkingCaret",
          // Default text color (overridden by dark gradient)
          "text-inherit", // Inherit color from parent <p>
          // Dark mode gradient text (using mapped colors from tailwind.config)
          "dark:bg-gradient-to-r dark:from-primary-400 dark:to-secondary-400 dark:bg-clip-text dark:text-transparent"
        )}
      >
        {displayedText || "\u00A0"}
      </span>
    </p>
  );
};

export default TypingEffect;
