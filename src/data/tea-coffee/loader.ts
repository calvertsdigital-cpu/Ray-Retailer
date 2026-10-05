/**
 * Tea & Coffee CSV Loader
 * Ray's Healthy Living® Retailer
 *
 * Parses tea-coffee-seed.csv into a typed TeaCoffeeCatalog.
 * Handles all field mappings and type coercions.
 *
 * CSV columns map 1-to-1 with TeaCoffeeProduct fields:
 *   id, rhl_product_id, slug, name, department, product_type, coffee_type,
 *   grind_preparation, brewing_method, tea_type, botanical_family,
 *   steeping_method, flavor_profile, origin, size, price, compare_at_price,
 *   in_stock, short_description, long_description, ingredients_list,
 *   preparation, storage_instructions, caution, images,
 *   related_article_slug, related_health_concern_slug, related_u20x_challenge,
 *   is_sample, is_best_seller, is_new_arrival, seo_title, meta_description
 */

import type { TeaCoffeeProduct, TeaCoffeeCatalog, CoffeeType, GrindPreparation, TeaType } from "./types";

/**
 * Parse a single CSV row into a TeaCoffeeProduct.
 * Handles empty fields, type coercions, and field splitting (pipe-separated images).
 */
export function parseTeaCoffeeRow(record: Record<string, string>): TeaCoffeeProduct {
  // Parse images: pipe-separated list; split into array
  const imageString = record.images || "";
  const images = imageString
    .split("|")
    .map((img) => img.trim())
    .filter((img) => img.length > 0);

  // Parse numeric and boolean fields
  const price = parseFloat(record.price) || 0;
  const compareAtPrice = record.compare_at_price ? parseFloat(record.compare_at_price) : null;
  const inStock = record.in_stock?.toLowerCase() === "true";
  const isSample = record.is_sample?.toLowerCase() === "true";
  const isBestSeller = record.is_best_seller?.toLowerCase() === "true";
  const isNewArrival = record.is_new_arrival?.toLowerCase() === "true";

  // Return fully typed product
  const product: TeaCoffeeProduct = {
    id: record.id || "",
    rhlProductId: record.rhl_product_id || "",
    slug: record.slug || "",
    name: record.name || "",
    department: "tea-coffee",
    productType: (record.product_type || "tea") as "tea" | "coffee",
    coffeeType: (record.coffee_type || "") as CoffeeType | "",
    grindPreparation: (record.grind_preparation || "") as GrindPreparation | "",
    brewingMethod: record.brewing_method || "",
    teaType: (record.tea_type || "") as TeaType | "",
    botanicalFamily: record.botanical_family || "",
    steepingMethod: record.steeping_method || "",
    flavorProfile: record.flavor_profile || "",
    origin: record.origin || "",
    size: record.size || "",
    price,
    compareAtPrice,
    inStock,
    shortDescription: record.short_description || "",
    longDescription: record.long_description || "",
    ingredientsList: record.ingredients_list || "",
    preparation: record.preparation || "",
    storageInstructions: record.storage_instructions || "",
    caution: record.caution || "",
    images,
    relatedArticleSlug: record.related_article_slug || "",
    relatedHealthConcernSlug: record.related_health_concern_slug || "",
    relatedU20xChallenge: record.related_u20x_challenge || "",
    isSample,
    isBestSeller,
    isNewArrival,
    seoTitle: record.seo_title || "",
    metaDescription: record.meta_description || "",
  };

  return product;
}

/**
 * Parse CSV text into a TeaCoffeeCatalog.
 * Skips lines starting with # (comments).
 * First non-comment line is assumed to be the header.
 */
