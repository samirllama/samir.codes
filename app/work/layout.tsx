// app/work/layout.tsx
"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import AppHeader from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AppMenu from "@/components/ui/app-menu";
import RevealLoader from "@/components/RevealLoader";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Callback will be triggered by Loader when its animation completes
  const handleLoaderAnimationComplete = () => {
    // Set isLoading to false, indicating content fully revealed
    setIsLoading(false);
  };

  const webAppClasses = cn([
    "web-app",
    "text-15fx",
    {
      "is-active": isMenuOpen,
      "is-ready": !isLoading, // Apply "is-ready" when content is fully loaded and revealed
    },
  ]);

  return (
    <div className={webAppClasses}>
      {/* RevealLoader wraps app content (header, main, footer, menu).
            It controls initial loading animation and reveals `children` and other elements.
        */}
      <RevealLoader
        initLoadingState={isLoading}
        onAnimationComplete={handleLoaderAnimationComplete}
      >
        {/* Children of RevealLoader, will be revealed after the animation */}
        <AppHeader toggleAction={toggleMenu} isMenuOpen={isMenuOpen} />
        <main className="rel z:1 fs:0 min-h:100vh scroll-content">
          {children}
        </main>
        <Footer />
        <AppMenu isMenuOpen={isMenuOpen} />
      </RevealLoader>
    </div>
  );
}

export function WorkLayout_({ children }: { children: React.ReactNode }) {
  const colorPlain = "bg-hdr-gradient";

  return (
    <div
      className={cn([
        "box-border block w-full mx-auto",
        `${colorPlain} bg-fixed`,
        "pt-0 pb-16",
        `md:px-8 px-6`,
        "lg:max-w-[70em]",
      ])}
    >
      {children}
    </div>
  );
}
