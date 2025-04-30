// components/typeface-section.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Define the structure for your code snippet data
interface CodeSnippet {
  id: string;
  originalCode: string;
  temporaryText: string; // Add temporary text
  typeface: "neon" | "argon" | "xenon" | "radon" | "krypton";
  alignment: "left" | "right";
  textStrokeClass?: string; // Optional: class for text stroke if using CSS utilities
  // NEW properties based on the styles/config:
  animationClass?:
    | "animate-ghostpulse"
    | "animate-ghostpulse2"
    | "animate-ghostpulse3";
  ghostStateClass?: "ghost" | "ghost2" | "ghost3" | "ghost4"; // Matches CSS classes
}

// Define the data for your code snippets
const codeSnippets: CodeSnippet[] = [
  {
    id: "1",
    originalCode:
      "console.log(`Terminal dimensions: ${my_terminal.width} x ${my_terminal.height}`,)",
    temporaryText:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`1234567890-=[]{}|;':\",./?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`12345", // The long string
    typeface: "neon",
    alignment: "left",
    animationClass: "animate-ghostpulse",
    ghostStateClass: "ghost",
  },
  {
    id: "2",
    originalCode:
      "$l_optimized_time = $timing_obj->get_optimized_time($i_terminal_time);",
    temporaryText:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`1234567890-=[]{}|;':\",./?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`12345", // Use the same or different temporary text
    typeface: "argon",
    alignment: "right",
    animationClass: "animate-ghostpulse2",
    ghostStateClass: "ghost2",
  },
  {
    id: "3",
    temporaryText:
      "adjusted = [t.m_timingStart.to_millis() for t in log_lines if t >= today_in_millis],",
    originalCode:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`1234567890-=[]{}|;':\",./?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`12345",
    typeface: "xenon",
    alignment: "left",
    animationClass: "animate-ghostpulse3",
    ghostStateClass: "ghost3",
  },
  {
    id: "4",
    temporaryText:
      "std::transform(vec.begin(), vec.end(), vec.begin(), [](int num){ return num * num; });",
    originalCode:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`1234567890-=[]{}|;':\",./?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`12345",
    typeface: "radon",
    alignment: "right",
    animationClass: "animate-ghostpulse",
    ghostStateClass: "ghost4",
  },
  {
    id: "5",
    originalCode:
      "let sumSensorReadings: u32 = (1..=10).filter(|x| x % 2 == 0).sum();",
    temporaryText:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`1234567890-=[]{}|;':\",./?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+`12345",
    typeface: "krypton",
    alignment: "left",
    animationClass: "animate-ghostpulse2",
    ghostStateClass: "ghost",
  },
];

// Reset interval duration (in milliseconds)
const RESET_INTERVAL = 1000; // 1 second

const TypefaceShowcase: React.FC = () => {
  // State to track which snippet (if any) is currently showing temporary text
  // Using a Map for efficient updates by snippet id
  const [showingTemporaryText, setShowingTemporaryText] = useState<
    Map<string, boolean>
  >(new Map());

  // Ref to store timers for each snippet
  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleClick = (snippetId: string) => {
    if (timers.current.has(snippetId)) {
      clearTimeout(timers.current.get(snippetId));
    }

    // Set state to show temporary text for this snippet
    setShowingTemporaryText((prev) => new Map(prev).set(snippetId, true));

    // Set new timer to reset text back to original
    const timer = setTimeout(() => {
      setShowingTemporaryText((prev) => {
        const newState = new Map(prev);
        newState.delete(snippetId); // Remove entry
        return newState;
      });
      timers.current.delete(snippetId); // Clean up the timer ref
    }, RESET_INTERVAL);

    timers.current.set(snippetId, timer);
  };

  return (
    <div
      role="img"
      aria-label="A collection of code snippets showcasing the five Monaspace typefaces"
      // Keep gap for spacing between rows, removed py-5 as inner divs have padding
      className="w-screen flex flex-col overflow-hidden gap-px"
    >
      {codeSnippets.map((snippet) => {
        // Determine  text to display
        const currentText = showingTemporaryText.get(snippet.id)
          ? snippet.temporaryText
          : snippet.originalCode;

        return (
          <div
            key={snippet.id}
            className="accelerate"
            style={{ opacity: 1, willChange: "opacity" }}
          >
            <div
              className={cn(
                "cursor-pointer select-none",
                // Responsive text size
                "text-[max(1.5rem,min(3rem,3vw))] leading-[1]",
                "bg-opacity-0",
                "py-3 lg:py-4 xl:py-5", // Padding for vertical spacing
                "whitespace-nowrap relative min-w-full",
                "transform-gpu",
                // Apply dynamic classes from snippet data:
                // `text-${snippet.typeface}-primary`,
                "text-neon-primary",
                // `font-mona-${snippet.typeface}`,
                "font-mona-xenon",
                snippet.ghostStateClass,
                snippet.animationClass,
                `selection:bg-${snippet.typeface}-dark`,

                snippet.alignment === "left"
                  ? "self-start text-left left-0"
                  : "self-end text-right right-0",

                "glowtext"
              )}
              onClick={() => handleClick(snippet.id)}
            >
              <div className="transform-gpu" style={{ transform: "none" }}>
                <div
                  data-text={currentText} // Set data-text based on current state
                  className="glowtext"
                >
                  {/* Display the current text content */}
                  {currentText}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TypefaceShowcase;
