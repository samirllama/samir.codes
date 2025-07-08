"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";

interface ScrollObjectProps extends React.ComponentPropsWithoutRef<"div"> {
  threshold?: number | number[];
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  className?: string;
}

export const ScrollObject: React.FC<ScrollObjectProps> = ({
  children,
  threshold = 0.1,
  
  freezeOnceVisible = false,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { entry, targetRef } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible,
  });

  const isIntersecting = entry?.isIntersecting || false;

  useEffect(() => {
    if (targetRef.current) {
      if (isIntersecting) {
        targetRef.current.classList.add("is-active");
      } else {
        targetRef.current.classList.remove("is-active");
      }
    }
  }, [isIntersecting, targetRef]);

  return (
    <div ref={ref} className={cn("scroll-object", className)} {...props}>
      {children}
    </div>
  );
};

export default ScrollObject;
