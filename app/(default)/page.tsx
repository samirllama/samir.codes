// app/page.tsx

import { cn } from "@/lib/utils";
import ProjectStack from "@/components/project-stack";
import HeroSection from "@/components/HeroSection";
import ProfessionalSummary from "@/components/professional-summary";
import TechStack from "@/components/tech-stack";
import TypefaceShowcase from "@/components/typeface-section";
import { ScrollObject } from "@/components/ScrollObject";
import {
  myProjects,
  jobExperiences,
  languages,
  frameworksAndLibraries,
  databasesAndCaching,
  cloudAndDevOps,
  developerTools,
} from "@/lib/data/port-data";
import type { SkillCategory } from "@/types";

export default function Home() {
  const skillCategories: SkillCategory[] = [
    { title: "Languages", skills: languages },
    { title: "Frameworks & Libraries", skills: frameworksAndLibraries },
    { title: "Databases & Caching", skills: databasesAndCaching },
    { title: "Cloud & DevOps", skills: cloudAndDevOps },
    { title: "Developer Tools", skills: developerTools },
  ];

  return (
    <article>
      <section className="h-screen flex items-center justify-left">
        <h1 className="ml-24 mb-20">Code.Create.Catalyze</h1>
      </section>
      <section className="h-screen flex flex-col items-center justify-center px-10">
        <figure className="quote">
          <blockquote
            className={cn(
              "font-sans",
              // var(--fontSize-h2) maps to var(--type-scale-step-4)
              "text-h3",
              "font-light", // font-weight: 300
              "leading-normal" // var(--lineHeight-normal)
            )}
          >
            LIFE IS NOT EASY FOR ANY OF US. BUT WHAT OF THAT? WE MUST HAVE
            PERSEVERANCE AND ABOVE ALL CONFIDENCE IN OURSELVES. WE MUST BELIEVE
            THAT WE ARE GIFTED FOR SOMETHING AND THAT THIS THING MUST BE
            ATTAINED.
          </blockquote>
          <figcaption
            className={cn(
              "font-cinzel",
              "text-h3",
              "font-light",
              "leading-tight" // var(--lineHeight-tight)
            )}
          >
            &mdash; MARIE CURIE, <cite>Role models</cite>
          </figcaption>
        </figure>
      </section>

      <HeroSection />

      <ProjectStack projects={myProjects} />

      {/* === Professional Summary Section === */}
      <ProfessionalSummary experiences={jobExperiences} />

      <TechStack skillCategories={skillCategories} />
      <TypefaceShowcase />
      <section className="h-screen flex items-center justify-center">
        <ScrollObject
          className="bg-blue-200 p-8 transform-custom tween-transform-1-3s-easeOut3"
          threshold={0.5}
        >
          <div className="anim-in-shift-y-0 anim-in-scale-x-1">
            <h2 className="text-4xl">Animated Section 1</h2>
            <p className="shift-y-neg-100">Content that animates in</p>
            <p className="scale-x-0">More animated content</p>
          </div>
        </ScrollObject>
      </section>
    </article>
  );
}
