'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { siteConfig } from '@/lib/siteConfig';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactSectionProps {
  locale: string;
  banner?: boolean;
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactSection({ locale, banner }: ContactSectionProps) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    const body = new FormData(e.currentTarget);

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  /* ── Banner variant (homepage CTA) ── */
  if (banner) {
    return (
      <section className="relative bg-brand-green-dark py-16 md:py-24 overflow-hidden">
        {/* Subtle dual-tone depth */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse at 20% 60%, rgba(116,133,53,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, rgba(199,92,25,0.10) 0%, transparent 55%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="eyebrow text-brand-orange/70 mb-5">{t('label')}</p>
            <h2 className="font-display font-bold text-white text-3xl md:text-[2.75rem] leading-tight tracking-tight mb-5">
              {t('title')}
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              {t('subtitle')}
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-3 justify-center mb-10">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_2px_10px_rgba(199,92,25,0.35)] hover:shadow-[0_4px_18px_rgba(199,92,25,0.45)]"
              >
                {t('cta')}
                <ArrowRight size={15} />
              </Link>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 hover:border-white/50 text-white font-semibold px-8 py-3.5 transition-all duration-200 hover:bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
            <p className="text-white/20 text-xs tracking-widest uppercase">
              {siteConfig.contact.contactName} &nbsp;·&nbsp; {siteConfig.contact.phone}
            </p>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  /* ── Full contact page variant ── */
  return (
    <SectionWrapper id="contacto" className="bg-white">
      <AnimatedSection className="mb-14">
        <p className="eyebrow mb-3">{t('label')}</p>
        <h2 className="font-display font-bold text-brand-green-dark text-3xl md:text-4xl leading-tight tracking-tight mb-3 max-w-lg">
          {t('headline')}
        </h2>
        <p className="text-gray-500 text-lg max-w-xl">{t('subtitle')}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

        {/* Contact info — 2/5 width */}
        <AnimatedSection direction="left" className="lg:col-span-2 flex flex-col gap-10">

          <ul className="flex flex-col gap-6">
            <li>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1.5">
                {t('contact_name_label')}
              </p>
              <p className="text-brand-green-dark font-medium text-sm">
                {siteConfig.contact.contactName}
              </p>
            </li>
            <li>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1.5">
                {t('email_label')}
              </p>
              <a href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-brand-green-dark font-medium hover:text-brand-green transition-colors">
                <Mail size={15} className="text-brand-orange shrink-0" />
                {siteConfig.contact.email}
              </a>
              <a href={`mailto:${siteConfig.contact.emailOffice}`}
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-brand-green transition-colors mt-1 ml-[23px]">
                {siteConfig.contact.emailOffice}
              </a>
            </li>
            <li>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1.5">
                {t('phone_label')}
              </p>
              <a href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 text-brand-green-dark font-medium hover:text-brand-green transition-colors">
                <Phone size={15} className="text-brand-orange shrink-0" />
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1.5">
                {t('address_label')}
              </p>
              <p className="flex items-start gap-2 text-brand-green-dark font-medium">
                <MapPin size={15} className="text-brand-orange shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.address}
                  <span className="block text-gray-400 text-sm font-normal mt-0.5">
                    {siteConfig.contact.addressDetail}
                  </span>
                </span>
              </p>
            </li>
          </ul>

          {/* WhatsApp shortcut */}
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/18 border border-[#25D366]/25 text-[#1a9e4c] font-semibold text-sm rounded-xl px-5 py-3.5 transition-all duration-200 self-start"
          >
            <WhatsAppIcon size={17} />
            {t('whatsapp')}
          </a>

        </AnimatedSection>

        {/* Form — 3/5 width */}
        <AnimatedSection direction="right" className="lg:col-span-3">
          {status === 'success' ? (
            <div className="flex flex-col items-start gap-5 py-10">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
                <CheckCircle size={24} className="text-brand-green" />
              </div>
              <div>
                <p className="font-display font-bold text-brand-green-dark text-xl mb-1">
                  {t('form.success_title')}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  {t('form.success_body')}
                </p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-brand-green font-medium hover:text-brand-green-mid transition-colors underline underline-offset-2"
              >
                {t('form.send_another')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    {t('form.name')} <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={status === 'loading'}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    disabled={status === 'loading'}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors disabled:opacity-60"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  {t('form.email')} <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={status === 'loading'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  {t('form.message')} <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  disabled={status === 'loading'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors resize-none disabled:opacity-60"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 leading-relaxed">
                  {t('form.error')}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="self-start inline-flex items-center gap-2 rounded-full bg-brand-green hover:bg-brand-green-mid text-white font-semibold text-sm px-8 py-3.5 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? t('form.sending') : t('form.send')}
                {status !== 'loading' && <ArrowRight size={15} />}
              </button>
            </form>
          )}
        </AnimatedSection>

      </div>

      {/* Full-width map */}
      <div className="mt-14 -mx-4 sm:-mx-6 lg:-mx-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[340px] md:h-[400px]">
        <iframe
          src="https://maps.google.com/maps?q=Tuberculos+Ticos+S.R.L.+(TUBERTICO)&z=17&output=embed"
          width="100%"
          height="100%"
          className="w-full h-full block"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tubertico — ubicación"
          allowFullScreen
        />
      </div>

    </SectionWrapper>
  );
}
