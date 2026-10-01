/**
 * Image slot resolution.
 *
 * `Photo` is given a path and an alt text. This module answers the two remaining
 * questions — what is the crop, and what should the placeholder look like — by
 * looking the path up in the registry declared in `data/images.ts`.
 */

import manifest from '@/data/image-manifest.json';
import {
  aboutImages,
  boutiqueImages,
  categorySubject,
  categoryTone,
  editImages,
  homeImages,
  instagramSlots,
  ogImage,
  productImageSlots,
  type ImageSlot,
} from '@/data/images';
import { products } from '@/data/products';
import type { ProductCategory } from '@/lib/types';

const available = new Set<string>(manifest as string[]);

/** True when real photography has been dropped into `public/` for this path. */
export function hasPhotography(src: string): boolean {
  return available.has(src);
}

/** Public-root-relative path → root-absolute src string. */
export function publicSrc(src: string): string {
  return src.startsWith('/') ? src : `/${src}`;
}

const slotMap = new Map<string, ImageSlot>();
const register = (slot: ImageSlot) => slotMap.set(slot.src, slot);

register(ogImage);
for (const group of [homeImages, editImages, aboutImages, boutiqueImages]) {
  for (const slot of Object.values(group)) register(slot);
}
for (const slot of instagramSlots) register(slot);
for (const product of products) {
  for (const slot of productImageSlots(product.slug, product.name, product.category)) register(slot);
}

/** Fallback crop for any path not declared in the registry. */
const fallbackSlot: ImageSlot = {
  src: '',
  ratio: 'product',
  tone: 'sand',
  subject: 'scene',
  label: 'Editorial image · 4:5',
  alt: '',
  recommend: '1200 × 1500 px (4:5)',
};

/** Looks up the slot a path was registered with. */
export function slotFor(src: string): ImageSlot {
  return slotMap.get(src.replace(/^\//, '')) ?? { ...fallbackSlot, src };
}

export const toneForCategory = (category: ProductCategory): ImageSlot['tone'] =>
  categoryTone[category];

export const subjectForCategory = (category: ProductCategory): ImageSlot['subject'] =>
  categorySubject[category];

export type { ImageSlot };
