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
          Professional Summary
        </span>
      </h2>
      <ul className="bouncy-hover uppercase border-t border-white/30">
        {experiences.map((job) => (
          <li key={job.company} className="block">
            <span className="border-b border-white/30 w-full py-2 lg:py-1 block lg:flex lg:items-end">
              {/* Company Name */}
              <span className="leading-[1.275] block text-[clamp(18px,0.92rem+1.15vw,34px)] font-display tracking-tight mb-1 lg:mb-0 relative overflow-hidden">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="block ms-text-adjust">{job.company}</span>
                </span>
              </span>

              {/* Dates & Title */}
              <span className="ml-auto leading-[1.275] font-serif lg:font-display block text-xl lg:text-[clamp(15px,0.92rem+1.15vw,34px)] tracking-tight relative overflow-hidden">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="flex items-end">
                    {/* Date Range */}
                    <span className="block">
                      <span className="block ms-text-adjust">
                        {job.startYear} - {job.endYear || "Present"}
                      </span>
                    </span>
                    {/* Job Title */}
                    <span className="capitalize block font-serif italic text-[clamp(14px,0.7rem+0.65vw,25px)] tracking-normal leading-none pl-2 pr-1 translate-y-[-45%] md:translate-y-[-30%] lg:translate-y-[-32%]">
                      ({job.title})
                    </span>
                  </span>
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
