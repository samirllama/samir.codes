// components/ScrollSlide.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function ScrollSlide() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Basic height synchronization
  useEffect(() => {
    const setHeights = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        containerRef.current.style.setProperty('--slide-height', `${height}px`);
      }
    };

    setHeights();
    window.addEventListener('resize', setHeights);
    return () => window.removeEventListener('resize', setHeights);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto relative scroll-smooth"
    >
      {/* Main Grid Container */}
      <div className="grid grid-cols-[40fr_5fr_5fr_40fr] min-h-[var(--slide-height)]">
        {/* Left Sticky Column */}
        <div
          ref={leftColRef}
          className="sticky top-0 h-[var(--slide-height)] flex flex-col justify-between p-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Section Title</h2>
            <p className="text-lg">Section content that remains sticky...</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-black text-white rounded-full">
              Previous
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-full">
              Next
            </button>
          </div>
        </div>

        {/* Right Sticky Column */}
        <div
          ref={rightColRef}
          className="sticky top-0 h-[var(--slide-height)] col-start-4 flex items-center justify-center"
        >
          <div className="w-full max-w-md h-64 bg-gray-100 rounded-xl" />
        </div>

        {/* Scroll Content */}
        <div className="col-span-full row-start-1 min-h-[200vh]">
          <div className="grid grid-cols-[40fr_5fr_5fr_40fr]">
            {/* Content that scrolls between columns */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-screen p-8 border-t">
                <p className="text-lg">Scrollable content section {i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
