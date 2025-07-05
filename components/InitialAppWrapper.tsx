"use client";

import React, { useState } from "react";
import AppLoader from "@/components/AppLoader";
import { HtmlReadyManager } from "@/components/AttributeManager";

interface InitialAppWrapperProps {
  children: React.ReactNode;
}

const InitialAppWrapper: React.FC<InitialAppWrapperProps> = ({ children }) => {
  const [isPageReady, setIsPageReady] = useState(false);

  const handleCurtainRevealComplete = () => {
    setIsPageReady(true);
  };

  return (
    <>
      <HtmlReadyManager isReady={isPageReady} />
      {!isPageReady && (
        <AppLoader onCurtainRevealComplete={handleCurtainRevealComplete} />
      )}
      {children}
    </>
  );
};

export default InitialAppWrapper;
