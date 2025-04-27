// components/project-stack.tsx

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
          Some Of My Projects
        </h2>

        {/* The list of projects */}
        <ul className="border-t bouncy-hover">
          {projects.map((project) => (
            <li key={project.id} className="block relative">
              <a
                href={project.link}
                className="uppercase border-b border-text-default w-full py-2 lg:py-[15px] flex items-end relative group transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:pl-0 a11y-focus"
                aria-label={`View Project: ${project.name}`}
              >
                <span className="block overflow-hidden">
                  <span className="leading-[0.95] block text-mousse-terracotta text-[clamp(30px,0.92rem+4.4vw,100px)] font-display tracking-tight relative z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                    <span className="block">
                      <span className="block ms-text-adjust">
                        {project.name}
                      </span>
                    </span>
                  </span>
                </span>

                {/* "View Project" text (hidden on small screens) */}
                <span className="ml-auto text-right font-mono text-[10px] tracking-tight leading-none hidden lg:block relative overflow-hidden z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                  <span
                    className="block"
                    style={{ transform: "translateY(0%) translateZ(0px)" }}
                  >
                    View Project
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectStack;
