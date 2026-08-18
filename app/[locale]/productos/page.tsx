import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { CatalogCarousel } from '@/components/sections/CatalogCarousel';
import { localeAlternates } from '@/lib/alternates';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.products' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: localeAlternates(locale, '/productos'),
  };
}

export default function ProductosPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return (
    <>
      <ProductGrid locale={locale} />
      <CatalogCarousel locale={locale} />
    </>
  );
}
