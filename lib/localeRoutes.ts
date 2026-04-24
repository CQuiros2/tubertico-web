// Maps path segments that differ per locale.
// Add any future locale-specific routes here.
const routeMap: Record<string, Record<string, string>> = {
  '/noticias': { es: '/noticias', en: '/news' },
  '/news':     { es: '/noticias', en: '/news' },
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
