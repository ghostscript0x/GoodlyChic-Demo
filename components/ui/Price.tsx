import { discountPercent, formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

type PriceProps = {
  price: number;
  comparePrice?: number | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tone?: 'default' | 'light';
};

/** Price with an optional struck-through compare-at price. */
export function Price({
  price,
  comparePrice = null,
  size = 'md',
  className,
  tone = 'default',
}: PriceProps) {
  const discount = discountPercent(price, comparePrice);
  const sizes = {
    sm: 'text-[0.8125rem]',
    md: 'text-[0.9375rem]',
    lg: 'text-lg',
  } as const;

  return (
    <p
      className={cn(
        'flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-sans tabular-nums',
        tone === 'light' ? 'text-ivory' : 'text-espresso',
        className,
      )}
    >
      <span className={sizes[size]}>{formatPrice(price)}</span>
      {comparePrice && comparePrice > price && (
        <>
          <span
            className={cn(
              sizes[size],
              'line-through',
              tone === 'light' ? 'text-ivory-55' : 'text-espresso-40',
            )}
          >
            {formatPrice(comparePrice)}
          </span>
          {discount && (
            <span
              className={cn(
                'text-label uppercase',
                tone === 'light' ? 'text-champagne' : 'text-espresso-55',
              )}
              aria-label={`${discount}% off`}
            >
              {discount}% off
            </span>
          )}
        </>
      )}
    </p>
  );
}
