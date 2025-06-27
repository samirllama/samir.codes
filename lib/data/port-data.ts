// lib/data.ts
import type { Project, Experience, SkillCategory } from '@/types';

export const myProjects: Project[] = [
    { id: 1, name: "British Petroleum", link: "https://www.bp.com/" },
    { id: 2, name: "Wells Fargo", link: "https://www.wellsfargo.com/" },
    { id: 3, name: "Dealer Inspire", link: "https://www.dealerinspire.com/" },
    { id: 4, name: "Expedia", link: "https://www.expedia.com/" },
    { id: 5, name: "Domino's", link: "https://www.dominos.com/" },
];

export const jobExperiences: Experience[] = [
    { company: "British Petroleum", startYear: 2021, title: "Senior Software Engineer" },
    { company: "Wells Fargo", startYear: 2020, endYear: 2021, title: "Senior Software Engineer" },
    { company: "Dealer Inspire", startYear: 2019, endYear: 2020, title: "Software Engineer" },
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
