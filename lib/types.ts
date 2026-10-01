/**
 * Domain types for the Goodly & Chic storefront.
 *
 * These mirror the shape a real commerce API would return, so swapping the mock
 * data in `/data` for HTTP calls later requires no changes to the UI.
 */

export const PRODUCT_CATEGORIES = [
  'dresses',
  'tops',
  'trousers',
  'bags',
  'shoes',
  'accessories',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const COLLECTIONS = ['Everyday', 'Occasion', 'Statement'] as const;

export type CollectionName = (typeof COLLECTIONS)[number];

export type ProductStatus = 'ACTIVE' | 'OUT_OF_STOCK';

export type ProductBadge = 'NEW' | 'LIMITED' | 'BESTSELLER' | 'LOW_STOCK' | null;

export type ColourName =
  | 'Ivory'
  | 'Espresso'
  | 'Sand'
  | 'Black'
  | 'Blush'
  | 'Champagne'
  | 'Camel'
  | 'Chocolate';

export type ProductImage = {
  /** Public-root-relative path, e.g. `images/products/the-goodly-trouser-1.jpg`. */
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  collection: CollectionName;
  /** Minor units are avoided deliberately: prices are whole naira in this market. */
  price: number;
  comparePrice: number | null;
  images: ProductImage[];
  description: string;
  details: string[];
  sizes: string[];
  colours: ColourName[];
  /** Units available per size. Keys match `sizes`. */
  inventory: Record<string, number>;
  sku: string;
  weight: string;
  status: ProductStatus;
  badge: ProductBadge;
  relatedProducts: string[];
};

/** Shape returned by the store listing endpoint. */
export type ProductSummary = Pick<
  Product,
  | 'id'
  | 'name'
  | 'slug'
  | 'category'
  | 'collection'
  | 'price'
  | 'comparePrice'
  | 'images'
  | 'sizes'
  | 'colours'
  | 'inventory'
  | 'status'
  | 'badge'
> & { availableSizes: string[] };

export type StoreFilters = {
  categories: ProductCategory[];
  sizes: string[];
  collections: CollectionName[];
  colours: ColourName[];
  availability: ('in-stock' | 'low-stock' | 'out-of-stock')[];
  maxPrice: number | null;
  sort: SortOption;
};

export const SORT_OPTIONS = [
  'featured',
  'newest',
  'price-asc',
  'price-desc',
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export type CartLine = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: ProductImage;
  price: number;
  comparePrice: number | null;
  size: string;
  colour: ColourName;
  quantity: number;
  stock: number;
};

export type OrderLine = {
  name: string;
  slug: string;
  size: string;
  colour: ColourName;
  quantity: number;
  price: number;
};

export type DeliveryMethod = 'home' | 'pickup';

export type Order = {
  id: string;
  reference: string;
  createdAt: string;
  status: 'ORDER RECEIVED';
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  delivery: {
    method: DeliveryMethod;
    addressLine: string;
    city: string;
    state: string;
    fee: number;
  };
  lines: OrderLine[];
  totals: { subtotal: number; delivery: number; total: number };
};
