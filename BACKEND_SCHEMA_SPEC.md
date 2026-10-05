# Backend Schema Extension — Tea & Coffee Fields

## Overview

This document specifies the new fields required in the backend MongoDB `products` collection to support the Ray's Healthy Living Tea & Coffee department (Phase 4).

All fields are **optional** to avoid breaking existing product records for other departments (supplements, etc.).

---

## MongoDB Product Schema Extension

### New Fields

```javascript
{
  // ... existing fields (name, price, description, category, etc.) ...

  // ══════════════════════════════════════════════════════════════════
  // TEA & COFFEE DEPARTMENT FIELDS (NEW)
  // ══════════════════════════════════════════════════════════════════

  // Department classification
  department: {
    type: String,
    enum: ["supplements", "tea-coffee", "wholesale"],
    required: false,
    default: null,
    description: "Product department. Use 'tea-coffee' for tea/coffee products."
  },

  // Product type within department
  productType: {
    type: String,
    enum: ["tea", "coffee"],
    required: false,
    default: null,
    description: "Distinguishes tea from coffee. Only relevant when department='tea-coffee'."
  },

  // ══════════════════════════════════════════════════════════════════
  // COFFEE-SPECIFIC FIELDS (leave null for tea products)
  // ══════════════════════════════════════════════════════════════════

  coffeeType: {
    type: String,
    enum: ["arabica", "robusta", "culi"],
    required: false,
    default: null,
    description: "Coffee family. Arabica (green, #2d6a3f), Robusta (dark red, #7f1d1d), Culi (gold, #92400e)."
  },

  grindPreparation: {
    type: String,
    enum: ["whole-bean", "medium-ground", "fine-specialty-grind"],
    required: false,
    default: null,
    description: "Grind level. Only relevant when productType='coffee'."
  },

  brewingMethod: {
    type: String,
    required: false,
    default: null,
    example: "French press or pour-over — 94 °C — 4 min",
    description: "Recommended brewing method and temperature for coffee."
  },

  // ══════════════════════════════════════════════════════════════════
  // TEA-SPECIFIC FIELDS (leave null for coffee products)
  // ══════════════════════════════════════════════════════════════════

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
    required: false,
    default: null,
    description: "Tea sub-department. Only relevant when productType='tea'."
  },

  botanicalFamily: {
    type: String,
    required: false,
    default: null,
    example: "Asteraceae",
    description: "Botanical plant family. Used for tea filtering and educational content."
  },

  steepingMethod: {
    type: String,
    required: false,
    default: null,
    example: "1 tsp per 240 ml — steep 5–7 min — 95 °C",
    description: "Recommended steeping method and temperature for tea."
  },

  // ══════════════════════════════════════════════════════════════════
  // SHARED TAXONOMY LINKS
  // ══════════════════════════════════════════════════════════════════

  relatedArticleSlug: {
    type: String,
    required: false,
    default: null,
    example: "tea-preparation-guide",
    description: "Slug of a related article (if any). Used on product detail pages."
  },

  relatedHealthConcernSlug: {
    type: String,
    required: false,
    default: null,
    example: "sleep",
    description: "Slug of a related health concern page. Used to link product to wellness focus."
  },

  relatedU20xChallenge: {
    type: String,
    required: false,
    default: null,
    example: "morning-coffee-ritual",
    description: "Slug of a U20X™ challenge. If set, U20XBridge component renders on product detail page."
  }
}
```

---

## Mongoose Schema Update

### Example Mongoose Schema Definition

```javascript
// In Ray-wholsell-1 backend: models/Product.js or similar

const productSchema = new Schema({
  // ... existing fields ...

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
});
```

---

## Migration Steps

### Step 1: Update Schema in Backend

1. Open `ray-wholsell-1/models/Product.js`
2. Add the new fields shown above to the schema
3. No migration needed for existing records (all fields are optional, will default to `null`)
4. Restart backend server

### Step 2: Seed Tea & Coffee Products

See **4C — Backend Data Migration** task for seed data.

### Step 3: Update API Documentation

- Document new fields in API spec / Swagger docs
- Document filtering by `department`, `productType`, `coffeeType`, `teaType`

---

## API Filtering Examples

### Fetch all tea-coffee products
```
GET /api/user/catalog/products?department=tea-coffee
```

### Fetch only tea
```
GET /api/user/catalog/products?department=tea-coffee&productType=tea
```

### Fetch only coffee, specific type
```
GET /api/user/catalog/products?department=tea-coffee&productType=coffee&coffeeType=arabica
```

### Fetch coffee by grind
```
GET /api/user/catalog/products?department=tea-coffee&productType=coffee&grindPreparation=whole-bean
```

### Fetch tea by type
```
GET /api/user/catalog/products?department=tea-coffee&productType=tea&teaType=flowers
```

---

## Data Examples

### Coffee Product Record

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Arabica Reserve — Whole Bean",
  "department": "tea-coffee",
  "productType": "coffee",
  "coffeeType": "arabica",
  "grindPreparation": "whole-bean",
  "brewingMethod": "French press or pour-over — 94 °C — 4 min",
  "price": 18.95,
  "stock": 100,
  "description": "Single-origin Arabica whole bean. Roasted in small batches for freshness.",
  "relatedArticleSlug": "coffee-preparation-guide",
  "relatedU20xChallenge": "morning-coffee-ritual",
  "variants": [ ... ]
}
```

### Tea Product Record

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Chamomile Loose Botanical Leaves",
  "department": "tea-coffee",
  "productType": "tea",
  "teaType": "loose-botanical-leaves",
  "botanicalFamily": "Asteraceae",
  "steepingMethod": "1 tsp per 240 ml — steep 5–7 min — 95 °C",
  "price": 12.95,
  "stock": 50,
  "description": "Whole dried chamomile flowers sourced from European growers.",
  "relatedArticleSlug": "tea-preparation-guide",
  "relatedHealthConcernSlug": "sleep",
  "variants": [ ... ]
}
```

---

## Backward Compatibility

✅ **Fully backward compatible** — All new fields are optional (default to `null`).

- Existing product records require **no changes**.
- Queries that don't filter by new fields will return all products as before.
- New fields only used when explicitly filtered or when `department="tea-coffee"`.

---

## Testing Checklist

After implementing schema extension:

- [ ] Create a tea product with all fields populated
- [ ] Create a coffee product with all fields populated
- [ ] Verify filters work: `?department=tea-coffee`, `?productType=tea`, `?coffeeType=arabica`
- [ ] Verify new fields return in API response
- [ ] Verify existing products still query correctly (don't break)
- [ ] Verify optional fields can be null/undefined
- [ ] Test MongoDB indexes on new fields if needed for performance

---

## Next Steps

1. **Backend team** implements schema extension (Step 1)
2. **Backend team** seeds 17 tea-coffee products (Task 4C)
3. **Ray-Retailer** updates API client (Task 4B)
4. **Ray-Retailer** refactors routes to use API (Task 4D)
