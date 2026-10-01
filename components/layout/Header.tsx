'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Photo } from '@/components/ui/Photo';
import { categories } from '@/data/categories';
import { navigation } from '@/data/site';
import { track } from '@/lib/analytics';
import { useScrolled } from '@/lib/useFocusTrap';
import { useCartStore, selectCartCount } from '@/stores/cart';
import { useUiStore } from '@/stores/ui';
import { useWishlistStore, selectWishlistCount } from '@/stores/wishlist';
import { cn } from '@/lib/utils';
import { homeImages } from '@/data/images';

export function Header() {
  const scrolled = useScrolled(8);
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const openSearch = useUiStore((state) => state.openSearch);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);
  const cartCount = useCartStore(selectCartCount);
  const cartHydrated = useCartStore((state) => state.hasHydrated);
  const openCart = useCartStore((state) => state.open);
  const wishlistCount = useWishlistStore(selectWishlistCount);
  const wishlistHydrated = useWishlistStore((state) => state.hasHydrated);

  // Close the mega menu on navigation.
  useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const overHero = !scrolled;

  return (
    <header
      className={cn(
        'sticky top-0 z-[70] transition-colors duration-500 ease-editorial',
        overHero ? 'bg-transparent' : 'border-b border-taupe bg-ivory/95 backdrop-blur-[6px]',
      )}
    >
      <div className="shell-wide flex h-[4.25rem] items-center justify-between gap-6 lg:h-[4.75rem]">
        {/* Left: mobile menu, logo, desktop links */}
        <div className="flex flex-1 items-center gap-4 lg:gap-10">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="-ml-2 flex h-11 w-11 items-center justify-center text-espresso lg:hidden"
            aria-label="Open menu"
            aria-expanded={false}
          >
            <Menu className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
          </button>

          <Logo
            variant={overHero ? 'espresso' : 'espresso'}
            markSize="text-[1.6rem]"
            className="lg:hidden"
          />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navigation.primary.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const isStore = item.href === '/store';
                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => {
                      if (isStore) {
                        cancelClose();
                        setMegaOpen(true);
                      } else {
                        scheduleClose();
                      }
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      aria-expanded={isStore ? megaOpen : undefined}
                      className={cn(
                        'link-underline inline-flex min-h-11 items-center font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
                        active ? 'text-espresso' : 'text-espresso-70 hover:text-espresso',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Desktop: centred wordmark lockup */}
        <div className="hidden flex-1 justify-center lg:flex">
          <Logo lockup="stacked" variant="espresso" className="translate-y-px" markSize="text-[1.45rem]" />
        </div>

        {/* Right: search, wishlist, bag */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <IconButton label="Search" onClick={() => { openSearch(); track('search', { action: 'open' }); }}>
            <Search className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} aria-hidden="true" />
          </IconButton>

          <Link
            href="/wishlist"
            className="relative flex h-11 w-11 items-center justify-center text-espresso transition-colors duration-300 hover:text-espresso-55"
            aria-label={`Wishlist${wishlistHydrated && wishlistCount > 0 ? `, ${wishlistCount} saved` : ''}`}
          >
            <Heart className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} aria-hidden="true" />
            {wishlistHydrated && wishlistCount > 0 && <Count value={wishlistCount} />}
          </Link>

          <button
            type="button"
            onClick={() => {
              openCart();
              track('add_to_cart', { action: 'open_bag' });
            }}
            className="relative flex h-11 w-11 items-center justify-center text-espresso transition-colors duration-300 hover:text-espresso-55"
            aria-label={`Bag${cartHydrated && cartCount > 0 ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} aria-hidden="true" />
            {cartHydrated && cartCount > 0 && <Count value={cartCount} />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className={cn(
          'absolute left-0 right-0 top-full hidden border-b border-taupe bg-ivory transition-[opacity,transform] duration-300 ease-editorial lg:block',
          megaOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0',
        )}
        aria-hidden={!megaOpen}
      >
        <div className="shell grid grid-cols-12 gap-10 py-12">
          <div className="col-span-7">
            <p className="eyebrow mb-7">Shop the collection</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              <li>
                <Link
                  href="/store"
                  className="link-underline font-display text-h4 text-espresso"
                  tabIndex={megaOpen ? 0 : -1}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/store/${category.slug}`}
                    className="link-underline font-display text-h4 text-espresso"
                    tabIndex={megaOpen ? 0 : -1}
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-5">
            <Link
              href="/the-edit"
              className="group block"
              tabIndex={megaOpen ? 0 : -1}
            >
              <Photo
                src={homeImages.campaign.src}
                alt={homeImages.campaign.alt}
                ratio="editorial"
                sizes="(min-width: 1024px) 38vw, 100vw"
                hoverZoom
                className="w-full"
              />
              <p className="mt-4 flex items-center gap-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-espresso-55">
                <span className="h-px w-6 bg-champagne" aria-hidden="true" />
                The Edit
              </p>
              <p className="mt-1.5 max-w-[30ch] text-body-sm text-espresso-70">
                Everyday, occasion and statement — three ways to wear the season.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center text-espresso transition-colors duration-300 hover:text-espresso-55"
    >
      {children}
    </button>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="absolute right-1 top-1.5 min-w-[1.05rem] border border-espresso bg-ivory px-1 text-center font-sans text-[0.5625rem] font-medium leading-[0.95rem] text-espresso tabular-nums">
      {value}
    </span>
  );
}
