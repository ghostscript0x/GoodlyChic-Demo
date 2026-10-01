/**
 * Central image registry.
 *
 * Every image on the site is declared here once. Drop real photography into
 * `public/images` using the same paths and the `<Photo />` component picks it up
 * automatically — no code changes required. Until then, `<Photo />` renders an
 * art-directed placeholder in the correct crop and tone.
 *
 * See README → "Where to put real photography".
 */

import type { ProductCategory } from '@/lib/types';

export const RATIO = {
  /** Product card and product gallery. */
  product: '4 / 5',
  /** Home hero and editorial heroes. */
  hero: '16 / 9',
  /** Editorial split sections, boutique portrait imagery. */
  editorial: '3 / 4',
  /** Instagram grid tiles. */
  square: '1 / 1',
  /** Campaign banners. */
  banner: '21 / 9',
  /** Mobile hero. */
  portrait: '4 / 5',
} as const;

export type RatioKey = keyof typeof RATIO;

export type Tone = 'sand' | 'taupe' | 'blush' | 'ivory' | 'chalk' | 'clay';

export type ImageSlot = {
  /** Public-root-relative path used when real photography exists. */
  src: string;
  /** Crop the slot is designed for. */
  ratio: RatioKey;
  /** Placeholder tone + silhouette guidance. */
  tone: Tone;
  /** Silhouette hint for the placeholder artwork. */
  subject: 'dress' | 'top' | 'trousers' | 'bag' | 'shoe' | 'accessory' | 'scene' | 'portrait';
  /** Small caption rendered in the placeholder corner. */
  label: string;
  alt: string;
  /** Recommended intrinsic pixel size for the real file. */
  recommend: string;
};

/** Per-category placeholder tone so the grid feels alive, never repeated. */
export const categoryTone: Record<ProductCategory, Tone> = {
  dresses: 'blush',
  tops: 'sand',
  trousers: 'taupe',
  bags: 'chalk',
  shoes: 'clay',
  accessories: 'sand',
};

export const categorySubject: Record<ProductCategory, ImageSlot['subject']> = {
  dresses: 'dress',
  tops: 'top',
  trousers: 'trousers',
  bags: 'bag',
  shoes: 'shoe',
  accessories: 'accessory',
};

const productImage = (
  slug: string,
  index: number,
  name: string,
  category: ProductCategory,
): ImageSlot => ({
  src: `images/products/${slug}-${index + 1}.jpg`,
  ratio: 'product',
  tone: categoryTone[category],
  subject: categorySubject[category],
  label: 'Editorial image · 4:5',
  alt: `${name} — Goodly & Chic editorial image ${index + 1}`,
  recommend: '1200 × 1500 px (4:5)',
});

/** Home page imagery. */
export const homeImages = {
  hero: {
    src: 'images/home/hero.jpg',
    ratio: 'hero',
    tone: 'taupe',
    subject: 'scene',
    label: 'Editorial image · 16:9',
    alt: 'The Goodly Woman in a Goodly & Chic look, natural light, warm neutral setting',
    recommend: '2400 × 1350 px (16:9)',
  },
  brandIntro: {
    src: 'images/home/brand-intro.jpg',
    ratio: 'editorial',
    tone: 'sand',
    subject: 'scene',
    label: 'Editorial image · 3:4',
    alt: 'Curated rail of Goodly & Chic pieces in the boutique',
    recommend: '1200 × 1600 px (3:4)',
  },
  campaign: {
    src: 'images/home/campaign-statement.jpg',
    ratio: 'banner',
    tone: 'blush',
    subject: 'scene',
    label: 'Editorial image · 21:9',
    alt: 'Campaign imagery for The Goodly Woman',
    recommend: '2400 × 1030 px (21:9)',
  },
  goodlyWoman: {
    src: 'images/home/the-goodly-woman.jpg',
    ratio: 'editorial',
    tone: 'taupe',
    subject: 'portrait',
    label: 'Editorial image · 3:4',
    alt: 'Portrait study for The Goodly Woman',
    recommend: '1200 × 1600 px (3:4)',
  },
  boutique: {
    src: 'images/home/boutique.jpg',
    ratio: 'editorial',
    tone: 'sand',
    subject: 'scene',
    label: 'Editorial image · 3:4',
    alt: 'Goodly & Chic boutique, Market Square, Abuja',
    recommend: '1200 × 1600 px (3:4)',
  },
  whatsapp: {
    src: 'images/home/whatsapp-personal-shopping.jpg',
    ratio: 'square',
    tone: 'chalk',
    subject: 'scene',
    label: 'Editorial image · 1:1',
    alt: 'Personal shopping at Goodly & Chic',
    recommend: '1400 × 1400 px (1:1)',
  },
} as const satisfies Record<string, ImageSlot>;

