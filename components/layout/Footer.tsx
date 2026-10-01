import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { NewsletterForm } from './NewsletterForm';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { mapsDirectionsUrl, navigation, site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-ivory">
      {/* Champagne hairline above the footer — the one place it leads. */}
      <div className="h-px w-full bg-champagne/40" aria-hidden="true" />

      <div className="shell-wide py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo lockup="stacked" variant="ivory" className="items-start" markSize="text-[2.4rem]" />
            <p className="mt-7 max-w-[34ch] text-body-sm text-ivory-70">{site.tagline}</p>
            <p className="mt-3 max-w-[34ch] font-display text-h4 italic text-ivory">
              {site.idea}.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {Object.entries(navigation.footer).map(([heading, links]) => (
                <div key={heading}>
                  <h3 className="font-sans text-label font-medium uppercase text-ivory-55">
                    {heading}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="link-underline text-[0.8125rem] text-ivory-70 transition-colors duration-300 hover:text-ivory"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div className="col-span-2 lg:col-span-3">
            <h3 className="font-sans text-label font-medium uppercase text-ivory-55">Stay close</h3>
            <p className="mt-5 max-w-[32ch] text-[0.8125rem] leading-relaxed text-ivory-70">
              New arrivals, restocks and notes from the boutique. Nothing more than that.
            </p>
            <NewsletterForm className="mt-6" />

            <ul className="mt-8 space-y-2.5 text-[0.8125rem]">
              <li>
                <TrackedLink
                  href={site.contact.instagramUrl}
                  event="instagram_click"
                  payload={{ location: 'footer' }}
                  className="link-underline text-ivory-70 transition-colors duration-300 hover:text-ivory"
                >
                  {site.contact.instagramHandle}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={`https://wa.me/${site.contact.whatsappNumber}`}
                  event="whatsapp_click"
                  payload={{ location: 'footer' }}
                  className="link-underline text-ivory-70 transition-colors duration-300 hover:text-ivory"
                >
                  WhatsApp
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={mapsDirectionsUrl}
                  event="directions_click"
                  payload={{ location: 'footer' }}
                  className="link-underline text-ivory-70 transition-colors duration-300 hover:text-ivory"
                >
                  {site.address.formatted}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={`mailto:${site.contact.email}`}
                  className="link-underline text-ivory-70 transition-colors duration-300 hover:text-ivory"
                >
                  {site.contact.email}
                </TrackedLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-[0.6875rem] text-ivory-55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.openingHours}.
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>{site.trust.secure}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-champagne" />
            <span>{site.trust.boutique}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-champagne" />
            <span>{site.trust.delivery}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
