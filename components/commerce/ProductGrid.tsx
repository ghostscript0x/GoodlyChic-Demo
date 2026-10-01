import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';
import type { ProductSummary } from '@/lib/types';

type ProductGridProps = {
  products: ProductSummary[];
  /** Eagerly load the first row of imagery. */
  priorityCount?: number;
  columns?: 3 | 4;
  /** `light` is for espresso surfaces. */
  tone?: 'default' | 'light';
  className?: string;
  emptyState?: React.ReactNode;
};

export function ProductGrid({
  products,
  priorityCount = 0,
  columns = 4,
  tone = 'default',
  className,
  emptyState,
}: ProductGridProps) {
  if (products.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-8 lg:gap-y-16',
        columns === 4 && 'lg:grid-cols-4',
        className,
      )}
    >
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            tone={tone}
            priority={index < priorityCount}
            sizes={
              columns === 4
                ? '(min-width: 1280px) 21vw, (min-width: 1024px) 24vw, (min-width: 768px) 31vw, 47vw'
                : '(min-width: 768px) 30vw, 47vw'
            }
          />
        </li>
      ))}
    </ul>
  );
}
