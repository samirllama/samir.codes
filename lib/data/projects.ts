// lib/data/projects.ts
// The "side quests" tier of the merged Selected work section: real side
// projects only (the seeded template entries died with the old Projects
// section; Atlas Relocations was dropped as off-message in the restructure).

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
