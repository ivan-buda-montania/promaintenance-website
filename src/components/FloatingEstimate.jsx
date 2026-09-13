import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import MultiStepForm from "./MultiStepForm";

export default function FloatingEstimate() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [nearContact, setNearContact] = useState(false);

  // Contact is also this site's footer, so hide the FAB once it scrolls into
  // view to avoid covering its links. Re-attach on route change since Home
  // and the Estimate page each mount their own Contact instance.
  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => setNearContact(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname === "/estimate") return null;

  const hideFab = nearContact && !open;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="estimate-widget-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-cream-50 shadow-lift sm:inset-auto sm:bottom-24 sm:right-6 sm:max-h-[calc(100dvh-8rem)] sm:w-[26rem] sm:rounded-3xl sm:border sm:border-charcoal/10"
          >
            <header className="flex items-center gap-3 border-b border-charcoal/10 bg-charcoal px-5 py-4 text-cream-50 sm:rounded-t-3xl">
              <span className="inline-flex shrink-0 items-center rounded-xl bg-cream-50/95 px-2.5 py-1.5">
                <Logo className="h-6 w-auto" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="estimate-widget-title" className="font-display text-lg leading-tight text-cream-50">
                  {t("estimateWidget.title")}
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-cream-50/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage-light" aria-hidden="true" />
                  {t("estimateWidget.subtitle")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("estimateWidget.close")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
              <MultiStepForm embedded />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t("estimateWidget.close") : t("estimateWidget.open")}
        aria-expanded={open}
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber to-sage text-cream-50 shadow-[0_8px_24px_-2px_rgba(196,122,43,0.45)] transition-all duration-300 hover:from-amber-dark hover:to-sage-dark hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-cream-50 sm:bottom-6 sm:right-6 ${
          hideFab ? "pointer-events-none opacity-0" : "opacity-100"
        } ${open ? "hidden sm:flex" : ""}`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
            <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </>
  );
}
