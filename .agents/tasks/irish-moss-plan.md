# Implementation Plan — Irish Moss Page Redesign

**File to deliver:** `src/routes/irish-moss.tsx` (single file, all components inline)
**Verified codebase location:** `/Users/suddhajitchowdhury/Documents/Ray Full System/Ray-Retailer`

---

## Codebase context (discovered by reading source)

- **Router:** TanStack Start (`@tanstack/react-router` 1.170.41). Route pattern is
  `createFileRoute("/irish-moss")({ head: () => ({…}), component: IrishMossPage })`.
  The `head()` inside `createFileRoute` is the correct SEO hook — confirmed from
  `src/routes/index.tsx`, `src/routes/essential-oil.tsx`, etc.
- **Global shell:** `__root.tsx` renders `<Header />` and `<Footer />` around every
  `<Outlet />`. The page file **must not** include either.
- **Tailwind v4:** `@import "tailwindcss" source(none)` — no `tailwind.config.js`.
  Arbitrary `[color:#hex]` classes work. Custom CSS variables must be added to the
  `:root` block in `src/styles.css`.
- **Radix Accordion** pattern: `import * as Accordion from "@radix-ui/react-accordion"`.
  Confirmed usage in `src/components/blog/DisclaimerAccordion.tsx` — use identical
  import style.
- **Radix Tabs** available: `@radix-ui/react-tabs` is a project dependency; import as
  `import * as TabsPrimitive from "@radix-ui/react-tabs"` or use the shadcn wrapper
  in `src/components/ui/tabs.tsx`.
- **Icons:** `lucide-react` ^0.575.0. Use Lucide icon components directly.
- **Link:** `import { Link } from "@tanstack/react-router"` — confirmed in `__root.tsx`
  and `essential-oil.tsx`.
- **`cn` helper:** `import { cn } from "@/lib/utils"` — available but optional; inline
  styles are also fully acceptable (essential-oil.tsx uses inline styles heavily).
- **Build/verify commands:**
  - Dev server: `npm run dev`
  - Build: `npm run build`
  - Lint: `npm run lint`
  - No test runner is configured in `package.json`.
- **Images available** in `public/Irish Moss/`:
  - `moss1-CgRRFIIl.png` through `moss13-DzHYU9lT.png` — product/plant shots
  - `ben1-D94ZUxyJ.jpeg`, `ben3-DQ5Vbpgp.jpeg`, `ben6-wHyz8yDK.jpeg`,
    `ben8-D7GJl5ry.jpeg`, `ben9-C5-B_BgL.jpeg` — benefit images (stock; replace with
    Lucide icons per spec)
- **URL path** for images: `/Irish Moss/moss1-CgRRFIIl.png` (serves from `/public`).

---

## Step 1 — Add Irish Moss CSS variables to `src/styles.css`

**What to do:** Add five page-scoped custom properties to the existing `:root {}` block
in `src/styles.css`. These replace hardcoded hex values throughout the component.
Do not touch any existing variable — append after the last `--sidebar-ring` line.

**Variables to add:**
```css
/* Irish Moss page tokens */
--im-green:   #2F4A2B;   /* deep forest green — hero, section headers */
--im-leaf:    #7AB82A;   /* fresh leaf green — accents, chips */
--im-orange:  #F58220;   /* warm orange — CTAs, pull-quotes, badges */
--im-bg:      #FAFAF5;   /* off-white — page background */
--im-charcoal:#1F2937;   /* body text */
```

**Files:** `src/styles.css`

**Verify:** `npm run build` — zero errors. Open dev server and confirm `:root` has the
five new vars via browser DevTools.

---

## Step 2 — Write `src/routes/irish-moss.tsx` — scaffolding, SEO, and data

**What to do:** Replace the current placeholder with the new file structure:

