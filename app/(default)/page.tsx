import TechStack from "@/components/tech-stack";
import WorkExperienceTimeline from "@/components/WorkExperienceTimeline";
import { skillCategories } from "@/lib/data/work-exp";

/**
 *Header: “Welcome to My Lab of Rants & Reads”
Sub‑header:
CTAs:
Latest Rant →
Book Summaries →
 */

export default function HomePage() {
  return (
    <article>
      {/* INTRO */}
      <section id="about" className="py-fluid-xl my-fluid-xl">
        <p className="text-fluid-h3 mt-fluid-xl">Fullstack Developer</p>
        <h1 className="text-fluid-h1 my-fluid-xl">
          I build high-performance apps that scale
          <br />
          driven by a passion for fast, accessible web experiences.
        </h1>
      </section>

      <WorkExperienceTimeline />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
