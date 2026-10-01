/**
 * Metadata helpers.
 *
 * One place for the title template, the Open Graph defaults and the JSON-LD
 * builders, so every route's SEO copy stays consistent.
 */

import type { Metadata } from 'next';
import { site } from '@/data/site';
import { hasPhotography, publicSrc } from './photos';
import type { Product } from './types';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://goodlyandchic.com').replace(/\/$/, '');

const titleTemplate = `%s | ${site.name}`;

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${input.path}`;
  const image = `${siteUrl}${publicSrc(input.image ?? 'images/brand/og-cover.jpg')}`;

  return {
    title: input.title === site.name ? site.name : titleTemplate.replace('%s', input.title),
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      locale: 'en_NG',
      type: input.type === 'product' ? 'website' : 'website',
      images: [{ url: image, width: 1200, height: 630, alt: input.description }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
  };
}

/** The home page uses the bare brand name as its title. */
export const homeMetadata: Metadata = {
  title: `${site.name} | Contemporary Fashion Boutique in Abuja`,
  description: site.description,
  alternates: { canonical: siteUrl },
  openGraph: {
    title: `${site.name} | Contemporary Fashion Boutique in Abuja`,
    description: site.description,
    url: siteUrl,
    siteName: site.name,
    locale: 'en_NG',
    images: [
      {
        url: `${siteUrl}/images/brand/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: site.description,
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
};

export const SITE_URL = siteUrl;

/** `LocalBusiness` JSON-LD for the Abuja boutique. */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: `+${site.contact.whatsappNumber}`,
    email: site.contact.email,
    image: `${siteUrl}/images/brand/og-cover.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line1,
      addressLocality: 'Kuje',
      addressRegion: 'Abuja',
      addressCountry: 'NG',
    },
    areaServed: 'Abuja, Nigeria',
    sameAs: [site.contact.instagramUrl],
    openingHoursSpecification: [],
  };
}

/** `Product` JSON-LD for a product detail page. */
export function productJsonLd(product: Product) {
  const image = hasPhotography(product.images[0]?.src ?? '')
    ? [`${siteUrl}${publicSrc(product.images[0].src)}`]
    : [`${siteUrl}/images/brand/og-cover.jpg`];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image,
    sku: product.sku,
    brand: { '@type': 'Brand', name: site.name },
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: site.currency,
      price: product.price,
      availability:
        product.status === 'ACTIVE'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/product/${product.slug}`,
    },
  };
}

/** `BreadcrumbList` JSON-LD. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
