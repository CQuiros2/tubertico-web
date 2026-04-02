import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { siteConfig } from '@/lib/siteConfig';

interface ContactSectionProps {
  locale: string;
  banner?: boolean;
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactSection({ locale, banner }: ContactSectionProps) {
  const t = useTranslations('contact');

  if (banner) {
    return (
      <section className="relative bg-brand-green-dark py-20 md:py-24 px-4 overflow-hidden">
        {/* Decorative background rings */}
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full border border-white/5 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="eyebrow text-brand-orange mb-4">{t('whatsapp')}</p>
            <h2 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-5">
              {t('title')}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold px-8 py-3.5 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t('cta')}
                <ArrowRight size={16} />
              </Link>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 transition-all duration-200 hover:bg-white/10"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <SectionWrapper id="contacto" className="bg-brand-cream">
      <AnimatedSection className="text-center mb-14">
        <p className="eyebrow mb-3">Contacto</p>
        <h2 className="font-display font-bold text-brand-green-dark text-3xl md:text-4xl leading-tight tracking-tight mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* Contact info + map */}
        <AnimatedSection direction="left" className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-brand-green/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green/15 transition-colors">
                <Mail className="text-brand-green" size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">{t('email_label')}</p>
                <p className="text-gray-800 font-medium text-sm">{siteConfig.contact.email}</p>
                <p className="text-gray-500 text-xs mt-0.5">{siteConfig.contact.emailSales}</p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-brand-green/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green/15 transition-colors">
                <Phone className="text-brand-green" size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">{t('phone_label')}</p>
                <p className="text-gray-800 font-medium text-sm">{siteConfig.contact.phone}</p>
                <p className="text-gray-500 text-xs mt-0.5">{siteConfig.contact.phoneSales}</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                <MapPin className="text-brand-green" size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">{t('address_label')}</p>
                <p className="text-gray-800 font-medium text-sm">{siteConfig.contact.address}</p>
                <p className="text-gray-500 text-xs mt-0.5">{siteConfig.contact.addressDetail}</p>
              </div>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 aspect-video shadow-sm">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                siteConfig.contact.address + ', ' + siteConfig.contact.addressDetail
              )}&output=embed`}
              width="100%"
              height="100%"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tubertico location"
            />
          </div>
        </AnimatedSection>

        {/* Contact form */}
        <AnimatedSection direction="right">
          <form className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  {t('form.name')} <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green/25 focus:border-brand-green transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  {t('form.company')}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green/25 focus:border-brand-green transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                {t('form.email')} <span className="text-brand-orange">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green/25 focus:border-brand-green transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                {t('form.message')} <span className="text-brand-orange">*</span>
              </label>
              <textarea
                rows={5}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green/25 focus:border-brand-green transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-green hover:bg-brand-green-mid text-white font-semibold text-sm py-3.5 transition-all duration-200 shadow-sm hover:shadow-md mt-1"
            >
              {t('form.send')}
              <ArrowRight size={16} />
            </button>
          </form>
        </AnimatedSection>

      </div>
    </SectionWrapper>
  );
}
