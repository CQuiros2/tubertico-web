'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroVideoProps {
  locale: string;
}

export function HeroVideo({ locale }: HeroVideoProps) {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-green-dark">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-green-dark/70 via-brand-green-dark/40 to-brand-green-dark/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          className="text-brand-orange font-semibold text-sm md:text-base tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Costa Rica · Pococí, Limón
        </motion.p>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {t('tagline')}
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <Button href={`/${locale}/productos`} variant="primary" size="lg">
            {t('cta_products')}
          </Button>
          <Button href={`/${locale}/contacto`} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-green">
            {t('cta_contact')}
          </Button>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-white/60" size={32} />
      </motion.div>
    </section>
  );
}
