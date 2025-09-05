"use client";

import { useEffect } from "react";
import { Animations } from "@/lib/animations";

export function PostAnimations() {
  useEffect(() => {
    Animations.initPostAnimations();

    Animations.pageTransition();
  }, []);

  return null;
}
