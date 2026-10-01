import { Hero, BrandIntro } from '@/components/sections/Hero';
import { GoodlyEdit, DressForTheMoment } from '@/components/sections/GoodlyEdit';
import { NewArrivals, GoodlySelection, FinalCta } from '@/components/sections/Selection';
import { EditorialCampaign, GoodlyWoman } from '@/components/sections/Editorial';
import {
  WhatsAppCommerce,
  WhyGoodlyChic,
  BoutiqueSection,
  InstagramSection,
} from '@/components/sections/Community';

/**
 * The home page runs a fixed editorial rhythm:
 * hero → brand story → The Goodly Edit → store preview → New Arrivals →
 * campaign → The Goodly Woman → Dress for the moment → The Goodly Selection →
 * WhatsApp commerce → Why Goodly & Chic → Boutique → Instagram → final CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <GoodlyEdit />
      <NewArrivals />
      <EditorialCampaign />
      <GoodlyWoman />
      <DressForTheMoment />
      <GoodlySelection />
      <WhatsAppCommerce />
      <WhyGoodlyChic />
      <BoutiqueSection />
      <InstagramSection />
      <FinalCta />
    </>
  );
}
