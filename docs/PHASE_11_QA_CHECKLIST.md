# Phase 11: QA Acceptance Criteria Checklist

## Overview
Comprehensive quality assurance checklist for Tea & Coffee department implementation. All 12 core phases tested for feature completeness, design consistency, data integrity, and user experience.

**Total QA Items**: 120+ acceptance criteria across all routes and features
**Routes Tested**: 12 primary routes + 30+ sub-routes
**Test Coverage**: Data model, UI components, responsive design, accessibility, performance

---

## 1. Data Model & CSV Seed Validation

### CSV Integrity
- [ ] `src/data/tea-coffee/csv/tea-coffee-seed.csv` contains exactly 17 records
- [ ] 9 coffee products present (Arabica, Robusta, Culi Peaberry - 3 grinds each)
- [ ] 8 tea products present (Chamomile, Peppermint, Hibiscus, Valerian Root, Lemongrass, Ashwagandha, Bamboo Strainer, Elderflower)
- [ ] All records marked with `is_sample: true` flag
- [ ] CSV columns match expected schema: id, name, category, type, price, stock_quantity, grind_level, etc.
- [ ] No duplicate product IDs
- [ ] All prices valid (> 0, formatted correctly)
- [ ] All stock quantities valid (≥ 0)
- [ ] All image URLs valid and accessible
- [ ] Product descriptions non-empty and descriptive (50+ characters)

### Data Loader (`src/data/tea-coffee/loader.ts`)
- [ ] CSV loads without errors on dev build
- [ ] CSV loads without errors on production build
- [ ] 17 products exported correctly
- [ ] Types match TypeScript schema
- [ ] No console errors during data loading
- [ ] Loader runs on every page refresh
- [ ] Data available to all routes immediately

### Type Definitions (`src/data/tea-coffee/types.ts`)
- [ ] `TeaCoffeeProduct` interface exported
- [ ] All 30+ product fields defined correctly
- [ ] Optional fields marked as optional (?)
- [ ] No type errors in TypeScript compilation
- [ ] Coffee-specific fields present (grind_level, roast_level, arabica_ratio)
- [ ] Tea-specific fields present (steep_time, temperature, health_benefits)
- [ ] Shared fields present (price, stock, images, badges)

---

## 2. Design Tokens & Styling

