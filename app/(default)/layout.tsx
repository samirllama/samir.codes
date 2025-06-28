// app/(default)/layout.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import AppHeader from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AppMenu from "@/components/ui/app-menu";
import AppLoader from "@/components/AppLoader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const webAppClasses = cn([
    "web-app",
    "text-15fx",
    {
      "is-ready": !isLoading,
      "is-active": isMenuOpen,
    },
  ]);

  return (
    <div className={webAppClasses}>
      <AppHeader toggleAction={toggleMenu} isMenuOpen={isMenuOpen} />
      <main ref={mainRef} className="rel z:1 fs:0 min-h:100vh scroll-content">
        {children}
      </main>
      <Footer />
      <AppMenu isMenuOpen={isMenuOpen} />
      <AppLoader active={isLoading} gsapContextRef={mainRef} />
    </div>
  );
}
