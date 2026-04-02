import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy',
    description:
      locale === 'es'
        ? 'Política de privacidad de Tubertico — Tubérculos Ticos S.R.L.'
        : 'Privacy policy of Tubertico — Tubérculos Ticos S.R.L.',
  };
}

export default function PrivacidadPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const es = locale === 'es';

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-orange mb-4">
          {es ? 'Legal' : 'Legal'}
        </p>
        <h1 className="font-display font-bold text-brand-green-dark text-3xl md:text-4xl leading-tight tracking-tight mb-3">
          {es ? 'Política de Privacidad' : 'Privacy Policy'}
        </h1>
        <p className="text-gray-400 text-sm mb-12">
          {es ? 'Última actualización: abril de 2025' : 'Last updated: April 2025'}
        </p>

        <div className="prose prose-gray max-w-none prose-headings:font-display prose-headings:text-brand-green-dark prose-a:text-brand-green">

          {es ? (
            <>
              <p>
                Tubérculos Ticos S.R.L. (<strong>Tubertico</strong>), con domicilio en Roxana, Pococí, Limón, Costa Rica,
                es responsable del tratamiento de los datos personales recopilados a través de este sitio web
                (<strong>tubertico.com</strong>). Esta política describe qué datos recopilamos, cómo los usamos y los
                derechos que le asisten.
              </p>

              <h2>1. Datos que recopilamos</h2>
              <p>
                Recopilamos únicamente los datos que usted nos proporciona voluntariamente a través del formulario de
                contacto: nombre, empresa, correo electrónico y el contenido de su mensaje. No recopilamos datos
                sensibles ni datos de menores de edad.
              </p>

              <h2>2. Finalidad del tratamiento</h2>
              <p>
                Los datos se utilizan exclusivamente para responder a su consulta comercial o de exportación y para
                gestionar la relación precontractual o contractual con usted. No los utilizamos para fines de marketing
                sin su consentimiento expreso.
              </p>

              <h2>3. Base legal</h2>
              <p>
                El tratamiento se basa en su consentimiento al enviar el formulario y, cuando corresponde, en la
                ejecución de un contrato o en interés legítimo de Tubertico para atender consultas de negocio.
              </p>

              <h2>4. Conservación de datos</h2>
              <p>
                Sus datos se conservan el tiempo necesario para atender su solicitud y, en caso de relación comercial,
                durante el período exigido por la legislación fiscal y mercantil aplicable.
              </p>

              <h2>5. Terceros y transferencias internacionales</h2>
              <p>
                No vendemos ni cedemos sus datos a terceros. Los datos pueden ser procesados por proveedores de
                servicios de correo electrónico o alojamiento web que actúan como encargados de tratamiento bajo
                acuerdos de confidencialidad. Tubertico opera principalmente desde Costa Rica; cualquier transferencia
                internacional se realiza con las garantías adecuadas.
              </p>

              <h2>6. Sus derechos</h2>
              <p>
                Tiene derecho a acceder, rectificar, suprimir y oponerse al tratamiento de sus datos, así como a
                solicitar la limitación u portabilidad de los mismos. Para ejercer estos derechos, contáctenos en{' '}
                <a href="mailto:info@tubertico.com">info@tubertico.com</a>.
              </p>

              <h2>7. Cookies</h2>
              <p>
                Este sitio puede utilizar cookies técnicas esenciales para su funcionamiento. No se utilizan cookies de
                seguimiento o publicidad sin su consentimiento.
              </p>

              <h2>8. Modificaciones</h2>
              <p>
                Tubertico se reserva el derecho de actualizar esta política. La versión vigente siempre estará
                disponible en esta página.
              </p>

              <h2>9. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con esta política, puede escribirnos a{' '}
                <a href="mailto:info@tubertico.com">info@tubertico.com</a> o llamarnos al +506 8973-2830.
              </p>
            </>
          ) : (
            <>
              <p>
                Tubérculos Ticos S.R.L. (<strong>Tubertico</strong>), headquartered in Roxana, Pococí, Limón, Costa Rica,
                is responsible for processing the personal data collected through this website
                (<strong>tubertico.com</strong>). This policy describes what data we collect, how we use it, and your
                rights.
              </p>

              <h2>1. Data We Collect</h2>
              <p>
                We collect only the data you voluntarily provide through the contact form: your name, company, email
                address, and message content. We do not collect sensitive data or data from minors.
              </p>

              <h2>2. Purpose of Processing</h2>
              <p>
                Data is used solely to respond to your business or export inquiry and to manage the pre-contractual or
                contractual relationship with you. We do not use it for marketing purposes without your explicit
                consent.
              </p>

              <h2>3. Legal Basis</h2>
              <p>
                Processing is based on your consent when submitting the form and, where applicable, on the performance
                of a contract or Tubertico's legitimate interest in handling business inquiries.
              </p>

              <h2>4. Data Retention</h2>
              <p>
                Your data is retained for as long as necessary to address your inquiry and, in the case of a commercial
                relationship, for the period required by applicable tax and commercial law.
              </p>

              <h2>5. Third Parties and International Transfers</h2>
              <p>
                We do not sell or share your data with third parties. Data may be processed by email or web hosting
                service providers acting as data processors under confidentiality agreements. Tubertico operates
                primarily from Costa Rica; any international transfers are made with appropriate safeguards.
              </p>

              <h2>6. Your Rights</h2>
              <p>
                You have the right to access, rectify, erase, and object to the processing of your data, as well as to
                request restriction or portability. To exercise these rights, contact us at{' '}
                <a href="mailto:info@tubertico.com">info@tubertico.com</a>.
              </p>

              <h2>7. Cookies</h2>
              <p>
                This site may use essential technical cookies required for its operation. No tracking or advertising
                cookies are used without your consent.
              </p>

              <h2>8. Changes to This Policy</h2>
              <p>
                Tubertico reserves the right to update this policy. The current version will always be available on
                this page.
              </p>

              <h2>9. Contact</h2>
              <p>
                For any questions regarding this policy, you may write to us at{' '}
                <a href="mailto:info@tubertico.com">info@tubertico.com</a> or call +506 8973-2830.
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
