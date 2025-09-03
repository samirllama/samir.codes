"use client";

import { useEffect } from "react";
import { Animations } from "@/lib/animations";
import styles from "./Projects.module.css";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution built with Next.js, featuring real-time inventory, secure payments, and admin dashboard.",
      tech: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
      link: "https://github.com/johndoe/ecommerce",
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
          A showcase of recent work that demonstrates my passion for creating
          impactful digital experiences.
        </p>

        <div className={`projects-grid ${styles.projectsGrid}`}>
          {projects.map((project) => (
            <div
              key={project.title}
              className={`project-card ${styles.projectCard}`}
            >
              <div className={styles.projectContent}>
                <h3>{project.title}</h3>
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
