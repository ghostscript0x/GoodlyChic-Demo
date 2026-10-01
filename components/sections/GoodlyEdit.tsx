import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { categories } from '@/data/categories';
import { collections } from '@/data/collections';
import { getProductsByCategory } from '@/lib/catalog';

/** 5 — The Goodly Edit: four tall category cards. */
export function GoodlyEdit() {
  const cards = [
    { slug: 'dresses', image: getProductsByCategory('dresses', 1)[0] },
    { slug: 'trousers', image: getProductsByCategory('trousers', 1)[0] },
    { slug: 'bags', image: getProductsByCategory('bags', 1)[0] },
    { slug: 'shoes', image: getProductsByCategory('shoes', 1)[0] },
  ];

  return (
    <section className="section-y bg-ivory" aria-labelledby="goodly-edit-heading">
      <div className="shell-wide">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="The Goodly Edit"
                title="Discover pieces curated for every version of you."
                size="h2"
                className="max-w-[26ch]"
              />
            </div>
            <div className="flex items-end lg:col-span-4 lg:col-start-9">
              <p className="max-w-[40ch] text-body-sm text-espresso-70">
                Dresses for the plans you made. Trousers for everything else. The bag and the shoes
                that finish the thought. Start with the category that answers the day.
              </p>
            </div>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
          {cards.map((card) => {
            const category = categories.find((c) => c.slug === card.slug);
            if (!category) return null;
            return (
              <RevealItem key={card.slug}>
                <Link href={`/store/${category.slug}`} className="group block">
                  <div className="relative overflow-hidden">
                    <Photo
                      src={card.image?.images[0].src ?? ''}
                      alt={category.label}
                      ratio="portrait"
                      sizes="(min-width: 1024px) 23vw, 46vw"
                      hoverZoom
                    />
                  </div>
                  <h3 className="mt-5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-espresso">
                    <span className="link-underline">{category.label}</span>
                  </h3>
                  <p className="mt-2 max-w-[22ch] text-body-sm text-espresso-55">
                    {category.subline}
                  </p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/** 9 — Dress for the moment: three editorial cards. */
export function DressForTheMoment() {
  return (
    <section className="section-y bg-sand" aria-labelledby="moment-heading">
      <div className="shell-wide">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The Edit"
              title="Dress for the moment."
              size="h2"
              className="max-w-[20ch]"
            />
            <ButtonLink href="/the-edit" variant="text" size="md" withArrow className="shrink-0">
              Explore The Edit
            </ButtonLink>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {collections.map((collection) => (
            <RevealItem key={collection.slug}>
              <Link
                href={`/the-edit/${collection.slug}`}
                className="group flex h-full flex-col border-t border-espresso/15 pt-6"
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-champagne" aria-hidden="true" />
                  <p className="font-sans text-label font-medium uppercase text-espresso-55">
                    {collection.name}
                  </p>
                </div>
                <h3 className="mt-5 max-w-[16ch] font-display text-h3 text-espresso">
                  {collection.title}
                </h3>
                <p className="mt-4 max-w-[38ch] flex-1 text-body-sm text-espresso-70">
                  {collection.editorial}
                </p>
                <span className="mt-7 inline-flex min-h-11 items-center gap-2.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-espresso">
                  {collection.subline}
                  <span
                    className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
