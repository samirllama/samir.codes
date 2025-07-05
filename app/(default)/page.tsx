import TechStack from "@/components/tech-stack";
import CreativeCanvas from "@/components/CreativeCanvas";
import WorkExperienceTimeline from "@/components/WorkExperienceTimeline";
import { skillCategories } from "@/lib/data/port-data";
import TestAnimatedText from "@/components/TestAnimatedText";
import Footer from "@/components/ui/footer";
import ParallaxSection from "@/components/ui/ParallaxSection";

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
              <TestAnimatedText text="Code.Create.Catalyze" />
            </div>
          </h1>
        </div>
      </section>

      <WorkExperienceTimeline />
      <TechStack skillCategories={skillCategories} />

      <ParallaxSection>
        <div className="creative-canvas-section flex flex-col items-center justify-center min-h-screen text-white p-4 relative z-10">
          <CreativeCanvas text="Art is the expression of the soul." />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-0 w-full">
          <Footer />
        </div>
      </ParallaxSection>
    </article>
  );
}
