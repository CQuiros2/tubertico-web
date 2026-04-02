import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/siteConfig';

interface ContactSectionProps {
  locale: string;
  banner?: boolean;
}

export function ContactSection({ locale, banner }: ContactSectionProps) {
  const t = useTranslations('contact');

  if (banner) {
    return (
      <section className="bg-brand-green py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-white/80 text-lg mb-8">{t('subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={`/${locale}/contacto`} variant="primary" size="lg">
                {t('cta')}
              </Button>
              <Button
                href={siteConfig.social.whatsapp}
                external
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-green"
              >
                {t('whatsapp')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <SectionWrapper id="contacto" className="bg-brand-cream">
      <AnimatedSection className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-green mb-3">
          {t('title')}
        </h2>
        <p className="text-gray-600 text-lg">{t('subtitle')}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact info + map */}
        <AnimatedSection direction="left">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                <Mail className="text-brand-green" size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{t('email_label')}</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-brand-green hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                <Phone className="text-brand-green" size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{t('phone_label')}</p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-brand-green hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                <MapPin className="text-brand-green" size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{t('address_label')}</p>
                <p className="text-gray-600">{siteConfig.contact.address}</p>
              </div>
            </div>

            {/* Google Maps embed placeholder */}
            <div className="mt-4 rounded-xl overflow-hidden aspect-video bg-gray-200 relative">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address + ',' + siteConfig.contact.addressDetail)}&output=embed`}
                width="100%"
                height="100%"
                className="absolute inset-0"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tubertico location"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Contact form */}
        <AnimatedSection direction="right">
          <form className="bg-white rounded-2xl p-8 shadow-md space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.name')}
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.email')}
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.company')}
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.message')}
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green resize-none"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
              {t('form.send')}
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
