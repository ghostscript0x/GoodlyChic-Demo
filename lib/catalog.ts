/**
 * The data-access seam.
 *
 * Every read in the storefront goes through one of these functions. When a real
 * API, database or Shopify/Medusa backend is introduced, replace the bodies here
 * with `fetch` calls — no component needs to change.
 *
 * Reads are synchronous against the typed mock data in `/data`. Writes go to
 * localStorage through `lib/storage`.
 */

import { featuredSlugs, newArrivalSlugs, products } from '@/data/products';
import type {
  Order,
  OrderLine,
  Product,
  ProductCategory,
  ProductSummary,
  CollectionName,
  SortOption,
  StoreFilters,
} from '@/lib/types';
import { readJSON, writeJSON } from './storage';

const ORDERS_KEY = 'goodlychic:orders';
const COUNTER_KEY = 'goodlychic:order-counter';
const PROFILE_KEY = 'goodlychic:profile';

const toSummary = (product: Product): ProductSummary => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  category: product.category,
  collection: product.collection,
  price: product.price,
  comparePrice: product.comparePrice,
  images: product.images,
  sizes: product.sizes,
  colours: product.colours,
  inventory: product.inventory,
  status: product.status,
  badge: product.badge,
  availableSizes: product.sizes.filter((size) => (product.inventory[size] ?? 0) > 0),
});

/** All products, in catalogue order. */
export function getProducts(): Product[] {
  return products;
}

/** Trims full products down to the listing shape. */
export function toProductSummaries(rows: Product[]): ProductSummary[] {
  return rows.map(toSummary);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsBySlugs(slugs: readonly string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}

/** Curated "Featured" order, sliced to `limit`. */
export function getFeaturedProducts(limit?: number): Product[] {
  const ordered = getProductsBySlugs(featuredSlugs);
  return typeof limit === 'number' ? ordered.slice(0, limit) : ordered;
}

/** The New Arrivals rail. */
export function getNewArrivals(limit?: number): Product[] {
  const ordered = getProductsBySlugs(newArrivalSlugs);
  return typeof limit === 'number' ? ordered.slice(0, limit) : ordered;
}

export function getProductsByCategory(category: ProductCategory, limit?: number): Product[] {
  const matches = getProducts().filter((product) => product.category === category);
  return typeof limit === 'number' ? matches.slice(0, limit) : matches;
}

export function getProductsByCollection(collection: CollectionName, limit?: number): Product[] {
  const matches = getProducts().filter((product) => product.collection === collection);
  return typeof limit === 'number' ? matches.slice(0, limit) : matches;
}

/** "Complete the look" — the product's own curation, topped up if thin. */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  const related = getProductsBySlugs(product.relatedProducts).slice(0, limit);
  if (related.length >= limit) return related;
  const filler = getProducts().filter(
    (candidate) => candidate.slug !== slug && !related.some((item) => item.slug === candidate.slug),
  );
  return [...related, ...filler].slice(0, limit);
}

export function getPriceBounds(): { min: number; max: number } {
  const prices = products.map((product) => product.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getAllSizes(): string[] {
  const sizes = new Set<string>();
  for (const product of products) for (const size of product.sizes) sizes.add(size);
  const order = ['XS', 'S', 'M', 'L', 'XL', 'One Size', ...SHOE_ORDER];
  return [...sizes].sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b, 'en', { numeric: true });
  });
}

const SHOE_ORDER = ['36', '37', '38', '39', '40', '41', '42'];

export function getAllColours(): string[] {
  const colours = new Set<string>();
  for (const product of products) for (const colour of product.colours) colours.add(colour);
  return [...colours];
}

const lowStockThreshold = 3;

function availabilityOf(product: Product): 'in-stock' | 'low-stock' | 'out-of-stock' {
  if (product.status === 'OUT_OF_STOCK') return 'out-of-stock';
  const total = Object.values(product.inventory).reduce((sum, n) => sum + n, 0);
  if (total === 0) return 'out-of-stock';
  const lowest = Math.min(...Object.values(product.inventory));
  return lowest > 0 && lowest <= lowStockThreshold ? 'low-stock' : 'in-stock';
}

