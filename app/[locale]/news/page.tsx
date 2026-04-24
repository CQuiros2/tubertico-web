import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { getTodasLasPublicaciones } from '@/lib/sanity/queries'
import { PublicacionesList } from '@/components/sections/PublicacionesList'

interface PageProps {
  params: { locale: string }
}

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.noticias' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function NewsPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale)
  const publicaciones = await getTodasLasPublicaciones().catch(() => [])
  return <PublicacionesList publicaciones={publicaciones} locale={locale} />
}
