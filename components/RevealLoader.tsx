// components/RevealLoader.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { CSSPlugin, gsap, Expo } from "gsap";

interface GSAPRevealLoaderProps {
  children: React.ReactNode;
  onAnimationComplete?: () => void;
  initLoadingState: boolean;
}

export default function RevealLoader({
  children,
  onAnimationComplete,
  initLoadingState,
}: GSAPRevealLoaderProps) {
  const [count, setCount] = useState(0);
  // Controls visibility & animation trigger
  const [loaderActive, setLoaderActive] = useState(initLoadingState);

  // Refs for DOM elements to be animated by GSAP
  const loadingRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // ref will point to revealed content wrapper
  const titleLine1Ref = useRef<HTMLDivElement>(null); // Example elements within revealed content
  const titleLine2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // Only run the counter if loader is active and count is less than 100
    if (loaderActive && count < 100) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount >= 100) {
            clearInterval(interval); // Stop the interval when 100 is reached
            return 100; // Cap the count at 100
          }
          return newCount;
        });
      }, 30); // Adjust interval for desired loading speed
    } else if (count === 100 && loaderActive) {
      // Trigger the GSAP reveal animation on 100
      revealAnimation();
    }

    // Cleanup
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [count, loaderActive]); // Dependencies: re-run if count or loaderActive changes

  // GSAP Reveal Animation function
  const revealAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (loadingRef.current) {
          // hide loading container
          gsap.set(loadingRef.current, { display: "none" });
        }
        setLoaderActive(false); // Mark the loader as inactive
        if (onAnimationComplete) {
          onAnimationComplete(); // Notify parent component, animation done
        }
      },
    });

    // Initial setup for content elements (hidden state before animation)
    gsap.set(contentRef.current, { width: "0%", opacity: 0 }); // Content div starts hidden
    // Assuming title lines are direct children for the fade-in effect
    gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
      opacity: 0,
      y: 50,
    });

    // Sequence of animations in timeline:
    tl.to(followRef.current, {
      width: "100%", // Expand follow line horizontally
      ease: Expo.easeOut,
      duration: 1.2,
    })
      .to(
        [countRef.current, progressBarRef.current],
        {
          opacity: 0, // Fade out loading count and progress bar
          display: "none", // Hide them after fading
          duration: 0.5,
          ease: Expo.easeOut,
        },
        "-=0.5"
      ) // Start this 0.5s before previous ends
      .to(
        followRef.current,
        {
          height: "100vh", // Expand follow line vertically to cover screen
          top: 0,
          ease: Expo.easeOut,
          duration: 1.2,
        },
        "-=0.8"
      ) // Start this 0.8s before previous ends
      .to(
        contentRef.current,
        {
          width: "100%",
          opacity: 1, // Make content visible
          ease: Expo.easeOut,
          duration: 1.2,
        },
        "-=1"
      ) // Start this 1s before previous ends
      .fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        {
          y: 50, // Start title lines slightly below
          opacity: 0,
        },
        {
          y: 0, // Move to original position
          opacity: 1, // Fade in title lines
          duration: 0.8,
          ease: Expo.easeOut,
          stagger: 0.2, // Stagger animation for each title line
        },
        "-=0.6"
      ); // Start this 0.6s before previous ends
  };

  return (
    <>
      {/* The `loaderActive` state controls visibility & pointer events
            to prevent interaction with content while the loader is active.
          */}
      <div
        ref={loadingRef}
        className={`fixed inset-0 flex items-center justify-center bg-gray-900 z-50 transition-opacity duration-500
              ${
                loaderActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
      >
        <div className="relative w-96 h-20 flex flex-col justify-center items-center">
          {/* Follow Line */}
          <div
            ref={followRef}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-blue-500 rounded-full h-1 w-0 transform"
          ></div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
            <div
              ref={progressBarRef}
              style={{ width: `${count}%` }}
              className="bg-blue-500 h-full rounded-full transition-all duration-100 ease-linear"
            ></div>
          </div>

          {/* Count (Percentage Text) */}
          <p ref={countRef} className="text-2xl font-bold text-blue-400">
            {count}%
          </p>
        </div>
      </div>

      {/* Content Section (Initially Hidden, Revealed After Loading) */}
      {/*
            This div wraps the page content (`children`).
            Starts with opacity 0 and expands from width 0, then fades in.
            min-h-screen ensures it takes full height once revealed.
          */}
      <div
        ref={contentRef}
        className={`w-full flex flex-col items-center justify-center p-8 bg-gray-900 text-white min-h-screen ${
          loaderActive ? "opacity-0" : "opacity-100"
        }`}
      >
        {/*
              These are example elements that would represent your "Welcome to Our Awesome Site!" text.
              You would typically pass this content as `children` to RevealLoader
              or use the content directly within this component if it's always part of the reveal.
              For a generic loader, `children` is preferred.
            */}
        <div
          ref={titleLine1Ref}
          className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 opacity-0"
        >
          Welcome to
        </div>
        <div
          ref={titleLine2Ref}
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 opacity-0"
        >
          Our Awesome Site!
        </div>

        {children}
      </div>
    </>
  );
}
