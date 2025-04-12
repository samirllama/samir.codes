// app/page.tsx

import Hero from "@/components/hero/Hero";
import Features from "@/components/feature/feature";
import ProjectsCarousel from "@/components/projects/projects";
import Img04 from "@/public/assets/img-4.png";

export default function Home() {
  return (
    <>
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
