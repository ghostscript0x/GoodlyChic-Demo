'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { track } from '@/lib/analytics';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/lib/types';

type AddToCartButtonProps = {
  product: Product;
  size: string | null;
  quantity?: number;
  colour?: Product['colours'][number];
  label?: string;
  className?: string;
  variant?: 'primary' | 'light';
  onAdded?: () => void;
  /** Disables the button until a size is chosen. */
  requireSize?: boolean;
};

/**
 * Adds a piece to the bag and opens the drawer with a gentle confirmation.
 * When a size is required but not yet chosen, the button asks for one instead
 * of silently failing.
 */
export function AddToCartButton({
  product,
  size,
  quantity = 1,
  colour,
  label = 'Add to bag',
  className,
  variant = 'primary',
  onAdded,
  requireSize = true,
}: AddToCartButtonProps) {
  const add = useCartStore((state) => state.add);
  const [nudge, setNudge] = useState(false);

  const chosenColour = colour ?? product.colours[0];

  const handleClick = useCallback(() => {
    if (requireSize && !size) {
      setNudge(true);
      return;
    }
    setNudge(false);
    add({ product, size: size ?? product.sizes[0], colour: chosenColour, quantity });
    track('add_to_cart', {
      product: product.name,
      slug: product.slug,
      size: size ?? product.sizes[0],
      quantity,
      value: product.price * quantity,
    });
    onAdded?.();
  }, [add, chosenColour, onAdded, product, quantity, requireSize, size]);

  useEffect(() => {
    if (!nudge || size) return;
    const timer = window.setTimeout(() => setNudge(false), 2600);
    return () => window.clearTimeout(timer);
  }, [nudge, size]);

  return (
    <div className={className}>
      <Button
        variant={variant}
        size="md"
        onClick={handleClick}
        aria-describedby={nudge ? 'size-nudge' : undefined}
        className="w-full"
      >
        {label}
      </Button>
      {nudge && (
        <p id="size-nudge" role="alert" className="mt-2 text-[0.8125rem] text-espresso">
          Choose a size first.
        </p>
      )}
    </div>
  );
}
