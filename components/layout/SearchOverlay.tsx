'use client';

import { useDeferredValue, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Overlay } from '@/components/ui/Overlay';
import { Photo } from '@/components/ui/Photo';
import { Price } from '@/components/ui/Price';
import { getProductSummaries } from '@/lib/catalog';
import { formatNumber } from '@/lib/format';
import { track } from '@/lib/analytics';
import { useUiStore } from '@/stores/ui';
import { useSearchStore } from '@/stores/search';

const POPULAR = [
  { label: 'Dresses', href: '/store/dresses' },
  { label: 'New Arrivals', href: '/store/new-arrivals' },
  { label: 'Bags', href: '/store/bags' },
  { label: 'Occasion', href: '/the-edit/occasion' },
];

/**
 * Full-screen search. Live results against the catalogue, debounced input,
 * remembered recent searches, Escape to close and a trapped focus ring.
 */
export function SearchOverlay() {
  const open = useUiStore((state) => state.searchOpen);
  const close = useUiStore((state) => state.closeSearch);
  const recent = useSearchStore((state) => state.recent);
  const remember = useSearchStore((state) => state.remember);
  const clearRecent = useSearchStore((state) => state.clear);

  const [term, setTerm] = useState('');
  const debounced = useDebounced(term, 220);
  const deferred = useDeferredValue(debounced);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTerm('');
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  const results = deferred.trim().length > 1 ? getProductSummaries({ search: deferred, limit: 6 }) : [];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = term.trim();
    if (!value) return;
    remember(value);
    track('search', { query: value, results: results.length });
    close();
    router.push(`/store?q=${encodeURIComponent(value)}`);
  };

  return (
    <Overlay
      open={open}
      onClose={close}
      labelledBy="search-title"
      mode="modal"
      panelClassName="top-0 left-0 h-full max-h-none w-full max-w-none translate-x-0 translate-y-0 bg-ivory"
    >
      <div className="flex h-full flex-col bg-ivory">
        <div className="shell flex shrink-0 items-center justify-between border-b border-taupe py-5 pr-14">
          <h2 id="search-title" className="font-display text-h4 text-espresso">
            What are you looking for?
          </h2>
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-espresso"
            aria-label="Close search"
          >
            <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="shell py-10 md:py-16">
            <form onSubmit={submit} role="search">
              <label htmlFor="search-input" className="sr-only">
                Search dresses, bags, trousers
              </label>
              <div className="flex items-center gap-4 border-b border-espresso pb-4">
                <Search className="h-5 w-5 shrink-0 text-espresso-55" strokeWidth={1.25} aria-hidden="true" />
                <input
                  id="search-input"
                  ref={inputRef}
                  data-autofocus
                  type="search"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Search dresses, bags, trousers..."
                  autoComplete="off"
                  className="w-full bg-transparent font-display text-h3 text-espresso placeholder:text-espresso-40 focus:outline-none sm:text-h2"
                />
              </div>
            </form>

            {deferred.trim().length > 1 ? (
              <div className="mt-10">
                {results.length > 0 ? (
                  <>
                    <p className="eyebrow" role="status">
                      {formatNumber(results.length)} {results.length === 1 ? 'result' : 'results'}
                    </p>
                    <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
                      {results.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => {
                              remember(deferred);
                              track('search', { query: deferred, result: product.slug });
                              close();
                            }}
                            className="group block"
                          >
                            <Photo
                              src={product.images[0].src}
                              alt={product.images[0].alt}
                              ratio="product"
                              sizes="(min-width: 768px) 30vw, 45vw"
                              hoverZoom
                            />
                            <p className="mt-3 font-display text-[1.0625rem] leading-snug text-espresso">
                              {product.name}
                            </p>
                            <Price
                              price={product.price}
                              comparePrice={product.comparePrice}
                              size="sm"
                              className="mt-1"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="py-6">
                    <p className="font-display text-h4 text-espresso">
                      Nothing matches that, yet.
                    </p>
                    <p className="mt-2 max-w-[46ch] text-body-sm text-espresso-70">
                      Try a category such as dresses or bags, or ask us directly on WhatsApp — we
                      are happy to hunt for something specific.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-12 space-y-12">
                <div>
                  <p className="eyebrow">Popular right now</p>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {POPULAR.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          className="inline-flex min-h-11 items-center border border-taupe px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-espresso transition-colors duration-200 hover:border-espresso"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {recent.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="eyebrow">Recent searches</p>
                      <button
                        type="button"
                        onClick={clearRecent}
                        className="link-underline font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-espresso-55 hover:text-espresso"
                      >
                        Clear
                      </button>
                    </div>
                    <ul className="mt-5 space-y-1">
                      {recent.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => setTerm(item)}
                            className="inline-flex min-h-11 items-center gap-3 font-sans text-[0.9375rem] text-espresso-70 transition-colors duration-200 hover:text-espresso"
                          >
                            <span className="h-px w-4 bg-champagne" aria-hidden="true" />
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
