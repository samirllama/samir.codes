"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface AnimatedLetterTextProps {
  text: string;
}

export default function AnimatedLetterText({ text }: AnimatedLetterTextProps) {
  const compRef = useRef<HTMLDivElement>(null);
  const [isHtmlReady, setIsHtmlReady] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;

    // Check initial state
    if (htmlElement.classList.contains("is-ready")) {
      setIsHtmlReady(true);
    }

    // Observe changes to the class attribute
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setIsHtmlReady(htmlElement.classList.contains("is-ready"));
        }
      }
    });

    observer.observe(htmlElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (isHtmlReady) {
        const tl = gsap.timeline({
          
          defaults: {
            duration: 1.2,
            ease: "power3.out",
          },
        });

        const chars = compRef.current?.querySelectorAll(".text-char");
        if (!chars) return;
        
        const firstDot = chars[4];
        const restOfChars = Array.from(chars).slice(5);

        
        gsap.set(chars, { opacity: 0, y: 100, scale: 0.5, rotation: 0, skewX: 0 });

        
        tl.from(chars, {
          y: 100,
          opacity: 0,
          scale: 0.5,
          rotation: gsap.utils.random(-30, 30),
          skewX: gsap.utils.random(-10, 10),
          stagger: {
            each: 0.08,
            from: "center",
          },
        }).to(chars, {
          rotation: 0,
          skewX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.02,
            from: "center",
          },
        });

        tl.from(firstDot, {
          opacity: 0,
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
        }).to(firstDot, { y: -20, duration: 0.1, ease: "power1.out" }, "<")
        .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" })
        .to(firstDot, { y: -20, duration: 0.1, ease: "power1.out" })
        .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" })
        .to(firstDot, { y: -20, duration: 0.1, ease: "power1.out" })
        .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" })
        .to(firstDot, { y: -20, duration: 0.1, ease: "power1.out" })
        .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" })
        .to(firstDot, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });

        tl.from(restOfChars, {
          y: 100,
          opacity: 0,
          scale: 0.5,
          rotation: gsap.utils.random(-30, 30),
          skewX: gsap.utils.random(-10, 10),
          stagger: {
            each: 0.08,
            from: "center",
          },
        }).to(restOfChars, {
          rotation: 0,
          skewX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.02,
            from: "center",
          },
        });
      }
    },
    { scope: compRef, dependencies: [isHtmlReady] }
  );

  return (
    <div className="accelerate overflow-hidden" ref={compRef}>
      <h1 className="hero-title mb-8 text-[max(5rem,min(6.5rem,6.5vw))] font-transitional tracking-tighter bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full text-right">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`text-char inline-block ${char === "." ? "text-dot" : ""} ${index === 4 ? "first-dot" : ""}`}
          >
            {char === " " ? "\u00A0" : char}{" "}
            {/* Handle spaces with non-breaking space */}
          </span>
        ))}
      </h1>
    </div>
  );
}
