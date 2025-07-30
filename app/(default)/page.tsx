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
      <section id="about" className="py-fluid-xl px-fluid-xl mb-fluid-xl">
        <p className="text-fluid-body-lg mt-fluid-sm">
          This is Samir Codes, the personal blog of a curios coder. I&apos;m
          currently building high‑performance web apps that scale supply chains
          &nbsp;
          <a
            href="https://www.bp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 relative group inline-flex items-center text-timeline-text text-fluid-body transition-colors duration-300"
          >
            @BP.
          </a>
        </p>
      </section>

      <WorkExperienceTimeline />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
