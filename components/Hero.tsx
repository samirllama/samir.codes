// components/hero/Hero.tsx

import Image from "next/image";
import Particles from "./particles/Particles";
import Illustration from "@/public/glow-bottom.svg";
import TypingEffect from "./typing/TypingEffect";
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

// export default function Hero() {
//   return (
//     <section className="relative min-h-screen flex items-center border border-yellow-300">
//       {/* Relative positioning */}
//       <Particles className="absolute inset-0 -z-10" />
//       {/* Glow (Positioned relative to section) */}
//       <div
//         className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none -z-10"
//         aria-hidden="true"
//       >
//         <Image
//           src={Illustration}
//           className="max-w-none"
//           width={2146} // height not needed, width controls aspect ratio
//           alt="Hero Background Glow"
//           priority // Add priority for LCP
//         />
//       </div>

//       {/* Centered Content */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
//         <div className="max-w-3xl mx-auto">
//           {/* Personalized Content using TypingEffect */}
//           <div data-aos="fade-down" data-aos-delay="200">
//             <TypingEffect
//               staticPrefix="I like "
//               items={dynamicHobbies}
//               // paragraphClassName="text-2xl md:text-3xl text-slate-300 mb-8"

//               // Example using text-4xl for larger hero text
//               paragraphClassName={cn(
//                 "text-4xl md:text-6xl font-bold mb-8", // Larger size, bold
//                 "text-slate-700 dark:text-slate-200" // Base text colors
//                 // Add tracking-tight if desired
//               )}
//               typingSpeed={120}
//               deletingSpeed={60}
//               pauseDuration={1800}
//             />
//           </div>

//           {/* Optional Buttons Section */}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {" "}
      {/* Added flex centering */}
      {/* Background Elements */}
      <Particles className="absolute inset-0 -z-10" quantity={40} />
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none -z-10 opacity-70 dark:opacity-100" // Adjusted opacity
        aria-hidden="true"
      >
        <Image
          src={Illustration}
          className="max-w-none"
          width={2146}
          alt="Hero Background Glow"
          priority // Add priority for LCP
        />
      </div>
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {" "}
        {/* Ensure text-center */}
        {/* Removed outer pt/pb padding div as flex centering handles vertical position */}
        <div className="max-w-3xl mx-auto">
          {" "}
          {/* Constrain text width */}
          {/* Typing Effect */}
          <div data-aos="fade-down" data-aos-delay="200">
            <TypingEffect
              staticPrefix="I like "
              items={dynamicHobbies}
              // Apply desired text size/weight/color using Tailwind utilities
              // Example using text-4xl for larger hero text
              paragraphClassName={cn(
                "text-4xl md:text-6xl font-bold mb-8", // Larger size, bold
                "text-slate-700 dark:text-slate-200" // Base text colors
                // Add tracking-tight if desired
              )}
              typingSpeed={120}
              deletingSpeed={60}
              pauseDuration={1800000}
            />
          </div>
          {/* Optional Buttons Section could go here */}
        </div>
      </div>
    </section>
  );
}
