# Irish Moss Education Page — Implementation Review

The page rebuilds the Irish Moss product-education route (`/irish-moss`) as a
single-file TanStack Start route (`src/routes/irish-moss.tsx`). It delivers a
gradient hero, a split "What is" section, three feature cards, a mineral chips
row, a tabbed supplement section with Radix Accordion on mobile, an 11-card
benefit grid with inline Read More toggles, a "Using as Supplement" split, a
Bladderwrack band, a "Buy Original" callout, and a disclaimer box — all wrapped
in a semantic `<article>`. The CSS design tokens are defined in `styles.css`
using oklch() rather than the spec's hex values.

Watch for: (1) **JSON-LD structured data is completely absent** — the `head()`
block has only `meta` tags, no `scripts` key with Article + BreadcrumbList
schema. (2) **CSS variables use oklch() rather than the spec hex values**, which
is a design-fidelity gap: the rendered colors will differ from the approved
palette. (3) **The `<h2>` for section 2 reads "Irish Sea Moss" instead of
"What is Irish Sea Moss"**, dropping the label the spec requires. (4) The
DisclaimerBox is missing the full verbatim shellfish warning sentence and
completely omits the marketing disclaimer paragraph.

**Verdict**: NEEDS_CHANGES

---

## High-level view

The routing scaffold (`createFileRoute`, `head()`, `<article>` wrapper, no
Header/Footer) is correctly wired and TypeScript-clean. All ten layout sections
exist in the specified order. Radix Accordion is imported and used for the
mobile supplement view; the desktop tab switching uses a plain `useState` rather
than Radix Tabs, which is acceptable but diverges slightly from the plan.

The CSS variables exist in `styles.css` but are defined in `oklch()` notation
rather than the hex values (`#2F4A2B`, `#7AB82A`, `#F58220`, `#FAFAF5`,
`#1F2937`) specified in the design brief. Because oklch conversions are
approximate, the rendered green, leaf, orange, background, and charcoal will
differ visibly from the approved palette.

The `head()` export is present but incomplete: the plan required a `scripts`
block with JSON-LD for `Article` and `BreadcrumbList`. That block is entirely
absent. SEO structured data was an explicit acceptance criterion.

Section 2's `<h2>` is "Irish Sea Moss" rather than "What is Irish Sea Moss",
which is how both the spec and the plan label the section. All four bullet facts
beneath it are verbatim-correct.

The 11 benefit cards are present and in order. `readMore: true` is set on cards
1, 3, 4, and 8 — matching the spec. Several benefit bodies append stock wellness
sentences that are not in the original spec copy (cards 6, 7, 8, 9, 10, 11).
The spec is explicit: "Do not rewrite, remove, or invent text." These additions
violate that constraint.

