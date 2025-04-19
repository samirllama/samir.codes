// components/projects.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Particles from "./particles/Particles"; // Assuming path is correct
import Highlighter, { HighlighterItem } from "./highlighter";
import { cn } from "@/lib/utils"

import CarouselImg01 from "@/public/assets/img-1.png";
import CarouselImg05 from "@/public/assets/img-5.png";
import CarouselImg03 from "@/public/assets/img-3.png";
import CarouselImg04 from "@/public/assets/img-4.png";

// Import Swiper
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css"; // Base Swiper styles
import "swiper/css/navigation"; // Navigation module styles

// Initialize Swiper modules
Swiper.use([Navigation]);

// Define Project Data (Example structure)
const projects = [
  { img: CarouselImg01, title: "Anonymous User", description: "Incorporate rich user profiling, and facilitate more transactions.", link: "#0" },
  { img: CarouselImg05, title: "Bot Detection", description: "Incorporate rich user profiling, and facilitate more transactions.", link: "#0" },
  { img: CarouselImg03, title: "Social Integrations", description: "Incorporate rich user profiling, and facilitate more transactions.", link: "#0" },
  { img: CarouselImg04, title: "Progressive Profiling", description: "Incorporate rich user profiling, and facilitate more transactions.", link: "#0" },
  // Add more projects if needed
];

export default function ProjectsCarousel() {
  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!swiperRef.current) return;

    const carousel = new Swiper(swiperRef.current, {
      modules: [Navigation], // Ensure Navigation module is included
      slidesPerView: 1, // Base slides per view
      spaceBetween: 24, // Gap between slides
      grabCursor: true,
      loop: false, // Loop disabled for start/end state tracking
      centeredSlides: false,
      initialSlide: 0,
      navigation: { // Link to custom buttons
        nextEl: ".carousel-next-btn",
        prevEl: ".carousel-prev-btn",
        disabledClass: "swiper-button-disabled-custom", // Use a custom disabled class
      },
      breakpoints: { // Responsive slides per view
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      on: { // Swiper events
        init: (swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        },
        slideChange: (swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          // Force update active slide class (Swiper might be slow)
          updateActiveClass(swiper);
        },
        resize: (swiper) => {
           // Ensure active class is correct after resize
           updateActiveClass(swiper);
        }
      },
    });

    // Function to manually add/remove active class for styling hooks
    const updateActiveClass = (swiper: Swiper) => {
        swiper.slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });
    };

    // Initial active class update
    updateActiveClass(carousel);


    return () => {
      carousel.destroy(true, true); // Cleanup Swiper instance
      setSwiperInstance(null);
    };
  }, []); // Run only once on mount

  return (
    <section>
      {/* Outer container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20"> {/* Padding top/bottom */}

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {/* Title gradient only in dark mode */}
            <h2 className={cn(
              "text-4xl md:text-5xl font-bold mb-4",
              "text-slate-800", // Light mode color
              "dark:bg-gradient-to-r dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400 dark:bg-clip-text dark:text-transparent" // Dark mode gradient
            )}>
              My Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-slate-400">
              Some of my projects that are live and working in some corner of
              the Internet.
            </p>
          </div>

          {/* Carousel built with Swiper.js */}
          {/* Add fade classes if implemented in global CSS */}
          <div className="carousel-container-fades">
            {/* Swiper container */}
            <div ref={swiperRef} className="swiper stellar-carousel"> {/* Add stellar-carousel class if needed by theme.css */}
              {/* Highlighter wraps the swiper-wrapper */}
              <Highlighter className="swiper-wrapper group/wrapper" refresh={!!swiperInstance}>
                {/* Map through project data */}
                {projects.map((project, index) => (
                  // Each slide is a HighlighterItem
                  <HighlighterItem
                    key={index}
                    className={cn(
                      "swiper-slide group/slide h-auto", // Base Swiper classes + group name for particle hover
                      // Light Theme: Claymorphism
                      "shadow-clay-light bg-[rgb(var(--card-bg-rgb))]",
                      // Dark Theme: Neon Border/Glow (Example)
                      "dark:shadow-none dark:border dark:border-primary-500/50 dark:hover:border-primary-400 dark:bg-slate-800"
                    )}
                  >
                    {/* Inner content container */}
                    <div className="relative h-full z-10 p-5"> {/* Padding inside the card */}
                      {/* Particles (Dark Mode Only) */}
                      <Particles
                        className={cn(
                          "absolute inset-0 -z-10",
                          "opacity-0 group-hover/slide:opacity-100 [&.active-slide]:opacity-100", // Fade in on hover or active
                          "transition-opacity duration-500 ease-in-out",
                          "hidden dark:block" // Only show particles in dark mode
                        )}
                        quantity={3}
                        refresh={!!swiperInstance} // Refresh particles when swiper initializes
                      />
                      {/* Radial Gradient (Dark Mode Only) */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none -z-20 w-1/3 aspect-square hidden dark:block" aria-hidden="true">
                        <div className={cn(
                          "absolute inset-0 rounded-full blur-lg transition-colors duration-500 ease-in-out",
                           "bg-slate-800", // Base dark color
                           "[&.active-slide]:bg-primary-500/30" // Color change when active
                          )} />
                      </div>

                      {/* Project Content */}
                      <div className="flex flex-col h-full">
                        <Image
                          className="mb-3" // Spacing below image
                          src={project.img}
                          width={56}
                          height={56}
                          alt={`${project.title} Icon`}
                        />
                        <div className="grow mb-3"> {/* Grow to push footer down */}
                          <div className="text-lg font-bold mb-1 text-[rgb(var(--foreground-rgb))]">
                            {project.title}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                            {project.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <a href={project.link} className={cn(
                            "inline-flex items-center text-sm font-medium group/link",
                            "text-slate-600 hover:text-slate-900", // Light mode link
                            "dark:text-slate-300 dark:hover:text-white" // Dark mode link
                          )}>
                            Learn More
                            <span className={cn(
                              "tracking-normal transition-transform duration-150 ease-in-out ml-1",
                              "text-primary-500 dark:text-primary-400", // Use theme accent color
                              "group-hover/link:translate-x-0.5"
                            )}>
                              ->
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </HighlighterItem>
                ))}
              </Highlighter>
            </div>
          </div>

          {/* External Navigation Buttons */}
          <div className="flex justify-end mt-8 gap-2">
            <button className={cn(
              "carousel-prev-btn", // Class for Swiper navigation
              "relative z-20 w-10 h-10 flex items-center justify-center rounded-full",
              "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700",
              "transition-colors duration-150 ease-in-out",
              isBeginning && "swiper-button-disabled-custom opacity-50 cursor-not-allowed" // Apply disabled styles
            )}>
              <span className="sr-only">Previous</span>
              <svg className="w-4 h-4 fill-slate-500 dark:fill-slate-400" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>
            <button className={cn(
              "carousel-next-btn", // Class for Swiper navigation
              "relative z-20 w-10 h-10 flex items-center justify-center rounded-full",
              "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700",
              "transition-colors duration-150 ease-in-out",
              isEnd && "swiper-button-disabled-custom opacity-50 cursor-not-allowed" // Apply disabled styles
            )}>
              <span className="sr-only">Next</span>
              <svg className="w-4 h-4 fill-slate-500 dark:fill-slate-400" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
