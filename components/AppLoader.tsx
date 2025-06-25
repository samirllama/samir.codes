"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

interface AppLoaderProps {
  active: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ active }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const slideLayerRef = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(true);

  useGSAP(
    () => {
      if (!active && loaderRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            setShouldRender(false);
          },
        });

        tl.to(backgroundLayerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        }).to(
          slideLayerRef.current,
          {
            y: "-100%",
            duration: 1.3,
            ease: "power3.inOut",
          },
          "<0.2"
        );

        gsap.set(loaderRef.current, { pointerEvents: "none" });
      } else if (active && loaderRef.current) {
        gsap.set(backgroundLayerRef.current, { opacity: 1 });
        gsap.set(slideLayerRef.current, { y: "0%" });
        setShouldRender(true);
      }
    },
    { dependencies: [active], scope: loaderRef }
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className={clsx("fixed inset-0 z-[9999] h-screen overflow-hidden")}
    >
      {/* Black background layer */}
      <div ref={backgroundLayerRef} className="absolute inset-0 bg-black"></div>

      {/* White slide-up layer */}
      <div
        ref={slideLayerRef}
        className="absolute inset-0 bg-white transform"
      ></div>
    </div>
  );
};

export default AppLoader;