const comparators: Record<SortOption, (a: Product, b: Product) => number> = {
  featured: () => 0,
  newest: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

/** Featured products first, in curated order. Everything else keeps catalogue order. */
function rankByFeatured(rows: Product[]): Product[] {
  const rank = new Map<string, number>(featuredSlugs.map((slug, index) => [slug, index]));
  return [...rows].sort((a, b) => {
    const ar = rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const br = rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return ar - br;
  });
}

/** New arrivals first, in curated order. */
function rankByNewest(rows: Product[]): Product[] {
  const rank = new Map<string, number>(newArrivalSlugs.map((slug, index) => [slug, index]));
  return [...rows].sort((a, b) => {
    const ar = rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const br = rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return ar - br;
  });
}

const newArrivalSlugsSet = new Set<string>(newArrivalSlugs);

/**
 * The store listing query. Takes a category, a search term, filters and a sort
 * option; returns the summaries the grid renders.
 */
export function getProductSummaries(input: {
  category?: ProductCategory | null;
  newArrivalsOnly?: boolean;
  collection?: CollectionName | null;
  search?: string;
  filters?: Partial<StoreFilters>;
  limit?: number;
}): ProductSummary[] {
  const { category, newArrivalsOnly, collection, search, filters, limit } = input;
  const sort: SortOption = filters?.sort ?? 'featured';

  let rows = [...getProducts()];

  if (newArrivalsOnly) {
    rows = rows.filter((product) => newArrivalSlugsSet.has(product.slug));
  } else if (category) {
    rows = rows.filter((product) => product.category === category);
  }

  if (collection) {
    rows = rows.filter((product) => product.collection === collection);
  }

  if (search) {
    const term = search.trim().toLowerCase();
    if (term) {
      rows = rows.filter((product) =>
        [product.name, product.description, product.category, product.collection, ...product.colours]
          .join(' ')
          .toLowerCase()
          .includes(term),
      );
    }
  }

  if (filters) {
    const { categories, sizes, collections, colours, availability, maxPrice } = filters;

    if (categories?.length) rows = rows.filter((p) => categories.includes(p.category));
    if (sizes?.length) rows = rows.filter((p) => p.sizes.some((size) => sizes.includes(size)));
    // Collection filters arrive lower-cased from the URL.
    if (collections?.length) {
      const wanted = collections.map((value) => value.toLowerCase());
      rows = rows.filter((p) => wanted.includes(p.collection.toLowerCase()));
    }
    if (colours?.length) rows = rows.filter((p) => p.colours.some((c) => colours.includes(c)));
    if (availability?.length)
      rows = rows.filter((p) => availability.includes(availabilityOf(p)));
    if (typeof maxPrice === 'number') rows = rows.filter((p) => p.price <= maxPrice);
  }

  if (sort === 'price-asc' || sort === 'price-desc') {
    rows.sort(comparators[sort]);
  } else if (!newArrivalsOnly) {
    rows = sort === 'newest' ? rankByNewest(rows) : rankByFeatured(rows);
  }

  const summaries = rows.map(toSummary);
  return typeof limit === 'number' ? summaries.slice(0, limit) : summaries;
}

/** Live search used by the overlay. */
export function searchProducts(query: string, limit = 8): ProductSummary[] {
  return getProductSummaries({ search: query, limit });
}

export const PRICE_BOUNDS = getPriceBounds();

/* ───────────────────────────── Mock writes ─────────────────────────────── */

export type PlaceOrderInput = {
  customer: { name: string; email: string; phone: string };
  delivery: {
    method: 'home' | 'pickup';
    addressLine: string;
    city: string;
    state: string;
    fee: number;
  };
  lines: OrderLine[];
};

/**
 * Creates a mock order with an incrementing `#GGC-00000` reference and stores it
 * locally so `/account` can display it. Replace with `POST /api/orders` later.
 */
export function placeOrder(input: PlaceOrderInput): Order {
  const counter = readJSON<number>(COUNTER_KEY, 0) + 1;
  writeJSON(COUNTER_KEY, counter);

  const subtotal = input.lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const order: Order = {
    id: `order-${Date.now()}`,
    reference: `#GGC-${String(counter).padStart(5, '0')}`,
    createdAt: new Date().toISOString(),
    status: 'ORDER RECEIVED',
    customer: input.customer,
    delivery: input.delivery,
    lines: input.lines,
    totals: { subtotal, delivery: input.delivery.fee, total: subtotal + input.delivery.fee },
  };

  const orders = readJSON<Order[]>(ORDERS_KEY, []);
  writeJSON(ORDERS_KEY, [order, ...orders].slice(0, 25));
  writeJSON(PROFILE_KEY, { name: input.customer.name, email: input.customer.email, phone: input.customer.phone });

  return order;
}

export function getOrders(): Order[] {
  return readJSON<Order[]>(ORDERS_KEY, []);
}

export function getOrderByReference(reference: string): Order | undefined {
  return getOrders().find((order) => order.reference === reference);
}

export type MockProfile = { name: string; email: string; phone: string };

export function getProfile(): MockProfile | null {
  return readJSON<MockProfile | null>(PROFILE_KEY, null);
}
