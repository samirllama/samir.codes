// app/page.tsx

import Features from "@/components/feature";
import ProjectsCarousel from "@/components/projects";
import HeroSection from "../../components/HeroSection";
import HeroSectionTwo from "../../components/hero-two/SplitFlapCharacter";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <HeroSectionTwo /> */}
      <ProjectsCarousel />
    </>
  );
}
