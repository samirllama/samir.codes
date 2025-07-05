import { Timestamp } from "@/components/Timestamp";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-menu-bg py-16">
      <div className="max-w-7xl mx-auto border border-current rounded-lg p-8 md:p-12 bg-menu-bg text-menu-text">
        {/* Top section: Logo/Site Name and Grid */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12">
          {/* Logo/Site Name */}
          <div className="mb-8 md:mb-0">
            <Link href="/" className="text-4xl font-bold">
              Samir.codes
            </Link>
          </div>

          {/* Grid for content sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full md:w-3/4">
            {/* Email Signup */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Illuminate Your Inbox</h3>
              <p className="text-sm mb-4">
                Share your email for news on new products, exclusive deals, and more.
              </p>
              <form className="flex items-center border-b border-current pb-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-grow bg-transparent outline-none placeholder-menu-text/70 text-menu-text"
                />
                <button type="submit" className="ml-4 text-menu-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>123 Developer Lane</li>
                <li>Codeville, CA 90210</li>
                <li><a href="mailto:samirllama@gmail.com" className="hover:underline">samirllama@gmail.com</a></li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Social</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/samirllama" className="hover:underline">GitHub</a></li>
                <li><a href="https://linkedin.com/in/samirlama-dev" className="hover:underline">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright/Attribution */}
        <div className="mt-12 pt-8 border-t border-current flex flex-col md:flex-row justify-between items-center text-sm text-menu-text/70">
          <p>&copy; <Timestamp /> Samir.codes. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
