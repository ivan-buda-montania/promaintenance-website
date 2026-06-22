import { useTranslation } from "react-i18next";
import Logo from "./Logo";

const PHONE_DISPLAY = "+1 760-445-2261";
const PHONE_TEL      = "+17604452261";
const EMAIL          = "service@promaintenancecorp.com";
const WHATSAPP_URL   = "https://api.whatsapp.com/send/?phone=%2B17604452261&text&type=phone_number&app_absent=0";
const FACEBOOK_URL   = "https://www.facebook.com/people/Pro-Maintenance/61582208981964/?sfnsn=wa&mibextid=RUbZ1f";
const INSTAGRAM_URL  = "https://www.instagram.com/promaintenancecorp?utm_source=qru0026igsh%3DZGUzMzM3NWJiOQ%3D%3D";
const TIKTOK_URL     = "https://www.tiktok.com/@pro.maintenance5?_r=1u0026_t=ZP-93IS7vxvYnn";
const MAPS_QUERY     = "1637+E+Valley+Pkwy+%23373+Escondido+CA+92027";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
const MAP_EMBED_URL  = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export default function Contact() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-charcoal text-cream-50 pt-24 pb-10">
      <div className="container-prose">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="inline-flex items-center rounded-2xl bg-cream-50/95 px-4 py-3 shadow-soft">
              <Logo className="h-10 w-auto sm:h-12" />
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-50/70">
              {t("contact.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-cream-50/20 transition-colors"
                aria-label={`Call ${PHONE_DISPLAY}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {PHONE_DISPLAY}
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-cream-50/20 transition-colors"
                aria-label={`Email ${EMAIL}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
                </svg>
                {t("contact.emailCta")}
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-sage-light transition-colors"
                aria-label="Message us on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.8-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
                {t("contact.whatsappCta")}
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 hover:bg-amber transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 hover:bg-amber transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M13.5 22v-8h2.6l.4-3.1h-3V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H8v3.1h2.4V22h3.1z" />
                </svg>
              </a>

              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 hover:bg-amber transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M19.6 6.8a5.4 5.4 0 0 1-3.3-1.1 5.3 5.3 0 0 1-2-3.2h-3v12.7a2.5 2.5 0 1 1-2.5-2.5c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.8 5.6V9.1a8.4 8.4 0 0 0 5.2 1.8V7.9c-.1 0-.1-1.1 0-1.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cream-50/55">{t("contact.visit")}</p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-cream-50/85">
              1637 E. Valley Pkwy<br />
              #373<br />
              Escondido, CA 92027
            </address>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-amber hover:text-amber-light transition-colors"
            >
              {t("contact.directions")}
            </a>

            <p className="mt-8 text-xs uppercase tracking-[0.22em] text-cream-50/55">{t("contact.getInTouch")}</p>
            <p className="mt-3 text-sm text-cream-50/85">
              <a href={`tel:${PHONE_TEL}`} className="hover:text-amber transition-colors">{PHONE_DISPLAY}</a>
            </p>
            <p className="mt-1 text-sm text-cream-50/85 break-all">
              <a href={`mailto:${EMAIL}`} className="hover:text-amber transition-colors">{EMAIL}</a>
            </p>
          </div>

          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-cream-50/10 bg-cream-50/5">
              <iframe
                title="Pro Maintenance Corp. — location map"
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[40%] contrast-95 brightness-90"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream-50/10 pt-8 text-xs text-cream-50/50 sm:flex-row">
          <p>{t("contact.copyright")}</p>
          <p>{t("contact.license")}</p>
        </div>
      </div>
    </footer>
  );
}
