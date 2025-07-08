"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";


interface AnimatedHeroTextProps {
  text: string;
}

export default function AnimatedHeroText({ text }: AnimatedHeroTextProps) {
  const compRef = useRef(null);
  const words = text.split(/(?<=\.)/);

  useGSAP(
    () => {
      gsap.from(".text-word", {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });
    },
    { scope: compRef }
  );

  return (
    <div className="accelerate" ref={compRef}>
      <h1 className="hero-title mb-8 text-[max(5rem,min(6.5rem,6.5vw))] font-mono tracking-tighter bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full text-right">
        {words.map((word, index) => (
          <span key={index} className="text-word inline-block">
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
}
