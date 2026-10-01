import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2.5 rounded-sm font-sans text-label font-medium uppercase tracking-[0.14em] transition-colors duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-45';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-espresso text-ivory hover:bg-espresso-70',
  secondary: 'border border-espresso bg-transparent text-espresso hover:bg-espresso hover:text-ivory',
  light: 'bg-ivory text-espresso hover:bg-white',
  text: 'text-espresso underline-offset-[6px] hover:underline',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-[0.625rem]',
  md: 'min-h-12 px-7 text-[0.6875rem]',
  lg: 'min-h-14 px-9 text-[0.75rem]',
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Adds the `→` arrow that every primary action carries. */
  withArrow?: boolean;
  children: React.ReactNode;
};

const Arrow = () => (
  <ArrowRight
    className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-editorial group-hover/btn:translate-x-1"
    strokeWidth={1.25}
    aria-hidden="true"
  />
);

const classes = (variant: ButtonVariant, size: ButtonSize, className?: string) =>
  cn(base, variants[variant], sizes[size], variant === 'text' && 'min-h-0 px-0', className);

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  withArrow = false,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  withArrow = false,
  href,
  children,
  ...rest
}: CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string }) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes(variant, size, className)}
        target="_blank"
        rel="noreferrer noopener"
        {...rest}
      >
        {children}
        {withArrow && <Arrow />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}
