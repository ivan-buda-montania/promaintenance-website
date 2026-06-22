import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { galleryProjects, roomFilters } from "../data/galleryProjects";

export default function Gallery() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => (filter === "All" ? galleryProjects : galleryProjects.filter((p) => p.room === filter)),
    [filter],
  );

  return (
    <section id="gallery" className="bg-charcoal py-24 sm:py-32 text-cream-50">
      <div className="container-prose">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow !text-amber">{t("gallery.eyebrow")}</span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl sm:text-5xl lg:text-6xl text-cream-50 text-balance">
              {t("gallery.title")}
            </h2>
            <p className="mt-5 max-w-lg text-cream-50/70">
              {t("gallery.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {roomFilters.map((room) => {
              const active = filter === room;
              return (
                <button
                  key={room}
                  type="button"
                  onClick={() => setFilter(room)}
                  className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                    active
                      ? "border-amber bg-amber text-cream-50"
                      : "border-cream-50/25 text-cream-50/75 hover:border-cream-50/60 hover:text-cream-50"
                  }`}
                  aria-pressed={active}
                >
                  {room}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.figure
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-4"
              >
                <BeforeAfterSlider
                  before={project.before}
                  after={project.after}
                  alt={project.title}
                />
                <figcaption className="flex items-baseline justify-between">
                  <span className="font-display text-xl text-cream-50">{project.title}</span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-cream-50/55">
                    {project.room}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-cream-50/60">
            {t("gallery.empty")}
          </p>
        )}
      </div>
    </section>
  );
}
