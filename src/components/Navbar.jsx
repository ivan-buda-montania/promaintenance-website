import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The home page opens on a dark hero, so the bar starts transparent and turns
  // solid on scroll. Other routes (e.g. /estimate) have a light background, so
  // the bar must be solid from the top to stay readable.
  const onHome = pathname === "/";
  const solid = scrolled || !onHome;

  const NAV_LINKS = [
    { label: t("nav.services"), to: "/#services" },
    { label: t("nav.gallery"), to: "/#gallery" },
    { label: t("nav.about"), to: "/#about" },
    { label: t("nav.testimonials"), to: "/#testimonials" },
    { label: t("nav.planner"), to: "/#planner" },
    { label: t("nav.moodboard"), to: "/#moodboard" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-cream-50/90 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="container-prose flex items-center justify-between py-5">
        <Link
          to="/#top"
          aria-label="Pro Maintenance Corp. home"
          className={`inline-flex items-center rounded-full transition-all duration-300 ${
            solid
              ? "px-0 py-0 bg-transparent"
              : "px-3 py-1.5 bg-cream-50/95 shadow-soft backdrop-blur-sm"
          }`}
        >
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-amber ${
                  solid ? "text-charcoal/80" : "text-cream-50/90"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle
            className={`transition-colors duration-300 ${
              solid
                ? "text-charcoal hover:text-amber"
                : "text-cream-50 hover:text-amber"
            }`}
          />
          <Link
            to="/estimate"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              solid
                ? "bg-gradient-to-r from-amber to-sage text-cream-50 hover:from-amber-dark hover:to-sage-dark"
                : "bg-cream-50 text-charcoal hover:bg-amber hover:text-cream-50"
            }`}
          >
            {t("nav.freeEstimate")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full transition-colors ${
            solid ? "text-charcoal" : "text-cream-50"
          }`}
        >
          <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden absolute inset-x-0 top-full bg-cream-50 shadow-lift"
          >
            <ul className="container-prose flex flex-col gap-2 py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-charcoal/90 hover:bg-cream-200 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-cream-50/10 flex items-center gap-2">
                <span className="flex-1 text-xs uppercase tracking-[0.18em] text-charcoal/50">Language</span>
                <LanguageToggle className="text-charcoal hover:text-amber" />
              </li>
              <li className="pt-2">
                <Link
                  to="/estimate"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  {t("nav.freeEstimate")} →
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
