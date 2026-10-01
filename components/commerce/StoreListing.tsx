import Link from 'next/link';
import { categories } from '@/data/categories';
import { getProductSummaries } from '@/lib/catalog';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { StoreBrowser } from './StoreBrowser';
import type { ProductCategory, StoreFilters } from '@/lib/types';

const TABS: { label: string; href: string; slug?: string | 'new-arrivals' }[] = [
  { label: 'All', href: '/store' },
  { label: 'New', href: '/store/new-arrivals', slug: 'new-arrivals' },
  ...categories.map((category) => ({
    label: category.label,
    href: `/store/${category.slug}`,
    slug: category.slug,
  })),
];

type StoreListingProps = {
  filters: StoreFilters;
  search: string;
  category: ProductCategory | null;
  newArrivalsOnly: boolean;
  basePath: string;
  clearHref: string;
  eyebrow: string;
  heading: string;
  subline: string;
  /** Editorial line shown under the subline on category pages. */
  editorial?: string;
  activeTab?: string;
};

export function StoreListing({
  filters,
  search,
  category,
  newArrivalsOnly,
  basePath,
  clearHref,
  eyebrow,
  heading,
  subline,
  editorial,
  activeTab,
}: StoreListingProps) {
  const products = getProductSummaries({
    category: newArrivalsOnly ? null : category,
    newArrivalsOnly,
    search,
    filters,
  });

  return (
    <>
      <header className="shell-wide border-b border-taupe pb-12 pt-14 md:pb-16 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-h1">{heading}</h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-[46ch] text-body-lg text-espresso-70">{subline}</p>
            {editorial && (
              <p className="mt-4 max-w-[46ch] text-body-sm text-espresso-55">{editorial}</p>
            )}
          </div>
        </div>
      </header>

      <nav aria-label="Product categories" className="border-b border-taupe">
        <div className="shell-wide no-scrollbar overflow-x-auto">
          <ul className="flex min-w-max items-center gap-8">
            {TABS.map((tab) => {
              const active = tab.slug === activeTab || (!activeTab && tab.href === basePath);
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex min-h-14 items-center border-b font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                      active
                        ? 'border-espresso text-espresso'
                        : 'border-transparent text-espresso-55 hover:text-espresso'
                    }`}
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <StoreBrowser
        products={products}
        filters={filters}
        basePath={basePath}
        search={search}
        scopeLabel={newArrivalsOnly ? 'New arrivals' : (activeTab && activeTab !== 'new-arrivals' ? categoryLabel(activeTab) : undefined)}
        clearHref={clearHref}
        emptyState={
          <div className="flex flex-col items-center border border-taupe bg-white px-6 py-20 text-center">
            <p className="eyebrow">Nothing here</p>
            <h2 className="mt-5 font-display text-h3 text-espresso">
              That combination comes up empty.
            </h2>
            <p className="mt-3 max-w-[44ch] text-body-sm text-espresso-70">
              Try easing a filter or two — or let us point you in the right direction. We are good
              at this.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={clearHref} variant="primary" size="md" withArrow>
                Clear filters
              </ButtonLink>
              <ButtonLink href="/the-edit" variant="secondary" size="md">
                Browse The Edit
              </ButtonLink>
            </div>
          </div>
        }
      />
    </>
  );
}

function categoryLabel(slug: string): string | undefined {
  return categories.find((c) => c.slug === slug)?.label;
}
