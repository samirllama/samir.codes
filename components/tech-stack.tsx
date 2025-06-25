import { cn } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/types";

interface SkillLinkProps {
  skill: Skill;
}

const SkillLink: React.FC<{ skill: Skill }> = ({ skill }: SkillLinkProps) => {
  const liClasses =
    "leading-[1.1] block text-2xl tracking-tight relative mb-[3px]";

  if (skill.url) {
    return (
      <li className={liClasses}>
        <a
          href={skill.url}
          target="_blank"
          rel="noreferrer noopener"
          className="relative group a11y-focus overflow-hidden inline-block" // Group class for hover
        >
          {skill.name}

          {/* --- ALWAYS Apply Animated Gradient Underline for Links --- */}
          <span
            className={cn(
              "absolute bottom-0 left-0 w-full h-[2px]", // Height of the underline
              "opacity-0 transition-opacity duration-300 ease-out", // Fade in/out
              "group-hover:opacity-100", // Visible on hover
              // Gradient Colors
              "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
              "bg-[length:200%_auto]", // Background size for animation
              "group-hover:animate-slideGradient" // Apply animation only on hover
            )}
          ></span>
          {/* --- End Underline --- */}
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

interface TechStackProps {
  skillCategories: SkillCategory[];
}

export default function TechStack({ skillCategories }: TechStackProps) {
  return (
    <section
      className="grid grid-cols-12 pb-[20vw] lg:pb-[12.5vw] px-[calc(118/16*1rem)]"
      id="tools"
    >
      <div className="col-span-12 lg:col-span-4 mb-2 lg:mb-0">
        <h2 className="font-mono uppercase tracking-tight leading-none mb-3 pb-0 leading-[1] block text-[clamp(30px,0.92rem+2vw,45px)] font-display uppercase">
          Skills
        </h2>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <div className="max-w-[820px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {skillCategories?.map((category, index) => (
              <div
                className={cn(
                  "mb-8 lg:mb-12",
                  index < Math.ceil(skillCategories.length / 2)
                    ? "col-span-1"
                    : "col-span-1"
                )}
                key={category.title}
              >
                <span className="uppercase block font-mono tracking-tight leading-none text-[14px] mb-3 pb-0">
                  {category.title}
                </span>
                <ul className="bouncy-hover">
                  {category.skills.map((skill: Skill) => (
                    <SkillLink key={skill.name} skill={skill} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
