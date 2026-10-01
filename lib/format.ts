import { site } from '@/data/site';

const nairaFormatter = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat(site.locale);

/**
 * Formats a price in naira using the Nigerian locale, e.g. `₦68,000`.
 * The locale's non-breaking space between symbol and figure is kept on
 * purpose — it prevents an awkward line break inside a price.
 */
export function formatPrice(amount: number): string {
  return nairaFormatter.format(amount);
}

/** `1,240` — for counts and totals that are not prices. */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** Pluralises a noun against a count: `pluralise(1, 'product')` → `1 product`. */
export function pluralise(count: number, noun: string, plural = `${noun}s`): string {
  return `${formatNumber(count)} ${count === 1 ? noun : plural}`;
}

/** Percentage saved against a compare-at price, rounded to a whole number. */
export function discountPercent(price: number, comparePrice: number | null): number | null {
  if (!comparePrice || comparePrice <= price) return null;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}
