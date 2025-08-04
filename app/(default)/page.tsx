import TechStack from "@/components/tech-stack";
import WorkExperienceTimeline from "@/components/WorkExperienceTimeline";
import { skillCategories } from "@/lib/data/work-exp";

export default function HomePage() {
  return (
    <article>
      {/* INTRO */}
      <section id="about" className="py-fluid-xl my-fluid-xl flex flex-col">
        <p className="text-fluid-h3 mt-fluid-xl">Fullstack Developer</p>
        <h1 className="text-fluid-h1 my-fluid-xl">
          I design and develop high-performance apps that scale
        </h1>
      </section>

      <WorkExperienceTimeline />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
