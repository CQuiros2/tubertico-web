import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { AboutSection } from '@/components/sections/AboutSection';
import { CertificationsBar } from '@/components/sections/CertificationsBar';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { GalleryGrid } from '@/components/sections/GalleryGrid';
import { LocationMap } from '@/components/sections/LocationMap';
import { ContactSection } from '@/components/sections/ContactSection';
import { PublicacionesLatest } from '@/components/sections/PublicacionesLatest';
import { getUltimaPublicacion } from '@/lib/sanity/queries';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.home' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  const ultimaPublicacion = await getUltimaPublicacion().catch(() => null);

  return (
    <>
      <HeroVideo locale={locale} />
      <AboutSection />
      <PublicacionesLatest publicacion={ultimaPublicacion} locale={locale} />
      <CertificationsBar />
      <ProductGrid locale={locale} featured />
      <GalleryGrid locale={locale} preview condensedTop />
      <ContactSection locale={locale} banner />
      <LocationMap />
    </>
  );
}
