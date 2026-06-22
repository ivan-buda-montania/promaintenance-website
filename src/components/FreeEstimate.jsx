import { useTranslation } from "react-i18next";
import MultiStepForm from "./MultiStepForm";

export default function FreeEstimate() {
  const { t } = useTranslation();
  const features = t("estimate.features", { returnObjects: true });

  return (
    <section id="estimate" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 opacity-[0.04]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1C1C1A 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="container-prose">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">{t("estimate.eyebrow")}</span>
            <h2 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl lg:text-6xl text-balance">
              {t("estimate.title")}
            </h2>
            <p className="mt-5 max-w-md text-charcoal/70">
              {t("estimate.subtitle")}
            </p>

            <ul className="mt-10 space-y-4 text-sm">
              {(Array.isArray(features) ? features : []).map((point) => (
                <li key={point} className="flex items-center gap-3 text-charcoal/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage/20 text-sage-dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4 10-10" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <MultiStepForm />
          </div>
        </div>
      </div>
    </section>
  );
}
