"use client";
import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";

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
      

      // Ensure initial state is visible
      gsap.set(backgroundLayerRef.current, { opacity: 1 });
      gsap.set(slideLayerRef.current, { y: "0%" });

      const tl = gsap.timeline({
        onComplete: () => {
          onCurtainRevealComplete(); // Set isPageReady to true first
          setShouldRender(false); // Then unmount the loader
        },
        
      });

      
      tl.to(slideLayerRef.current, {
        y: "-100%",
        
        ease: "power3.inOut",
      });
      tl.to(
        backgroundLayerRef.current,
        {
          opacity: 0,
          
          ease: "power2.out",
        },
        
      );

      // Ensure pointer events are disabled on the loader once animation starts
      gsap.set(loaderRef.current, { pointerEvents: "none" });
    },
    { scope: loaderRef }
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className={clsx("fixed inset-0 z-[999] h-screen overflow-hidden")}
    >
      <div ref={backgroundLayerRef} className="absolute inset-0 bg-black"></div>
      <div
        ref={slideLayerRef}
        className="absolute inset-0 bg-white transform"
      ></div>
    </div>
  );
};

export default AppLoader;
