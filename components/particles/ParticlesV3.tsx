"use client";

import React, { useRef, useEffect } from "react";
import useMousePosition from "../hooks/mouse-position";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  shapeWeights?: {
    circle?: number;
    rectangle?: number;
    triangle?: number;
    star?: number;
    hexagon?: number;
  };
}

interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number; // Radius (circle/star/hexagon), half-width (rectangle), half-height (triangle/star/hexagon)
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
  shape: "circle" | "rectangle" | "triangle" | "star" | "hexagon";
  sizeScale: number;
}

export default function ParticlesV3({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
  shapeWeights = {},
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  // Sync mouse position with mouse.current
  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;

      if (inside) {
        mouse.current = { x: mousePosition.x, y: mousePosition.y };
      }
    }
  }, [mousePosition]);

  const particleParams = (): Particle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 10) + 2;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;

    const weights = {
      circle: shapeWeights?.circle ?? 0.2,
      rectangle: shapeWeights?.rectangle ?? 0.2,
      triangle: shapeWeights?.triangle ?? 0.2,
      star: shapeWeights?.star ?? 0.2,
      hexagon: shapeWeights?.hexagon ?? 0.2,
    };
    const total =
      weights.circle +
      weights.rectangle +
      weights.triangle +
      weights.star +
      weights.hexagon;
    const normalized = {
      circle: weights.circle / total,
      rectangle: weights.rectangle / total,
      triangle: weights.triangle / total,
      star: weights.star / total,
      hexagon: weights.hexagon / total,
    };
    const rand = Math.random();
    let shape: "circle" | "rectangle" | "triangle" | "star" | "hexagon";
    if (rand < normalized.circle) {
      shape = "circle";
    } else if (rand < normalized.circle + normalized.rectangle) {
      shape = "rectangle";
    } else if (
      rand <
      normalized.circle + normalized.rectangle + normalized.triangle
    ) {
      shape = "triangle";
    } else if (
      rand <
      normalized.circle +
        normalized.rectangle +
        normalized.triangle +
        normalized.star
    ) {
      shape = "star";
    } else {
      shape = "hexagon";
    }

    const sizeScale = 1;
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
      shape,
      sizeScale,
    };
  };

  const drawCircleOrRectangle = (particle: Particle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha, shape, sizeScale } =
        particle;
      context.current.save();
      context.current.translate(translateX, translateY);
      context.current.beginPath();

      const scaledSize = size * sizeScale;

      if (shape === "circle") {
        context.current.arc(x, y, scaledSize, 0, 2 * Math.PI);
      } else if (shape === "rectangle") {
        context.current.rect(
          x - scaledSize,
          y - scaledSize,
          scaledSize * 2,
          scaledSize * 2
        );
      }

      context.current.strokeStyle = `rgba(11, 206, 86, ${alpha})`;
      context.current.lineWidth = 1;
      context.current.stroke();
      context.current.restore();

      if (!update) {
        particles.current.push(particle);
      }
    }
  };

  const drawTriangle = (particle: Particle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha, sizeScale } = particle;
      context.current.save();
      context.current.translate(translateX, translateY);
      context.current.beginPath();

      const scaledSize = size * sizeScale;
      const height = scaledSize * 2;
      const base = scaledSize * Math.sqrt(3);

      context.current.moveTo(x, y - scaledSize);
      context.current.lineTo(x - base / 2, y + scaledSize);
      context.current.lineTo(x + base / 2, y + scaledSize);
      context.current.closePath();

      context.current.strokeStyle = `rgba(11, 206, 86, ${alpha})`;
      context.current.lineWidth = 1;
      context.current.stroke();
      context.current.restore();

      if (!update) {
        particles.current.push(particle);
      }
    }
  };

  const drawStar = (particle: Particle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha, sizeScale } = particle;
      context.current.save();
      context.current.translate(translateX, translateY);
      context.current.beginPath();

      const scaledSize = size * sizeScale;
      const innerRadius = scaledSize * 0.4;
      const numPoints = 5;
      const angleStep = Math.PI / numPoints;

      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? scaledSize : innerRadius;
        const angle = i * angleStep - Math.PI / 2;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) {
          context.current.moveTo(px, py);
        } else {
          context.current.lineTo(px, py);
        }
      }
      context.current.closePath();

      context.current.strokeStyle = `rgba(69, 49, 28, ${alpha})`;
      context.current.lineWidth = 1;
      context.current.stroke();
      context.current.restore();

      if (!update) {
        particles.current.push(particle);
      }
    }
  };

  const drawHexagon = (particle: Particle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha, sizeScale } = particle;
      context.current.save();
      context.current.translate(translateX, translateY);
      context.current.beginPath();

      const scaledSize = size * sizeScale;
      const numSides = 6;
      const angleStep = (2 * Math.PI) / numSides;

      for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const px = x + Math.cos(angle) * scaledSize;
        const py = y + Math.sin(angle) * scaledSize;
        if (i === 0) {
          context.current.moveTo(px, py);
        } else {
          context.current.lineTo(px, py);
        }
      }
      context.current.closePath();

      context.current.strokeStyle = `rgba(217, 70, 239, ${alpha})`;
      context.current.lineWidth = 1;
      context.current.stroke();
      context.current.restore();

      if (!update) {
        particles.current.push(particle);
      }
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

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const particle = particleParams();
      if (particle.shape === "hexagon") {
        drawHexagon(particle);
      } else if (particle.shape === "star") {
        drawStar(particle);
      } else if (particle.shape === "triangle") {
        drawTriangle(particle);
      } else {
        drawCircleOrRectangle(particle);
      }
    }
  };

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

  const animate = () => {
    clearContext();
    particles.current.forEach((particle: Particle, i: number) => {
      const edge = [
        particle.x + particle.translateX - particle.size,
        canvasSize.current.w - particle.x - particle.translateX - particle.size,
        particle.y + particle.translateY - particle.size,
        canvasSize.current.h - particle.y - particle.translateY - particle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );

      if (remapClosestEdge > 1) {
        particle.alpha += 0.02;
        if (particle.alpha > particle.targetAlpha)
          particle.alpha = particle.targetAlpha;
      } else {
        particle.alpha = particle.targetAlpha * remapClosestEdge;
      }

      if (
        particle.shape !== "triangle" &&
        particle.shape !== "star" &&
        particle.shape !== "hexagon"
      ) {
        particle.shape = remapClosestEdge < 0.5 ? "rectangle" : "circle";
      }

      particle.sizeScale =
        remapClosestEdge < 1 ? 1 + (1 - remapClosestEdge) * 2 : 1;

      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.translateX +=
        (mouse.current.x / (staticity / particle.magnetism) -
          particle.translateX) /
        ease;
      particle.translateY +=
        (mouse.current.y / (staticity / particle.magnetism) -
          particle.translateY) /
        ease;

      if (
        particle.x + particle.translateX <
          -particle.size * particle.sizeScale ||
        particle.x + particle.translateX >
          canvasSize.current.w + particle.size * particle.sizeScale ||
        particle.y + particle.translateY <
          -particle.size * particle.sizeScale ||
        particle.y + particle.translateY >
          canvasSize.current.h + particle.size * particle.sizeScale
      ) {
        particles.current.splice(i, 1);
        const newParticle = particleParams();
        if (newParticle.shape === "hexagon") {
          drawHexagon(newParticle);
        } else if (newParticle.shape === "star") {
          drawStar(newParticle);
        } else if (newParticle.shape === "triangle") {
          drawTriangle(newParticle);
        } else {
          drawCircleOrRectangle(newParticle);
        }
      } else {
        if (particle.shape === "hexagon") {
          drawHexagon(
            {
              ...particle,
              x: particle.x,
              y: particle.y,
              translateX: particle.translateX,
              translateY: particle.translateY,
              alpha: particle.alpha,
              shape: particle.shape,
              sizeScale: particle.sizeScale,
            },
            true
          );
        } else if (particle.shape === "star") {
          drawStar(
            {
              ...particle,
              x: particle.x,
              y: particle.y,
              translateX: particle.translateX,
              translateY: particle.translateY,
              alpha: particle.alpha,
              shape: particle.shape,
              sizeScale: particle.sizeScale,
            },
            true
          );
        } else if (particle.shape === "triangle") {
          drawTriangle(
            {
              ...particle,
              x: particle.x,
              y: particle.y,
              translateX: particle.translateX,
              translateY: particle.translateY,
              alpha: particle.alpha,
              shape: particle.shape,
              sizeScale: particle.sizeScale,
            },
            true
          );
        } else {
          drawCircleOrRectangle(
            {
              ...particle,
              x: particle.x,
              y: particle.y,
              translateX: particle.translateX,
              translateY: particle.translateY,
              alpha: particle.alpha,
              shape: particle.shape,
              sizeScale: particle.sizeScale,
            },
            true
          );
        }
      }
    });
    window.requestAnimationFrame(animate);
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      particles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
      drawParticles();
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    resizeCanvas();
    animate();
  }, []);

  useEffect(() => {
    if (refresh) {
      drawParticles();
    }
  }, [refresh]);

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
