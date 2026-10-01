'use client';

import { usePathname } from 'next/navigation';
import { whatsapp } from '@/data/site';
import { track } from '@/lib/analytics';
import { useCartStore } from '@/stores/cart';
import { useUiStore } from '@/stores/ui';

/**
 * A small, branded WhatsApp action — the secondary commerce layer.
 * Ivory and espresso, not a large green button. Desktop places it low-right;
 * mobile floats above the bottom navigation.
 */
export function WhatsAppAction() {
  const pathname = usePathname();
  const cartOpen = useCartStore((state) => state.isOpen);
  const searchOpen = useUiStore((state) => state.searchOpen);

  if (cartOpen || searchOpen) return null;

  return (
    <a
      href={whatsapp.general}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => track('whatsapp_click', { location: 'floating', path: pathname })}
      className="fixed bottom-24 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-taupe bg-ivory text-espresso shadow-drawer transition-[transform,background-color] duration-300 ease-editorial hover:scale-[1.04] hover:bg-white sm:bottom-8 sm:right-6 sm:h-14 sm:w-14 lg:bottom-10 lg:right-10"
      aria-label="Chat with Goodly & Chic on WhatsApp"
    >
      <WhatsAppGlyph className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
    </a>
  );
}

/** Thin-line WhatsApp mark, drawn to match the icon set's 1.25px stroke. */
function WhatsAppGlyph({ className, ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path
        d="M3.5 20.5 5 16.2A8 8 0 1 1 8 19.2l-4.5 1.3Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 9.1c.2 1.3 1.1 2.4 2 3.3.9.9 2 1.6 3.2 1.8.5 0 .8-.2 1-.5.2-.3.2-.6 0-.8l-1.2-.8c-.2-.2-.5-.2-.7 0l-.5.6c-.9-.4-1.7-1.2-2.1-2.1l.6-.5c.2-.2.2-.5 0-.7l-.8-1.1c-.2-.3-.5-.4-.8-.3-.2 0-.5.1-.7.3Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}
