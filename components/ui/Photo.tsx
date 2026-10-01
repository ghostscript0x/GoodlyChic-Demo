'use client';

import Image from 'next/image';
import { RATIO, type ImageSlot } from '@/data/images';
import { hasPhotography, publicSrc, slotFor } from '@/lib/photos';
import { cn } from '@/lib/utils';

type PhotoProps = {
  /** Public-root-relative path declared in `data/images.ts`. */
  src: string;
  alt: string;
  /** Overrides the registered crop when a slot is reused elsewhere. */
  ratio?: keyof typeof RATIO;
  tone?: ImageSlot['tone'];
  subject?: ImageSlot['subject'];
  /** Set to `false` to hide the placeholder caption. */
  label?: string | false;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  /** Slow 1 → 1.03 editorial zoom on hover. */
  hoverZoom?: boolean;
  /** `object-position` for the photography, once it exists. */
  align?: string;
};

/**
 * Renders brand photography when it exists at the registered path, and an
 * art-directed placeholder until then.
 *
 * The placeholder is a warm tonal field with soft light falloff, faint noise, a
 * minimal garment silhouette and a small caption — never a grey box. Tone and
 * silhouette come from the registry, so the product grid feels composed rather
 * than repeated. See README → "Where to put real photography".
 */
export function Photo({
  src,
  alt,
  ratio,
  tone,
  subject,
  label,
  priority = false,
  sizes = '(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw',
  className,
  imageClassName,
  hoverZoom = false,
  align = 'center',
}: PhotoProps) {
  const slot = slotFor(src);
  const resolvedRatio = RATIO[ratio ?? slot.ratio];
  const resolvedTone = tone ?? slot.tone;
  const resolvedSubject = subject ?? slot.subject;
  const caption = label === undefined ? slot.label : label;
  const hasImage = hasPhotography(src);

  return (
    <div
      className={cn('relative isolate overflow-hidden bg-sand', className)}
      style={{ aspectRatio: resolvedRatio }}
    >
      {!hasImage && (
        <>
          <div className="gc-ph absolute inset-0" data-tone={resolvedTone} aria-hidden="true" />
          <div
            className="absolute inset-0 flex items-center justify-center p-[18%] text-espresso"
            aria-hidden="true"
          >
            <Silhouette subject={resolvedSubject} />
          </div>
          <span
            className="pointer-events-none absolute bottom-3 left-3 select-none font-sans text-[9px] font-medium uppercase leading-none tracking-[0.18em] text-espresso/35"
            aria-hidden="true"
          >
            {caption}
          </span>
          <span
            className="pointer-events-none absolute bottom-[11px] right-3 select-none font-display text-sm leading-none tracking-[0.08em] text-espresso/15"
            aria-hidden="true"
          >
            GC
          </span>
        </>
      )}

      {hasImage && (
        <Image
          src={publicSrc(src)}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectPosition: align }}
          className={cn(
            'object-cover',
            hoverZoom &&
              'transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.03]',
            imageClassName,
          )}
        />
      )}

      {/* Grain: barely present, never a film-stock effect. */}
      {!hasImage && <span className="gc-grain absolute inset-0" aria-hidden="true" />}
    </div>
  );
}

type SilhouetteProps = { subject: ImageSlot['subject'] };

/** Minimal garment line drawings. 100 × 125 viewBox (4:5). */
function Silhouette({ subject }: SilhouetteProps) {
  const common = {
    viewBox: '0 0 100 125',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-full w-full opacity-[0.34]',
  };

  switch (subject) {
    case 'dress':
      return (
        <svg {...common} role="presentation">
          <path
            d="M34 20h32M37 20c0 7 2 11 5 14M63 20c0 7-2 11-5 14M42 20h16"
            fillOpacity={0.04}
          />
          <path d="M42 34c0 6 1 9 3 11h10c2-2 3-5 3-11" fillOpacity={0.05} />
          <path d="M45 45c-1 5-3 7-4 10L22 108h56L59 55c-1-3-3-5-4-10" fillOpacity={0.05} />
          <path d="M50 45v63" opacity={0.5} />
        </svg>
      );
    case 'top':
      return (
        <svg {...common} role="presentation">
          <path
            d="M40 26 28 31 21 55l13 6v45h32V61l13-6-12-24-12-5c-2 6-6 9-13 9s-11-3-13-9Z"
            fillOpacity={0.05}
          />
          <path d="M34 106h32" opacity={0.5} />
        </svg>
      );
    case 'trousers':
      return (
        <svg {...common} role="presentation">
          <path d="M31 24h38l1 9H30l1-9Z" fillOpacity={0.05} />
          <path
            d="M30 33h40l3 10 5 63H56l-6-45-6 45H22l5-63 3-10Z"
            fillOpacity={0.05}
          />
          <path d="M50 33v15" opacity={0.5} />
        </svg>
      );
    case 'bag':
      return (
        <svg {...common} role="presentation">
          <path d="M36 48V38a8 8 0 0 1 16 0v10M48 48V38a8 8 0 0 1 16 0v10" fillOpacity={0.04} />
          <path d="M27 48h46l4 54H23l4-54Z" fillOpacity={0.05} />
          <path d="M50 62v12" opacity={0.5} />
        </svg>
      );
    case 'shoe':
      return (
        <svg {...common} role="presentation">
          <path
            d="M16 88c11 0 19-5 27-12l15-13c5-4 7-9 7-15 0-4 3-7 7-7h6c-4 7-5 15-4 23 1 9 3 16 5 24H16Z"
            fillOpacity={0.05}
          />
          <path d="M70 88l6 22h6l-4-20" fillOpacity={0.05} />
          <path d="M16 88h66" opacity={0.5} />
        </svg>
      );
    case 'accessory':
      return (
        <svg {...common} role="presentation">
          <circle cx="37" cy="60" r="15" fillOpacity={0.04} />
          <circle cx="63" cy="60" r="15" fillOpacity={0.04} />
          <path d="M22 100h56" opacity={0.5} />
        </svg>
      );
    case 'portrait':
      return (
        <svg {...common} role="presentation">
          <circle cx="50" cy="46" r="17" fillOpacity={0.04} />
          <path d="M22 108c0-20 12-31 28-31s28 11 28 31" fillOpacity={0.04} />
        </svg>
      );
    case 'scene':
    default:
      return (
        <svg {...common} role="presentation">
          <path d="M20 108V56a30 30 0 0 1 60 0v52" fillOpacity={0.03} />
          <path d="M12 108h76" />
          <path d="M36 64c0 6-2 9-4 12l-3 12h12l-1-24" fillOpacity={0.05} />
          <path d="M64 64c0 6 2 9 4 12l3 12H59l1-24" fillOpacity={0.05} />
        </svg>
      );
  }
}
