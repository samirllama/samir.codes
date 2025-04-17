// app/page.tsx

import Hero from "@/components/hero/Hero";
import Features from "@/components/feature/feature";
import ProjectsCarousel from "@/components/projects/projects";
import Glitchy from "../../components/Glitchy";

export default function Home() {
  return (
    <>
      <Glitchy />
      <Hero />
      {/* <TypingEffect
        items={myHobbies}
        interval={4000}
        paragraphClassName="text-3xl md:text-4xl font-light mt-4 text-center"
      /> */}
      <Features />
      <ProjectsCarousel />
    </>
  );
}
