/**
 * URL-synced filter state for the store.
 *
 * Filters live in the query string so every filtered view is shareable,
 * bookmarkable and back-button friendly.
 */

import {
  COLLECTIONS,
  PRODUCT_CATEGORIES,
  SORT_OPTIONS,
  type ColourName,
  type CollectionName,
  type ProductCategory,
  type SortOption,
  type StoreFilters,
} from '@/lib/types';
import { getAllColours, PRICE_BOUNDS } from './catalog';

type Params = URLSearchParams;

const list = (params: Params, key: string): string[] =>
  (params.get(key) ?? '').split(',').map((v) => v.trim()).filter(Boolean);

const readCsv = <T extends string>(values: string[], allowed: readonly T[]): T[] =>
  values.filter((value): value is T => (allowed as readonly string[]).includes(value));

/** Collection names are matched case-insensitively and normalised to canonical form. */
const readCollections = (values: string[]): CollectionName[] => {
  const canonical = new Map(COLLECTIONS.map((name) => [name.toLowerCase(), name]));
  return [...new Set(values.map((v) => canonical.get(v.trim().toLowerCase())).filter(Boolean))] as CollectionName[];
};

export const FILTER_KEYS = {
  category: 'category',
  size: 'size',
  collection: 'collection',
  colour: 'colour',
  availability: 'availability',
  maxPrice: 'max',
  sort: 'sort',
  q: 'q',
} as const;

export const AVAILABILITY_OPTIONS = ['in-stock', 'low-stock', 'out-of-stock'] as const;

export const AVAILABILITY_LABELS: Record<(typeof AVAILABILITY_OPTIONS)[number], string> = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock',
};

export const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Featured',
  newest: 'Newest',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
};

export const defaultFilters: StoreFilters = {
  categories: [],
  sizes: [],
  collections: [],
  colours: [],
  availability: [],
  maxPrice: null,
  sort: 'featured',
};

export function parseFilters(params: Params): StoreFilters {
  const max = Number(params.get(FILTER_KEYS.maxPrice));
  const sort = params.get(FILTER_KEYS.sort);

  return {
    categories: readCsv(list(params, FILTER_KEYS.category), PRODUCT_CATEGORIES) as ProductCategory[],
    sizes: list(params, FILTER_KEYS.size),
    collections: readCollections(list(params, FILTER_KEYS.collection)),
    colours: readCsv(list(params, FILTER_KEYS.colour), getAllColours()) as ColourName[],
    availability: readCsv(
      list(params, FILTER_KEYS.availability),
      AVAILABILITY_OPTIONS,
    ) as StoreFilters['availability'],
    maxPrice: Number.isFinite(max) && max > 0 ? Math.min(max, PRICE_BOUNDS.max) : null,
    sort: (SORT_OPTIONS as readonly string[]).includes(sort ?? '')
      ? (sort as SortOption)
      : 'featured',
  };
}

/** Serialises filters back into a query string, omitting defaults. */
export function serialiseFilters(filters: StoreFilters, search?: string): string {
  const params = new URLSearchParams();
  const set = (key: string, values: string[]) => {
    if (values.length) params.set(key, [...new Set(values)].join(','));
  };

  set(FILTER_KEYS.category, filters.categories);
  set(FILTER_KEYS.size, filters.sizes);
  set(FILTER_KEYS.collection, filters.collections);
  set(FILTER_KEYS.colour, filters.colours);
  set(FILTER_KEYS.availability, filters.availability);
  if (filters.maxPrice !== null && filters.maxPrice < PRICE_BOUNDS.max) {
    params.set(FILTER_KEYS.maxPrice, String(filters.maxPrice));
  }
  if (filters.sort !== 'featured') params.set(FILTER_KEYS.sort, filters.sort);
  if (search?.trim()) params.set(FILTER_KEYS.q, search.trim());

  const query = params.toString();
  return query ? `?${query}` : '';
}

export type FilterKey = 'categories' | 'sizes' | 'collections' | 'colours' | 'availability';

export function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function activeFilterCount(filters: StoreFilters): number {
  return (
    filters.categories.length +
    filters.sizes.length +
    filters.collections.length +
    filters.colours.length +
    filters.availability.length +
    (filters.maxPrice !== null ? 1 : 0)
  );
}

export function hasAnyFilter(filters: StoreFilters): boolean {
  return activeFilterCount(filters) > 0;
}

export type { StoreFilters, ColourName, SortOption };
