'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const VIDEO_ID = 'NXA-Cjw5-3k';
const POSTER = '/images/video-procomer.jpg';

interface VideoFeatureProps {
  locale: string;
}

export function VideoFeature({ locale }: VideoFeatureProps) {
  const t = useTranslations('video');
  const [playing, setPlaying] = useState(false);

  // Facade pattern: the poster is a local image and the YouTube player is
  // only injected on click. Embedding the iframe up front would pull ~1 MB
  // of third-party JS into the homepage and set tracking cookies before the
  // visitor ever asks for the video.
  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
    `?autoplay=1&rel=0&modestbranding=1&hl=${locale}`;

  return (
    <SectionWrapper className="bg-brand-green-dark text-white">
      <AnimatedSection className="text-center mb-10 md:mb-12">
        <p className="eyebrow text-brand-orange mb-4">{t('eyebrow')}</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {t('title')}
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
            {playing ? (
              <iframe
                src={embedSrc}
                title={t('title')}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={t('play')}
                className="group absolute inset-0 w-full h-full cursor-pointer"
              >
                <Image
                  src={POSTER}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 transition-colors duration-300 group-hover:from-black/50" />

                {/* Play button */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-orange text-white shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-orange-light">
                    <Play size={26} className="ml-1" fill="currentColor" />
                  </span>
                </span>
              </button>
            )}
          </div>

          {/* Attribution — also flags the audio language for EN/FR visitors */}
          <p className="text-center text-white/35 text-xs mt-5">{t('credit')}</p>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