The disclaimer box is structurally weak: it renders as a plain `<section>` + div
rather than an `<aside role="note" aria-label="Shellfish allergy warning">` as
specified, and the shellfish warning text is truncated — it reads "MAY CONTAIN
TRACE AMOUNTS OF SHELLFISH. THIS PRODUCT IS NOT RECOMMENDED FOR INDIVIDUALS WHO
ARE HIGHLY SENSITIVE/ALLERGIC TO SHELLFISH." The spec requires the full
all-caps sentence verbatim, and the second marketing disclaimer paragraph ("This
product is not intended to diagnose, treat, cure or prevent any disease…") is
entirely missing.

---

<details>
<summary>Issues (6)</summary>

1. **Missing JSON-LD structured data** — `head()` contains only `meta` tags; the `scripts` block with `Article` + `BreadcrumbList` schema is absent entirely. Add the `scripts` key with the JSON-LD object as specified in the plan's Step 2 route export.

2. **CSS variables use oklch() instead of spec hex values** — `--im-green`, `--im-leaf`, `--im-orange`, `--im-bg`, and `--im-charcoal` are defined in `oklch()` notation. The spec mandates `#2F4A2B`, `#7AB82A`, `#F58220`, `#FAFAF5`, `#1F2937`. Replace with exact hex values (or verified oklch equivalents computed to match those hexes exactly).

3. **Section 2 heading wrong** — `<h2>` reads "Irish Sea Moss" rather than the spec-required "What is Irish Sea Moss". Change it to match the section label in both the spec and the plan.

4. **DisclaimerBox missing marketing disclaimer paragraph** — the second `<p>` ("This product is not intended to diagnose, treat, cure or prevent any disease…") is entirely absent. Add it as specified in plan Step 12.

5. **DisclaimerBox missing `<aside>` landmark** — the disclaimer is wrapped in `<section>` + `<div>` rather than `<aside role="note" aria-label="Shellfish allergy warning">`. This breaks the accessibility landmark spec. Replace the outer `<section>` with `<aside role="note" aria-label="Shellfish allergy warning">`.

6. **Benefit body text has appended sentences not in spec** — cards 6, 7, 8, 9, 10, and 11 append extra wellness sentences that do not appear in the original spec copy. The spec requires copy kept exactly as written; additions beyond what is in the source are out of scope. Trim each card body to match the spec verbatim.

</details>

---

<details>
<summary>Details</summary>

### Missing JSON-LD structured data (confirmed)

The `head()` function inside `createFileRoute` returns only a `meta` array:

```ts
head: () => ({
  meta: [
    { title: "Irish Moss…" },
    { name: "description", content: "…" },
    { property: "og:type", content: "article" },
  ],
}),
```

There is no `scripts` key. The plan (Step 2) specifies a `scripts` block
containing a JSON-LD `application/ld+json` object with an `@graph` that includes
an `Article` node and a `BreadcrumbList` node. Lighthouse SEO and structured-data
validators will flag this. This was an explicit acceptance criterion
("JSON-LD (Article + BreadcrumbList)").

---

### CSS token values diverge from approved palette (confirmed)

`styles.css` lines 69–73 define the five Irish Moss tokens as:

```css
--im-green:   oklch(0.32 0.10 150);
--im-leaf:    oklch(0.65 0.18 140);
--im-orange:  oklch(0.70 0.17 42);
--im-bg:      oklch(0.99 0.005 95);
--im-charcoal: oklch(0.20 0.02 250);
```

The design brief specifies exact hex values: `#2F4A2B`, `#7AB82A`, `#F58220`,
`#FAFAF5`, `#1F2937`. An oklch(0.70 0.17 42) converts to approximately
`#D6782A`, not `#F58220` — that's a meaningfully different orange, about 15%
darker. The green and leaf discrepancy is similarly visible. The contrast ratio
for `--im-orange` on white was computed in the plan against the hex value; the
actual oklch rendition needs to be re-verified against WCAG AA.

---

### Section 2 heading label (confirmed)

The comment `{/* ── 2. WHAT IS IRISH SEA MOSS ──… */}` is correct, but the
rendered `<h2>` inside reads only "Irish Sea Moss". The spec introduces this
section with the heading "What is Irish Sea Moss" and the plan (Step 4) specifies
`<h2>` "What is Irish Sea Moss". A reader navigating by heading structure will
lose the discoverability of that section.

---

### DisclaimerBox structural and copy gaps (confirmed)

The outer element is `<section className="py-12">` rather than
`<aside role="note" aria-label="Shellfish allergy warning">`. Screen reader
users navigating by landmark will not find a warning note landmark.

The shellfish warning text is present but the second block — the standard
marketing disclaimer the spec requires ("This product is not intended to
diagnose, treat, cure or prevent any disease…") — is entirely absent. The plan
(Step 12) is explicit: "Second disclaimer block: the standard marketing
disclaimer from spec."

---

### Benefit body text additions beyond spec (confirmed)

The spec says "Do not rewrite, remove, or invent text." Six benefit cards append
sentences not present in the original copy:

- **Card 6 (Weight Management):** adds "Sea Moss provides a nutrient-rich
  supplement that supports satiety and healthy weight management when paired with
  a balanced diet." — not in spec.
- **Card 7 (Healthy Diet):** adds "This nutrient-rich moss supports overall
  physical and mental health when included as part of a healthy diet." — not in spec.
- **Card 8 (Mental Health):** body is largely rewritten; the spec has a different
  paragraph about potassium and its role in mental and behavioral health. The
  implementation replaces it with "Regular intake has been associated with
  improved mood…" which is not spec copy.
- **Card 9 (Natural Decongestant):** second sentence ("Potassium chloride helps
  break down mucus…") is not in the spec.
- **Card 10 (Digestive):** adds "It helps both stimulate and soothe the digestive
  system, supporting overall gut health when used as part of a balanced diet." —
  not in spec.
- **Card 11 (Sexual Health):** body is partially rewritten; the spec copy
  contains "Sea Moss red algae provides… zinc, folate, and other minerals
  beneficial in both male and female reproductive health." The implementation
  changes the specifics.



</details>

---

<details>
<summary>File map</summary>

| File | What changed |
|------|-------------|
| `src/routes/irish-moss.tsx` | Full page route: hero, 9 content sections, 11 benefit cards, supplement tabs/accordion, disclaimer |
| `src/styles.css` | Added 5 `--im-*` CSS custom properties to `:root` |

Full diff: `git diff main -- src/routes/irish-moss.tsx src/styles.css`

</details>