1. **Import block** (exact list):
   ```tsx
   import { useState } from "react";
   import { createFileRoute, Link } from "@tanstack/react-router";
   import * as Accordion from "@radix-ui/react-accordion";
   import * as TabsPrimitive from "@radix-ui/react-tabs";
   import {
     Thermometer, Dumbbell, Stomach, Brain, Heart, Shield,
     FlaskConical, Smile, Baby, Zap, User,
     ChevronDown, ChevronRight,
   } from "lucide-react";
   ```
   > **Icon mapping for 11 benefit cards** (use these exactly):
   > 1. Thyroid Function — `Thermometer`
   > 2. Manages Joint Pain — `Dumbbell`
   > 3. Healthy Gut — `Stomach` (falls back to `Activity` if tree-shaking fails; prefer `Leaf`)
   > 4. Healthy Brain — `Brain`
   > 5. Healthy Heart — `Heart`
   > 6. Thyroid Health — `Shield`
   > 7. Natural Cleanser — `FlaskConical`
   > 8. Emotional Wellbeing — `Smile`
   > 9. Fertility — `Baby`
   > 10. Energy & Stamina — `Zap`
   > 11. Skin / Body — `User`
   >
   > **Note:** `Stomach` may not exist in lucide-react 0.575. Use `Leaf` as fallback
   > for benefit 3, and `Activity` as fallback for benefit 10 if `Zap` is unavailable.
   > Confirm icon names exist before using by checking `node_modules/lucide-react/dist`
   > or the lucide.dev icon list.

2. **Route export:**
   ```tsx
   export const Route = createFileRoute("/irish-moss")({
     head: () => ({
       meta: [
         { title: "Irish Moss (Chondrus Crispus) — Benefits, Uses & Science | Ray's Healthy Living" },
         {
           name: "description",
           content:
             "Discover the health benefits of Irish Sea Moss: 92 minerals, thyroid support, gut health, immune boost, and more. Shop only naturally grown sea moss at Ray's Healthy Living.",
         },
         { property: "og:title", content: "Irish Moss — Premium Sea Moss Supplement | Ray's Healthy Living" },
         { property: "og:type", content: "article" },
       ],
       scripts: [
         {
           type: "application/ld+json",
           children: JSON.stringify({
             "@context": "https://schema.org",
             "@graph": [
               {
                 "@type": "Article",
                 "headline": "Irish Moss (Chondrus Crispus) — Benefits, Uses & Science",
                 "author": { "@type": "Organization", "name": "Ray's Healthy Living" },
                 "publisher": { "@type": "Organization", "name": "Ray's Healthy Living", "url": "https://rayshealthyliving.com" },
               },
               {
                 "@type": "BreadcrumbList",
                 "itemListElement": [
                   { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rayshealthyliving.com/" },
                   { "@type": "ListItem", "position": 2, "name": "Irish Moss", "item": "https://rayshealthyliving.com/irish-moss" },
                 ],
               },
             ],
           }),
         },
       ],
     }),
     component: IrishMossPage,
   });
   ```

3. **Typed data constants** — define these above the component as `const` arrays/objects
   so the component body receives data via props/closure, not inline literals:
   - `MINERAL_CHIPS: string[]` — the 12 minerals/vitamins listed in the spec
   - `BENEFITS: { id: number; icon: LucideIcon; title: string; body: string }[]` — 11 items
   - `SUPPLEMENT_TABS: { id: string; label: string; content: string }[]` — 3 tabs

4. **Page wrapper:** top-level element is `<article>` with
   `style={{ backgroundColor: "var(--im-bg)", color: "var(--im-charcoal)" }}`.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` — zero TypeScript and build errors.

---

## Step 3 — Hero section

**What to do:** Implement the `Hero` inline component inside the file.

**Visual spec:**
- Full-width `<section>` with `role="banner"` and `aria-label="Irish Moss hero"`.
- Background: `linear-gradient(135deg, var(--im-green) 0%, #b06020 100%)` (forest
  green → warm amber).
