import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { services } from "../data/services";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

function ServiceIcon({ kind, className = "h-8 w-8" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    className,
  };

  switch (kind) {
    case "drywall":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <path d="M3 10h18M9 4v6M15 10v10M3 16h12" />
        </svg>
      );
    case "painting":
      return (
        <svg {...common}>
          <path d="M4 5h12a2 2 0 0 1 2 2v3H4z" />
          <path d="M11 10v3a1 1 0 0 0 1 1h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2 2 2 0 0 1-2-2" />
        </svg>
      );
    case "kitchen":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 9h18M9 3v6M9 14h6M9 18h6" />
          <circle cx="6" cy="13" r="1" />
          <circle cx="6" cy="17" r="1" />
        </svg>
      );
    case "flooring":
      return (
        <svg {...common}>
          <path d="M3 6h18M3 12h18M3 18h18" />
          <path d="M7 6v6M14 6v6M10 12v6M17 12v6" />
        </svg>
      );
    case "windows":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path d="M12 3v18M4 12h16" />
        </svg>
      );
    case "carpentry":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
          <path d="M3 21h18" />
        </svg>
      );
    case "repairs":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a1.5 1.5 0 1 0 2.1 2.1l6-6a4 4 0 0 0 5.4-5.4l-2.4 2.4-2-2z" />
        </svg>
      );
    default:
      return null;
  }
}

function ServiceCard({ service, index, t }) {
  const serviceKey = service.id;
  const name = t(`services.${serviceKey}.name`);
  const desc = t(`services.${serviceKey}.desc`);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col gap-5 rounded-2xl border border-charcoal/8 bg-cream-50 p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage-dark transition-colors duration-300 group-hover:bg-amber/15 group-hover:text-amber-dark">
        <ServiceIcon kind={service.icon} />
      </span>
      <div>
        <h3 className="text-xl font-medium text-charcoal">
          <span className="relative inline-block">
            {name}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-amber transition-all duration-500 group-hover:w-full" aria-hidden="true" />
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          {desc}
        </p>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const [headRef, headVisible] = useIntersectionObserver();

  return (
    <section id="services" className="bg-cream-50 py-24 sm:py-32">
      <div className="container-prose">
        <div
          ref={headRef}
          className={`grid items-end gap-10 lg:grid-cols-[1fr_auto] transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <span className="eyebrow">{t("services.eyebrow")}</span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-charcoal sm:text-5xl lg:text-6xl text-balance">
              {t("services.title")}
            </h2>
          </div>
          <p className="max-w-md text-base text-charcoal/70">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
