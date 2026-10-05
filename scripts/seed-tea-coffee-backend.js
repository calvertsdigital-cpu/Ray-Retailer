#!/usr/bin/env node

/**
 * Tea & Coffee Backend Seeding Script
 * 
 * This script seeds 17 tea-coffee products into the Ray-wholsell-1 backend MongoDB.
 * Run this AFTER the backend schema has been extended with new fields.
 * 
 * Usage:
 *   node scripts/seed-tea-coffee-backend.js
 * 
 * Or from Ray-wholsell-1 backend directory:
 *   node ../Ray-Retailer/scripts/seed-tea-coffee-backend.js
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

// ══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

const BACKEND_URL = process.env.BACKEND_URL || 'https://ray-wholsell.onrender.com';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN; // Set this before running

// ══════════════════════════════════════════════════════════════════════════════
// LOAD CSV DATA
// ══════════════════════════════════════════════════════════════════════════════

const csvPath = path.join(__dirname, '../src/data/tea-coffee/csv/tea-coffee-seed.csv');

console.log('📖 Reading CSV file:', csvPath);

const csvContent = fs.readFileSync(csvPath, 'utf-8');
const records = csv.parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});

console.log(`✅ Loaded ${records.length} records from CSV\n`);

// ══════════════════════════════════════════════════════════════════════════════
// CSV → BACKEND PRODUCT RECORD TRANSFORMATION
// ══════════════════════════════════════════════════════════════════════════════

function transformCsvToBackendProduct(csvRecord) {
  return {
    name: csvRecord.name,
    description: csvRecord.short_description,
    department: 'tea-coffee',
    productType: csvRecord.product_type, // "tea" or "coffee"

    // Coffee-specific
    coffeeType: csvRecord.coffee_type || undefined,
    grindPreparation: csvRecord.grind_preparation || undefined,
    brewingMethod: csvRecord.brewing_method || undefined,

    // Tea-specific
    teaType: csvRecord.tea_type || undefined,
    botanicalFamily: csvRecord.botanical_family || undefined,
    steepingMethod: csvRecord.steeping_method || undefined,

    // Shared taxonomy
    relatedArticleSlug: csvRecord.related_article_slug || undefined,
    relatedHealthConcernSlug: csvRecord.related_health_concern_slug || undefined,
    relatedU20xChallenge: csvRecord.related_u20x_challenge || undefined,

    // Standard product fields
    price: parseFloat(csvRecord.price),
    compareAtPrice: csvRecord.compare_at_price ? parseFloat(csvRecord.compare_at_price) : undefined,
    inStock: csvRecord.in_stock === 'true',
    stock: csvRecord.in_stock === 'true' ? 100 : 0, // Default to 100 if in stock

    // Product details
    shortDescription: csvRecord.short_description,
    longDescription: csvRecord.long_description,
    ingredientsList: csvRecord.ingredients_list,
    preparation: csvRecord.preparation,
    storageInstructions: csvRecord.storage_instructions,
    caution: csvRecord.caution,

    // Media
    images: csvRecord.images,

    // Metadata
    flavorProfile: csvRecord.flavor_profile,
    origin: csvRecord.origin,
    size: csvRecord.size,

    // SEO
    seoTitle: csvRecord.seo_title,
    metaDescription: csvRecord.meta_description,

    // Flags
    isSample: csvRecord.is_sample === 'true',
    isBestSeller: csvRecord.is_best_seller === 'true',
    isNewArrival: csvRecord.is_new_arrival === 'true',

    // External ID (for reference)
    externalSlug: csvRecord.slug,
    rhlId: csvRecord.rhl_product_id,
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// SEED TO BACKEND
// ══════════════════════════════════════════════════════════════════════════════

async function seedBackend() {
  if (!ADMIN_TOKEN) {
    console.error(
      '❌ ADMIN_TOKEN environment variable not set.\n' +
      'Please set it before running this script:\n' +
      '  export ADMIN_TOKEN=your_admin_token\n' +
      '  node scripts/seed-tea-coffee-backend.js'
    );
    process.exit(1);
  }

  console.log(`🌐 Backend URL: ${BACKEND_URL}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const [index, csvRecord] of records.entries()) {
    const product = transformCsvToBackendProduct(csvRecord);

    try {
      console.log(`[${index + 1}/${records.length}] Creating: ${product.name}`);

      const response = await fetch(`${BACKEND_URL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'x-website-role': 'admin',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      const created = await response.json();
      console.log(`  ✅ Created (ID: ${created._id})\n`);
      successCount++;
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}\n`);
      errorCount++;
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '='.repeat(70));
  console.log(`📊 SUMMARY`);
  console.log('='.repeat(70));
  console.log(`✅ Successfully created: ${successCount} products`);
  console.log(`❌ Errors: ${errorCount} products`);
  console.log(`📈 Total: ${successCount + errorCount} / ${records.length}`);

  if (errorCount === 0) {
    console.log('\n🎉 All products seeded successfully!');
  } else {
    console.log(`\n⚠️  ${errorCount} products failed. Check backend logs for details.`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// RUN
// ══════════════════════════════════════════════════════════════════════════════

seedBackend().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
