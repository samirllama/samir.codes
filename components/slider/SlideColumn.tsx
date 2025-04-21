// @/component/slider/SlideColumn.tsx
import React from "react";

interface SlideColumnProps {
  children: React.ReactNode;
  // other potential props: alignment
}

// This column will stick to the top while scrolling within its parent container
const SlideColumn: React.FC<SlideColumnProps> = ({ children }) => {
  return (
    <div className="sticky top-16 md:top-24 h-fit p-4 md:p-6">
      {/*
        'top-16 md:top-24': Defines the offset from the top where it sticks. Adjust as needed (e.g., header height).
        'h-fit': Height adjusts to content, crucial for sticky behavior within a scrolling context.
       */}
      <div className="bg-pastel-card shadow-md rounded-lg p-6">{children}</div>
    </div>
  );
};

export default SlideColumn;

/*
* Usage :
* We are not implementing slide-to-slide transitions here, but rendering all sections vertically to demonstrate the sticky scrolling effect WITHIN each section and AS YOU SCROLL from one section to the next.
const App: React.FC = () => {
  return (
    <main className="w-full overflow-x-hidden">
       {slides.map((slide) => (
        <SlideSection key={slide.id} slide={slide} />
      ))}

       > Optional: Add a simple footer
       <footer className="text-center p-4 bg-pastel-bg text-pastel-text-subtle text-sm">
         End of content.
       </footer>
    </main>
  );
};

export default App;

*/
