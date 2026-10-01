import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { homeImages, instagramImages, instagramSlots } from '@/data/images';
import { mapsDirectionsUrl, site, whatsapp } from '@/data/site';

/** 11 — WhatsApp as a real commerce channel. */
export function WhatsAppCommerce() {
  return (
    <section className="section-y bg-white" aria-labelledby="whatsapp-heading">
      <div className="shell-wide grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:order-2">
          <Reveal>
            <Eyebrow>Personal Shopping</Eyebrow>
            <h2 id="whatsapp-heading" className="mt-6 text-h2">
              See something
              <br />
              you <em className="font-display italic">love?</em>
            </h2>
            <p className="mt-7 max-w-[46ch] text-body text-espresso-70">
              Send us the piece. We will answer sizing, styling and delivery questions on WhatsApp —
              the same way we would if you walked into the boutique. One-to-one, no pressure, and a
              real person on the other end.
            </p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <ButtonLink href={whatsapp.general} variant="primary" size="lg" withArrow>
                Chat on WhatsApp
              </ButtonLink>
              <ButtonLink href="/store" variant="text" size="md">
                Or shop the store
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:order-1 lg:row-start-1">
          <Reveal>
            <Photo
              src={homeImages.whatsapp.src}
              alt={homeImages.whatsapp.alt}
              ratio="square"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** 12 — Why Goodly & Chic: three quiet pillars. */
export function WhyGoodlyChic() {
  const pillars = [
    {
      title: 'Curated',
      copy: 'A small, considered collection instead of an endless feed. If it does not earn its place beside the rest, it does not make it in.',
    },
    {
      title: 'Personal',
      copy: 'Sizing questions answered by a person who knows the fabric. Boutique advice and WhatsApp advice come from the same team.',
    },
    {
      title: 'Distinctive',
      copy: 'Warm neutrals, honest texture and a silhouette that reads as yours. Nothing here is designed to disappear.',
    },
  ];

  return (
    <section className="section-y bg-sand" aria-labelledby="why-heading">
      <div className="shell-wide">
        <Reveal>
          <SectionHeading
            eyebrow="Why Goodly & Chic"
            title="Three things we refuse to compromise."
            size="h2"
            align="center"
            className="mx-auto items-center text-center"
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.title}>
              <div className="flex h-full flex-col items-center border-t border-espresso/20 pt-7 text-center">
                <h3 className="font-display text-h3 text-espresso">{pillar.title}</h3>
                <p className="mt-4 max-w-[34ch] text-body-sm text-espresso-70">{pillar.copy}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** 13 — Visit the boutique. */
export function BoutiqueSection() {
  return (
    <section className="section-y bg-ivory" aria-labelledby="boutique-heading">
      <div className="shell-wide grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <Photo
              src={homeImages.boutique.src}
              alt={homeImages.boutique.alt}
              ratio="editorial"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow>The Boutique</Eyebrow>
            <h2 id="boutique-heading" className="mt-6 text-h2">
              Come experience
              <br />
              <em className="font-display italic">Goodly &amp; Chic.</em>
            </h2>
            <p className="mt-7 max-w-[44ch] text-body text-espresso-70">
              Our boutique sits in Market Square, Sauka Village Extension, Kuje, Abuja. Try the
              fabric, take your time, and let us build the outfit around you.
            </p>

            <address className="mt-8 not-italic">
              <p className="font-sans text-label uppercase text-espresso-55">Visit us</p>
              <p className="mt-3 text-body-sm text-espresso">{site.address.formatted}</p>
              <p className="mt-3 text-body-sm text-espresso-70">{site.openingHours}</p>
            </address>

            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <ButtonLink href={mapsDirectionsUrl} variant="secondary" size="md" withArrow>
                Get directions
              </ButtonLink>
              <ButtonLink href="/boutique" variant="text" size="md">
                About the boutique
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** 14 — Instagram strip. */
export function InstagramSection() {
  return (
    <section className="section-y bg-ivory" aria-labelledby="instagram-heading">
      <div className="shell-wide">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Instagram</Eyebrow>
              <h2 id="instagram-heading" className="mt-6 text-h2">
                The Goodly Woman.
              </h2>
              <p className="mt-4 font-sans text-body-sm text-espresso-55">
                {site.contact.instagramHandle}
              </p>
            </div>
            <ButtonLink
              href={site.contact.instagramUrl}
              variant="text"
              size="md"
              withArrow
              className="shrink-0"
            >
              Follow on Instagram
            </ButtonLink>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 lg:grid-cols-6">
          {instagramSlots.map((slot, index) => (
            <li key={instagramImages[index]}>
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
              >
                <Photo
                  src={slot.src}
                  alt={slot.alt}
                  ratio="square"
                  tone={slot.tone}
                  subject={slot.subject}
                  label={slot.label}
                  sizes="(min-width: 1024px) 14vw, (min-width: 640px) 30vw, 47vw"
                  hoverZoom
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
