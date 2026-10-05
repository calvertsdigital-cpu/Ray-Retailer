# Phase 4G: Automated Testing Guide

**Purpose:** Supplement manual QA with automated tests for critical functionality  
**Framework:** Vitest + Playwright (recommended) or Jest  
**Scope:** Unit tests for converters, integration tests for routes

---

## Unit Tests: Product Converter

**File:** `src/lib/__tests__/tea-coffee-product-converter.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { convertToTeaCoffeeProduct, convertToTeaCoffeeProducts } from '@/lib/tea-coffee-product-converter';
import type { BackendProduct } from '@/lib/api';

describe('convertToTeaCoffeeProduct', () => {
  const mockBackendProduct: BackendProduct = {
    _id: 'id-123',
    name: 'Green Jasmine Tea',
    productType: 'tea',
    teaType: 'green',
    botanicalFamily: 'Camellia sinensis',
    description: 'Premium green tea with jasmine flowers',
    price: 12.99,
    rhlId: 201,
    stock: 50,
  };

  it('converts BackendProduct to TeaCoffeeProduct', () => {
    const result = convertToTeaCoffeeProduct(mockBackendProduct, true);
    
    expect(result.name).toBe('Green Jasmine Tea');
    expect(result.productType).toBe('tea');
    expect(result.teaType).toBe('green');
    expect(result.botanicalFamily).toBe('Camellia sinensis');
  });

  it('generates slug from product name', () => {
    const result = convertToTeaCoffeeProduct(mockBackendProduct, true);
    expect(result.slug).toBe('green-jasmine-tea');
  });

  it('applies retail markup to price', () => {
    const result = convertToTeaCoffeeProduct(mockBackendProduct, true);
    expect(result.price).toBe(15.588); // 12.99 * 1.2
  });

  it('does not apply markup when requested', () => {
    const result = convertToTeaCoffeeProduct(mockBackendProduct, false);
    expect(result.price).toBe(12.99);
  });

  it('sets inStock based on stock > 0', () => {
    const result = convertToTeaCoffeeProduct(mockBackendProduct, true);
    expect(result.inStock).toBe(true);
  });

  it('throws error for invalid productType', () => {
    const invalid = { ...mockBackendProduct, productType: 'invalid' };
    expect(() => convertToTeaCoffeeProduct(invalid as any)).toThrow();
  });

  it('handles missing fields with defaults', () => {
    const minimal = {
      _id: 'id-123',
      name: 'Test Product',
      productType: 'tea',
    };
    const result = convertToTeaCoffeeProduct(minimal as any, true);
    expect(result.shortDescription).toContain('Ray\'s Healthy Living');
    expect(result.ingredientsList).toBe('');
  });

  it('handles array fields (relatedArticleSlug)', () => {
    const withArray = {
      ...mockBackendProduct,
      relatedArticleSlug: ['article-1', 'article-2'],
    };
    const result = convertToTeaCoffeeProduct(withArray as any, true);
    expect(result.relatedArticleSlug).toBe('article-1');
  });
});

describe('convertToTeaCoffeeProducts', () => {
  it('batch converts products', () => {
    const products = [
      { _id: '1', name: 'Tea 1', productType: 'tea' },
      { _id: '2', name: 'Coffee 1', productType: 'coffee' },
    ];
    const result = convertToTeaCoffeeProducts(products as any, true);
    expect(result).toHaveLength(2);
  });

  it('filters out invalid products', () => {
    const products = [
      { _id: '1', name: 'Tea 1', productType: 'tea' },
      { _id: '2', name: 'Invalid', productType: 'invalid' },
    ];
    const result = convertToTeaCoffeeProducts(products as any, true);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Tea 1');
  });
});
```

---

## Unit Tests: Error Handler

**File:** `src/lib/__tests__/tea-coffee-error-handler.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { classifyError, logTeaCoffeeError, getUserErrorMessage } from '@/lib/tea-coffee-error-handler';

describe('classifyError', () => {
  it('classifies network errors', () => {
    const error = new Error('fetch failed');
    const result = classifyError(error);
    
    expect(result.type).toBe('network-error');
    expect(result.userMessage).toContain('Connection issue');
  });

  it('classifies unknown errors', () => {
    const error = new Error('Something went wrong');
    const result = classifyError(error);
    
    expect(result.type).toBe('unknown-error');
    expect(result.userMessage).toContain('Unable to load');
  });

  it('handles non-Error objects', () => {
    const result = classifyError('string error');
    expect(result.type).toBe('unknown-error');
    expect(result.message).toBe('string error');
  });
});

describe('getUserErrorMessage', () => {
  it('returns user-friendly message', () => {
    const error = classifyError(new Error('fetch failed'));
    const message = getUserErrorMessage(error);
    expect(message).toContain('Connection issue');
  });
});
```

---

## Integration Tests: Routes

