'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LangSwitcher } from '@/components/ui/LangSwitcher';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/productos`, label: t('products') },
    { href: `/${locale}/galeria`, label: t('gallery') },
    { href: `/${locale}/contacto`, label: t('contact') },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-green-dark/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.25)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-8">

          {/* Logo */}
          <Link href={`/${locale}`} className="shrink-0 opacity-95 hover:opacity-100 transition-opacity">
            <img src="/images/logo-white.png" alt="Tubertico" className="h-8 md:h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(link.href)
                    ? 'text-white'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-orange rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LangSwitcher locale={locale} />
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white text-sm font-semibold px-5 py-2 transition-colors shadow-md"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-brand-green-dark z-50 flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <img src="/images/logo-white.png" alt="Tubertico" className="h-7 w-auto" />
                <button
                  className="flex items-center justify-center w-9 h-9 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col flex-1 px-4 pt-4 pb-6 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-white/15 text-white'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isActive(link.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mr-3 shrink-0" />
                    )}
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="px-6 pb-8 flex flex-col gap-3 border-t border-white/10 pt-6">
                <LangSwitcher locale={locale} />
                <Link
                  href={`/${locale}/contacto`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-full bg-brand-orange hover:bg-brand-orange-light text-white text-sm font-semibold py-3 transition-colors"
                >
                  {t('cta')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
