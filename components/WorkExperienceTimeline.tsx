"use client";

import React, { useRef, useEffect } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";
import { experience } from "@/lib/data/work-exp";
import { ExperienceEntry } from "@/types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const WorkExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineRef.current) return;

      gsap.fromTo(
        timelineRef.current,
        { className: cn("timeline-line-initial") },
        {
          className: cn("timeline-line-final"),
          transformOrigin: "top",
          ease: "none",

          scrollTrigger: {
            trigger: containerRef.current,

            scrub: 1,
          },
        }
      );

      const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry-new");
      entries.forEach((entry) => {
        const dot = entry.querySelector(".timeline-dot-new");
        const content = entry.querySelector(".timeline-content-new");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            scrub: 0.5,
          },
        });

        // Animate dot
        tl.fromTo(
          dot,
          { className: cn("timeline-dot-initial") },
          {
            className: cn("timeline-dot-final"),
            ease: "power2.inOut",
          }
        );

        tl.fromTo(
          content,
          { className: cn("timeline-content-initial") },
          { className: cn("timeline-content-final"), ease: "power2.out" },
          "<"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 text-timeline-text font-transitional">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 text-left mb-12 sm:mb-16">Experience / Work</h2>
        <div ref={containerRef} className="relative">
          <div
            ref={timelineRef}
            className="absolute left-[25%] transform -translate-x-1/2 top-0 w-[0.025rem] h-full bg-timeline-border timeline-line-initial"
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
      <div className="timeline-meta w-full md:w-[25%] text-left">
        <p className="text-lg text-timeline-text mt-0.5">{entry.dateRange}</p>
        <h3 className="text-xl font-semibold text-timeline-text">
          {entry.title}
        </h3>
      </div>

      {/* Dot */}
      <div className="timeline-dot-new absolute left-[25%] transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-timeline-dot z-10"></div>

      <div className="timeline-content-new w-full md:w-[75%] pl-8 text-left">
        <TimelineRightContentCard entry={entry} />
      </div>
    </div>
  );
};

export default WorkExperienceTimeline;
