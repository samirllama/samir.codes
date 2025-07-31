import { cn } from "@/lib/utils";
import type { Skill } from "@/types";

interface SkillLinkProps {
  skill: Skill;
}

const SkillLink: React.FC<SkillLinkProps> = ({ skill }) => {
  const liClasses =
    "leading-[1.1] block text-2xl tracking-tight relative mb-[3px]";

  const linkClasses = "relative group a11y-focus inline-block";

  if (skill.url) {
    return (
      <li className={liClasses}>
        <a
          href={skill.url}
          target="_blank"
          rel="noreferrer noopener"
          className={linkClasses}
        >
          {skill.name}
          <span
            className={cn(
              "absolute bottom-0 left-0 h-[2px] bg-white",
              "w-0 transition-all duration-300 ease-out",
              "group-hover:w-full",
              skill.animatedGradientUnderline && "opacity-0"
            )}
          ></span>
        </a>
      </li>
    );
  } else {
    return (
      <li className={liClasses}>
        <span>{skill.name}</span>
      </li>
    );
  }
};

import type { SkillCategory } from "@/types";

interface TechStackProps {
  skillCategories: SkillCategory[];
}

export default function TechStack({ skillCategories }: TechStackProps) {
  return (
    <section className="py-fluid-xl mt-fluid-xl" id="tech-stack">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="font-mono uppercase tracking-tight leading-none mb-8 text-center text-[clamp(30px,0.92rem+2vw,45px)] font-display">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mt-10">
          {skillCategories?.map((category) => (
            <div key={category.title} className="flex flex-col items-start">
              <h3 className="font-mono uppercase tracking-widest text-sm text-gray-400 mb-4 pb-0 border-b border-gray-700 pb-1">
                {category.title}
              </h3>
              <ul className="bouncy-hover">
                {category.skills.map((skill: Skill) => (
                  <SkillLink key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
