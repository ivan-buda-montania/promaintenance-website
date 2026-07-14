import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const SERVICES = [
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Drywall",
  "Painting",
  "Flooring",
  "Windows",
  "Carpentry",
  "General Repairs",
];

const STYLES = [
  { id: "modern",      label: "Modern",      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { id: "rustic",      label: "Rustic",      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80" },
  { id: "minimalist",  label: "Minimalist",  img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80" },
  { id: "traditional", label: "Traditional", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" },
];

const CONTACT_METHODS = ["SMS", "WhatsApp", "Call"];

const INITIAL = {
  service: "",
  roomSize: "",
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
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  const addLink = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (!/^https?:\/\/.+/.test(trimmed)) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }
    if (links.includes(trimmed)) {
      setError("This link is already in the list.");
      return;
    }
    onChange([...links, trimmed]);
    setDraft("");
    setError("");
  };

  const removeLink = (index) => onChange(links.filter((_, i) => i !== index));

  const onKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addLink(); }
  };

  return (
    <div>
      <span className="block text-xs font-medium uppercase tracking-[0.18em] text-charcoal/70">
        Inspiration photo links
        <span className="ml-2 normal-case text-charcoal/45">Optional</span>
      </span>
      <p className="mt-1 text-xs text-charcoal/50">
        Google Photos, Google Drive, Dropbox — any shareable image URL.
      </p>

      <div className="mt-3 flex gap-2">
        <input
          type="url"
          value={draft}
          onChange={(e) => { setDraft(e.target.value); setError(""); }}
          onKeyDown={onKeyDown}
          placeholder="https://photos.google.com/share/..."
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
          Add
        </button>
      </div>

      {error && <p className="mt-1.5 text-xs text-amber-dark">{error}</p>}

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
                  aria-label={`Remove link ${i + 1}`}
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
          {links.length} link{links.length !== 1 ? "s" : ""} added
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
  const service = data.service?.trim();
  const address = data.roomSize?.trim();
  const style = data.style ? capitalize(data.style) : "";
  const budget = data.budget ? formatBudget(data.budget) : "";

  const baseParts = [
    "Free Estimate",
    name ? `Name:${name}` : "",
    phone ? `Ph:${phone}` : "",
    email ? `Email:${email}` : "",
    service ? `Svc:${service}` : "",
    address ? `Addr:${address}` : "",
    budget ? `Budget:${budget}` : "",
    style ? `Style:${style}` : "",
  ].filter(Boolean);

  if (!details) return baseParts.join(" | ");

  const detailsPart = `Details:${details}`;
  let message = [...baseParts, detailsPart].join(" | ");

  if (message.length <= SMS_CHAR_LIMIT) return message;

  const baseWithoutDetails = baseParts.join(" | ");
  const prefix = "Details:";
  const availableForDetails = Math.max(0, SMS_CHAR_LIMIT - baseWithoutDetails.length - prefix.length - 3);
  const truncatedDetails = `${details.slice(0, availableForDetails).trimEnd()}...`;
  const truncatedMessage = `${baseWithoutDetails} | ${prefix}${truncatedDetails}`;

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
  const [desktopNotice, setDesktopNotice] = useState("");
  const sendTimerRef = useRef(null);

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
    setDesktopNotice("");
    setShowSmsPrompt(true);
    setIsSending(true);
    if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
    sendTimerRef.current = window.setTimeout(() => setIsSending(false), 3000);
  };

  const openSmsApp = () => {
    if (!isLikelyMobile()) {
      setShowSmsPrompt(false);
      setDesktopNotice(`Please open this page on your mobile device to text us, or call us directly at ${SMS_PHONE_DISPLAY}.`);
      return;
    }

    const smsUrl = buildSmsHref(pendingSmsMessage);
    window.location.href = smsUrl;
    setShowSmsPrompt(false);
    setSubmitted(true);
  };

  const sendByEmail = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    const errs = validate(3);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const subject = encodeURIComponent("Free Estimate Request");
    const body = encodeURIComponent(pendingSmsMessage || buildSmsMessage(data));
    window.open(`mailto:service@promaintenancecorp.com?subject=${subject}&body=${body}`);
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
    setDesktopNotice("");
    setIsSending(false);
  };

  if (submitted) {
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
          {t("estimate.success.subtitle", { method: data.contactMethod })}
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
          <span className={step === 1 ? "text-amber" : ""}>Your project</span>
          <span className={`text-center ${step === 2 ? "text-amber" : ""}`}>Your vision</span>
          <span className={`text-right ${step === 3 ? "text-amber" : ""}`}>Your info</span>
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
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <Field label={t("estimate.step1.roomSize")} htmlFor="size" error={errors.roomSize} hint={t("estimate.step1.roomSizeHint")}>
                <input
                  id="size"
                  type="text"
                  value={data.roomSize}
                  onChange={(e) => update({ roomSize: e.target.value })}
                  placeholder={t("estimate.step1.roomSizePlaceholder")}
                  className={baseInput}
                />
              </Field>

              <Field label="Approximate budget" htmlFor="budget">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-charcoal">{formatBudget(data.budget)}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-charcoal/50">
                    {data.budget < 5000 ? "Small project" : data.budget < 25000 ? "Mid-range" : data.budget < 75000 ? "Full remodel" : "Whole-home"}
                  </span>
                </div>
                <input
                  id="budget"
                  type="range"
                  min={1000}
                  max={150000}
                  step={500}
                  value={data.budget}
                  onChange={(e) => update({ budget: Number(e.target.value) })}
                  className="mt-3 w-full accent-amber"
                />
                <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.18em] text-charcoal/40">
                  <span>$1K</span>
                  <span>$150K+</span>
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
                  Desired style
                </span>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {STYLES.map((style) => {
                    const active = data.style === style.id;
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
                        <img src={style.img} alt={style.label} className="aspect-square w-full object-cover" />
                        <div className={`absolute inset-x-0 bottom-0 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] ${
                          active ? "bg-amber text-cream-50" : "bg-charcoal/70 text-cream-50"
                        }`}>
                          {style.label}
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

              <Field label="Anything else" htmlFor="notes" hint="Optional. Constraints, deadlines, specific must-haves.">
                <textarea
                  id="notes"
                  rows={4}
                  value={data.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                  placeholder="e.g. We have two kids and a dog, weekend work is fine, we want it done by Thanksgiving…"
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
              <Field label="Name" htmlFor="name" error={errors.name}>
                <input
                  id="name" type="text"
                  value={data.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className={baseInput}
                  placeholder="First and last name"
                />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Phone" htmlFor="phone" error={errors.phone}>
                  <input
                    id="phone" type="tel"
                    value={data.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    className={baseInput}
                    placeholder="(555) 010-0123"
                  />
                </Field>

                <Field label="Email" htmlFor="email" error={errors.email}>
                  <input
                    id="email" type="email"
                    value={data.email}
                    onChange={(e) => update({ email: e.target.value })}
                    className={baseInput}
                    placeholder="you@email.com"
                  />
                </Field>
              </div>

              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.18em] text-charcoal/70">
                  Preferred contact method
                </span>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {CONTACT_METHODS.map((m) => {
                    const active = data.contactMethod === m;
                    return (
                      <label
                        key={m}
                        className={`cursor-pointer rounded-lg border px-4 py-3 text-center text-sm font-medium transition-all ${
                          active
                            ? "border-amber bg-amber/10 text-amber-dark"
                            : "border-charcoal/15 text-charcoal/75 hover:border-charcoal/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={m}
                          checked={active}
                          onChange={() => update({ contactMethod: m })}
                          className="sr-only"
                        />
                        {m}
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
          {desktopNotice && (
            <p className="rounded-lg border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber-dark">
              {desktopNotice}
            </p>
          )}

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
                  onClick={sendByEmail}
                  className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm font-medium text-charcoal/70 transition-colors hover:bg-cream-100"
                >
                  Email instead
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={isSending}
                  className="btn-amber disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Preparing…" : "Send via SMS"}
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
              <h3 id="sms-modal-title" className="font-display text-2xl text-charcoal">Open your SMS app</h3>
              <p className="mt-3 text-sm leading-6 text-charcoal/70">
                Your SMS app will open with your request pre-filled. Review the message and tap Send to complete your request.
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
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={openSmsApp}
                  className="btn-amber"
                >
                  Open SMS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
