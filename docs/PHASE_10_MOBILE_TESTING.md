# Phase 10: Mobile Refinement Testing Guide

## Overview
Complete mobile testing guide for Tea & Coffee department across all breakpoints:
- **360px** — iPhone SE / small phones
- **375px** — iPhone 12/13/14 / standard phones  
- **768px** — iPad / tablets
- **1024px+** — Desktop (already verified)

## Testing Checklist

### Collections Pages (Coffee & Tea)

#### 360px (Small Mobile)
- [ ] Header mega menu accessible via hamburger
- [ ] Hero section text readable without horizontal scroll
- [ ] "3×3 Matrix" / "8 Selections" breakdown stacks vertically
- [ ] Product grid shows 1 column
- [ ] Filter sidebar doesn't overlap content
- [ ] Buttons have min 44px touch target
- [ ] Product cards display image, name, price, stock
- [ ] "Add to Cart" button accessible and tappable

#### 375px (Standard Mobile)
- [ ] All 360px requirements met
- [ ] Product grid shows 2 columns (optional, if space allows)
- [ ] Filter sidebar collapsible or bottom drawer on mobile
- [ ] Matrix breakdown readable in 2 columns
- [ ] No horizontal scroll at any zoom level

#### 768px (Tablet)
- [ ] All 375px requirements met
- [ ] Product grid shows 2-3 columns
- [ ] Filter sidebar appears in left column (optional)
- [ ] Mega menu shown in full desktop style (optional)
- [ ] All spacing proportionate to screen size

### Product Detail Pages

#### 360px
- [ ] Main image displays full-width
- [ ] Thumbnail carousel visible below image
- [ ] Product name readable
- [ ] Price prominent and clear
- [ ] "Add to Cart" button full-width or clearly tappable
- [ ] All sections (About, Ingredients, Prep, Storage, Cautions) stack vertically
- [ ] Related products grid shows 1-2 columns
- [ ] Related articles preview visible

#### 375px
- [ ] Same as 360px
- [ ] Price and stock status side-by-side if space
- [ ] Specs grid shows 1-2 columns

#### 768px
- [ ] 2-column layout: image + info left, sidebar right
- [ ] Sidebar (related products, articles) visible
- [ ] All accordion sections readable
- [ ] 2-3 column grid for related content

### Learn Hub & Guides

#### 360px
- [ ] Guide category cards stack vertically (1 column)
- [ ] Section title readable
- [ ] Links tappable (min 44px height)
- [ ] Back button accessible
- [ ] Guide content readable with comfortable line-length

#### 375px
- [ ] Category cards may show 1-2 columns if space
- [ ] All text readable without zoom

#### 768px
- [ ] 2-column category grid
- [ ] Guide content with proper margins

### U20X Challenge Pages

#### 360px
- [ ] Challenge hub shows 1 challenge card per row
- [ ] Card content (title, description, CTA) all visible
- [ ] Challenge detail pages stack all sections vertically
- [ ] Daily practice accordion items fully accessible
- [ ] "Start Challenge" button full-width

#### 375px
- [ ] All 360px requirements met

#### 768px
- [ ] 2-column challenge grid
- [ ] Challenge detail shows better spacing

### Articles Hub & Detail

#### 360px
- [ ] Featured articles show 1 column
- [ ] Search input full-width and tappable
- [ ] Category filter buttons stack or scroll horizontally with padding
- [ ] Browse articles grid shows 1 column
- [ ] Article detail: cover image full-width, content readable

#### 375px
- [ ] All 360px requirements met
- [ ] Filter buttons more clearly visible

#### 768px
- [ ] Featured articles show 2 columns
- [ ] Browse articles show 2 columns
- [ ] Sidebar with related products/articles visible

## Responsive Design Checklist

### Typography
- [ ] Body text: min 14px on mobile, 16px on tablet+
- [ ] Headings: appropriately scaled down on mobile
- [ ] Labels (text-tc-label): readable at 12px
- [ ] Line-height: minimum 1.5 for accessibility

### Spacing & Padding
- [ ] Container padding: 1rem (16px) on mobile, 2rem (32px) on tablet+
- [ ] Gap between elements: 0.5-1rem on mobile, scales up on larger screens
- [ ] Vertical spacing between sections: 2rem on mobile, 3-4rem on tablet+

### Touch Targets
- [ ] Buttons: minimum 44px × 44px
- [ ] Links: minimum 44px tap area
- [ ] Form inputs: minimum 44px height
- [ ] Checkbox/radio: at least 24px × 24px

### Orientation
- [ ] Portrait mode: all content fits without horizontal scroll
- [ ] Landscape mode (375px width): content readable, no overflow
- [ ] All sections adapt gracefully to orientation changes

### Images
- [ ] Images don't exceed container width
- [ ] Aspect ratios maintained on all breakpoints
- [ ] Image alt text present for accessibility
- [ ] Product thumbnails tappable on mobile

### Navigation
- [ ] Hamburger menu accessible on mobile/tablet
- [ ] Mega menu hidden on mobile (hamburger only)
- [ ] Footer links accessible on all sizes
- [ ] Breadcrumbs visible (if applicable)

