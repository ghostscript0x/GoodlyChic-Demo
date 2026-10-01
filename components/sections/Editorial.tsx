import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { homeImages } from '@/data/images';

/** 7 — Full-bleed campaign banner. */
export function EditorialCampaign() {
  return (
    <section className="relative bg-ivory" aria-labelledby="campaign-heading">
      <Photo
        src={homeImages.campaign.src}
        alt={homeImages.campaign.alt}
        ratio="banner"
        tone={homeImages.campaign.tone}
        subject={homeImages.campaign.subject}
        sizes="100vw"
      />

      {/* Ivory wash keeps the copy legible over photography without a dark scrim. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,237,0.92)_0%,rgba(247,243,237,0.66)_42%,rgba(247,243,237,0)_78%)]"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center">
        <div className="shell w-full">
          <div className="max-w-[30rem]">
            <Eyebrow>The Goodly Woman</Eyebrow>
            <h2
              id="campaign-heading"
              className="mt-6 font-display text-h2 leading-[1.06] text-espresso"
            >
              For the woman
              <br />
              she is <em className="italic">becoming.</em>
            </h2>
            <div className="mt-8">
              <ButtonLink href="/the-edit" variant="secondary" size="md" withArrow>
                Explore The Edit
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 8 — The Goodly Woman: image left, editorial copy right. */
export function GoodlyWoman() {
  return (
    <section className="section-y bg-ivory" aria-labelledby="goodly-woman-heading">
      <div className="shell-wide grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Photo
              src={homeImages.goodlyWoman.src}
              alt={homeImages.goodlyWoman.alt}
              ratio="editorial"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>The Goodly Woman</Eyebrow>
            <h2 id="goodly-woman-heading" className="mt-6 text-h2">
              She is the reason
              <br />
              we <em className="font-display italic">curate.</em>
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-7 max-w-[52ch] space-y-5 text-body text-espresso-70">
              <p>
                She is not a trend report or a size on a label. She is the woman who knows her
                fabric, who wears one colour head to toe without apology, who reads a room before
                she enters it.
              </p>
              <p>
                We design with her in mind — because a wardrobe built for her needs nothing to be
                proven. That is the whole idea behind Goodly &amp; Chic.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-taupe pt-8">
              {[
                { value: '24', label: 'Curated pieces' },
                { value: '1', label: 'Point of view' },
                { value: 'Abuja', label: 'Home' },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-h3 text-espresso">{stat.value}</span>
                    <span className="mt-2 block font-sans text-label uppercase text-espresso-55">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <ButtonLink href="/about" variant="secondary" size="md" withArrow>
                Discover her story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
