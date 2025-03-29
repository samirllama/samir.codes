// components/FibonacciSpiral/FibonacciSpiral.tsx
"use client"; // ** IMPORTANT: Mark as a Client Component **

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './FibonacciSpiral.module.css'; // Import CSS Module

// Default number of terms if input is invalid or not provided
const DEFAULT_TERMS = 12;
const MAX_TERMS = 25; // Practical limit

// * Fibonacci Calculation (Pure function, can stay outside component)
/**
 * Generates an array containing the first n Fibonacci numbers.
 * @param {number} n - The number of Fibonacci terms to generate.
 * @returns {number[]} An array of Fibonacci numbers.
 */
const generateFibonacci = (n: number): number[] => {
    if (n <= 0) return [];
    if (n === 1) return [0];

    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
};


const FibonacciSpiral: React.FC = () => {
    // --- State ---
    // State for the number of terms input field
    const [numTerms, setNumTerms] = useState<number>(DEFAULT_TERMS);
    // State to hold the sequence (optional, could regenerate each time)
    // const [fibSequence, setFibSequence] = useState<number[]>(() => generateFibonacci(DEFAULT_TERMS));

    // --- Refs ---
    // Ref to access the canvas DOM element
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Ref to store the drawing context (avoids retrieving it repeatedly)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    // Ref to store the animation timeout ID for cancellation
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
     // Ref to store the current scale factor
    const scaleRef = useRef<number>(10);


    // --- Helper Function to Adjust Scale ---
    const adjustScale = (terms: number) => {
        if (terms > 15) {
            scaleRef.current = 3;
        } else if (terms > 10) {
            scaleRef.current = 6;
        } else {
            scaleRef.current = 10;
        }
    };

    // --- Drawing Logic (using useCallback to memoize) ---
    const drawSpiralAnimated = useCallback((fibNumbers: number[]) => {
        if (!canvasRef.current) {
            console.error("Canvas element not found");
            return;
        }
        // Ensure we have the drawing context
        if (!ctxRef.current) {
            ctxRef.current = canvasRef.current.getContext('2d');
        }
        if (!ctxRef.current) {
            console.error("Could not get 2D context");
            return;
        }

        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        const scale = scaleRef.current; // Use the scale from the ref
        const animationDelay = 150; // Milliseconds

        // --- Stop any previous animation ---
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }

        // --- Clear Canvas and Setup ---
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let direction = 0; // 0: R, 1: D, 2: L, 3: U
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#003366';

        let currentIndex = 1; // Start with the second number (usually 1)

        // --- Recursive function for animation steps ---
        function drawSegment() {
            if (currentIndex >= fibNumbers.length || !ctx) {
                timeoutIdRef.current = null; // Clear ref when done
                console.log("Spiral drawing complete.");
                return;
            }

            const radius = fibNumbers[currentIndex] * scale;

            // Skip 0-radius segments (handles fib[0]=0 and potentially fib[1]=0 if sequence starts differently)
             if (radius <= 0 && currentIndex < 2) {
                 currentIndex++;
                 timeoutIdRef.current = setTimeout(drawSegment, 5); // Tiny delay
                 return;
             }
             if (radius <= 0) { // Should not happen for index >= 2 but good check
                 currentIndex++;
                 timeoutIdRef.current = setTimeout(drawSegment, animationDelay);
                 return;
             }


            ctx.beginPath();
            // Calculate arc parameters based on direction
            switch (direction) {
                case 0: ctx.arc(x, y + radius, radius, -Math.PI / 2, 0); x += radius; break;
                case 1: ctx.arc(x - radius, y, radius, 0, Math.PI / 2); y += radius; break;
                case 2: ctx.arc(x, y - radius, radius, Math.PI / 2, Math.PI); x -= radius; break;
                case 3: ctx.arc(x + radius, y, radius, Math.PI, Math.PI * 1.5); y -= radius; break;
            }
            ctx.stroke();

            currentIndex++;
            direction = (direction + 1) % 4;

            // Schedule next segment
            timeoutIdRef.current = setTimeout(drawSegment, animationDelay);
        }

        // Start the animation chain
        drawSegment();

    }, []); // No dependencies needed if it reads refs and receives fibNumbers as arg

    // --- Effect for Initial Draw and Resizing ---
    useEffect(() => {
        // Ensure canvas and context are ready
        if (!canvasRef.current) return;
        ctxRef.current = canvasRef.current.getContext('2d');
        if (!ctxRef.current) return;

        // Adjust scale based on initial terms
        adjustScale(numTerms);

        // Generate sequence and draw initially
        const initialFibSequence = generateFibonacci(numTerms);
        drawSpiralAnimated(initialFibSequence);

        // --- Cleanup function ---
        // This runs when the component unmounts or before the effect re-runs
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
                console.log("Cleared animation timeout on unmount/redraw.");
            }
        };
        // Run effect only when drawSpiralAnimated function reference changes (which it shouldn't due to useCallback)
        // Or potentially add numTerms if you want initial draw to re-run if default changes (unlikely)
    }, [drawSpiralAnimated]); // Re-run initial draw if draw function changes (it shouldn't)


    // --- Event Handlers ---
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(event.target.value, 10);
        // Handle NaN or invalid input, potentially clamping or resetting
        if (isNaN(value) || value <= 0) {
            value = 1; // Or keep previous valid value, or show error
        } else if (value > MAX_TERMS) {
            value = MAX_TERMS; // Clamp to max
        }
        setNumTerms(value);
    };

    const handleDrawClick = () => {
        // Validate terms again before drawing
        let termsToDraw = numTerms;
        if (isNaN(termsToDraw) || termsToDraw <= 0 || termsToDraw > MAX_TERMS) {
            console.warn(`Invalid number of terms: ${numTerms}. Using default: ${DEFAULT_TERMS}`);
            termsToDraw = DEFAULT_TERMS;
            setNumTerms(DEFAULT_TERMS); // Update state/input field as well
        }

        // Adjust scale based on the selected terms
        adjustScale(termsToDraw);

        // Generate the sequence
        const sequence = generateFibonacci(termsToDraw);
        console.log("Generated Fibonacci Sequence:", sequence);

        // Start the drawing animation
        drawSpiralAnimated(sequence);
    };

    // --- Render JSX ---
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Fibonacci Spiral Animation</h1>

            <div className={styles.controls}>
                <label htmlFor="termsInput">Number of Terms:</label>
                <input
                    type="number"
                    id="termsInput"
                    value={numTerms}
                    onChange={handleInputChange}
                    min="1"
                    max={MAX_TERMS} // Use constant for max
                    className={styles.input}
                />
                <button onClick={handleDrawClick} className={styles.button}>
                    Draw Spiral
                </button>
            </div>

            <canvas
                ref={canvasRef}
                width="600" // Set initial canvas dimensions
                height="600" // These can be adjusted
                className={styles.canvas}
            >
                Your browser does not support the HTML canvas element.
            </canvas>
        </div>
    );
};

export default FibonacciSpiral;
