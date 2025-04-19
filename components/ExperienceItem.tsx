// components/ExperienceItem.tsx
import React from 'react';
import { ExperienceItemData } from '@/lib/data/experience';
import { cn } from '@/lib/utils';

interface ExperienceItemProps {
  item: ExperienceItemData;
  isLast: boolean; // To control the bottom border
}

export default function ExperienceItem({ item, isLast }: ExperienceItemProps) {
  return (
    <article className="relative pl-8 md:pl-0 py-6 group"> {/* Add padding for marker space */}
      {/* Timeline Marker Dot */}
      <div className={cn(
        "absolute left-0 top-6", // Position relative to article padding
        "w-3 h-3 rounded-full ring-4",
        "bg-primary-500 ring-primary-500/30", // Light mode colors (adjust if needed)
        "dark:bg-primary-400 dark:ring-primary-400/30" // Dark mode colors
      )} aria-hidden="true"></div>

      <div className="md:flex">
        {/* Left Column: Date Range */}
        <div className="md:w-40 lg:w-48 shrink-0 md:pr-8 md:text-right">
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-1 md:mb-0">
            {item.dateRange}
          </p>
        </div>

        {/* Right Column: Content */}
        <div className={cn(
          "grow md:pl-8", // Add padding to align with marker
          !isLast && "pb-10 border-b border-[rgb(var(--border-subtle-rgb))]" // Conditional border
        )}>
          <h3 className="text-xl font-semibold text-[rgb(var(--foreground-rgb))] mb-1">
            {item.title}
          </h3>
          <p className="text-md font-medium text-gray-700 dark:text-slate-300 mb-2">
            {item.company} - <span className="text-gray-500 dark:text-slate-400">{item.location}</span>
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
            {item.description.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
