import { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}