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
import { VideoFeature } from '@/components/sections/VideoFeature';
import { localeAlternates } from '@/lib/alternates';
import { getUltimaPublicacion } from '@/lib/sanity/queries';
import { siteConfig } from '@/lib/siteConfig';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.home' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: localeAlternates(locale, ''),
  };
}

export default async function HomePage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'video' });
  const ultimaPublicacion = await getUltimaPublicacion().catch(() => null);

  // Lets Google surface the PROCOMER interview as a video result.
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${t('title')} — ${siteConfig.name}`,
    description: t('subtitle'),
    thumbnailUrl: `${siteConfig.url}/images/video-procomer.jpg`,
    uploadDate: '2026-06-11',
    duration: 'PT1M31S',
    embedUrl: 'https://www.youtube-nocookie.com/embed/NXA-Cjw5-3k',
    contentUrl: 'https://www.youtube.com/watch?v=NXA-Cjw5-3k',
    inLanguage: 'es',
    publisher: {
      '@type': 'Organization',
      name: 'PROCOMER CR',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <HeroVideo locale={locale} />
      <AboutSection />
      <VideoFeature locale={locale} />
      <PublicacionesLatest publicacion={ultimaPublicacion} locale={locale} />
      <CertificationsBar />
      <ProductGrid locale={locale} featured />
      <GalleryGrid locale={locale} preview condensedTop />
      <ContactSection locale={locale} banner />
      <LocationMap />
    </>
  );
}
