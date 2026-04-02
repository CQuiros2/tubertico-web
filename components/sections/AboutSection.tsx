import { useTranslations } from 'next-intl';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function AboutSection() {
  const t = useTranslations('about');

  const values = (t('values') as string).split(' · ');

  return (
    <section className="w-full bg-brand-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text side */}
          <AnimatedSection direction="left">
            <p className="eyebrow mb-4">{t('subtitle')}</p>
            <h2 className="font-display font-bold text-brand-green-dark text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              {t('title')}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t('description')}
            </p>

            {/* Values row */}
            <div className="flex flex-wrap gap-3">
              {values.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1.5 bg-white border border-brand-green/20 text-brand-green-dark text-sm font-medium rounded-full px-4 py-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                  {v.trim()}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Image side */}
          <AnimatedSection direction="right">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-poster.jpg"
                alt="Campos de Tubertico en Pococí, Costa Rica"
                className="w-full h-full object-cover"
              />
              {/* Caption badge */}
              <div className="absolute bottom-4 left-4 bg-brand-green-dark/85 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full">
                Roxana, Pococí · Limón, Costa Rica
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
