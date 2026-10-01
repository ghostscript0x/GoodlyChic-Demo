import type { CollectionName } from '@/lib/types';
import { editImages } from './images';

export type Collection = {
  slug: Lowercase<CollectionName>;
  name: CollectionName;
  /** Hero headline. */
  title: string;
  subline: string;
  editorial: string;
  image: (typeof editImages)[keyof typeof editImages];
};

export const collections: Collection[] = [
  {
    slug: 'everyday',
    name: 'Everyday',
    title: 'Effortless style.',
    subline: 'For the days that carry the week.',
    editorial:
      'The pieces you reach for without thinking. Soft structure, honest fabrics, and enough room to move through a long day without a second thought.',
    image: editImages.everyday,
  },
  {
    slug: 'occasion',
    name: 'Occasion',
    title: 'For moments worth remembering.',
    subline: 'When the occasion sets the dress code.',
    editorial:
      'Considered pieces for weddings, celebrations and the evenings you will talk about later. Cut for movement, finished with restraint.',
    image: editImages.occasion,
  },
  {
    slug: 'statement',
    name: 'Statement',
    title: 'Make an entrance.',
    subline: 'For the days that ask for more.',
    editorial:
      'Strong silhouettes and a little more presence. Statement pieces do not ask for attention — they simply hold it, and let the rest of the outfit step back.',
    image: editImages.statement,
  },
];

export const collectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug.toLowerCase());
