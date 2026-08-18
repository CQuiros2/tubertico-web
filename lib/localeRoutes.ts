// Maps path segments that differ per locale.
// Add any future locale-specific routes here.
const routeMap: Record<string, Record<string, string>> = {
  '/noticias':   { es: '/noticias', en: '/news', fr: '/actualites' },
  '/news':       { es: '/noticias', en: '/news', fr: '/actualites' },
  '/actualites': { es: '/noticias', en: '/news', fr: '/actualites' },
}

// Path segment of the News & Blog page for a given locale.
export function getNewsPath(locale: string): string {
  return routeMap['/noticias'][locale] ?? '/news'
}

export function getLocalizedHref(
  pathname: string,
  currentLocale: string,
  targetLocale: string,
): string {
  const withoutLocale = pathname.slice(`/${currentLocale}`.length).replace(/\/$/, '') || '/'
  const mapped = routeMap[withoutLocale]?.[targetLocale]
  if (mapped) return `/${targetLocale}${mapped}`
  return pathname.replace(`/${currentLocale}`, `/${targetLocale}`) || `/${targetLocale}`
}
