// app/galactic/layout.tsx
import React from "react";
import styles from "./galactic.module.css";

interface GalacticViewLayoutProps {
  children: React.ReactNode;
}

const GalacticViewLayout: React.FC<GalacticViewLayoutProps> = ({
  children,
}) => {
  return (
    // Outermost container: relative positioning context, overflow hidden, full height
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Effect Layer 1 (Inspired by galaxy-map__effect1) */}
      {/* Slightly larger than viewport, slower drift animation */}
      <div
        className={`
          ${styles.effectLayer} ${styles.animateDrift1}
          absolute -inset-10 z-10
          bg-[radial-gradient(ellipse_at_center,_rgba(30,60,150,0.3)_0%,_rgba(10,20,80,0.5)_70%,_rgba(5,10,40,0.8)_100%)]
          opacity-70
          pointer-events-none
        `}
      />

      {/* Effect Layer 2 (Inspired by galaxy-map__effect2) */}
      {/* Fits viewport, different/faster animation, maybe different visual */}
      <div
        className={`
          ${styles.effectLayer} ${styles.animateDrift2}
          absolute inset-0 z-2
          bg-[url('/assets/spiral-galaxy-4k.png')]
          bg-repeat opacity-30
          mix-blend-mode-screen
          pointer-events-none
        `}
      />

      {/* Optional: Subtle Vignette Effect */}
      <div className="absolute inset-0 z-25 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_60%,_rgba(0,0,0,0.7)_100%)]" />

      {/* Content Wrapper (Inspired by .content and .galaxy-map container) */}
      {/* Sits above effects, handles content layout, subtle float animation */}
      <div
        className={`
          ${styles.contentWrapper} ${styles.animateFloat} relative z-30 min-h-screen w-full
          flex flex-col items-center justify-center text-slate-200  p-4 sm:p-8 perspective-[200px]
        `}
      >
        {children} {/* Where the actual page content will be rendered */}
      </div>
    </div>
  );
};

export default GalacticViewLayout;
