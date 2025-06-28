import Image from "next/image";
import { ExperienceEntry } from "@/types";

const TimelineRightContentCard = ({ entry }: { entry: ExperienceEntry }) => {
  const finalScreenshotUrl = entry.projectScreenshotUrl || "/placeholder.svg"; // Using local placeholder image

  return (
    <div className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20">
      <div className="flex items-center gap-4 p-6">
        {entry.companyLogoUrl && (
          <div className="flex-shrink-0">
            <Image
              src={entry.companyLogoUrl}
              alt={`${entry.company} logo`}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{entry.company}</h2>
          <p className="text-gray-300 leading-relaxed">{entry.description}</p>
        </div>
      </div>
      {entry.projectScreenshotUrl && (
        <div className="relative w-full pt-[60%] bg-gray-800">
          <Image
            src={finalScreenshotUrl}
            alt={`Screenshot of ${entry.company}`}
            layout="fill"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg"; // Fallback to local placeholder
            }}
          />
        </div>
      )}
      <div className="p-6">
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
