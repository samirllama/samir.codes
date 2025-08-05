

import Image from "next/image";
import React from "react";
import SlideColumn from "./SlideColumn";
import { SlideContent } from "./slideData";


interface SlideSectionProps {
  slide: SlideContent;
}


const SlideSection: React.FC<SlideSectionProps> = ({ slide }) => {
  return (
    <section
      id={slide.id}
      
      className={`min-h-screen w-full flex items-center justify-center p-4 md:p-8 ${slide.bgColor}`}
    >
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        
        <SlideColumn>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pastel-text-main">
            {slide.title}
          </h2>
          <p className="text-base md:text-lg text-pastel-text-subtle leading-relaxed">
            {slide.text}
          </p>
          
          <div className="mt-6 h-48 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
            (Placeholder for more left content)
          </div>
        </SlideColumn>

        
        <SlideColumn>
          {slide.imageUrl ? (
            <Image
              width={1440}
              height={1900}
              src={slide.imageUrl}
              alt={`${slide.title} visual representation`}
              
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <p className="text-pastel-text-subtle">
                No image for this section
              </p>
            </div>
          )}
          
          <div className="mt-6 h-32 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
            (Placeholder for more right content)
          </div>
        </SlideColumn>
      </div>
    </section>
  );
};

export default SlideSection;
