import Link from "next/link";
import { FaGithub, FaLinkedin, FaMastodon } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Timestamp } from "@/components/Timestamp";
import { AnimatedArrow } from "@/components/ui/arrow";

export default function Footer() {
  return (
    <footer className="bg-menu-bg py-16 px-8 md:px-12 w-screen relative left-1/2 -translate-x-1/2 min-h-[70vh] flex flex-col justify-center items-center">
      <div className="max-w-8xl mx-auto text-menu-text font-transitional flex-grow flex flex-col pb-10 justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full flex-grow items-center">
          {/* Column 1: Logo */}
          <div className="flex flex-col justify-start h-full">
            <div className="mb-8 md:mb-0">
              <Link href="/" className="text-4xl font-bold">
                Samir.codes
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-around gap-8 text-xl">
            <a
              href="mailto:samirllama@gmail.com"
              className="flex items-center hover:text-text transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <MdEmail className="mr-2 text-3xl" /> Email
              <AnimatedArrow />
            </a>
            <a
              href="https://github.com/samirllama"
              className="flex items-center hover:text-inverted transition-all duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-2 text-3xl" /> GitHub
              <AnimatedArrow />
            </a>
            <a
              href="https://linkedin.com/in/samirlama-dev"
              className="flex items-center hover:text-inverted transition-all duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="mr-2 text-3xl" /> LinkedIn
              <AnimatedArrow />
            </a>
            <a
              href="https://x.com/Baki_cakes"
              className="flex items-center hover:text-inverted transition-all duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="socials-nav--icon-svg ariaHidden"
                aria-hidden="true"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
                  fill="currentColor"
                ></path>
              </svg>
              <AnimatedArrow />
            </a>
            <a
              href="https://mastodon.social/@samirdev"
              className="flex items-center hover:text-inverted transition-all duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMastodon className="mr-2 text-3xl" />
              Mastodon
              <AnimatedArrow />
            </a>
          </div>
          Xz
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
