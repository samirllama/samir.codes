"use client";

import React, { useRef, useEffect } from "react";
import useMousePosition from "../hooks/mouse-position";
import { cn } from "@/lib/utils";

interface LeafParticlesProps {
  className?: string;
  quantity?: number;
  windStrength?: number;
  fallSpeed?: number;
}

interface Leaf {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  dx: number;
  dy: number;
  dAngle: number;
  type: "long" | "short" | "wide" | "narrow";
  stopped: boolean;
  bend: number; // For wind effect
}

export default function LeafParticles({
  className = "",
  quantity = 20,
  windStrength = 100,
  fallSpeed = 2,
}: LeafParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const leaves = useRef<Leaf[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  // Resize canvas to match container size
  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      context.current.scale(dpr, dpr);
      // Reset leaves that are not stopped
      leaves.current = leaves.current.filter((leaf) => leaf.stopped);
      drawLeaves();
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      clearContext();
      leaves.current.forEach((leaf, i) => {
        if (!leaf.stopped) {
          // Apply gravity
          leaf.dy += 0.05 * fallSpeed; // Gravity acceleration
          leaf.y += leaf.dy;
          leaf.x += leaf.dx;
          leaf.angle += leaf.dAngle;

          // Mouse repulsion (wind effect)
          const dx = leaf.x - mouse.current.x;
          const dy = leaf.y - mouse.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = windStrength / (distance * distance);
          leaf.dx += (dx / distance) * force;
          leaf.dy += (dy / distance) * force - 0.02; // Slight upward push
          leaf.bend = Math.min(force / 10, 0.5); // Bend leaf based on force

          // Check if leaf hits the bottom or another leaf
          if (leaf.y + leaf.height / 2 >= canvasSize.current.h) {
            leaf.y = canvasSize.current.h - leaf.height / 2;
            leaf.stopped = true;
            leaf.dy = 0;
            leaf.dx = 0;
            leaf.dAngle = 0;
          } else {
            // Check collision with stopped leaves
            for (const other of leaves.current) {
              if (other.stopped && other !== leaf) {
                const distX = Math.abs(leaf.x - other.x);
                const distY =
                  leaf.y + leaf.height / 2 - (other.y - other.height / 2);
                if (
                  distX < (leaf.width + other.width) / 2 &&
                  distY < leaf.height / 2 &&
                  distY > 0
                ) {
                  leaf.y = other.y - other.height / 2 - leaf.height / 2;
                  leaf.stopped = true;
                  leaf.dy = 0;
                  leaf.dx = 0;
                  leaf.dAngle = 0;
                  break;
                }
              }
            }
          }
        }
        drawLeaf(leaf);
      });
      animationFrameId = window.requestAnimationFrame(animate);
    };

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
      if (context.current) {
        resizeCanvas();
        animate();
        window.addEventListener("resize", resizeCanvas);
      } else {
        console.error("Failed to get 2D context for leaf particles canvas.");
      }
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      if (w > 0 && h > 0) {
        mouse.current.x = mousePosition.x - rect.left;
        mouse.current.y = mousePosition.y - rect.top;
      }
    }
  };

  const leafParams = (): Leaf => {
    const types: Leaf["type"][] = ["long", "short", "wide", "narrow"];
    const type = types[Math.floor(Math.random() * types.length)];
    let width: number, height: number;
    switch (type) {
      case "long":
        width = 20 + Math.random() * 10;
        height = 60 + Math.random() * 20;
        break;
      case "short":
        width = 15 + Math.random() * 10;
        height = 30 + Math.random() * 10;
        break;
      case "wide":
        width = 30 + Math.random() * 15;
        height = 40 + Math.random() * 15;
        break;
      case "narrow":
        width = 10 + Math.random() * 5;
        height = 50 + Math.random() * 15;
        break;
    }
    return {
      x: Math.random() * canvasSize.current.w,
      y: -height, // Start above canvas
      width,
      height,
      angle: Math.random() * Math.PI * 2,
      dx: (Math.random() - 0.5) * 2,
      dy: Math.random() * fallSpeed,
      dAngle: (Math.random() - 0.5) * 0.05,
      type,
      stopped: false,
      bend: 0,
    };
  };

  const drawLeaf = (leaf: Leaf) => {
    if (context.current) {
      context.current.save(); // Equivalent to p5.js push()
      context.current.translate(leaf.x, leaf.y);
      context.current.rotate(leaf.angle);

      context.current.beginPath(); // Start a new path (replaces beginShape)
      context.current.fillStyle = `hsl(${30 + Math.random() * 20}, 50%, ${
        40 + Math.random() * 20
      }%)`; // Earthy tones
      context.current.moveTo(0, -leaf.height / 2); // Top point (replaces vertex)

      // Right curve with dynamic bend
      context.current.bezierCurveTo(
        leaf.width / 2 + leaf.bend * leaf.width, // Control point 1 x
        -leaf.height / 4, // Control point 1 y
        leaf.width / 2 + leaf.bend * leaf.width, // Control point 2 x
        leaf.height / 4, // Control point 2 y
        0, // End point x
        leaf.height / 2 // End point y
      );

      // Left curve with dynamic bend
      context.current.bezierCurveTo(
        -leaf.width / 2 - leaf.bend * leaf.width, // Control point 1 x
        leaf.height / 4, // Control point 1 y
        -leaf.width / 2 - leaf.bend * leaf.width, // Control point 2 x
        -leaf.height / 4, // Control point 2 y
        0, // End point x
        -leaf.height / 2 // End point y
      );

      context.current.closePath(); // Close the path (replaces endShape(CLOSE))
      context.current.fill(); // Fill the shape
      context.current.restore(); // Equivalent to p5.js pop()
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };

  const drawLeaves = () => {
    clearContext();
    const leafCount = Math.min(quantity, 50); // Limit for performance
    for (let i = leaves.current.length; i < leafCount; i++) {
      const leaf = leafParams();
      leaves.current.push(leaf);
    }
  };

  return (
    <div
      className={cn("relative", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
