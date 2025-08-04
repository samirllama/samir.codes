import TechStack from "@/components/tech-stack";
import WorkExperienceTimeline from "@/components/WorkExperienceTimeline";
import { skillCategories } from "@/lib/data/work-exp";
import ChartsShowcase from "@/components/charts-showcase";

export default function HomePage() {
  return (
    <article>
      {/* INTRO */}
      <ChartsShowcase />
      <section id="about" className="py-fluid-xl my-fluid-xl flex">
        <p className="text-fluid-h3 mt-fluid-xl">Fullstack Developer</p>
        <h2 className="text-fluid-h2 my-fluid-xl min-w-fit">
          I build high-performance apps that scale
          <br />
          driven by a passion for fast, accessible web experiences.
        </h2>
      </section>

      <WorkExperienceTimeline />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
