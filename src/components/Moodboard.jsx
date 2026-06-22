import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { moodboardCategories, moodboardItems } from "../data/moodboardItems";
import { useMoodboard } from "../hooks/useMoodboard";
import NoteBookDrawer from "./NoteBookDrawer";

function HeartIcon({ filled, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function Moodboard() {
  const { t } = useTranslation();
  const [category, setCategory] = useState(moodboardCategories[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pinnedIds, isPinned, togglePin, clearAll } = useMoodboard();

  const visible = useMemo(
    () => moodboardItems.filter((m) => m.category === category),
    [category],
  );

  const pinnedItems = useMemo(
    () => pinnedIds
      .map((id) => moodboardItems.find((m) => m.id === id))
      .filter(Boolean),
    [pinnedIds],
  );

  return (
    <section id="moodboard" className="bg-cream-50 py-24 sm:py-32">
      <div className="container-prose">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">{t("moodboard.eyebrow")}</span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-charcoal sm:text-5xl lg:text-6xl text-balance">
              {t("moodboard.title")}
            </h2>
            <p className="mt-5 max-w-lg text-charcoal/70">
              {t("moodboard.subtitle")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="group relative inline-flex items-center gap-3 rounded-full border border-charcoal/15 bg-cream-50 px-5 py-3 text-sm font-medium text-charcoal shadow-soft hover:shadow-lift transition-all"
          >
            <HeartIcon filled={pinnedItems.length > 0} className="h-5 w-5 text-amber" />
            {t("moodboard.myNotebook")}
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-charcoal px-2 text-xs font-semibold text-cream-50">
              {pinnedItems.length}
            </span>
          </button>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {moodboardCategories.map((cat) => {
            const active = cat === category;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-all ${
                  active
                    ? "bg-charcoal text-cream-50"
                    : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
                }`}
                aria-pressed={active}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => {
              const pinned = isPinned(item.id);
              return (
                <motion.figure
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl bg-charcoal/5"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-90" aria-hidden="true" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <div>
                      <p className="text-sm font-medium text-cream-50">{item.title}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-cream-50/70">
                        {item.category}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePin(item.id)}
                      aria-label={pinned ? `Unpin ${item.title}` : `Pin ${item.title}`}
                      aria-pressed={pinned}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                        pinned
                          ? "bg-amber text-cream-50 scale-110"
                          : "bg-cream-50/90 text-charcoal hover:bg-cream-50 hover:scale-110"
                      }`}
                    >
                      <HeartIcon filled={pinned} className="h-5 w-5" />
                    </button>
                  </figcaption>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <NoteBookDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        pinnedItems={pinnedItems}
        onUnpin={togglePin}
        onClear={clearAll}
      />
    </section>
  );
}
