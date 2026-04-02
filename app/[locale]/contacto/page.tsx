import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/ContactSection';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function ContactoPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <ContactSection locale={locale} />
    </div>
  );
}
