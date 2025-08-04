"use client";

import React, { useRef, useEffect } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";
import { experience } from "@/lib/data/work-exp";
import { ExperienceEntry } from "@/types";
import TimelineRightContentCard from "./TimelineRightContentCard";

gsap.registerPlugin(ScrollTrigger);

const WorkExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineRef.current) return;

      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
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
          { scale: 0.5, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: "power2.inOut",
          }
        );

        tl.fromTo(
          content,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "power2.out" },
          "<"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      className="my-fluid-lg py-fluid-xl text-timeline-text"
    >
      <div ref={containerRef} className="relative">
        <h2 className="text-fluid-h2 my-fluid-lg">Work Overview</h2>
        <div
          ref={timelineRef}
          className="sm:invisible md:visible absolute left-[20%] transform -translate-x-1/2 top-20 w-[0.025rem] h-full bg-timeline-border timeline-line-initial"
        ></div>

        <div className="relative space-y-16">
          {experience.map((entry) => (
            <TimelineEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineEntry = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <div className="timeline-entry-new relative flex items-center mb-16">
      <div className="timeline-meta basis-1/3 text-left">
        <time className="text-fluid-meta mt-fluid-sm">{entry.dateRange}</time>
      </div>

      <div className="sm:invisible md:visible timeline-dot-new absolute left-[20%] transform -translate-x-1/2 top-1/2 -translate-y-1/2 md:w-2 md:h-2 md:rounded-full bg-timeline-dot z-10"></div>

      <div className="timeline-content-new basis-full pl-8 text-left">
        <TimelineRightContentCard entry={entry} />
      </div>
    </div>
  );
};

export default WorkExperienceTimeline;
