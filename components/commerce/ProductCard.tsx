'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QuickView } from './QuickView';
import { WishlistButton } from './WishlistButton';
import { Photo } from '@/components/ui/Photo';
import { Price } from '@/components/ui/Price';
import { Badge, badgeLabel } from '@/components/ui/Badge';
import { getProductBySlug } from '@/lib/catalog';
import { track } from '@/lib/analytics';
import { subjectForCategory, toneForCategory } from '@/lib/photos';
import { cn } from '@/lib/utils';
import type { ProductSummary } from '@/lib/types';

type ProductCardProps = {
  product: ProductSummary;
  /** `grid` shows the quick view bar and hover crossfade; `plain` is quieter. */
  variant?: 'grid' | 'plain';
  /** `light` is for espresso surfaces. */
  tone?: 'default' | 'light';
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * The product card. 4:5 image block, tracked badge, quiet metadata, and on
 * hover a slow crossfade to the second image with a Quick view bar.
 */
export function ProductCard({
  product,
  variant = 'grid',
  tone = 'default',
  priority = false,
  sizes = '(min-width: 1280px) 22vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw',
  className,
}: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const router = useRouter();
  const tone_ = toneForCategory(product.category);
  const subject = subjectForCategory(product.category);
  const label = badgeLabel(product.badge);
  const soldOut = product.status === 'OUT_OF_STOCK';
  const href = `/product/${product.slug}`;
  const light = tone === 'light';

  // The full record is needed for sizing inside the quick view.
  const full = getProductBySlug(product.slug);

  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative overflow-hidden bg-sand">
        <button
          type="button"
          onClick={() => router.push(href)}
          className="block w-full"
          aria-label={`${product.name}, ${product.price.toLocaleString('en-NG')} naira`}
        >
          <Photo
            src={product.images[0].src}
            alt={product.images[0].alt}
            ratio="product"
            tone={tone_}
            subject={subject}
            sizes={sizes}
            priority={priority}
            hoverZoom
          />
          {/* Second image crossfade */}
          {variant === 'grid' && product.images[1] && (
            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-editorial group-hover:opacity-100">
              <Photo
                src={product.images[1].src}
                alt=""
                ratio="product"
                tone={tone_}
                subject={subject}
                sizes={sizes}
                label={false}
              />
            </span>
          )}
        </button>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {label && (
            <Badge tone={soldOut ? 'solid' : 'default'}>
              {soldOut ? 'Sold out' : label}
            </Badge>
          )}
        </div>

        <div className="absolute right-1 top-1">
          <WishlistButton slug={product.slug} name={product.name} />
        </div>

        {variant === 'grid' && !soldOut && full && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-[transform,opacity] duration-400 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <button
              type="button"
              onClick={() => {
                setQuickViewOpen(true);
                track('quick_view', { product: product.name, slug: product.slug });
              }}
              className="w-full bg-ivory/95 py-3.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-espresso backdrop-blur-[4px] transition-colors duration-300 hover:bg-white"
            >
              Quick view
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <h3
          className={cn(
            'font-display text-[1.0625rem] leading-snug',
            light ? 'text-ivory' : 'text-espresso',
          )}
        >
          <Link href={href} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-3">
          <Price
            price={product.price}
            comparePrice={product.comparePrice}
            size="sm"
            tone={tone}
            className={soldOut ? 'opacity-60' : undefined}
          />
        </div>
      </div>

      {full && (
        <QuickView product={full} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
      )}
    </article>
  );
}
