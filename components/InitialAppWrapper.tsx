"use client";

import React, { useState } from "react";
import AppLoader from "@/components/AppLoader";
import { HtmlReadyManager } from "@/components/AttributeManager";
import AppMenu from "@/components/ui/app-menu"; // Import AppMenu

interface InitialAppWrapperProps {
  children: React.ReactNode;
}

const InitialAppWrapper: React.FC<InitialAppWrapperProps> = ({ children }) => {
  const [isPageReady, setIsPageReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu

  const handleCurtainRevealComplete = () => {
    setIsPageReady(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <HtmlReadyManager isReady={isPageReady} />
      {!isPageReady && (
        <AppLoader onCurtainRevealComplete={handleCurtainRevealComplete} />
      )}
      <AppMenu isMenuOpen={isMenuOpen} onCloseMenu={closeMenu} /> {/* Render AppMenu */}
      {children}
    </>
  );
};

export default InitialAppWrapper;
