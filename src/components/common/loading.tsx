import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ size = 'md', fullScreen = false, className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgb(var(--color-rich-black))] bg-opacity-50 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 
            className={`animate-spin text-[rgb(var(--color-mikado-yellow))] ${sizeClasses[size]} ${className}`}
          />
          <p className="text-white text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Loader2 
      className={`animate-spin text-[rgb(var(--color-mikado-yellow))] ${sizeClasses[size]} ${className}`}
    />
  );
}