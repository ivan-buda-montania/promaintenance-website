import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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
          <Link to="/estimate" className="mt-4 inline-flex items-center gap-2 btn-primary">
            {t("testimonials.ctaButton")}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
