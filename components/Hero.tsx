// components/Hero.tsx

import Image from "next/image";
import LeafParticles from "./leaf-particles/LeafParticles";
import Illustration from "@/public/glow-bottom.svg";
import TypingEffect from "./TypingEffect";
import { cn } from "@/lib/utils";

const Intro = [
  "Hi, I’m a software engineer passionate about solving complex problems and creating technology that improves lives. Welcome to my website, where I share my projects and insights on building impactful software.",
  "my digital playground—a space where I stash notes, articles, and code snippets to revisit later. I’m a software engineer who thinks out loud here, mostly about dev challenges, with some rants, self-care musings, and mental health sprinkled in. Dive in and explore!",
  "Hey, I’m a coder hooked on crafting speedy, open-for-all web magic—welcome to my wild dev playground!",
  "Hey, I’m a dev who thrives on crafting code to fix user headaches and build speedy, open-for-all web magic!",
];

// Dynamic parts
const dynamicHobbies = [
  "gaming.",
  "reading.",
  "coding.",
  "hiking.",
  "cooking.",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Elements */}
      <LeafParticles className="absolute inset-0 -z-10" quantity={40} />
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none -z-10 opacity-70 dark:opacity-100"
        aria-hidden="true"
      >
        <Image
          src={Illustration}
          className="max-w-none"
          width={2146}
          alt="Hero Background Glow"
          priority
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Constrain text width */}
          <div data-aos="fade-down" data-aos-delay="200">
            <TypingEffect
              staticPrefix="I like "
              items={dynamicHobbies}
              // Apply text size/weight/color using Tailwind utilities
              // Example using text-4xl for larger hero text
              paragraphClassName={cn(
                "text-4xl md:text-6xl font-bold mb-8",
                "text-slate-700 dark:text-slate-200"
              )}
              typingSpeed={120}
              deletingSpeed={60}
              pauseDuration={1800000}
            />
          </div>
          {/* Optional Buttons Section */}
        </div>
      </div>
    </section>
  );
}
