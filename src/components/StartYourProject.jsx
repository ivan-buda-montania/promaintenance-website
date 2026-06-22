import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const CARD_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M9 11l3 3 7-7" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M5 16v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M4 4h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-2 1V6a2 2 0 0 1 0-2z" />
      <path d="M8 8h8M8 12h6" />
    </svg>
  ),
];

function ExpandedPanel({ card, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="mt-6 rounded-xl bg-charcoal/5 p-6">
        <h4 className="font-display text-xl text-charcoal">{t(card.expanded.titleKey)}</h4>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
          {t(card.expanded.bodyKey)}
        </p>
        <Link
          to={card.expanded.cta.to}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-dark hover:text-amber transition-colors"
        >
          {t(card.expanded.cta.labelKey)} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function StartYourProject() {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);

  const CARDS = [
    {
      id: "plan",
      labelKey: "planner.cards.plan.label",
      descKey: "planner.cards.plan.desc",
      icon: CARD_ICONS[0],
      expanded: {
        titleKey: "planner.cards.plan.title",
        bodyKey: "planner.cards.plan.body",
        cta: { to: "/estimate", labelKey: "planner.cards.plan.cta" },
      },
    },
    {
      id: "upload",
      labelKey: "planner.cards.upload.label",
      descKey: "planner.cards.upload.desc",
      icon: CARD_ICONS[1],
      expanded: {
        titleKey: "planner.cards.upload.title",
        bodyKey: "planner.cards.upload.body",
        cta: { to: "/estimate", labelKey: "planner.cards.upload.cta" },
      },
    },
    {
      id: "notebook",
      labelKey: "planner.cards.notebook.label",
      descKey: "planner.cards.notebook.desc",
      icon: CARD_ICONS[2],
      expanded: {
        titleKey: "planner.cards.notebook.title",
        bodyKey: "planner.cards.notebook.body",
        cta: { to: "/#moodboard", labelKey: "planner.cards.notebook.cta" },
      },
    },
  ];

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="planner" className="bg-sage py-24 sm:py-32 text-cream-50">
      <div className="container-prose">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow !text-cream-50/80 before:!bg-cream-50/60">
            {t("planner.eyebrow")}
          </span>
          <h2 className="mt-5 font-display text-4xl text-cream-50 sm:text-5xl lg:text-6xl text-balance">
            {t("planner.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream-50/85">
            {t("planner.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {CARDS.map((card) => {
            const isActive = active === card.id;
            return (
              <div key={card.id} className="flex flex-col">
                <motion.button
                  type="button"
                  onClick={() => setActive(isActive ? null : card.id)}
                  whileHover={{ y: -4 }}
                  className={`group flex flex-1 flex-col items-start gap-5 rounded-2xl border p-8 text-left transition-colors duration-300 ${
                    isActive
                      ? "border-amber bg-cream-50 text-charcoal"
                      : "border-cream-50/25 bg-sage-dark/40 text-cream-50 hover:bg-sage-dark/60 hover:border-cream-50/50"
                  }`}
                  aria-expanded={isActive}
                  aria-controls={`panel-${card.id}`}
                >
                  <span className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                    isActive ? "bg-amber/15 text-amber-dark" : "bg-cream-50/15 text-cream-50"
                  }`}>
                    {card.icon}
                  </span>
                  <div>
                    <h3 className={`font-display text-2xl ${isActive ? "text-charcoal" : "text-cream-50"}`}>
                      {t(card.labelKey)}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed ${isActive ? "text-charcoal/70" : "text-cream-50/80"}`}>
                      {t(card.descKey)}
                    </p>
                  </div>
                  <span className={`mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.22em] ${
                    isActive ? "text-amber" : "text-cream-50/70 group-hover:text-cream-50"
                  }`}>
                    {isActive ? "Close" : "Open"}
                    <span aria-hidden="true">{isActive ? "↑" : "↓"}</span>
                  </span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <div id={`panel-${card.id}`}>
                      <ExpandedPanel card={card} t={t} />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