- Two-column grid on md+: left = text, right = image.
- **Left column:**
  - `<h1>` "Irish Moss" — white, `font-size: clamp(2.25rem, 5vw, 3.5rem)`,
    font-family `Georgia, serif`.
  - Orange badge/pill: `<span>Chondrus Crispus</span>` — background `var(--im-orange)`,
    white text, `border-radius: 999px`, `padding: 0.25rem 0.9rem`, `font-size: 0.8rem`.
  - Intro sentence: `"Irish Moss is known to improve Thyroid functions, aid metabolism
    and boost the overall immune system."` — white, `font-size: 1.125rem`,
    `line-height: 1.7`, `max-width: 52ch`.
  - CTA button — orange background `var(--im-orange)`, white text, hover darkens 10%,
    rendered as `<Link to="/shop">Shop Irish Moss</Link>` using TanStack Link.
    Add `aria-label="Shop Irish Moss products"`.
- **Right column:**
  - `<img src="/Irish Moss/moss1-CgRRFIIl.png" alt="Fresh Irish Moss seaweed on rocks"
    loading="eager" …/>` inside a blob-mask `<div>`.
  - Blob mask: SVG clip-path on the wrapper div:
    ```css
    clip-path: url(#blob-mask);
    ```
    Define an inline `<svg width="0" height="0">` above the image with:
    ```svg
    <clipPath id="blob-mask" clipPathUnits="objectBoundingBox">
      <path d="M0.5,0 C0.8,0 1,0.2 1,0.5 C1,0.85 0.75,1 0.5,1 C0.2,1 0,0.8 0,0.5 C0,0.2 0.2,0 0.5,0 Z"/>
    </clipPath>
    ```
  - Image: `width: 100%; max-width: 420px; aspect-ratio: 1/1; object-fit: cover`.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors; dev server renders the gradient hero with
image blob and orange CTA.

---

## Step 4 — "What is Irish Sea Moss" split section

**What to do:** Implement the `WhatIsSection` inline component.

**Visual spec:**
- Two-column grid on md+: left = image (using `moss2-fWAVVoKx.png`), right = text.
- `<h2>` "What is Irish Sea Moss" — `color: var(--im-green)`.
- Pull-quote paragraph in orange: `"Is a dried leaf-like form of a northern seaweed,
  that is, Chondrus Crispus also known as Pearl Moss and Carrageen."` — use
  `color: var(--im-orange); font-weight: 600; font-size: 1.1rem; line-height: 1.6`.
  Wrap in `<p role="doc-epigraph">`.
- Four bullet facts as `<ul>` with custom leaf icon (`•` replaced by a small green
  circle via `::before` or inline SVG). Exact text from spec:
  1. "Grows naturally in abundance in Rocky places along the Atlantic coasts…"
  2. "As a fresh plant it is soft and cartilaginous…"
  3. "When washed and dried, it takes on a translucent and horn-like form…"
  4. "Irish Moss is a mucilaginous body by 55% parts, 10% albuminoids…"
- Image: `<img src="/Irish Moss/moss3-CRXVs5Uj.png" alt="Irish Sea Moss (Chondrus
  Crispus) growing on Atlantic coast rocks" loading="lazy" …/>` with soft rounded
  corners (`border-radius: 1.25rem`).

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors.

---

## Step 5 — Three Feature Cards section

**What to do:** Implement the `FeatureCards` inline component showing "Can Sea Moss be
Eaten Raw?", "Food Additive", and "Health Food" as a 3-column card grid (1 col mobile,
3 col md+).

**Visual spec:**
- Each card: `background: white`, `border-radius: 1rem`, `box-shadow: 0 2px 12px rgba(0,0,0,0.07)`,
  `padding: 1.75rem`.
- Card header: small eyebrow badge in orange (`var(--im-orange)`) + `<h2>` in
  `var(--im-green)`.
- Lead sentence rendered in `font-weight: 600; color: var(--im-orange)` as an
  inline `<span>` at the top of the card body.
