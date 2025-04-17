// components/particles/Particles.tsx
"use client";

import React, { useRef, useEffect } from "react";
import useMousePosition from "../hooks/mouse-position"; // Adjust path if needed
import { cn } from "@/lib/utils"; // Adjust path if needed

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

// Interface for particle properties
interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Particle[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  //  Resize Canvas Logic ---
  const resizeCanvas = () => {
    if (canvasRef.current && context.current) {
      // Get dimensions from the canvas element's own layout size
      canvasSize.current.w = canvasRef.current.offsetWidth;
      canvasSize.current.h = canvasRef.current.offsetHeight;

      // Set drawing surface size based on device pixel ratio
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;

      // Scale the drawing context (important!)
      context.current.scale(dpr, dpr);

      // Re-initialize particles after resize
      circles.current.length = 0;
      drawParticles(); // Re-draw particles for the new size
    }
  };

  //  Effects ---
  useEffect(() => {
    // Declare animationFrameId here, accessible within the effect scope
    let animationFrameId: number;

    // Define animate function within the effect
    const animate = () => {
      clearContext();
      circles.current.forEach((circle: Particle, i: number) => {
        // Calculate distance from edges for fading effect
        const edge = [
          circle.x + circle.translateX - circle.size, // Left
          canvasSize.current.w - circle.x - circle.translateX - circle.size, // Right
          circle.y + circle.translateY - circle.size, // Top
          canvasSize.current.h - circle.y - circle.translateY - circle.size, // Bottom
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remapClosestEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
        );

        // Update alpha based on edge distance and target alpha
        let newAlpha = circle.alpha;
        if (remapClosestEdge > 1) {
          newAlpha += 0.02; // Fade in
          if (newAlpha > circle.targetAlpha) newAlpha = circle.targetAlpha;
        } else {
          newAlpha = circle.targetAlpha * remapClosestEdge; // Fade out
        }
        circle.alpha = newAlpha;

        // Apply inherent velocity
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Apply mouse-influenced translation
        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) -
            circle.translateX) /
          ease;
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) -
            circle.translateY) /
          ease;

        // Reset particle if it goes too far off-screen
        if (
          circle.x + circle.translateX < -circle.size ||
          circle.x + circle.translateX > canvasSize.current.w + circle.size ||
          circle.y + circle.translateY < -circle.size ||
          circle.y + circle.translateY > canvasSize.current.h + circle.size
        ) {
          circles.current.splice(i, 1); // Remove old particle
          const newCircle = circleParams(); // Create a new one
          drawCircle(newCircle); // Add the new one (will be drawn in next frame)
        } else {
          // Draw the updated particle
          drawCircle({ ...circle }, true); // Pass update flag
        }
      });
      // *** Assign the ID returned by requestAnimationFrame ***
      animationFrameId = window.requestAnimationFrame(animate);
    };

    // Initial setup and start animation
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
      if (context.current) {
        // Check if context was successfully obtained
        resizeCanvas(); // Resize based on initial layout
        animate(); // Start the animation loop
        window.addEventListener("resize", resizeCanvas); // Add resize listener
      } else {
        console.error("Failed to get 2D context for particles canvas.");
      }
    }

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      // Now animationFrameId will hold a valid ID (or be undefined if animate never ran)
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  useEffect(() => {
    // Re-initialize if props change that affect particle generation/behavior
    if (canvasRef.current && context.current) {
      resizeCanvas(); // This will clear and redraw particles
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, quantity, staticity, ease]); // Add dependencies that should trigger re-init

  useEffect(() => {
    onMouseMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition.x, mousePosition.y]); // Update mouse ref on position change

  // Mouse Move ---
  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      // Use canvasSize ref which is updated on resize
      const { w, h } = canvasSize.current;
      if (w > 0 && h > 0) {
        // Ensure canvas has dimensions
        const x = mousePosition.x - rect.left - w / 2;
        const y = mousePosition.y - rect.top - h / 2;
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  // Particle Creation and Drawing ---
  type Circle = Particle; // Alias

  const circleParams = (): Circle => {
    // Ensure canvasSize has been initialized
    const w = canvasSize.current.w || 300; // Fallback width
    const h = canvasSize.current.h || 150; // Fallback height
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 1; // Particle size (radius)
    const alpha = 0; // Start transparent
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)); // Target opacity
    const dx = (Math.random() - 0.5) * 0.2; // Horizontal velocity
    const dy = (Math.random() - 0.5) * 0.2; // Vertical velocity
    const magnetism = 0.1 + Math.random() * 4; // How strongly it reacts to mouse
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.save(); // Save context state
      context.current.translate(translateX, translateY); // Apply translation offset
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`; // White particles
      context.current.fill();
      context.current.restore(); // Restore context state (removes translation)

      // Only push if it's a new circle during initialization
      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      // Use canvas dimensions from ref, adjusted for dpr scaling if needed
      // Clearing based on logical width/height before context scaling
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };

  const drawParticles = () => {
    // Clear context before drawing initial particles
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle); // Add new particle
    }
  };

  // Helper function for remapping values (used for edge fading)
  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  // Render ---
  return (
    // Apply positioning/sizing classes DIRECTLY to the canvas element
    <canvas
      ref={canvasRef}
      // Ensure canvas fills container using cn utility
      className={cn("w-full h-full", className)}
      aria-hidden="true"
    />
  );
}
