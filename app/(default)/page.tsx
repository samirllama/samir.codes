// app/page.tsx

import Hero from "@/components/Hero";
import TechStack from "@/components/tech-stack";
import ProjectStack from "@/components/project-stack";

import {
  myProjects,
  languages,
  frameworksAndLibraries,
  databasesAndCaching,
  cloudAndDevOps,
  developerTools,
} from "@/lib/data/port-data";
import type { SkillCategory } from "@/types";

const skillCategories: SkillCategory[] = [
  { title: "Languages", skills: languages },
  { title: "Frameworks & Libraries", skills: frameworksAndLibraries },
  { title: "Database", skills: databasesAndCaching },
  { title: "Cloud & DevOps", skills: cloudAndDevOps },
  { title: "Developer Tools", skills: developerTools },
];

export default function Home() {
  return (
    <>
      <article>
        <Hero />

        <div className="h-[200vh] bg-blue-100 flex items-center justify-center text-3xl text-gray-600">
          Scroll further down!
        </div>
        <div className="h-[100vh] bg-green-100 flex items-center justify-center text-3xl text-gray-600">
          End of demo.
        </div>

        <section className="h-screen flex items-center justify-start">
          <div
            className="px-[calc(118/16*1rem)] accelerate"
            style={{ opacity: 1, willChange: "opacity" }}
          >
            <h1 className="mb-8 text-[max(5rem,min(6.5rem,6.5vw))] leading-[1] bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full transform-gpu text-argon-primary font-mona-argon ghost2 animate-ghostpulse2 selection:bg-argon-dark self-end text-right right-0 glowtext">
              <div className="transform-gpu" style={{ transform: "none" }}>
                <div data-text="Code.Create.Catalyze" className="glowtext">
                  Code.Create.Catalyze
                </div>
              </div>
            </h1>
          </div>
        </section>

        {/* === Professional Summary Section === */}
        <ProjectStack projects={myProjects} />
        <TechStack skillCategories={skillCategories} />
      </article>
    </>
  );
}
