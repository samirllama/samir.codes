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
        <h2 className="font-mono uppercase tracking-tight leading-none font-mono mb-3 lg:mb-3 pb-0">
          My work/projects
        </h2>

        <ul className="border-t border-accent-secondary bouncy-hover">
          {projects.map((project) => {
            return (
              <li key={project.id} className="block relative font-mono">
                <a
                  href={project.link}
                  target="_blank"
                  className="uppercase border-b border-accent-secondary w-full py-2 lg:py-[15px] flex items-end relative group transition-all ease-[cubic-bezier(0.83,0,0.17,1)] duration-[400ms] lg:pl-0 a11y-focus"
                  aria-label={`View Project: ${project.name}`}
                >
                  <span className="block overflow-hidden">
                    <span
                      className={cn([
                        "tracking-tight text-[clamp(30px,0.92rem+4.4vw,100px)]",
                        "block relative z-[1]",
                        "transition-opacity ease-[cubic-bezier(0.83,0,0.17,1)] duration-[400ms] lg:opacity-100",
                        "leading-[0.95]",
                      ])}
                    >
                      <span className="block">
                        <span className="block ms-text-adjust">
                          {project.name}
                        </span>
                      </span>
                    </span>
                  </span>

                  <span className="ml-auto text-right font-mono text-[10px] tracking-tight leading-none hidden lg:block relative overflow-hidden z-[1] transition-opacity ease-[cubic-bezier(0.83,0,0.17,1)] duration-[400ms] lg:opacity-100">
                    <span className="block transform-none">View Project</span>
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
