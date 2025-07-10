"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface CreativeCanvasProps {
  text: string;
  className?: string;
}

export default function CreativeCanvas({ text, className }: CreativeCanvasProps) {
  const compRef = useRef(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.set(".char", {
        yPercent: 120,
        rotationZ: 5,
        rotationX: -90,
        transformOrigin: "bottom center",
      });
      tl.to(".char", {
        yPercent: 0,
        rotationZ: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.03,
      });
    },
    { scope: compRef }
  );

  return (
    <div ref={compRef} className={cn("w-full py-8", className, "perspective-1000")}>
      <h2 className="text-center text-[clamp(2rem,10vw,6rem)] font-serif leading-none tracking-tight">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="word inline-block mr-[0.25em]">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="char inline-block"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </div>
  );
}