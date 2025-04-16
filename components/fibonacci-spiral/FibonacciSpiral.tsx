// components/FibonacciSpiral/FibonacciSpiral.tsx
"use client"; // This component needs browser APIs (canvas) and hooks

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils"; // Assuming your cn utility is here

// Constants
const DEFAULT_TERMS = 12;
const MAX_TERMS = 25; // Practical limit for visibility without excessive scaling
const ANIMATION_DELAY_MS = 150; // Delay between drawing segments


/**
 * Generates an array containing the first n Fibonacci numbers.
 */
const generateFibonacci = (n: number): number[] => {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    // Prevent excessively large numbers that might cause issues
    const nextFib = sequence[i - 1] + sequence[i - 2];
    if (!Number.isSafeInteger(nextFib)) {
      console.warn(
        `Fibonacci number exceeds safe integer limit at term ${i}. Stopping sequence.`
      );
      break;
    }
    sequence.push(nextFib);
  }
  return sequence;
};


const FibonacciSpiral: React.FC = () => {
  const [numTerms, setNumTerms] = useState<number>(DEFAULT_TERMS);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const scaleRef = useRef<number>(10); // Initial scale factor

  /** Adjusts canvas scale based on the number of terms for better visibility */
  const adjustScale = useCallback((terms: number) => {
    if (terms > 18) scaleRef.current = 1.5;
    else if (terms > 15) scaleRef.current = 3;
    else if (terms > 12) scaleRef.current = 6;
    else if (terms > 9) scaleRef.current = 8;
    else scaleRef.current = 10;
  }, []);

  /** Draws the spiral segment by segment with animation */
  const drawSpiralAnimated = useCallback((fibNumbers: number[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ctxRef.current) ctxRef.current = canvas.getContext("2d");
    const ctx = ctxRef.current;
    if (!ctx) return;

    const scale = scaleRef.current;
    const { width, height } = canvas;

    //  Stop any previous animation ---
    if (animationTimeoutIdRef.current) {
      clearTimeout(animationTimeoutIdRef.current);
      animationTimeoutIdRef.current = null;
    }

    //  Clear Canvas and Setup ---
    ctx.clearRect(0, 0, width, height);
    let x = width / 2;
    let y = height / 2;
    let direction = 0; // 0: R, 1: D, 2: L, 3: U
    ctx.lineWidth = 1.5; // Slightly thinner line
    // Use theme-aware colors if possible, otherwise fallback
    ctx.strokeStyle = document.documentElement.classList.contains("dark")
      ? "#a855f7"
      : "#6b21a8"; // Example: purple-500/purple-800

    let currentIndex = 1; // Start drawing from the second number (fib[1] = 1)

    function drawSegment() {
      if (currentIndex >= fibNumbers.length || !ctx) {
        animationTimeoutIdRef.current = null;
        return; // Animation complete
      }

      const radius = fibNumbers[currentIndex] * scale;

      // Skip segments with zero or negligible radius (handles fib[0]=0, fib[1]=1)
      if (radius <= 0.1) {
        currentIndex++;
        // Change direction even for skipped segments to maintain spiral logic
        direction = (direction + 1) % 4;
        animationTimeoutIdRef.current = setTimeout(drawSegment, 5); // Tiny delay
        return;
      }

      ctx.beginPath();
      // Calculate arc parameters based on direction
      switch (direction) {
        case 0:
          ctx.arc(x, y + radius, radius, -Math.PI / 2, 0);
          x += radius;
          break; // Right -> Arc center below, move right
        case 1:
          ctx.arc(x - radius, y, radius, 0, Math.PI / 2);
          y += radius;
          break; // Down -> Arc center left, move down
        case 2:
          ctx.arc(x, y - radius, radius, Math.PI / 2, Math.PI);
          x -= radius;
          break; // Left -> Arc center above, move left
        case 3:
          ctx.arc(x + radius, y, radius, Math.PI, Math.PI * 1.5);
          y -= radius;
          break; // Up -> Arc center right, move up
      }
      ctx.stroke();

      currentIndex++;
      direction = (direction + 1) % 4;

      // Schedule next segment
      animationTimeoutIdRef.current = setTimeout(
        drawSegment,
        ANIMATION_DELAY_MS
      );
    }

    // Start the animation
    drawSegment();
  }, []); // No external state dependencies needed here

  //  Effect for Initial Draw and Cleanup ---
  useEffect(() => {
    adjustScale(numTerms);
    const initialFibSequence = generateFibonacci(numTerms);
    drawSpiralAnimated(initialFibSequence);

    // Cleanup function to stop animation on unmount
    return () => {
      if (animationTimeoutIdRef.current) {
        clearTimeout(animationTimeoutIdRef.current);
      }
    };
    // Rerun only if the drawing function reference changes (it shouldn't)
    // or if numTerms changes (to redraw on initial load if default changes - unlikely needed)
  }, [drawSpiralAnimated, adjustScale, numTerms]);

  //  Event Handlers ---
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value)) value = 1; // Handle non-numeric input
    value = Math.max(1, Math.min(value, MAX_TERMS)); // Clamp between 1 and MAX_TERMS
    setNumTerms(value);
  };

  const handleDrawClick = () => {
    // Recalculate scale and sequence based on current numTerms
    adjustScale(numTerms);
    const sequence = generateFibonacci(numTerms);
    drawSpiralAnimated(sequence);
  };

  // --- Render JSX with Tailwind Classes ---
  return (
    <div className="flex flex-col items-center p-4 md:p-6 font-sans bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-200 min-h-[80vh]">
      <h1 className="mb-6 text-2xl md:text-3xl font-bold text-center">
        Fibonacci Spiral Animation
      </h1>

      {/* Controls Section */}
      <div className="mb-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
        <label htmlFor="termsInput" className="text-sm font-medium">
          Number of Terms (1-{MAX_TERMS}):
        </label>
        <input
          type="number"
          id="termsInput"
          value={numTerms}
          onChange={handleInputChange}
          min="1"
          max={MAX_TERMS}
          // Using standard form input styling from utility-patterns/forms plugin
          className="form-input w-20 text-center px-2 py-1 text-base" // Adjusted padding/width
        />
        <button
          onClick={handleDrawClick}
          // Using standard button styling from utility-patterns/Button component
          className="btn bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 text-base" // Adjusted padding/size
        >
          Draw Spiral
        </button>
      </div>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        width="600" // Intrinsic canvas size (drawing buffer)
        height="600"
        // Tailwind classes for layout and appearance
        className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 max-w-full h-auto block mx-auto shadow-lg rounded-md aspect-square"
        aria-label="Fibonacci Spiral Canvas" // Accessibility
      >
        {/* Fallback text for browsers that don't support canvas */}
        Your browser does not support the HTML canvas element.
      </canvas>
    </div>
  );
};

export default FibonacciSpiral;