- Remaining paragraph body text in `var(--im-charcoal)`, `font-size: 1rem`,
  `line-height: 1.7`.
- Section `background-color: var(--im-bg)`.

**Copy source:**
- Card 1 — Title: "Can Sea Moss be Eaten Raw?" Lead: "Sea Moss is good to be consumed
  as health drink. It can also be used for gravies, cakes and ice-creams…" Body: the
  three paragraphs ("As a natural and wholesome item…", "At Ray's we sell only
  naturally grown…", "We source all Sea Moss exclusively…").
- Card 2 — Title: "Food Additive". Body: both paragraphs from section 4 of spec.
- Card 3 — Title: "Health Food". Body: both paragraphs from section 5 of spec.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors.

---

## Step 6 — Minerals & Vitamins section

**What to do:** Implement the `MineralsSection` inline component.

**Visual spec:**
- Two-column layout on md+ (text left, chips right on desktop; stacked on mobile).
- `<h2>` "Minerals & Vitamins" — `var(--im-green)`.
- Left: paragraph text from the spec ("Tasteless when eaten raw, Irish Moss is loaded
  with natural minerals essential for a healthy human body…").
- Right: a flex-wrap chip row. Render each mineral from `MINERAL_CHIPS` array as a
  `<span>` pill:
  ```
  background: white;
  border: 1.5px solid var(--im-leaf);
  color: var(--im-green);
  border-radius: 999px;
  padding: 0.3rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  ```
- `MINERAL_CHIPS` data (exact 12 values):
  `["Iodine","Calcium","Magnesium","Iron","Phosphorous","Potassium","Manganese","Zinc","Selenium","Beta-Carotene","Vitamin B","Vitamin C"]`

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors; 12 green-bordered chips render.

---

## Step 7 — Supplement Tabs section (desktop tabs + mobile accordion)

**What to do:** Implement the `SupplementTabs` inline component.

**Architecture decision:** Use Radix Tabs (`TabsPrimitive`) for desktop (visible ≥768px)
and Radix Accordion for mobile (<768px). Both are already installed. State is managed
by the Radix primitives themselves — no extra `useState` needed for tab switching.
Use a CSS media-query wrapper (`hidden-tablet` / `hidden-mobile` utilities from
`styles.css`) to show/hide the correct component, not JS-based responsive logic.

**Three tabs/accordions:**
1. **"Healthy Natural Supplement"** — body text from spec section 6a.
2. **"Fights Infections"** — body text from spec section 6b.
3. **"Natural Supplement"** — body text from spec section 6c.

**Duplicate content note:** Per the spec, sections 6a and 6c contain near-identical
paragraphs. Render the duplicate paragraph **once** inside tab 3 and add:
```tsx
{/* TODO: Section 6c ("Natural Supplement") shares a paragraph with 6a.
    Confirm with content owner whether this is intentional before CMS migration. */}
```

**Desktop Tabs (Radix TabsPrimitive):**
- `TabsPrimitive.Root` with `defaultValue="healthy"`.
- Tab list row: three trigger buttons with bottom-border active state
  (`border-bottom: 3px solid var(--im-orange)` when active).
- Tab content panel: white card, `border-radius: 1rem`, `padding: 1.5rem 2rem`.

**Mobile Accordion (Radix Accordion):**
- `Accordion.Root type="multiple"` so all can be open independently.
- Same copy/content as tabs.
- `ChevronDown` icon rotates 180° when open via `data-[state=open]` CSS.
- Follow the exact pattern from `src/components/blog/DisclaimerAccordion.tsx`.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors; dev server shows tabs on ≥768px and accordion
on mobile.

---

## Step 8 — Top Benefits grid (11 cards)

**What to do:** Implement the `BenefitGrid` inline component with 11 benefit cards.

**Card anatomy:**
- Outer div: `border-radius: 1rem; background: white; box-shadow: var(--shadow-card);
  padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem`.
- Number badge: circle with `background: var(--im-green); color: white; width: 2rem;
  height: 2rem; border-radius: 50%; font-weight: 700; display: flex; align-items:
  center; justify-content: center; font-size: 0.85rem`.
- Lucide icon: `width: 1.5rem; height: 1.5rem; color: var(--im-leaf)`.
- `<h3>` title: `color: var(--im-green); font-weight: 700`.
- Body: `font-size: 0.95rem; line-height: 1.65; color: var(--im-charcoal)`.
- **"Read More" toggle** for long cards (body length > 220 chars): use `useState`
  per card. Show first 220 chars + `…` when collapsed; full text when expanded.
  Button: `color: var(--im-orange); font-weight: 600; font-size: 0.875rem;
  background: none; border: none; cursor: pointer; padding: 0`.
  Set `aria-expanded` on the button.

**Grid:** `display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 1.25rem`. This gives 3 cols on desktop, 1-2 on mobile automatically.

**Benefit data** (exact copy from the original spec user message):

| # | Icon | Title | Body (truncate point ~220 chars) |
|---|------|-------|----------------------------------|
| 1 | `Thermometer` | Improves Thyroid Function | "Irish Moss is an important supplement for thyroid health…" (full text from spec benefit 1) |
| 2 | `Dumbbell` | Manages Joint Pain and Arthritis | "Sea moss contains anti-inflammatory… omega-3 fatty acids…" (spec benefit 2) |
| 3 | `Leaf` | Healthy Gut and Digestive System | "Sea moss is an ideal support for digestive system… indigestion, heartburn…" (spec benefit 3) |
| 4 | `Brain` | Healthy Brain | "Sea moss contains Potassium…" (spec benefit 4) |
| 5 | `Heart` | Healthy Heart | "The fatty acids found in Irish Moss…" (spec benefit 5) |
| 6 | `Shield` | Thyroid Health | "Sea Moss helps the thyroid function better… iodine and selenium…" (spec benefit 6) |
| 7 | `FlaskConical` | Natural Cleanser | "The mucilaginous properties act as a natural cleanser…" (spec benefit 7) |
| 8 | `Smile` | Emotional Wellbeing | "Sea moss contains Potassium… anxiety and depression…" (spec benefit 8) |
| 9 | `Baby` | Fertility | "Irish Moss contains Zinc and Selenium… male fertility…" (spec benefit 9) |
| 10 | `Zap` | Energy and Stamina | "Iodine in sea moss is great for thyroid health… energy production…" (spec benefit 10) |
| 11 | `User` | Skin | "Irish Moss has skin soothing properties… eczema…" (spec benefit 11) |

> **Icon fallbacks:** `Stomach` does not exist in lucide-react 0.575 — use `Leaf` for
> benefit 3. If `Baby` is absent use `Star`. Verify all imports compile before shipping.
> Replace stock benefit images (ben*.jpeg) with these Lucide icons — do not render
> any of the `ben*.jpeg` files.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors; 11 cards render; "Read More" toggles work.

---

## Step 9 — "Using Irish Moss as Supplement" split section

**What to do:** Implement the `UsingSection` inline component.

**Visual spec:**
- Two-column on md+ (image left, text right). Use `moss8-D1_2Z5z3.png`.
- `<h2>` "Using Irish Moss as Supplement" — `var(--im-green)`.
- Body text from spec section 8.
- Chips row for forms:
  ```
  ["Capsules", "Tincture", "Powder"]
  ```
  Chips styled like MineralsSection but with orange background:
  `background: var(--im-orange); color: white; border: none; border-radius: 999px;
  padding: 0.35rem 1rem; font-size: 0.85rem; font-weight: 600`.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors.

---

## Step 10 — Bladderwrack feature band

**What to do:** Implement the `BladderwrackBand` inline component.

**Visual spec:**
- Full-width `<section>` with background `var(--im-green)`.
- `<h2>` "Irish Sea Moss & Bladderwrack Give Best Effects" — white.
- Body text from spec section 9 — white, `opacity: 0.9`.
- Two product images side by side: `moss9-cFnZUDdH.png` and `moss10-Ca0dvpdU.png`,
  each in a rounded card (`border-radius: 1rem; overflow: hidden`).
- Layout: text left, two images right in a 2×1 mini-grid on desktop.
- Light orange CTA button: `background: var(--im-orange)`.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors.

---

## Step 11 — "Buy Only Original" callout

**What to do:** Implement the `BuyOriginalCallout` inline component.

**Visual spec:**
- `background: linear-gradient(135deg, #f0f7e8, #fff8f0)` — subtle green-to-amber wash.
- Border: `1.5px solid var(--im-leaf)`, `border-radius: 1.25rem`.
- Image: `moss12-DsK8Y4fq.png` — floated right on desktop.
- `<h2>` "Buy only Original Irish Sea Moss" — `var(--im-green)`.
- Body text from spec section 10.
- CTA button: orange, `<Link to="/shop">Buy Now</Link>`.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors.

---

## Step 12 — Disclaimer box

**What to do:** Implement the `DisclaimerBox` inline component.

**Visual spec:**
- `<aside role="note" aria-label="Shellfish allergy warning">`.
- Full-width box: `border: 2px solid var(--im-orange); border-radius: 0.75rem;
  background: #fff8f0; padding: 1.5rem`.
- Heading: `⚠ SHELLFISH ALLERGY WARNING` in bold uppercase, `color: var(--im-orange)`.
- Body text **verbatim** from spec (the shellfish warning paragraph — keep it exactly
  as written in the source, all-caps where the source has all-caps).
- Second disclaimer block: the standard marketing disclaimer from spec ("This product
  is not intended to diagnose, treat, cure or prevent any disease…") rendered as a
  second `<p>` in smaller gray text.

**Files:** `src/routes/irish-moss.tsx`

**Verify:** `npm run build` zero errors; disclaimer renders above footer.

---

## Step 13 — Final assembly, CSS transitions, and accessibility pass

**What to do:** Wire all inline components into `IrishMossPage`, apply finishing
details, and do a full accessibility check.

**Assembly order in `IrishMossPage`:**
```tsx
function IrishMossPage() {
  return (
    <article style={{ backgroundColor: "var(--im-bg)", color: "var(--im-charcoal)" }}>
      <Hero />
      <WhatIsSection />
      <FeatureCards />
      <MineralsSection />
      <SupplementTabs />
      <BenefitGrid />
      <UsingSection />
      <BladderwrackBand />
      <BuyOriginalCallout />
      <DisclaimerBox />
    </article>
  );
}
```

**CSS transitions (no Framer Motion):**
- Add to relevant elements: `transition: opacity 0.3s ease, transform 0.3s ease`.
- Scroll-reveal: Use a small `useIntersectionObserver` hook (15 lines max) that adds
  `opacity: 1; transform: translateY(0)` class when element enters viewport. Initial
  state: `opacity: 0; transform: translateY(24px)`. Wrap in
  `@media (prefers-reduced-motion: reduce) { transition: none; opacity: 1 !important;
  transform: none !important; }` inside styles.css.

**Accessibility checklist:**
- Every `<img>` has a descriptive `alt` attribute (non-decorative) or `alt=""` with
  `role="presentation"` if purely decorative.
- All interactive elements (`<button>`, `<Link>`) have visible `:focus-visible` outline
  (already defined globally in `styles.css` as `outline: 2px solid var(--color-primary)`).
- Color contrast: `--im-green` (#2F4A2B) on white = 10.4:1 ✓; `--im-orange` (#F58220)
  on white = 3.0:1 — **use only for large text or UI components, not small body text**.
  For small orange text, darken to `#C0621A` which gives 4.6:1 on white.
- `<article>` landmark, `<section>` elements, `<h1>` only once on page.
- Keyboard: Radix Accordion and Tabs handle keyboard nav natively.

**Files:** `src/routes/irish-moss.tsx`, `src/styles.css`

**Verify:**
```bash
npm run build   # must exit 0
npm run lint    # must exit 0
```
Then open `npm run dev`, navigate to `/irish-moss`, and confirm:
- Page renders without runtime errors.
- All 10 sections visible.
- Mobile (<768px): accordion visible, tabs hidden.
- Desktop (≥1024px): tabs visible, accordion hidden.
- "Read More" expand/collapse works on long benefit cards.
- No images return 404 (check Network tab).

---

## Full TypeScript import list (for the implementer)

```tsx
import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  Thermometer,
  Dumbbell,
  Leaf,
  Brain,
  Heart,
  Shield,
  FlaskConical,
  Smile,
  Star,      // fallback for Baby if absent
  Zap,
  User,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
```

> **Lucide icon verification step:** Before writing the component, confirm each icon
> name exists by running:
> ```bash
> node -e "const l = require('lucide-react'); ['Thermometer','Dumbbell','Leaf','Brain','Heart','Shield','FlaskConical','Smile','Zap','User','ChevronDown','AlertTriangle'].forEach(n => console.log(n, !!l[n]))"
> ```
> from the Ray-Retailer directory. Swap any `false` result for the nearest equivalent
> icon listed as fallback in Step 8.

---

## Component tree (for reference)

```
IrishMossPage (default export, wraps in <article>)
├── Hero
│   ├── inline SVG blob clipPath definition
│   ├── <h1>, badge <span>, intro <p>, <Link> CTA
│   └── <img> moss1 with blob mask
├── WhatIsSection
│   ├── <img> moss3 (left col)
│   └── <h2>, pull-quote <p>, <ul> 4 facts
├── FeatureCards
│   └── 3× FeatureCard (local data-driven render)
├── MineralsSection
│   ├── <h2>, body <p>
│   └── chip row (MINERAL_CHIPS.map)
├── SupplementTabs
│   ├── TabsPrimitive.Root (desktop, hidden-mobile)
│   └── Accordion.Root (mobile, hidden-tablet)
├── BenefitGrid
│   └── 11× BenefitCard (useState read-more per card)
├── UsingSection
│   ├── <img> moss8
│   ├── <h2>, body <p>
│   └── 3× form chip
├── BladderwrackBand
│   ├── text col
│   └── 2× <img> (moss9, moss10)
├── BuyOriginalCallout
│   ├── <img> moss12
│   ├── <h2>, body <p>
│   └── <Link> CTA
└── DisclaimerBox
    └── <aside> with warning heading + 2 paragraphs
```

---

## Notes for implementer

1. **One file only.** All components defined as `function Hero()`, `function WhatIsSection()`, etc., inside `src/routes/irish-moss.tsx`. No imports from `@/components/`. No new files.
2. **No Header/Footer.** They come from `__root.tsx`. Adding them again causes double-render.
3. **Inline styles preferred** for the five `--im-*` vars because Tailwind v4 arbitrary CSS variable syntax (`[color:var(--im-green)]`) is verbose. Use `style={{ color: "var(--im-green)" }}` JSX inline styles for branded colors, and Tailwind utility classes for spacing/layout.
4. **Image paths:** All Irish Moss images live at `/Irish Moss/<filename>` (note the space). URL-encode the space in JSX: `src="/Irish%20Moss/moss1-CgRRFIIl.png"` or use a helper constant:
   ```tsx
   const IM = (file: string) => `/Irish%20Moss/${file}`;
   ```
5. **Copy fidelity.** Every text string must match the verbatim copy from the original user request. Do not paraphrase, add, or remove any sentences. The spec is the source of truth for copy.
6. **`hidden-mobile` / `hidden-tablet`** are Tailwind `@utility` classes already defined in `src/styles.css`. Use them to toggle accordion vs tabs.
