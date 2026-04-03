'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const SLIDE_COUNT = 20;

function Lightbox({
  slides,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  slides: string[];
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-2 transition-all duration-200"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X size={22} />
      </button>

      <button
        className="absolute left-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition-all duration-200"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Anterior"
      >
        <ChevronLeft size={26} />
      </button>

      <div
        className="relative w-full max-w-5xl mx-16 sm:mx-20 aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={slides[index]}
          alt={`Slide ${index + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority
        />
      </div>

      <button
        className="absolute right-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full p-3 transition-all duration-200"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Siguiente"
      >
        <ChevronRight size={26} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums">
        {index + 1} / {slides.length}
      </div>
    </div>
  );
}

interface CatalogCarouselProps {
  locale: string;
}

export function CatalogCarousel({ locale }: CatalogCarouselProps) {
  const t = useTranslations('catalog');
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const slides = Array.from(
    { length: SLIDE_COUNT },
    (_, i) => `/images/catalog/${locale}/${i}.jpg`
  );

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDE_COUNT);
  }, []);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // Keyboard nav for the carousel itself (when lightbox is closed)
  useEffect(() => {
    if (lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxOpen, goPrev, goNext]);

  return (
    <>
      <SectionWrapper id="catalogo" className="bg-brand-cream border-t border-brand-green/10">
        <AnimatedSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-brand-green/70 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen size={13} />
            <span>{t('eyebrow')}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-green-dark mb-3">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto">
            {/* Main slide */}
            <div className="relative group">
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-lg border border-brand-green/10 cursor-zoom-in"
                onClick={openLightbox}
              >
                <Image
                  key={slides[current]}
                  src={slides[current]}
                  alt={`${t('slide_label')} ${current + 1}`}
                  fill
                  className="object-contain transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority={current === 0}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {t('zoom_hint')}
                  </span>
                </div>
              </div>

              {/* Prev arrow */}
              <button
                onClick={goPrev}
                aria-label="Anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-green rounded-full p-2.5 shadow-md hover:shadow-lg transition-all duration-200 border border-brand-green/15"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next arrow */}
              <button
                onClick={goNext}
                aria-label="Siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-green rounded-full p-2.5 shadow-md hover:shadow-lg transition-all duration-200 border border-brand-green/15"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Counter + dots */}
            <div className="mt-5 flex flex-col items-center gap-3">
              {/* Dot indicators */}
              <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Página ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === current
                        ? 'bg-brand-green scale-125'
                        : 'bg-brand-green/25 hover:bg-brand-green/50'
                    }`}
                  />
                ))}
              </div>
              {/* Slide counter */}
              <p className="text-gray-400 text-sm tabular-nums">
                {current + 1} / {SLIDE_COUNT}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {lightboxOpen && (
        <Lightbox
          slides={slides}
          index={current}
          onClose={closeLightbox}
          onPrev={() => setCurrent((c) => (c - 1 + SLIDE_COUNT) % SLIDE_COUNT)}
          onNext={() => setCurrent((c) => (c + 1) % SLIDE_COUNT)}
        />
      )}
    </>
  );
}
