# Phase 4G: QA Testing & Verification Guide

**Status:** Ready for Testing  
**Target Date:** October 5-6, 2026  
**Test Environment:** Development & Production (after backend migration)  
**Blockers:** Awaiting Task 4C completion (backend data migration)

---

## Quick Start

**Prerequisites:**
1. ✅ Backend has been migrated with 17 tea-coffee products (Task 4C)
2. ✅ Frontend code built successfully (no errors)
3. ✅ Development server running: `npm run dev`
4. ✅ Browser DevTools open (F12) for console monitoring

**URLs to Test:**
- Tea Collection: http://localhost:5173/tea-coffee/tea
- Coffee Collection: http://localhost:5173/tea-coffee/coffee
- Product Detail: http://localhost:5173/tea-coffee/products/[product-slug]
- Landing Page: http://localhost:5173/tea-coffee/

---

## Testing Phases

### Phase 1: Basic Functionality (10 min)
### Phase 2: Filters & Search (10 min)
### Phase 3: Product Detail & Cart (10 min)
### Phase 4: Backend Failure Scenarios (10 min)
### Phase 5: Mobile Responsiveness (10 min)

**Total Estimated Time:** ~50 minutes

---

## Phase 1: Basic Functionality ✓

### Tea Collection Page (`/tea-coffee/tea`)

- [ ] **Page Loads**
  - [ ] No console errors
  - [ ] Page renders without blank screen
  - [ ] Hero section displays correctly
  - [ ] Estimated time: < 2 seconds

- [ ] **Backend Status**
  - [ ] Check console for: `✅ Loaded X tea products from backend`
  - [ ] No fallback message visible (unless backend down)
  - [ ] Product count shown: "Showing X of X teas"

- [ ] **Product Grid**
  - [ ] Tea products display in 2-3 column grid (desktop)
  - [ ] Each card shows: name, type badge, price, description, buttons
  - [ ] Product images load correctly
  - [ ] Green tea type badges appear (correct color)

- [ ] **Buttons**
  - [ ] "Add" button is clickable (green)
  - [ ] "Details" button links to product page
  - [ ] Both buttons have 48px+ tap target (mobile-friendly)

**Expected Outcome:** 8 tea products visible, no errors

---

### Coffee Collection Page (`/tea-coffee/coffee`)

- [ ] **Page Loads**
  - [ ] No console errors
  - [ ] Page renders without blank screen
  - [ ] Hero section displays with coffee gradient (amber)
  - [ ] Estimated time: < 2 seconds

- [ ] **Backend Status**
  - [ ] Check console for: `✅ Loaded X coffee products from backend`
  - [ ] No fallback message visible (unless backend down)
  - [ ] Product count shown: "Showing X of X coffees"

- [ ] **Product Grid**
  - [ ] Coffee products display in 2-3 column grid (desktop)
  - [ ] Each card shows: name, coffee type badge, price, description, buttons
  - [ ] Product images load correctly
  - [ ] Coffee family badges appear (Arabica/Robusta/Culi with correct colors)

