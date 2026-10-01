'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Overlay } from '@/components/ui/Overlay';
import { Photo } from '@/components/ui/Photo';
import { Price } from '@/components/ui/Price';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { formatPrice } from '@/lib/format';
import { track } from '@/lib/analytics';
import { whatsapp } from '@/data/site';
import { useCartStore, selectCartSubtotal } from '@/stores/cart';

/**
 * The bag. A right-hand drawer on desktop, a full-height sheet on mobile.
 * Every state here — filled, empty, just-added — reads like the brand.
 */
export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const lines = useCartStore((state) => state.lines);
  const lastAdded = useCartStore((state) => state.lastAdded);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);
  const subtotal = useCartStore(selectCartSubtotal);

  return (
    <Overlay open={isOpen} onClose={close} labelledBy="cart-title" mode="drawer" closeLabel="Close bag">
      <div className="flex h-full flex-col bg-white">
        <div className="flex shrink-0 items-center justify-between border-b border-taupe px-5 py-5 pr-16">
          <div>
            <h2 id="cart-title" className="font-sans text-label font-medium uppercase tracking-[0.18em] text-espresso">
              Your Bag
            </h2>
            {lastAdded && (
              <p className="mt-1.5 text-[0.8125rem] text-espresso-55" role="status">
                {lastAdded} added to your bag.
              </p>
            )}
          </div>
        </div>

        {lines.length === 0 ? (
          <EmptyBag onClose={close} />
        ) : (
          <>
            <ul className="flex-1 divide-y divide-taupe overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.lineId} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${line.slug}`}
                    onClick={close}
                    className="w-20 shrink-0"
                    aria-label={line.name}
                  >
                    <Photo
                      src={line.image.src}
                      alt={line.image.alt}
                      ratio="product"
                      sizes="80px"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${line.slug}`}
                          onClick={close}
                          className="link-underline font-display text-[1.0625rem] leading-snug text-espresso"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-[0.75rem] uppercase tracking-[0.1em] text-espresso-55">
                          {line.colour} · {line.size}
                        </p>
                      </div>
                      <p className="shrink-0 font-sans text-[0.875rem] tabular-nums text-espresso">
                        {formatPrice(line.price * line.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityStepper
                        value={line.quantity}
                        max={Math.max(line.stock, 1)}
                        onChange={(value) => setQuantity(line.lineId, value)}
                        size="sm"
                        label={`Quantity for ${line.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          remove(line.lineId);
                          track('remove_from_cart', { product: line.name });
                        }}
                        className="link-underline font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-espresso-55 hover:text-espresso"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-taupe bg-ivory px-5 py-5">
              <div className="flex items-baseline justify-between">
                <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-espresso-55">
                  Subtotal
                </p>
                <Price price={subtotal} size="md" />
              </div>
              <p className="mt-1.5 text-[0.75rem] text-espresso-55">Delivery calculated at checkout.</p>

              <div className="mt-5 flex flex-col gap-2.5">
                <ButtonLink
                  href="/checkout"
                  variant="primary"
                  size="md"
                  withArrow
                  className="w-full"
                  onClick={() => {
                    close();
                    track('checkout_started', { value: subtotal, items: lines.length });
                  }}
                >
                  Checkout
                </ButtonLink>
                <Button variant="secondary" size="md" onClick={close} className="w-full">
                  Continue shopping
                </Button>
              </div>

              <a
                href={whatsapp.cart()}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => track('whatsapp_click', { location: 'cart_drawer' })}
                className="link-underline mt-5 flex min-h-11 items-center gap-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-espresso-70 hover:text-espresso"
              >
                Need help? Chat on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </Overlay>
  );
}

function EmptyBag({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <ShoppingBag className="h-7 w-7 text-espresso-40" strokeWidth={1} aria-hidden="true" />
      <h3 className="mt-6 font-display text-h3 text-espresso">Your bag is empty.</h3>
      <p className="mt-3 max-w-[30ch] text-body-sm text-espresso-70">
        Nothing here yet. Let us show you what is worth carrying.
      </p>
      <ButtonLink href="/store" variant="primary" size="md" withArrow className="mt-8" onClick={onClose}>
        Explore the store
      </ButtonLink>
    </div>
  );
}
