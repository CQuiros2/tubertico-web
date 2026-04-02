import Link from 'next/link';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-orange-light shadow-md hover:shadow-lg',
  secondary:
    'bg-brand-green text-white hover:bg-brand-green-mid shadow-md hover:shadow-lg',
  outline:
    'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white',
  ghost: 'text-brand-green hover:bg-brand-green/10',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', href, external, className = '', children, ...props },
    ref
  ) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
