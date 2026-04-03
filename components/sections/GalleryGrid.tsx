'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

type Tab = 'all' | 'products' | 'company';

// ─── Gallery image counts ──────────────────────────────────────────────────
// To add new images:
//   1. Upload the file to public/images/gallery/ using the naming convention:
//        product-13.jpg, product-14.jpg, ...
//        company-13.jpg, company-14.jpg, ...
//   2. Increment the relevant count below.
//   3. Run `npm run build` — no other code changes needed.
// Missing files within the range are skipped automatically.
const PRODUCT_COUNT = 12;
const COMPANY_COUNT = 12;
// ──────────────────────────────────────────────────────────────────────────

const productImages = Array.from({ length: PRODUCT_COUNT }, (_, i) => ({
  src: `/images/gallery/product-${i + 1}.jpg`,
  alt: `Producto ${i + 1}`,
  type: 'products' as const,
}));

const companyImages = Array.from({ length: COMPANY_COUNT }, (_, i) => ({
  src: `/images/gallery/company-${i + 1}.jpg`,
  alt: `Compañía ${i + 1}`,
  type: 'company' as const,
}));

const allImages = [...productImages, ...companyImages];

// Lightbox component
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-2 transition-all duration-200"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X size={22} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition-all duration-200"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Anterior"
        >
          <ChevronLeft size={26} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-full max-w-4xl mx-10 sm:mx-16 aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition-all duration-200"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Siguiente"
        >
          <ChevronRight size={26} />
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

// Renders a single gallery tile; returns null if the image fails to load.
function GalleryImage({
  src,
  alt,
  delay,
  onClick,
}: {
  src: string;
  alt: string;
  delay: number;
  onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <AnimatedSection delay={delay}>
      <button
        className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group w-full block cursor-zoom-in"
        onClick={onClick}
        aria-label={`Ver imagen: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 33vw"
          onError={() => setFailed(true)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </button>
    </AnimatedSection>
  );
}

interface GalleryGridProps {
  locale: string;
  preview?: boolean;
  condensedTop?: boolean;
}

export function GalleryGrid({ locale, preview, condensedTop }: GalleryGridProps) {
  const t = useTranslations('gallery');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

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

  const openLightbox = useCallback((index: number) => {
    setLightbox({ open: true, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, open: false }));
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) => ({
      open: true,
      index: (prev.index - 1 + displayed.length) % displayed.length,
    }));
  }, [displayed.length]);

  const goNext = useCallback(() => {
    setLightbox((prev) => ({
      open: true,
      index: (prev.index + 1) % displayed.length,
    }));
  }, [displayed.length]);

  return (
    <>
      <SectionWrapper id="galeria" condensedBottom condensedTop={condensedTop}>
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
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
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
            <GalleryImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              delay={i * 0.05}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>

        {preview && (
          <AnimatedSection className="text-center mt-5">
            <Button href={`/${locale}/galeria`} variant="outline" size="lg">
              {t('cta')}
            </Button>
          </AnimatedSection>
        )}
      </SectionWrapper>

      {lightbox.open && (
        <Lightbox
          images={displayed}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
