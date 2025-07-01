// components/AppLoader.tsx
"use client";
import React, { useRef, useState } from "react";
import { gsap, Expo, useGSAP } from "@/lib/gsap";
import clsx from "clsx";

interface AppLoaderProps {
  active: boolean;
  gsapContextRef: React.RefObject<HTMLElement | null>;
}

const AppLoader: React.FC<AppLoaderProps> = ({ active, gsapContextRef }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const slideLayerRef = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(true);

  useGSAP(
    () => {
      const ctx = gsap.context(
        () => {
          const heroTitleWrapper = gsapContextRef.current?.querySelector(
            '[data-gsap-target="hero-title-wrapper"]'
          );
          const heroTextWords =
            heroTitleWrapper?.querySelectorAll(".text-word");

          if (
            !active &&
            loaderRef.current &&
            heroTextWords &&
            heroTextWords.length > 0
          ) {
            const tl = gsap.timeline({
              onComplete: () => {
                setShouldRender(false);
              },
              onStart: () => {
                gsap.set(heroTextWords, { opacity: 0, y: 50, scale: 0.8 });
              },
            });

            tl.to(backgroundLayerRef.current, {
              opacity: 0,
              duration: 0.1,
              ease: "power2.out",
            })
              .to(
                slideLayerRef.current,
                {
                  y: "-100%",
                  duration: 0.7,
                  ease: "power3.inOut",
                },
                "<0.2"
              )
              .to(
                heroTextWords,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.2, // Slightly increased duration for Expo ease
                  ease: Expo.easeOut,
                  stagger: 0.15,
                },
                "<0.5"
              );

            gsap.set(loaderRef.current, { pointerEvents: "none" });
          } else if (active && loaderRef.current) {
            gsap.set(backgroundLayerRef.current, { opacity: 1 });
            gsap.set(slideLayerRef.current, { y: "0%" });
            setShouldRender(true);
            gsap.set(loaderRef.current, { pointerEvents: "auto" });
            if (heroTextWords && heroTextWords.length > 0) {
              gsap.set(heroTextWords, { opacity: 0 });
            }
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
  }

  return (
    <div
      ref={loaderRef}
      className={clsx("fixed inset-0 z-10 h-screen overflow-hidden")}
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
