import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/siteConfig';
import '../globals.css';

const locales = ['es', 'en', 'fr', 'nl'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.home' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      template: `%s | ${siteConfig.name}`,
      default: siteConfig.name,
    },
    description: t('description'),
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
  };
}

// Root layout of the localized site. It renders <html> itself — rather than
// inheriting a shared one — so each locale ships the correct lang attribute
// for screen readers and browser translation.
//
// Font stacks come from the --font-* variables in globals.css. next/font is
// deliberately not used: its variable classes and the :root block set the same
// custom properties with equal specificity, so whichever CSS chunk landed last
// silently won. globals.css is now the single source of truth.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
