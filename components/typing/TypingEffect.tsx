// /components/typing/TypingEffect.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./typing.module.css";
import { calculateNextTypingStep } from "@/lib/typing-logic";

interface TypingEffectProps {
  /** The static text to display before the typing animation. */
  staticPrefix?: string;
  /** Array of the dynamic text parts to cycle through. */
  items: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  paragraphClassName?: string;
  // staticTextClassName prop is removed as staticPrefix handles it more directly
}

// Default dynamic parts
const defaultItems = ["gaming.", "reading.", "coding."];

const TypingEffect: React.FC<TypingEffectProps> = ({
  staticPrefix = "", // Default to empty string
  items = defaultItems,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
  paragraphClassName = "text-2xl md:text-3xl font-semibold my-8",
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  // **** IMPORTANT: displayedText now ONLY stores the DYNAMIC part ****
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Ensure items array is valid before starting
    if (!items || items.length === 0) return;

    // The helper function works correctly as it operates on the items array
    // which now contains only the dynamic parts.
    const step = calculateNextTypingStep(
      { items, currentItemIndex, displayedText, isDeleting },
      { typingSpeed, deletingSpeed, pauseDuration }
    );

    timeoutRef.current = setTimeout(() => {
      // Update the state for the dynamic part
      setDisplayedText(step.nextText);
      setIsDeleting(step.nextIsDeleting);

      // If we just finished deleting the dynamic part (it became empty)
      if (isDeleting && step.nextText === "") {
        // Move to the next item in the list
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
        // isDeleting will be set to false in the next effect run via step.nextIsDeleting
      }
    }, step.delay);

    // Cleanup function
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
    <p className={`${paragraphClassName}`}>
      {/* Render the static prefix if provided */}
      {staticPrefix && <span>{staticPrefix}</span>}
      {/* Render the dynamic part within the styled span */}
      <span
        className={`
          ${styles.gradientText}
          ${styles.blinkingCaret}
          ${styles.dynamicTextContainer}
        `}
      >
        {/* Render a non-breaking space if dynamic text is empty for layout/caret */}
        {displayedText || "\u00A0"}
      </span>
    </p>
  );
};

export default TypingEffect;
