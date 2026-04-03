import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/sections/GalleryGrid';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.gallery' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function GaleriaPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return <GalleryGrid locale={locale} />;
}
