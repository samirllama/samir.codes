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

    const initialIsReady = htmlElement.classList.contains("is-ready");
    setIsHtmlReady(initialIsReady);

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const newIsReady = htmlElement.classList.contains("is-ready");
          if (newIsReady !== isHtmlReady) {
            setIsHtmlReady(newIsReady);
          }
        }
      }
    });

    observer.observe(htmlElement, { attributes: true });

    return () => observer.disconnect();
  }, [isHtmlReady]);

  useGSAP(
    () => {
      const chars = compRef.current?.querySelectorAll(".text-char");

      if (!chars) return; // Add null check

      gsap.set(chars, { y: -50, scale: 0.5, rotation: 0, skewX: 0 });

      if (isHtmlReady) {
        const tl = gsap.timeline({
          defaults: {
            duration: 1.2,
            ease: "power3.out",
          },
        });

        const codeChars = Array.from(chars).slice(0, 4) as HTMLElement[];
        const firstDot = chars[4];
        const createChars = Array.from(chars).slice(5, 11);
        const secondDot = chars[11];
        const catalyzeChars = Array.from(chars).slice(12, 20);
        const charHeight = codeChars[0]?.offsetHeight || 0;

        tl.from(
          codeChars,
          {
            y: -50,
            opacity: 0,
            scale: 0.5,
            rotation: gsap.utils.random(-30, 30),
            skewX: gsap.utils.random(-10, 10),
            stagger: {
              each: 0.08,
              from: "center",
            },
          },
          "wordsStart"
        ).to(codeChars, {
          rotation: 0,
          skewX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.02,
            from: "center",
          },
        });

        tl.from(
          createChars,
          {
            y: -50,
            opacity: 0,
            scale: 0.5,
            rotation: gsap.utils.random(-30, 30),
            skewX: gsap.utils.random(-10, 10),
            stagger: {
              each: 0.08,
              from: "center",
            },
          },
          "wordsStart+=1"
        ).to(createChars, {
          rotation: 0,
          skewX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.02,
            from: "center",
          },
        });

        tl.from(
          catalyzeChars,
          {
            y: -50,
            opacity: 0,
            scale: 0.5,
            rotation: gsap.utils.random(-30, 30),
            skewX: gsap.utils.random(-10, 10),
            stagger: {
              each: 0.08,
              from: "center",
            },
          },
          "wordsStart+=2"
        ).to(
          catalyzeChars,
          {
            rotation: 0,
            skewX: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: {
              each: 0.02,
              from: "center",
            },
          },
          "allWordsSettled"
        );

        tl.to(chars, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          skewX: 0,
          duration: 0.1,
          ease: "power1.out",
        });
        tl.set(chars[5], { marginLeft: "12px" }); // Space after "Code."
        tl.set(chars[12], { marginLeft: "12px" }); // Space after "Create."

        const firstDotTl = gsap.timeline();
        firstDotTl
          .from(firstDot, {
            opacity: 0,
            y: -charHeight * 2,
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            firstDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(
            firstDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(
            firstDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(
            firstDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(firstDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(firstDot, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });

        tl.add(firstDotTl, "allWordsSettled");

        const secondDotTl = gsap.timeline();
        secondDotTl
          .from(secondDot, {
            opacity: 0,
            y: -charHeight * 2,
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            secondDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(
            secondDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(
            secondDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(
            secondDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(
            secondDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(
            secondDot,
            { y: -charHeight, duration: 0.1, ease: "power1.out" },
            "<0.1"
          )
          .to(secondDot, { y: 0, duration: 0.1, ease: "power1.in" }, ">")
          .to(secondDot, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });

        tl.add(secondDotTl, "allWordsSettled+=" + firstDotTl.duration());
      }
    },
    { scope: compRef, dependencies: [isHtmlReady] }
  );

  return (
    <div
      className="accelerate hero-title mb-8 text-[max(5rem,min(6.5rem,6.5vw))] font-transitional bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full text-right"
      ref={compRef}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`text-char inline-block ${
            char === "." ? "text-dot absolute" : ""
          } ${index === 4 ? "first-dot" : ""}`}
        >
          {char === " " ? "\u00A0" : char}{" "}
        </span>
      ))}
    </div>
  );
}
