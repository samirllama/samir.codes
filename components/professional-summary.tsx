// components/ProfessionalSummary.tsx
import React from "react";

interface JobExperience {
  company: string;
  startYear: number | string;
  endYear?: number | string;
  title: string;
}

interface ProfessionalSummaryProps {
  experiences: JobExperience[];
}

const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({
  experiences,
}) => {
  return (
    <section className="pb-[20vw] lg:pb-[12.5vw]">
      <h2 className="font-mono uppercase tracking-tight leading-[1] text-[10px] mb-5 pb-0 relative overflow-hidden">
        <span
          className="block"
          style={{ transform: "translateY(0%) translateZ(0px)" }}
        >
          An overview of my work
        </span>
      </h2>
      <ul className="bouncy-hover uppercase border-t border-accent-secondary">
        {experiences.map((job, index) => (
          <li
            key={job.company}
            className="block"
            style={{ "--sibling-index": index + 1 } as React.CSSProperties}
          >
            <span className="border-b border-accent-secondary w-full py-2 lg:py-1 block grid grid-cols-[17ch_auto] items-end group transition-all ease-[cubic-bezier(0.83,0,0.17,1)] duration-[400ms] lg:pl-0 a11y-focus">
              {/* Date Range */}
              <span className="block italic text-step-0 tracking-normal leading-none mr-2 lg:mr-3 translate-y-[2px] relative overflow-hidden z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                <span className="font-bold font-mona-argon">
                  {job.startYear} - {job.endYear || "Present"}
                </span>
              </span>

              {/* Company Name */}
              <span className="block flex items-end relative group transition-all ease-[cubic-bezier(0.83,0,0.17,1)] font-sans mb-1 lg:mb-0 relative overflow-hidden">
                <strong
                  className="leading-[1.275] block text-[clamp(18px,0.92rem+1.15vw,34px)]"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  {job.company}
                </strong>

                {/* Title */}
                <span className="capitalize block font-bold font-mona-argon text-[clamp(14px,0.7rem+0.65vw,25px)] tracking-normal leading-none pl-2 pr-1 translate-y-[-45%] md:translate-y-[-30%] lg:translate-y-[-32%]">
                  — {job.title}
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfessionalSummary;
