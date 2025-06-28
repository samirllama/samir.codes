// components/Hero.tsx
"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { useRef } from "react";


import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const heroElement = heroRef.current;
      if (!heroElement) return;

      const introTL = gsap.timeline({
        defaults: { duration: 1, ease: "power2.out" },
      });

      introTL
        .set(heroElement, { opacity: 1 })
        .from(".hero-header-word", {
          scale: 4,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 0.2,
          duration: 0.8,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "<+=0.4"
        )
        .from(
          ".hero-body",
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
          },
          "<+=0.2"
        )
        .from(
          ".hero-button",
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
          },
          "<+=0.2"
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "bottom center",
          scrub: 1.5,
        },
      });

      scrollTl
        .from(
          ".text-side-heading .split-char",
          {
            scale: 1.3,
            y: 40,
            rotate: -25,
            opacity: 0,
            stagger: 0.05,
            ease: "back.out(3)",
            duration: 0.5,
          },
          0.2
        )
        .from(
          ".text-side-body",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "<+=0.1"
        );
    },

    { scope: heroRef }
  );

  return (
    <AnimatedSection
      as="section"
      className="hero relative min-h-[calc(100vh-theme(spacing.10))] flex items-center justify-center text-center py-20 lg:py-32"
      ref={heroRef}
    >
      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 items-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-gray-900 drop-shadow-lg word-animation-container">
          {"My Professional Journey".split(" ").map((word, index) => (
            <span
              key={index}
              className="hero-header-word inline-block mr-2 last:mr-0"
            >
              {word}
            </span>
          ))}
        </h1>

        <p className="hero-subheading text-xl md:text-2xl text-gray-700 max-w-2xl px-4">
          Explore my experience, projects, and contributions in the world of software development.
        </p>

        <p className="hero-body text-lg md:text-xl text-gray-600 max-w-xl px-4">
          This timeline showcases my professional growth and the diverse challenges I&apos;ve tackled.
        </p>

        <button className="hero-button bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95">
          View Projects
        </button>
      </div>
    </AnimatedSection>
  );
};

export default Hero;
