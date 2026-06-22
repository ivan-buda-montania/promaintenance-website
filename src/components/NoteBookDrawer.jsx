import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function NoteBookDrawer({ open, onClose, pinnedItems, onUnpin, onClear }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.45 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream-50 shadow-lift"
            role="dialog"
            aria-label="My Notebook"
          >
            <header className="flex items-start justify-between border-b border-charcoal/10 px-6 py-6">
              <div>
                <span className="eyebrow">My Notebook</span>
                <h3 className="mt-2 font-display text-2xl text-charcoal">
                  {pinnedItems.length} {pinnedItems.length === 1 ? "pin" : "pins"} saved
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close notebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/5 text-charcoal hover:bg-charcoal/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {pinnedItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-charcoal/60">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-14 w-14 text-charcoal/30" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <p className="mt-4 max-w-xs text-sm">
                    Pin colors, materials and styles from the moodboard. They'll
                    save here, on your device.
                  </p>
                </div>
              ) : (
                <ul className="grid grid-cols-2 gap-4">
                  {pinnedItems.map((item) => (
                    <li key={item.id} className="group relative overflow-hidden rounded-xl bg-charcoal/5">
                      <img src={item.img} alt={item.title} className="aspect-square w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent p-3">
                        <p className="text-xs font-medium text-cream-50">{item.title}</p>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-cream-50/70">{item.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onUnpin(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/90 text-charcoal opacity-0 transition-all group-hover:opacity-100 hover:bg-amber hover:text-cream-50"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                          <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {pinnedItems.length > 0 && (
              <footer className="border-t border-charcoal/10 px-6 py-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClear}
                  className="text-xs uppercase tracking-[0.18em] text-charcoal/60 hover:text-amber"
                >
                  Clear all
                </button>
                <Link to="/estimate" onClick={onClose} className="btn-primary !py-2.5 !px-5">
                  Share with us →
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