export function parseTeaCoffeeCsv(csvText: string): TeaCoffeeCatalog {
  const lines = csvText.split("\n").filter((line) => line.trim().length > 0 && !line.trim().startsWith("#"));

  if (lines.length < 2) {
    console.warn("Tea & Coffee CSV: Expected at least a header and one data row. Got:", lines.length);
    return {
      products: [],
      coffeeTypes: [],
      teaTypes: [],
      sampleCount: 0,
    };
  }

  // Parse header
  const headerLine = lines[0];
  const headers = headerLine.split(",").map((h) => h.trim().toLowerCase());

  // Parse data rows
  const products: TeaCoffeeProduct[] = [];
  let sampleCount = 0;
  const coffeeTypesSet = new Set<CoffeeType>();
  const teaTypesSet = new Set<TeaType>();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = parseCSVLine(line);

    // Map values to header keys
    const record: Record<string, string> = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx] || "";
    });

    try {
      const product = parseTeaCoffeeRow(record);
      products.push(product);

      if (product.isSample) {
        sampleCount++;
      }

      // Collect unique coffee and tea types
      if (product.coffeeType) {
        coffeeTypesSet.add(product.coffeeType);
      }
      if (product.teaType) {
        teaTypesSet.add(product.teaType);
      }
    } catch (error) {
      console.error(`Tea & Coffee CSV: Failed to parse row ${i + 1}:`, error);
    }
  }

  return {
    products,
    coffeeTypes: Array.from(coffeeTypesSet) as CoffeeType[],
    teaTypes: Array.from(teaTypesSet) as TeaType[],
    sampleCount,
  };
}

/**
 * Simple CSV parser that handles quoted fields and commas within quotes.
 * Returns array of trimmed field values.
 */
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      // End of field
      fields.push(currentField.trim());
      currentField = "";
    } else {
      currentField += char;
    }
  }

  // Add final field
  fields.push(currentField.trim());

  return fields;
}

/**
 * Load the tea-coffee-seed.csv from the inline data string.
 * This function is called at app initialization to populate the catalog.
 */
export function loadTeaCoffeeCatalogFromSeed(): TeaCoffeeCatalog {
  // In a real app, this would be imported as a string from the CSV file
  // or fetched from an API. For now, we return the SEED_CSV string below.
  return parseTeaCoffeeCsv(SEED_CSV);
}

/**
 * In-memory seed data for development/preview.
 * In production, replace this with a database query or API call.
 *
 * This is the tea-coffee-seed.csv data embedded as a string.
 * See src/data/tea-coffee/csv/tea-coffee-seed.csv for the source.
 */
