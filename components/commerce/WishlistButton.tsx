'use client';

import { Heart } from 'lucide-react';
import { track } from '@/lib/analytics';
import { useWishlistStore } from '@/stores/wishlist';
import { cn } from '@/lib/utils';

type WishlistButtonProps = {
  slug: string;
  name: string;
  className?: string;
  tone?: 'on-image' | 'plain';
  label?: string;
};

/**
 * Wishlist toggle. Reports its state in the accessible name, and announces the
 * change so the interaction is clear without a toast.
 */
export function WishlistButton({
  slug,
  name,
  className,
  tone = 'on-image',
  label,
}: WishlistButtonProps) {
  const saved = useWishlistStore((state) => state.slugs.includes(slug));
  const hydrated = useWishlistStore((state) => state.hasHydrated);
  const toggle = useWishlistStore((state) => state.toggle);
  const isSaved = hydrated && saved;

  return (
    <button
      type="button"
      onClick={() => {
        const nowSaved = toggle(slug);
        track(nowSaved ? 'wishlist_added' : 'wishlist_removed', { product: name, slug });
      }}
      aria-pressed={hydrated ? isSaved : false}
      aria-label={
        label ?? (isSaved ? `Remove ${name} from your wishlist` : `Save ${name} to your wishlist`)
      }
      className={cn(
        'flex h-11 w-11 items-center justify-center transition-colors duration-300',
        // On-image: a soft ivory disc keeps the heart legible over dark photography.
        tone === 'on-image'
          ? 'rounded-full bg-ivory/80 text-espresso backdrop-blur-[3px] hover:bg-ivory'
          : 'text-espresso hover:text-espresso-55',
        className,
      )}
    >
      <Heart
        className={cn(
          'h-[1.1rem] w-[1.1rem] transition-[fill,stroke] duration-300',
          isSaved && 'fill-espresso',
        )}
        strokeWidth={1.25}
        aria-hidden="true"
      />
    </button>
  );
}
