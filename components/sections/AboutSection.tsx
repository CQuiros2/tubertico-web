import { useTranslations } from 'next-intl';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const pillars = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    titleKey: 'pillar_quality_title',
    descKey:  'pillar_quality_desc',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    titleKey: 'pillar_origin_title',
    descKey:  'pillar_origin_desc',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    titleKey: 'pillar_export_title',
    descKey:  'pillar_export_desc',
  },
] as const;

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="w-full bg-brand-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top: two-column — text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-20">

          {/* Text */}
          <AnimatedSection direction="left">
            <p className="eyebrow mb-5">{t('label')}</p>
            <h2 className="font-display font-bold text-brand-green-dark leading-tight tracking-tight text-balance mb-6
                           text-3xl md:text-4xl">
              {t('headline')}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {t('description')}
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              {t('description2')}
            </p>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection direction="right">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-poster.jpg"
                alt="Producción agrícola de Tubertico — Costa Rica"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="bg-brand-green-dark/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  Costa Rica
                </span>
              </div>
            </div>
          </AnimatedSection>

        </div>

        {/* Bottom: 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map(({ icon, titleKey, descKey }, i) => (
            <AnimatedSection key={titleKey} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-brand-green/20 hover:shadow-md transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-5">
                  {icon}
                </div>
                <h3 className="font-display font-semibold text-brand-green-dark text-lg mb-2">
                  {t(titleKey)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(descKey)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
