"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./footer"; // Assuming your global footer is here

gsap.registerPlugin(ScrollTrigger);

/**
 * A special layout component that creates a parallax reveal effect for the footer.
 * The main content (passed as children) scrolls up to reveal the footer underneath.
 * This component MUST be a client component because it uses GSAP for animations.
 */
export default function ParallaxFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef(null);
  const mainContentRef = useRef(null);

  useGSAP(
    () => {
      // The animation moves the main content layer up by 100% of its height
      // to reveal the footer sitting underneath it.
      gsap.to(mainContentRef.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          // Start the animation when the bottom of the trigger hits the bottom of the viewport
          start: "bottom bottom",
          // End after scrolling a distance equal to the container's height
          end: "bottom top",
          scrub: true,
          pin: true, // Pin the container so the content slides up over the footer
          markers: process.env.NODE_ENV === "development", // Show markers only in dev
        },
      });
    },
    { scope: containerRef }
  );

  return (
    // The main container that will be the trigger and will be pinned.
    <div ref={containerRef} className="relative bg-background">
      {/* Layer 1: The main content of the page. This is what moves. */}
      <div ref={mainContentRef} className="relative z-10 bg-background">
        {children}
      </div>

      {/* Layer 2: The footer. This is the layer that is revealed. */}
      {/* It is positioned absolutely to sit underneath the main content. */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Footer />
      </div>
    </div>
  );
}