const SEED_CSV = `id,rhl_product_id,slug,name,department,product_type,coffee_type,grind_preparation,brewing_method,tea_type,botanical_family,steeping_method,flavor_profile,origin,size,price,compare_at_price,in_stock,short_description,long_description,ingredients_list,preparation,storage_instructions,caution,images,related_article_slug,related_health_concern_slug,related_u20x_challenge,is_sample,is_best_seller,is_new_arrival,seo_title,meta_description
TC-C-001,RHL-TC-001,arabica-reserve-whole-bean,Arabica Reserve — Whole Bean,tea-coffee,coffee,arabica,whole-bean,French press or pour-over — 94 °C — 4 min,,,,Smooth and balanced with mild acidity,Ethiopia,250 g,18.95,,true,A smooth medium-roast whole bean Arabica coffee.,Single-origin Arabica whole bean. Roasted in small batches for freshness.,100% Arabica coffee beans,Grind immediately before brewing. Coarse for French press; medium for pour-over.,Store sealed in an airtight container away from heat and light.,Contains caffeine.,tea-coffee/placeholder-coffee-wb.svg,,,,true,true,false,Arabica Reserve Whole Bean | Ray's Healthy Living,Smooth single-origin Arabica whole bean coffee from Ray's Healthy Living.
TC-C-002,RHL-TC-002,arabica-reserve-medium-ground,Arabica Reserve — Medium/Ground,tea-coffee,coffee,arabica,medium-ground,Drip machine or Moka pot — 90–94 °C — 5 min,,,,Smooth and balanced with mild acidity,Ethiopia,250 g,17.95,,true,Pre-ground Arabica coffee for everyday drip brewing.,Same single-origin Arabica blend as the whole bean; pre-ground at medium fineness for consistent drip results.,100% Arabica coffee beans — medium grind,Measure 2 tablespoons per 180 ml water. Adjust to taste.,Store in an airtight container away from heat and light.,Contains caffeine.,tea-coffee/placeholder-coffee-ground.svg,,,,true,false,false,Arabica Reserve Medium Ground Coffee | Ray's Healthy Living,Pre-ground medium-roast Arabica coffee for everyday drip brewing.
TC-C-003,RHL-TC-003,arabica-reserve-fine-specialty-grind,Arabica Reserve — Fine/Specialty Grind,tea-coffee,coffee,arabica,fine-specialty-grind,Espresso machine or AeroPress — 93 °C — 25–30 sec,,,,Smooth and balanced with mild acidity,Ethiopia,250 g,17.95,,true,Fine-ground Arabica coffee for espresso and specialty brewing.,The same single-origin Arabica blend ground to a fine fineness suited to espresso extraction and AeroPress.,100% Arabica coffee beans — fine grind,Use 7–9 g per shot. Tamp evenly. Extract at 9 bar for 25–30 seconds.,Store in an airtight container away from heat and light.,Contains caffeine.,tea-coffee/placeholder-coffee-fine.svg,,,,true,false,true,Arabica Reserve Fine Specialty Grind | Ray's Healthy Living,Fine-ground single-origin Arabica for espresso and specialty brewing.
TC-C-004,RHL-TC-004,robusta-intense-whole-bean,Robusta Intense — Whole Bean,tea-coffee,coffee,robusta,whole-bean,French press or espresso — 95 °C — 4 min,,,,Bold and earthy with a strong finish,Vietnam,250 g,16.95,,true,A bold full-bodied whole bean Robusta coffee.,Single-origin Robusta whole bean with a characteristically strong and earthy profile. Higher natural caffeine content.,100% Robusta coffee beans,Grind just before use. Coarse for French press; fine for espresso.,Store sealed in an airtight container away from heat and light.,Contains caffeine. Higher caffeine content than Arabica varieties.,tea-coffee/placeholder-coffee-wb.svg,,,,true,false,false,Robusta Intense Whole Bean Coffee | Ray's Healthy Living,Bold full-bodied whole bean Robusta coffee from Ray's Healthy Living.
TC-C-005,RHL-TC-005,robusta-intense-medium-ground,Robusta Intense — Medium/Ground,tea-coffee,coffee,robusta,medium-ground,Drip machine or Moka pot — 92–95 °C — 5 min,,,,Bold and earthy with a strong finish,Vietnam,250 g,15.95,,true,Pre-ground bold Robusta coffee for a strong everyday brew.,Same single-origin Robusta blend ground at medium fineness for drip and Moka pot use.,100% Robusta coffee beans — medium grind,Use 2–3 tablespoons per 180 ml water depending on desired strength.,Store in an airtight container away from heat and light.,Contains caffeine. Higher caffeine content than Arabica varieties.,tea-coffee/placeholder-coffee-ground.svg,,,,true,false,false,Robusta Intense Medium Ground Coffee | Ray's Healthy Living,Pre-ground bold Robusta coffee for a strong everyday brew.
TC-C-006,RHL-TC-006,robusta-intense-fine-specialty-grind,Robusta Intense — Fine/Specialty Grind,tea-coffee,coffee,robusta,fine-specialty-grind,Espresso machine — 95 °C — 25–30 sec,,,,Bold and earthy with a strong finish,Vietnam,250 g,15.95,,true,Fine-ground Robusta for a bold espresso with a rich crema.,Same single-origin Robusta ground fine for espresso. Produces a rich crema and strong concentrated shot.,100% Robusta coffee beans — fine grind,Use 8–10 g per shot. Tamp firmly. Extract at 9 bar for 25–30 seconds.,Store in an airtight container away from heat and light.,Contains caffeine. Higher caffeine content than Arabica varieties.,tea-coffee/placeholder-coffee-fine.svg,,,,true,false,false,Robusta Intense Fine Specialty Grind | Ray's Healthy Living,Fine-ground Robusta coffee for bold espresso with a rich crema.
TC-C-007,RHL-TC-007,culi-select-peaberry-whole-bean,Culi Select — Peaberry Whole Bean,tea-coffee,coffee,culi,whole-bean,Pour-over or Chemex — 93 °C — 3–4 min,,,,Bright and complex with fruity notes,Vietnam,200 g,22.95,24.95,true,A rare single-seed peaberry whole bean coffee with a bright complex profile.,Peaberry beans form when only one seed develops inside the coffee cherry instead of two. This concentrates the flavour. Roasted in small batches.,100% Culi peaberry coffee beans,Grind medium-fine. Use a gooseneck kettle for consistent pour-over extraction.,Store in an airtight container away from heat and light.,Contains caffeine.,tea-coffee/placeholder-coffee-wb.svg,coffee-preparation-guide,,,true,true,true,Culi Select Peaberry Whole Bean Coffee | Ray's Healthy Living,Rare single-seed peaberry whole bean coffee with a bright complex profile.
TC-C-008,RHL-TC-008,culi-select-peaberry-medium-ground,Culi Select — Peaberry Medium/Ground,tea-coffee,coffee,culi,medium-ground,Drip machine or pour-over — 93 °C — 4 min,,,,Bright and complex with fruity notes,Vietnam,200 g,21.95,,true,Pre-ground peaberry Culi coffee for convenient pour-over or drip.,The same rare peaberry Culi blend pre-ground at medium fineness for home drip machines and manual pour-over.,100% Culi peaberry coffee beans — medium grind,Use 2 tablespoons per 180 ml water. Bloom 30 seconds with a small amount of hot water before full pour.,Store in an airtight container away from heat and light.,Contains caffeine.,tea-coffee/placeholder-coffee-ground.svg,,,,true,false,false,Culi Select Peaberry Medium Ground Coffee | Ray's Healthy Living,Pre-ground rare peaberry Culi coffee for drip and pour-over brewing.
TC-C-009,RHL-TC-009,culi-select-peaberry-fine-specialty-grind,Culi Select — Peaberry Fine/Specialty Grind,tea-coffee,coffee,culi,fine-specialty-grind,Espresso or AeroPress — 93 °C — 25–28 sec,,,,Bright and complex with fruity notes,Vietnam,200 g,21.95,,true,Fine-ground peaberry Culi for a vibrant specialty espresso.,Rare peaberry Culi beans ground fine to highlight the bright fruity notes in espresso or concentrated AeroPress extraction.,100% Culi peaberry coffee beans — fine grind,Use 7–8 g per shot. Extract at 9 bar for 25–28 seconds. Enjoy as espresso or with steamed milk.,Store in an airtight container away from heat and light.,Contains caffeine.,tea-coffee/placeholder-coffee-fine.svg,,,,true,false,false,Culi Select Peaberry Fine Specialty Grind | Ray's Healthy Living,Fine-ground rare peaberry Culi for a vibrant specialty espresso.
TC-T-001,RHL-TC-010,chamomile-loose-botanical,Chamomile Loose Botanical Leaves,tea-coffee,tea,,,,loose-botanical-leaves,Asteraceae,1 tsp per 240 ml — steep 5–7 min — 95 °C,Mild and floral with gentle sweetness,Germany,50 g,12.95,,true,Whole dried chamomile flowers for a mild and calming loose-leaf brew.,Whole dried chamomile flowers sourced from European growers. No added flavourings or fillers.,Chamomile flowers (Matricaria chamomilla),Measure 1 heaped teaspoon per cup. Steep in near-boiling water for 5–7 minutes. Strain before drinking.,Store in an airtight container away from moisture and direct light.,Consult a healthcare professional during pregnancy. Not intended to treat any condition.,tea-coffee/placeholder-tea-chamomile.svg,tea-preparation-guide,sleep,,true,true,false,Chamomile Loose Botanical Leaves | Ray's Healthy Living,Whole dried chamomile flowers for a mild and calming loose-leaf brew from Ray's Healthy Living.
TC-T-002,RHL-TC-011,peppermint-herbal-tea,Peppermint Herbal Tea — Cut & Sifted,tea-coffee,tea,,,,herbal-teas,Lamiaceae,1 tsp per 240 ml — steep 5 min — 95 °C,Fresh and cooling with a clean minty finish,USA,40 g,10.95,,true,Cut and sifted peppermint leaf for a refreshing caffeine-free herbal infusion.,Cut and sifted peppermint leaf with a clean fresh aroma. Caffeine-free. No added flavourings.,Peppermint leaf (Mentha × piperita),Use 1 teaspoon per cup. Steep in freshly boiled water for 5 minutes. Strain and enjoy.,Store in an airtight container away from moisture and direct light.,Not recommended for infants. Consult a healthcare professional during pregnancy.,tea-coffee/placeholder-tea-peppermint.svg,tea-preparation-guide,,,true,false,false,Peppermint Herbal Tea Cut Sifted | Ray's Healthy Living,Cut and sifted peppermint leaf for a refreshing caffeine-free herbal infusion.
TC-T-003,RHL-TC-012,hibiscus-flowers-loose,Hibiscus Flowers Loose,tea-coffee,tea,,,,flowers,Malvaceae,1 tbsp per 240 ml — steep 5–10 min — 95 °C,Tart and vibrant with a deep ruby colour,Egypt,50 g,11.95,,true,Whole dried hibiscus flowers for a deep ruby infusion with a naturally tart flavour.,Whole dried hibiscus flowers. No added flavourings. May be served hot or cold-steeped overnight.,Hibiscus flowers (Hibiscus sabdariffa),Use 1 tablespoon per cup. Steep 5–10 minutes for hot tea or cold-steep overnight in the refrigerator.,Store in an airtight container away from moisture and direct light.,May interact with certain medications. Consult a healthcare professional if relevant.,tea-coffee/placeholder-tea-hibiscus.svg,,,,true,false,true,Hibiscus Flowers Loose Tea | Ray's Healthy Living,Whole dried hibiscus flowers for a deep ruby infusion with a naturally tart flavour.
TC-T-004,RHL-TC-013,valerian-root-cut-sifted,Valerian Root — Cut & Sifted,tea-coffee,tea,,,,roots,Caprifoliaceae,1 tsp per 240 ml — steep 10 min — 90 °C,Earthy and mildly bitter,Europe,40 g,13.95,,true,Dried valerian root cut and sifted for a traditional earthy herbal infusion.,Dried valerian root with a characteristically earthy aroma. Traditionally used in herbal practice. No added flavourings.,Valerian root (Valeriana officinalis),Steep 1 teaspoon in water just off the boil for 10 minutes. Strain thoroughly before drinking.,Store in an airtight container away from moisture and direct light.,Consult a healthcare professional before use. Not intended to treat any condition. Avoid driving after use.,tea-coffee/placeholder-tea-root.svg,,sleep,,true,false,false,Valerian Root Cut Sifted Herbal Tea | Ray's Healthy Living,Dried valerian root cut and sifted for a traditional earthy herbal infusion.
TC-T-005,RHL-TC-014,lemongrass-stems-loose,Lemongrass Stems — Loose Cut,tea-coffee,tea,,,,stems-traditional-botanicals,Poaceae,1 tbsp per 240 ml — steep 5–7 min — 95 °C,Bright citrus and grassy,Thailand,50 g,9.95,,true,Dried lemongrass stems cut for a bright citrus herbal infusion.,Cut dried lemongrass stems with a naturally bright citrus and grassy aroma. Caffeine-free.,Lemongrass (Cymbopogon citratus),Use 1 tablespoon per cup. Steep in freshly boiled water for 5–7 minutes. Strain before drinking.,Store in an airtight container away from moisture and direct light.,Generally well tolerated. Consult a healthcare professional during pregnancy.,tea-coffee/placeholder-tea-lemongrass.svg,,,,true,false,false,Lemongrass Stems Loose Cut Tea | Ray's Healthy Living,Cut dried lemongrass stems for a bright citrus herbal infusion.
TC-T-006,RHL-TC-015,ashwagandha-botanical-powder,Ashwagandha Botanical Powder,tea-coffee,tea,,,,botanical-powders,Solanaceae,1/2 tsp per 240 ml — blend or whisk into warm liquid — 70 °C,Earthy and mildly bitter,India,100 g,16.95,,true,Ashwagandha root ground to a fine powder for blending into warm drinks.,Fine ashwagandha root powder. No additives or fillers. Dissolves best when blended or whisked into warm milk or water.,Ashwagandha root (Withania somnifera),Whisk or blend 1/2 teaspoon into warm milk or water. Consume within 15 minutes.,Store in an airtight container in a cool dry place away from direct light.,Consult a healthcare professional during pregnancy or if taking medication. Not intended to treat any condition.,tea-coffee/placeholder-tea-powder.svg,,,morning-coffee-ritual,true,false,false,Ashwagandha Botanical Powder | Ray's Healthy Living,Ashwagandha root powder for blending into warm drinks from Ray's Healthy Living.
TC-T-007,RHL-TC-016,bamboo-tea-strainer,Bamboo Tea Strainer & Infuser,tea-coffee,tea,,,,tea-accessories,,,,Handcrafted bamboo,One size,8.95,,true,A natural bamboo loose-leaf tea strainer that fits most standard mugs.,Handcrafted bamboo infuser basket. Fits mugs 7–9 cm in diameter. Rinse under warm water after each use.,Bamboo,Place over cup. Add loose-leaf tea. Pour hot water through. Remove after desired steeping time.,Rinse after use. Air dry. Do not soak for extended periods.,Not for dishwasher use.,tea-coffee/placeholder-tea-accessory.svg,,,,true,false,false,Bamboo Tea Strainer Infuser | Ray's Healthy Living,Natural bamboo loose-leaf tea strainer for standard mugs from Ray's Healthy Living.
TC-T-008,RHL-TC-017,elderflower-loose-botanical,Elderflower Loose Botanical,tea-coffee,tea,,,,flowers,Adoxaceae,1 tsp per 240 ml — steep 5 min — 90 °C,Delicate floral and lightly sweet,Eastern Europe,40 g,12.95,,true,Whole dried elderflowers for a light and delicate floral infusion.,Whole dried elderflowers with a soft floral character. Caffeine-free. No added flavourings.,Elderflower (Sambucus nigra),Use 1 teaspoon per cup. Steep in water just off the boil for 5 minutes. Strain before drinking.,Store in an airtight container away from moisture and direct light.,Consult a healthcare professional during pregnancy.,tea-coffee/placeholder-tea-chamomile.svg,,,,true,false,true,Elderflower Loose Botanical Tea | Ray's Healthy Living,Whole dried elderflowers for a light and delicate floral infusion from Ray's Healthy Living.`;

