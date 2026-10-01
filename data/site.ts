/**
 * Site-wide configuration and brand copy.
 *
 * Everything a founder or editor would want to change about the brand — name,
 * tagline, contact details, social handles, navigation — lives here.
 */

const whatsappDigits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '2340000000000').replace(
  /[^\d]/g,
  '',
);

export const site = {
  name: 'Goodly & Chic',
  monogram: 'GC',
  idea: 'The Goodly Woman',
  legalName: 'Goodly & Chic',
  tagline: 'Style that feels distinctly you.',
  campaign: 'Dress beautifully. Live confidently.',
  eyebrow: 'Curated fashion for the modern woman',
  currency: 'NGN',
  locale: 'en-NG',
  description:
    'Goodly & Chic is a contemporary Nigerian fashion boutique in Abuja, curating dresses, tops, trousers, bags, shoes and accessories for the woman who knows her style.',

  address: {
    line1: 'Market Square, Sauka Village Extension',
    line2: 'Kuje, Abuja',
    country: 'Nigeria',
    /** Shown on the Boutique page and in the footer. */
    formatted: 'Market Square, Sauka Village Extension, Kuje, Abuja, Nigeria',
  },

  contact: {
    email: 'hello@goodlyandchic.com',
    /** Demo placeholder. Set NEXT_PUBLIC_WHATSAPP_NUMBER in `.env.local`. */
    whatsappNumber: whatsappDigits,
    instagramHandle: '@begoodlychicng',
    instagramUrl: 'https://instagram.com/begoodlychicng',
  },

  announcement: 'WELCOME TO GOODLY & CHIC — CURATED FASHION FOR THE MODERN WOMAN',

  /**
   * Boutique opening hours are not yet confirmed, so they are deliberately
   * withheld rather than invented. Replace with real hours when available.
   */
  openingHours: 'Opening hours coming soon',

  trust: {
    secure: 'Secure checkout',
    boutique: 'Abuja boutique',
    delivery: 'Delivery & returns',
  },
} as const;

/** Full WhatsApp link with a pre-filled, on-brand message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Google Maps directions link, derived from the boutique address. */
export const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.line1}, ${site.address.line2}`,
)}`;

/** Google Maps place link, derived from the boutique address. */
export const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.formatted,
)}`;

export const whatsapp = {
  /** No page URL is embedded here: the string is rendered on the server and the
   * client, so reading `window` at module scope would hydrate a different href. */
  general: whatsappUrl('Hello Goodly & Chic, I would like some help choosing a piece.'),
  product: (productName: string, size: string, quantity: number, url?: string) =>
    whatsappUrl(
      [
        'Hello Goodly & Chic, I would like to order:',
        `Item: ${productName}`,
        `Size: ${size}`,
        `Quantity: ${quantity}`,
        url ? `Link: ${url}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    ),
  cart: () =>
    whatsappUrl(
      'Hello Goodly & Chic, I have items in my bag and I would like help completing my order.',
    ),
  checkout: () =>
    whatsappUrl('Hello Goodly & Chic, I would like help placing my order.'),
  delivery: () =>
    whatsappUrl(
      'Hello Goodly & Chic, could you tell me about your delivery times and returns policy?',
    ),
  sizing: () =>
    whatsappUrl('Hello Goodly & Chic, could you help me with sizing for a piece?'),
  personal: () =>
    whatsappUrl(
      'Hello Goodly & Chic, I would love a little personal shopping help. Could we set up a time?',
    ),
} as const;

/** Appends the current page to a pre-filled WhatsApp message. Client-only. */
export function whatsappForPage(base: string): string {
  if (typeof window === 'undefined') return base;
  return base.includes('?text=')
    ? `${base}%20${encodeURIComponent(`(Via page: ${window.location.href})`)}`
    : `${base}?text=${encodeURIComponent(window.location.href)}`;
}

export const navigation = {
  primary: [
    { label: 'Store', href: '/store' },
    { label: 'The Edit', href: '/the-edit' },
    { label: 'Our Story', href: '/about' },
    { label: 'Boutique', href: '/boutique' },
  ],
  footer: {
    Store: [
      { label: 'All Products', href: '/store' },
      { label: 'New Arrivals', href: '/store/new-arrivals' },
      { label: 'Dresses', href: '/store/dresses' },
      { label: 'Bags', href: '/store/bags' },
      { label: 'Shoes', href: '/store/shoes' },
    ],
    'The Edit': [
      { label: 'Everyday', href: '/the-edit/everyday' },
      { label: 'Occasion', href: '/the-edit/occasion' },
      { label: 'Statement', href: '/the-edit/statement' },
      { label: 'Accessories', href: '/store/accessories' },
      { label: 'Tops', href: '/store/tops' },
    ],
    About: [
      { label: 'Our Story', href: '/about' },
      { label: 'The Goodly Woman', href: '/about#the-goodly-woman' },
      { label: 'Our Vision', href: '/about#our-vision' },
      { label: 'Boutique', href: '/boutique' },
    ],
    Help: [
      { label: 'Delivery & Returns', href: whatsapp.delivery() },
      { label: 'Size & Fit', href: whatsapp.sizing() },
      { label: 'Contact', href: '/boutique#contact' },
      { label: 'Visit the Boutique', href: '/boutique' },
    ],
  },
} as const;
