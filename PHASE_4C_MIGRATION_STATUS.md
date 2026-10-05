# Phase 4C: Backend Data Migration Status

**Date:** October 5, 2026  
**Status:** ⏳ Ready for Backend Team Execution  
**Target:** ray-wholsell-1 MongoDB Backend  
**Products to Migrate:** 17 Tea & Coffee products

---

## Summary

Task 4C is a backend team responsibility. The frontend team (Tasks 4A & 4B) has provided:

1. ✅ **Complete schema specification** (BACKEND_SCHEMA_SPEC.md)
   - 11 new tea-coffee fields documented with examples
   - Data types, validation rules, and filtering patterns specified

2. ✅ **Implementation guide** (BACKEND_IMPLEMENTATION_GUIDE.md)
   - Step-by-step schema update instructions
   - Verification queries to confirm schema changes
   - Data migration strategy

3. ✅ **Automated seeding script** (scripts/seed-tea-coffee-backend.js)
   - Reads 17 products from CSV source
   - Transforms CSV format to backend product schema
   - Posts to `/api/admin/products` endpoint
   - Includes error handling and progress logging

4. ✅ **Enhanced API client** (src/lib/api.ts)
   - New `fetchTeaCoffeeProducts()` function for filtered queries
   - New `fetchTeaCoffeeProductBySlug()` function for product lookup
   - BackendProduct interface extended with 11 new tea-coffee fields

---

## Backend Team Checklist

### Prerequisites
- [ ] Backend schema has been extended (Phase 4A)
- [ ] All 11 new fields are in Product model
- [ ] MongoDB indexes updated if needed
- [ ] Admin API token available

### Migration Execution
- [ ] Environment variable ADMIN_TOKEN set
- [ ] Run seeding script: `node scripts/seed-tea-coffee-backend.js`
- [ ] Script completes with 17/17 products created
- [ ] No HTTP errors in console output

### Post-Migration Verification
- [ ] `db.products.countDocuments({ department: "tea-coffee" })` returns 17
- [ ] 9 coffee products verified with `productType: "coffee"`
- [ ] 8 tea products verified with `productType: "tea"`
- [ ] All products have complete tea-coffee fields populated
- [ ] `/api/user/catalog/products?department=tea-coffee` returns all 17 products
- [ ] Health concern mappings verified (all 17 have relatedHealthConcernSlug)
- [ ] Article mappings verified (all 17 have relatedArticleSlug)

---

## CSV Source Data

**Location:** `src/data/tea-coffee/csv/tea-coffee-seed.csv`

**17 Products:**

**Coffee (9):**
1. Single-Origin Ethiopian Coffee
2. Colombian Cold Brew Coffee
3. Brazilian Espresso Blend
4. Vietnamese Dark Roast
5. Kenya AA Coffee
6. Sumatra Mandheling Coffee
7. Kenyan Cold Brew
8. Medium Roast Arabica
9. Costa Rican Coffee

**Tea (8):**
1. Green Jasmine Tea
2. Black English Breakfast
3. Oolong White Peony
4. Chamomile Herbal Blend
5. Pu-erh Aged Tea
6. Sencha Green Tea
7. Rooibos Red Bush Tea
8. Mint Green Tea Blend

---

## Seeding Script Details

**File:** `scripts/seed-tea-coffee-backend.js`

**What it does:**
1. Reads CSV file from `src/data/tea-coffee/csv/tea-coffee-seed.csv`
2. Parses 17 product records
3. Transforms each CSV row to backend Product schema
4. POSTs to `{BACKEND_URL}/api/admin/products` with admin auth
5. Logs creation progress and errors
6. Provides summary report

**Usage:**
```bash
export ADMIN_TOKEN="your_admin_token_here"
node scripts/seed-tea-coffee-backend.js
```

**Configuration:**
- `BACKEND_URL`: Defaults to `https://ray-wholsell.onrender.com`
- `ADMIN_TOKEN`: Must be set via environment variable
- Rate limiting: 100ms delay between requests

---

## Frontend Readiness

**After 4C completes:**

1. ✅ Task 4D (Route Refactor) — 4 routes will use new backend API functions
   - tea-coffee.index.tsx
   - tea-coffee.tea.tsx
   - tea-coffee.coffee.tsx
   - tea-coffee.products.$slug.tsx

2. ✅ Task 4E (Fallback & Error Handling) — Graceful offline mode with CSV fallback

3. ✅ Task 4G (Testing & Verification) — QA with live backend data

---

## Dependencies

**Frontend → Backend:**
- Frontend awaits Task 4C completion before starting 4D
- Routes currently use local CSV loader as temporary fallback
- Backend API must be accessible and returning 17 tea-coffee products
- All 11 new fields must be populated in database

**API Functions Ready:**
- `fetchTeaCoffeeProducts(options)` — Filters by type, method, price, health concern
- `fetchTeaCoffeeProductBySlug(slug)` — Lookup single product with validation

---

## Success Criteria

✅ Migration succeeds when:

1. All 17 products created in MongoDB
2. 9 coffee products with coffee-specific fields
3. 8 tea products with tea-specific fields
4. All products visible via `/api/user/catalog/products?department=tea-coffee`
5. Frontend can fetch and display products without errors
6. Mobile UI renders product cards correctly
7. Filters work with backend query parameters

---

## Timeline

- **2026-10-05:** Task 4A & 4B Complete, Migration Checklist Ready
- **Next:** Backend executes Task 4C (target: within 1 week)
- **After:** Frontend resumes with Task 4D (Route Refactor)

---

**Contact:** Frontend Team  
**Questions?** Check PHASE_4_BACKEND_INTEGRATION_GUIDE.md for more details
