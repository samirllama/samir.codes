// components/hero/Hero.tsx

import Image from "next/image";
import Particles from "../particles/Particles";
import Illustration from "@/public/glow-bottom.svg";
import TypingEffect from "../typing/TypingEffect";

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
]; // Example list

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Relative positioning */}
      <Particles className="absolute inset-0 -z-10" quantity={40} />
      {/* Glow Illustration (Positioned relative to section) */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <Image
          src={Illustration} // glow image
          className="max-w-none"
          width={2146} // height might not be needed if width controls aspect ratio
          alt="Hero Background Glow"
        />
      </div>

      {/* Centered Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Personalized Content using TypingEffect */}
            <div data-aos="fade-down" data-aos-delay="200">
              <TypingEffect
                staticPrefix="I like "
                items={dynamicHobbies}
                paragraphClassName="text-2xl md:text-3xl text-slate-300 mb-8"
                typingSpeed={120}
                deletingSpeed={60}
                pauseDuration={1800}
              />
            </div>

            {/* Optional Buttons Section */}
          </div>
        </div>
      </div>
    </section>
  );
}
