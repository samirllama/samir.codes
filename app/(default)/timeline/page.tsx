// app/(default)/timeline/page.tsx
import Image from "next/image";
import { professionalExperience, techSkills } from "@/lib/data/experience";
import ExperienceItem from "@/components/ExperienceItem";
import Illustration from "@/public/assets/page-illustration.svg"; // Use an appropriate illustration
import Particles from "@/components/particles/Particles";
import { cn } from "@/lib/utils";

// Optional: Add metadata
export const metadata = {
  title: "Timeline - Samir Llama",
  description: "Professional experience and technical skills timeline.",
};

export default function TimelinePage() {
  return (
    <>
      {/* Main Section */}
      <section className="relative">
        {/* Background Effects (Adjust colors/opacity for light/dark) */}
        <div
          className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square"
          aria-hidden="true"
        >
          {/* Light mode: Soft blue/purple */}
          <div className="absolute inset-0 translate-z-0 bg-indigo-400 rounded-full blur-[120px] opacity-20 dark:opacity-30"></div>
          <div className="absolute w-64 h-64 translate-z-0 bg-sky-300 rounded-full blur-[80px] opacity-30 dark:opacity-50"></div>
          {/* Dark mode: Neon accents */}
          <div className="absolute inset-0 translate-z-0 dark:bg-primary-500 rounded-full blur-[120px] opacity-30 hidden dark:block"></div>
          <div className="absolute w-64 h-64 translate-z-0 dark:bg-secondary-500 rounded-full blur-[80px] opacity-70 hidden dark:block"></div>
        </div>
        <Particles
          className="absolute inset-0 h-96 -z-10"
          quantity={10}
          staticity={30}
        />
        {/* <div className="absolute inset-0 h-96 -z-10" aria-hidden="true">
          <canvas data-particle-animation data-particle-quantity="15"></canvas> // Replace with Particles component if preferred
        </div> */}
        <div
          className="md:block absolute left-1/2 -translate-x-1/2 -mt-16 blur-2xl opacity-50 dark:opacity-90 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <Image
            src={Illustration}
            className="max-w-none"
            width={1440}
            height={427}
            alt="Page Illustration"
          />
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground-rgb))]">
                My Journey
              </h1>
              <p className="text-lg text-gray-600 dark:text-slate-400">
                A timeline of my professional experience and technical growth.
              </p>
            </div>

            {/* Timeline Section */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Vertical Line */}
                <div
                  className={cn(
                    // Positioning
                    "absolute h-full top-6 left-[5px] w-0.5 -z-10",
                    // Light mode gradient
                    "bg-gradient-to-b from-transparent via-slate-300 to-transparent",
                    // Dark mode gradient color
                    "dark:via-slate-700"
                    // Add shine animation if desired, potentially only in dark mode
                    // "after:absolute after:h-4 after:top-0 ... dark:after:animate-shine"
                  )}
                  aria-hidden="true"
                ></div>

                {/* Experience Items */}
                {professionalExperience.map((item, index) => (
                  <ExperienceItem
                    key={item.id}
                    item={item}
                    isLast={index === professionalExperience.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Skills Section (Optional) */}
            <div className="max-w-3xl mx-auto mt-16 md:mt-20">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-[rgb(var(--foreground-rgb))]">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
                {techSkills.map((skillGroup) => (
                  <div
                    key={skillGroup.category}
                    className="p-4 rounded-lg bg-[rgb(var(--card-bg-rgb))] border border-[rgb(var(--border-subtle-rgb))] shadow-sm dark:bg-slate-800 dark:border-slate-700"
                  >
                    <h4 className="font-semibold mb-2 text-[rgb(var(--primary-rgb))]">
                      {skillGroup.category}
                    </h4>
                    <ul className="space-y-1">
                      {skillGroup.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-gray-600 dark:text-slate-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Optional CTA Section */}
      {/* <Cta /> */}
    </>
  );
}
