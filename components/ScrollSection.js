// components/ScrollSection.js

"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const ScrollSection = ({ children, sectionId, customBackgroundColor }) => {
  const sectionRef = useRef(null); // Reference to main scrollable section
  const animatableContentRef = useRef(null); // Reference to content that animates
  const [isActive, setIsActive] = useState(false); // State to control the 'is-anim-active' class

  // Callback for Intersection Observer
  const handleIntersection = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === sectionId) {
          // Set isActive to true when the section is significantly in view
          // Adjust threshold based on when you want the animation to *start*
          // For 'anim-in', it usually starts when it first enters.
          // For the original example's effect, the animation happens when the section is "active"
          // in a specific portion of the screen, not necessarily just entering.
          // A threshold near 0 or 0.1 might be good for triggering the IN animation.
          setIsActive(entry.isIntersecting); // True if any part is visible
          // More precise for the original logic:
          // setIsActive(entry.intersectionRatio > 0.05 && entry.intersectionRatio < 0.95);
          // This makes it active when mostly in view.
          // For a single 'anim-in', just entry.isIntersecting is common.
        }
      });
    },
    [sectionId]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // relative to the viewport
      rootMargin: "0px",
      // We only need a single threshold to detect entry/exit for a class toggle
      // If you want it to trigger when it's fully visible, use 1.0
      // If you want it to trigger as soon as any part is visible, use 0
      threshold: 0.1, // Trigger when 10% of the section is visible
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up observer
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [handleIntersection]);

  useEffect(() => {
    // Add 'is-ready' to html tag on component mount (simulating original setup)
    document.documentElement.classList.add("is-ready");
    return () => {
      document.documentElement.classList.remove("is-ready");
    };
  }, []);

  return (
    <div className="scrollBlockContainer">
      {/* This is the placeholder div to create initial scroll space */}
      <div className="placeholder" id={`frame-placeholder-${sectionId}`}></div>

      {/* This absolute container creates the full scroll range for the sticky content */}
      <div className="absolutePinContainer">
        {/* The sticky element itself */}
        <div className="stickyContentWrapper">
          {/* The main section/content area, acting as the <scroll-object> from the snippet */}
          <section
            id={sectionId}
            ref={sectionRef}
            className={`scrollSection" ${
              customBackgroundColor === "black" ? "bg-black" : ""
            }`}
          >
            {/* Inner div for the actual content that animates (scale, opacity, translateY) */}
            <div
              ref={animatableContentRef}
              className={`animatableInnerContent ${
                isActive ? "is-anim-active" : ""
              }`}
            >
              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;
