import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaMastodon } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Timestamp } from "@/components/Timestamp";
import { ArrowLink, AnimatedArrow } from "@/components/ui/arrow";
import ArrowDemo from "@/components/ui/arrow-line";

export default function Footer() {
  return (
    <footer className="bg-menu-bg py-16 px-8 md:px-12 w-screen relative left-1/2 -translate-x-1/2 min-h-[70vh] flex flex-col justify-center items-center">
      <div className="border-2 border-black max-w-8xl mx-auto text-menu-text font-transitional flex-grow flex flex-col pb-10 justify-center items-center">
        {/* Main content area, now a grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full flex-grow items-center">
          {/* Column 1: Logo */}
          <div className="flex flex-col justify-start h-full">
            <div className="mb-8 md:mb-0">
              <Link href="/" className="text-4xl font-bold">
                Samir.codes
              </Link>
            </div>
          </div>

          {/* Column 2: Social Links (Center and Prominent) */}
          <div className="flex flex-wrap justify-around gap-8 text-xl">
            <a
              href="mailto:samirllama@gmail.com"
              className="flex items-center hover:text-timeline-accent transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <MdEmail className="mr-2 text-3xl" /> Email
            </a>
            <a
              href="https://github.com/samirllama"
              className="flex items-center hover:text-timeline-accent transition-all duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-2 text-3xl" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/samirlama-dev"
              className="flex items-center hover:text-timeline-accent transition-all duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="mr-2 text-3xl" /> LinkedIn
              <AnimatedArrow />
            </a>
            <ArrowLink href="" />
            <a
              href="https://twitter.com/samirllama"
              className="flex items-center hover:text-timeline-accent transition-all duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="mr-2 text-3xl" /> Twitter
            </a>

            <a
              href="https://mastodon.social/@samirllama"
              className="flex items-center hover:text-timeline-accent transition-all duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMastodon className="mr-2 text-3xl" /> Mastodon
            </a>
            <a
              href=""
              className="link-w-arrow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AnimatedArrow />X
            </a>
            <a
              href=""
              className="link-w-arrow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowDemo />X
            </a>
          </div>

          {/* Column 3: Empty for now */}
          <div></div>
        </div>

        {/* Bottom Copyright/Attribution Row */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-menu-text/70 w-full">
          <p>
            &copy; <Timestamp /> Samir.codes. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">Crafted with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
