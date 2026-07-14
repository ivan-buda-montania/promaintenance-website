import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PILLAR_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M4 13l3-9h10l3 9" />
      <path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6z" />
      <path d="M9 17h6" />
    </svg>
  ),
];

export default function About() {
  const { t } = useTranslation();

  const PILLARS = [
    {
      titleKey: "about.experience.title",
      bodyKey: "about.experience.body",
      icon: PILLAR_ICONS[0],
      statKey: "about.experience.stat",
    },
    {
      titleKey: "about.honesty.title",
      bodyKey: "about.honesty.body",
      icon: PILLAR_ICONS[1],
      statKey: "about.honesty.stat",
    },
    {
      titleKey: "about.clean.title",
      bodyKey: "about.clean.body",
      icon: PILLAR_ICONS[2],
      statKey: "about.clean.stat",
    },
  ];
  return (
    <section id="about" className="relative bg-cream py-24 sm:py-32">
      <div className="container-prose">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="eyebrow">{t("about.eyebrow")}</span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-charcoal sm:text-5xl lg:text-6xl text-balance">
              {t("about.title")}
            </h2>
          </div>
          <p className="max-w-md text-charcoal/70">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.titleKey}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              className="relative flex flex-col gap-5 border-t border-charcoal/15 pt-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                  {p.icon}
                </span>
                <span className="font-display text-2xl text-amber">{t(p.statKey)}</span>
              </div>
              <h3 className="font-display text-3xl text-charcoal">{t(p.titleKey)}</h3>
              <p className="text-base leading-relaxed text-charcoal/75">
                {t(p.bodyKey)}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-24 max-w-3xl text-center"
        >
          <p className="font-display text-2xl italic text-charcoal sm:text-3xl text-balance">
            "{t("about.quote")}"
          </p>
          <footer className="mt-5 text-xs uppercase tracking-[0.22em] text-charcoal/55">
            {t("about.author")}
          </footer>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-20 max-w-md rounded-2xl border border-charcoal/15 bg-cream-50 p-8 text-center shadow-soft"
        >
          <span className="eyebrow">{t("about.business.heading")}</span>
          <p className="mt-4 font-display text-2xl text-charcoal">
            {t("about.business.legalName")}
          </p>
          <p className="mt-1 text-charcoal/75">
            {t("about.business.dbaLabel")}: {t("about.business.dbaValue")}
          </p>
          <p className="mt-1 text-charcoal/75">
            {t("about.business.licenseLabel")} {t("about.business.licenseValue")}
          </p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-charcoal/60">
            {t("about.business.addressLine1")}
            <br />
            {t("about.business.addressLine2")}
          </address>
        </motion.div>
      </div>
    </section>
  );
}
