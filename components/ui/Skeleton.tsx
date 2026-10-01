'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type SkeletonProps = { className?: string; aspectRatio?: string };

/** Calm placeholder block in sand tones. No spinners. */
export function Skeleton({ className, aspectRatio }: SkeletonProps) {
  return (
    <div
      className={cn('relative overflow-hidden bg-sand', className)}
      style={aspectRatio ? { aspectRatio } : undefined}
      aria-hidden="true"
    >
      <span className="gc-shimmer absolute inset-0" />
    </div>
  );
}

/** Product card skeleton matching the real card's geometry. */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full" aspectRatio="4 / 5" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Fades content in once, to avoid a flash while client state hydrates. */
export function Hydrated({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setReady(true), []);

  if (!ready) return <>{fallback ?? null}</>;
  return <div ref={ref}>{children}</div>;
}
