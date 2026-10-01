import type { Metadata } from 'next';
import { StoreListing } from '@/components/commerce/StoreListing';
import { parseFilters, FILTER_KEYS } from '@/lib/filters';
import { pageMetadata } from '@/lib/seo';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = pageMetadata({
  title: "Shop Women's Fashion",
  description:
    'Shop the Goodly & Chic collection: dresses, tops, trousers, bags, shoes and accessories curated for the woman who knows her style.',
  path: '/store',
});

export default async function StorePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = new URLSearchParams(
    Object.entries(await searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] ?? '' : value ?? '']),
  );

  const filters = parseFilters(params);
  const search = params.get(FILTER_KEYS.q) ?? '';

  return (
    <StoreListing
      filters={filters}
      search={search}
      category={null}
      newArrivalsOnly={false}
      basePath="/store"
      clearHref="/store"
      eyebrow="The Collection"
      heading="The Store"
      subline="Discover the Goodly & Chic collection."
      editorial="Twenty-four pieces, considered rather than collected. Filter by category, size, colour and price to find what fits."
    />
  );
}