// ─── Helper Functions ──────────────────────────────────────────────────────────

/**
 * Filter a catalog to return only coffee products.
 */
export function getCoffeeProducts(catalog: TeaCoffeeCatalog): TeaCoffeeProduct[] {
  return catalog.products.filter((p) => p.productType === "coffee");
}

/**
 * Filter a catalog to return only tea products.
 */
export function getTeaProducts(catalog: TeaCoffeeCatalog): TeaCoffeeProduct[] {
  return catalog.products.filter((p) => p.productType === "tea");
}

/**
 * Filter a catalog to return only sample products (for easy deletion later).
 */
export function getSampleProducts(catalog: TeaCoffeeCatalog): TeaCoffeeProduct[] {
  return catalog.products.filter((p) => p.isSample);
}

/**
 * Filter a catalog to return only non-sample products (real data).
 */
export function getNonSampleProducts(catalog: TeaCoffeeCatalog): TeaCoffeeProduct[] {
  return catalog.products.filter((p) => !p.isSample);
}

/**
 * Get all products of a specific coffee type (arabica, robusta, culi).
 */
export function getCoffeeByType(catalog: TeaCoffeeCatalog, coffeeType: string): TeaCoffeeProduct[] {
  return getCoffeeProducts(catalog).filter((p) => p.coffeeType === coffeeType);
}

