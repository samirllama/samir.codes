"use client";

import AppLoader from "@/components/AppLoader";
import { useState } from "react";

export default function TestLoaderPage() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  const handleLoaderComplete = () => {
    setLoaderComplete(true);
    
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gray-200">
      {!loaderComplete && (
        <AppLoader onCurtainRevealComplete={handleLoaderComplete} />
      )}
      {loaderComplete && (
        <h1 className="text-4xl font-bold text-gray-800">Loader Test Complete!</h1>
      )}
    </div>
  );
}
