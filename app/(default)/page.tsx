// app/page.tsx

import Hero from "@/components/Hero";
import Features from "@/components/feature";
import ProjectsCarousel from "@/components/projects";
import Glitchy from "@/components/Glitchy";
import HeroSection from "../../components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Hero />
      <ProjectsCarousel />

      <Features />
    </>
  );
}
