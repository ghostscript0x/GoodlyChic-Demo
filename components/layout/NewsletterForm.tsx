'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * Mock newsletter capture. No list is actually created — the success state is
 * the real behaviour of this phase.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState('error');
      return;
    }
    setState('done');
    track('newsletter_signup', { source: 'footer' });
  };

  if (state === 'done') {
    return (
      <div className={cn('flex items-center gap-3 border border-ivory/25 px-4 py-4', className)}>
        <Check className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} aria-hidden="true" />
        <p className="text-[0.8125rem] text-ivory">Thank you — you are on the list.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn('w-full', className)} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex border-b border-ivory/30 focus-within:border-champagne">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === 'error') setState('idle');
          }}
          placeholder="Your email address"
          autoComplete="email"
          className="min-h-12 flex-1 bg-transparent font-sans text-[0.875rem] text-ivory placeholder:text-ivory-55 focus:outline-none"
        />
        <button
          type="submit"
          className="group flex h-12 w-12 shrink-0 items-center justify-center text-ivory transition-colors duration-300 hover:text-champagne"
          aria-label="Join the list"
        >
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-2 text-[0.75rem] text-ivory-70">That email address does not look right.</p>
      )}
    </form>
  );
}
