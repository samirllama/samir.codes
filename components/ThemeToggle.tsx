"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react"; // Example icons
import Button from "./ui/Button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm" // Use a smaller size consistent with header icons
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Activate light mode" : "Activate dark mode"
      }
      className="px-2" // Adjust padding for icon-only button
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-slate-400 hover:text-slate-200" />
      ) : (
        <MoonIcon className="h-5 w-5 text-slate-500 hover:text-slate-800" />
      )}
    </Button>
  );
}
