// lib/data/projects.ts
// The compact "more projects" grid: real side projects only (the seeded
// template entries died with the old Projects section).

export interface SideProject {
  title: string;
  description: string;
  tech: string[];
  repoUrl: string;
  demoUrl?: string;
}

export const sideProjects: SideProject[] = [
  {
    title: "Real-time stock dashboard",
    description:
      "High-performance dashboard for visualizing historical and live market data.",
    tech: ["TypeScript", "React", "Vite", "PostgreSQL", "Polygon.io", "Redis"],
    repoUrl: "https://github.com/samirllama/quasar",
  },
  {
    title: "Atlas Relocations",
    description:
      "Marketing site for a premier relocation and logistics company, built on Next.js and Contentful.",
    tech: ["Next.js", "TypeScript", "Contentful", "PostgreSQL", "Tailwind CSS"],
    repoUrl: "https://github.com/samirllama/atlas-relocations-nepal",
    demoUrl: "https://atlasrelocations.com/",
  },
  {
    title: "Bazaar, e-commerce platform",
    description:
      "Full-stack GraphQL + React e-commerce demo with real-time inventory, auth, and a multi-step seller flow.",
    tech: ["React", "Apollo", "JWT", "Node.js", "Turso (SQLite)", "Redis"],
    repoUrl: "https://github.com/samirllama/bazaar",
  },
  {
    title: "Agentic coding CLI",
    description:
      "Python command-line agent that plans and executes coding tasks by reasoning over a set of predefined functions.",
    tech: ["Python", "Google GenAI"],
    repoUrl: "https://github.com/samirllama/aiagent",
  },
];
