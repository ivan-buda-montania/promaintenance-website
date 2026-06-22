import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80"
        alt="A beautifully remodeled, warm interior with natural light"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-charcoal/80" aria-hidden="true" />

      <div className="container-prose relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mx-auto inline-flex items-center gap-3 rounded-full border border-cream-50/25 bg-charcoal/30 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-cream-50/90 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
          Family-run · Est. 1994
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex justify-center"
        >
          <h1 className="sr-only">Pro Maintenance Corp.</h1>
          <span className="inline-flex items-center justify-center rounded-3xl bg-cream-50/95 px-8 py-7 shadow-lift backdrop-blur-sm sm:px-12 sm:py-9">
            <Logo
              className="h-24 w-auto sm:h-32 md:h-40 lg:h-48"
              alt="Pro Maintenance Corp."
            />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-xl text-base text-cream-50/85 sm:text-lg"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#planner" className="btn-amber">
            {t("hero.startProject")}
            <span aria-hidden="true">→</span>
          </a>
          <a href="#gallery" className="btn-secondary">
            {t("hero.viewWork")}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-cream-50/70"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em]">{t("hero.scroll")}</span>
          <span className="block h-12 w-px bg-cream-50/40" />
        </div>
      </motion.div>
    </section>
  );
}
