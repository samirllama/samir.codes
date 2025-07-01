"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import AppHeader from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AppMenu from "@/components/ui/app-menu";
import { gsap, Expo, useGSAP } from "@/lib/gsap";
import clsx from "clsx";
import { HtmlReadyManager } from "@/components/AttributeManager";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const loaderRef = useRef<HTMLDivElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const slideLayerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(
        () => {
          const heroTitleWrapper = mainRef.current?.querySelector(
            '[data-gsap-target="hero-title-wrapper"]'
          );
          const heroTextWords =
            heroTitleWrapper?.querySelectorAll(".text-word");

          // Always ensure isLoading is set to false after a delay, even if heroTextWords are not found
          const fallbackTimeout = setTimeout(() => {
            if (isLoading) { // Only set to false if still loading
              setIsLoading(false);
            }
          }, 3000); // 3 seconds fallback

          if (isLoading && loaderRef.current) { // Removed heroTextWords from this condition
            const tl = gsap.timeline({
              onComplete: () => {
                setIsLoading(false); // Set isLoading to false when animation completes
                clearTimeout(fallbackTimeout); // Clear fallback if animation completes
              },
              onStart: () => {
                if (heroTextWords && heroTextWords.length > 0) { // Only set if words exist
                  gsap.set(heroTextWords, { opacity: 0, y: 50, scale: 0.8 });
                }
              },
            });

            tl.to(backgroundLayerRef.current, {
              y: "-100%", // Make the black background slide up
              duration: 0.7, // Duration of the slide
              ease: "power3.inOut",
            });

            // Only animate heroTextWords if they exist
            if (heroTextWords && heroTextWords.length > 0) {
              tl.to(
                heroTextWords,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.2,
                  ease: Expo.easeOut,
                  stagger: 0.15,
                },
                "<0.5"
              );
            }

            gsap.set(loaderRef.current, { pointerEvents: "none" });
          }
        },
        { scope: loaderRef }
      );

      return () => {
        ctx.revert();
      };
    },
    { dependencies: [], scope: loaderRef }
  );

  const webAppClasses = cn([
    "web-app",
    "text-15fx",
    {
      "is-active": isMenuOpen,
    },
  ]);

  return (
    <div className={webAppClasses}>
      <HtmlReadyManager isReady={!isLoading} />
      <AppHeader toggleAction={toggleMenu} isMenuOpen={isMenuOpen} />
      <main ref={mainRef} className="relative  min-h:100vh scroll-content">
        {children}
      </main>
      <Footer />
      <AppMenu isMenuOpen={isMenuOpen} />
      {isLoading && (
        <div
          ref={loaderRef}
          className={clsx("fixed inset-0 z-10 h-screen overflow-hidden")}
        >
          <div ref={backgroundLayerRef} className="absolute inset-0 bg-black"></div>
        </div>
      )}
    </div>
  );
}
