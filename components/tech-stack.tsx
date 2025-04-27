import { FC } from "react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  url: string;
  animatedGradientUnderline?: boolean;
}

const Skills: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <li className="leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
      <a
        href={skill.url}
        target="_blank"
        rel="noreferrer noopener"
        className="relative group a11y-focus overflow-hidden inline-block"
      >
        {skill.name}

        {skill.animatedGradientUnderline && (
          <span
            className={cn(
              "absolute bottom-0 left-0 w-full h-[2px]", // Height of underline
              "opacity-0 transition-opacity duration-300 ease-out", // Fade in/out
              "group-hover:opacity-100", // Visible on hover
              // Gradient Colors (tweak)
              "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
              "bg-[length:200%_auto]", // Background size for animation
              "group-hover:animate-slideGradient" // animation on hover
            )}
          ></span>
        )}
      </a>
    </li>
  );
};

const TechStack: FC<{ backendSkills: Skill[]; frontendSkills: Skill[] }> = ({
  backendSkills,
  frontendSkills,
}) => {
  return (
    <section className="grid grid-cols-12 pb-[20vw] lg:pb-[12.5vw]" id="tools">
      <div className="col-span-12 lg:col-span-4 mb-2 lg:mb-0">
        <h2 className="font-mono uppercase tracking-tight leading-none text-[10px] mb-3 pb-0">
          Tools / Technologies
        </h2>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <div className="max-w-[820px]">
          <h2 className="leading-[1] block text-[clamp(30px,0.92rem+2vw,45px)] font-display tracking-tight mb-12 uppercase">
            Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mb-8 lg:mb-12 col-span-1">
              <span className="uppercase block font-mono tracking-tight leading-none text-[10px] mb-3 pb-0">
                Front-end Stack
              </span>

              <ul className="bouncy-hover">
                {frontendSkills.map((skill: Skill) => (
                  <Skills key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <span className="uppercase block font-mono tracking-tight leading-none text-[10px] mb-3 pb-0">
                Back-end Stack
              </span>

              <ul className="bouncy-hover">
                {/* Added bouncy-hover here */}
                {backendSkills.map((skill) => (
                  <Skills key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
