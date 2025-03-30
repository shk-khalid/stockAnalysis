import { cn } from '../../lib/utils';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: boolean;
}

export function Card({ children, className, gradient, ...props }: CardProps) {
  return (
    <div
      className={cn(
        // Default to a dark blue card with gold-accented border and subtle shadow.
        'rounded-lg shadow-md p-8 bg-[rgb(var(--color-oxford-blue))] border border-gray-600/40',
        // If gradient is desired, override with a lighter variant.
        gradient && 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
