"use client";

import { FaMastodon } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import AppHeader from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AppMenu from "@/components/ui/app-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const mainRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  //  nav items to match section IDs
  const navItems = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "tech-stack", label: "Tech Stack" },
    ],
    []
  );

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    /*
    `root: null`: Observer’s bounding box is the browser viewport. To watch a scrollable container instead,
    we’d pass its element here.
    `threshold: 0.25`:  number 0 → 1 meaning “what fraction of the target’s area must be visible before we fire.”
    0.25 → fire when 25% of the section enters view.
    To fire at 70%, set threshold: 0.7.

    `rootMargin: "0px 0px -60% 0px"`: Offsets (top, right, bottom, left) added to the root’s bounding box.
    Here bottom is pulled up by 60% of viewport height, so the section “exits” sooner from the observer’s view.
    If prefer pure thresholds (and no margins),  set rootMargin: "0px".
  */

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: 0.15,
      }
    );

    sections.forEach((sec) => io.observe(sec));
    return () => io.disconnect();
  }, [navItems]);

  const handleNavClick = (
    id: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    /*
    ? scrollAndHash()
      * el.scrollIntoView({ behavior: "smooth" }) animates the scroll.
      *  history.replaceState updates the URL hash without a page reload.
    */
    const scrollAndHash = () => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    };

    /*
    ? document.startViewTransition(fn)
        * Before & after snapshots of the DOM are captured.
        * fn runs (scroll + hash change).
        * Browser animates between the two states.
        * If unsupported, we just call fn directly.
    */
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(scrollAndHash);
    } else {
      scrollAndHash();
    }
  };
  return (
    <div className={cn("web-app", { "is-active": isMenuOpen })}>
      <AppHeader toggleAction={toggleMenu} isMenuOpen={isMenuOpen} />
      <AppMenu isMenuOpen={isMenuOpen} onCloseMenuAction={closeMenu} />

      <div className="pageLayout--col4">
        <main
          ref={mainRef}
          className="pt-fluid-xl mt-fluid-xl relative min-h-screen scroll-content pageLayout--main"
        >
          {children}
        </main>

        <aside className="aside-col--left sticky top-0 h-screen">
          <div className="pageLayout--fixed--100vh">
            <div className="aside-module--root">
              <div className="aside-module--pos_center">
                <nav className="flex flex-col space-y-4 p-6">
                  {navItems.map(({ id, label }) => (
                    <Link
                      key={id}
                      href={`#${id}`}
                      scroll={false}
                      onClick={(e) => handleNavClick(id, e)}
                      className={cn(
                        "text-left  transition-all duration-200 block",
                        activeId === id
                          ? "text-accent-primary underline scale-105"
                          : "text-default hover:text-accent-primary"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </aside>
        <aside className="pageLayout--aside--right">
          <div className="pageLayout--fixed--100vh">
            <div className="aside-module--root">
              <div className="aside-module--pos_center">
                <nav className="content-nav" aria-label="Socials">
                  <a
                    href="https://linkedin.com/in/samirlama-dev"
                    className="self-socials-nav--link"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Follow me on github"
                  >
                    <div className="socials-nav--icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="socials-nav--icon-svg"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M22.247 0H1.753C.741 0 0 .74 0 1.753v20.494C0 23.17.83 24 1.753 24h20.494C23.264 24 24 23.26 24 22.247V1.753C24 .741 23.17 0 22.247 0zM7.383 20.306h-3.69V9.23h3.695v11.076h-.005zM5.54 7.753c-1.2 0-2.218-1.017-2.218-2.217S4.34 3.319 5.54 3.319s2.217 1.017 2.217 2.217S6.74 7.753 5.54 7.753zm14.765 12.553h-3.694V14.77c0-1.476-.37-2.953-1.846-2.953-1.477 0-1.847 1.477-1.847 2.953v5.54H9.225V9.23h3.694v1.293h.183c.459-.923 1.659-1.659 3.046-1.659 3.418 0 4.154 2.217 4.154 4.983v6.46h.004z"
                        ></path>
                      </svg>
                    </div>
                  </a>
                  <a
                    href="https://github.com/samirllama"
                    className="self-socials-nav--link"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Connect on linkedin"
                  >
                    <div className="socials-nav--icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="socials-nav--icon-svg"
                        aria-hidden="true"
                      >
                        <g clipPath="url(#a)">
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M12.04 0A12.024 12.024 0 0 0 0 12.04c0 5.297 3.451 9.792 8.267 11.397.642.08.803-.24.803-.562v-2.087c-3.371.723-4.094-1.605-4.094-1.605-.561-1.364-1.364-1.766-1.364-1.766-1.124-.722.08-.722.08-.722 1.204.08 1.846 1.204 1.846 1.204 1.044 1.846 2.81 1.284 3.532.963.08-.802.401-1.284.803-1.605-2.65-.321-5.458-1.365-5.458-5.94a4.78 4.78 0 0 1 1.204-3.21c-.161-.321-.562-1.525.08-3.21 0 0 1.043-.322 3.29 1.203.964-.24 2.007-.401 3.05-.401 1.044 0 2.088.16 3.05.401 2.328-1.525 3.292-1.204 3.292-1.204.642 1.686.24 2.89.08 3.21.803.803 1.204 1.927 1.204 3.211 0 4.656-2.81 5.619-5.458 5.94.401.401.803 1.124.803 2.247v3.291c0 .321.24.722.802.562A11.959 11.959 0 0 0 24 11.959C24.08 5.378 18.702 0 12.04 0z"
                            clipRule="evenodd"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </a>

                  <a
                    href="https://mastodon.social/@samirdev"
                    className="self-socials-nav--link"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Follow me on github"
                  >
                    <div className="socials-nav--icon-wrapper">
                      <FaMastodon className="socials-nav--icon-svg" />
                    </div>
                  </a>
                  <a
                    className="self-socials-nav--link"
                    href="https://twitter.com/samirllama"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Follow me on twitter"
                  >
                    <div className="socials-nav--icon-wrapper">
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
                    </div>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