- [ ] **Badges**
  - [ ] Arabica badge: dark green (#2d6a3f)
  - [ ] Robusta badge: dark red (#7f1d1d)
  - [ ] Culi badge: brown (#92400e)
  - [ ] Text contrast is sufficient (WCAG AA)

**Expected Outcome:** 9 coffee products visible, color-coded badges correct

---

## Phase 2: Filters & Search ✓

### Tea Type Filter

- [ ] **Tea Type Filter (Tea Collection)**
  - [ ] Collapsible filter bar visible (mobile) / sidebar (desktop)
  - [ ] All tea types displayed as options
  - [ ] Click filter option
  - [ ] Product list updates to show only selected type
  - [ ] Count updates: "Showing X of 8"
  - [ ] URL updates with `?type=black` (or selected type)
  - [ ] Uncheck filter
  - [ ] All products reappear

**Test Filters:**
- [ ] Black tea: should filter to black tea products
- [ ] Green tea: should filter to green tea products
- [ ] Herbal: should filter to herbal products

---

### Botanical Family Filter

- [ ] **Botanical Family Filter (Tea Collection)**
  - [ ] "Botanical Family" options displayed in sidebar (desktop)
  - [ ] Click family option
  - [ ] Products filtered to matching family
  - [ ] Multiple families available from tea data

**Test Scenarios:**
- [ ] Select family A → products update
- [ ] Select family B → products update  
- [ ] Deselect → all products return

---

### Coffee Type Filter

- [ ] **Coffee Type Filter (Coffee Collection)**
  - [ ] Collapsible filter bar visible (mobile) / sidebar (desktop)
  - [ ] All coffee types displayed: Arabica, Robusta, Culi
  - [ ] Click filter option
  - [ ] Product list updates to show only selected type
  - [ ] Count updates: "Showing X of 9"
  - [ ] URL updates with `?type=arabica` (or selected type)

**Test Filters:**
- [ ] Arabica: should show only arabica products
- [ ] Robusta: should show only robusta products
- [ ] Culi: should show only culi products

---

### Grind Preparation Filter

- [ ] **Grind Preparation Filter (Coffee Collection)**
  - [ ] "Preparation" options displayed in sidebar (desktop)
  - [ ] Options: Whole Bean, Medium Ground, Fine Specialty Grind
  - [ ] Click preparation option
  - [ ] Products filtered correctly
  - [ ] Uncheck filter
  - [ ] All products return

**Test Scenarios:**
- [ ] Whole Bean → correct products
- [ ] Medium Ground → correct products
- [ ] Fine Specialty → correct products

---

### Filter Combinations

- [ ] **Multiple Filters (Coffee Collection)**
  - [ ] Select Arabica coffee type
  - [ ] Also select Whole Bean preparation
  - [ ] Products show: Arabica AND Whole Bean (intersection)
  - [ ] Count reflects combination
  - [ ] Clear both filters
  - [ ] All products return

---

### Empty State

- [ ] **No Results Matching Filters**
  - [ ] Select filter combination with no matching products
  - [ ] Message displays: "No [teas/coffees] match your selection. Try adjusting your filters."
  - [ ] Products grid disappears
  - [ ] No JavaScript errors

---

## Phase 3: Product Detail & Add-to-Cart ✓

### Product Detail Page (`/tea-coffee/products/$slug`)

- [ ] **Page Loads**
  - [ ] No console errors
  - [ ] Page renders without blank screen
  - [ ] Breadcrumb navigation visible: Home / [Tea/Coffee] / Product Name
  - [ ] Estimated load time: < 2 seconds

- [ ] **Product Information**
  - [ ] Product image displays correctly
  - [ ] Type badge displays (tea type or coffee family)
  - [ ] Product name displayed prominently
  - [ ] Price displayed with currency ($)
  - [ ] Stock status shows (✓ In Stock or Out of Stock)
  - [ ] Short description visible

- [ ] **Product Details Section**
  - [ ] Size or Preparation displays correctly
  - [ ] Origin displayed
  - [ ] Flavor profile shown
  - [ ] Brewing/Steeping method visible (if available)
  - [ ] All fields readable without layout issues

- [ ] **Add to Cart**
  - [ ] Quantity selector visible (-, count, +)
  - [ ] "Add to Cart" button visible and clickable
  - [ ] Button shows correct styling (green background)
  - [ ] "Details" button has appropriate styling

---

### Add to Cart Functionality

- [ ] **Add Single Item**
  - [ ] Quantity = 1
  - [ ] Click "Add to Cart" button
  - [ ] Toast notification appears: "Product added to cart" ✓
  - [ ] Button remains clickable (not disabled)
  - [ ] Page doesn't navigate away

- [ ] **Quantity Adjustment**
  - [ ] Click + button: quantity increases to 2, 3, etc.
  - [ ] Click - button: quantity decreases
  - [ ] Quantity doesn't go below 1
  - [ ] Click "Add to Cart" with quantity = 3
  - [ ] Toast shows product added (with correct quantity in cart)

- [ ] **Multiple Products**
  - [ ] Add Product A to cart
  - [ ] Navigate to different product
  - [ ] Add Product B to cart
  - [ ] Cart shows 2 different products
  - [ ] Quantities are correct

---

### Product Navigation

- [ ] **Breadcrumb Navigation**
  - [ ] Click "Home" in breadcrumb → navigates to home page
  - [ ] Click "Tea" / "Coffee" in breadcrumb → navigates to collection
  - [ ] Product name in breadcrumb is correct

- [ ] **Details Button**
  - [ ] On collection card, click "Details" button
  - [ ] Navigates to product detail page
  - [ ] URL is correct: `/tea-coffee/products/[slug]`

- [ ] **Product Card Link**
  - [ ] Click product card (anywhere except buttons)
  - [ ] Navigates to product detail page
  - [ ] URL is correct

---

## Phase 4: Backend Failure Scenarios ✓

**Setup:** Stop backend or disable network to test fallback

### Scenario 1: Backend Completely Down

- [ ] **Tea Collection (/tea-coffee/tea)**
  - [ ] Page still loads (doesn't show blank screen or error)
  - [ ] CSV fallback activates
  - [ ] Message appears: "📌 Connection issue. Using local data."
  - [ ] Products display (8 tea products from CSV)
  - [ ] Filters work with CSV data
  - [ ] Console shows: `⚠️ Backend unavailable, falling back to CSV data`

- [ ] **Coffee Collection (/tea-coffee/coffee)**
  - [ ] Page still loads
  - [ ] CSV fallback activates
  - [ ] Message appears: "📌 Connection issue. Using local data."
  - [ ] Products display (9 coffee products from CSV)
  - [ ] Filters work with CSV data
  - [ ] Console shows error and fallback message

- [ ] **Product Detail (/tea-coffee/products/$slug)**
  - [ ] Page still loads
  - [ ] CSV fallback activates
  - [ ] Message appears: "📌 Showing local product. Backend temporarily unavailable."
  - [ ] Product details display correctly
  - [ ] Add to cart still works

---

### Scenario 2: Slow Network (Simulated)

**Chrome DevTools → Network → Throttle to "Slow 3G"**

- [ ] **Collection Pages**
  - [ ] Loading message appears while fetching
  - [ ] After network delay, products appear
  - [ ] No timeout errors
  - [ ] Filters become responsive after load

- [ ] **Product Detail**
  - [ ] "Loading product..." message appears
  - [ ] After network delay, product details appear
  - [ ] No infinite loading spinner

---

### Scenario 3: Backend Returns Empty Results

- [ ] **Expected behavior:** Should trigger fallback
  - [ ] Check console for: `⚠️ Backend unavailable, falling back to CSV data`
  - [ ] CSV data displays
  - [ ] Fallback message shown

---

### Scenario 4: Invalid Product Slug

- [ ] **Navigate to:** `/tea-coffee/products/invalid-product-slug-12345`
  - [ ] Backend attempts to find product
  - [ ] CSV fallback looks up product
  - [ ] If not found in either → 404 page displays
  - [ ] Error message is user-friendly (not stack trace)

---

## Phase 5: Mobile Responsiveness ✓

**Test on:** iPhone 12 (375px), iPad (768px), Desktop (1920px)

### Tea & Coffee Collection (Mobile - 375px)

- [ ] **Layout**
  - [ ] Filter bar collapses to drawer/accordion (not sidebar)
  - [ ] Products display in single column (mobile) or 2 columns (tablet)
  - [ ] No horizontal scroll
  - [ ] Margins/padding appropriate for small screens

- [ ] **Touch Targets**
  - [ ] All buttons are 48px × 48px minimum
  - [ ] Filter buttons are clickable without adjacent buttons
  - [ ] No overlapping clickable areas

- [ ] **Filter Bar (Mobile)**
  - [ ] Filter button/drawer toggle visible at top
  - [ ] Tap to open filter drawer
  - [ ] Filter options clearly labeled
  - [ ] Can scroll through many filter options
  - [ ] Close button or tap outside to close
  - [ ] Filter selections persist when drawer closed

- [ ] **Images**
  - [ ] Product images scale correctly (not stretched)
  - [ ] Images have proper aspect ratio (square for cards)
  - [ ] No image loading errors

- [ ] **Text Readability**
  - [ ] Product names not cut off
  - [ ] Prices clearly visible
  - [ ] Descriptions readable (not truncated incorrectly)

---

### Product Detail (Mobile - 375px)

- [ ] **Layout**
  - [ ] Product image takes full width (or near full)
  - [ ] Details section below image
  - [ ] All sections stack vertically
  - [ ] No horizontal scroll

- [ ] **Image**
  - [ ] Product image displays full width (with margins)
  - [ ] Aspect ratio preserved
  - [ ] Image loads correctly

- [ ] **Details Section**
  - [ ] Product name, price, stock status visible
  - [ ] Quantity selector fits on screen
  - [ ] Add to Cart button full width or near full width
  - [ ] Button text clearly visible

- [ ] **Additional Info**
  - [ ] Brewing/steeping method readable
  - [ ] Additional details don't overflow
  - [ ] All text has sufficient contrast

- [ ] **Scrolling**
  - [ ] Can scroll to see full product details
  - [ ] Scroll is smooth (no jank)
  - [ ] No elements hidden by phone notch/keyboard

---

### Tablet Layout (768px)

- [ ] **Collection Pages**
  - [ ] Products display in 2-3 columns
  - [ ] Filter sidebar visible (not drawer)
  - [ ] Layout balanced and spacious

- [ ] **Product Detail**
  - [ ] Image on left, details on right (if space allows)
  - [ ] Or stacked if layout demands
  - [ ] Proper proportions

---

### Desktop Layout (1920px)

- [ ] **Collection Pages**
  - [ ] Products in 3+ column grid
  - [ ] Filter sidebar on left
  - [ ] Content area properly spaced
  - [ ] No excessive whitespace

- [ ] **Product Detail**
  - [ ] Image and details side-by-side
  - [ ] Proper use of screen real estate
  - [ ] Not cramped or overly wide

---

## Browser Compatibility ✓

**Test on:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (iOS 16+, macOS)
- [ ] Edge (latest)

**Per Browser Checklist:**
- [ ] Page loads without errors
- [ ] Buttons are clickable
- [ ] Filters work
- [ ] Add to cart works
- [ ] Images display correctly
- [ ] Layout renders correctly
- [ ] Text readable
- [ ] No console errors

---

## Performance Checks ✓

### Load Time

**Desktop (Network: Fast 3G)**
- [ ] Collection page loads in < 3 seconds
- [ ] Product detail loads in < 3 seconds
- [ ] Filter interaction responds in < 200ms

**Mobile (Network: Slow 3G)**
- [ ] Collection page loads in < 5 seconds
- [ ] Product detail loads in < 5 seconds
- [ ] Filter interaction responds in < 500ms

### Console Monitoring

**DevTools → Console Tab**
- [ ] No JavaScript errors (red X)
- [ ] No TypeScript errors
- [ ] Expected console logs present:
  - `🔄 Loading tea products from backend...`
  - `✅ Loaded 8 tea products from backend` (or CSV fallback message)
  - `📊 [Analytics] Backend available for tea`

**Expected Log Pattern (Backend Available):**
```
🔄 Loading tea products from backend...
✅ Loaded 8 tea products from backend
📊 [Analytics] Backend available for tea: { timestamp: '...' }
```

**Expected Log Pattern (Backend Down):**
```
🔄 Loading tea products from backend...
⚠️ Backend unavailable, falling back to CSV data: Error: Network error
[TeaCoffee:load-products] network-error: fetch failed
📊 [Analytics] Fallback used for tea: { dataSource: 'csv', errorType: 'network-error' }
```

---

## Accessibility (WCAG AA) ✓

- [ ] **Color Contrast**
  - [ ] Coffee family badges have sufficient contrast
  - [ ] Text on colored backgrounds readable
  - [ ] Use Chrome DevTools → Rendering → Emulate vision deficiencies to test

- [ ] **Keyboard Navigation**
  - [ ] Can tab through all interactive elements
  - [ ] Tab order is logical (left-to-right, top-to-bottom)
  - [ ] Focus indicators visible on buttons and links

- [ ] **Screen Reader (NVDA/JAWS)**
  - [ ] Product names announced
  - [ ] Prices announced
  - [ ] Buttons announced with clear labels
  - [ ] Filter options announced
  - [ ] "Add to Cart" button announces quantity

- [ ] **Images**
  - [ ] All product images have alt text
  - [ ] Alt text describes product

---

## Bug Report Template

**If you find an issue:**

```
### Bug Title
[Brief description]

### Steps to Reproduce
1. Go to page [URL]
2. Click button [name]
3. Observe [issue]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Device/Browser
- OS: Windows/macOS/iOS/Android
- Browser: Chrome/Firefox/Safari/Edge
- Screen size: 375px/768px/1920px
- Network: WiFi/4G/3G/Offline

### Console Errors
[Screenshot or paste console errors]

### Screenshots/Video
[Attach if helpful]

### Severity
- [ ] Critical (broken functionality)
- [ ] High (significant issue)
- [ ] Medium (minor usability issue)
- [ ] Low (cosmetic or nice-to-have)
```

---

## Pass/Fail Criteria

### PASS ✅ if:
- ✅ All collection pages load and display products
- ✅ Filters work correctly and update UI
- ✅ Product detail pages load and display info
- ✅ Add to cart functionality works
- ✅ Backend failure scenarios handled gracefully
- ✅ CSV fallback works (if backend down)
- ✅ Mobile responsive (no horizontal scroll, proper touch targets)
- ✅ No console errors
- ✅ Load times acceptable (< 3 seconds desktop, < 5 seconds mobile)

### FAIL ❌ if:
- ❌ Page fails to load or shows blank screen
- ❌ Console errors or TypeScript errors
- ❌ Filters don't work
- ❌ Add to cart fails silently
- ❌ Horizontal scroll on mobile
- ❌ Touch targets < 48px on mobile
- ❌ Backend down causes 500 error (should show fallback instead)
- ❌ Product images don't load
- ❌ Layout broken on any tested screen size

---

## Sign-Off

**Testing Completed By:** ___________________  
**Date:** ___________________  
**Status:** ☐ PASS ☐ FAIL ☐ PASS WITH ISSUES

**Issues Found:**
```
[List any issues found with severity]
```

**Notes:**
```
[Any additional observations or recommendations]
```

---

## Next Steps

**After Successful Testing:**
1. ✅ Document any bugs found
2. ✅ Fix critical bugs before release
3. ✅ Re-test fixed issues
4. ✅ Ready for production deployment
5. ✅ Proceed to Task 4H (Analytics & Monitoring)

**If Issues Found:**
1. ❌ Prioritize by severity
2. ❌ Create bug fixes
3. ❌ Re-test affected areas
4. ❌ Document fixes
5. ❌ Return to Phase X verification

---

**Prepared:** October 5, 2026  
**Target Test Date:** October 6, 2026  
**Backend Dependency:** Awaiting Task 4C completion