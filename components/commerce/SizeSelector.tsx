'use client';

import { cn } from '@/lib/utils';

type SizeSelectorProps = {
  sizes: string[];
  inventory: Record<string, number>;
  value: string | null;
  onChange: (size: string) => void;
  className?: string;
  /** Disables the whole control, e.g. on a sold-out product. */
  disabled?: boolean;
  /** Threshold for the "only N left" note. */
  lowStockAt?: number;
};

/**
 * Size selector. Selected state is a 1px ink border with an ivory fill; sold-out
 * sizes stay visible but disabled and struck through, because hiding them is
 * confusing at checkout.
 */
export function SizeSelector({
  sizes,
  inventory,
  value,
  onChange,
  className,
  disabled = false,
  lowStockAt = 3,
}: SizeSelectorProps) {
  const selectedStock = value ? (inventory[value] ?? 0) : 0;

  return (
    <div className={className}>
      <div
        role="radiogroup"
        aria-label="Size"
        className="flex flex-wrap gap-2"
      >
        {sizes.map((size) => {
          const stock = inventory[size] ?? 0;
          const soldOut = stock === 0;
          const isSelected = value === size;

          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled || soldOut}
              onClick={() => onChange(size)}
              title={soldOut ? `${size} — sold out` : undefined}
              className={cn(
                'relative min-h-11 min-w-[3.25rem] border px-3.5 font-sans text-[0.8125rem] transition-colors duration-200',
                isSelected
                  ? 'border-espresso bg-espresso text-ivory'
                  : 'border-taupe bg-white text-espresso hover:border-espresso',
                soldOut && 'cursor-not-allowed border-taupe/60 text-espresso-40 hover:border-taupe/60',
                soldOut && 'after:absolute after:left-2 after:right-2 after:top-1/2 after:h-px after:-translate-y-1/2 after:bg-espresso-30',
                disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {size}
            </button>
          );
        })}
      </div>

      <p className="mt-3 min-h-[1.25rem] text-[0.8125rem] text-espresso-55" role="status">
        {value && selectedStock > 0 && selectedStock <= lowStockAt
          ? `Only ${selectedStock} left in ${value}.`
          : ''}
      </p>
    </div>
  );
}
