import Image from "next/image";
import { ProjectEntry } from "@/types";


const ProjectCard = ({
  title,
  subtitle,
  techTags,
  description,
  altText,
  projectUrl,
  projectScreenshotUrl,
}: ProjectEntry) => {
  const finalScreenshotUrl =
    projectScreenshotUrl ||
    
  const finalAltText = altText || "Placeholder image for project";

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20">
      <div className="relative w-full pt-[60%] bg-gray-800">
        <Image
          src={finalScreenshotUrl}
          alt={finalAltText}
          layout="fill"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            
          }}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
        <p className="text-md text-gray-400 mb-4">{subtitle}</p>
        <p className="text-gray-300 leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-800 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
