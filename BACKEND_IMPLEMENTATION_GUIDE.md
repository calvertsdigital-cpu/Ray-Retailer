# Backend Implementation Guide — Tea & Coffee Integration

## Quick Start

This guide explains what needs to be done on the **Ray-wholsell-1 backend** to support Phase 4 integration.

---

## Step 1: Schema Update (10 minutes)

### Location
File: `ray-wholsell-1/models/Product.js` (or equivalent Mongoose model)

### What to Add

Add these fields to the Product schema:

```javascript
// Tea & Coffee department fields
department: {
  type: String,
  enum: ["supplements", "tea-coffee", "wholesale"],
  default: null
},
productType: {
  type: String,
  enum: ["tea", "coffee"],
  default: null
},

// Coffee-specific
coffeeType: {
  type: String,
  enum: ["arabica", "robusta", "culi"],
  default: null
},
grindPreparation: {
  type: String,
  enum: ["whole-bean", "medium-ground", "fine-specialty-grind"],
  default: null
},
brewingMethod: String,

// Tea-specific
teaType: {
  type: String,
  enum: [
    "loose-botanical-leaves",
    "herbal-teas",
    "flowers",
    "roots",
    "stems-traditional-botanicals",
    "botanical-powders",
    "tea-accessories"
  ],
  default: null
},
botanicalFamily: String,
steepingMethod: String,

// Taxonomy links
relatedArticleSlug: String,
relatedHealthConcernSlug: String,
relatedU20xChallenge: String
```

### Verify
- Restart backend server
- No migration needed (fields are optional, default to null)
- Existing products unaffected

---

## Step 2: Update API Routes (15 minutes)

### Ensure GET /api/user/catalog/products Returns New Fields

Verify the response includes the new fields:

```json
{
  "_id": "...",
  "name": "Arabica Reserve — Whole Bean",
  "department": "tea-coffee",
  "productType": "coffee",
  "coffeeType": "arabica",
  "grindPreparation": "whole-bean",
  "brewingMethod": "French press or pour-over — 94 °C — 4 min",
  "price": 18.95,
  "teaType": null,
  "botanicalFamily": null,
  "steepingMethod": null,
  "relatedArticleSlug": "coffee-preparation-guide",
  "relatedHealthConcernSlug": null,
  "relatedU20xChallenge": "morning-coffee-ritual"
}
```

### Ensure Filtering Works

Test these query patterns:

```bash
# Get all tea-coffee products
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee"

# Get only tea
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee&productType=tea"

# Get only coffee
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee&productType=coffee"

# Get Arabica coffee only
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee&coffeeType=arabica"

# Get whole bean coffee
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee&grindPreparation=whole-bean"
```

All should return results with proper filtering.

---

## Step 3: Data Seeding (30 minutes)

### Option A: Use Provided Script (Recommended)

```bash
# From Ray-Retailer directory:
export ADMIN_TOKEN=your_backend_admin_token_here
node scripts/seed-tea-coffee-backend.js
```

**Requirements:**
- `csv-parse` package installed on backend (or install temporarily)
- Admin token with write permissions
- Script reads from `src/data/tea-coffee/csv/tea-coffee-seed.csv`

**What it does:**
- Reads 17 rows from CSV
- Transforms each to backend Product record format
- POSTs to `POST /api/admin/products` endpoint
- Logs success/error for each

### Option B: Manual Postman Collection

Create 17 POST requests to `POST /api/admin/products` with bodies like:

```json
{
  "name": "Arabica Reserve — Whole Bean",
  "department": "tea-coffee",
  "productType": "coffee",
  "coffeeType": "arabica",
  "grindPreparation": "whole-bean",
  "brewingMethod": "French press or pour-over — 94 °C — 4 min",
  "price": 18.95,
  "description": "Single-origin Arabica whole bean. Roasted in small batches for freshness.",
  "inStock": true,
  "stock": 100,
  "relatedArticleSlug": "coffee-preparation-guide",
  "relatedU20xChallenge": "morning-coffee-ritual"
}
```

See `BACKEND_SCHEMA_SPEC.md` for all 17 product examples.

### Option C: MongoDB Direct Insert

If you have direct MongoDB access:

