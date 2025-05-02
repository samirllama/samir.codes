"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const MobileNavToggle: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleOverlay = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      {/* Hamburger Icon - Displayed as inline-block by default, hidden on medium screens and up */}
      <button
        className="hamburger-icon inline-block w-[30px] h-5 relative cursor-pointer md:hidden"
        onClick={toggleOverlay}
        aria-label="Toggle navigation"
      >
        <span className="block absolute h-px w-full bg-[#333] top-0 left-0 transition-all duration-300 ease-in-out"></span>
        <span className="block absolute h-px w-full bg-[#333] top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ease-in-out"></span>
        <span className="block absolute h-px w-full bg-[#333] bottom-0 left-0 transition-all duration-300 ease-in-out"></span>
      </button>

      <nav
        className={`${
          isNavOpen
            ? "block fixed inset-0 bg-white z-50 flex flex-col items-center py-8"
            : "hidden"
        } md:block md:static md:bg-transparent md:z-auto md:flex-row md:py-0`}
      >
        {/* Close button for mobile overlay - only shown when nav is open */}
        {isNavOpen && (
          <button
            className="self-end px-6 mb-8"
            onClick={toggleOverlay}
            aria-label="Close navigation"
          >
            {/* Close icon (an X) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#333]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <ul className="list-none text-right py-3 md:py-0 flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
          <li>
            <a
              className="work text-xl md:text-base inline-block pl-4"
              href="https://samir.codes.com"
              onClick={isNavOpen ? toggleOverlay : undefined}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="work text-xl md:text-base inline-block pl-4"
              href="https://samir.codes.com/work"
              onClick={isNavOpen ? toggleOverlay : undefined}
            >
              Work
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNavToggle;
