// app/(default)/layout.tsx

"use client";

import { useState, useEffect } from "react";

import "aos/dist/aos.css";
import { cn } from "@/lib/utils";
// import AppHeader from "@/components/ui/header-v2";
import { AppHeader } from "@/components/ui/header-v2";
import Footer from "@/components/ui/footer";
import AppMenu from "@/components/ui/app-menu";
import AppLoader from "@/components/AppLoader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Example for loader state

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // The 'is-ready' class is often applied to the body or a top-level container
  // once the initial page load and animations are complete.
  // For now, let's assume it's always ready for menu animations.

  const webAppClasses = cn([
    "web-application",
    "block",
    "w:fit",
    "rel",
    "ff:main",
    "text-15fx",
    {
      "is-ready": !isLoading, // Apply is-ready when not loading
      "is-active": isMenuOpen, // 'is-active' might be needed for menu specific animation
    },
  ]);

  return (
    <div className={webAppClasses} style={{ display: "block" }}>
      <div className="scroll-manager block">
        <AppHeader toggleAction={toggleMenu} isMenuOpen={isMenuOpen} />
        <main className="rel z:1 fs:0 min-h:100vh scroll-content">
          {children}
        </main>
        <Footer />
        <AppMenu isMenuOpen={isMenuOpen} />
      </div>
      <AppLoader active={isLoading} />
    </div>
  );
}
