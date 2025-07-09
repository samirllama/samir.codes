"use client";
import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface AppLoaderProps {
  onCurtainRevealComplete: () => void;
}

const AppLoader: React.FC<AppLoaderProps> = ({ onCurtainRevealComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const slideLayerRef = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(true);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.2, // Small delay before starting
        onComplete: () => {
          onCurtainRevealComplete(); // Set isPageReady to true
          setShouldRender(false); // Then unmount the loader
        },
      });

      // Instead of animating styles, we add a class using our `cn` utility.
      tl.to(slideLayerRef.current, {
        className: cn(slideLayerRef.current?.className, "is-revealing"),
        ease: "power3.inOut",
      }).to(
        backgroundLayerRef.current,
        {
          className: cn(
            backgroundLayerRef.current?.className,
            "is-revealing"
          ),
          ease: "power2.out",
        },
        "<0.2" // Start this animation 0.2s after the previous one starts
      );

      tl.set(loaderRef.current, { className: cn(loaderRef.current?.className, "pointer-events-none") });
    },
    { scope: loaderRef }
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className={cn("fixed inset-0 z-[999] h-screen overflow-hidden")}
    >
      {/* Base classes are now defined in globals.css */}
      <div
        ref={backgroundLayerRef}
        className="absolute inset-0 app-loader-background"
      ></div>
      <div
        ref={slideLayerRef}
        className="absolute inset-0 app-loader-slide"
      ></div>
    </div>
  );
};

export default AppLoader;
