import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const GOOGLE_REVIEW_URL = "https://g.page/pro-maintenance";

const TESTIMONIALS = [
  {
    id: "lillian",
    name: "Lillian Abbott",
    rating: 5,
    textKey: "testimonials.reviews.lillian",
  },
  {
    id: "daniel",
    name: "Daniel Lee",
    rating: 5,
    textKey: "testimonials.reviews.daniel",
  },
  {
    id: "james",
    name: "James Wong",
    rating: 5,
    textKey: "testimonials.reviews.james",
  },
  {
    id: "rabab",
    name: "Rabab Shlama",
    rating: 5,
    textKey: "testimonials.reviews.rabab",
  },
  {
    id: "satoshi",
    name: "Satoshi Watanabe",
    rating: 5,
    textKey: "testimonials.reviews.satoshi",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-amber"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function TestimonialCard({ testimonial, index, t }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="flex flex-col gap-4 rounded-2xl border border-charcoal/10 bg-cream-50 p-8 shadow-soft hover:shadow-lift transition-shadow"
    >
      <StarRating rating={testimonial.rating} />
      <blockquote className="flex-1 text-base leading-relaxed text-charcoal/85 italic">
        "{t(testimonial.textKey)}"
      </blockquote>
      <footer>
        <p className="font-medium text-charcoal">{testimonial.name}</p>
        <p className="text-xs uppercase tracking-[0.18em] text-charcoal/50 mt-1">
          {t("testimonials.customer")}
        </p>
      </footer>
    </motion.article>
  );
}

export default function Testimonials() {
  const { t } = useTranslation();
  const [headRef, headVisible] = useIntersectionObserver();

  return (
    <section id="testimonials" className="bg-cream-50 py-24 sm:py-32">
      <div className="container-prose">
        <div
          ref={headRef}
          className={`grid items-end gap-10 lg:grid-cols-[1fr_auto] transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <span className="eyebrow">{t("testimonials.eyebrow")}</span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-charcoal sm:text-5xl lg:text-6xl text-balance">
              {t("testimonials.title")}
            </h2>
          </div>
          <p className="max-w-md text-base text-charcoal/70">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
              t={t}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-charcoal/70 text-base">
            {t("testimonials.cta")}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/estimate" className="btn-primary">
              {t("testimonials.ctaButton")}
              <span aria-hidden="true">→</span>
            </Link>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/15 bg-white px-7 py-3.5 text-sm font-medium tracking-wide text-charcoal shadow-soft transition-all duration-300 hover:border-charcoal/30 hover:shadow-lift hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-cream-50"
            >
              <GoogleIcon className="h-4 w-4" />
              {t("testimonials.reviewButton")}
            </a>
          </div>

          <p className="mt-4 text-xs text-charcoal/55">
            {t("testimonials.reviewNote")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
