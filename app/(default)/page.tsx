import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import WorkTimeline from "@/components/work-timeline/WorkTimeline";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <section className={styles.section} id="experience">
        <WorkTimeline />
      </section>
      <Projects />
    </>
  );
}
