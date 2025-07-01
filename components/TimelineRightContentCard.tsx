import Image from "next/image";
import { ExperienceEntry } from "@/types";

const TimelineRightContentCard = ({ entry }: { entry: ExperienceEntry }) => {
  

  return (
    <div className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20 flex flex-col md:flex-row bg-gray-900 rounded-lg">
      {entry.projectScreenshotUrl && (
        <div className="relative w-full md:w-1/2 pt-[60%] md:pt-0 md:h-auto bg-gray-800 flex-shrink-0">
          <Image
            src={entry.projectScreenshotUrl}
            alt={`Screenshot of ${entry.company}`}
            fill
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
      )}
      <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{entry.company}</h2>
          <p className="text-gray-300 leading-relaxed mb-4">{entry.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {entry.techTags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full border border-gray-700"
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
            className="mt-4 inline-block bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default TimelineRightContentCard;
