import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoreListing } from '@/components/commerce/StoreListing';
import { categoryBySlug } from '@/data/categories';
import { FILTER_KEYS, parseFilters } from '@/lib/filters';
import { pageMetadata } from '@/lib/seo';
import { PRODUCT_CATEGORIES, type ProductCategory } from '@/lib/types';

type Params = Promise<{ category: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const NEW_ARRIVALS = 'new-arrivals';

export function generateStaticParams() {
  return [...PRODUCT_CATEGORIES.map((slug) => ({ category: slug })), { category: NEW_ARRIVALS }];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category: slug } = await params;

  if (slug === NEW_ARRIVALS) {
    return pageMetadata({
      title: 'New Arrivals',
      description:
        'The newest pieces to arrive at Goodly & Chic — considered additions to the collection in Abuja.',
      path: '/store/new-arrivals',
    });
  }

  const category = categoryBySlug(slug);
  if (!category) return { title: 'Goodly & Chic' };

  return pageMetadata({
    title: `Shop ${category.label}`,
    description: `${category.subline} ${category.editorial}`,
    path: `/store/${category.slug}`,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { category: slug } = await params;
  const isNewArrivals = slug === NEW_ARRIVALS;
  const category = isNewArrivals ? undefined : categoryBySlug(slug);

  if (!isNewArrivals && !category) notFound();

  const search = new URLSearchParams(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] ?? '' : value ?? '',
    ]),
  );

  const filters = parseFilters(search);
  const query = search.get(FILTER_KEYS.q) ?? '';

  return (
    <StoreListing
      filters={filters}
      search={query}
      category={(category?.slug as ProductCategory) ?? null}
      newArrivalsOnly={isNewArrivals}
      basePath={`/store/${slug}`}
      clearHref={`/store/${slug}`}
      activeTab={slug}
      eyebrow={isNewArrivals ? 'Just In' : `Shop · ${category?.label}`}
      heading={isNewArrivals ? 'New Arrivals' : (category?.title ?? 'The Store')}
      subline={
        isNewArrivals
          ? 'The newest pieces to arrive, added to the collection as they are finished.'
          : (category?.subline ?? '')
      }
      editorial={isNewArrivals ? undefined : category?.editorial}
    />
  );
}
