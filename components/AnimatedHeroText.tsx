"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

/**
 *

Explanation:
  This component animates sentences into view.
    * Animation Logic: It uses the GSAP from method to animate each sentence from an initial state of opacity: 0, y: 50 (50px below its final position), and scale: 0.8 (80% of its final size). The animation runs for 1.2 seconds with a smooth power3.out ease.
   * Sequencing: The stagger: 0.15 property is key; it creates a 0.15-second delay between the start of each sentence's animation, making them appear in a fluid, one-after-the-other cascade.
   * Styling & Structure:
       * The text is split by periods into sentences, and each is wrapped in a <span className="text-word inline-block">. The inline-block style is essential as it allows each span to be transformed independently by  GSAP.
       * The font size is fully responsive, scaling between 5rem and 6.5rem based on viewport width using text-[max(5rem,min(6.5rem,6.5vw))].
       * The accelerate class likely applies a CSS rule like will-change: transform; to hint to the browser that the element will be animated, allowing it to optimize by promoting it to its own layer for smoother, hardware-accelerated rendering.
 */
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
