'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterChipProps = {
  label: string;
  onRemove?: () => void;
  onClick?: () => void;
  tone?: 'default' | 'light';
  className?: string;
};

/** Removable filter chip. Selected state is a 1px ink border, not a heavy fill. */
export function FilterChip({
  label,
  onRemove,
  onClick,
  tone = 'default',
  className,
}: FilterChipProps) {
  const light = tone === 'light';
  const interactive = Boolean(onClick ?? onRemove);

  const content = (
    <>
      {label}
      {onRemove && (
        <X className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
      )}
    </>
  );

  const base = cn(
    'inline-flex min-h-9 items-center gap-2 border px-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200',
    light
      ? 'border-ivory/30 text-ivory hover:border-ivory'
      : 'border-taupe text-espresso hover:border-espresso',
    className,
  );

  if (!interactive) return <span className={base}>{content}</span>;

  if (onRemove) {
    return (
      <button type="button" onClick={onRemove} className={base}>
        <span className="sr-only">Remove filter: </span>
        {content}
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {content}
    </button>
  );
}

/** Generic pill used for search suggestions and popular chips. */
export function Chip({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-11 items-center border border-taupe px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-espresso transition-colors duration-200 hover:border-espresso',
        className,
      )}
    >
      {children}
    </button>
  );
}
