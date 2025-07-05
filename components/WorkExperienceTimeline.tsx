"use client";

import React, { useRef, useEffect } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";
import { experience } from "@/lib/data/work-exp";
import { ExperienceEntry } from "@/types";

// Ensure GSAP plugins are registered once
gsap.registerPlugin(ScrollTrigger);

const WorkExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineRef.current) return;

      // Animate the vertical timeline bar
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.4)", // Subtle white glow
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center", // Start when the top of the container hits the center of the viewport
            end: "bottom center", // End when the bottom of the container hits the center of the viewport
            scrub: 1,
          },
        }
      );

      // Animate each timeline entry
      const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry-new");
      entries.forEach((entry) => {
        const dot = entry.querySelector(".timeline-dot-new");
        const content = entry.querySelector(".timeline-content-new");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 85%", // Start animation when the top of the entry is 85% down the viewport
            end: "top 30%", // End when it reaches 30%
            toggleActions: "play none none reverse",
            scrub: 0.5,
          },
        });

        // Animate dot
        tl.fromTo(
          dot,
          { scale: 0.5, backgroundColor: "var(--color-timeline-border)" },
          {
            scale: 0.95,
            backgroundColor: "var(--color-timeline-dot)",
            boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.5)",
            ease: "power2.inOut",
          }
        );

        // Animate the content card
        tl.fromTo(
          content,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, ease: "power2.out" },
          "<" // Start at the same time as the dot animation
        );
      });
    }, containerRef); // Scope the context to the main container

    return () => ctx.revert(); // Cleanup function
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 text-timeline-text font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16">
          My Professional Journey
        </h2>
        <div ref={containerRef} className="relative">
          <div
            ref={timelineRef}
            className="absolute left-[25%] transform -translate-x-1/2 top-0 w-[0.025rem] h-full bg-timeline-border"
            style={{ transform: "scaleY(0)" }}
          ></div>

          <div className="relative space-y-16">
            {experience.map((entry) => (
              <TimelineEntry key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import TimelineRightContentCard from "./TimelineRightContentCard";

const TimelineEntry = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <div className="timeline-entry-new relative flex items-center mb-16">
      {/* Left Side: Date and Role */}
      <div className="timeline-meta w-full md:w-[25%] text-left">
        <p className="text-sm text-timeline-text mt-0.5">{entry.dateRange}</p>
        <h3 className="text-xl font-semibold text-timeline-text">
          {entry.title}
        </h3>
      </div>

      {/* Dot */}
      <div className="timeline-dot-new absolute left-[25%] transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-timeline-dot z-10"></div>

      {/* Right Side: Content Card */}
      <div className="timeline-content-new w-full md:w-[75%] pl-8 text-left">
        <TimelineRightContentCard entry={entry} />
      </div>
    </div>
  );
};

export default WorkExperienceTimeline;
