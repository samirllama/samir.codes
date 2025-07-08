import type { Project, SkillCategory } from '@/types';

export const projects: Project[] = [
  {
    "id": 1,
    "name": "British Petroleum",
    "link": "https://www.bp.com/",
    "projectScreenshotUrl": "https://jwdtwbbgwku6ttxc.public.blob.vercel-storage.com/bp-img.webp",
    "altText": "British Petroleum project screenshot",
    "subtitle": "A leading energy company project"
  },
  {
    "id": 2,
    "name": "Wells Fargo",
    "link": "https://www.wellsfargo.com/",
    "projectScreenshotUrl": "https://jwdtwbbgwku6ttxc.public.blob.vercel-storage.com/wells-img.webp",
    "altText": "Wells Fargo project screenshot",
    "subtitle": "A major financial services project"
  },
  {
    "id": 3,
    "name": "Dealer Inspire",
    "link": "https://www.dealerinspire.com/",
    "projectScreenshotUrl": "https://jwdtwbbgwku6ttxc.public.blob.vercel-storage.com/dealer-img.webp",
    "altText": "Dealer Inspire project screenshot",
    "subtitle": "Automotive digital retailing platform"
  },
  {
    "id": 4,
    "name": "Expedia",
    "link": "https://www.expedia.com/",
    "projectScreenshotUrl": "https://jwdtwbbgwku6ttxc.public.blob.vercel-storage.com/expedia-img.webp",
    "altText": "Expedia project screenshot",
    "subtitle": "Online travel shopping company project"
  },
  {
    "id": 5,
    "name": "Domino's",
    "link": "https://www.dominos.com/",
    "projectScreenshotUrl": "https://jwdtwbbgwku6ttxc.public.blob.vercel-storage.com/dom-img.webp",
    "altText": "Domino's project screenshot",
    "subtitle": "Pizza restaurant chain project"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", url: "https://www.typescriptlang.org/", },
      { name: "JavaScript (ES6+)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Python", url: "https://www.python.org/" },
      { name: "Go", url: "https://go.dev/" },
      { name: "SQL", url: "https://en.wikipedia.org/wiki/SQL" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React / React Native", url: "https://react.dev/", },
      { name: "Next.js", url: "https://nextjs.org/" },
      { name: "Node.js", url: "https://nodejs.org/" },
      { name: "Express.js", url: "https://expressjs.com/" },
      { name: "Django", url: "https://www.djangoproject.com/" },
      { name: "FastAPI", url: "https://fastapi.tiangolo.com/" },
      { name: "Redux", url: "https://redux.js.org/" },
      { name: "Ionic", url: "https://ionicframework.com/" },
    ],
  },
  {
    title: "Databases & Caching",
    skills: [
      { name: "PostgreSQL", url: "https://www.postgresql.org/", },
      { name: "MySQL", url: "https://www.mysql.com/" },
      { name: "MongoDB", url: "https://www.mongodb.com/" },
      { name: "Redis", url: "https://redis.io/" },
      { name: "DynamoDB", url: "https://aws.amazon.com/dynamodb/" },
      { name: "SQLite", url: "https://www.sqlite.org/index.html" },
    ],
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "Github", url: "https://github.com" },
      { name: "CircleCI", url: "https://circleci.com/" },
      { name: "DataDog", url: "https://www.datadoghq.com/" },
      { name: "Sentry", url: "https://sentry.io/" },
      { name: "Launchdarkly", url: "https://launchdarkly.com/" },
      { name: "Optimizely", url: "https://www.optimizely.com/" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", url: "https://aws.amazon.com/" },
      { name: "Azure", url: "https://azure.microsoft.com/" },
      { name: "Docker", url: "https://www.docker.com/" },
      { name: "Kubernetes", url: "https://kubernetes.io/", },
      { name: "GitHub Actions", url: "https://github.com/features/actions" },
      { name: "Jenkins", url: "https://www.jenkins.io/" },
      { name: "IaC (Terraform/CloudFormation)", url: "https://www.terraform.io/" },
      { name: "Convox", url: "https://convox.com/" },
    ],
  },
];
