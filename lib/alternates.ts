import type { Metadata } from 'next'
import { getNewsPath } from './localeRoutes'
import { siteConfig } from './siteConfig'

// Absolute URL of a page for a given locale.
// The '/news' key resolves to the locale-specific segment
// (/noticias, /news, /actualites); every other route is shared across locales.
// Trailing slash matches next.config.mjs `trailingSlash: true`.
export function localeUrl(locale: string, route: string): string {
  const path = route === '/news' ? getNewsPath(locale) : route
  return `${siteConfig.url}/${locale}${path}/`
}

// Canonical + hreflang alternates, so search engines treat the locale
// variants as one page for different audiences rather than duplicate
// content — which matters most for /en/news vs /fr/actualites, where the
// article copy is identical (Sanity only stores ES/EN).
export function localeAlternates(locale: string, route: string): Metadata['alternates'] {
  return {
    canonical: localeUrl(locale, route),
    languages: {
      ...Object.fromEntries(siteConfig.locales.map((l) => [l, localeUrl(l, route)])),
      'x-default': localeUrl(siteConfig.defaultLocale, route),
    },
  }
}
