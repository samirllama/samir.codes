// app/page.tsx

import ProjectStack from "@/components/project-stack";
import HeroSection from "../../components/HeroSection";
import FlipText from "../../components/flip-text";
import ProfessionalSummary from "../../components/professional-summary";
import TechStack from "../../components/tech-stack";

const myProjects = [
  { id: 1, name: "British Petroleum", link: "/projects/wells-fargo" },
  { id: 2, name: "Wells Fargo", link: "/projects/wells-fargo" },
  { id: 3, name: "Dealer Inspire", link: "/projects/dealer-inspire" },
  { id: 4, name: "Expedia", link: "/projects/expedia" },
  { id: 5, name: "Domino's", link: "/projects/dominos" },
];

interface Skill {
  name: string;
  url: string;
  animatedGradientUnderline?: boolean;
}

const frontendSkills: Skill[] = [
  { name: "React", url: "https://react.dev/", animatedGradientUnderline: true },
  {
    name: "NextJs",
    url: "https://nextjs.org/",
    animatedGradientUnderline: true,
  },
  {
    name: "Tailwind",
    url: "https://tailwindcss.com/",
    animatedGradientUnderline: true,
  },
  {
    name: "Framer Motion",
    url: "https://www.framer.com/motion/",
    animatedGradientUnderline: true,
  },
  {
    name: "Lenis Scroll",
    url: "https://lenis.studiofreight.com/",
    animatedGradientUnderline: true,
  },
];

const backendSkills: Skill[] = [
  {
    name: "Sanity CMS",
    url: "https://www.sanity.io/",
    animatedGradientUnderline: true,
  },
  {
    name: "Vercel",
    url: "https://vercel.com/",
    animatedGradientUnderline: true,
  },
  {
    name: "Github",
    url: "https://github.com/samirllama/",
    animatedGradientUnderline: true,
  },
  {
    name: "Storefront API",
    url: "https://shopify.dev/docs/api/storefront",
    animatedGradientUnderline: true,
  },
];

export default function Home() {
  const jobExperiences = [
    {
      company: "British Petroleum",
      startYear: 2021,
      title: "Senior Software Engineer",
    },
    {
      company: "Wells Fargo",
      startYear: 2020,
      endYear: 2021,
      title: "Senior Software Engineer",
    },
    {
      company: "Dealer Inspire",
      startYear: 2019,
      endYear: 2020,
      title: "Software Engineer",
    },
  ];

  return (
    <article>
      <HeroSection />
      <FlipText />
      <ProjectStack projects={myProjects} />

      {/* === Professional Summary Section === */}

      <ProfessionalSummary experiences={jobExperiences} />
      <TechStack
        backendSkills={backendSkills}
        frontendSkills={frontendSkills}
      />
    </article>
  );
}
