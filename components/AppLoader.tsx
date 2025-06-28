// components/AppLoader.tsx
"use client";
import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";

interface AppLoaderProps {
  active: boolean;
  onLoaderComplete: () => void;
}

const AppLoader: React.FC<AppLoaderProps> = ({ active, onLoaderComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const slideLayerRef = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(true);

  useGSAP(
    () => {
      const ctx = gsap.context(
        () => {
          if (!active && loaderRef.current) {
            const tl = gsap.timeline({
              onComplete: () => {
                setShouldRender(false);
                onLoaderComplete();
                window.dispatchEvent(new Event('loaderComplete'));
              },
            });

            tl.to(backgroundLayerRef.current, {
              opacity: 0,
              duration: 0.1,
              ease: "power2.out",
            }).to(
              slideLayerRef.current,
              {
                y: "-100%",
                duration: 0.7,
                ease: "power3.inOut",
              },
              "<0.2"
            );

            gsap.set(loaderRef.current, { pointerEvents: "none" });
          } else if (active && loaderRef.current) {
            gsap.set(backgroundLayerRef.current, { opacity: 1 });
            gsap.set(slideLayerRef.current, { y: "0%" });
            setShouldRender(true);
            gsap.set(loaderRef.current, { pointerEvents: "auto" });
          }
        },
        { scope: loaderRef }
      );

      return () => {
        ctx.revert();
      };
    },
    { dependencies: [active], scope: loaderRef }
  );

  if (!shouldRender) {
    return null;
  };

  return (
    <div
      ref={loaderRef}
      className={clsx("fixed inset-0 z-[9999] h-screen overflow-hidden")}
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
