import { useEffect, useState } from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ size = 'md', fullScreen = false, className = '' }: LoadingProps) {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  
  const sizeClasses = {
    sm: 'w-1 h-1 gap-1',
    md: 'w-2 h-2 gap-1.5',
    lg: 'w-3 h-3 gap-2',
  };

  const containerSizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  useEffect(() => {
    // Function to generate random indices
    const generateRandomIndices = () => {
      const numDots = Math.floor(Math.random() * 8) + 3; // Random number between 3 and 10 dots
      const indices = new Set<number>();
      while (indices.size < numDots) {
        indices.add(Math.floor(Math.random() * 25));
      }
      return Array.from(indices);
    };

    // Update active dots every 300ms
    const interval = setInterval(() => {
      setActiveIndices(generateRandomIndices());
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const renderGrid = () => {
    return Array.from({ length: 25 }).map((_, index) => (
      <div
        key={index}
        className={`rounded-full transition-all duration-300 ease-in-out ${
          activeIndices.includes(index)
            ? 'bg-[rgb(var(--color-mikado-yellow))] scale-125'
            : 'bg-[rgb(var(--color-mikado-yellow))] opacity-20 scale-100'
        } ${sizeClasses[size]}`}
      />
    ));
  };

  const gridComponent = (
    <div className="flex flex-col items-center">
      <div className={`grid grid-cols-5 ${containerSizeClasses[size]}`}>
        {renderGrid()}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgb(var(--color-rich-black))] bg-opacity-50 backdrop-blur-sm z-50">
        {gridComponent}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {gridComponent}
    </div>
  );
}