/**
 * Analytics stub.
 *
 * `track()` is the single seam where a real analytics provider (GA4, Plausible,
 * Segment, Klaviyo) will be wired in. Every meaningful interaction on the site
 * already calls it, so switching providers is a one-file change.
 */

export type TrackEvent =
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout_started'
  | 'purchase_completed'
  | 'wishlist_added'
  | 'wishlist_removed'
  | 'search'
  | 'quick_view'
  | 'whatsapp_click'
  | 'instagram_click'
  | 'directions_click'
  | 'newsletter_signup'
  | 'filter_applied'
  | 'sort_changed';

export type TrackPayload = Record<string, string | number | boolean | null | undefined>;

const isDebug = () => process.env.NODE_ENV !== 'production';

export function track(event: TrackEvent, payload: TrackPayload = {}): void {
  if (typeof window === 'undefined') return;
  if (isDebug()) {
    console.info(`[track] ${event}`, payload);
  }
  // Integration point: forward to the chosen provider here, e.g.
  // window.gtag?.('event', event, payload) or plausible(event, { props: payload }).
}
