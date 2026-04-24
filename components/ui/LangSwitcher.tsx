'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocalizedHref } from '@/lib/localeRoutes';

interface LangSwitcherProps {
  locale: string;
}

export function LangSwitcher({ locale }: LangSwitcherProps) {
  const pathname = usePathname();

  const getLocalePath = (targetLocale: string) => {
    return getLocalizedHref(pathname, locale, targetLocale);
  };

  return (
    <div className="flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden text-sm font-medium">
      {(['es', 'en'] as const).map((lang) => (
        <Link
          key={lang}
          href={getLocalePath(lang)}
          className={`px-3 py-1 transition-all duration-200 uppercase tracking-wide ${
            locale === lang
              ? 'bg-white text-brand-green font-semibold'
              : 'text-white hover:bg-white/20'
          }`}
        >
          {lang}
        </Link>
      ))}
    </div>
  );
}
