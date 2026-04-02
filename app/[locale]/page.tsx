import { setRequestLocale } from 'next-intl/server';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { AboutSection } from '@/components/sections/AboutSection';
import { CertificationsBar } from '@/components/sections/CertificationsBar';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { GalleryGrid } from '@/components/sections/GalleryGrid';
import { LocationMap } from '@/components/sections/LocationMap';
import { ContactSection } from '@/components/sections/ContactSection';

interface PageProps {
  params: { locale: string };
}

export default function HomePage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return (
    <>
      <HeroVideo locale={locale} />
      <AboutSection />
      <CertificationsBar />
      <ProductGrid locale={locale} featured />
      <GalleryGrid locale={locale} preview />
      <ContactSection locale={locale} banner />
      <LocationMap />
    </>
  );
}
