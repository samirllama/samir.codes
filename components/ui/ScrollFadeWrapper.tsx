// components/ui/ScrollFadeWrapper.tsx
"use client"; // This component MUST be a client component

import { useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available

interface ScrollFadeWrapperProps {
  children: ReactNode;
  className?: string; // Allow passing additional classes for positioning, sizing etc.
  // Options for customization (can add more later)
  initialVisible?: boolean; // Default to true
  rootMargin?: string; // Observer rootMargin
  threshold?: number | number[]; // Observer threshold
  transitionDuration?: string; // Tailwind duration class, e.g., 'duration-500'
  transitionTiming?: string; // Tailwind easing class, e.g., 'ease-out'
}

export function ScrollFadeWrapper({
  children,
  className,
  initialVisible = true,
  rootMargin = "0px",
  threshold = 0, // Trigger as soon as any part enters/leaves
  transitionDuration = "duration-500", // Default fade duration
  transitionTiming = "ease-out", // Default fade easing
}: ScrollFadeWrapperProps) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current; // Capture ref value

    if (!element) return; // Exit if element not mounted yet

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility based on intersection state
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // Observe relative to the viewport
        rootMargin: rootMargin,
        threshold: threshold,
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup function: Stop observing when the component unmounts
    return () => {
      observer.unobserve(element);
    };
    // IMPORTANT: Dependencies array should be stable values.
    // If rootMargin/threshold need to change dynamically, add them here.
    // Usually, they are static for a component instance.
  }, [rootMargin, threshold]); // Only re-run if observer options change

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-opacity", // Base class for transition
        transitionDuration, // Apply dynamic duration
        transitionTiming, // Apply dynamic easing
        isVisible ? "opacity-100" : "opacity-0", // Apply conditional opacity
        className // Merge any passed classes
      )}
    >
      {children}
    </div>
  );
}
