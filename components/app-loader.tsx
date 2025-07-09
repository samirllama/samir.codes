"use client";
import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface AppLoaderProps {
  onCurtainRevealComplete: () => void;
}

const AppLoader: React.FC<AppLoaderProps> = ({ onCurtainRevealComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        onCurtainRevealComplete();
        setShouldRender(false);
      },
    });

    tl.to(layer1Ref.current, {
      yPercent: -100,
      ease: "power4.out",
    })
      .to(
        layer2Ref.current,
        {
          yPercent: -100,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        layer3Ref.current,
        {
          yPercent: -100,
          ease: "power1.out",
        },
        "-=0.3"
      );
  });

  if (!shouldRender) return null;

  return (
    <div ref={containerRef} className="loader-container">
      <div ref={layer1Ref} className="curtain layer-1" />
      <div ref={layer2Ref} className="curtain layer-2" />
      <div ref={layer3Ref} className="curtain layer-3" />
    </div>
  );
};

export default AppLoader;
