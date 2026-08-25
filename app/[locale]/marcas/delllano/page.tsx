import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { localeAlternates } from '@/lib/alternates';

interface PageProps {
  params: { locale: string };
}

const titles: Record<string, string> = {
  es: 'Del Llano — Próximamente',
  en: 'Del Llano — Coming Soon',
  fr: 'Del Llano — Bientôt disponible',
  nl: 'Del Llano — Binnenkort beschikbaar',
};

const descriptions: Record<string, string> = {
  es: 'Del Llano es una marca de Tubérculos Ticos S.R.L. Próximamente disponible.',
  en: 'Del Llano is a brand by Tubérculos Ticos S.R.L. Coming soon.',
  fr: 'Del Llano est une marque de Tubérculos Ticos S.R.L. Bientôt disponible.',
  nl: 'Del Llano is een merk van Tubérculos Ticos S.R.L. Binnenkort beschikbaar.',
};

const eyebrows: Record<string, string> = {
  es: 'Marcas',
  en: 'Brands',
  fr: 'Marques',
  nl: 'Merken',
};

const headlines: Record<string, string> = {
  es: 'En construcción',
  en: 'Under Construction',
  fr: 'En construction',
  nl: 'In aanbouw',
};

const bodies: Record<string, string> = {
  es: 'Estamos preparando algo especial bajo la marca Del Llano. Volvé pronto.',
  en: 'We are preparing something special under the Del Llano brand. Check back soon.',
  fr: 'Nous préparons quelque chose de spécial sous la marque Del Llano. Revenez bientôt.',
  nl: 'We bereiden iets bijzonders voor onder het merk Del Llano. Kom binnenkort terug.',
};

const backLabels: Record<string, string> = {
  es: '← Volver a Tubertico',
  en: '← Back to Tubertico',
  fr: '← Retour à Tubertico',
  nl: '← Terug naar Tubertico',
};

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: localeAlternates(locale, '/marcas/delllano'),
  };
}

export default function DelLlanoPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-orange mb-6">
          {eyebrows[locale] ?? eyebrows.en}
        </p>

        <h1 className="font-display font-bold text-brand-green-dark text-5xl md:text-6xl tracking-tight mb-3">
          Del Llano
        </h1>

        <p className="text-sm font-medium text-brand-green-mid uppercase tracking-widest mb-10">
          Tubérculos Ticos S.R.L.
        </p>

        <div className="w-16 h-px bg-brand-green-mid mx-auto mb-10 opacity-40" />

        <h2 className="font-display text-brand-green-dark text-2xl md:text-3xl mb-4">
          {headlines[locale] ?? headlines.en}
        </h2>

        <p className="text-gray-600 text-base leading-relaxed mb-12">
          {bodies[locale] ?? bodies.en}
        </p>

        <Link
          href={`/${locale}`}
          className="text-sm font-medium text-brand-green hover:text-brand-green-dark transition-colors"
        >
          {backLabels[locale] ?? backLabels.en}
        </Link>
      </div>
    </div>
  );
}
