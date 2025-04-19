// components/feature.tsx (Refactored with Tailwind v3)
import Image from "next/image";
import Highlighter, { HighlighterItem } from "./highlighter";
import Img04 from "@/public/assets/img-4.png";
import { cn } from "@/lib/utils";

export default function Features() {
  return (
    <section className="relative">
      {/* Replaces styles.section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {" "}
        <div className="py-16 md:py-20 border-b border-[rgb(var(--border-subtle-rgb))]">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {" "}
            {/* Replaces styles.header */}
            <h2
              className={cn(
                "text-4xl md:text-5xl font-bold mb-4",
                "text-[rgb(var(--foreground-rgb))]" // Use theme variable for color
              )}
            >
              More than a login box
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              There are many variations available, but the majority have
              suffered alteration in some form, by injected humour, or
              randomized words which don't look even slightly believable.
            </p>
          </div>
          {/* Image Container */}
          <div className="max-w-3xl mx-auto">
            {" "}
            <div data-aos="fade-down">
              {/* Highlighter component usage remains the same */}
              <Highlighter className="group">
                <HighlighterItem>
                  <div
                    className={cn(
                      "relative h-full overflow-hidden rounded-2xl", // Use specific rounding
                      "bg-slate-800 dark:bg-slate-900" // Base background
                    )}
                  >
                    {/* Radial gradient */}
                    <div
                      className={cn(
                        "absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2",
                        "pointer-events-none -z-10 w-1/2 aspect-square" // Use aspect-square
                      )}
                      aria-hidden="true"
                    >
                      <div
                        className={cn(
                          "absolute inset-0 translate-z-0 rounded-full",
                          "bg-primary-500/30 dark:bg-primary-400/30",
                          "blur-[120px]" // Apply blur
                        )}
                      />
                    </div>
                    <Image
                      src={Img04}
                      width={768}
                      height={400}
                      alt="Feature 04"
                      className="w-full h-auto" // Ensure image responsiveness
                    />
                  </div>
                </HighlighterItem>
              </Highlighter>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
