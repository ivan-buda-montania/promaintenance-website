import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Keeps scroll position sensible across route + hash changes.
// - With a hash (e.g. "/#services"), scrolls smoothly to that element. This is
//   what lets the navbar's section links work from any route, including the
//   /estimate subpage where those sections don't exist (it routes home first).
// - Without a hash, scrolls to the top on navigation (e.g. opening /estimate).
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return undefined;
    }

    const id = hash.slice(1);
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return Boolean(el);
    };

    // After a cross-page jump the target may not be mounted yet, so retry once.
    if (!scrollToTarget()) {
      const timer = setTimeout(scrollToTarget, 120);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [pathname, hash]);

  return null;
}
