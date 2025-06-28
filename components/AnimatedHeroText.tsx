"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface AnimatedHeroTextProps {
  text: string;
}

export default function AnimatedHeroText({ text }: AnimatedHeroTextProps) {
  const compRef = useRef(null);
  const words = text.split(".");

  useGSAP(
    () => {
      const handleLoaderComplete = () => {
        gsap.from(".char", {
          y: () => Math.random() * 400 - 200, // Random Y position
          x: () => Math.random() * 400 - 200, // Random X position
          rotation: () => Math.random() * 360 - 180, // Random rotation
          opacity: 0,
          scale: 0,
          stagger: {
            each: 0.02,
            from: "random",
          },
          ease: "power3.out",
          duration: 1.5,
        });
      };

      window.addEventListener("loaderComplete", handleLoaderComplete);

      return () => {
        window.removeEventListener("loaderComplete", handleLoaderComplete);
      };
    },
    { scope: compRef }
  );

  return (
    <div className="accelerate" ref={compRef}>
      <h1 className="hero-title mb-8 text-[max(5rem,min(6.5rem,6.5vw))] font-mono tracking-tighter bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full self-end text-right right-0">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split("").map((char, charIndex) => (
              <span key={charIndex} className="char inline-block">
                {char}
              </span>
            ))}
            {wordIndex < words.length - 1 && (
              <span className="char inline-block">.</span>
            )}
          </span>
        ))}
      </h1>
    </div>
  );
}
