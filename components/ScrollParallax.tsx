// components/ScrollParallaxSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, MotionPathPlugin } from "@/lib/gsap";

export default function ScrollParallaxSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const pathElementRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          // markers: true, // Uncomment for visual debugging
        },
      });

      gsap.to(imageRef.current, {
        yPercent: -20, // Move image up by 20% of its height relative to scroll
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true, // Uncomment for visual debugging
        },
      });

      gsap.to(".animated-icon", {
        duration: 10,
        ease: "power1.inOut",
        motionPath: {
          path: pathElementRef.current,
          align: ".animated-icon",
          autoRotate: true,
          alignOrigin: [0.5, 0.5], // Align icon's center to path
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Start when section hits top of viewport
          end: "bottom bottom", // End when section leaves bottom of viewport
          scrub: 1, // Smoothly link progress to scroll (1 second lag)
          // markers: true,
        },
      });
    }, sectionRef); // Scope context to the sectionRef

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] flex flex-col items-center justify-center bg-gray-100 text-gray-800 font-sans p-12 box-border overflow-hidden"
    >
      {/* Parallax Image Wrapper */}
      <div className="absolute top-0 left-0 w-full h-[120%] overflow-hidden z-10">
        {/* Important: Set a sensible default for src in case image.jpg is missing */}
        <img
          ref={imageRef}
          src="/images/your-parallax-image.jpg"
          alt="Parallax background"
          className="w-full h-full object-cover translate-z-0" // Tailwind for transform: translateZ(0)
        />
      </div>

      {/* SVG Path for MotionPathPlugin */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
        viewBox="0 0 1000 1000"
      >
        <path
          ref={pathElementRef}
          d="M 100 100 Q 200 50 300 100 T 500 100 S 700 150 800 100 Q 900 50 990 100" // Example curved path
          fill="none"
          stroke="blue" // Visible in dev, can be 'none' in production
          strokeWidth="2"
          opacity="0.2" // Make path subtle
        />
      </svg>

      {/* Animated Icon (the element that follows the path) */}
      {/* Ensure this icon is within the sectionRef's scope for context */}
      <div
        className="animated-icon absolute z-30 flex items-center justify-center p-2 bg-purple-500 text-white rounded-full shadow-lg"
        style={{ width: "40px", height: "40px" }}
      >
        🚀 {/* Example icon or replace with an SVG/Image */}
      </div>

      <div className="relative z-20 max-w-4xl mx-auto p-8 bg-white bg-opacity-85 rounded-lg shadow-xl text-center">
        <h2
          ref={titleRef}
          className="text-5xl font-extrabold mb-5 leading-tight"
        >
          Crafting Digital Experiences
        </h2>
        <p ref={textRef} className="text-xl leading-relaxed mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <br />
          <br />
          Experience seamless animations that bring your content to life. Scroll
          down to see more amazing effects.
        </p>
        <div className="h-[800px] flex items-center justify-center text-4xl font-bold bg-gray-200 rounded-lg">
          Dive Deeper
        </div>
      </div>
    </section>
  );
}
