// components/MDXRenderer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';

interface MDXRendererProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ code, components }) => {
  const [isLoading, setIsLoading] = useState(true);
  const MDXContent = useMDXComponent(code);

  useEffect(() => {
    // Simulate a loading delay or check for some condition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [code]); // Re-run effect if the code prop changes

  if (isLoading) {
    return <div>Loading MDX Content...</div>; // Or your custom loading indicator
  }

  return <MDXContent components={components} />;
};

export default MDXRenderer;