export const editImages = {
  everyday: {
    src: 'images/edit/everyday.jpg',
    ratio: 'editorial',
    tone: 'sand',
    subject: 'scene',
    label: 'Editorial image · 3:4',
    alt: 'Everyday edit — effortless style',
    recommend: '1200 × 1600 px (3:4)',
  },
  occasion: {
    src: 'images/edit/occasion.jpg',
    ratio: 'editorial',
    tone: 'blush',
    subject: 'scene',
    label: 'Editorial image · 3:4',
    alt: 'Occasion edit — for moments worth remembering',
    recommend: '1200 × 1600 px (3:4)',
  },
  statement: {
    src: 'images/edit/statement.jpg',
    ratio: 'editorial',
    tone: 'taupe',
    subject: 'scene',
    label: 'Editorial image · 3:4',
    alt: 'Statement edit — make an entrance',
    recommend: '1200 × 1600 px (3:4)',
  },
} as const satisfies Record<string, ImageSlot>;

export const instagramImages = [
  'instagram-01',
  'instagram-02',
  'instagram-03',
  'instagram-04',
  'instagram-05',
  'instagram-06',
] as const;

export const instagramSlots: ImageSlot[] = instagramImages.map((id) => ({
  src: `images/social/${id}.jpg`,
  ratio: 'square',
  tone: 'sand',
  subject: 'scene',
  label: 'Instagram image · 1:1',
  alt: 'Goodly & Chic on Instagram',
  recommend: '1080 × 1080 px (1:1)',
}));

export const aboutImages = {
  story: {
    src: 'images/about/our-story.jpg',
    ratio: 'editorial',
    tone: 'taupe',
    subject: 'scene',
    label: 'Editorial image · 3:4',
    alt: 'The Goodly & Chic studio and rail',
    recommend: '1200 × 1600 px (3:4)',
  },
  vision: {
    src: 'images/about/our-vision.jpg',
    ratio: 'editorial',
    tone: 'sand',
    subject: 'scene',
    label: 'Editorial image · 3:4',
    alt: 'Curating the collection at Goodly & Chic',
    recommend: '1200 × 1600 px (3:4)',
  },
  goodlyWoman: {
    src: 'images/about/the-goodly-woman.jpg',
    ratio: 'editorial',
    tone: 'blush',
    subject: 'portrait',
    label: 'Editorial image · 3:4',
    alt: 'The Goodly Woman',
    recommend: '1200 × 1600 px (3:4)',
  },
  boutique: {
    src: 'images/about/our-boutique.jpg',
    ratio: 'banner',
    tone: 'chalk',
    subject: 'scene',
    label: 'Editorial image · 21:9',
    alt: 'Inside the Goodly & Chic boutique in Abuja',
    recommend: '2400 × 1030 px (21:9)',
  },
} as const satisfies Record<string, ImageSlot>;

export const boutiqueImages = {
  hero: {
    src: 'images/boutique/boutique-hero.jpg',
    ratio: 'hero',
    tone: 'sand',
    subject: 'scene',
    label: 'Editorial image · 16:9',
    alt: 'The Goodly & Chic boutique, Market Square, Abuja',
    recommend: '2400 × 1350 px (16:9)',
  },
  interior: {
    src: 'images/boutique/boutique-interior.jpg',
    ratio: 'editorial',
    tone: 'taupe',
    subject: 'scene',
    label: 'Editorial image · 3:4',
    alt: 'Inside the Goodly & Chic boutique',
    recommend: '1200 × 1600 px (3:4)',
  },
  map: {
    src: 'images/boutique/map-block.jpg',
    ratio: 'banner',
    tone: 'chalk',
    subject: 'scene',
    label: 'Map block · 21:9',
    alt: 'Map block showing Market Square, Sauka Village Extension, Kuje, Abuja',
    recommend: '1600 × 686 px (21:9)',
  },
} as const satisfies Record<string, ImageSlot>;

export const ogImage = {
  src: 'images/brand/og-cover.jpg',
  ratio: 'banner',
  tone: 'taupe',
  subject: 'scene',
  label: 'Open Graph image',
  alt: 'Goodly & Chic — contemporary fashion boutique in Abuja',
  recommend: '1200 × 630 px',
} satisfies ImageSlot;

/** Build the two (or more) gallery slots for a product. */
export const productImageSlots = (slug: string, name: string, category: ProductCategory): ImageSlot[] =>
  [0, 1, 2].map((i) => productImage(slug, i, name, category));

export type { ImageSlot as ImageSlotType };
