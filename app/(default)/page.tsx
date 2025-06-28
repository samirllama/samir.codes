import TechStack from "@/components/tech-stack";
import ProjectStack from "@/components/project-stack";
import { myProjects, skillCategories } from "@/lib/data/port-data";
import AnimatedHeroText from "@/components/AnimatedHeroText";

export default function HomePage() {
  return (
    <article>
      <section className="h-[96vh] flex items-center justify-start">
        <div className="accelerate">
          <h1 className="hero-title mb-8 text-[max(5rem,min(6.5rem,6.5vw))] font-mono tracking-tighter bg-opacity-0 py-3 lg:py-4 xl:py-5 whitespace-nowrap relative min-w-full self-end text-right right-0">
            <div
              data-gsap-target="hero-title-wrapper"
              className="transform-gpu"
            >
              <AnimatedHeroText text="Code.Create.Catalyze" />
            </div>
          </h1>
        </div>
      </section>
      <ProjectStack projects={myProjects} />
      <TechStack skillCategories={skillCategories} />
    </article>
  );
}
