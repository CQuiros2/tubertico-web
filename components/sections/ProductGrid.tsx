import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { products, getFeaturedProducts } from '@/lib/products';

interface ProductGridProps {
  locale: string;
  featured?: boolean;
}

export function ProductGrid({ locale, featured }: ProductGridProps) {
  const t = useTranslations('products');
  const items = featured ? getFeaturedProducts() : products;

  return (
    <SectionWrapper id="productos" className="bg-white">
      <AnimatedSection className="text-center mb-14">
        <p className="eyebrow mb-3">{featured ? 'Exportación' : 'Catálogo'}</p>
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
                  className="object-cover transition-transform duration-500 group-hover:scale-106"
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
        <AnimatedSection className="text-center mt-12">
          <Link
            href={`/${locale}/productos`}
            className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm border-2 border-brand-green rounded-full px-8 py-3 hover:bg-brand-green hover:text-white transition-all duration-200"
          >
            {t('cta')}
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      )}
    </SectionWrapper>
  );
}
