import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { products, getFeaturedProducts } from '@/lib/products';

interface ProductGridProps {
  locale: string;
  featured?: boolean;
}

export function ProductGrid({ locale, featured }: ProductGridProps) {
  const t = useTranslations('products');
  const items = featured ? getFeaturedProducts() : products;

  return (
    <SectionWrapper id="productos" className="bg-brand-cream">
      <AnimatedSection className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-green mb-3">
          {t('title')}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((product, i) => (
          <AnimatedSection key={product.id} delay={i * 0.1}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={t(`items.${product.id}.name`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-brand-green text-lg mb-1">
                  {t(`items.${product.id}.name`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`items.${product.id}.description`)}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {featured && (
        <AnimatedSection className="text-center mt-10">
          <Button href={`/${locale}/productos`} variant="secondary" size="lg">
            {t('cta')}
          </Button>
        </AnimatedSection>
      )}
    </SectionWrapper>
  );
}
