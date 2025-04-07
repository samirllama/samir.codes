// /components/typing/TypingEffect.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./typing.module.css";

interface TypingEffectProps {
  items: string[];
  interval?: number; // Time *between* finishing one word and starting the next
  typingSpeed?: number; // Milliseconds per character
  paragraphClassName?: string;
  staticTextClassName?: string;
}

const defaultItems = ["Coding", "Design", "Learning", "Exploring", "Creating"];

const TypingEffect: React.FC<TypingEffectProps> = ({
  items = defaultItems,
  interval = 2000, // Wait 2s after finishing a word before starting next
  typingSpeed = 100, // Type one character every 100ms
  paragraphClassName = "text-2xl md:text-3xl font-semibold my-8",
  staticTextClassName = "",
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  // State for the text currently visible on screen
  const [displayedText, setDisplayedText] = useState("");
  // Ref to manage the character typing interval/timeout
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Ref to manage the interval between words
  const wordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle the typing animation for a single word
  const typeWord = (word: string) => {
    let charIndex = 0;
    setDisplayedText(""); // Clear previous text immediately

    // Clear any existing character typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const typeCharacter = () => {
      if (charIndex < word.length) {
        setDisplayedText((prev) => prev + word[charIndex]);
        charIndex++;
        typingTimeoutRef.current = setTimeout(typeCharacter, typingSpeed);
      } else {
        // Word finished typing, schedule the next word change
        scheduleNextWord();
      }
    };

    // Start typing the first character
    typingTimeoutRef.current = setTimeout(typeCharacter, typingSpeed);
  };

  // Function to schedule the next word after the interval
  const scheduleNextWord = () => {
    // Clear previous word interval if any
    if (wordIntervalRef.current) {
      clearTimeout(wordIntervalRef.current);
    }
    wordIntervalRef.current = setTimeout(() => {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);
  };

  // Effect to start typing when the currentItemIndex changes
  useEffect(() => {
    if (items && items.length > 0) {
      const wordToType = items[currentItemIndex];
      typeWord(wordToType);
    }

    // Cleanup function: Clear all timers when component unmounts or dependencies change
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (wordIntervalRef.current) {
        clearTimeout(wordIntervalRef.current);
      }
    };
    // Rerun effect when the index changes (or items/speed changes)
  }, [currentItemIndex, items, typingSpeed, interval]);

  return (
    <p className={`${paragraphClassName}`}>
      <span className={staticTextClassName}>I like </span>
      {/* The dynamic span now just holds the text being built up */}
      <span
        className={`
          ${styles.gradientText}
          ${styles.blinkingCaret}
          ${styles.dynamicTextContainer} /* Added class for potential styling */
        `}
        // The key prop is removed as JS now controls the reveal
      >
        {displayedText}
      </span>
    </p>
  );
};

export default TypingEffect;
