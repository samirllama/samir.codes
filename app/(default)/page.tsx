import TechStack from "@/components/tech-stack";
import WorkExperienceTimeline from "@/components/WorkExperienceTimeline";
import { skillCategories } from "@/lib/data/work-exp";
import ProjectStack from "@/components/project-stack";

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
      <section
        id="experience"
        className="py-fluid-xl px-fluid-xl mb-fluid-xl border border-2"
      >
        <h1 className="text-fluid-h1">Hello, I&apos Samir</h1>
        <p className="text-fluid-h4 mt-fluid-sm">
          Your host, and the one responsible for just about everything on this
          site. This is Samir Codes, the personal blog of a curios coder.
          I&apos;m currently building high‑performance web apps that scale
          supply chains @BP.
        </p>
        <p className="text-fluid-body-1 mt-fluid-sm">
          Your host, and the one responsible for just about everything on this
          site. This is Samir Codes, the personal blog of a curios coder.
          I&apos;m currently building high‑performance web apps that scale
          supply chains @BP.
        </p>
        <h2 className="text-fluid-h2 mt-fluid-lg">Experience</h2>
        <ul className="space-y-12">
          <li>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <h3 className="text-fluid-h3">
                Senior Software Engineer ·
                <span className="text-muted-foreground">BP</span>
              </h3>

              <time className="text-fluid-meta mt-fluid-sm">
                2023 – Present
              </time>
            </div>
            <p className="text-fluid-body-libre mt-fluid-sm">
              Font-libre I build accessible, scalable web apps at BP. Previously
              at Wells Fargo.
            </p>
            <p className="text-fluid-body mt-fluid-sm">
              Leading frontend architecture for mission-critical supply chain
              platforms. Focused on accessibility, performance, and cross-team
              collaboration using React, TypeScript, and GSAP.
            </p>
            <span className="text-fluid-meta block mt-fluid-sm">
              Updated July 2025
            </span>
          </li>

          <li>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <h3 className="text-fluid-h3">
                Lead Frontend Engineer ·
                <span className="text-muted-foreground">Wells Fargo</span>
              </h3>

              <time className="text-fluid-meta mt-fluid-sm">2021 – 2023</time>
            </div>
            <p className="text-fluid-body-libre mt-fluid-sm">
              Delivered UI components for internal banking tools. Integrated
              analytics, A/B testing, and improved accessibility scores by 30%
              across critical journeys.
            </p>
          </li>
        </ul>
      </section>

      {/* Section 2: Timeline */}
      <section
        id="work-experience"
        className="lg:py-20 h-[1024px] border border-2 py-fluid-xl px-fluid-xl"
      >
        <h2 className="text-fluid-h2">Work Experience Timeline</h2>
      </section>

      {/* Section 3: Tech Stack */}
      <section id="tech-stack" className="h-[1024px]  py-fluid-xl px-fluid-xl">
        <h2 className="text-fluid-h2">Tech Stack</h2>
      </section>

      <WorkExperienceTimeline />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
