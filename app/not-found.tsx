import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-[5rem] leading-none tracking-[-0.04em] text-taupe sm:text-[7rem]">
        404
      </p>
      <h1 className="mt-8 font-display text-h3 text-espresso">This page has wandered off.</h1>
      <p className="mt-4 max-w-[46ch] text-body text-espresso-70">
        The page you were looking for is not here. The collection, however, is exactly where we
        left it.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/store" variant="primary" size="md" withArrow>
          Explore the store
        </ButtonLink>
        <ButtonLink href="/" variant="secondary" size="md">
          Back to home
        </ButtonLink>
      </div>
      <p className="mt-12 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-espresso-55">
        Looking for something specific?{' '}
        <Link href="/boutique#contact" className="link-underline text-espresso">
          Talk to the boutique
        </Link>
      </p>
    </div>
  );
}
