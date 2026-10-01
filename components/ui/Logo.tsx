import Link from 'next/link';
import { cn } from '@/lib/utils';

export type LogoVariant = 'espresso' | 'ivory' | 'monochrome';
export type LogoLockup = 'mark' | 'stacked' | 'horizontal';

export type LogoProps = {
  variant?: LogoVariant;
  lockup?: LogoLockup;
  className?: string;
  href?: string;
  /** Size of the GC monogram, as a font-size utility. */
  markSize?: string;
};

const toneClass: Record<LogoVariant, string> = {
  espresso: 'text-espresso',
  ivory: 'text-ivory',
  monochrome: 'text-current',
};

/**
 * The GC monogram — Cormorant, tight optical tracking so the pair reads as a
 * single ligature rather than two initials. Three variants, three lockups.
 */
export function Logo({
  variant = 'espresso',
  lockup = 'mark',
  className,
  href = '/',
  markSize = 'text-[1.75rem]',
}: LogoProps) {
  const wordmark = (
    <span className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.36em]">
      Goodly &amp; Chic
    </span>
  );

  const monogram = (
    <span className={cn('font-display leading-none tracking-[-0.045em]', markSize)}>GC</span>
  );

  if (lockup === 'stacked') {
    return (
      <Link
        href={href}
        className={cn('group inline-flex flex-col items-center gap-2.5', toneClass[variant], className)}
      >
        {monogram}
        <span className="flex items-center gap-2.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.4em]">
          <span className="h-px w-5 bg-champagne transition-[width] duration-300 ease-editorial group-hover:w-8" />
          Goodly &amp; Chic
        </span>
        <span className="sr-only">Goodly &amp; Chic</span>
      </Link>
    );
  }

  if (lockup === 'horizontal') {
    return (
      <Link
        href={href}
        className={cn('group inline-flex items-center gap-3', toneClass[variant], className)}
      >
        {monogram}
        <span className="h-4 w-px bg-current opacity-25" aria-hidden="true" />
        {wordmark}
        <span className="sr-only">Goodly &amp; Chic</span>
      </Link>
    );
  }

  return (
    <Link href={href} className={cn('group inline-flex items-center', toneClass[variant], className)}>
      {monogram}
      <span className="sr-only">Goodly &amp; Chic</span>
    </Link>
  );
}
