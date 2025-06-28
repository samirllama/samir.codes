import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { experience } from "@/lib/data/work-exp";
import { ProjectEntry } from "../types";

// Mapper to transform experience data into a consistent ProjectEntry format
const projects: ProjectEntry[] = experience.map((e) => ({
  ...e,
  role: e.title,
  subtitle: e.company,
  altText: `Screenshot of work at ${e.company}`,
  projectScreenshotUrl:
    e.projectScreenshotUrl ||
    "https://placehold.co/600x450/333333/FFFFFF?text=Project+Screenshot",
}));

// --- Main Timeline Component ---
const TimelinePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure GSAP and ScrollTrigger are ready
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!timelineRef.current) return;

      // --- Vertical Line Animation ---
      // Animates the timeline's vertical bar, drawing it as the user scrolls down.
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // --- Project Animations ---
      // Select all project entries and animate them as they enter the viewport.
      const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry");
      entries.forEach((entry) => {
        const dot = entry.querySelector(".timeline-dot");
        const content = entry.querySelector(".timeline-content");

        // Use a timeline for each entry to sequence animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 80%", // Start animation when the top of the entry is 80% down the viewport
            end: "top 50%",   // End when it reaches 50%
            toggleActions: "play none none reverse",
            scrub: 0.5,
          },
        });

        // Animate the dot: scale up and glow
        tl.fromTo(
          dot,
          { scale: 0.5, backgroundColor: "rgb(107 114 128)" },
          {
            scale: 1.25,
            backgroundColor: "rgb(255 255 255)",
            boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.5)",
            ease: "power2.inOut",
          }
        );

        // Animate the content card: fade in and slide from the right
        tl.fromTo(
          content,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, ease: "power2.out" },
          "<" // Start at the same time as the dot animation
        );
      });
    }, containerRef); // Scope the context to the main container

    // Cleanup function to kill animations and ScrollTriggers on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="relative max-w-5xl mx-auto">
        {/* The vertical timeline bar */}
        <div
          ref={timelineRef}
          className="absolute left-4 sm:left-1/2 top-0 w-0.5 h-full bg-gray-700"
          style={{ transform: "scaleY(0)" }} // Initial state
        ></div>

        <div className="relative">
          {projects.map((project) => (
            <TimelineEntry key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Timeline Entry Component ---
// Represents a single row in the timeline (dot, date, and project card)
const TimelineEntry = ({ project }: { project: ProjectEntry }) => {
  return (
    <div className="timeline-entry relative flex items-start mb-16">
      {/* Dot and Date/Role Info (Left Side) */}
      <div className="timeline-meta flex-shrink-0 w-28 sm:w-auto sm:absolute sm:left-1/2 sm:transform sm:-translate-x-full sm:pr-8 text-right">
        <div className="timeline-dot absolute left-4 sm:left-auto sm:right-0 top-1 w-3 h-3 rounded-full bg-gray-500 transform sm:translate-x-1/2"></div>
        <p className="text-sm text-gray-400 mt-0.5">{project.dateRange}</p>
        <h3 className="text-lg font-semibold text-white">{project.role}</h3>
      </div>

      {/* Project Card (Right Side) */}
      <div className="timeline-content w-full sm:w-1/2 sm:pl-8">
        <ProjectCard {...project} />
      </div>
    </div>
  );
};

// --- Project Card Component ---
// Displays the detailed information for a project
const ProjectCard = ({
  title,
  subtitle,
  techTags,
  description,
  altText,
  projectUrl,
  projectScreenshotUrl,
}: ProjectEntry) => {
  const finalScreenshotUrl =
    projectScreenshotUrl || "https://placehold.co/600x450/333333/FFFFFF?text=Image+Not+Available";
  const finalAltText = altText || "Placeholder image for project";

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden transition-shadow hover:shadow-lg hover:shadow-cyan-500/10">
      <div className="relative w-full pt-[60%] bg-gray-800">
        <Image
          src={finalScreenshotUrl}
          alt={finalAltText}
          layout="fill"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x450/333333/FFFFFF?text=Image+Load+Error";
          }}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
        <p className="text-md text-gray-400 mb-4">{subtitle}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {techTags.map((tag) => (
            <span key={tag} className="bg-gray-800 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default TimelinePage;