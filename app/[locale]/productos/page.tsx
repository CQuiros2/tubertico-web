import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.products' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function ProductosPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <ProductGrid locale={locale} />
    </div>
  );
}
