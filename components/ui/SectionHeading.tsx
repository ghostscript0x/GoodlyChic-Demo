import { cn } from '@/lib/utils';

type EyebrowProps = {
  children: React.ReactNode;
  /** Adds the champagne hairline dash. Champagne is never the text colour. */
  dash?: boolean;
  tone?: 'default' | 'light';
  className?: string;
};

export function Eyebrow({ children, dash = true, tone = 'default', className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-sans text-label font-medium uppercase',
        tone === 'light' ? 'text-ivory-70' : 'text-espresso-55',
        dash && 'dash',
        className,
      )}
    >
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  tone?: 'default' | 'light';
  align?: 'left' | 'center';
  size?: 'h2' | 'h3';
  className?: string;
  /** Renders the title with one word in italic serif for emphasis. */
  italic?: string;
};

/**
 * The repeating editorial unit: small tracked label, large serif headline,
 * restrained supporting copy. Whitespace does the work.
 */
export function SectionHeading({
  eyebrow,
  title,
  copy,
  tone = 'default',
  align = 'left',
  size = 'h2',
  className,
  italic,
}: SectionHeadingProps) {
  const light = tone === 'light';

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={tone} dash={align === 'left'}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          size === 'h2' ? 'text-h2' : 'text-h3',
          'max-w-[20ch]',
          align === 'center' && 'max-w-[24ch]',
          light ? 'text-ivory' : 'text-espresso',
        )}
      >
        {typeof title === 'string' && italic ? <ItalicTitle title={title} word={italic} /> : title}
      </h2>
      {copy && (
        <div
          className={cn(
            'max-w-[58ch] text-body',
            light ? 'text-ivory-70' : 'text-espresso-70',
          )}
        >
          {copy}
        </div>
      )}
    </div>
  );
}

/** Renders a headline with a single word set in italic serif. */
function ItalicTitle({ title, word }: { title: string; word: string }) {
  const index = title.toLowerCase().indexOf(word.toLowerCase());
  if (index === -1) return <>{title}</>;

  return (
    <>
      {title.slice(0, index)}
      <em className="font-display italic">{word}</em>
      {title.slice(index + word.length)}
    </>
  );
}
