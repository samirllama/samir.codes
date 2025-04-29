// components/HeroSection.tsx

// 'use client'; Uncomment later to add interactive elements
import Image from "next/image";
import { cn } from "@/lib/utils";

const imageSrc = "/assets/Relaxing-Forest-Setting.png";
const imageAlt = "Samir Coder";

const subText =
  "With a passion for crafting web solutions that are blazing fast and accessible.";

const HeroSection = () => {
  return (
    <section
      className="my-4"
      aria-label="Hero section introducing Samir's portfolio"
    >
      <div className="pb-[61vw] md:pb-[55vw] lg:pb-[45vw] xl:pb-[36.25vw] 2xl:pb-[670px] mb-24 lg:mb-16 relative">
        {/* Text Content Area */}
        <div className="uppercase max-w-[1700px] w-full lg:w-11/12">
          <h1
            className={cn([
              "text-default",
              "flex flex-wrap overflow-hidden justify-start w-full",
              "hero-text",
            ])}
          >
            <span className="block overflow-hidden">
              <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                <span className="block mb-0 pb-0 pr-[1px] ml-[10vw]">
                  <span className="block ms-text-adjust">I &nbsp;</span>
                </span>
              </span>
            </span>

            <span className="inline-block relative h-[1em] overflow-hidden align-bottom">
              {/* INVISIBLE SPACER - Give parent width */}
              <span className="invisible whitespace-nowrap ms-text-adjust">
                Break &nbsp;
              </span>
              <span className="block absolute inset-0 flip-animation-container">
                {/* This should now have top: 0 */}
                <span className="block whitespace-nowrap ms-text-adjust">
                  Build
                </span>
                <span className="block whitespace-nowrap ms-text-adjust absolute top-full left-0">
                  Break
                </span>
              </span>
            </span>

            {/* "things! " */}
            <span className="block overflow-hidden">
              <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                <span className="block mb-0 pb-0">
                  <span className="block ms-text-adjust">things. &nbsp;</span>
                </span>
              </span>
            </span>

            {/*
              Manual line break element
              Insert a span with w-full (width: 100%).
              As a flex item, this span will take up the entire width of the flex container (the h1), forcing the subsequent flex items ("I " and the mapped words) onto the next line.
            */}
            <span className="w-full"></span>

            {subText.split(" ").map((message, index) => (
              <span className="block overflow-hidden" key={index}>
                <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                  <span className="block mb-0 pb-0">
                    <span className="block ms-text-adjust">
                      {message}
                      {index < subText.split(" ").length - 1 ? "\u00A0" : ""}
                    </span>
                  </span>
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="absolute bottom-0 right-0 h-[60vh] w-[80vw] overflow-hidden bg-[#000] bg-opacity-50 max-w-[1000px]">
          <div className="opacity-[0.2] absolute inset-0 overflow-hidden">
            {/* Inner container needed for Image fill (must be relative/absolute/etc. and have dimensions) */}

            <div className="absolute inset-0 w-full h-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover filter saturate-50 hue-rotate-15deg"
                priority={true}
              />
              {/* Overlay for text readability and blending with dark green */}
              <div className="absolute inset-0 bg-color-surface-page bg-opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
