import type { Config } from 'tailwindcss';

/**
 * Goodly & Chic design tokens.
 * Neutral first, accent second. The palette supplies structure — product
 * photography supplies the colour.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './stores/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F3ED',
        espresso: '#171513',
        white: '#FFFFFF',
        taupe: '#D8CEC1',
        sand: '#E9E0D5',
        champagne: '#B69A6A',
        blush: '#E8D8D2',
        // Readable tints derived from espresso. Used for secondary text on ivory.
        'espresso-70': '#4A4643',
        'espresso-55': '#6E6A66',
        'espresso-40': '#8C8781',
        // Readable tints derived from ivory. Used for secondary text on espresso.
        'ivory-70': '#CFC9C1',
        'ivory-55': '#A8A29A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2.75rem, 6.4vw, 5rem)', { lineHeight: '1.04', letterSpacing: '-0.018em' }],
        'h2': ['clamp(2.25rem, 4.6vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.014em' }],
        'h3': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.14', letterSpacing: '-0.01em' }],
        'h4': ['clamp(1.375rem, 2.1vw, 1.75rem)', { lineHeight: '1.2' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        'label': ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.16em' }],
        'label-lg': ['0.8125rem', { lineHeight: '1.3', letterSpacing: '0.12em' }],
      },
      maxWidth: {
        content: '1280px',
        wide: '1440px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        38: '9.5rem',
        44: '11rem',
        50: '12.5rem',
        120: '7.5rem',
        140: '8.75rem',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
      },
      boxShadow: {
        drawer: '0 8px 30px rgba(23, 21, 19, 0.06)',
        media: '0 24px 60px rgba(23, 21, 19, 0.18)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        900: '900ms',
      },
      keyframes: {
        'fade-rise': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 700ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 500ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
      screens: {
        xs: '390px',
      },
    },
  },
  plugins: [],
};

export default config;
