'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

interface HeroVideoProps {
  locale: string;
}

const stats = [
  { valueKey: 'years', value: '20+', suffix: '' },
  { valueKey: 'products', value: '14', suffix: '' },
  { valueKey: 'hectares', value: '1,015', suffix: ' ha' },
  { valueKey: 'certs', value: '2', suffix: '' },
] as const;

export function HeroVideo({ locale }: HeroVideoProps) {
  const t = useTranslations();

  return (
    <section className="relative min-h-dvh flex flex-col overflow-hidden bg-brand-green-dark">

      {/* Background image — always visible as base layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-poster.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Video — loads on top if available */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      />

      {/* Multi-layer gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />
      <div className="absolute inset-0 bg-brand-green-dark/25" />

      {/* Hero content — vertically centered, leaves room for stats strip */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-24 pb-8">
        <div className="text-center max-w-4xl mx-auto">

          {/* Eyebrow */}
          <motion.p
            className="eyebrow text-brand-orange mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Costa Rica · Pococí, Limón
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-display font-bold text-white leading-[1.05] tracking-tight text-balance mb-6
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            {t('hero.tagline')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <Link
              href={`/${locale}/productos`}
              className="inline-flex items-center justify-center rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold text-base px-8 py-3.5 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('hero.cta_products')}
            </Link>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center justify-center rounded-full border-2 border-white/50 hover:border-white text-white font-semibold text-base px-8 py-3.5 transition-all duration-200 hover:bg-white/10"
            >
              {t('hero.cta_contact')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats strip — pinned to bottom of hero */}
      <motion.div
        className="relative z-10 w-full bg-black/45 backdrop-blur-sm border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map(({ valueKey, value, suffix }) => (
              <div key={valueKey} className="flex flex-col items-center py-5 px-4 gap-1">
                <span className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight">
                  {value}{suffix}
                </span>
                <span className="text-white/60 text-xs uppercase tracking-wider text-center leading-tight">
                  {t(`stats.${valueKey}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-[88px] right-6 md:right-10 z-10 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] rotate-90 origin-center mb-3">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-white/40" size={18} />
        </motion.div>
      </motion.div>

    </section>
  );
}
