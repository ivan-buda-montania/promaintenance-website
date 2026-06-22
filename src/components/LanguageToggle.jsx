import { useTranslation } from "react-i18next";

export default function LanguageToggle({ className = "" }) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={`Switch to ${i18n.language === "en" ? "Spanish" : "English"}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${className}`}
    >
      <span className={`transition-colors ${i18n.language === "en" ? "text-current" : "text-current/50"}`}>
        EN
      </span>
      <span className="text-current/30">|</span>
      <span className={`transition-colors ${i18n.language === "es" ? "text-current" : "text-current/50"}`}>
        ES
      </span>
    </button>
  );
}
