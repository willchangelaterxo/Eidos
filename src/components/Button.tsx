import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  disabled,
}: ButtonProps) {
  const baseClasses =
    'font-semibold rounded-xl transition-all inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-cyan-500 hover:bg-cyan-600 text-black glow-cyan',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    ghost: 'text-white hover:text-cyan-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
