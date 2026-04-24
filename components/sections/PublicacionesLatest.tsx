'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { urlFor } from '@/lib/sanity/image'
import type { Publicacion } from '@/types/publicacion'

function formatDate(dateStr: string, locale: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const monthsEs = ['enero','febrero','marzo','abril','mayo','junio',
                    'julio','agosto','septiembre','octubre','noviembre','diciembre']
  const monthsEn = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December']
  return locale === 'es'
    ? `${day} de ${monthsEs[month - 1]} de ${year}`
    : `${monthsEn[month - 1]} ${day}, ${year}`
}

const categoryLabel = (cat: string, locale: string): string => {
  const labels: Record<string, Record<string, string>> = {
    empresa: { es: 'Empresa', en: 'Company' },
    certificaciones: { es: 'Certificaciones', en: 'Certifications' },
    exportaciones: { es: 'Exportaciones', en: 'Exports' },
    campo: { es: 'Campo', en: 'Field' },
    productos: { es: 'Productos', en: 'Products' },
    sostenibilidad: { es: 'Sostenibilidad', en: 'Sustainability' },
    'calidad-e-inocuidad': { es: 'Calidad e inocuidad', en: 'Quality & Food Safety' },
  }
  return labels[cat]?.[locale] ?? cat
}

interface Props {
  publicacion: Publicacion | null
  locale: string
}

export function PublicacionesLatest({ publicacion, locale }: Props) {
  const t = useTranslations('noticias')

  if (!publicacion) return null

  const titulo = (locale === 'en' && publicacion.tituloEn) ? publicacion.tituloEn : publicacion.tituloEs
  const resumen = (locale === 'en' && publicacion.resumenEn) ? publicacion.resumenEn : publicacion.resumenEs
  const tipo = publicacion.tipoPublicacion === 'noticia' ? t('type_noticia') : t('type_blog')
  const cat = categoryLabel(publicacion.categoria, locale)
  const fecha = formatDate(publicacion.fechaPublicacion, locale)
  const imageUrl = publicacion.imagenPrincipal
    ? urlFor(publicacion.imagenPrincipal).width(900).height(600).fit('crop').auto('format').url()
    : null

  return (
    <section className="w-full pt-24 md:pt-32 pb-20 md:pb-28 bg-white border-t border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-10 md:mb-14">
          <p className="eyebrow mb-3">{t('latest_eyebrow')}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-green-dark">
            {t('title')}
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">

            {/* Image */}
            {imageUrl && (
              <div className="md:col-span-3 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={imageUrl}
                  alt={publicacion.imagenPrincipal?.alt || titulo}
                  className="w-full aspect-[16/10] object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Content */}
            <div className={imageUrl ? 'md:col-span-2' : 'md:col-span-5 max-w-2xl'}>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                  {tipo}
                </span>
                {cat && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-green/10 text-brand-green border border-brand-green/20">
                    {cat}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-3">
                {titulo}
              </h3>

              {/* Date */}
              <p className="text-sm text-gray-400 mb-5">{fecha}</p>

              {/* Summary */}
              {resumen && (
                <p className="text-gray-600 leading-relaxed mb-8">{resumen}</p>
              )}

              {/* CTA */}
              <Link
                href={`/${locale}/${locale === 'es' ? 'noticias' : 'news'}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-px"
              >
                {t('latest_cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
