// app/page.tsx

import ProjectStack from "@/components/project-stack";
import HeroSection from "../../components/HeroSection";
import FlipText from "../../components/flip-text";

const myProjects = [
  { id: 1, name: "British Petroleum", link: "/projects/wells-fargo" },
  { id: 2, name: "Wells Fargo", link: "/projects/wells-fargo" },
  { id: 3, name: "Dealer Inspire", link: "/projects/dealer-inspire" },
  { id: 4, name: "Expedia", link: "/projects/expedia" },
  { id: 5, name: "Domino's", link: "/projects/dominos" },
];

export default function Home() {
  return (
    <article>
      <HeroSection />
      <FlipText />
      <ProjectStack projects={myProjects} />

      {/* === Professional Summary Section === */}
      <section className="pb-[20vw] lg:pb-[12.5vw]">
        <h2 className="font-mono uppercase tracking-tight leading-[1] text-[10px] mb-5 pb-0 relative overflow-hidden">
          <span
            className="block"
            style={{ transform: "translateY(0%) translateZ(0px)" }}
          >
            Professional Summary
          </span>
        </h2>
        <ul className="bouncy-hover uppercase border-t border-white/30">
          <li className="block">
            <span className="border-b border-white/30 w-full py-2 lg:py-1 block lg:flex lg:items-end">
              <span className="leading-[1.275] block text-[clamp(18px,0.92rem+1.15vw,34px)] font-display tracking-tight mb-1 lg:mb-0 relative overflow-hidden">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="block ms-text-adjust">
                    British Petroleum
                  </span>
                </span>
              </span>

              <span className="ml-auto leading-[1.275] font-serif lg:font-display block text-xl lg:text-[clamp(15px,0.92rem+1.15vw,34px)] tracking-tight relative overflow-hidden">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="flex items-end">
                    <span className="block">
                      <span className="block ms-text-adjust">
                        2021 - Present
                      </span>
                    </span>
                    <span className="capitalize block font-serif italic text-[clamp(14px,0.7rem+0.65vw,25px)] tracking-normal leading-none pl-2 pr-1 translate-y-[-45%] md:translate-y-[-30%] lg:translate-y-[-32%]">
                      (Senior Software Engineer)
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </li>
          <li className="block">
            <span className=" border-b border-white/30 w-full py-2 lg:py-1 block lg:flex lg:items-end">
              <span className="leading-[1.275] block text-[clamp(18px,0.92rem+1.15vw,34px)] font-display tracking-tight mb-1 lg:mb-0 relative overflow-hidden">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="block ms-text-adjust">Wells Fargo</span>
                </span>
              </span>

              <span className="ml-auto leading-[1.275] font-serif lg:font-display block text-xl lg:text-[clamp(15px,0.92rem+1.15vw,34px)] tracking-tight relative overflow-hidden">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="flex items-end">
                    <span className="block">
                      <span className="block ms-text-adjust">2020 - 2021</span>
                    </span>
                    <span className="capitalize block font-serif italic text-[clamp(14px,0.7rem+0.65vw,25px)] tracking-normal leading-none pl-2 pr-1 translate-y-[-45%] md:translate-y-[-30%] lg:translate-y-[-32%]">
                      (Senior Software Engineer)
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </li>
          <li className="block">
            <span className=" border-b border-white/30 w-full py-2 lg:py-1 block lg:flex lg:items-end">
              <span className="leading-[1.275] block text-[clamp(18px,0.92rem+1.15vw,34px)] font-display tracking-tight mb-1 lg:mb-0 relative overflow-hidden">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="block ms-text-adjust">Dealer Inspire</span>
                </span>
              </span>

              <span className="ml-auto leading-[1.275] font-serif lg:font-display block text-xl lg:text-[clamp(15px,0.92rem+1.15vw,34px)] tracking-tight relative overflow-hidden">
                <span
                  className="block"
                  style={{ transform: "translateY(0%) translateZ(0px)" }}
                >
                  <span className="flex items-end">
                    <span className="block">
                      <span className="block ms-text-adjust">2019 - 2020</span>
                    </span>
                    <span className="capitalize block font-serif italic text-[clamp(14px,0.7rem+0.65vw,25px)] tracking-normal leading-none pl-2 pr-1 translate-y-[-45%] md:translate-y-[-30%] lg:translate-y-[-32%]">
                      (Software Engineer)
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </li>
        </ul>
      </section>

      {/* === Tech Stack / Skills === */}
      <section
        className="grid grid-cols-12 pb-[20vw] lg:pb-[12.5vw]"
        id="tools"
      >
        <div className="col-span-12 lg:col-span-4 mb-2 lg:mb-0">
          <h2 className="font-mono uppercase tracking-tight leading-none text-[10px] mb-3 pb-0">
            Tools / Technologies
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="max-w-[820px]">
            <h2 className="leading-[1] block text-[clamp(30px,0.92rem+2vw,45px)] font-display tracking-tight mb-12 uppercase">
              Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="mb-8 lg:mb-12 col-span-1">
                <span className="uppercase block font-mono  tracking-tight leading-none text-[10px] mb-3 pb-0">
                  Front-end Stack
                </span>

                {/* === List - Front end stack === */}
                <ul className="bouncy-hover">
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://react.dev/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      React
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://nextjs.org/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      NextJs
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://tailwindcss.com/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      Tailwind
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://www.framer.com/motion/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
                      Framer Motion
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://lenis.studiofreight.com/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
                      Lenis Scroll
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://lenis.studiofreight.com/"
                      target="_blank"
                      rel="noreferrer noopener"
                      // Add group class to the parent for targeting on hover
                      // Keep original classes and add text color
                      className="relative group a11y-focus overflow-hidden inline-block text-blue-600 hover:text-blue-800"
                    >
                      Lenis Scroll
                      {/*
    - absolute: Position it relative to the parent <a>.
    - bottom-0, left-0: Pin it to the bottom left corner of the parent.
    - w-full: Make it span the full width of the parent.
    - h-[3px]: Give it a small height for the underline thickness (adjust as needed).
    - scale-x-0: Initially scale it to zero width (hidden).
    - transform-origin-center: Make the scaling happen from the center.
    - transition-transform: Add a transition for smooth animation.
    - duration-300: Set the transition duration.
    - ease-out: Set the transition timing function.
    - group-hover:scale-x-100: On parent hover, scale it back to full width (visible).
    - style: Define the wave background using an SVG data URL.
             currentColor makes the wave color inherit the text color.
             backgroundRepeat: 'repeat-x' ensures the wave pattern tiles horizontally.
             backgroundSize: 'auto 100%' ensures the wave scales vertically to the span's height.
  */}
                      <span
                        className="absolute bottom-0 left-0 w-full h-[3px] transform scale-x-0 transform-origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3C svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 10' preserveAspectRatio='none'%3E%3Cpath d='M0,5 C25,10 75,0 100,5' stroke='currentColor' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "repeat-x",
                          backgroundSize: "auto 100%",
                        }}
                      ></span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <span className="uppercase block font-mono  tracking-tight leading-none text-[10px] mb-3 pb-0">
                  Back-end Stack
                </span>

                {/* === List - Back-end Stack === */}
                <ul>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://www.sanity.io/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
                      Sanity CMS
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://vercel.com/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
                      Vercel
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://github.com/samuelgoddard/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
                      Github
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://shopify.dev/docs/api/storefront"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
                      Storefront API
                      <span className="absolute inset-0 w-full h-full flex items-center justify-start">
                        <span className="block transition-transform ease-in-out duration-[350ms] w-full h-[1px] bg-current translate-y-[-100%] translate-x-[-110%] lg:group-hover:translate-x-0"></span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}


