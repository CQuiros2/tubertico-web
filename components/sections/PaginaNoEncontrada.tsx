'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import es from '@/messages/es.json';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import nl from '@/messages/nl.json';

const TEXTOS: Record<string, typeof es.not_found> = {
  es: es.not_found, en: en.not_found, fr: fr.not_found, nl: nl.not_found,
};

/**
 * 404 de todo el sitio. Es un solo archivo estático para todas las direcciones,
 * así que el idioma sale del primer tramo de la URL (/en/…, /fr/…); si no hay,
 * del idioma del navegador; y si no, español.
 */
export function PaginaNoEncontrada() {
  const [locale, setLocale] = useState<string>(siteConfig.defaultLocale);

  useEffect(() => {
    const deUrl = window.location.pathname.split('/')[1];
    const deNavegador = (navigator.language || '').slice(0, 2).toLowerCase();
    const elegido = [deUrl, deNavegador].find((l) => l in TEXTOS) ?? siteConfig.defaultLocale;
    setLocale(elegido);
    document.documentElement.lang = elegido;
  }, []);

  const t = TEXTOS[locale];
  return (
    <main className="min-h-dvh bg-brand-cream flex items-center justify-center px-6 py-16">
      <div className="max-w-lg text-center">
        <a href={`/${locale}/`} aria-label={siteConfig.name} className="inline-block mb-10">
          <Image src="/images/logo-color.png" alt={siteConfig.name} width={614} height={129}
            className="h-12 w-auto mx-auto" priority />
        </a>
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display font-bold text-brand-green-dark text-3xl md:text-4xl leading-tight tracking-tight mb-4">
          {t.title}
        </h1>
        <p className="text-gray-500 text-lg mb-10">{t.text}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={`/${locale}/`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold px-8 py-3.5 transition-colors">
            {t.home}
            <ArrowRight size={15} />
          </a>
          <a href={`/${locale}/productos/`}
            className="inline-flex items-center justify-center rounded-full border border-brand-green/30 hover:border-brand-green text-brand-green-dark font-semibold px-8 py-3.5 transition-colors">
            {t.products}
          </a>
        </div>
      </div>
    </main>
  );
}
