"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const themes = ["light", "dark"];
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("THEME TOGGLE:", { theme });
  }, [theme]);

  const iconRef = useRef(null);

  useEffect(() => {
    if (mounted && iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { className: cn("theme-toggle-icon-initial") },
        {
          className: cn("theme-toggle-icon-final"),
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme || "light");
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Activate light mode" : "Activate dark mode"
      }
      variant="ghost"
      className="px-2" // Adjust padding for icon-only button
    >
      {theme === "dark" ? (
        <SunIcon
          ref={iconRef}
          className="h-6 w-6 text-slate-400 hover:text-slate-200"
        />
      ) : (
        <MoonIcon
          ref={iconRef}
          className="h-6 w-6 text-slate-500 hover:text-slate-800"
        />
      )}
    </Button>
  );
}
