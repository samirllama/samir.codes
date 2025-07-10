import Image from "next/image";
import { ExperienceEntry } from "@/types";

const TimelineRightContentCard = ({ entry }: { entry: ExperienceEntry }) => {
  return (
    <div className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20 flex flex-col md:flex-row shadow-lg rounded-lg">
      {entry.projectScreenshotUrl && (
        <div className="relative w-full md:w-1/2 pt-[60%] md:pt-0 md:h-auto flex-shrink-0 shadow-md">
          <Image
            src={entry.projectScreenshotUrl}
            alt={`Screenshot of ${entry.company}`}
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 769px) and (max-width: 1200px) 50vw, 50vw"
            className="absolute inset-0 w-full h-full object-contain rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
      )}
      <div className="p-6 flex flex-col justify-between w-full md:w-1/2 bg-timeline-bg">
        <div>
          <h2 className="text-2xl font-bold text-timeline-text mb-2">
            {entry.company}
          </h2>
          <p className="text-base text-timeline-text leading-relaxed mb-4">
            {entry.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {entry.techTags.map((tag) => (
              <span
                key={tag}
                className="border-timeline-border text-timeline-text text-sm font-medium px-3 py-1 rounded-md border border-timeline-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {entry.projectUrl && (
          <a
            href={entry.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 relative group inline-flex items-center text-timeline-text transition-colors duration-300"
          >
            View Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1 w-4 h-4 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-timeline-accent transition-all duration-300 ease-out-quad group-hover:w-full"></span>
          </a>
        )}
      </div>
    </div>
  );
};

export default TimelineRightContentCard;
