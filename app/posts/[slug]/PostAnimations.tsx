"use client";

import { useEffect } from "react";
import { Animations } from "@/lib/animations";

export function PostAnimations() {
  useEffect(() => {
    // Initialize post animations when component mounts
    Animations.initPostAnimations();

    // Optional: Add page transition
    Animations.pageTransition();
  }, []);

  return null; // This component doesn't render anything
}
