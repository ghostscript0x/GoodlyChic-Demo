import { ButtonLink } from '@/components/ui/Button';
import { ProductGrid } from '@/components/commerce/ProductGrid';
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getFeaturedProducts, getNewArrivals, toProductSummaries } from '@/lib/catalog';
import { whatsapp } from '@/data/site';

/** 6 — New Arrivals. */
export function NewArrivals() {
  const products = toProductSummaries(getNewArrivals(4));

  return (
    <section className="section-y bg-ivory" aria-label="New arrivals">
      <div className="shell-wide">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Just In"
              title="New arrivals."
              size="h2"
              className="max-w-[20ch]"
            />
            <ButtonLink
              href="/store/new-arrivals"
              variant="text"
              size="md"
              withArrow
              className="shrink-0"
            >
              View all new arrivals
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          <ProductGrid products={products} priorityCount={2} />
        </div>
      </div>
    </section>
  );
}

/** 10 — The Goodly Selection: hero products on espresso. */
export function GoodlySelection() {
  const products = toProductSummaries(getFeaturedProducts(4));

  return (
    <section className="section-y bg-espresso text-ivory" aria-label="The Goodly Selection">
      <div className="shell-wide">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The Goodly Selection"
              title="The pieces we would keep."
              size="h2"
              tone="light"
              className="max-w-[22ch]"
            />
            <ButtonLink
              href="/store"
              variant="light"
              size="md"
              withArrow
              className="shrink-0"
            >
              Shop the selection
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          <ProductGrid products={products} tone="light" priorityCount={2} />
        </div>
      </div>
    </section>
  );
}

/** 15 — Closing espresso CTA. */
export function FinalCta() {
  return (
    <section className="bg-espresso py-28 text-ivory md:py-36" aria-label="Shop Goodly & Chic">
      <div className="shell text-center">
        <Eyebrow tone="light">Goodly &amp; Chic</Eyebrow>
        <h2 id="final-cta-heading" className="mx-auto mt-7 max-w-[16ch] text-h2 text-ivory">
          Your style. <em className="font-display italic">Your moment.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[46ch] text-body-lg text-ivory-70">
          Find the piece that makes the whole day make sense. Delivered across Nigeria, or
          collected in the boutique.
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <ButtonLink href="/store" variant="light" size="lg" withArrow>
            Shop the collection
          </ButtonLink>
          <ButtonLink
            href={whatsapp.general}
            variant="text"
            size="md"
            className="text-ivory"
          >
            Chat on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
