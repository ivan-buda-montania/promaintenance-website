import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";

const SERVICES = [
  { id: "kitchenRemodel", label: "Kitchen Remodel" },
  { id: "bathroomRemodel", label: "Bathroom Remodel" },
  { id: "drywall", label: "Drywall" },
  { id: "painting", label: "Painting" },
  { id: "flooring", label: "Flooring" },
  { id: "windows", label: "Windows" },
  { id: "carpentry", label: "Carpentry" },
  { id: "generalRepairs", label: "General Repairs" },
];

const STYLES = [
  { id: "modern",      label: "Modern",      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { id: "rustic",      label: "Rustic",      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80" },
  { id: "minimalist",  label: "Minimalist",  img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80" },
  { id: "traditional", label: "Traditional", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" },
  { id: "other",       label: "Other",       img: null },
];

const CONTACT_METHODS = [
  { id: "SMS", key: "sms" },
  { id: "Call", key: "call" },
  { id: "WhatsApp", key: "whatsapp" },
];

const ROOM_SIZE_UNITS = [
  { id: "ft2", key: "roomSizeUnitFt2", symbol: "ft²" },
  { id: "m2", key: "roomSizeUnitM2", symbol: "m²" },
];

const INITIAL = {
  service: "",
  roomSize: "",
  roomSizeUnit: "ft2",
  budget: 15000,
  style: "",
  photoLinks: [],
  notes: "",
  name: "",
  phone: "",
  email: "",
  contactMethod: "",
};

function formatBudget(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function PhotoLinksInput({ links, onChange }) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState("");
  const [errorKey, setErrorKey] = useState("");

  const addLink = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (!/^https?:\/\/.+/.test(trimmed)) {
      setErrorKey("estimate.step2.photoError");
      return;
    }
    if (links.includes(trimmed)) {
      setErrorKey("estimate.step2.photoDuplicate");
      return;
    }
    onChange([...links, trimmed]);
    setDraft("");
    setErrorKey("");
  };

  const removeLink = (index) => onChange(links.filter((_, i) => i !== index));

  const onKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addLink(); }
  };

  return (
    <div>
      <span className="block text-xs font-medium uppercase tracking-[0.18em] text-charcoal/70">
        {t("estimate.step2.photos")}
        <span className="ml-2 normal-case text-charcoal/45">{t("estimate.step2.optional")}</span>
      </span>
      <p className="mt-1 text-xs text-charcoal/50">
        {t("estimate.step2.photosHint")}
      </p>

      <div className="mt-3 flex gap-2">
        <input
          type="url"
          value={draft}
          onChange={(e) => { setDraft(e.target.value); setErrorKey(""); }}
          onKeyDown={onKeyDown}
          placeholder={t("estimate.step2.photoPlaceholder")}
          className={`${baseInput} flex-1`}
          aria-label="Photo link URL"
        />
        <button
          type="button"
          onClick={addLink}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-charcoal/15 bg-gradient-to-r from-amber to-sage px-4 py-3 text-sm font-medium text-cream-50 transition-colors hover:from-amber-dark hover:to-sage-dark focus:outline-none focus:ring-2 focus:ring-amber/40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
          {t("estimate.step2.addLink")}
        </button>
      </div>

      {errorKey && <p className="mt-1.5 text-xs text-amber-dark">{t(errorKey)}</p>}

      <AnimatePresence initial={false}>
        {links.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2 overflow-hidden"
          >
            {links.map((link, i) => (
              <motion.li
                key={link}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 rounded-lg border border-charcoal/10 bg-cream-100 px-3 py-2.5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 shrink-0 text-sage-dark" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 1 0-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="flex-1 truncate text-xs text-charcoal/80">{link}</span>
                <button
                  type="button"
                  onClick={() => removeLink(i)}
                  aria-label={t("estimate.step2.removeLink", { index: i + 1 })}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-charcoal/40 transition-colors hover:bg-amber/15 hover:text-amber-dark"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5" aria-hidden="true">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {links.length > 0 && (
        <p className="mt-2 text-xs text-sage-dark">
          {t("estimate.step2.linksAdded", { count: links.length })}
        </p>
      )}
    </div>
  );
}

function Field({ label, htmlFor, error, children, hint }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-xs font-medium uppercase tracking-[0.18em] text-charcoal/70">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {hint && !error && <p className="mt-1.5 text-xs text-charcoal/55">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-amber-dark">{error}</p>}
    </label>
  );
}

const baseInput =
  "w-full rounded-lg border border-charcoal/15 bg-cream-50 px-4 py-3 text-base text-charcoal placeholder-charcoal/40 transition-colors focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20";

const SMS_PHONE = "+17604452261";
const SMS_PHONE_DISPLAY = "+1 760-445-2261";
const SMS_CHAR_LIMIT = 320;

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

function buildSmsMessage(data) {
  const details = data.notes?.trim() || "";
  const name = data.name?.trim();
  const phone = data.phone?.trim();
  const email = data.email?.trim();
  const service = data.service ? SERVICES.find((s) => s.id === data.service)?.label ?? data.service : "";
  const roomSizeValue = data.roomSize?.trim();
  const unitSymbol = ROOM_SIZE_UNITS.find((u) => u.id === data.roomSizeUnit)?.symbol ?? "";
  const address = roomSizeValue ? `${roomSizeValue} ${unitSymbol}`.trim() : "";
  const style = data.style ? capitalize(data.style) : "";
  const budget = data.budget ? formatBudget(data.budget) : "";

  const header = "Free Estimate Request";
  const fields = [
    name ? `Name: ${name}` : "",
    phone ? `Phone: ${phone}` : "",
    email ? `Email: ${email}` : "",
    service ? `Service: ${service}` : "",
    address ? `Size: ${address}` : "",
    budget ? `Budget: ${budget}` : "",
    style ? `Style: ${style}` : "",
  ].filter(Boolean);

  const base = `${header}\n\n${fields.join("\n")}`;

  if (!details) return base;

  const message = `${base}\n\nDetails:\n${details}`;
  if (message.length <= SMS_CHAR_LIMIT) return message;

  const detailsPrefix = "\n\nDetails:\n";
  const availableForDetails = Math.max(0, SMS_CHAR_LIMIT - base.length - detailsPrefix.length - 3);
  const truncatedDetails = `${details.slice(0, availableForDetails).trimEnd()}...`;
  const truncatedMessage = `${base}${detailsPrefix}${truncatedDetails}`;

  return truncatedMessage.length > SMS_CHAR_LIMIT
    ? truncatedMessage.slice(0, SMS_CHAR_LIMIT - 3) + "..."
    : truncatedMessage;
}

function buildSmsHref(message) {
  return `sms:${SMS_PHONE}?body=${encodeURIComponent(message)}`;
}

function isLikelyMobile() {
  if (typeof window === "undefined" || !window.navigator) return false;
  return /android|iphone|ipad|ipod|mobile/i.test(window.navigator.userAgent);
}

export default function MultiStepForm() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSmsPrompt, setShowSmsPrompt] = useState(false);
  const [pendingSmsMessage, setPendingSmsMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sendTimerRef = useRef(null);

  useEffect(() => {
    setIsMobile(isLikelyMobile());
  }, []);

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!data.service)            e.service = t("validation.selectService");
      if (!data.roomSize.trim())    e.roomSize = t("validation.enterRoomSize");
    }
    if (s === 2) {
      if (!data.style)              e.style = t("validation.selectStyle");
    }
    if (s === 3) {
      if (!data.name.trim())        e.name = t("validation.enterName");
      if (!/^[\d\s+\-()]{7,}$/.test(data.phone)) e.phone = t("validation.invalidPhone");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t("validation.invalidEmail");
      if (!data.contactMethod)      e.contactMethod = t("validation.selectContact");
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(3, s + 1));
  };
  const back = () => { setErrors({}); setStep((s) => Math.max(1, s - 1)); };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(3);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const message = buildSmsMessage(data);
    setPendingSmsMessage(message);
    setShowSmsPrompt(true);
    setIsSending(true);
    if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
    sendTimerRef.current = window.setTimeout(() => setIsSending(false), 3000);
  };

  const openSmsApp = () => {
    const smsUrl = buildSmsHref(pendingSmsMessage);
    window.location.href = smsUrl;
    setShowSmsPrompt(false);
    setSubmitted(true);
  };

  const reset = () => {
    if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
    setData(INITIAL);
    setStep(1);
    setErrors({});
    setSubmitted(false);
    setShowSmsPrompt(false);
    setPendingSmsMessage("");
    setIsSending(false);
  };

  if (submitted) {
    const contactMethodLabel = CONTACT_METHODS.find((m) => m.id === data.contactMethod)?.key;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-3xl bg-cream-50 p-10 text-center shadow-lift sm:p-14"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4 10-10" />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-3xl text-charcoal">
          {t("estimate.success.title", { name: data.name.split(" ")[0] })}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-charcoal/70">
          {t("estimate.success.subtitle", { method: contactMethodLabel ? t(`estimate.step3.${contactMethodLabel}`) : data.contactMethod })}
        </p>
        <button type="button" onClick={reset} className="mt-8 btn-primary">
          {t("estimate.success.restart")}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl bg-cream-50 p-6 shadow-lift sm:p-10">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                step >= s
                  ? "border-amber bg-amber text-cream-50"
                  : "border-charcoal/20 bg-cream-50 text-charcoal/40"
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`h-px flex-1 mx-3 transition-colors ${step > s ? "bg-amber" : "bg-charcoal/15"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 text-[10px] uppercase tracking-[0.2em] text-charcoal/55">
          <span className={step === 1 ? "text-amber" : ""}>{t("estimate.step1.title")}</span>
          <span className={`text-center ${step === 2 ? "text-amber" : ""}`}>{t("estimate.step2.title")}</span>
          <span className={`text-right ${step === 3 ? "text-amber" : ""}`}>{t("estimate.step3.title")}</span>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <Field label={t("estimate.step1.service")} htmlFor="service" error={errors.service}>
                <select
                  id="service"
                  value={data.service}
                  onChange={(e) => update({ service: e.target.value })}
                  className={baseInput}
                >
                  <option value="">{t("estimate.step1.selectService")}</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{t(`estimate.step1.services.${s.id}`, s.label)}</option>
                  ))}
                </select>
              </Field>

              <Field label={t("estimate.step1.roomSize")} htmlFor="size" error={errors.roomSize} hint={t("estimate.step1.roomSizeHint")}>
                <div className="flex gap-2">
                  <input
                    id="size"
                    type="text"
                    inputMode="numeric"
                    value={data.roomSize}
                    onChange={(e) => update({ roomSize: e.target.value })}
                    placeholder={t("estimate.step1.roomSizePlaceholder")}
                    className={`${baseInput} min-w-0 flex-1`}
                  />
                  <select
                    id="size-unit"
                    value={data.roomSizeUnit}
                    onChange={(e) => update({ roomSizeUnit: e.target.value })}
                    aria-label={t("estimate.step1.roomSize")}
                    className={`${baseInput} w-20 shrink-0`}
                  >
                    {ROOM_SIZE_UNITS.map((u) => (
                      <option key={u.id} value={u.id}>{t(`estimate.step1.${u.key}`, u.symbol)}</option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field label={t("estimate.step1.budget")} htmlFor="budget">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-charcoal">{formatBudget(data.budget)}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-charcoal/50">
                    {data.budget < 5000
                      ? t("estimate.step1.budgetLabel.small")
                      : data.budget < 25000
                      ? t("estimate.step1.budgetLabel.midRange")
                      : data.budget < 75000
                      ? t("estimate.step1.budgetLabel.fullRemodel")
                      : t("estimate.step1.budgetLabel.wholeHome")}
                  </span>
                </div>
                <input
                  id="budget"
                  type="range"
                  min={500}
                  max={100000}
                  step={500}
                  value={data.budget}
                  onChange={(e) => update({ budget: Number(e.target.value) })}
                  className="mt-3 w-full accent-amber"
                />
                <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.18em] text-charcoal/40">
                  <span>$500</span>
                  <span>$100K+</span>
                </div>
              </Field>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="space-y-7"
            >
              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.18em] text-charcoal/70">
                  {t("estimate.step2.style")}
                </span>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {STYLES.map((style) => {
                    const active = data.style === style.id;
                    const styleLabel = t(`estimate.step2.styles.${style.id}`, style.label);
                    return (
                      <label
                        key={style.id}
                        className={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                          active ? "border-amber shadow-soft" : "border-transparent hover:border-charcoal/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="style"
                          value={style.id}
                          checked={active}
                          onChange={() => update({ style: style.id })}
                          className="sr-only"
                        />
                        {style.img ? (
                          <img src={style.img} alt={styleLabel} className="aspect-square w-full object-cover" />
                        ) : (
                          <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-cream-100 to-cream-200">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-8 w-8 text-charcoal/30" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                            </svg>
                          </div>
                        )}
                        <div className={`absolute inset-x-0 bottom-0 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] ${
                          active ? "bg-amber text-cream-50" : "bg-charcoal/70 text-cream-50"
                        }`}>
                          {styleLabel}
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.style && <p className="mt-2 text-xs text-amber-dark">{errors.style}</p>}
              </div>

              <PhotoLinksInput
                links={data.photoLinks}
                onChange={(links) => update({ photoLinks: links })}
              />

              <Field label={t("estimate.step2.notes")} htmlFor="notes" hint={t("estimate.step2.notesHint")}>
                <textarea
                  id="notes"
                  rows={4}
                  value={data.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                  placeholder={t("estimate.step2.notesPlaceholder")}
                  className={baseInput}
                />
              </Field>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <Field label={t("estimate.step3.name")} htmlFor="name" error={errors.name}>
                <input
                  id="name" type="text"
                  value={data.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className={baseInput}
                  placeholder={t("estimate.step3.namePlaceholder")}
                />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={t("estimate.step3.phone")} htmlFor="phone" error={errors.phone}>
                  <input
                    id="phone" type="tel"
                    value={data.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    className={baseInput}
                    placeholder={t("estimate.step3.phonePlaceholder")}
                  />
                </Field>

                <Field label={t("estimate.step3.email")} htmlFor="email" error={errors.email}>
                  <input
                    id="email" type="email"
                    value={data.email}
                    onChange={(e) => update({ email: e.target.value })}
                    className={baseInput}
                    placeholder={t("estimate.step3.emailPlaceholder")}
                  />
                </Field>
              </div>

              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.18em] text-charcoal/70">
                  {t("estimate.step3.contactMethod")}
                </span>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {CONTACT_METHODS.map((m) => {
                    const active = data.contactMethod === m.id;
                    return (
                      <label
                        key={m.id}
                        className={`cursor-pointer rounded-lg border px-4 py-3 text-center text-sm font-medium transition-all ${
                          active
                            ? "border-amber bg-amber/10 text-amber-dark"
                            : "border-charcoal/15 text-charcoal/75 hover:border-charcoal/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={m.id}
                          checked={active}
                          onChange={() => update({ contactMethod: m.id })}
                          className="sr-only"
                        />
                        {t(`estimate.step3.${m.key}`)}
                      </label>
                    );
                  })}
                </div>
                {errors.contactMethod && <p className="mt-2 text-xs text-amber-dark">{errors.contactMethod}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="text-sm font-medium text-charcoal/60 hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t("estimate.back")}
            </button>

            {step < 3 ? (
              <button type="button" onClick={next} className="btn-primary">
                {t("estimate.continue")}
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={isSending}
                  className="btn-amber disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? t("estimate.preparing") : t("estimate.sendSms")}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </form>

      <AnimatePresence>
        {showSmsPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 px-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="sms-modal-title"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-cream-50 p-6 shadow-lift"
            >
              {isMobile ? (
                <>
                  <h3 id="sms-modal-title" className="font-display text-2xl text-charcoal">{t("estimate.smsModal.title")}</h3>
                  <p className="mt-3 text-sm leading-6 text-charcoal/70">
                    {t("estimate.smsModal.body")}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
                        setIsSending(false);
                        setShowSmsPrompt(false);
                      }}
                      className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm font-medium text-charcoal/70 transition-colors hover:bg-cream-100"
                    >
                      {t("estimate.smsModal.cancel")}
                    </button>
                    <button
                      type="button"
                      onClick={openSmsApp}
                      className="btn-amber"
                    >
                      {t("estimate.smsModal.openSms")}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 id="sms-modal-title" className="font-display text-2xl text-charcoal">{t("estimate.smsModal.qrTitle")}</h3>
                  <p className="mt-3 text-sm leading-6 text-charcoal/70">
                    {t("estimate.smsModal.qrBody")}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="rounded-2xl border border-charcoal/10 bg-white p-4 shadow-soft">
                      <QRCodeSVG
                        value={buildSmsHref(pendingSmsMessage)}
                        size={208}
                        level="M"
                        marginSize={0}
                        aria-label={t("estimate.smsModal.qrTitle")}
                      />
                    </div>
                  </div>
                  <p className="mt-5 text-center text-sm text-charcoal/60">
                    {t("estimate.smsModal.qrFallback", { phone: SMS_PHONE_DISPLAY })}
                  </p>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
                        setIsSending(false);
                        setShowSmsPrompt(false);
                      }}
                      className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm font-medium text-charcoal/70 transition-colors hover:bg-cream-100"
                    >
                      {t("estimate.smsModal.close")}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
