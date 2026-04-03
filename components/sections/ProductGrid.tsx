import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { products, getFeaturedProducts } from '@/lib/products';
import { siteConfig } from '@/lib/siteConfig';

interface ProductGridProps {
  locale: string;
  featured?: boolean;
}

export function ProductGrid({ locale, featured }: ProductGridProps) {
  const t = useTranslations('products');
  const items = featured ? getFeaturedProducts() : products;

  return (
    <SectionWrapper id="productos" className="bg-white" condensedBottom>
      <AnimatedSection className="text-center mb-14">
        <p className="eyebrow mb-3">{featured ? t('eyebrow_export') : t('eyebrow_catalog')}</p>
        <h2 className="font-display font-bold text-brand-green-dark text-3xl md:text-4xl leading-tight tracking-tight mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {items.map((product, i) => (
          <AnimatedSection key={product.id} delay={i * 0.08}>
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden bg-brand-cream">
                <Image
                  src={product.image}
                  alt={t(`items.${product.id}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Subtle gradient at bottom of image */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-brand-green-dark text-base mb-1.5 leading-snug">
                  {t(`items.${product.id}.name`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {t(`items.${product.id}.description`)}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {featured && (
        <AnimatedSection className="text-center mt-5">
          <Link
            href={`/${locale}/productos`}
            className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm border-2 border-brand-green rounded-full px-7 sm:px-8 py-2 sm:py-3 hover:bg-brand-green hover:text-white transition-all duration-200"
          >
            {t('cta')}
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      )}

      {!featured && (
        <AnimatedSection className="mt-14">
          <div className="bg-brand-cream border border-brand-green/15 rounded-2xl px-8 py-10 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-7">
              {t('closing_note')}
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-white font-semibold text-sm rounded-full px-6 sm:px-7 py-2 sm:py-3 hover:bg-brand-green-mid transition-all duration-200"
              >
                {t('closing_cta_contact')}
                <ArrowRight size={15} />
              </Link>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-orange text-brand-orange font-semibold text-sm rounded-full px-6 sm:px-7 py-2 sm:py-3 hover:bg-brand-orange hover:text-white transition-all duration-200"
              >
                <MessageCircle size={15} />
                {t('closing_cta_whatsapp')}
              </a>
            </div>
          </div>
        </AnimatedSection>
      )}
    </SectionWrapper>
  );
}
