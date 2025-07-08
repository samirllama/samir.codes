
import React from 'react';

const TypographyShowcasePage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Typography Showcase</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Current Typography (Geist Mono)</h2>
          <p className="font-mono text-lg mb-4">
            This is a sample paragraph using the current default font, Geist Mono.
            It&apos;s a monospace font, often used for code or technical documentation.
            It has a distinct, uniform character width.
          </p>
          <h3 className="text-xl font-bold mb-2">Heading 3 Example</h3>
          <p className="font-mono text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">New Typography (Transitional)</h2>
          <p className="font-transitional text-lg mb-4">
            This is a sample paragraph using the new transitional font stack.
            Transitional serifs are known for their balance of classic elegance and modern readability.
            They often feature a stronger contrast between thick and thin strokes than old-style serifs.
          </p>
          <h3 className="text-xl font-bold mb-2">Heading 3 Example</h3>
          <p className="font-transitional text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comparison of Font Weights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Current Font Weights (Geist Mono)</h3>
            <p className="font-mono font-light text-base">Light (if available)</p>
            <p className="font-mono font-normal text-base">Normal (400)</p>
            <p className="font-mono font-medium text-base">Medium (500)</p>
            <p className="font-mono font-semibold text-base">Semi-Bold (600)</p>
            <p className="font-mono font-bold text-base">Bold (700)</p>
            <p className="font-mono font-extrabold text-base">Extra Bold (800)</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">New Font Weights (Transitional)</h3>
            <p className="font-transitional font-light text-base">Light (if available)</p>
            <p className="font-transitional font-normal text-base">Normal (400)</p>
            <p className="font-transitional font-medium text-base">Medium (500)</p>
            <p className="font-transitional font-semibold text-base">Semi-Bold (600)</p>
            <p className="font-transitional font-bold text-base">Bold (700)</p>
            <p className="font-transitional font-extrabold text-base">Extra Bold (800)</p>
            <p className="font-transitional font-black text-base">Black (900)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyShowcasePage;
