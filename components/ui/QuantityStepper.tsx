'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
  tone?: 'default' | 'light';
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label = 'Quantity',
  size = 'md',
  className,
  tone = 'default',
}: QuantityStepperProps) {
  const light = tone === 'light';
  const buttonClass = cn(
    'flex items-center justify-center transition-colors duration-200 disabled:opacity-30',
    light ? 'text-ivory hover:text-white' : 'text-espresso hover:text-espresso-55',
  );

  return (
    <div
      className={cn(
        'inline-flex items-center border',
        light ? 'border-ivory/25' : 'border-taupe',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(buttonClass, size === 'sm' ? 'h-10 w-10' : 'h-12 w-12')}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
      </button>
      <span
        className={cn(
          'min-w-[2.5rem] text-center font-sans text-sm tabular-nums',
          light ? 'text-ivory' : 'text-espresso',
          size === 'sm' && 'min-w-[2rem] text-[0.8125rem]',
        )}
        aria-live="polite"
      >
        <span className="sr-only">{label}: </span>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(buttonClass, size === 'sm' ? 'h-10 w-10' : 'h-12 w-12')}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
      </button>
    </div>
  );
}
