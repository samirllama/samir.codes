
import React from "react";

interface SlideColumnProps {
  children: React.ReactNode;
  
}


const SlideColumn: React.FC<SlideColumnProps> = ({ children }) => {
  return (
    <div className="sticky top-16 md:top-24 h-fit p-4 md:p-6">
      
      <div className="bg-pastel-card shadow-md rounded-lg p-6">{children}</div>
    </div>
  );
};

export default SlideColumn;


