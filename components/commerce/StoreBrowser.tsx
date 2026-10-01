'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Overlay } from '@/components/ui/Overlay';
import { FilterChip } from '@/components/ui/Chip';
import { ProductGrid } from './ProductGrid';
import { categories } from '@/data/categories';
import { collections } from '@/data/collections';
import { getAllColours, getAllSizes, PRICE_BOUNDS } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import {
  AVAILABILITY_LABELS,
  AVAILABILITY_OPTIONS,
  SORT_LABELS,
  activeFilterCount,
  serialiseFilters,
  toggleValue,
} from '@/lib/filters';
import { SORT_OPTIONS } from '@/lib/types';
import { track } from '@/lib/analytics';
import { swatchTone } from '@/components/ui/Swatch';
import { cn } from '@/lib/utils';
import type {
  CollectionName,
  ColourName,
  ProductCategory,
  ProductSummary,
  SortOption,
  StoreFilters,
} from '@/lib/types';

const SIZES = getAllSizes();
const COLOURS = getAllColours();

type StoreBrowserProps = {
  products: ProductSummary[];
  filters: StoreFilters;
  /** Path the query string is applied to, e.g. `/store` or `/store/dresses`. */
  basePath: string;
  search?: string;
  /** Shown in the toolbar when a category scope is active. */
  scopeLabel?: string;
  emptyState: React.ReactNode;
  clearHref: string;
};

