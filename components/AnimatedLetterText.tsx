"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface AnimatedLetterTextProps {
  text: string;
}

export default function AnimatedLetterText({ text }: AnimatedLetterTextProps) {
  const compRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".text-char", {
        opacity: 0,
        y: 30, // Slightly less vertical movement for letters
        scale: 0.9, // Slightly less scaling for letters
        duration: 0.8, // Faster duration for individual letters
        ease: "power3.out",
        stagger: 0.02, // Very small stagger for fluid letter-by-letter effect
      });
    },
    { scope: compRef }
  );

  return (
    <div className="accelerate" ref={compRef}>
      <h1 className="hero-title mb-8 text-[max(5rem,min(6.5rem,6.5vw))] font-cinzel tracking-tighter bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full text-right">
        {text.split("").map((char, index) => (
          <span key={index} className="text-char inline-block">
            {char === " " ? "\u00A0" : char}{" "}
            {/* Handle spaces with non-breaking space */}
          </span>
        ))}
      </h1>
    </div>
  );
}
