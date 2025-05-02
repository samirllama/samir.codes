// app//work/page.tsx

import Image from "next/image";
import Link from "next/link";
import { ScrollFadeWrapper } from "@/components/ui/ScrollFadeWrapper";
import { cn } from "@/lib/utils";

import MobileNavToggle from "@/components/ui/mobile-nav";

const borderRadius = "rounded-md"; // Assuming $border-radius
const spacingS = "4"; // Tailwind's spacing unit 4 (1rem = 16px)

const WorkPage: React.FC = () => {
  return (
    <main>
      <header className="flex justify-between items-center py-4 sm:py-8 border border-neon-dark">
        <h1 className="root -ml-[0.05rem] mt-4 max-w-20 sm:mt-2 sm:max-w-32 lg:mt-0 lg:max-w-40 pb-0">
          {/* Logo image */}
          <Link
            className="flex font-medium text-sm text-slate-300 hover:text-white py-1.5"
            href="/"
          >
            {/* <Image
              src="/logo.svg"
              alt="SC logo"
              fill
              className={`${borderRadius} mb-${spacingS}`}
            /> */}
            LOGO HERE
          </Link>
        </h1>
        <MobileNavToggle /> {/* === MobileNavToggle === */}
      </header>

      {/* === Portfolio section === */}
      <div className="portfolio mt-8">
        <h1 className="headline font-bold mb-4 font-mona-argon">
          My portfolio
        </h1>
        <p className="portfolio_intro font-mona-argon">
          I’ve led teams big and small, and worked with large scale, performant
          and enterprise level applications. I’m a software engineer passionate
          about solving complex problems and creating technology that improves
          lives.
          {/* Email link */}
          <a
            href="mailto:samirllama@gmail.com"
            className="text-blue-600 hover:underline"
          >
            Always love to chat about new and exciting opportunities
          </a>
          !
        </p>

        <h1 className="headline font-bold mb-4 font-mona-neon">My portfolio</h1>
        <p className="portfolio_intro font-mona-neon">
          I’ve led teams big and small, and worked with large scale, performant
          and enterprise level applications. I’m a software engineer passionate
          about solving complex problems and creating technology that improves
          lives.
          {/* Email link */}
          <a
            href="mailto:samirllama@gmail.com"
            className="text-blue-600 hover:underline"
          >
            Always love to chat about new and exciting opportunities
          </a>
          !
        </p>

        <ul className="project_list">
          <li className="project" id="bp">
            <div className="project_header">
              <h2 className="pb-4">Bio verse</h2>
              <h3>
                A system designed and built for accurately tracking inventory
              </h3>
              <p>
                While working as a Senior Software Engineer, I architected and
                built the front-end system for <em>Co Processing</em>. I also
                created the initial framework for the product.
              </p>
              <h4 className="pt-[var(--type-scale-step-4)]">Tools used</h4>
              <ul className="tools">
                <li>GraphQL</li>
                <li>AWS Appsync</li>
                <li>Postgres</li>
                <li>SQLAlchemy</li>
                <li>Python</li>
                <li>Typescript</li>
                <li>Modern Javascript</li>
                <li>React</li>
              </ul>
            </div>

            <div className="project_body">
              <div className="relative w-full h-[70%] mb-[var(--spacing-xl)]">
                <Image
                  src="/assets/bp-screen.png"
                  loading="lazy"
                  alt=""
                  fill
                  className={`${borderRadius} mb-${spacingS} mt-${spacingS} h-2`}
                />
              </div>
              <p className="pb-[var(--spacing-xs)">
                The final product was launched in late 2024, financed by BP. The
                project uses incoming Receipts data to track feed stock data and
                allocate the co-processed fuel to different pipeline, vessel and
                truck shipments. The app is a first-of-its kind, bespoke system
                that allows bp auditors to achieve accurate quality levels of
                insight for the first time.
              </p>
            </div>
          </li>

          <li className="project" id="wf">
            <div className="project_header">
              <h2 className="pb-4">Wells Fargo</h2>
              <h3>Wells Fargo's Primary Checking accpunt markegt page</h3>
              <p>
                While working as a Senior Software Engineer, I architected and
                built the front-end system for <em>Wells Fargo's</em>. I also
                created the initial framework for the product.
              </p>
              <h4 className="pt-[var(--type-scale-step-4)]">Tools used</h4>
              <ul className="tools">
                <li>GraphQL</li>
                <li>AWS Appsync</li>
                <li>Postgres</li>
                <li>Typescript</li>
                <li>Modern Javascript</li>
                <li>React</li>
              </ul>
            </div>

            <div className="project_body">
              <div className="relative w-full h-[70%] mb-[var(--spacing-xl)]">
                <Image
                  src="/assets/wf-screen.png"
                  loading="lazy"
                  alt=""
                  fill
                  className={`${borderRadius} mb-${spacingS} mt-${spacingS} h-2`}
                />
              </div>
              <p className="pb-[var(--spacing-xs)">
                The app served over 50+ Million users that allowed users to
                quickly create or signup fro an account for the first time.
              </p>
            </div>
          </li>
          <li className="project" id="di">
            <div className="project_header">
              <h2 className="pb-4">Dealer Inspire</h2>
              <h3>
                Dealer Inspire accelerates and simplifies how customers connect
                and transact with car dealers
              </h3>
              <p>
                The car business is still a people business, so Dealer Inspire
                accelerates and simplifies how customers connect and transact
                with your team to make the most of every opportunity. I also
                created the initial framework for the product.
              </p>
              <h4 className="pt-[var(--type-scale-step-4)]">Tools used</h4>
              <ul className="tools">
                <li>GraphQL</li>
                <li>Redux</li>
                <li>Postgres</li>
                <li>Typescript</li>
                <li>Modern Javascript</li>
                <li>React</li>
              </ul>
            </div>

            <div className="project_body">
              <div className="relative w-full h-[70%] mb-[var(--spacing-xl)]">
                <Image
                  src="/assets/di-screen.png"
                  loading="lazy"
                  alt=""
                  fill
                  className={`${borderRadius} mb-${spacingS} mt-${spacingS} h-2`}
                />
              </div>
              <p className="pb-[var(--spacing-xs)">
                Dealer Inspire websites provide visitors with approachable
                data-driven design, dynamic personalized messaging based on
                location and activity, and the seamlessly integrated tools to
                empower confident decisions
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Example of image/video styling within content (static elements can stay here) */}
      {/* <Image
         src="https://placehold.co/600x400"
         alt="Placeholder"
         className={`${borderRadius} mb-${spacingS} mt-${spacingS}`} // Apply rounded, mb-s, mt-s
       />
       <video controls className={`${borderRadius} mb-${spacingL} mt-${spacingS}`}> // Apply rounded, mb-l, mt-s
          <source src="your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
       </video> */}
      {/* Example of whiteonwhite image styling (static elements can stay here) */}
      {/* <Image
           src="https://placehold.co/600x400/ffffff/000000?text=White+on+White"
           alt="Placeholder"
           className={`${borderRadius} mb-${spacingS} outline outline-2 outline-${colorBorder} outline-offset-[-2px]`}
        /> */}
    </main>
  );
};

export default WorkPage;
