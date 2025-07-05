"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface TestAnimatedTextProps {
  text: string;
}

export default function TestAnimatedText({ text }: TestAnimatedTextProps) {
  const compRef = useRef<HTMLDivElement>(null);
  const [isHtmlReady, setIsHtmlReady] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;

    // Set initial state based on current class
    const initialIsReady = htmlElement.classList.contains("is-ready");
    setIsHtmlReady(initialIsReady);
    console.log("TestAnimatedText: Initial isHtmlReady state set to", initialIsReady, "at", performance.now());

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const newIsReady = htmlElement.classList.contains("is-ready");
          if (newIsReady !== isHtmlReady) { // Only log if state actually changes
            setIsHtmlReady(newIsReady);
            console.log("TestAnimatedText: isHtmlReady state changed to", newIsReady, "at", performance.now());
          }
        }
      }
    });

    observer.observe(htmlElement, { attributes: true });

    return () => observer.disconnect();
  }, [isHtmlReady]); // Added isHtmlReady to dependency array to prevent infinite loop with console.log

  useGSAP(
    () => {
      // Ensure the main container is visible
      gsap.set(compRef.current, { opacity: 1 });

      const chars = compRef.current?.querySelectorAll(".text-char");
      console.log("TestAnimatedText: Selected characters (chars):", chars);
      if (!chars) return; // Add null check

      // Initial state for all characters (excluding opacity, which will be handled by from() tweens)
      gsap.set(chars, { y: -50, scale: 0.5, rotation: 0, skewX: 0 });

      if (isHtmlReady) {
        console.log("TestAnimatedText: GSAP animation triggered at", performance.now());
        const tl = gsap.timeline({
          defaults: {
            duration: 1.2,
            ease: "power3.out",
          },
        });

        const codeChars = Array.from(chars).slice(0, 4); // "Code"
        const firstDot = chars[4]; // The first "."
        const createChars = Array.from(chars).slice(5, 11); // "Create"
        const secondDot = chars[11]; // The second "."
        const catalyzeChars = Array.from(chars).slice(12, 20); // "Catalyze"

        // Calculate precise X positions for dots based on preceding character positions
        const preciseFirstDotTargetX = chars[3].offsetLeft + chars[3].offsetWidth; // After 'e' of Code
        const preciseSecondDotTargetX = chars[10].offsetLeft + chars[10].offsetWidth; // After 'e' of Create

        // Get the height of a character for proportional bouncing
        const charHeight = codeChars[0]?.offsetHeight || 0; // Use the height of the first char 'C'

        // --- Word Animations ---

        // 1. Animate "Code" characters
        tl.from(codeChars, {
          y: -50,
          opacity: 0,
          scale: 0.5,
          rotation: gsap.utils.random(-30, 30),
          skewX: gsap.utils.random(-10, 10),
          stagger: {
            each: 0.08,
            from: "center",
          },
        }, "wordsStart")
        .to(codeChars, {
          rotation: 0,
          skewX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.02,
            from: "center",
          },
        });

        // 2. Animate "Create" characters
        tl.from(createChars, {
          y: -50,
          opacity: 0,
          scale: 0.5,
          rotation: gsap.utils.random(-30, 30),
          skewX: gsap.utils.random(-10, 10),
          stagger: {
            each: 0.08,
            from: "center",
          },
        }, "wordsStart+=1") // Start after "Code" animation
        .to(createChars, {
          rotation: 0,
          skewX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.02,
            from: "center",
          },
        });

        // 3. Animate "Catalyze" characters
        tl.from(catalyzeChars, {
          y: -50,
          opacity: 0,
          scale: 0.5,
          rotation: gsap.utils.random(-30, 30),
          skewX: gsap.utils.random(-10, 10),
          stagger: {
            each: 0.08,
            from: "center",
          },
        }, "wordsStart+=2") // Start after "Create" animation
        .to(catalyzeChars, {
          rotation: 0,
          skewX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.02,
            from: "center",
          },
        }, "allWordsSettled"); // Add label here to mark end of all word animations

        // --- Dot Animations (after words settle) ---
        // tl.addLabel("dotsStart", "wordsStart+=3"); // Removed fixed delay

        // First dot animation
        const firstDotTl = gsap.timeline();
        firstDotTl.from(firstDot, {
          opacity: 0,
          y: -charHeight * 2, // Start higher above the line
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
        })
        // Bounces over 'C'
        .to(firstDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Bounces over 'o'
        .to(firstDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Bounces over 'd'
        .to(firstDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Bounces over 'e'
        .to(firstDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Final settle
        .to(firstDot, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });

        tl.add(firstDotTl, "allWordsSettled"); // Start first dot after all words settled

        // Second dot animation
        const secondDotTl = gsap.timeline();
        secondDotTl.from(secondDot, {
          opacity: 0,
          y: -charHeight * 2,
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
        })
        // Bounces over 'C'
        .to(secondDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Bounces over 'r'
        .to(secondDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Bounces over 'e'
        .to(secondDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Bounces over 'a'
        .to(secondDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Bounces over 't'
        .to(secondDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Bounces over 'e'
        .to(secondDot, { y: -charHeight, duration: 0.1, ease: "power1.out" }, "<0.1")
        .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
        // Final settle
        .to(secondDot, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });

        tl.add(secondDotTl, "allWordsSettled+=" + firstDotTl.duration()); // Start second dot after first dot finishes

        // Final state to ensure visibility
        tl.set(chars, { opacity: 1, y: 0, scale: 1, rotation: 0, skewX: 0 });
      }
    },
    { scope: compRef, dependencies: [isHtmlReady] }
  );

  return (
    <div
      className="accelerate hero-title mb-8 text-[max(5rem,min(6.5rem,6.5vw))] font-transitional tracking-tighter bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full text-right"
      ref={compRef}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`text-char inline-block ${char === "." ? "text-dot absolute" : ""} ${index === 4 ? "first-dot" : ""}`}
        >
          {char === " " ? "\u00A0" : char}{" "}
        </span>
      ))}
    </div>
  );
}