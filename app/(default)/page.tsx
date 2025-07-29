import TechStack from "@/components/tech-stack";
import WorkExperienceTimeline from "@/components/WorkExperienceTimeline";
import { skillCategories } from "@/lib/data/work-exp";
import TestAnimatedText from "@/components/TestAnimatedText";

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
      <section id="experience" className="py-fluid-xl px-fluid-xl">
        <h1 className="text-fluid-h1">Hello, I'm Baki Lama</h1>
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
              <h3 className="text-h3 font-semibold">
                Frontend Engineer ·{" "}
                <span className="text-muted-foreground">Wells Fargo</span>
              </h3>
              <time className="text-span text-sm text-muted-foreground mt-2 sm:mt-0">
                2021 – 2023
              </time>
            </div>
            <p className="text-p mt-4 text-muted-foreground">
              Delivered UI components for internal banking tools. Integrated
              analytics, A/B testing, and improved accessibility scores by 30%
              across critical journeys.
            </p>
          </li>
        </ul>
      </section>

      <section className="h-[80vh] flex items-center justify-start">
        <div className="relative z-10 flex flex-col justify-top items-start h-full px-8 lg:px-32">
          <p className="text-lg md:text-2xl">
            I’ve been building for the web since 2014. I dig fonts, music
            production, sci-fi stories, synth vibes, movies, exercise (swim,
            yoga, lift, walk), F1, tattoos, and summertime.
          </p>
          <p className="text-lg md:text-2xl">
            The personal blog of a curios coder. Currently a Software Engineer
            at BP, building high‑performance web apps that scale supply chains.
            Here, I unpack the latest books I’m devouring, vent about dev life,
            and pass on my top accessibility & performance tricks. I like making
            fun, interactive things with code. I also talk & write about those
            things.
          </p>
          <p className="text-lg md:text-2xl">
            I’m your host, Samir Lama, responsible for just about everything on
            this site. This is Samir Codes, where I’ve been ranting about
            software development and the Internet.
          </p>
          <div className="mtj-8 flex flex-col space-y-4">
            <a href="#projects" className="text-white text-xl hover:underline">
              Explore my projects →
            </a>
            <a href="#posts" className="text-white text-xl hover:underline">
              Read my latest posts →
            </a>
            <a href="#notes" className="text-white text-xl hover:underline">
              Check out my book notes →
            </a>
            <a href="#timeline" className="text-white text-xl hover:underline">
              View my full timeline →
            </a>
          </div>
        </div>
      </section>

      <WorkExperienceTimeline />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
