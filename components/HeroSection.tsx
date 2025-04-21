// components/HeroSection.tsx

/*
> Rewriting the Hero Core Message:
Choose the option that best reflects the personality and the specific vibe= for a personal webpage! We can update the coreMessage variable in your HeroSection.jsx with your preferred string.

* Some options playing with different angles:

* Option 1 (Slightly Playful & Relatable):
"I'M A SENIOR DEVELOPER on a quest to build robust digital experiences. Sometimes things get... creatively deconstructed. It's part of the process!"

Why it fits: Uses slightly elevated language ("quest," "robust digital experiences," "creatively deconstructed") with a wink ("Sometimes things get..."). It sounds professional but relatable and fun.

*Option 2 (Focus on Mastery & Problem Solving):
Combined Headline: "I'M A SENIOR DEVELOPER with a passion for crafting elegant code and solving complex challenges. And yes, I've learned that breaking something is often the fastest way to understand how it really works."

Why it fits: Emphasizes craft ("crafting elegant code") and problem-solving ("solving complex challenges"). Frames the "breaking" part as a learning experience ("fastest way to understand"), making it sound insightful rather than clumsy. Classy and experienced tone.

*Option 3 (Confident & Direct):
Combined Headline: "I'M A SENIOR DEVELOPER focused on bringing innovative ideas to life through code. The journey involves careful construction, rigorous testing, and the occasional, albeit unintentional, structural integrity challenge."

Why it fits: Sounds confident and focused ("focused on bringing innovative ideas"). Uses formal but slightly humorous language for the "breaking" part ("occasional, albeit unintentional, structural integrity challenge"). Impressionable and classy.

* Option 4 (More Concise & Punchy):
"I'M A SENIOR DEVELOPER who thrives on building intuitive systems and tackling intricate problems. Sometimes the best way forward is figuring out why it just broke."

Why it fits: Uses strong verbs ("thrives on building," "tackling intricate problems"). The "breaking" line is concise and relates directly to the developer mindset of debugging. Fun and direct.
*/

// 'use client'; Uncomment later to add interactive elements
import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const name = "Samir";
const role = "Developer";
const coreMessage =
  "I'M A SENIOR DEVELOPER on a quest to build robust digital experiences. Sometimes things get... creatively deconstructed. It's part of the process!";

// Component can be a Server Component by default in App Router, if it doesn't use client-only features like hooks or event listeners.
const HeroSection = () => {
  return (
    <section
      className={twMerge(
        clsx(
          "relative w-full min-h-screen flex items-center justify-center", // Full width, min full height, center content vertically
          "bg-background-dark text-text-light", // Apply dark background and light text from theme.css
          "px-4 sm:px-8 lg:px-16 py-16" // Responsive horizontal padding and vertical padding
          // Consider adding 'overflow-hidden' if elements extending beyond bounds
        )
      )}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content Area */}
        <div className="flex-1 max-w-3xl text-center lg:text-left">
          {/* Headline - uses the serif font */}
          <h1
            className={twMerge(
              clsx(
                // Large font size, serif, tight leading, bottom margin
                "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif-display leading-tight mb-6",
                "text-text-light" // Ensure headline uses light text color
                // Optional: Add aos animation data attribute
                // data-aos="fade-up"
              )
            )}
          >
            {coreMessage}
          </h1>

          {/* Subtext or Call to Action (Optional) */}
          {/*
          <p className="text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 text-text-secondary">
            Putting ideas into code, one project at a time.
          </p>
          */}

          {/* Example Button (using the PrimaryButton component we discussed) */}
          {/* Make sure to import PrimaryButton */}
          {/* <PrimaryButton>View My Work</PrimaryButton> */}
        </div>

        {/* Image Placeholder Area */}
        <div className="flex-1 max-w-sm w-full lg:max-w-md">
          {/* Replace this with the Next/Image component */}
          {/* Make sure the image is styled to fit and maintain aspect ratio */}
          <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-neutral-darker overflow-hidden">
            {/* Placeholder background */}
            {/*
              <Image
                src="/path/to/image.jpg" // Your ge path
                alt={name} Senior Developer" // Alt text
                layout="fill" // Cover the container
                objectFit="cover" // Crop as needed
                className="filter grayscale" // Apply grayscale filter
              />
              */}
            {/* Add a placeholder if not using Image */}
            <div className="w-full h-full flex items-center justify-center text-neutral-medium">
              [Image Goes Here]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