export function StoreBrowser({
  products,
  filters,
  basePath,
  search,
  scopeLabel,
  emptyState,
  clearHref,
}: StoreBrowserProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [local, setLocal] = useState(filters);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Re-sync when the server sends new filters (back/forward navigation).
  useEffect(() => {
    setLocal(filters);
  }, [filters]);

  const commit = useCallback(
    (next: StoreFilters) => {
      setLocal(next);
      const query = serialiseFilters(next, search);
      startTransition(() => {
        router.replace(`${basePath}${query}`, { scroll: false });
      });
    },
    [basePath, router, search],
  );

  const clearAll = useCallback(() => {
    setLocal({ ...local, categories: [], sizes: [], collections: [], colours: [], availability: [], maxPrice: null });
    startTransition(() => router.replace(clearHref, { scroll: false }));
  }, [clearHref, local, router]);

  const count = activeFilterCount(local);
  const panel = (
    <FilterPanel filters={local} onChange={commit} onClear={clearAll} />
  );

  return (
    <div className="shell pb-24 pt-10 md:pt-14">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-taupe py-4">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex min-h-11 items-center gap-2.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-espresso lg:hidden"
            aria-expanded={drawerOpen}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
            Filter
            {count > 0 && <span className="text-espresso-55">({count})</span>}
          </button>
          <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-espresso-55" role="status">
            {products.length} {products.length === 1 ? 'product' : 'products'}
            {scopeLabel ? ` · ${scopeLabel}` : ''}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-espresso-55"
          >
            Sort by
          </label>
          <div className="relative">
            <select
              id="sort"
              value={local.sort}
              onChange={(event) => {
                const sort = event.target.value as SortOption;
                track('sort_changed', { sort, scope: basePath });
                commit({ ...local, sort });
              }}
              className="min-h-11 appearance-none border-b border-taupe bg-transparent pl-0 pr-7 font-sans text-[0.75rem] text-espresso focus:outline-none focus-visible:border-espresso"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {SORT_LABELS[option]}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-b border-r border-espresso"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {count > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-taupe py-4">
          {local.categories.map((value) => (
            <FilterChip
              key={value}
              label={categories.find((c) => c.slug === value)?.label ?? value}
              onRemove={() =>
                commit({ ...local, categories: toggleValue(local.categories, value) })
              }
            />
          ))}
          {local.collections.map((value) => (
            <FilterChip
              key={value}
              label={value}
              onRemove={() =>
                commit({ ...local, collections: toggleValue(local.collections, value) })
              }
            />
          ))}
          {local.sizes.map((value) => (
            <FilterChip
              key={value}
              label={`Size ${value}`}
              onRemove={() => commit({ ...local, sizes: toggleValue(local.sizes, value) })}
            />
          ))}
          {local.colours.map((value) => (
            <FilterChip
              key={value}
              label={value}
              onRemove={() => commit({ ...local, colours: toggleValue(local.colours, value) })}
            />
          ))}
          {local.availability.map((value) => (
            <FilterChip
              key={value}
              label={AVAILABILITY_LABELS[value]}
              onRemove={() =>
                commit({ ...local, availability: toggleValue(local.availability, value) })
              }
            />
          ))}
          {local.maxPrice !== null && (
            <FilterChip
              label={`Under ${formatPrice(local.maxPrice)}`}
              onRemove={() => commit({ ...local, maxPrice: null })}
            />
          )}
          <button
            type="button"
            onClick={clearAll}
            className="link-underline ml-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-espresso-55 hover:text-espresso"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Grid + desktop sidebar */}
      <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">{panel}</div>
        </aside>

        <div
          className={cn(
            'lg:col-span-9 transition-opacity duration-300',
            isPending && 'opacity-50',
          )}
        >
          {products.length > 0 ? (
            <ProductGrid products={products} priorityCount={4} />
          ) : (
            emptyState
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Overlay
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        labelledBy="filter-drawer-title"
        mode="drawer"
      >
        <div className="flex h-full flex-col bg-ivory">
          <div className="flex shrink-0 items-center justify-between border-b border-taupe px-5 py-5 pr-16">
            <h2
              id="filter-drawer-title"
              className="font-sans text-label font-medium uppercase tracking-[0.18em] text-espresso"
            >
              Filter
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6">{panel}</div>
          <div className="shrink-0 border-t border-taupe bg-ivory px-5 py-4">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setDrawerOpen(false)}
            >
              Show {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </Button>
          </div>
        </div>
      </Overlay>
    </div>
  );
}

type PanelProps = {
  filters: StoreFilters;
  onChange: (next: StoreFilters) => void;
  onClear: () => void;
};

function FilterPanel({ filters, onChange, onClear }: PanelProps) {
  const step = 1000;
  const rangeMax = Math.ceil(PRICE_BOUNDS.max / step) * step;

  return (
    <div className="flex flex-col gap-9">
      <Group title="Category">
        <CheckList
          options={categories.map((c) => ({ value: c.slug, label: c.label }))}
          selected={filters.categories}
          onToggle={(value) => {
            onChange({ ...filters, categories: toggleValue(filters.categories, value as ProductCategory) });
            track('filter_applied', { group: 'category', value });
          }}
        />
      </Group>

      <Group title="Collection">
        <CheckList
          options={collections.map((c) => ({ value: c.name, label: c.name }))}
          selected={filters.collections}
          onToggle={(value) => {
            onChange({
              ...filters,
              collections: toggleValue(filters.collections, value as CollectionName),
            });
            track('filter_applied', { group: 'collection', value });
          }}
        />
      </Group>

      <Group title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const selected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  onChange({ ...filters, sizes: toggleValue(filters.sizes, size) });
                  track('filter_applied', { group: 'size', value: size });
                }}
                className={cn(
                  'min-h-10 min-w-[2.75rem] border px-3 font-sans text-[0.75rem] transition-colors duration-200',
                  selected
                    ? 'border-espresso bg-espresso text-ivory'
                    : 'border-taupe bg-transparent text-espresso hover:border-espresso',
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </Group>

      <Group title={`Price · up to ${formatPrice(filters.maxPrice ?? rangeMax)}`}>
        <label htmlFor="price-range" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-range"
          type="range"
          min={PRICE_BOUNDS.min}
          max={rangeMax}
          step={step}
          value={filters.maxPrice ?? rangeMax}
          onChange={(event) => {
            const value = Number(event.target.value);
            onChange({ ...filters, maxPrice: value >= rangeMax ? null : value });
          }}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-taupe accent-espresso"
        />
        <div className="mt-2 flex justify-between font-sans text-[0.6875rem] text-espresso-55">
          <span>{formatPrice(PRICE_BOUNDS.min)}</span>
          <span>{formatPrice(rangeMax)}</span>
        </div>
      </Group>

      <Group title="Colour">
        <ul className="flex flex-wrap gap-2.5">
          {COLOURS.map((colour) => {
            const selected = filters.colours.includes(colour as ColourName);
            return (
              <li key={colour}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    onChange({
                      ...filters,
                      colours: toggleValue(filters.colours, colour as ColourName),
                    });
                    track('filter_applied', { group: 'colour', value: colour });
                  }}
                  className="group/swatch flex items-center gap-2"
                >
                  <span
                    className={cn(
                      'h-6 w-6 rounded-full border transition-shadow duration-200',
                      selected
                        ? 'border-espresso ring-1 ring-espresso ring-offset-2 ring-offset-ivory'
                        : 'border-taupe group-hover/swatch:border-espresso',
                    )}
                    style={{ backgroundColor: swatchTone[colour as ColourName] }}
                    aria-hidden="true"
                  />
                  <span className="font-sans text-[0.75rem] text-espresso-70">{colour}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Group>

      <Group title="Availability">
        <CheckList
          options={AVAILABILITY_OPTIONS.map((option) => ({
            value: option,
            label: AVAILABILITY_LABELS[option],
          }))}
          selected={filters.availability}
          onToggle={(value) =>
            onChange({
              ...filters,
              availability: toggleValue(
                filters.availability,
                value as StoreFilters['availability'][number],
              ),
            })
          }
        />
      </Group>

      {activeFilterCount(filters) > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="link-underline self-start font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-espresso-55 hover:text-espresso"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-taupe pt-5">
      <legend className="sr-only">{title}</legend>
      <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-espresso">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

type CheckListProps = {
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
};

function CheckList({ options, selected, onToggle }: CheckListProps) {
  return (
    <ul className="space-y-1">
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <li key={option.value}>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[0.875rem] text-espresso-70 transition-colors duration-200 hover:text-espresso">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option.value)}
                className="h-4 w-4 shrink-0 appearance-none rounded-none border border-taupe bg-white transition-colors duration-200 checked:border-espresso checked:bg-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
              />
              <span className="relative">
                {option.label}
                {checked && (
                  <span
                    className="pointer-events-none absolute -left-[1.35rem] top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-ivory"
                    aria-hidden="true"
                  />
                )}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
