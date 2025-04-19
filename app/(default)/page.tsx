// app/page.tsx

import Hero from "@/components/Hero";
import Features from "@/components/feature";
import ProjectsCarousel from "@/components/projects";
import Glitchy from "@/components/Glitchy";

export default function Home() {
  return (
    <>
      <Glitchy />
      <Hero />
      <Features />
      <ProjectsCarousel />
    </>
  );
}
