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
        "A full-stack e-commerce solution built with Next.js, featuring real-time inventory, secure payments, and admin dashboard.",
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
      title: "E-Commerce Platform",
      description:
        " high-performance website built with Next.js 14 for Atlas International Relocations, a premier relocation and logistics company.",
      tech: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
      link: "https://github.com/samirllama/atlas-relocations-nepal",
      demo: "https://demo.ecommerce.johndoe.dev",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "https://github.com/johndoe/taskmanager",
      demo: "https://tasks.johndoe.dev",
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
