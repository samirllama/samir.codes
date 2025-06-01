// components/project-stack.tsx
import { cn } from "@/lib/utils";

interface Project {
  id: string | number;
  name: string;
  link: string;
}

interface ProjectStackProps {
  projects: Project[];
}

const ProjectStack: React.FC<ProjectStackProps> = ({ projects }) => {
  return (
    <section>
      <div className="pb-[20vw] lg:pb-[12.5vw]">
        <h2 className="font-mono uppercase tracking-tight leading-none text-[10px] mb-3 lg:mb-3 pb-0">
          An overview of my work/projects
        </h2>

        {/* The list of projects */}
        <ul className="border-t border-accent-secondary bouncy-hover">
          {projects.map((project) => {
            return (
              <li key={project.id} className="block relative">
                <a
                  href={project.link}
                  target="_blank" // <-- Open in new tab
                  rel="noopener noreferrer" // <-- Security best practice for target="_blank"
                  className="uppercase border-b border-accent-secondary w-full py-2 lg:py-[15px] flex items-end relative group transition-all ease-[cubic-bezier(0.83,0,0.17,1)] duration-[400ms] lg:pl-0 a11y-focus"
                  aria-label={`View Project: ${project.name}`}
                >
                  <span className="block font-serif italic text-[clamp(16px,0.7rem+1.5vw,30px)] tracking-normal leading-none mr-2 lg:mr-3 translate-y-[2px] relative overflow-hidden z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                    2021 - Present
                  </span>
                  {/* Project Name Span */}
                  <span className="block overflow-hidden">
                    <span
                      className={cn([
                        "tracking-tight text-[clamp(30px,0.92rem+4.4vw,100px)]",
                        "block relative z-[1]",
                        "transition-opacity ease-[cubic-bezier(0.83,0,0.17,1)] duration-[400ms] lg:opacity-100",
                        "leading-[0.95]",
                      ])}
                      // style={{ lineHeight: 0.95 }}
                    >
                      <span className="block">
                        <span className="block ms-text-adjust">
                          {project.name}
                        </span>
                      </span>
                    </span>
                  </span>

                  {/* "View Project" text */}
                  <span className="ml-auto text-right font-mono text-[10px] tracking-tight leading-none hidden lg:block relative overflow-hidden z-[1] transition-opacity ease-[cubic-bezier(0.83,0,0.17,1)] duration-[400ms] lg:opacity-100">
                    <span
                      className="block"
                      style={{ transform: "translateY(0%) translateZ(0px)" }}
                    >
                      View Project
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ProjectStack;