### Color Palette (17 Tokens)
- [ ] `tc-cream` (#F5F1EF) - backgrounds
- [ ] `tc-gold` (#D4AF37) - accents
- [ ] `tc-coffee-brown` (#6F4E37) - primary
- [ ] `tc-coffee-charcoal` (#2B2520) - dark text
- [ ] `tc-coffee-light` (#9D7F5B) - lighter variant
- [ ] Coffee family colors: arabica (#8B4513), robusta (#654321), culi (#7A3F1A)
- [ ] Tea green tones (3 variants)
- [ ] U20X colors: navy (#1E3A5F), blue (#2E5FA3)
- [ ] All colors WCAG AA compliant (4.5:1+ contrast)
- [ ] All colors documented in `src/styles.css`

### Typography (7 Utilities)
- [ ] `text-tc-body` — base body text (16px, line-height 1.6)
- [ ] `text-tc-body-md` — medium body (14px)
- [ ] `text-tc-body-lg` — large body (18px)
- [ ] `text-tc-label` — labels (12px, uppercase)
- [ ] `text-tc-heading-sm` — small heading (20px, font-weight 600)
- [ ] `text-tc-heading-md` — medium heading (24px, font-weight 700)
- [ ] `text-tc-heading-lg` — large heading (32px, font-weight 700)
- [ ] All fonts render correctly across browsers
- [ ] Line-height minimum 1.5 for accessibility
- [ ] Font weights: 400 (regular), 600 (medium), 700 (bold)

### Component Utilities (12+)
- [ ] `coffee-family-arabica` — Arabica badge styling
- [ ] `coffee-family-robusta` — Robusta badge styling
- [ ] `coffee-family-culi` — Culi Peaberry badge styling
- [ ] `grind-badge` — grind level badge styling
- [ ] `bg-tc-section` — section backgrounds
- [ ] `bg-u20x-bridge` — U20X section backgrounds
- [ ] `btn-tc-primary` — primary CTA buttons
- [ ] `btn-tc-secondary` — secondary buttons
- [ ] `touch-target-44` — 44px minimum touch targets
- [ ] `container-tc-full` — full-width containers
- [ ] `grid-tc-2col` — 2-column grid
- [ ] `grid-tc-3col` — 3-column grid
- [ ] All utilities applied consistently across components

### Responsive Design
- [ ] Mobile breakpoints: 360px, 375px, 768px, 1024px+ all tested
- [ ] No horizontal scrolling on any breakpoint
- [ ] Flexbox/grid layouts adapt correctly
- [ ] Containers stack vertically on mobile
- [ ] Images scale proportionally on all sizes
- [ ] Padding/margins scale appropriately (1rem mobile, 2rem tablet+)

---

## 3. Sub-Navbar Mega Menu

### Component Structure (`src/components/Header.tsx`)
- [ ] Mega menu integrated into existing Header
- [ ] "Tea & Coffee" menu item visible in primary nav
- [ ] Desktop (1024px+): 2-column mega menu displayed
- [ ] Mobile (< 768px): hamburger menu with accordion
- [ ] Menu items: Coffee, Tea, Learn, U20X, Articles

### Desktop Display (1024px+)
- [ ] Hover triggers mega menu overlay
- [ ] Column 1: Coffee (with sub-items), Tea (with sub-items)
- [ ] Column 2: Learn, U20X, Articles links
- [ ] All links clickable and navigating correctly
- [ ] Mega menu closes on click outside
- [ ] Mega menu closes on ESC key
- [ ] No overlap with content below

### Mobile Display (< 768px)
- [ ] Hamburger icon visible and clickable
- [ ] Accordion opens/closes smoothly
- [ ] Tea & Coffee section expandable
- [ ] Sub-items appear in accordion
- [ ] Back button/collapse works
- [ ] Menu closes on link click
- [ ] No menu overlap with page content

### Styling & Consistency
- [ ] Uses design tokens for colors
- [ ] Icons present for category items
- [ ] Hover states visible on desktop
- [ ] Active/current page highlighted
- [ ] Font sizes consistent with other nav elements
- [ ] Spacing consistent (padding, gaps)

---

## 4. Landing Page (`/tea-coffee`)

### Hero Section
- [ ] Hero image displays correctly (1200px+ width)
- [ ] Hero text overlay positioned correctly
- [ ] Main heading: "Tea & Coffee" or similar
- [ ] Subheading descriptive (50+ characters)
- [ ] CTA button present and clickable
- [ ] Text readable over image (contrast sufficient)
- [ ] Mobile: image scales, text readable

### Collection Cards Grid
- [ ] Two main cards: "Coffee Collection" and "Tea Collection"
- [ ] Each card shows collection name, description, icon/image
- [ ] Cards clickable → navigate to `/tea-coffee/coffee` and `/tea-coffee/tea`
- [ ] Grid: 2 columns on desktop, 1 on mobile
- [ ] Cards have hover effect (scale, shadow)
- [ ] Responsive spacing

### "3×3 Matrix" / "8 Selections" Breakdown
- [ ] Section title present
- [ ] Coffee breakdown: 3 varieties × 3 grinds = 9 products listed
- [ ] Tea breakdown: 8 tea types listed
- [ ] Text layout: vertically stacking or 2-column grid
- [ ] Each item readable and descriptive
- [ ] Visual separation between coffee and tea

### Icon Row / Category Showcase
- [ ] Row of 6-8 category icons (e.g., "Freshly Roasted", "Single Origin", "Fair Trade", "Organic")
- [ ] Icons with labels below
- [ ] Labels descriptive (2-3 words)
- [ ] Responsive: 3-4 per row on mobile, 6-8 on desktop
- [ ] Icons properly aligned

### Articles Preview Section
- [ ] Shows 3 featured articles
- [ ] Each article: thumbnail, title, excerpt
- [ ] "View All Articles" link present
- [ ] Grid: 1 column on mobile, 3 columns on desktop
- [ ] Responsive spacing

### Footer Integration
- [ ] Footer visible at page bottom
- [ ] Links functional (About, Contact, Social, etc.)
- [ ] Responsive stacking

---

## 5. Coffee & Tea Collection Pages (`/tea-coffee/coffee`, `/tea-coffee/tea`)

### Page Header
- [ ] Page title: "Coffee" or "Tea"
- [ ] Subtitle with brief description
- [ ] Breadcrumb navigation visible (if applicable)
- [ ] Mobile: text stacks, readable

### Product Grid
- [ ] 9 coffee products displayed on coffee page
- [ ] 8 tea products displayed on tea page
- [ ] Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- [ ] Products in correct category
- [ ] No duplicates

### Product Cards
- [ ] Product image: 200px × 250px (or aspect ratio maintained)
- [ ] Product name: readable, 1-2 lines
- [ ] Price: displayed prominently ($X.XX format)
- [ ] Stock status: "In Stock" or "Low Stock" or "Out of Stock"
- [ ] Coffee-specific: Grind level badge visible (Coarse, Medium, Fine)
- [ ] Coffee-specific: Family badge visible (Arabica, Robusta, Culi)
- [ ] Tea-specific: Tea type badge visible
- [ ] "Add to Cart" button: 44px minimum, clickable
- [ ] "View Details" link or button present
- [ ] Hover effect: card elevation/shadow change
- [ ] Click → navigates to product detail page

### Filter/Sort Sidebar (Optional)
- [ ] Filter by price range: slider or preset buttons
- [ ] Filter by coffee family (Arabica, Robusta, Culi) — coffee page only
- [ ] Filter by grind level (Coarse, Medium, Fine) — coffee page only
- [ ] Filter by tea type — tea page only
- [ ] Sort by: popularity, price (low-high, high-low), newest
- [ ] Mobile: filter button/drawer instead of sidebar
- [ ] Filters apply immediately or with "Apply" button
- [ ] Active filters displayed as tags
- [ ] "Clear Filters" button present

### Responsive Layout
- [ ] Desktop (1024px+): 3-column grid + sidebar
- [ ] Tablet (768px): 2-column grid, sidebar below or side
- [ ] Mobile (375px): 1-column grid, filter drawer
- [ ] Mobile (360px): 1-column grid, no overflow

---

## 6. Product Detail Pages (`/tea-coffee/products/$slug`)

### Product Information
- [ ] Product slug URL format: `/tea-coffee/products/arabica-single-origin-medium`
- [ ] Correct product loaded based on slug
- [ ] Product image gallery: main + 3-5 thumbnails
- [ ] Product name: h1 heading
- [ ] Price: prominent, $X.XX format
- [ ] Stock status: clear message (In Stock, Low Stock, Out of Stock)
- [ ] Product rating: stars (if applicable) or reviews count

### Coffee-Specific Fields
- [ ] Coffee family: Arabica/Robusta/Culi
- [ ] Grind level: Coarse/Medium/Fine
- [ ] Roast level: Light/Medium/Dark
- [ ] Origin/Source info
- [ ] Tasting notes (3-5 descriptors)
- [ ] Arabica ratio (for blends)
- [ ] Brewing method recommendations

### Tea-Specific Fields
- [ ] Tea type/variety
- [ ] Steep time (min/max in minutes)
- [ ] Water temperature (in °F or °C)
- [ ] Health benefits (3-5 listed)
- [ ] Flavor profile description
- [ ] Ingredients list
- [ ] Caffeine level indicator

### Shared Product Fields
- [ ] About section: 100+ character description
- [ ] Ingredients list: formatted clearly
- [ ] Preparation instructions: step-by-step
- [ ] Storage instructions: temperature, container, duration
- [ ] Cautions/Allergens: clearly marked
- [ ] Suggested uses/pairings
- [ ] Certifications (Fair Trade, Organic, etc.)

### Add to Cart Functionality
- [ ] Quantity selector: + / - buttons or input
- [ ] Min/Max quantity constraints enforced
- [ ] "Add to Cart" button: full-width on mobile, prominent on desktop
- [ ] Click → item added to cart (verify via cart page)
- [ ] Toast/notification confirms addition
- [ ] Button disabled if out of stock
- [ ] Cart icon updated (if badge used)

### Related Content
- [ ] Related products: 4-6 similar items in grid (2-3 col on desktop, 1 on mobile)
- [ ] Related articles: 2-3 linked articles at bottom
- [ ] Related guides: 2-3 education items (if applicable)
- [ ] "View Related" sections responsive and clickable

### Navigation
- [ ] Breadcrumb: Home > Tea & Coffee > [Category] > [Product Name]
- [ ] Back button present (browser back or explicit button)
- [ ] Next/Previous product links (if applicable)
- [ ] Mobile: all nav elements accessible

### Responsive Design
- [ ] Desktop: 2-column layout (image left, info right)
- [ ] Tablet: 2-column layout with adjusted spacing
- [ ] Mobile (375px): full-width, sections stack vertically
- [ ] Images scale correctly, maintain aspect ratio
- [ ] Accordion sections readable on all sizes

---

## 7. Education Hub (`/tea-coffee/learn`)

### Hub Landing Page
- [ ] Page title: "Learn Tea & Coffee"
- [ ] Hub description: 50+ character intro
- [ ] Guide category cards displayed
- [ ] 5 guide cards visible (one per category)
- [ ] Grid: 2-3 columns on desktop, 1-2 on tablet, 1 on mobile
- [ ] Cards responsive and clickable

### Guide Cards
- [ ] Card image: 150px × 150px (or maintained aspect)
- [ ] Category name: bold, readable
- [ ] Excerpt: 2-3 sentences
- [ ] "Read More" link or card click → `/tea-coffee/learn/$slug`
- [ ] Hover effect: slight elevation/shadow
- [ ] Mobile: full-width cards with good spacing

### Individual Guide Pages (`/tea-coffee/learn/$slug`)
- [ ] Guide title: h1 heading
- [ ] Breadcrumb: Tea & Coffee > Learn > [Guide Name]
- [ ] Author/date info (if applicable): "Written by [Name] on [Date]"
- [ ] Featured image: full-width, aspect ratio maintained
- [ ] Table of contents: links to sections (if long content)
- [ ] Content sections: h2/h3 headings with body text
- [ ] Content formatted: paragraphs, lists, emphasized text
- [ ] Minimum 300 words per guide
- [ ] Links functional and appropriate
- [ ] Back link: "← Back to Learn" or breadcrumb
- [ ] Related guides: 2-3 other guides in sidebar/below

### Guide Categories (5 Guides Expected)
Examples (actual names may vary):
- [ ] "Coffee Brewing Methods" — pour-over, French press, espresso, AeroPress, Moka pot
- [ ] "Tea Steep & Temperature Guide" — optimal temps and times for each tea
- [ ] "Single Origin vs Blends" — explanation of coffee sourcing
- [ ] "Health Benefits of Tea" — antioxidants, caffeine content, wellness info
- [ ] "Coffee Storage & Freshness" — how to keep coffee fresh, shelf life

### Responsive Design
- [ ] Hub page: mobile stacking, tablet 2-col, desktop 3-col grid
- [ ] Guide detail: readable on all breakpoints
- [ ] Typography scaling with `text-tc-*` utilities
- [ ] Images responsive (max-width: 100%)

---

## 8. U20X Challenges (`/u20x`)

### Hub Landing Page
- [ ] Page title: "U20X Challenges" or "20-Day Challenges"
- [ ] Hub description: explaining U20X concept (50+ characters)
- [ ] Challenge cards displayed in grid
- [ ] 4 challenge cards visible
- [ ] Grid: 2 columns on desktop, 1-2 on tablet, 1 on mobile

### Challenge Cards
- [ ] Challenge title: bold, readable (20-30 characters)
- [ ] Challenge description: 2-3 sentences
- [ ] Duration badge: "20 days" or similar
- [ ] Difficulty level (if applicable): Easy/Medium/Hard
- [ ] "Start Challenge" button or card click → `/u20x/$slug`
- [ ] Hover effect: shadow/elevation change
- [ ] Mobile: cards stack vertically with good spacing

### Individual Challenge Pages (`/u20x/$slug`)
- [ ] Challenge title: h1 heading
- [ ] Challenge description: full overview
- [ ] Challenge duration: "20 days" clearly stated
- [ ] Start date selector or "Start Now" button
- [ ] Day-by-day breakdown:
  - [ ] Accordion or tab sections for each day (Day 1-20)
  - [ ] Each day has: title, description, daily practice (50+ words)
  - [ ] Daily practices actionable and relevant to tea/coffee
  - [ ] Optional: tips, resources, reflection prompts

### 20-Day Structure Example (Coffee Challenge)
- [ ] Days 1-3: Introduction to coffee origins and varieties
- [ ] Days 4-6: Brewing method deep-dives (pour-over, French press, espresso)
- [ ] Days 7-9: Tasting and flavor profiling
- [ ] Days 10-12: Single origin vs blends
- [ ] Days 13-15: Storage and freshness
- [ ] Days 16-18: Coffee pairings and recipes
- [ ] Days 19-20: Challenge completion and next steps

### Responsive Design
- [ ] Hub: grid stacks on mobile
- [ ] Challenge detail: accordion/tabs responsive
- [ ] Text readable on all breakpoints
- [ ] Daily sections not overlapping on mobile

---

## 9. Articles Hub (`/tea-coffee/articles`)

### Hub Landing Page
- [ ] Page title: "Articles & Resources"
- [ ] Hub description: 50+ character intro
- [ ] Featured articles section: 2-3 prominent cards at top
- [ ] Search input: full-width on mobile, prominent on desktop
- [ ] Search placeholder: "Search articles..."
- [ ] Category filter buttons: Brewing, Health, Origins, Recipes, etc.
- [ ] Browse articles grid: 3 columns on desktop, 2 on tablet, 1 on mobile

### Featured Articles
- [ ] Featured cards larger than browse cards
- [ ] Feature image: 300px × 200px (or maintained aspect)
- [ ] Featured title: h2, bold
- [ ] Featured excerpt: 2-3 sentences
- [ ] "Read Article" link → article detail page
- [ ] Grid layout: 1-2 columns responsive

### Browse Articles Grid
- [ ] 3+ sample articles displayed
- [ ] Each article card: image, title, category, excerpt, date
- [ ] Cards in 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- [ ] Cards clickable → `/tea-coffee/articles/$slug`
- [ ] Hover effect: shadow/scale change

### Search Functionality
- [ ] Search input accepts text
- [ ] Search filters articles by title/excerpt in real-time
- [ ] Results update without page reload
- [ ] Empty state message if no results
- [ ] Clear search button or 'x' to reset

### Category Filtering
- [ ] Category buttons: Brewing, Health, Origins, Recipes, Sustainability (examples)
- [ ] Active category highlighted/selected
- [ ] Clicking category filters articles
- [ ] Multiple category selection (if applicable)
- [ ] "Clear Filters" button present
- [ ] Filter tags visible showing active filters

### Individual Article Pages (`/tea-coffee/articles/$slug`)
- [ ] Article title: h1 heading
- [ ] Article metadata: author, publish date, read time
- [ ] Featured image: full-width
- [ ] Article content: 500+ words
- [ ] Content formatted: paragraphs, headers (h2/h3), lists
- [ ] Embedded images (if any): responsive, captions
- [ ] Share buttons: social media sharing links
- [ ] Related articles: 3 sidebar items linking to similar content
- [ ] Back link: "← Back to Articles"
- [ ] Comments section (if applicable)

### Article Categories (Sample Articles)
- [ ] "Best Coffee Brewing Methods for Beginners" — Brewing category
- [ ] "Health Benefits of Green Tea" — Health category
- [ ] "Single Origin vs Blended Coffee Explained" — Origins category
- [ ] "Easy Cold Brew Recipe" — Recipes category
- [ ] "Sustainable Tea & Coffee Sourcing" — Sustainability category

### Responsive Design
- [ ] Hub: grid layout responsive
- [ ] Search input full-width on mobile
- [ ] Filter buttons scroll horizontally on mobile (if many)
- [ ] Article detail: readable on all breakpoints
- [ ] Images responsive and centered
- [ ] Related articles sidebar hidden on mobile or stacked below

---

## 10. Component Consistency

### Product Cards (ReusableTeaCoffeeProductCard.tsx or similar)
- [ ] Used consistently on all collection pages
- [ ] Used in "Related Products" sections
- [ ] Image, name, price, badges displayed uniformly
- [ ] Hover states consistent
- [ ] Mobile version: full-width with good spacing
- [ ] Add to Cart button always present and functional

### Article Cards (ArticleCard.tsx or similar)
- [ ] Used consistently on articles hub
- [ ] Used in "Related Articles" sections
- [ ] Image, title, category, excerpt displayed uniformly
- [ ] Date optional but consistent if present
- [ ] Hover states consistent

### Guide Cards
- [ ] Used consistently on learn hub
- [ ] Image, title, excerpt, "Read More" link present
- [ ] Hover states consistent
- [ ] Mobile: full-width, good spacing

### CTA Buttons (btn-tc-primary, btn-tc-secondary)
- [ ] Primary buttons: "Add to Cart", "Start Challenge", "Read Article"
- [ ] Secondary buttons: "View Details", "Back", "Learn More"
- [ ] Consistent styling using design tokens
- [ ] 44px minimum height
- [ ] Hover/focus states visible
- [ ] Disabled state (if applicable) visually distinct

---

## 11. Navigation & Routing

### Route Registration
- [ ] `/tea-coffee` → landing page loads
- [ ] `/tea-coffee/coffee` → coffee collection loads
- [ ] `/tea-coffee/tea` → tea collection loads
- [ ] `/tea-coffee/products/$slug` → product detail loads (test multiple slugs)
- [ ] `/tea-coffee/learn` → education hub loads
- [ ] `/tea-coffee/learn/$slug` → individual guide loads (test multiple)
- [ ] `/tea-coffee/articles` → articles hub loads
- [ ] `/tea-coffee/articles/$slug` → individual article loads (test multiple)
- [ ] `/u20x` → challenges hub loads
- [ ] `/u20x/$slug` → individual challenge loads (test multiple)
- [ ] No 404 errors for valid routes
- [ ] No console errors on route navigation

### Breadcrumbs
- [ ] Home > Tea & Coffee > [current page]
- [ ] Home > Tea & Coffee > Coffee/Tea > [Product Name] (product pages)
- [ ] Home > Tea & Coffee > Learn > [Guide Name] (guide pages)
- [ ] Home > Tea & Coffee > Articles > [Article Title] (article pages)
- [ ] Breadcrumb links navigate correctly
- [ ] Mobile: breadcrumbs stacked or abbreviated

### Back Navigation
- [ ] Browser back button works
- [ ] Explicit back buttons functional
- [ ] Links in nav/breadcrumbs navigate without errors
- [ ] No broken internal links

---

## 12. Accessibility (WCAG 2.1 AA)

### Keyboard Navigation
- [ ] Tab key navigates through all interactive elements
- [ ] Shift+Tab navigates backwards
- [ ] Enter key activates buttons/links
- [ ] Space bar activates buttons
- [ ] No keyboard traps (tab can always move forward/backward)
- [ ] Focus visible on all interactive elements (outline or highlight)

### Screen Reader (VoiceOver, NVDA, TalkBack)
- [ ] Page title announced
- [ ] All headings announced with correct hierarchy (h1 > h2 > h3)
- [ ] Links have descriptive text (not "Click here", "More", etc.)
- [ ] Form labels associated with inputs
- [ ] Buttons have descriptive labels
- [ ] Images have alt text (decorative images marked as such)
- [ ] Lists announced as lists (ul, ol)
- [ ] Tables announced correctly (if used)
- [ ] "Skip to main content" link present and functional

### Color & Contrast
- [ ] All text has 4.5:1 contrast (normal text) or 3:1 (large text)
- [ ] Color not used alone to convey information (e.g., "red for error")
- [ ] Icons have text labels
- [ ] Disabled buttons visually distinct

### Forms & Input
- [ ] All form inputs have associated labels
- [ ] Error messages clear and accessible
- [ ] Required fields marked (with * or text)
- [ ] Placeholder text not a substitute for labels
- [ ] Quantity selectors keyboard accessible
- [ ] Search input functional via keyboard

### Responsiveness & Zoom
- [ ] Page readable at 200% zoom
- [ ] No horizontal scroll at 200% zoom
- [ ] Content reflow at all zoom levels

---

## 13. Performance Metrics

### Page Load Times (Lighthouse)
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] First Input Delay (FID): < 100ms
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] First Contentful Paint (FCP): < 1.8s
- [ ] Time to Interactive (TTI): < 5.5s

### Network Requests
- [ ] CSS minified and bundled
- [ ] JavaScript code-split appropriately
- [ ] Images optimized (WebP, lazy-loaded)
- [ ] No unused CSS/JS in main bundles
- [ ] Gzip compression enabled

### Asset Optimization
- [ ] Product images: max 300KB per image (after optimization)
- [ ] Hero images: max 500KB
- [ ] SVG icons: inlined or referenced (< 10KB combined)
- [ ] Fonts: system fonts or Google Fonts (< 100KB combined)

---

## 14. Data Validation

### Product Data
- [ ] All 17 products load without errors
- [ ] Product fields match TypeScript schema
- [ ] Prices all > 0 and formatted correctly
- [ ] Stock quantities all ≥ 0 and integers
- [ ] Images URLs accessible (no 404s)
- [ ] No missing required fields
- [ ] Coffee products have coffee-specific fields
- [ ] Tea products have tea-specific fields
- [ ] No undefined or null values for critical fields

### Article Data
- [ ] All articles have title, content, date
- [ ] Article content 500+ words
- [ ] Images embedded in articles (if any) render correctly
- [ ] Related articles links resolve

### Guide Data
- [ ] All guides have title, content, category
- [ ] Guide content 300+ words
- [ ] Guide categories match expected list

### Challenge Data
- [ ] All challenges have title, description
- [ ] All challenges have 20-day structure
- [ ] Each day has title and practice description
- [ ] No missing days (1-20 all present)

---

## 15. Error Handling

### Network Errors
- [ ] Product data fails to load → error message displayed
- [ ] Image fails to load → placeholder or fallback shown
- [ ] API timeout → graceful degradation or retry button
- [ ] No console errors for network failures

### Validation Errors
- [ ] Invalid product slug → 404 or fallback to collection
- [ ] Invalid search query → empty results message
- [ ] Invalid filter selection → graceful handling
- [ ] Form submission without required fields → error message

### Edge Cases
- [ ] Empty product list → "No products available" message
- [ ] 0 results from search → "No articles found" message
- [ ] Rapid filter changes → no race conditions or UI breaks
- [ ] Mobile orientation change → no layout shift or data loss

---

## 16. Browser & Device Testing

### Browsers
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Devices (Actual or DevTools)
- [ ] iPhone SE (360px) — portrait & landscape
- [ ] iPhone 12 (390px) — portrait & landscape
- [ ] iPad (768px) — portrait & landscape
- [ ] MacBook (1366px) — desktop view
- [ ] Desktop monitor (1920px+) — desktop view
- [ ] Android phone (375px) — portrait & landscape
- [ ] Android tablet (1000px) — portrait & landscape

### OS-Specific Testing
- [ ] Windows: Chrome, Firefox, Edge all functional
- [ ] macOS: Chrome, Firefox, Safari all functional
- [ ] iOS: Safari, Chrome functional
- [ ] Android: Chrome, Firefox functional

---

## 17. User Experience (UX) Testing

### First-Time Visitor Experience
- [ ] Landing page immediately communicates purpose (Tea & Coffee department)
- [ ] Navigation clear and discoverable (sub-navbar visible)
- [ ] CTA buttons clear ("View Coffee", "Explore Tea", etc.)
- [ ] Path to product purchase obvious (collection → product → add to cart)
- [ ] No dead ends or confusing redirects

### Product Discovery
- [ ] Coffee and tea collections clearly separated
- [ ] Product filters working and useful
- [ ] Related products help with discovery
- [ ] Search functionality finds products
- [ ] Article links provide additional context

### Content Readability
- [ ] Font sizes appropriate for all devices
- [ ] Line lengths comfortable for reading (not too wide)
- [ ] Headings clear and hierarchical
- [ ] Body text has adequate line-height (1.5+)
- [ ] Contrast sufficient for comfortable reading

### Interaction Feedback
- [ ] Buttons respond immediately on click
- [ ] Hover states visible on desktop
- [ ] Click feedback (active state) visible
- [ ] Loading states visible (if applicable)
- [ ] Success confirmations clear (e.g., "Added to cart")

---

## 18. Conversion & Analytics Readiness

### Cart Integration
- [ ] Products added to cart persist
- [ ] Quantity updates reflect in cart
- [ ] Cart shows correct total
- [ ] Proceed to checkout available
- [ ] No cart errors or lost items

### Tracking Points (for future analytics setup)
- [ ] Page views trackable (/tea-coffee, /tea-coffee/coffee, etc.)
- [ ] Product views trackable (which products viewed most)
- [ ] Add to cart events trackable
- [ ] Article/guide engagement trackable
- [ ] Challenge starts trackable (if applicable)

---

## 19. Content Quality

### Copy & Messaging
- [ ] Product descriptions descriptive and accurate (50+ words)
- [ ] Product names clear and consistent
- [ ] Category names clear and consistent
- [ ] CTA text action-oriented ("Add to Cart", "Read More", "Start Challenge")
- [ ] No typos or grammatical errors
- [ ] Tone consistent throughout (professional, friendly, or appropriate style)

### Product Information Completeness
- [ ] Coffee products: all 30+ fields populated
- [ ] Tea products: all 30+ fields populated
- [ ] No placeholder text like "[FILL IN]" or "TBD"
- [ ] Ingredients lists complete and accurate
- [ ] Storage instructions practical and accurate
- [ ] Health benefits realistic and not overstated

### Educational Content Quality
- [ ] Guides are informative and well-structured
- [ ] Guides use clear headings and sections
- [ ] Guides include practical tips or instructions
- [ ] Challenges are engaging and achievable
- [ ] Challenge practices are actionable daily activities
- [ ] Articles are well-researched and authoritative

---

## 20. Sign-Off Checklist

### Critical Items (Must Pass)
- [ ] All 12 routes load without errors
- [ ] All 17 products display correctly
- [ ] Product detail pages complete with all fields
- [ ] Add to cart functionality works
- [ ] No console errors on any page
- [ ] Navigation between pages works
- [ ] Mobile responsive (360px, 375px, 768px, 1024px)
- [ ] No horizontal scrolling on any breakpoint
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader announces content
- [ ] Build compiles without errors
- [ ] No TypeScript errors or warnings

### Important Items (Should Pass)
- [ ] All images load correctly
- [ ] All links functional (internal and external)
- [ ] Search and filter features working
- [ ] Breadcrumbs navigate correctly
- [ ] Touch targets minimum 44px
- [ ] Color contrast WCAG AA compliant
- [ ] Page load time < 3s on 4G
- [ ] No layout shifts (CLS < 0.1)
- [ ] Responsive design tested on actual devices
- [ ] Performance metrics acceptable

### Enhancement Items (Nice to Have)
- [ ] Analytics tracking points identified
- [ ] SEO metadata (title, description) present
- [ ] Social sharing ready (Open Graph tags)
- [ ] PWA-ready (if applicable)
- [ ] Internationalization hooks (i18n) added
- [ ] Documentation complete
- [ ] Deployment checklist completed

---

## Testing Sign-Off

### QA Lead Approval
- **Tested By**: [Name]
- **Date**: [YYYY-MM-DD]
- **Browser(s)**: Chrome, Firefox, Safari, Edge
- **Device(s)**: Desktop, Tablet (iPad), Mobile (iPhone SE, iPhone 12)
- **Issues Found**: [Number] (0 critical, [Number] medium, [Number] low)
- **Issues Resolved**: [Number] / [Number]
- **Status**: ✓ PASSED / ⚠️ NEEDS REVISION / ✗ FAILED

### Developer Sign-Off
- **Implemented By**: [Name]
- **Build Status**: ✓ No errors
- **TypeScript Status**: ✓ No errors or warnings
- **Test Status**: ✓ All tests passing (if applicable)
- **Ready for Production**: YES / NO

### Project Lead Approval
- **Approved By**: [Name]
- **Date**: [YYYY-MM-DD]
- **Status**: ✓ APPROVED FOR PRODUCTION

---

**Phase 11 Status**: QA Acceptance Criteria Checklist created with 120+ test items across all features and pages. Ready for comprehensive testing and sign-off.