/**
 * Get all products of a specific tea type (loose-botanical-leaves, herbal-teas, etc.).
 */
export function getTeaByType(catalog: TeaCoffeeCatalog, teaType: string): TeaCoffeeProduct[] {
  return getTeaProducts(catalog).filter((p) => p.teaType === teaType);
}

/**
 * Get all products of a specific grind preparation (whole-bean, medium-ground, fine-specialty-grind).
 */
export function getCoffeeByGrind(catalog: TeaCoffeeCatalog, grind: string): TeaCoffeeProduct[] {
  return getCoffeeProducts(catalog).filter((p) => p.grindPreparation === grind);
}

/**
 * Find a single product by slug.
 */
export function getProductBySlug(catalog: TeaCoffeeCatalog, slug: string): TeaCoffeeProduct | undefined {
  return catalog.products.find((p) => p.slug === slug);
}

/**
 * Search products by name or short description (case-insensitive).
 */
export function searchProducts(catalog: TeaCoffeeCatalog, query: string): TeaCoffeeProduct[] {
  const lower = query.toLowerCase();
  return catalog.products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.shortDescription.toLowerCase().includes(lower) ||
      p.flavorProfile.toLowerCase().includes(lower)
  );
}

/**
 * Get best sellers.
 */
export function getBestSellers(catalog: TeaCoffeeCatalog): TeaCoffeeProduct[] {
  return catalog.products.filter((p) => p.isBestSeller);
}

/**
 * Get new arrivals.
 */
export function getNewArrivals(catalog: TeaCoffeeCatalog): TeaCoffeeProduct[] {
  return catalog.products.filter((p) => p.isNewArrival);
}

export default loadTeaCoffeeCatalogFromSeed;
