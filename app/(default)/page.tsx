// app/page.tsx

import ProjectStack from "@/components/project-stack";
import HeroSection from "../../components/HeroSection";

const myProjects = [
  { id: 1, name: "British Petroleum", link: "/projects/wells-fargo" },
  { id: 2, name: "Wells Fargo", link: "/projects/wells-fargo" },
  { id: 3, name: "Dealer Inspire", link: "/projects/dealer-inspire" },
  { id: 4, name: "Expedia", link: "/projects/expedia" },
  { id: 5, name: "Domino's", link: "/projects/dominos" },
  // ... more projects to add
];

export default function Home() {
  return (
    <article>
      <HeroSection />
      <ProjectStack projects={myProjects} />

      <section className="pb-[20vw] lg:pb-[12.5vw]">
        <h2 className="font-mono uppercase tracking-tight leading-[1] text-[10px] mb-5 pb-0 relative overflow-hidden">
          <span
            className="block"
            style={{ transform: "translateY(0%) translateZ(0px)" }}
          >
            Professional Summary
          </span>
        </h2>
        <ul className="uppercase border-t border-white/30">
          <li className="block">
            <span className=" border-b border-white/30 w-full py-2 lg:py-1 block lg:flex lg:items-end">
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
                        Senior Software Engineer
                      </span>
                    </span>
                    <span className="block font-serif italic text-[clamp(14px,0.7rem+0.65vw,25px)] tracking-normal leading-none pl-2 pr-1 translate-y-[-45%] md:translate-y-[-30%] lg:translate-y-[-32%]">
                      (2021 - Present)
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
                      <span className="block ms-text-adjust">
                        Senior Software Engineer
                      </span>
                    </span>
                    <span className="block font-serif italic text-[clamp(14px,0.7rem+0.65vw,25px)] tracking-normal leading-none pl-2 pr-1 translate-y-[-45%] md:translate-y-[-30%] lg:translate-y-[-32%]">
                      (2020 - 2021)
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
                      <span className="block ms-text-adjust">
                        Software Engineer
                      </span>
                    </span>
                    <span className="block font-serif italic text-[clamp(14px,0.7rem+0.65vw,25px)] tracking-normal leading-none pl-2 pr-1 translate-y-[-45%] md:translate-y-[-30%] lg:translate-y-[-32%]">
                      (2019 - 2020)
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </li>
        </ul>
      </section>

      {/* Tech Stack */}
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
              Tools I've used to bring visions to life.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="mb-8 lg:mb-12 col-span-1">
                <span className="uppercase block font-mono  tracking-tight leading-none text-[10px] mb-3 pb-0">
                  Front-end Stack
                </span>
                <ul>
                  <li className=" leading-[1.1] block text-2xl tracking-tight relative mb-[3px]">
                    <a
                      href="https://react.dev/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative group a11y-focus overflow-hidden inline-block"
                    >
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
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
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
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
                      <span className="block absolute bottom-0 left-0 w-full h-[1px] translate-y-[-1px] bg-white/50"></span>
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
                </ul>
              </div>
              <div className="col-span-1">
                <span className="uppercase block font-mono  tracking-tight leading-none text-[10px] mb-3 pb-0">
                  Back-end Stack
                </span>
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
