// app/page.tsx

import ProjectStack from "@/components/project-stack";
import HeroSection from "@/components/HeroSection";
import ProfessionalSummary from "@/components/professional-summary";
import TechStack from "@/components/tech-stack";
import FanningList from "@/components/fanning-list";
import TypefaceShowcase from "@/components/typeface-section";

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
  // This grouping logic is fine here as it relates to page composition
  const skillCategories: SkillCategory[] = [
    { title: "Languages", skills: languages },
    { title: "Frameworks & Libraries", skills: frameworksAndLibraries },
    { title: "Databases & Caching", skills: databasesAndCaching },
    { title: "Cloud & DevOps", skills: cloudAndDevOps },
    { title: "Developer Tools", skills: developerTools },
  ];

  return (
    <article>
      <HeroSection />

      <ProjectStack projects={myProjects} />

      <section className="pb-[20vw] lg:pb-[12.5vw]">Portfolio</section>

      {/* === Professional Summary Section === */}
      <ProfessionalSummary experiences={jobExperiences} />

      <FanningList experiences={jobExperiences} />
      <TypefaceShowcase />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
