import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  icon: Icon,
  isLoading = false,
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-[rgb(var(--color-mikado-yellow))] text-[rgb(var(--color-rich-black))] hover:bg-[rgb(var(--color-gold))] shadow-md hover:shadow-lg focus:ring-[rgb(var(--color-mikado-yellow))]',
    secondary:
      'bg-[rgb(var(--color-oxford-blue))] text-white hover:bg-[rgb(var(--color-oxford-blue))] focus:ring-[rgb(var(--color-mikado-yellow))]',
    outline:
      'border-2 border-[rgb(var(--color-mikado-yellow))] text-[rgb(var(--color-mikado-yellow))] hover:bg-[rgb(var(--color-mikado-yellow))] hover:text-[rgb(var(--color-rich-black))] focus:ring-[rgb(var(--color-mikado-yellow))]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : Icon && !isLoading ? (
        <span className="flex items-center">{Icon}</span>
      ) : null}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
}
