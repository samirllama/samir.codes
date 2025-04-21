"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import Button from "./ui/Button";

const themes = ["light", "dark", "mocha-mousse"];
export default function ThemeToggle() {
  // useTheme hook provides the current theme and the setTheme function
  // 'theme' can be 'light', 'dark', 'mocha-mousse', 'system', or undefined on initial render
  // 'resolvedTheme' will be 'light' or 'dark' if 'system' is the theme, otherwise matches 'theme'
  // 'themes' is the list of themes provided to ThemeProvider (['light', 'dark', 'mocha-mousse'] in your case)
  // 'setTheme' is the function to change the theme
  // 'systemTheme' is 'light' or 'dark' based on the user's OS preference
  const { theme, setTheme, resolvedTheme } = useTheme();

  // State to track if the component has mounted. This is crucial for
  // avoiding hydration mismatches as next-themes reads localStorage
  // which is only available on the client side.
  const [mounted, setMounted] = useState(false);

  // useEffect runs only on the client side after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("THEME TOGGLE:", { theme });
  }, [theme]);

  // If the component is not mounted, render a placeholder or null
  // This prevents rendering a UI that might not match the server-rendered HTML
  if (!mounted) {
    // You can return a loading spinner or a placeholder div here
    // For now, returning null to render nothing until mounted
    return null;
  }

  // Determine the currently displayed theme for the button text/icon
  // Use 'resolvedTheme' if 'enableSystem' is true and 'theme' is 'system'
  const currentThemeDisplay =
    theme === "system" ? `${resolvedTheme} (System)` : theme;

  // Function to cycle through the defined themes
  const toggleTheme = () => {
    // Start from light if theme is undefined initially
    const currentIndex = themes.indexOf(theme || "light");
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
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
      {currentThemeDisplay}
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-slate-400 hover:text-slate-200" />
      ) : (
        <MoonIcon className="h-5 w-5 text-slate-500 hover:text-slate-800" />
      )}
    </Button>
  );
}
