"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import AppHeader from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AppMenu from "@/components/ui/app-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  const webAppClasses = cn([
    "web-app",
    "text-15fx",
    {
      "is-active": isMenuOpen,
    },
  ]);

  return (
    <div className={webAppClasses}>
      <AppHeader toggleAction={toggleMenu} isMenuOpen={isMenuOpen} />
      <main ref={mainRef} className="pt-40 relative min-h:100vh scroll-content">
        {children}
      </main>
      <Footer />
      <AppMenu isMenuOpen={isMenuOpen} onCloseMenu={closeMenu} />
    </div>
  );
}
