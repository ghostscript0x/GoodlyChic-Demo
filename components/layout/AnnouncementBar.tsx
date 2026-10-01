import { site } from '@/data/site';

/** Thin espresso bar. One line, tracked caps, no carousel, no shouting. */
export function AnnouncementBar() {
  return (
    <div className="relative z-[60] bg-espresso text-ivory">
      <div className="shell flex h-9 items-center justify-center">
        <p className="text-center font-sans text-[0.5625rem] font-medium uppercase leading-tight tracking-[0.2em] text-ivory sm:text-[0.625rem]">
          {site.announcement}
        </p>
      </div>
    </div>
  );
}