```javascript
// Connect to MongoDB and run:
db.products.insertMany([
  {
    name: "Arabica Reserve — Whole Bean",
    department: "tea-coffee",
    productType: "coffee",
    // ... other fields ...
  },
  // ... 16 more products ...
]);
```

---

## Step 4: Verification (10 minutes)

### Test Queries

Run these to verify data was seeded correctly:

```bash
# Should return 17 products
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee"

# Should return ~8 tea products
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee&productType=tea"

# Should return ~9 coffee products
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee&productType=coffee"

# Should return 3 Arabica products
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee&coffeeType=arabica"

# Should return 3 whole-bean products (1 per coffee type)
curl "https://ray-wholsell.onrender.com/api/user/catalog/products?department=tea-coffee&grindPreparation=whole-bean"
```

### Checklist
- [ ] 17 products created
- [ ] All new fields present in responses
- [ ] Filtering by department works
- [ ] Filtering by productType works
- [ ] Filtering by coffeeType works
- [ ] Filtering by grindPreparation works
- [ ] Filtering by teaType works
- [ ] Filtering by botanicalFamily works (if applicable)
- [ ] Optional fields are null when not set

---

## Step 5: Frontend Integration (Ray-Retailer)

Once backend is ready, Ray-Retailer will:

1. **Update API client** (`src/lib/api.ts`)
   - Add BackendProduct interface fields
   - Add `fetchTeaCoffeeProducts()` function
   - Add `fetchTeaCoffeeProductBySlug()` function

2. **Refactor routes** to use backend API
   - `/tea-coffee` — fetch all, filter frontend
   - `/tea-coffee/tea` — fetch by productType=tea
   - `/tea-coffee/coffee` — fetch by productType=coffee
   - `/tea-coffee/products/$slug` — fetch by slug (if indexed on backend)

3. **Implement fallback** to CSV if backend unavailable

---

## Troubleshooting

### Products not showing up?

1. Check backend logs for errors
2. Verify schema was updated correctly
3. Verify new fields are in MongoDB
4. Test filtering with curl (see Verification above)
5. Check for typos in field names (case-sensitive)

### Filtering not working?

1. Verify MongoDB indexes exist on filter fields (optional but recommended)
2. Check backend API implementation handles query parameters
3. Test with simple filters first, then complex ones

### Response missing new fields?

1. Verify schema was updated in `Product.js`
2. Verify backend restarted after schema change
3. Check API response selector (may need to explicitly include new fields)

### Script fails to authenticate?

1. Verify ADMIN_TOKEN is valid
2. Check token has write permissions (`admin` role)
3. Verify Authorization header format is correct

---

## API Reference

### GET /api/user/catalog/products

**Query Parameters:**
- `department=tea-coffee` — Filter by department
- `productType=tea|coffee` — Filter by type
- `coffeeType=arabica|robusta|culi` — Filter by coffee family
- `grindPreparation=whole-bean|medium-ground|fine-specialty-grind` — Filter by grind
- `teaType=loose-botanical-leaves|...` — Filter by tea type
- `botanicalFamily=Asteraceae` — Filter by botanical family
- `limit=50` — Limit results (default 50)
- `page=1` — Pagination

**Response:**
```json
{
  "data": [
    {
      "_id": "...",
      "name": "...",
      "department": "tea-coffee",
      "productType": "coffee",
      "coffeeType": "arabica",
      "grindPreparation": "whole-bean",
      "brewingMethod": "...",
      "price": 18.95,
      // ... all fields ...
    }
  ],
  "total": 17,
  "page": 1,
  "limit": 50
}
```

### POST /api/admin/products

**Headers:**
- `Authorization: Bearer <ADMIN_TOKEN>`
- `Content-Type: application/json`
- `x-website-role: admin`

**Body:** Product object (see examples above)

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "...",
  "created": true
}
```

---

## Completion Checklist

✅ Schema updated in Product.js  
✅ Backend restarted  
✅ New fields appear in API responses  
✅ Filtering works for all new fields  
✅ 17 tea-coffee products seeded  
✅ Verification queries return correct results  
✅ Documentation updated in Swagger/API docs  

**Status: Ready for Ray-Retailer frontend integration**

---

## Next Steps

Once this is complete, notify the Ray-Retailer team to proceed with:
- Task 4B: API Client Enhancement
- Task 4C: Backend Data Migration (verify here)
- Task 4D: Route Refactor
