"use client";

import { useEffect } from "react";
import { Animations } from "@/lib/animations";
import styles from "./Projects.module.css";

const Projects = () => {
  const projects = [
    {
      title: "Real-Time Stock Dashboard",
      description:
        "A high-performance stock dashboard for visualizing historical and live market data.",
      tech: [
        "TypeScript",
        "React",
        "Vite",
        "PostgreSQL",
        "Polygon.io",
        "Redis",
      ],
      link: "https://github.com/samirllama/quasar",
    },
    {
      title: "Atlas Relocations",
      description:
        "A marketing website built with Next.js for Atlas International Relocations, a premier relocation and logistics company.",
      tech: [
        "Next.js",
        "TypeScript",
        "Contentful",
        "PostgreSQL",
        "Vercel",
        "Tailwind CSS",
        "Framer Motion",
      ],
      link: "https://github.com/samirllama/atlas-relocations-nepal",
      demo: "https://atlasrelocations.com/",
    },
    {
      title: "Bazaar, E-Commerce Platform",
      description:
        "A full-stack e-commerce demo built with GraphQL + React, featuring real-time inventory with authentication, database persistence, and a seller flow with a multi-step form.",
      tech: [
        "React",
        "Vite",
        "Typescript",
        "Apollo Client",
        "JWT",
        "Node.js",
        "Turso (SQLite)",
        "Apollo Server",
        "Redis",
      ],
      link: "https://github.com/samirllama/bazaar",
    },
    {
      title: "Claude-like CLI Tool",
      description:
        "Python-based command-line tool that demonstrates how an LLM can be used to reason about, plan, and execute a coding task by calling a set of predefined functions.",
      tech: ["Python", "Google Genai"],
      link: "https://github.com/samirllama/aiagent",
    },
    {
      title: "Weather Analytics Dashboard",
      description:
        "Interactive weather dashboard with historical data visualization, forecasting, and location-based insights.",
      tech: ["Vue.js", "D3.js", "Python", "FastAPI"],
      link: "https://github.com/johndoe/weather-dashboard",
      demo: "https://weather.johndoe.dev",
    },
  ];

  useEffect(() => {
    Animations.initScrollAnimations();
  }, []);

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <h2>Featured Projects</h2>
        <p className={styles.subtitle}>
          A showcase of some of my recent work projects.
        </p>

        <div className={`projects-grid ${styles.projectsGrid}`}>
          {projects.map((project) => (
            <div
              key={project.title}
              className={`project-card ${styles.projectCard}`}
            >
              <div className={styles.projectContent}>
                <h4>{project.title}</h4>
                <p>{project.description}</p>

                <div className={styles.techStack}>
                  {project.tech.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.projectLinks}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
