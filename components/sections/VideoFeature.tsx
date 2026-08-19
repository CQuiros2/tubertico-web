'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const VIDEO_ID = 'NXA-Cjw5-3k';
const POSTER = '/images/video-procomer.jpg';
const PRESS_PHOTO = '/images/press-elfinanciero.jpg';

// El Financiero feature. The paper's own page is paywalled, so the primary
// link goes to the PressReader edition, where the piece reads in full; the
// original stays reachable as the source of record.
const PRESS_READ_URL =
  'https://www.pressreader.com/costa-rica/el-financiero-costa-rica/20260523/281968909338185';
const PRESS_SOURCE_URL =
  'https://www.elfinancierocr.com/emprender/heredo-la-empresa-agricola-de-la-familia-y-de/JBGZA6OLKFDRTOLC5XGXGUSY4Y/story/';

interface VideoFeatureProps {
  locale: string;
}

export function VideoFeature({ locale }: VideoFeatureProps) {
  const t = useTranslations('video');
  const tp = useTranslations('press');
  const [playing, setPlaying] = useState(false);

  // Facade pattern: the poster is a local image and the YouTube player is
  // only injected on click. Embedding the iframe up front would pull ~1 MB
  // of third-party JS into the homepage and set tracking cookies before the
  // visitor ever asks for the video.
  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
    `?autoplay=1&rel=0&modestbranding=1&hl=${locale}`;

  return (
    <SectionWrapper id="video" dark>
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

          {/* Attribution — also flags the audio language for non-Spanish visitors */}
          <p className="text-center text-white/35 text-xs mt-5">{t('credit')}</p>

          {/* Press feature — second piece of third-party recognition, kept in
              this same section so the homepage does not gain another one. */}
          <div className="mt-12 pt-10 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">

              {/* Photo from the article — the paper's own promo graphic is not
                  used: it carries their logo and repeats the headline we
                  already render in our own type. */}
              <div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10">
                <Image
                  src={PRESS_PHOTO}
                  alt={tp('image_alt')}
                  width={1200}
                  height={899}
                  className="w-full h-full object-cover aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 340px"
                  loading="lazy"
                />
              </div>

              <div className="md:col-span-3">
                <p className="eyebrow text-brand-orange/80 mb-3">{tp('eyebrow')}</p>
                <h3 className="font-display text-xl md:text-2xl font-bold leading-snug mb-3 text-balance">
                  {tp('headline')}
                </h3>
                <p className="text-white/55 leading-relaxed mb-6">
                  {tp('summary')}
                </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={PRESS_READ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white text-sm font-semibold px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-px"
              >
                {tp('cta_read')}
                <ArrowUpRight size={15} />
              </a>
              <a
                href={PRESS_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm transition-colors underline underline-offset-4 decoration-white/25"
              >
                {tp('cta_source')}
                <ArrowUpRight size={13} />
              </a>
                </div>

                <p className="text-white/30 text-xs mt-6">{tp('byline')}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
