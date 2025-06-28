// app/work/layout.tsx
"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import AppHeader from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AppMenu from "@/components/ui/app-menu";


export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const webAppClasses = cn([
    "web-app",
    "text-15fx",
    {
      "is-active": isMenuOpen,
      "is-ready": true, // Always ready since there's no loader
    },
  ]);

  return (
    <div className={webAppClasses}>
      <AppHeader toggleAction={toggleMenu} isMenuOpen={isMenuOpen} />
      <main className="rel z:1 fs:0 min-h:100vh scroll-content">
        {children}
      </main>
      <Footer />
      <AppMenu isMenuOpen={isMenuOpen} />
    </div>
  );
}


