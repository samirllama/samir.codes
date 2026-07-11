import { HeroSection } from "@/components/hero-pipeline/HeroSection";
import About from "@/components/about/About";
import WorkTimeline from "@/components/work-timeline/WorkTimeline";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { MoreProjects } from "@/components/more-projects/MoreProjects";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <section className={styles.section} id="experience">
        <WorkTimeline />
      </section>
      <CaseStudies />
      <MoreProjects />
    </>
  );
}
