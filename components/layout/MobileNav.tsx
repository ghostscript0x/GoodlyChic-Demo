'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, Search, ShoppingBag, Store as StoreIcon, X } from 'lucide-react';
import { Overlay } from '@/components/ui/Overlay';
import { categories } from '@/data/categories';
import { navigation, whatsapp } from '@/data/site';
import { track } from '@/lib/analytics';
import { useCartStore, selectCartCount } from '@/stores/cart';
import { useUiStore } from '@/stores/ui';
import { useWishlistStore, selectWishlistCount } from '@/stores/wishlist';
import { cn } from '@/lib/utils';

/** Full-screen navigation, opened from the header hamburger. */
export function MobileMenu() {
  const open = useUiStore((state) => state.mobileNavOpen);
  const setOpen = useUiStore((state) => state.setMobileNavOpen);
  const openSearch = useUiStore((state) => state.openSearch);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <Overlay
      open={open}
      onClose={() => setOpen(false)}
      labelledBy="mobile-menu-title"
      mode="drawer"
      hideClose
      panelClassName="max-w-none bg-ivory"
    >
      <div className="flex h-full flex-col bg-ivory">
        <div className="flex h-[4.25rem] items-center justify-between border-b border-taupe px-5">
          <p id="mobile-menu-title" className="font-display text-[1.4rem] leading-none tracking-[-0.04em]">
            GC
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-espresso"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-8">
          <ul className="space-y-1">
            {navigation.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-14 items-center border-b border-taupe font-display text-h3 text-espresso"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-10">Shop</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            <li>
              <Link
                href="/store"
                className="inline-flex min-h-11 items-center text-[0.8125rem] text-espresso-70"
              >
                All Products
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/store/${category.slug}`}
                  className="inline-flex min-h-11 items-center text-[0.8125rem] text-espresso-70"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openSearch();
            }}
            className="mt-10 flex min-h-12 w-full items-center gap-3 border border-taupe px-4 text-left font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-espresso"
          >
            <Search className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
            Search the store
          </button>

          <a
            href={whatsapp.personal()}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => track('whatsapp_click', { location: 'mobile_menu' })}
            className="mt-3 flex min-h-12 w-full items-center gap-3 border border-taupe px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-espresso"
          >
            Personal shopping on WhatsApp
          </a>
        </nav>
      </div>
    </Overlay>
  );
}

/** Fixed bottom navigation — the primary mobile commerce surface. */
export function BottomNav() {
  const pathname = usePathname();
  const openSearch = useUiStore((state) => state.openSearch);
  const openCart = useCartStore((state) => state.open);
  const cartCount = useCartStore(selectCartCount);
  const cartHydrated = useCartStore((state) => state.hasHydrated);
  const wishlistCount = useWishlistStore(selectWishlistCount);
  const wishlistHydrated = useWishlistStore((state) => state.hasHydrated);
  const isOpen = useCartStore((state) => state.isOpen);

  const items = [
    { label: 'Home', href: '/', icon: Home, active: pathname === '/' },
    { label: 'Store', href: '/store', icon: StoreIcon, active: pathname.startsWith('/store') },
    { label: 'Search', href: '#search', icon: Search, active: false, action: openSearch },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
      active: pathname.startsWith('/wishlist'),
      count: wishlistHydrated ? wishlistCount : 0,
    },
    {
      label: 'Bag',
      href: '#bag',
      icon: ShoppingBag,
      active: false,
      count: cartHydrated ? cartCount : 0,
      action: openCart,
    },
  ];

  return (
    <nav
      aria-label="Primary mobile"
      className={cn(
        'fixed inset-x-0 bottom-0 z-[75] border-t border-taupe bg-ivory/97 backdrop-blur-[6px] transition-transform duration-300 ease-editorial lg:hidden',
        isOpen && 'translate-y-full',
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <span className="relative">
                <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} aria-hidden="true" />
                {item.count ? (
                  <span className="absolute -right-2.5 -top-1.5 min-w-[1rem] bg-espresso px-1 text-center font-sans text-[0.5rem] font-medium leading-[0.9rem] text-ivory tabular-nums">
                    {item.count}
                  </span>
                ) : null}
              </span>
              <span className="mt-1.5 font-sans text-[0.5rem] font-medium uppercase tracking-[0.14em]">
                {item.label}
              </span>
            </>
          );

          const className = cn(
            'flex min-h-[3.75rem] flex-col items-center justify-center transition-colors duration-300',
            item.active ? 'text-espresso' : 'text-espresso-55',
          );

          return (
            <li key={item.label}>
              {item.action ? (
                <button
                  type="button"
                  onClick={item.action}
                  className={cn(className, 'w-full')}
                  aria-label={item.label}
                >
                  {content}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(className, 'w-full')}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