**File:** `src/routes/__tests__/tea-coffee.routes.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TeaCollectionPage } from '@/routes/tea-coffee.tea';

// Mock the API functions
vi.mock('@/lib/api', () => ({
  fetchTeaCoffeeProducts: vi.fn(),
}));

describe('TeaCollectionPage', () => {
  it('loads and displays tea products', async () => {
    const { fetchTeaCoffeeProducts } = await import('@/lib/api');
    (fetchTeaCoffeeProducts as any).mockResolvedValue([
      {
        _id: '1',
        name: 'Tea 1',
        productType: 'tea',
        teaType: 'green',
      },
    ]);

    render(<TeaCollectionPage />);

    await waitFor(() => {
      expect(screen.getByText('Tea 1')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    render(<TeaCollectionPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('falls back to CSV on backend error', async () => {
    const { fetchTeaCoffeeProducts } = await import('@/lib/api');
    (fetchTeaCoffeeProducts as any).mockRejectedValue(new Error('Network error'));

    render(<TeaCollectionPage />);

    await waitFor(() => {
      expect(screen.getByText(/Connection issue/i)).toBeInTheDocument();
    });
  });
});
```

---

## E2E Tests: User Flows

**File:** `tests/e2e/tea-coffee.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Tea & Coffee Department', () => {
  test('User can view tea collection and add product to cart', async ({ page }) => {
    // Navigate to tea collection
    await page.goto('/tea-coffee/tea');

    // Verify page loaded
    await expect(page.locator('h1')).toContainText('Tea Collection');
    await expect(page.locator('text=Showing')).toBeVisible();

    // Click first product
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.click();

    // Verify product detail page
    await expect(page).toHaveURL(/\/tea-coffee\/products\//);
    
    // Add to cart
    await page.locator('text=Add to Cart').click();

    // Verify toast notification
    await expect(page.locator('text=added to cart')).toBeVisible();
  });

  test('User can filter tea by type', async ({ page }) => {
    await page.goto('/tea-coffee/tea');

    // Open filter (mobile) or click filter option (desktop)
    const filterOption = page.locator('text=Green');
    await filterOption.click();

    // Verify product count changed
    const showing = await page.locator('text=Showing').textContent();
    expect(showing).toContain('Showing');
  });

  test('User can view coffee collection with family badges', async ({ page }) => {
    await page.goto('/tea-coffee/coffee');

    // Verify coffee family badges visible
    const arabiaBadge = page.locator('text=Arabica');
    await expect(arabiaBadge).toBeVisible();
  });

  test('Backend down shows fallback message', async ({ page, context }) => {
    // Simulate network offline
    await context.setOffline(true);

    await page.goto('/tea-coffee/tea');

    // Verify fallback message
    await expect(page.locator('text=Connection issue')).toBeVisible();

    // Verify products still display from CSV
    await expect(page.locator('text=Showing')).toBeVisible();

    await context.setOffline(false);
  });

  test('Mobile layout responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/tea-coffee/tea');

    // Verify filter drawer collapses
    const filterDrawer = page.locator('[data-testid="filter-bar"]');
    await expect(filterDrawer).toBeVisible();

    // Verify products single column
    const products = page.locator('[data-testid="product-card"]');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  });
});
```

---

## Manual Testing Checklist Integration

**Before running automated tests:**

1. **Ensure backend is running**
   ```bash
   npm run dev
   ```

2. **Run unit tests**
   ```bash
   npm run test:unit
   ```

3. **Run integration tests**
   ```bash
   npm run test:integration
   ```

4. **Run E2E tests**
   ```bash
   npm run test:e2e
   ```

5. **Check coverage**
   ```bash
   npm run test:coverage
   ```

---

## Test Configuration

**`vitest.config.ts` additions:**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.test.ts',
      ]
    }
  }
});
```

---

## CI/CD Integration

**GitHub Actions example (`.github/workflows/test.yml`):**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      
      - run: npm run test:unit
      
      - run: npm run test:integration
      
      - run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Performance Testing

**Lighthouse CI (`.github/workflows/lighthouse.yml`):**

```yaml
name: Lighthouse

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: treosh/lighthouse-ci-action@v9
        with:
          configPath: './lighthouserc.json'
```

**`lighthouserc.json`:**

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/tea-coffee/tea",
        "http://localhost:3000/tea-coffee/coffee",
        "http://localhost:3000/tea-coffee/products/[product-slug]"
      ]
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended"
    }
  }
}
```

---

## Accessibility Testing

**Automated tools:**

```bash
npm install --save-dev axe-core jest-axe @axe-core/react
```

**Example test:**

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('TeaCoffeeProductCard has no accessibility violations', async () => {
  const { container } = render(
    <TeaCoffeeProductCard product={mockProduct} />
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Continuous Monitoring (Post-Launch)

**Monitor in production:**
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)
- User analytics (GA4)
- Backend API health checks

**See Task 4H for full monitoring setup**

---

**Next Phase:** Implement as needed before final production release