// components/HeroSection.tsx

// 'use client'; Uncomment later to add interactive elements
import Image from "next/image";
import { cn } from "../lib/utils";

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
        <div
          className={cn(
            "uppercase",
            "max-w-[1700px] w-full lg:w-11/12",
            "hero-text"
          )}
        >
          <h1
            className={cn(
              "text-default",
              "flex flex-wrap overflow-hidden justify-start w-full"
            )}
          >
            <span className="block overflow-hidden">
              <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                <span className="block mb-0 pb-0 pr-[1px] ml-[10vw]">
                  <span className="block ms-text-adjust">I &nbsp;</span>
                </span>
              </span>
            </span>

            {/* "Build! " */}
            {/* <span className="block overflow-hidden">
              <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                <span className="block mb-0 pb-0">
                  <span className="block ms-text-adjust">Build &nbsp;</span>
                </span>
              </span>
            </span> */}
            {/* "Build" with flip effect to "Break " */}
            <span className="block overflow-hidden">
              <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                <span className="block mb-0 pb-0 flip-hero-text">
                  <span className="block ms-text-adjust flip-word">
                    Build &nbsp;
                  </span>
                  <span className="block ms-text-adjust flip-word">
                    Break &nbsp;
                  </span>
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

            {/* Mapping the rest of the words from coreMessage */}
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
          {/* This div provides the W/H needed for Image fill and ensures it covers the opacity layer */}
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
