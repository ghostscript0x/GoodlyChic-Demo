/**
 * Nigerian geography and mock delivery pricing.
 *
 * Delivery fees are demo figures for the checkout summary only. They will be
 * replaced by the courier's rate card (or a live shipping API) in a backend phase.
 */

export const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT — Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
] as const;

export type NigerianState = (typeof NIGERIAN_STATES)[number];

/** Zone 1 is Abuja and its immediate surroundings. */
const zone1: readonly string[] = ['FCT — Abuja', 'Nasarawa', 'Kogi', 'Niger'];

/** Zone 2 covers the south-east and south-west corridors. */
const zone2: readonly string[] = [
  'Anambra',
  'Enugu',
  'Imo',
  'Abia',
  'Edo',
  'Delta',
  'Bayelsa',
  'Rivers',
  'Akwa Ibom',
  'Cross River',
  'Lagos',
  'Ogun',
  'Oyo',
  'Osun',
  'Ondo',
  'Ekiti',
  'Kwara',
];

/**
 * Mock delivery fees in naira. Boutique pickup is always free.
 * Tier 3 (all remaining states) is deliberately priced as "quoted" behaviour:
 * a flat figure is shown, as a real rate card would do.
 */
export const DELIVERY_TIERS = {
  pickup: { label: 'Boutique pickup', fee: 0, note: 'Collect from Market Square, Kuje, Abuja' },
  zone1: { label: 'Home delivery', fee: 3500, note: 'Delivered within 1–2 working days' },
  zone2: { label: 'Home delivery', fee: 7500, note: 'Delivered within 2–4 working days' },
  zone3: { label: 'Home delivery', fee: 12000, note: 'Delivered within 3–5 working days' },
} as const;

export type DeliveryTier = keyof typeof DELIVERY_TIERS;

export function deliveryTierForState(state: string): DeliveryTier {
  if (zone1.includes(state)) return 'zone1';
  if (zone2.includes(state)) return 'zone2';
  return 'zone3';
}

export function deliveryFeeForState(state: string): number {
  return DELIVERY_TIERS[deliveryTierForState(state)].fee;
}

export const deliveryOption = (state: string) => DELIVERY_TIERS[deliveryTierForState(state)];
