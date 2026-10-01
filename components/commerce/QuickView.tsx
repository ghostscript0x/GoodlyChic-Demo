'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SizeSelector } from './SizeSelector';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Overlay } from '@/components/ui/Overlay';
import { Photo } from '@/components/ui/Photo';
import { Price } from '@/components/ui/Price';
import { AddToCartButton } from './AddToCartButton';
import { WishlistButton } from './WishlistButton';
import { subjectForCategory, toneForCategory } from '@/lib/photos';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

/** Quick view: enough to decide, with a direct path into the full product page. */
export function QuickView({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const [size, setSize] = useState<string | null>(null);
  const soldOut = product.status === 'OUT_OF_STOCK';

  return (
    <Overlay
      open={open}
      onClose={onClose}
      mode="modal"
      labelledBy={`quickview-title-${product.slug}`}
      panelClassName="w-[min(94vw,54rem)] p-0"
    >
      <div className="grid flex-1 grid-cols-1 overflow-y-auto sm:grid-cols-2">
        <div className="bg-sand">
          <Photo
            src={product.images[0].src}
            alt={product.images[0].alt}
            ratio="product"
            tone={toneForCategory(product.category)}
            subject={subjectForCategory(product.category)}
            sizes="(min-width: 640px) 27rem, 94vw"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4 pr-10">
            <div>
              <p className="eyebrow">{product.collection}</p>
              <h2
                id={`quickview-title-${product.slug}`}
                className="mt-3 font-display text-h3 text-espresso"
              >
                {product.name}
              </h2>
            </div>
            <WishlistButton slug={product.slug} name={product.name} className="-mr-2 -mt-2" />
          </div>

          <Price
            price={product.price}
            comparePrice={product.comparePrice}
            size="md"
            className="mt-4"
          />

          <p className="mt-5 text-body-sm leading-relaxed text-espresso-70">
            {product.description}
          </p>

          <div className="mt-7">
            <p className="font-sans text-label font-medium uppercase text-espresso-55">Size</p>
            <SizeSelector
              sizes={product.sizes}
              inventory={product.inventory}
              value={size}
              onChange={setSize}
              className="mt-3"
            />
          </div>

          <div className="mt-auto flex flex-col gap-2.5 pt-8">
            {soldOut ? (
              <Button variant="primary" size="md" disabled className="w-full">
                Sold out
              </Button>
            ) : (
              <AddToCartButton
                product={product}
                size={size}
                quantity={1}
                label="Add to bag"
                className="w-full"
                onAdded={onClose}
              />
            )}
            <ButtonLink
              href={`/product/${product.slug}`}
              variant="secondary"
              size="md"
              onClick={onClose}
              className="w-full"
            >
              View full details
            </ButtonLink>
          </div>

          <Link
            href={`/product/${product.slug}`}
            onClick={onClose}
            className={cn(
              'link-underline mt-6 self-start font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-espresso-55',
            )}
          >
            Size &amp; fit details
          </Link>
        </div>
      </div>
    </Overlay>
  );
}
