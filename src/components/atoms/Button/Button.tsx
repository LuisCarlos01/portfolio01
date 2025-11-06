import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-colors duration-base ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variant === 'primary' &&
            'bg-primary text-primary-foreground hover:bg-primary-hover',
          variant === 'secondary' &&
            'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
          variant === 'ghost' && 'bg-transparent hover:bg-muted',
          size === 'sm' && 'px-3 py-1.5 text-body-sm',
          size === 'md' && 'px-4 py-2 text-body-base',
          size === 'lg' && 'px-6 py-3 text-body-lg',
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 animate-spin" aria-hidden="true">
            ⏳
          </span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
