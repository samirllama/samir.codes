"use client";

import React, { useRef, useEffect, useCallback } from "react";
import useMousePosition from "../hooks/mouse-position";
import { cn } from "@/lib/utils";

interface LeafParticlesProps {
  className?: string;
  quantity?: number;
  windStrength?: number;
  fallSpeed?: number;
}

interface Leaf {
  id: number; // Unique ID for tracking
  x: number;
  y: number;
  initialY: number; // Store initial Y for resetting if needed
  width: number;
  height: number;
  angle: number;
  dx: number;
  dy: number;
  dAngle: number;
  type: "long" | "short" | "wide" | "narrow";
  stopped: boolean;
  bend: number; // Influence on control points for bending
  color: string;
  // Define control points relative to leaf's local origin (0,0) for drawing
  // Each object is { x1, y1, x2, y2, x, y } for bezierCurveTo(x1, y1, x2, y2, x, y)
  controlPoints: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x: number;
    y: number;
  }[];
}

export default function LeafParticles({
  className = "",
  quantity = 40,
  windStrength = 200,
  fallSpeed = 1.5,
}: LeafParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const leaves = useRef<Leaf[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  // Define more detailed control points for different leaf types
  const getLeafControlPoints = useCallback(
    (type: Leaf["type"], width: number, height: number) => {
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      // Control points are relative to the leaf's center (0,0)
      // Ensure all 6 required properties (x1, y1, x2, y2, x, y) are explicitly defined for each point set.
      switch (type) {
        case "long":
          return [
            // Right side curve 1: from top (0, -halfHeight) to mid-right
            {
              x1: halfWidth * 0.8,
              y1: -halfHeight * 0.7,
              x2: halfWidth * 0.9,
              y2: halfHeight * 0.3,
              x: halfWidth * 0.5,
              y: halfHeight * 0.8,
            },
            // Right side curve 2: from mid-right to bottom (0, halfHeight)
            {
              x1: halfWidth * 0.4,
              y1: halfHeight * 0.9,
              x2: halfWidth * 0.1,
              y2: halfHeight * 0.95,
              x: 0,
              y: halfHeight,
            },
            // Left side curve 1: from bottom (0, halfHeight) to mid-left
            {
              x1: -halfWidth * 0.5,
              y1: halfHeight * 0.8,
              x2: -halfWidth * 0.9,
              y2: halfHeight * 0.3,
              x: -halfWidth * 0.8,
              y: -halfHeight * 0.7,
            },
            // Left side curve 2: from mid-left back to top (0, -halfHeight)
            {
              x1: -halfWidth * 0.1,
              y1: -halfHeight * 0.95,
              x2: -halfWidth * 0.4,
              y2: -halfHeight * 0.9,
              x: 0,
              y: -halfHeight,
            }, // Back to top
          ];
        case "short":
          return [
            // Right side curve 1: from top (0, -halfHeight) to mid-right
            {
              x1: halfWidth * 0.9,
              y1: -halfHeight * 0.5,
              x2: halfWidth * 0.9,
              y2: halfHeight * 0.5,
              x: halfWidth * 0.6,
              y: halfHeight * 0.9,
            },
            // Right side curve 2: from mid-right to bottom (0, halfHeight)
            {
              x1: halfWidth * 0.3,
              y1: halfHeight * 0.95,
              x2: halfWidth * 0.1,
              y2: halfHeight * 0.98,
              x: 0,
              y: halfHeight,
            },
            // Left side curve 1: from bottom (0, halfHeight) to mid-left
            {
              x1: -halfWidth * 0.6,
              y1: halfHeight * 0.9,
              x2: -halfWidth * 0.9,
              y2: halfHeight * 0.5,
              x: -halfWidth * 0.9,
              y: -halfHeight * 0.5,
            },
            // Left side curve 2: from mid-left back to top (0, -halfHeight)
            {
              x1: -halfWidth * 0.1,
              y1: halfHeight * 0.98,
              x2: -halfWidth * 0.3,
              y2: halfHeight * 0.95,
              x: 0,
              y: -halfHeight,
            }, // Back to top
          ];
        case "wide":
          return [
            // Right side curve 1: from top (0, -halfHeight) to mid-right
            {
              x1: halfWidth * 0.95,
              y1: -halfHeight * 0.3,
              x2: halfWidth * 0.95,
              y2: halfHeight * 0.3,
              x: halfWidth * 0.8,
              y: halfHeight * 0.7,
            },
            // Right side curve 2: from mid-right to bottom (0, halfHeight)
            {
              x1: halfWidth * 0.5,
              y1: halfHeight * 0.9,
              x2: halfWidth * 0.2,
              y2: halfHeight * 0.95,
              x: 0,
              y: halfHeight,
            },
            // Left side curve 1: from bottom (0, halfHeight) to mid-left
            {
              x1: -halfWidth * 0.8,
              y1: halfHeight * 0.7,
              x2: -halfWidth * 0.95,
              y2: halfHeight * 0.3,
              x: -halfWidth * 0.95,
              y: -halfHeight * 0.3,
            },
            // Left side curve 2: from mid-left back to top (0, -halfHeight)
            {
              x1: -halfWidth * 0.2,
              y1: halfHeight * 0.95,
              x2: -halfWidth * 0.5,
              y2: halfHeight * 0.9,
              x: 0,
              y: -halfHeight,
            }, // Back to top
          ];
        case "narrow":
          return [
            // Right side curve 1: from top (0, -halfHeight) to mid-right
            {
              x1: halfWidth * 0.7,
              y1: -halfHeight * 0.8,
              x2: halfWidth * 0.8,
              y2: halfHeight * 0.1,
              x: halfWidth * 0.4,
              y: halfHeight * 0.9,
            },
            // Right side curve 2: from mid-right to bottom (0, halfHeight)
            {
              x1: halfWidth * 0.1,
              y1: halfHeight * 0.98,
              x2: halfWidth * 0.05,
              y2: halfHeight * 0.99,
              x: 0,
              y: halfHeight,
            },
            // Left side curve 1: from bottom (0, halfHeight) to mid-left
            {
              x1: -halfWidth * 0.4,
              y1: halfHeight * 0.9,
              x2: -halfWidth * 0.8,
              y2: halfHeight * 0.1,
              x: -halfWidth * 0.7,
              y: -halfHeight * 0.8,
            },
            // Left side curve 2: from mid-left back to top (0, -halfHeight)
            {
              x1: -halfWidth * 0.05,
              y1: halfHeight * 0.99,
              x2: -halfWidth * 0.1,
              y2: halfHeight * 0.98,
              x: 0,
              y: -halfHeight,
            }, // Back to top
          ];
      }
    },
    [] // Dependencies: This function only depends on its arguments (type, width, height) which are passed in. No external dependencies needed here.
  );

  const leafParams = useCallback(
    (id: number): Leaf => {
      const types: Leaf["type"][] = ["long", "short", "wide", "narrow"];
      const type = types[Math.floor(Math.random() * types.length)];
      let width: number, height: number;
      switch (type) {
        case "long":
          width = 15 + Math.random() * 10;
          height = 50 + Math.random() * 20;
          break;
        case "short":
          width = 10 + Math.random() * 8;
          height = 25 + Math.random() * 10;
          break;
        case "wide":
          width = 25 + Math.random() * 10;
          height = 30 + Math.random() * 10;
          break;
        case "narrow":
          width = 8 + Math.random() * 4;
          height = 40 + Math.random() * 15;
          break;
      }

      const hue = 20 + Math.random() * 40; // Range from warm browns to greens
      const saturation = 40 + Math.random() * 30; // Moderate saturation
      const lightness = 30 + Math.random() * 30; // Varying lightness

      const initialY = -height - Math.random() * canvasSize.current.h * 0.2; // Calculate once

      return {
        id,
        x: Math.random() * canvasSize.current.w,
        y: initialY,
        initialY: initialY, // Store the calculated initial Y
        width,
        height,
        angle: Math.random() * Math.PI * 2,
        dx: (Math.random() - 0.5) * 1,
        dy: Math.random() * fallSpeed * 0.5,
        dAngle: (Math.random() - 0.5) * 0.02,
        type,
        stopped: false,
        bend: 0,
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        controlPoints: getLeafControlPoints(type, width, height), // Call the memoized function
      };
    },
    [fallSpeed, getLeafControlPoints] // Dependencies: fallSpeed is used, getLeafControlPoints is called
  );

  const clearContext = useCallback(() => {
    if (
      context.current &&
      canvasSize.current.w > 0 &&
      canvasSize.current.h > 0
    ) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  }, []); // No external dependencies needed for clearing

  // Wrapped drawLeaf in useCallback
  const drawLeaf = useCallback(
    (leaf: Leaf) => {
      if (context.current) {
        const ctx = context.current;
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);

        ctx.beginPath();
        ctx.fillStyle = leaf.color;

        ctx.moveTo(0, -leaf.height / 2); // Top point

        leaf.controlPoints.forEach((point) => {
          // No need for index if not used
          // Apply bending to control points.
          // Bend influences the x-coordinate of control points relative to the center line.
          const bendX1 =
            point.x1 +
            leaf.bend * (point.x1 > 0 ? leaf.width : -leaf.width) * 0.5;
          const bendY1 = point.y1; // Bending primarily affects horizontal position of control points
          const bendX2 =
            point.x2 +
            leaf.bend * (point.x2 > 0 ? leaf.width : -leaf.width) * 0.5;
          const bendY2 = point.y2;
          const targetX = point.x;
          const targetY = point.y;

          ctx.bezierCurveTo(bendX1, bendY1, bendX2, bendY2, targetX, targetY);
        });

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    },
    [] // Dependencies: This function only uses properties of the 'leaf' object argument and the 'context.current' ref. It does not depend on any external state or props that change over time and need to trigger memoization updates.
  );

  const drawLeaves = useCallback(() => {
    clearContext();
    // Ensure we have the desired quantity of leaves
    while (leaves.current.length < quantity) {
      // Use a unique ID for the new leaf
      leaves.current.push(
        leafParams(
          leaves.current.length > 0
            ? leaves.current[leaves.current.length - 1].id + 1
            : 0
        )
      );
    }
    leaves.current = leaves.current.slice(0, quantity);

    leaves.current.forEach(drawLeaf);
  }, [clearContext, drawLeaf, leafParams, quantity]);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      context.current.scale(dpr, dpr);

      // On resize, reset the position of leaves that haven't stopped
      leaves.current.forEach((leaf) => {
        if (!leaf.stopped) {
          leaf.x = Math.random() * canvasSize.current.w; // Reposition horizontally randomly
          leaf.y = leaf.initialY; // Reset to initial starting height
          leaf.dy = Math.random() * fallSpeed * 0.5; // Reset vertical velocity
        }
      });

      // Add new leaves if quantity is not met
      while (leaves.current.length < quantity) {
        // Use a unique ID for the new leaf
        leaves.current.push(
          leafParams(
            leaves.current.length > 0
              ? leaves.current[leaves.current.length - 1].id + 1
              : 0
          )
        );
      }
      // Remove excess leaves if quantity decreased - keep stopped leaves if possible?
      // For simplicity and based on initial notes, we'll just slice, stopped leaves might be removed.
      // A more complex approach would be needed to prioritize keeping stopped leaves.
      leaves.current = leaves.current.slice(0, quantity);

      drawLeaves(); // Redraw immediately after resizing and updating leaves
    }
  }, [dpr, fallSpeed, quantity, leafParams, drawLeaves]); // Added drawLeaves dependency

  const onMouseMove = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      // Ensure mouse position is relative to the *displayed* size of the canvas
      // and scaled back if DPR is applied to the canvas element style.
      // However, since we scaled the context, we just need position relative to top-left.
      mouse.current.x = mousePosition.x - rect.left;
      mouse.current.y = mousePosition.y - rect.top;
    }
  }, [mousePosition.x, mousePosition.y]); // Dependencies from the external hook

  const animate = useCallback(() => {
    let animationFrameId: number;

    const updateLeaves = () => {
      // Create a copy of the leaves array to iterate, allowing modification during iteration
      // This is safer if collision logic or other updates might modify the array structure
      // (though slice(0) is safer than iterating and potentially removing)
      const currentLeaves = leaves.current;

      for (let i = currentLeaves.length - 1; i >= 0; i--) {
        // Iterate backwards to safely remove if needed (not currently removing here, but good practice)
        const leaf = currentLeaves[i];

        if (!leaf.stopped) {
          // Apply gravity
          leaf.dy += 0.05 * fallSpeed;
          leaf.y += leaf.dy;
          leaf.x += leaf.dx;
          leaf.angle += leaf.dAngle;

          // Apply drag (simple air resistance)
          leaf.dx *= 0.98;
          leaf.dy *= 0.98;
          leaf.dAngle *= 0.98;

          // Mouse repulsion (wind effect)
          const dx = leaf.x - mouse.current.x;
          const dy = leaf.y - mouse.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 0.1; // Prevent division by zero

          // Inverse square force, capped
          const forceMagnitude = Math.min(
            windStrength / (distance * distance),
            10
          ); // Increased cap slightly

          // Apply force
          // Weaken the effect of the force on velocity to make it feel less "jerky"
          const forceEffectMultiplier = 0.05; // Reduced effect
          leaf.dx += (dx / distance) * forceMagnitude * forceEffectMultiplier;
          leaf.dy +=
            (dy / distance) * forceMagnitude * forceEffectMultiplier - 0.01; // Slight upward push, reduced constant effect

          // Calculate bend based on horizontal force component
          const horizontalForce = (dx / distance) * forceMagnitude;
          leaf.bend = Math.max(-0.7, Math.min(0.7, horizontalForce * 0.03)); // Increased bend range, reduced force-to-bend scaling

          // Check if leaf hits the bottom or another leaf
          if (leaf.y + leaf.height / 2 >= canvasSize.current.h) {
            leaf.y = canvasSize.current.h - leaf.height / 2;
            leaf.stopped = true;
            leaf.dy = 0;
            leaf.dx = 0;
            leaf.dAngle = 0;
            leaf.bend = 0; // Reset bend when stopped
          } else {
            // Check collision with stopped leaves (simple bounding box)
            for (const other of leaves.current) {
              if (other.stopped && other.id !== leaf.id) {
                const distX = Math.abs(leaf.x - other.x);
                const distY =
                  leaf.y + leaf.height / 2 - (other.y - other.height / 2); // Distance from falling leaf's bottom to stopped leaf's top

                // Simple check if bottom of falling leaf is near or below stopped leaf's top
                // and horizontal overlap exists
                if (
                  distX < (leaf.width / 2 + other.width / 2) * 0.7 && // Horizontal overlap check with less tolerance
                  distY < leaf.height * 0.5 && // Falling leaf's bottom is above or slightly below stopped leaf's top
                  distY > -leaf.height * 0.3 // Falling leaf's bottom is not too far above stopped leaf's top
                ) {
                  // Position the falling leaf on top of the stopped leaf
                  leaf.y = other.y - other.height / 2 - leaf.height / 2;
                  leaf.stopped = true;
                  leaf.dy = 0;
                  leaf.dx = 0;
                  leaf.dAngle = 0;
                  leaf.bend = 0; // Reset bend when stopped
                  break; // Stop checking once a collision is found for this leaf
                }
              }
            }
          }
          // Keep leaf within horizontal bounds (bounce off walls)
          if (leaf.x - leaf.width / 2 < 0) {
            leaf.x = leaf.width / 2;
            leaf.dx = -leaf.dx * 0.5; // Bounce with some energy loss
            leaf.dAngle = (Math.random() - 0.5) * 0.1; // Add some random tumble on bounce
          } else if (leaf.x + leaf.width / 2 > canvasSize.current.w) {
            leaf.x = canvasSize.current.w - leaf.width / 2;
            leaf.dx = -leaf.dx * 0.5; // Bounce with some energy loss
            leaf.dAngle = (Math.random() - 0.5) * 0.1; // Add some random tumble on bounce
          }
        }
      }
    };

    const render = () => {
      clearContext();
      updateLeaves();
      leaves.current.forEach(drawLeaf);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [fallSpeed, windStrength, mouse, canvasSize, drawLeaf, clearContext]); // Dependencies needed for updateLeaves and render

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
      if (context.current) {
        resizeCanvas();
        const stopAnimation = animate();
        window.addEventListener("resize", resizeCanvas);

        return () => {
          window.removeEventListener("resize", resizeCanvas);
          stopAnimation();
        };
      } else {
        console.error("Failed to get 2D context for leaf particles canvas.");
        return () => {};
      }
    }
    return () => {};
  }, [animate, resizeCanvas]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y, onMouseMove]);

  useEffect(() => {
    // Effect to add/remove leaves when quantity prop changes
    // Ensure unique IDs for new leaves when adding dynamically
    const currentLeafCount = leaves.current.length;
    if (currentLeafCount < quantity) {
      const lastId =
        currentLeafCount > 0 ? leaves.current[currentLeafCount - 1].id : -1;
      for (let i = currentLeafCount; i < quantity; i++) {
        leaves.current.push(leafParams(lastId + 1 + (i - currentLeafCount)));
      }
    } else if (currentLeafCount > quantity) {
      leaves.current = leaves.current.slice(0, quantity);
    }
    // Redraw to reflect changes immediately if canvas is ready
    if (context.current) {
      drawLeaves();
    }
  }, [quantity, leafParams, drawLeaves]); // Added drawLeaves dependency

  return (
    <div
      className={cn("relative w-full h-full overflow-hidden", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
