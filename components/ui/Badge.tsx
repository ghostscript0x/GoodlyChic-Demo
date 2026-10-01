import { cn } from '@/lib/utils';
import type { ProductBadge } from '@/lib/types';

/** Small tracked label. Never a bright colour — ink on the image surface. */
export function Badge({
  children,
  tone = 'default',
  className,
}: {
  children: React.ReactNode;
  tone?: 'default' | 'light' | 'solid';
  className?: string;
}) {
  const tones = {
    default: 'bg-white/90 text-espresso',
    light: 'bg-ivory/90 text-espresso',
    solid: 'bg-espresso text-ivory',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1.5 font-sans text-[0.5625rem] font-medium uppercase tracking-[0.18em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Maps a product badge to its on-screen label. */
export function badgeLabel(badge: ProductBadge): string | null {
  switch (badge) {
    case 'NEW':
      return 'New';
    case 'LIMITED':
      return 'Limited';
    case 'BESTSELLER':
      return 'Bestseller';
    case 'LOW_STOCK':
      return 'Low stock';
    default:
      return null;
  }
}

/** Order status chip, used on the confirmation and account pages. */
export function StatusChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 border border-champagne px-3 py-1.5 font-sans text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-espresso">
      <span className="h-1.5 w-1.5 rounded-full bg-champagne" aria-hidden="true" />
      {label}
    </span>
  );
}
