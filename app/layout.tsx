import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { BottomNav, MobileMenu } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { WhatsAppAction } from '@/components/layout/WhatsAppAction';
import { PageViewTracker } from '@/components/layout/PageViewTracker';
import { site } from '@/data/site';
import { homeMetadata, JsonLd, localBusinessJsonLd } from '@/lib/seo';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = homeMetadata;

export const viewport: Viewport = {
  themeColor: '#F7F3ED',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ivory font-sans text-espresso">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-espresso focus:bg-ivory focus:px-5 focus:py-3 focus:font-sans focus:text-[0.6875rem] focus:font-medium focus:uppercase focus:tracking-[0.14em] focus:text-espresso"
        >
          Skip to content
        </a>

        <PageViewTracker />

        <AnnouncementBar />
        <Header />

        <main id="main" className="min-h-[60vh]">
          {children}
        </main>

        <Footer />

        <BottomNav />
        <MobileMenu />
        <CartDrawer />
        <SearchOverlay />
        <WhatsAppAction />

        <JsonLd data={localBusinessJsonLd()} />

        <span className="sr-only">{site.idea}</span>
      </body>
    </html>
  );
}
