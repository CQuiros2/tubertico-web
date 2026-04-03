'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';


const CLOUDINARY_VIDEO = 'https://res.cloudinary.com/dv5xfo78c/video/upload/v1734383971/web_tubertico_uxfqyl.mp4';

const brandPillars = [
  { value: { es: '+20 Años',      en: '+20 Years'   }, label: { es: 'en el mercado',       en: 'in the market'      } },
  { value: { es: '+17 Productos', en: '+17 Products' }, label: { es: 'disponibles',         en: 'available'          } },
  { value: { es: 'Calidad',       en: 'Quality'      }, label: { es: 'e inocuidad',         en: '& food safety'      } },
  { value: { es: 'Exportación',   en: 'Export'       }, label: { es: 'global',              en: 'global'             } },
] as const;

interface HeroVideoProps {
  locale: string;
}

export function HeroVideo({ locale }: HeroVideoProps) {
  const t = useTranslations('hero');
  const lang = locale === 'en' ? 'en' : 'es';

  return (
    <section className="relative min-h-dvh flex flex-col overflow-hidden bg-brand-green-dark">

      {/* Base image — always visible, covers before video loads */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-poster.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
        // @ts-expect-error fetchPriority is valid HTML but missing from older React types
        fetchpriority="high"
      />

      {/* Video — overlays the image once loaded */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        src={CLOUDINARY_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      />

      {/* Single clean gradient — no tinted overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-24 pb-8">
        <div className="text-center max-w-4xl mx-auto">

          <motion.p
            className="eyebrow text-brand-orange mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Costa Rica
          </motion.p>

          <motion.h1
            className="font-display font-bold text-white leading-[1.05] tracking-tight text-balance mb-6
                       text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('tagline')}
          </motion.h1>

          <motion.p
            className="text-white/75 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5 }}
          >
            <Link
              href={`/${locale}/productos`}
              className="inline-flex items-center justify-center rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-1.5 sm:py-3.5 transition-all duration-200 shadow-[0_2px_10px_rgba(199,92,25,0.40)] hover:shadow-[0_4px_20px_rgba(199,92,25,0.50)] hover:-translate-y-0.5"
            >
              {t('cta_products')}
            </Link>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center justify-center rounded-full border border-white/35 hover:border-white/65 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-1.5 sm:py-3.5 transition-all duration-200 hover:bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
            >
              {t('cta_contact')}
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Brand pillars strip */}
      <motion.div
        className="relative z-10 w-full bg-black/50 backdrop-blur-sm border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {brandPillars.map(({ value, label }, i) => (
              <div
                key={value.es}
                className={`flex flex-col items-center py-5 px-4 gap-1 ${
                  i < 3 ? 'md:border-r border-white/10' : ''
                } ${i === 0 || i === 2 ? 'border-r border-white/10' : ''}`}
              >
                <span className="font-display font-semibold text-white text-lg md:text-xl tracking-tight">
                  {value[lang]}
                </span>
                <span className="text-white/50 text-[11px] uppercase tracking-wider text-center leading-tight">
                  {label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
