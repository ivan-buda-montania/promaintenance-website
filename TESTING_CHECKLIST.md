# EN | ES Translation Testing Checklist

## 🧪 Manual Testing Steps

Run `npm run dev` and test the following paths:

### 1. Language Toggle Visibility & Function
- [ ] Desktop: EN | ES toggle visible in navbar (top right, before Free Estimate)
- [ ] Mobile: EN | ES toggle visible in hamburger menu
- [ ] Click toggle: page switches language instantly (no reload)
- [ ] Active language is darker/more prominent; inactive is dimmed
- [ ] After toggle, all translated text updates immediately

### 2. Hero Section (English → Spanish)
**English should show:**
- Tagline: "Maintenance & Remodeling Services — done with thirty years..."
- Buttons: "Start Your Project" and "View Our Work"
- Bottom: "Scroll"

**Spanish should show:**
- Tagline: "Servicios de mantenimiento y remodelación..."
- Buttons: "Comienza tu proyecto" and "Ver nuestro trabajo"
- Bottom: "Desplázate"

- [ ] EN text displays correctly
- [ ] ES text displays correctly
- [ ] Font sizing unaffected by longer Spanish text
- [ ] Buttons remain clickable and navigate correctly

### 3. Navbar Navigation Links
**English:** Services, Gallery, About, Planner, Moodboard, Estimate, Free Estimate
**Spanish:** Servicios, Galería, Sobre nosotros, Planificador, Moodboard, Presupuesto, Presupuesto gratis

- [ ] All nav links update on toggle
- [ ] Links still navigate to correct sections (#services, #gallery, etc.)
- [ ] Mobile menu shows translated links
- [ ] Mobile menu shows language toggle option

### 4. Services Section
**English:** "What we do — and how we do it."
**Spanish:** "Lo que hacemos — y cómo lo hacemos."

Service cards (en.json keys like `services.drywall`):
- [ ] Drywall / Drywall
- [ ] Painting / Pintura
- [ ] Kitchens / Cocinas
- [ ] Flooring / Pisos
- [ ] Windows / Ventanas
- [ ] Carpentry / Carpintería
- [ ] General Repairs / Reparaciones generales

- [ ] All service names + descriptions translate
- [ ] Card hover effects still work
- [ ] No layout shifts

### 5. Form (Estimate)
**Step 1 — Your Project:**
- [ ] EN: "Service type" label shows
- [ ] ES: "Tipo de servicio" shows
- [ ] EN: "Room size" hint displays
- [ ] ES: "Tamaño de la sala" hint displays
- [ ] Budget label and range slider work in both languages

**Step 2 — Your Vision:**
- [ ] EN: "Desired style" label
- [ ] ES: "Estilo deseado"
- [ ] Style cards (Modern, Rustic, Minimalist, Traditional)
- [ ] Photo links input + Add button work

**Step 3 — Your Info:**
- [ ] Name, Phone, Email fields translate
- [ ] Contact method options: WhatsApp, Call, Instagram DM (EN) / Llamada, Instagram DM (ES)

**Validation (submit with empty fields):**
- [ ] EN: "Pick a service." / "Tell us the size..." / etc.
- [ ] ES: "Elige un servicio." / "Cuéntanos el tamaño..." / etc.

**Success Card (after valid submit):**
- [ ] EN: "We've got it, [Name]." / "We'll review your project..."
- [ ] ES: "Lo tenemos, [Name]." / "Revisaremos tu proyecto..."
- [ ] "Start another" button / "Empezar otro" button

### 6. Form Submission to WhatsApp
- [ ] Fill form with sample data
- [ ] Switch to Spanish
- [ ] Submit → WhatsApp link opens with formatted message
- [ ] Message shows Spanish-translated field labels + content

### 7. Page Refresh & Persistence
- [ ] Switch to Spanish
- [ ] Scroll to Services section
- [ ] Refresh page (F5)
- [ ] Page loads in Spanish (language persisted)
- [ ] Scroll position mostly preserved

### 8. Browser Navigation
- [ ] EN → Services (nav link) → page scrolls, stay in EN
- [ ] Switch to ES → Gallery → page scrolls, stay in ES
- [ ] Back button → previous section, language stays
- [ ] Language toggle works after navigation

### 9. Responsive Breakpoints
- [ ] Desktop (1440px): toggle visible, layout clean
- [ ] Tablet (768px): toggle responsive, no text wrapping
- [ ] Mobile (375px): hamburger menu shows language option, toggle accessible

### 10. Console & Build
- [ ] Run `npm run build` → succeeds with no errors
- [ ] Dev server `npm run dev` → no console errors related to i18n
- [ ] Network tab: i18n files load (bundled, not lazy)

---

## 🎯 Known Incomplete Areas

The following components are partially translated. They function in EN, but lack full ES:

| Component | Status | To Complete |
|-----------|--------|-------------|
| Gallery filters | EN only | Add room type labels (Kitchen, Bathroom, Flooring) |
| About section | EN only | Translate three pillars + testimonial quote |
| Contact footer | EN mostly | Add hours, full descriptive text |
| Moodboard | EN only | Category titles, empty state text |

**These do NOT block the site from working** — they degrade gracefully to English if not translated.

---

## 📊 Translation Coverage

| Section | Status | % Complete |
|---------|--------|-----------|
| Nav | ✅ | 100% |
| Hero | ✅ | 100% |
| Services | ✅ | 100% |
| Form | ✅ | 90% (labels done, some hints pending) |
| Gallery | 🟡 | 60% |
| About | 🟡 | 20% |
| Contact | 🟡 | 40% |
| Moodboard | 🟡 | 20% |

---

## ✅ Pass/Fail Criteria

**PASS:** 
- Language toggle visible and functional
- Hero, Navbar, Services, Form all translate EN ↔ ES
- Form validation messages in correct language
- Success card uses correct language
- No console errors
- Build succeeds

**FAIL:**
- Toggle doesn't switch language
- Text remains in English after toggle
- Console errors related to i18n
- Form doesn't submit to WhatsApp
- Page reloads on language switch

---

## 🐛 Troubleshooting

**Toggle not appearing?**
- Check Navbar.jsx imports LanguageToggle
- Ensure LanguageToggle.jsx exists in src/components/

**Text not translating?**
- Verify useTranslation() imported and called in component
- Check JSON key path matches (e.g., "hero.tagline")
- Check en.json and es.json files in src/i18n/

**localStorage not persisting?**
- Open DevTools → Application → Storage → localStorage
- Look for key `i18nextLng` set to `"en"` or `"es"`
- If missing, toggle language once to create it

**WhatsApp message in wrong language?**
- Form should capture current language from `i18n.language`
- If not, check MultiStepForm.jsx has `const { t } = useTranslation()`

---

## 📸 Screenshots for Validation

After testing, capture:
1. Hero section in EN (with toggle visible)
2. Hero section after toggle to ES
3. Form Step 1 in EN
4. Form Step 1 in ES (showing validation error)
5. Success card in EN
6. Success card in ES

---

## 🚀 Sign-Off

Once all tests PASS:
- [ ] Developer: All paths tested, no blockers
- [ ] QA: Content accurate, layout responsive
- [ ] Stakeholder: Site ready for bilingual launch

