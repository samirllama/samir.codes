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

const coreMessage =
  "ENJOY MAKING WEBSITES THAT ARE INNOVATIVE, ACCESSIBLE & PERFORMANT!";

// Component can be a Server Component by default in App Router, if it doesn't use client-only features like hooks or event listeners.
const HeroSection = () => {
  return (
    <section
      className={twMerge(
        clsx(
          // Full width, min full height, center content vertically
          // "relative w-full min-h-screen flex justify-center",
          "my-4"
          // Consider adding 'overflow-hidden' if elements extending beyond bounds
        )
      )}
    >
      <div className="pb-[61vw] md:pb-[55vw] lg:pb-[45vw] xl:pb-[36.25vw] 2xl:pb-[670px] mb-24 lg:mb-16 relative">
        <div className="absolute bottom-0 right-0 w-10/12 md:w-8/12 lg:w-[52%] xl:w-[44%] aspect-square overflow-hidden bg-[#000] bg-opacity-50 max-w-[800px]">
          <div className="opacity-[0.2] absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <div className="will-change-transform absolute inset-0">
                [Image Goes Here]
              </div>
            </div>
          </div>
        </div>
        {/* Text Content Area */}
        <div className="leading-[1] uppercase text-[clamp(30px,0.92rem+4.9vw,90px)] font-display tracking-tight max-w-[1700px] w-full lg:w-11/12">
          <h1
            className={twMerge(
              clsx(
                // Large font size, serif, tight leading, bottom margin
                "font-mono",
                "text-default",
                "flex flex-wrap overflow-hidden justify-start w-full"
                // Optional: Add aos animation data attribute
                // data-aos="fade-up"
              )
            )}
          >
            <span className="block overflow-hidden">
              <span
                className="block overflow-hidden will-change-transform"
                style={{ transform: "translateY(0%) translateZ(0px);" }}
              >
                <span className="block mb-0 pb-0 pr-[1px] ml-[10vw]">
                  <span className="block ms-text-adjust">Hello &nbsp;</span>
                </span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block overflow-hidden will-change-transform"
                style={{ transform: "translateY(0%) translateZ(0px);" }}
              >
                <span className="block mb-0 pb-0 pr-[1px] false">
                  <span className="block ms-text-adjust">World! &nbsp;</span>
                </span>
              </span>
            </span>

            <span className="block overflow-hidden">
              <span
                className="block overflow-hidden will-change-transform"
                style={{ transform: "translateY(0%) translateZ(0px);" }}
              >
                <span className="block mb-0 pb-0 pr-[1px] false">
                  <span className="block ms-text-adjust">I &nbsp;</span>
                </span>
              </span>
            </span>

            {coreMessage.split(" ").map((message) => (
              <span className="block overflow-hidden" key={message}>
                <span
                  className="block overflow-hidden will-change-transform"
                  style={{ transform: "translateY(0%) translateZ(0px);" }}
                >
                  <span className="block mb-0 pb-0 pr-[1px] false">
                    <span className="block ms-text-adjust">
                      {message}&nbsp;
                    </span>
                  </span>
                </span>
              </span>
            ))}
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

      <nav className="pb-[20vw] lg:pb-[12.5vw]">
        <h2 className="font-mono uppercase tracking-tight leading-none text-[10px] mb-3 lg:mb-3 pb-0">
          Projects
        </h2>
        <ul className="border-t border-white/30">
          <li className="block relative">
            <a className="uppercase border-b border-white/30 w-full py-2 lg:py-[15px] flex items-end relative group transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:pl-0 a11y-focus">
              <span className="block overflow-hidden">
                <span className="leading-[0.95] block text-[clamp(30px,0.92rem+4.4vw,100px)] font-display tracking-tight relative z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                  <span
                    className="block"
                    style={{ transform: "translateY(0%) translateZ(0px);" }}
                  >
                    <span className="block ms-text-adjust">Wells Fargo</span>
                  </span>
                </span>
              </span>
              <span className="ml-auto text-right font-mono text-[10px] tracking-tight leading-none hidden lg:block relative overflow-hidden z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px);" }}
                >
                  View Project
                </span>
              </span>
            </a>
          </li>
          <li className="block relative">
            <a className="uppercase border-b border-white/30 w-full py-2 lg:py-[15px] flex items-end relative group transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:pl-0 a11y-focus">
              <span className="block overflow-hidden">
                <span className="leading-[0.95] block text-[clamp(30px,0.92rem+4.4vw,100px)] font-display tracking-tight relative z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                  <span
                    className="block"
                    style={{ transform: "translateY(0%) translateZ(0px);" }}
                  >
                    <span className="block ms-text-adjust">Dealer Inspire</span>
                  </span>
                </span>
              </span>

              <span className="ml-auto text-right font-mono text-[10px] tracking-tight leading-none hidden lg:block relative overflow-hidden z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px);" }}
                >
                  View Project
                </span>
              </span>
            </a>
          </li>
          <li className="block relative">
            <a className="uppercase border-b border-white/30 w-full py-2 lg:py-[15px] flex items-end relative group transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:pl-0 a11y-focus">
              <span className="block overflow-hidden">
                <span className="leading-[0.95] block text-[clamp(30px,0.92rem+4.4vw,100px)] font-display tracking-tight relative z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                  <span
                    className="block"
                    style={{ transform: "translateY(0%) translateZ(0px);" }}
                  >
                    <span className="block ms-text-adjust">Expedia</span>
                  </span>
                </span>
              </span>
              <span className="ml-auto text-right font-mono text-[10px] tracking-tight leading-none hidden lg:block relative overflow-hidden z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px);" }}
                >
                  View Project
                </span>
              </span>
            </a>
          </li>
          <li className="block relative">
            <a className="uppercase border-b border-white/30 w-full py-2 lg:py-[15px] flex items-end relative group transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:pl-0 a11y-focus">
              <span className="block overflow-hidden">
                <span className="leading-[0.95] block text-[clamp(30px,0.92rem+4.4vw,100px)] font-display tracking-tight relative z-[1] transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] lg:opacity-100">
                  <span
                    className="block"
                    style={{ transform: "translateY(0%) translateZ(0px);" }}
                  >
                    <span className="block ms-text-adjust">Domino's</span>
                  </span>
                </span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default HeroSection;
