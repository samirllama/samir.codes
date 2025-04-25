// components/HeroSection.tsx

// 'use client'; Uncomment later to add interactive elements
import Image from "next/image";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { cn } from "../lib/utils";

const imageSrc = "/assets/Relaxing-Forest-Setting.png";
const imageAlt = "Samir Coder";

const coreMessage =
  "Welcome to my playground! I enjoy building performant, accessible, and innovative web solutions.";

// Component can be a Server Component by default in App Router, if it doesn't use client-only features like hooks or event listeners.
const HeroSection = () => {
  return (
    <section className="my-4">
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
            className={twMerge(
              clsx(
                "text-default",
                "flex flex-wrap overflow-hidden justify-start w-full"
              )
            )}
          >
            <span className="block overflow-hidden">
              <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                <span className="block mb-0 pb-0 pr-[1px] ml-[10vw]">
                  <span className="block ms-text-adjust">Hello &nbsp;</span>
                </span>
              </span>
            </span>

            {/* "World! " */}
            <span className="block overflow-hidden">
              <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                <span className="block mb-0 pb-0">
                  <span className="block ms-text-adjust">World 👋🏽&nbsp;</span>
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
            {coreMessage.split(" ").map((message, index) => (
              <span className="block overflow-hidden" key={index}>
                <span className="block overflow-hidden will-change-transform translate-y-0 transform-gpu">
                  <span className="block mb-0 pb-0">
                    <span className="block ms-text-adjust">
                      {message}
                      {index < coreMessage.split(" ").length - 1
                        ? "\u00A0"
                        : ""}
                    </span>
                  </span>
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/*
          --- Step 1: The Absolute Positioning & Sizing Container (Without aspect-ratio) ---
          Purpose: To define the overall position (bottom right) and the size (height & width)
                   of the entire image block relative to the main container.
          - 'absolute bottom-0 right-0': Positions at the bottom right.
          - 'h-[40vh]': Sets the height to 40% of the viewport height.
          - 'w-[30vw]': Sets the width to 30% of the viewport width (example value). Adjust '30vw' as needed for desired width.
          - 'overflow-hidden', 'bg-[#000] bg-opacity-50', 'max-w-[800px]': Other styles remain the same.
        */}
        <div className="absolute bottom-0 right-0 h-[65vh] w-[50vw] overflow-hidden bg-[#000] bg-opacity-50 max-w-[800px]">
          {/* <div className="absolute bottom-0 right-0 w-10/12 md:w-8/12 lg:w-[52%] xl:w-[44%] aspect-square overflow-hidden bg-[#000] bg-opacity-50 max-w-[800px]"> */}
          {/* This div applies the OPACITY LAYER (opacity-[0.2]).
            Everything inside this div, including the image, will be semi-transparent.*/}

          <div className="opacity-[0.2] absolute inset-0 overflow-hidden">
            {/* Inner container needed for Image fill (must be relative/absolute/etc. and have dimensions) */}
            {/* This div provides the W/H needed for Image fill and ensures it covers the opacity layer */}

            <div className="absolute inset-0 w-full h-full">
              <Image
                fill // Makes the image size to its parent container
                src={imageSrc}
                alt={imageAlt}
                className="object-cover filter grayscale object-[2%_50%]" // Styles the image itself (cropping, grayscale)
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
