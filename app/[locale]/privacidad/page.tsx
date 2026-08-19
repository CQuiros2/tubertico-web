import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/alternates';

interface PageProps {
  params: { locale: string };
}

const titles: Record<string, string> = {
  es: 'Política de Privacidad',
  en: 'Privacy Policy',
  fr: 'Politique de confidentialité',
  nl: 'Privacybeleid',
};

const descriptions: Record<string, string> = {
  es: 'Política de privacidad de Tubertico — Tubérculos Ticos S.R.L.',
  en: 'Privacy policy of Tubertico — Tubérculos Ticos S.R.L.',
  fr: 'Politique de confidentialité de Tubertico — Tubérculos Ticos S.R.L.',
  nl: 'Privacybeleid van Tubertico — Tubérculos Ticos S.R.L.',
};

// Not "Mentions légales": in France that is a separate, legally distinct
// document, so using it as the label for the privacy policy misleads.
const eyebrows: Record<string, string> = { es: 'Legal', en: 'Legal', fr: 'Confidentialité', nl: 'Privacy' };

const updated: Record<string, string> = {
  es: 'Última actualización: abril de 2026',
  en: 'Last updated: April 2026',
  fr: 'Dernière mise à jour : avril 2026',
  nl: 'Laatst bijgewerkt: april 2026',
};

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: localeAlternates(locale, '/privacidad'),
  };
}

