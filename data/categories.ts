import type { ProductCategory } from '@/lib/types';

export type Category = {
  slug: ProductCategory;
  label: string;
  /** Used by `/store/[category]`, `/the-edit` links and the mega menu. */
  title: string;
  subline: string;
  editorial: string;
};

export const categories: Category[] = [
  {
    slug: 'dresses',
    label: 'Dresses',
    title: 'Dresses',
    subline: 'Pieces that do the work for you.',
    editorial:
      'Our dresses are cut to move with you — from a Tuesday that ran long to a celebration that deserved more.',
  },
  {
    slug: 'tops',
    label: 'Tops',
    title: 'Tops',
    subline: 'The quiet half of a great outfit.',
    editorial:
      'Considered blouses and effortless knits, chosen for the way they layer and the way they last.',
  },
  {
    slug: 'trousers',
    label: 'Trousers',
    title: 'Trousers',
    subline: 'Tailoring without the effort.',
    editorial:
      'Clean lines and considered proportions. Trousers that hold their shape and their composure.',
  },
  {
    slug: 'bags',
    label: 'Bags',
    title: 'Bags',
    subline: 'The finishing detail.',
    editorial:
      'Structured enough for the meeting, soft enough for the weekend. Bags that carry more than essentials.',
  },
  {
    slug: 'shoes',
    label: 'Shoes',
    title: 'Shoes',
    subline: 'Where the look finds its footing.',
    editorial:
      'Heels you can actually walk in, flats that still look considered. Comfort, styled properly.',
  },
  {
    slug: 'accessories',
    label: 'Accessories',
    title: 'Accessories',
    subline: 'The last five percent.',
    editorial:
      'Small pieces with presence — scarves, jewellery and belts chosen to finish an outfit quietly.',
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
