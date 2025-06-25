// app/(default)/layout.tsx

"use client";

import { useState, useEffect } from "react";
import "aos/dist/aos.css";
import { cn } from "@/lib/utils";
import AppHeader from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AppMenu from "@/components/ui/app-menu";
import AppLoader from "@/components/AppLoader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const webAppClasses = cn([
    "web-application",
    "block",
    "w:fit",
    "rel",
    "ff:main",
    "text-15fx",
    {
      "is-ready": !isLoading, // Apply is-ready when not loading
      "is-active": isMenuOpen,
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
