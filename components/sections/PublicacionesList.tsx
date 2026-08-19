'use client'

import { useTranslations } from 'next-intl'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PortableTextContent } from '@/components/ui/PortableTextContent'
import { urlFor } from '@/lib/sanity/image'
import type { Publicacion } from '@/types/publicacion'

function formatDate(dateStr: string, locale: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const monthsEs = ['enero','febrero','marzo','abril','mayo','junio',
                    'julio','agosto','septiembre','octubre','noviembre','diciembre']
  const monthsEn = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December']
  const monthsFr = ['janvier','février','mars','avril','mai','juin',
                    'juillet','août','septembre','octobre','novembre','décembre']
  const monthsNl = ['januari','februari','maart','april','mei','juni',
                    'juli','augustus','september','oktober','november','december']
  if (locale === 'es') return `${day} de ${monthsEs[month - 1]} de ${year}`
  if (locale === 'fr') return `${day === 1 ? '1er' : day} ${monthsFr[month - 1]} ${year}`
  if (locale === 'nl') return `${day} ${monthsNl[month - 1]} ${year}`
  return `${monthsEn[month - 1]} ${day}, ${year}`
}

const categoryLabel = (cat: string, locale: string): string => {
  const labels: Record<string, Record<string, string>> = {
    empresa: { es: 'Empresa', en: 'Company', fr: 'Entreprise', nl: 'Bedrijf' },
    certificaciones: { es: 'Certificaciones', en: 'Certifications', fr: 'Certifications', nl: 'Certificeringen' },
    exportaciones: { es: 'Exportaciones', en: 'Exports', fr: 'Exportations', nl: 'Export' },
    campo: { es: 'Campo', en: 'Field', fr: 'Champs', nl: 'Teelt' },
    productos: { es: 'Productos', en: 'Products', fr: 'Produits', nl: 'Producten' },
    sostenibilidad: { es: 'Sostenibilidad', en: 'Sustainability', fr: 'Durabilité', nl: 'Duurzaamheid' },
    'calidad-e-inocuidad': { es: 'Calidad e inocuidad', en: 'Quality & Food Safety', fr: 'Qualité et sécurité alimentaire', nl: 'Kwaliteit en voedselveiligheid' },
  }
  return labels[cat]?.[locale] ?? cat
}

interface Props {
  publicaciones: Publicacion[]
  locale: string
}

export function PublicacionesList({ publicaciones, locale }: Props) {
  const t = useTranslations('noticias')

  // Sanity only stores ES/EN copy, so every non-Spanish locale (en, fr, nl)
  // renders the English version, falling back to Spanish when it's missing.
  const useEnglishCopy = locale !== 'es'

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-brand-green-dark text-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="eyebrow text-brand-orange mb-4">{t('eyebrow')}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
              {t('title')}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{t('subtitle')}</p>
          </AnimatedSection>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {publicaciones.length === 0 ? (
          <AnimatedSection>
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">{t('empty')}</p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="divide-y divide-gray-100">
            {publicaciones.map((pub, idx) => {
              const titulo = (useEnglishCopy && pub.tituloEn) ? pub.tituloEn : pub.tituloEs
              const resumen = (useEnglishCopy && pub.resumenEn) ? pub.resumenEn : pub.resumenEs
              const contenido = (useEnglishCopy && pub.contenidoEn?.length) ? pub.contenidoEn : pub.contenidoEs
              const tipo = pub.tipoPublicacion === 'noticia' ? t('type_noticia') : t('type_blog')
              const cat = categoryLabel(pub.categoria, locale)
              const fecha = formatDate(pub.fechaPublicacion, locale)
              const imageUrl = pub.imagenPrincipal
                ? urlFor(pub.imagenPrincipal).width(1200).height(600).fit('crop').auto('format').url()
                : null

              return (
                <AnimatedSection key={pub._id} delay={idx * 0.05} className={idx > 0 ? 'pt-16' : ''}>
                  <article className={idx > 0 ? '' : 'pb-0'}>

                    {/* Featured image */}
                    {imageUrl && (
                      <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
                        <img
                          src={imageUrl}
                          alt={pub.imagenPrincipal?.alt || titulo}
                          className="w-full aspect-[2/1] object-cover"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                    )}

                    {/* Metadata row */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                        {tipo}
                      </span>
                      {cat && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-green/10 text-brand-green border border-brand-green/20">
                          {cat}
                        </span>
                      )}
                      <time className="text-sm text-gray-400 ml-auto font-medium">{fecha}</time>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                      {titulo}
                    </h2>

                    {/* Summary */}
                    {resumen && (
                      <p className="text-xl text-gray-500 leading-relaxed mb-8 font-light">{resumen}</p>
                    )}

                    {/* Full content */}
                    {contenido && contenido.length > 0 && (
                      <div className="mb-8">
                        <PortableTextContent value={contenido} />
                      </div>
                    )}

                    {/* Gallery */}
                    {pub.galeria && pub.galeria.length > 0 && (
                      <div className="mt-10 mb-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {pub.galeria.map((img, gIdx) => (
                            <div key={gIdx} className="rounded-xl overflow-hidden shadow-sm">
                              <img
                                src={urlFor(img).width(600).height(400).fit('crop').auto('format').url()}
                                alt={img.alt || `${titulo} - ${gIdx + 1}`}
                                className="w-full aspect-[3/2] object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                </AnimatedSection>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