### Forms & Inputs
- [ ] Input fields full-width on mobile (except when grouped)
- [ ] Select dropdowns styled appropriately
- [ ] Search field has clear submit button
- [ ] Error messages visible and clear

## Testing Tools

### Chrome DevTools
1. Open DevTools (F12)
2. Click Device Toolbar icon (Ctrl+Shift+M)
3. Select preset devices:
   - Galaxy S5 (360px)
   - iPhone 12 (390px, close to 375px)
   - iPad (768px)
4. Test both portrait and landscape

### Manual Testing
1. Test on actual devices if available
2. Rotate device to test orientation changes
3. Test with zoom at 200% to check accessibility
4. Test with slow 3G network to see loading states

## Common Mobile Issues & Fixes

### Issue: Horizontal Scroll on Mobile
**Cause:** Content wider than viewport
**Fix:** 
- Add `max-width: 100%` to containers
- Use `overflow-x: hidden` on body as last resort
- Check grid gaps and padding

### Issue: Buttons Too Small on Mobile
**Cause:** Insufficient touch target size
**Fix:**
- Ensure buttons are at least 44px × 44px
- Use padding instead of relying only on font size
- Test with actual touch on device

### Issue: Text Too Small on Mobile
**Cause:** Font sizes not scaled for mobile
**Fix:**
- Use responsive font sizes (e.g., `text-tc-body` scales)
- Ensure minimum 14px for body text
- Use `clamp()` for fluid typography

### Issue: Images Overflow Container
**Cause:** Fixed image widths
**Fix:**
- Use `max-width: 100%`
- Use `aspect-ratio` CSS property
- Test with different image sizes

### Issue: Filter Sidebar Overlaps Content on Mobile
**Cause:** Sidebar not hidden/repositioned for mobile
**Fix:**
- Hide sidebar on mobile (`hidden-mobile` utility)
- Use bottom drawer or modal for filters
- Collapse into accordion on small screens

## Performance on Mobile

### Loading Performance
- [ ] First Contentful Paint (FCP): < 2.5s on 4G
- [ ] Largest Contentful Paint (LCP): < 4s on 4G
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Time to Interactive (TTI): < 5s

### Network Throttling
1. Open DevTools Network tab
2. Select "Slow 4G" or "Fast 3G"
3. Reload page and verify:
   - [ ] Content loads progressively
   - [ ] Critical content visible before other elements
   - [ ] Images lazy-load appropriately
   - [ ] No long loading spinners (> 3 seconds)

### Optimization Checks
- [ ] Images optimized (WebP, appropriate sizes)
- [ ] CSS minified and bundled
- [ ] JavaScript code-split appropriately
- [ ] No render-blocking resources
- [ ] Cache headers properly set

## Accessibility on Mobile

### Screen Reader Testing (iOS VoiceOver, Android TalkBack)
- [ ] All interactive elements announced correctly
- [ ] Form labels associated with inputs
- [ ] Headings hierarchical (h1 > h2 > h3)
- [ ] Alt text present for images
- [ ] Focus order logical and visible

### Keyboard Navigation
- [ ] All interactive elements reachable via keyboard
- [ ] Focus visible on all buttons/links
- [ ] No focus traps
- [ ] Tab order logical

### Color & Contrast
- [ ] Text has 4.5:1 contrast on mobile (same as desktop)
- [ ] Don't rely on color alone to convey info
- [ ] Links distinguished from surrounding text

## Landscape Orientation Testing

### 360 × 640 (Portrait) → 640 × 360 (Landscape)
- [ ] Content doesn't require horizontal scroll
- [ ] Columns adjust to fit width
- [ ] Buttons remain easily tappable
- [ ] Images scale appropriately

### 375 × 812 (Portrait) → 812 × 375 (Landscape)
- [ ] Same checks as above
- [ ] Navigation remains accessible
- [ ] Forms remain usable

### 768 × 1024 (Portrait) → 1024 × 768 (Landscape)
- [ ] Layout may approach desktop
- [ ] Content appropriately spaced
- [ ] No unnecessary columns lost

## Sign-Off Checklist

### Before Launch
- [ ] All 360px tests passing ✓
- [ ] All 375px tests passing ✓
- [ ] All 768px tests passing ✓
- [ ] No horizontal scrolling on any viewport ✓
- [ ] All buttons meet 44px minimum ✓
- [ ] Images display correctly on all sizes ✓
- [ ] Accessibility verified (keyboard, screen reader) ✓
- [ ] Performance acceptable on 4G network ✓
- [ ] Orientation changes handled gracefully ✓
- [ ] Tested on actual devices ✓
- [ ] No layout shifts (CLS < 0.1) ✓

## Notes

- **Progressive Enhancement**: Core content accessible on all devices, enhanced experience on larger screens
- **Mobile-First Approach**: Designed for mobile first, enhanced for tablet/desktop
- **Testing Frequency**: Retest after any CSS or layout changes
- **Device Rotation**: Test both portrait and landscape modes
- **Real Devices**: Virtual testing is good, but test on real devices when possible

---

**Phase 10 Status**: Testing guide created. Implementation team should follow this checklist for comprehensive mobile validation.