export default function PrivacidadPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const es = locale === 'es';
  const fr = locale === 'fr';
  const nl = locale === 'nl';

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-orange mb-4">
          {eyebrows[locale] ?? eyebrows.en}
        </p>
        <h1 className="font-display font-bold text-brand-green-dark text-3xl md:text-4xl leading-tight tracking-tight mb-3">
          {titles[locale] ?? titles.en}
        </h1>
        <p className="text-gray-400 text-sm mb-12">
          {updated[locale] ?? updated.en}
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
          ) : fr ? (
            <>
              <p>
                Tubérculos Ticos S.R.L. (<strong>Tubertico</strong>), dont le siège se situe à Roxana, Pococí, Limón,
                Costa Rica, est responsable du traitement des données personnelles recueillies via ce site web
                (<strong>tubertico.com</strong>). La présente politique décrit les données que nous collectons, la
                manière dont nous les utilisons et les droits dont vous disposez.
              </p>

              <h2>1. Données que nous collectons</h2>
              <p>
                Nous ne recueillons que les données que vous nous fournissez volontairement via le formulaire de
                contact : nom, entreprise, adresse e-mail et contenu de votre message. Nous ne collectons ni données
                sensibles ni données concernant des mineurs.
              </p>

              <h2>2. Finalité du traitement</h2>
              <p>
                Les données sont utilisées exclusivement pour répondre à votre demande commerciale ou d'exportation et
                pour gérer la relation précontractuelle ou contractuelle avec vous. Nous ne les utilisons pas à des
                fins de marketing sans votre consentement exprès.
              </p>

              <h2>3. Base légale</h2>
              <p>
                Le traitement repose sur votre consentement lors de l'envoi du formulaire et, le cas échéant, sur
                l'exécution d'un contrat ou sur l'intérêt légitime de Tubertico à traiter les demandes commerciales.
              </p>

              <h2>4. Conservation des données</h2>
              <p>
                Vos données sont conservées le temps nécessaire au traitement de votre demande et, en cas de relation
                commerciale, pendant la durée exigée par la législation fiscale et commerciale applicable.
              </p>

              <h2>5. Tiers et transferts internationaux</h2>
              <p>
                Nous ne vendons ni ne cédons vos données à des tiers. Les données peuvent être traitées par des
                prestataires de services de messagerie ou d'hébergement web agissant en qualité de sous-traitants dans
                le cadre d'accords de confidentialité. Tubertico opère principalement depuis le Costa Rica ; tout
                transfert international est effectué avec les garanties appropriées.
              </p>

              <h2>6. Vos droits</h2>
              <p>
                Vous disposez du droit d'accéder à vos données, de les rectifier, de les effacer et de vous opposer à
                leur traitement, ainsi que d'en demander la limitation ou la portabilité. Pour exercer ces droits,
                contactez-nous à l'adresse{' '}
                <a href="mailto:info@tubertico.com">info@tubertico.com</a>.
              </p>

              <h2>7. Cookies</h2>
              <p>
                Ce site peut utiliser des cookies techniques essentiels à son fonctionnement. Aucun cookie de suivi ou
                de publicité n'est utilisé sans votre consentement.
              </p>

              <h2>8. Modifications</h2>
              <p>
                Tubertico se réserve le droit de mettre à jour la présente politique. La version en vigueur sera
                toujours disponible sur cette page.
              </p>

              <h2>9. Contact</h2>
              <p>
                Pour toute question relative à cette politique, vous pouvez nous écrire à{' '}
                <a href="mailto:info@tubertico.com">info@tubertico.com</a> ou nous appeler au +506 8973-2830.
              </p>
            </>
          ) : nl ? (
            <>
              <p>
                Tubérculos Ticos S.R.L. (<strong>Tubertico</strong>), gevestigd te Roxana, Pococí, Limón, Costa Rica,
                is verantwoordelijk voor de verwerking van de persoonsgegevens die via deze website
                (<strong>tubertico.com</strong>) worden verzameld. Dit beleid beschrijft welke gegevens wij verzamelen,
                hoe wij deze gebruiken en welke rechten u heeft.
              </p>

              <h2>1. Gegevens die wij verzamelen</h2>
              <p>
                Wij verzamelen uitsluitend de gegevens die u ons vrijwillig verstrekt via het contactformulier: naam,
                bedrijf, e-mailadres en de inhoud van uw bericht. Wij verzamelen geen bijzondere persoonsgegevens en
                geen gegevens van minderjarigen.
              </p>

              <h2>2. Doel van de verwerking</h2>
              <p>
                De gegevens worden uitsluitend gebruikt om uw commerciële of exportgerelateerde vraag te beantwoorden
                en om de precontractuele of contractuele relatie met u te beheren. Wij gebruiken ze niet voor
                marketingdoeleinden zonder uw uitdrukkelijke toestemming.
              </p>

              <h2>3. Rechtsgrondslag</h2>
              <p>
                De verwerking berust op uw toestemming bij het verzenden van het formulier en, waar van toepassing, op
                de uitvoering van een overeenkomst of op het gerechtvaardigd belang van Tubertico om zakelijke vragen
                te behandelen.
              </p>

              <h2>4. Bewaartermijn</h2>
              <p>
                Uw gegevens worden bewaard zolang dat nodig is om uw verzoek te behandelen en, in geval van een
                handelsrelatie, gedurende de termijn die de toepasselijke fiscale en handelswetgeving voorschrijft.
              </p>

              <h2>5. Derden en internationale doorgifte</h2>
              <p>
                Wij verkopen uw gegevens niet en geven ze niet door aan derden. De gegevens kunnen worden verwerkt door
                leveranciers van e-mail- of webhostingdiensten die als verwerker optreden op basis van
                geheimhoudingsovereenkomsten. Tubertico opereert hoofdzakelijk vanuit Costa Rica; elke internationale
                doorgifte vindt plaats met passende waarborgen.
              </p>

              <h2>6. Uw rechten</h2>
              <p>
                U heeft het recht op inzage, rectificatie en wissing van uw gegevens en het recht bezwaar te maken
                tegen de verwerking ervan, evenals het recht om beperking of overdraagbaarheid te verzoeken. Om deze
                rechten uit te oefenen kunt u contact met ons opnemen via{' '}
                <a href="mailto:info@tubertico.com">info@tubertico.com</a>.
              </p>

              <h2>7. Cookies</h2>
              <p>
                Deze site kan technisch noodzakelijke cookies gebruiken voor haar werking. Er worden geen tracking- of
                advertentiecookies gebruikt zonder uw toestemming.
              </p>

              <h2>8. Wijzigingen</h2>
              <p>
                Tubertico behoudt zich het recht voor dit beleid bij te werken. De geldende versie is altijd op deze
                pagina beschikbaar.
              </p>

              <h2>9. Contact</h2>
              <p>
                Voor vragen over dit beleid kunt u ons schrijven op{' '}
                <a href="mailto:info@tubertico.com">info@tubertico.com</a> of bellen naar +506 8973-2830.
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
