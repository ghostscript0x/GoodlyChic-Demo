import { cn } from '@/lib/utils';
import type { ColourName } from '@/lib/types';

/**
 * Colour swatches. Real product photography will supply the true colour, so
 * these are tonal stand-ins drawn from the brand palette — never arbitrary
 * rainbow dots.
 */
const swatchTone: Record<ColourName, string> = {
  Ivory: '#F4EFE7',
  Espresso: '#2A2622',
  Sand: '#DFD2BF',
  Black: '#171513',
  Blush: '#E8D8D2',
  Champagne: '#C7AC7C',
  Camel: '#B08B5F',
  Chocolate: '#4A3428',
};

export function Swatch({
  colour,
  selected = false,
  size = 'md',
  className,
}: {
  colour: ColourName;
  selected?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border transition-shadow duration-200',
        size === 'sm' ? 'h-3 w-3' : 'h-4 w-4',
        selected ? 'border-espresso ring-1 ring-espresso ring-offset-2 ring-offset-ivory' : 'border-taupe',
        className,
      )}
      style={{ backgroundColor: swatchTone[colour] }}
      title={colour}
      aria-hidden="true"
    />
  );
}

/** A row of swatches, as shown under a product name. */
export function SwatchRow({ colours, className }: { colours: ColourName[]; className?: string }) {
  return (
    <span className={cn('flex items-center gap-1.5', className)}>
      {colours.map((colour) => (
        <Swatch key={colour} colour={colour} size="sm" />
      ))}
    </span>
  );
}

export { swatchTone };
