'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Which panel starts open, if any. */
  defaultOpen?: string;
  className?: string;
  tone?: 'default' | 'light';
};

/** Quiet editorial accordion: hairline rules, tracked labels, no heavy chrome. */
export function Accordion({ items, defaultOpen, className, tone = 'default' }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const light = tone === 'light';

  return (
    <div className={cn('border-t', light ? 'border-ivory/20' : 'border-taupe', className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div key={item.id} className={cn('border-b', light ? 'border-ivory/20' : 'border-taupe')}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className={cn(
                  'flex w-full min-h-14 items-center justify-between gap-4 py-4 text-left font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200',
                  light ? 'text-ivory hover:text-white' : 'text-espresso hover:text-espresso-55',
                )}
              >
                {item.title}
                {isOpen ? (
                  <Minus className="h-3.5 w-3.5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
                ) : (
                  <Plus className="h-3.5 w-3.5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                'pb-6 text-[0.9375rem] leading-relaxed',
                light ? 'text-ivory-70' : 'text-espresso-70',
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
