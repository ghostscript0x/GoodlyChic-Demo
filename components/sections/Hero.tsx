import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { homeImages } from '@/data/images';
import { site } from '@/data/site';

/** 1 — Full-bleed editorial hero. */
export function Hero() {
  return (
    <section className="relative bg-ivory" aria-labelledby="hero-heading">
      <div className="relative">
        <Photo
          src={homeImages.hero.src}
          alt={homeImages.hero.alt}
          ratio="hero"
          tone={homeImages.hero.tone}
          subject={homeImages.hero.subject}
          priority
          sizes="100vw"
          className="hidden w-full sm:block"
        />
        <Photo
          src={homeImages.hero.src}
          alt={homeImages.hero.alt}
          ratio="portrait"
          tone={homeImages.hero.tone}
          subject={homeImages.hero.subject}
          priority
          sizes="100vw"
          className="w-full sm:hidden"
        />
      </div>

      {/* Legibility wash — ivory, never a dark scrim. */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(247,243,237,0.94)_0%,rgba(247,243,237,0.72)_38%,rgba(247,243,237,0)_72%)] sm:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,237,0.9)_0%,rgba(247,243,237,0.25)_38%,rgba(247,243,237,0.92)_100%)] sm:hidden"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center">
        <div className="shell-wide w-full">
          <div className="max-w-[42rem] pt-6 sm:pt-0">
            <Eyebrow>{site.name}</Eyebrow>
            <h1 id="hero-heading" className="mt-6 text-h1 sm:text-display">
              Dress beautifully.
              <br />
              <em className="font-display italic">Live confidently.</em>
            </h1>
            <p className="mt-7 max-w-[40ch] text-body-lg text-espresso-70">
              Thoughtfully curated fashion, bags, shoes and accessories for the woman who knows
              her style.
            </p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <ButtonLink href="/store" variant="primary" size="lg" withArrow>
                Shop the collection
              </ButtonLink>
              <ButtonLink href="/about" variant="text" size="md" className="tracking-[0.16em]">
                Discover our story
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 4 — Brand introduction, asymmetric split. */
export function BrandIntro() {
  return (
    <section className="section-y bg-ivory" aria-labelledby="brand-intro-heading">
      <div className="shell-wide grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Photo
              src={homeImages.brandIntro.src}
              alt={homeImages.brandIntro.alt}
              ratio="editorial"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full"
            />
          </Reveal>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>Welcome to Goodly &amp; Chic</Eyebrow>
            <h2 id="brand-intro-heading" className="mt-6 text-h2">
              Style that feels <em className="font-display italic">distinctly you.</em>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <div className="mt-7 max-w-[54ch] space-y-5 text-body text-espresso-70">
              <p>
                Goodly &amp; Chic began with a simple conviction: a woman should never have to
                choose between looking beautiful and feeling entirely like herself. So we built a
                collection that is considered rather than crowded, and chosen to be worn rather
                than admired.
              </p>
              <p>
                Every piece earns its place. Fabric you can feel, cuts that hold their shape, colour
                that sits quietly beside everything else you own. This is fashion for the woman
                who knows her style — and intends to keep it.
              </p>
            </div>
            <div className="mt-9">
              <ButtonLink href="/about" variant="secondary" size="md" withArrow>
                Our story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
