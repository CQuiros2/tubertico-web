'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

type Tab = 'all' | 'products' | 'company';

const productImages = [1, 2, 3, 4, 5, 6, 12].map((n) => ({
  src: `/images/gallery/product-${n}.jpg`,
  alt: `Producto ${n}`,
  type: 'products' as const,
}));

const companyImages = [1, 2, 3, 4, 12].map((n) => ({
  src: `/images/gallery/company-${n}.jpg`,
  alt: `Compañía ${n}`,
  type: 'company' as const,
}));

const allImages = [...productImages, ...companyImages];

interface GalleryGridProps {
  locale: string;
  preview?: boolean;
}

export function GalleryGrid({ locale, preview }: GalleryGridProps) {
  const t = useTranslations('gallery');
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered =
    activeTab === 'all'
      ? allImages
      : allImages.filter((img) => img.type === activeTab);

  const displayed = preview ? filtered.slice(0, 6) : filtered;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all', label: t('tab_all') },
    { key: 'products', label: t('tab_products') },
    { key: 'company', label: t('tab_company') },
  ];

  return (
    <SectionWrapper id="galeria">
      <AnimatedSection className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-green mb-3">
          {t('title')}
        </h2>
        <p className="text-gray-600 text-lg">{t('subtitle')}</p>
      </AnimatedSection>

      {!preview && (
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-brand-green text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {displayed.map((img, i) => (
          <AnimatedSection key={img.src} delay={i * 0.05}>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </AnimatedSection>
        ))}
      </div>

      {preview && (
        <AnimatedSection className="text-center mt-10">
          <Button href={`/${locale}/galeria`} variant="outline" size="lg">
            {t('cta')}
          </Button>
        </AnimatedSection>
      )}
    </SectionWrapper>
  );
}
