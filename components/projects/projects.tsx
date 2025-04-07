"use client";

import { useEffect, useState, useRef } from "react"; // Add useRef
import Image from "next/image";
import Particles from "../particles/Particles";
import Highlighter, { HighlighterItem } from "../highlight/highlighter";

import CarouselImg01 from "@/public/assets/img-1.png";
import CarouselImg05 from "@/public/assets/img-5.png";
import CarouselImg03 from "@/public/assets/img-3.png";
import CarouselImg04 from "@/public/assets/img-4.png";
import styles from "./project.module.css";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
// Import Swiper
import "swiper/css";
import "swiper/css/navigation";
Swiper.use([Navigation]);

export default function ProjectsCarousel() {
  const [swiperInitialized, setSwiperInitialized] = useState<boolean>(false);
  const swiperRef = useRef<HTMLDivElement>(null); // Add ref for Swiper container

  useEffect(() => {
    if (!swiperRef.current) return; // Guard clause

    const carousel = new Swiper(swiperRef.current, {
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      navigation: {
        nextEl: ".carousel-next",
        prevEl: ".carousel-prev",
      },
    });

    setSwiperInitialized(true);

    return () => {
      carousel.destroy(true, true); // Cleanup
    };
  }, []);

  return (
    <section>
      <div className={styles.projectsBox}>
        <div className={styles.projectsInnerBox}>
          {/* Section header */}
          <div className={styles.projectsHeaderBox}>
            <div>
              <div className={styles.titleGradient}>Some of my projects</div>
            </div>
            <h2 className={styles.header}>My Projects</h2>
            <p className="text-lg text-slate-400">
              Some of my projects that are live and working in some corner of
              the Internet.
            </p>
          </div>

          {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
          {/* * Custom styles in src/css/additional-styles/theme.scss */}
          <div className={styles.carouselWrapper}>
            {/* Change this div to use ref */}
            <div ref={swiperRef} className={`swiper ${styles.swiperContainer}`}>
              <Highlighter
                className={`swiper-wrapper ${styles.swiperWrapper}`}
                refresh={swiperInitialized}
              >
                {/* Carousel items */}
                <HighlighterItem className={`swiper-slide ${styles.slide}`}>
                  <div className={styles.slideContent}>
                    <Particles
                      className={styles.particlesWrapper}
                      quantity={3}
                      refresh={swiperInitialized}
                    />
                    <div className={styles.radialGradient} aria-hidden="true">
                      <div className={styles.gradientCircle} />
                    </div>
                    <div className={styles.slideInner}>
                      <Image
                        className={styles.projectImage}
                        src={CarouselImg01}
                        width={56}
                        height={56}
                        alt="Icon 01"
                      />
                      <div className={styles.projectContent}>
                        <div className={styles.projectTitle}>
                          Anonymous User
                        </div>
                        <div className={styles.projectDescription}>
                          Incorporate rich user profiling, and facilitate more
                          transactions.
                        </div>
                      </div>
                      <div className="text-right">
                        <a href="#0" className={styles.learnMoreLink}>
                          Learn More
                          <span className={styles.learnMoreArrow}>-&gt;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
                <HighlighterItem className={`swiper-slide ${styles.slide}`}>
                  <div className={styles.slideContent}>
                    <Particles
                      className={styles.particlesWrapper}
                      quantity={3}
                      refresh={swiperInitialized}
                    />
                    <div className={styles.radialGradient} aria-hidden="true">
                      <div className={styles.gradientCircle} />
                    </div>
                    <div className={styles.slideInner}>
                      <Image
                        className={styles.projectImage}
                        src={CarouselImg05}
                        width={56}
                        height={56}
                        alt="Icon 05"
                      />
                      <div className={styles.projectContent}>
                        <div className={styles.projectTitle}>Bot Detection</div>
                        <div className={styles.projectDescription}>
                          Incorporate rich user profiling, and facilitate more
                          transactions.
                        </div>
                      </div>
                      <div className="text-right">
                        <a href="#0" className={styles.learnMoreLink}>
                          Learn More
                          <span className={styles.learnMoreArrow}>-&gt;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
                <HighlighterItem className={`swiper-slide ${styles.slide}`}>
                  <div className={styles.slideContent}>
                    <Particles
                      className={styles.particlesWrapper}
                      quantity={3}
                      refresh={swiperInitialized}
                    />
                    <div className={styles.radialGradient} aria-hidden="true">
                      <div className={styles.gradientCircle} />
                    </div>
                    <div className={styles.slideInner}>
                      <Image
                        className={styles.projectImage}
                        src={CarouselImg03}
                        width={56}
                        height={56}
                        alt="Icon 01"
                      />
                      <div className={styles.projectContent}>
                        <div className={styles.projectTitle}>
                          Social integrations
                        </div>
                        <div className={styles.projectDescription}>
                          Incorporate rich user profiling, and facilitate more
                          transactions.
                        </div>
                      </div>
                      <div className="text-right">
                        <a href="#0" className={styles.learnMoreLink}>
                          Learn More
                          <span className={styles.learnMoreArrow}>-&gt;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
                <HighlighterItem className={`swiper-slide ${styles.slide}`}>
                  <div className={styles.slideContent}>
                    <Particles
                      className={styles.particlesWrapper}
                      quantity={3}
                      refresh={swiperInitialized}
                    />
                    <div className={styles.radialGradient} aria-hidden="true">
                      <div className={styles.gradientCircle} />
                    </div>
                    <div className={styles.slideInner}>
                      <Image
                        className={styles.projectImage}
                        src={CarouselImg04}
                        width={56}
                        height={56}
                        alt="Icon 01"
                      />
                      <div className={styles.projectContent}>
                        <div className={styles.projectTitle}>
                          Progressive Profiling
                        </div>
                        <div className={styles.projectDescription}>
                          Incorporate rich user profiling, and facilitate more
                          transactions.
                        </div>
                      </div>
                      <div className="text-right">
                        <a href="#0" className={styles.learnMoreLink}>
                          Learn More
                          <span className={styles.learnMoreArrow}>-&gt;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
              </Highlighter>
            </div>
          </div>

          {/* Update navigation buttons */}
          <div className={styles.navigationButtons}>
            <button className={`carousel-prev ${styles.carouselButton}`}>
              <span className="sr-only">Previous</span>
              <svg
                className={styles.carouselIcon}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>
            <button className={`carousel-next ${styles.carouselButton}`}>
              <span className="sr-only">Next</span>
              <svg
                className={styles.carouselIcon}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
