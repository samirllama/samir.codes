"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
}

export default function ParallaxSection({ children }: ParallaxSectionProps) {
  const parallaxContainerRef = useRef(null);

  useEffect(() => {
    const parallaxContainer = parallaxContainerRef.current;
    if (parallaxContainer) {
      gsap.to(".creative-canvas-section", {
        className: cn("parallax-section-final"),
        ease: "none",
        scrollTrigger: {
          trigger: parallaxContainer,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });
    }
  }, []);

  return (
    <div ref={parallaxContainerRef} className={cn("h-[100vh]", "parallax-section-initial")}>
      {children}
    </div>
  );
}
