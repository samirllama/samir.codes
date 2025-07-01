import TechStack from "@/components/tech-stack";
import CreativeCanvas from "@/components/CreativeCanvas";
import WorkExperienceTimeline from "@/components/WorkExperienceTimeline";
import { myProjects, skillCategories } from "@/lib/data/port-data";
import AnimatedLetterText from "@/components/AnimatedLetterText";

export default function HomePage() {
  return (
    <article>
      <section className="h-[96vh] flex items-center justify-start">
        <div className="accelerate">
          <h1 className="hero-title mb-8 text-[max(5rem,min(6.5rem,6.5vw))] font-mono tracking-tighter bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full text-right">
            <div
              data-gsap-target="hero-title-wrapper"
              className="transform-gpu"
            >
              <AnimatedLetterText text="Code.Create.Catalyze" />
            </div>
          </h1>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <CreativeCanvas text="Art is the expression of the soul." />
      </div>
      <WorkExperienceTimeline />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
