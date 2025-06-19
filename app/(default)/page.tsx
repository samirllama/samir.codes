// app/page.tsx

import { cn } from "@/lib/utils";
import ProjectStack from "@/components/project-stack";
import TechStack from "@/components/tech-stack";
import TypefaceShowcase from "@/components/typeface-section";
import ScrollSection from "@/components/ScrollSection";
import {
  myProjects,
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
    <>
      <article>
        <section className="h-screen flex items-center justify-left">
          <h1 className="ml-24 mb-20">Code.Create.Catalyze</h1>
        </section>
        <section className="h-screen flex flex-col items-center justify-center px-10">
          <figure className="quote">
            <blockquote
              className={cn(["text-h3", "font-sans font-light leading-normal"])}
            >
              LIFE IS NOT EASY FOR ANY OF US. BUT WHAT OF THAT? WE MUST HAVE
              PERSEVERANCE AND ABOVE ALL CONFIDENCE IN OURSELVES. WE MUST
              BELIEVE THAT WE ARE GIFTED FOR SOMETHING AND THAT THIS THING MUST
              BE ATTAINED.
            </blockquote>
            <figcaption className={cn("text-h3")}>
              &mdash; MARIE CURIE, <cite>Role models</cite>
            </figcaption>
          </figure>
        </section>

        {/* === Professional Summary Section === */}
        <ProjectStack projects={myProjects} />

        <TechStack skillCategories={skillCategories} />
        <TypefaceShowcase />
        <ScrollSection sectionId="lastSection" customBackgroundColor="black">
          <h1 style={{ color: "white" }}>This is the last content section.</h1>
          <p style={{ color: "lightgray" }}>
            It has a dark background and will transition to the white footer.
          </p>
        </ScrollSection>
      </article>
    </>
  );
}
