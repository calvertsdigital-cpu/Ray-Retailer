# Phase 4H: Analytics & Monitoring Setup Guide

**Status:** Ready for Implementation  
**Date:** October 5, 2026  
**Scope:** Event tracking, API monitoring, fallback logging, performance metrics

---

## Overview

Phase 4H adds comprehensive analytics and monitoring to the tea-coffee department. This enables:
- ✅ User interaction tracking (page views, filters, product views, add-to-cart)
- ✅ API performance monitoring (response times, error rates, fallback usage)
- ✅ System health monitoring (backend availability, fallback activation)
- ✅ Debugging support (session playback, event export)

---

## Architecture

### Analytics Module (`tea-coffee-analytics.ts`)

**Singleton pattern:** One analytics instance per session

```typescript
import { getAnalytics } from '@/lib/tea-coffee-analytics';

const analytics = getAnalytics();
```

**Key Methods:**
- `trackPageView(route, productName)` — User enters page
- `trackFilterApplied(route, filterType, value, count)` — User applies filter
- `trackFilterCleared(route, filterType)` — User clears filter
- `trackProductViewed(slug, name)` — User views product details
- `trackAddToCart(slug, name, quantity)` — User adds product to cart
- `trackAPIRequestStart(endpoint, method)` — API call begins
- `trackAPIRequestComplete(requestId, endpoint, method, status, dataSource)` — API call finishes
- `trackAPIRequestError(endpoint, method, error, fallbackUsed)` — API call fails
- `trackFallbackActivated(route, reason)` — CSV fallback activated
- `trackPerformanceMetric(name, value, unit)` — Custom performance metric

---

## Implementation Guide

### Step 1: Import Analytics in Routes

**File:** `src/routes/tea-coffee.tea.tsx`

```typescript
import { getAnalytics } from '@/lib/tea-coffee-analytics';

function TeaCollectionPage() {
  const analytics = getAnalytics();

  useEffect(() => {
    // Track page view
    analytics.trackPageView('tea');

    // Track API performance
    const requestId = analytics.trackAPIRequestStart(
      '/api/user/catalog/products',
      'GET'
    );

    loadTeaProducts()
      .then((products) => {
        analytics.trackAPIRequestComplete(
          requestId,
          '/api/user/catalog/products',
          'GET',
          200,
          backendAvailable ? 'backend' : 'csv'
        );
      })
      .catch((error) => {
        analytics.trackAPIRequestError(
          '/api/user/catalog/products',
          'GET',
          error,
          true // fallback used
        );
        
        if (!backendAvailable) {
          analytics.trackFallbackActivated('tea', 'backend unavailable');
        }
      });
  }, []);

  const handleFilterChange = (filters: Record<string, string | undefined>) => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        analytics.trackFilterApplied(
          'tea',
          key,
          value,
          filteredProducts.length
        );
      } else {
        analytics.trackFilterCleared('tea', key);
      }
    });
  };

  return (
    // ... component JSX
  );
}
```

---

### Step 2: Track Product Views

**File:** `src/routes/tea-coffee.products.$slug.tsx`

```typescript
function TeaCoffeeProductPage() {
  const { slug } = Route.useLoaderData();
  const analytics = getAnalytics();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    loadProduct(slug).then((product) => {
      if (product) {
        setProduct(product);
        // Track product view
        analytics.trackProductViewed(product.slug, product.name);
      }
    });
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Track add to cart
    analytics.trackAddToCart(product.slug, product.name, quantity);
    
    // Add to cart logic
    addItem({...});
  };

  return (
    // ... component JSX
  );
}
```

---

### Step 3: Configure Analytics Endpoint (Production)

**File:** `.env.production`

```env
VITE_ANALYTICS_ENDPOINT=https://analytics.ray-healthy-living.com/api/events
```

**File:** `src/main.ts` or `src/start.ts`

```typescript
// Configure analytics endpoint in production
if (import.meta.env.PROD) {
  window.__ANALYTICS_ENDPOINT__ = import.meta.env.VITE_ANALYTICS_ENDPOINT;
}
```

---

## Event Types & Properties

### Page View

```javascript
{
  type: 'page-view',
  route: 'tea' | 'coffee' | 'product',
  productName?: string,
  timestamp: ISO8601,
  sessionId: string,
  userId?: string
}
```

**Example:**
```json
{
  "event": "page_view",
  "route": "tea",
  "timestamp": "2026-10-05T12:00:00Z",
  "sessionId": "session-1727961600000-abc123"
}
```

---

### Filter Applied

```javascript
{
  type: 'filter-applied',
  route: 'tea' | 'coffee',
  filterType: 'teaType' | 'botanicalFamily' | 'coffeeType' | 'grind',
  filterValue: string,
  resultCount: number,
  timestamp: ISO8601
}
```

**Example:**
```json
{
  "event": "filter_applied",
  "route": "tea",
  "filter_type": "teaType",
  "filter_value": "green",
  "result_count": 3,
  "timestamp": "2026-10-05T12:01:00Z"
}
```

---

### Product Viewed

```javascript
{
  type: 'product-viewed',
  productSlug: string,
  productName: string,
  timestamp: ISO8601
}
```

**Example:**
```json
{
  "event": "product_viewed",
  "product_slug": "green-jasmine-tea",
  "product_name": "Green Jasmine Tea",
  "timestamp": "2026-10-05T12:02:00Z"
}
```

---

### Add to Cart

```javascript
{
  type: 'add-to-cart',
  productSlug: string,
  productName: string,
  quantity: number,
  timestamp: ISO8601
}
```

**Example:**
```json
{
  "event": "add_to_cart",
  "product_slug": "green-jasmine-tea",
  "product_name": "Green Jasmine Tea",
  "quantity": 2,
  "timestamp": "2026-10-05T12:03:00Z"
}
```

---

### API Request

```javascript
{
  type: 'api_request',
  endpoint: string,
  method: 'GET' | 'POST',
  status: number,
  duration: number, // milliseconds
  dataSource: 'backend' | 'csv',
  timestamp: ISO8601
}
```

**Example:**
```json
{
  "event": "api_request",
  "endpoint": "/api/user/catalog/products",
  "method": "GET",
  "status": 200,
  "duration": 245,
  "data_source": "backend",
  "timestamp": "2026-10-05T12:00:15Z"
}
```

---

### API Error

```javascript
{
  type: 'api_error',
  endpoint: string,
  method: 'GET' | 'POST',
  error: string,
  fallbackUsed: boolean,
  timestamp: ISO8601
}
```

**Example:**
```json
{
  "event": "api_error",
  "endpoint": "/api/user/catalog/products",
  "method": "GET",
  "error": "fetch failed",
  "fallback_used": true,
  "timestamp": "2026-10-05T12:00:15Z"
}
```

---

### Fallback Activated

```javascript
{
  type: 'fallback-activated',
  route: 'tea' | 'coffee' | 'product',
  reason: string,
  timestamp: ISO8601
}
```

**Example:**
```json
{
  "event": "fallback_activated",
  "route": "tea",
  "reason": "backend unavailable",
  "timestamp": "2026-10-05T12:00:15Z"
}
```

---

## Monitoring Services Integration

### Option 1: Sentry (Error Tracking + Performance)

**Installation:**

```bash
npm install @sentry/react @sentry/tracing
```

**Setup (`src/main.ts`):**

```typescript
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
  });
}
```

**Sending events:**

```typescript
import * as Sentry from "@sentry/react";

analytics.on('event', (event) => {
  Sentry.captureEvent({
    message: event.type,
    level: 'info',
    contexts: {
      tea_coffee: {
        route: event.route,
        ...event.metadata,
      },
    },
  });
});
```

---

### Option 2: Google Analytics 4

**Installation:**

```bash
npm install @react-ga/core @react-ga/hooks
```

**Setup (`src/main.ts`):**

```typescript
import ReactGA from 'react-ga4';

if (import.meta.env.PROD) {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
}
```

**Sending events:**

```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
}

// In routes
export function TeaCollectionPage() {
  const analytics = getAnalytics();

  useEffect(() => {
    analytics.trackFilterApplied('tea', 'type', 'green', 5);
    
    // Also send to GA4
    ReactGA.event({
      category: 'tea_collection',
      action: 'filter_applied',
      label: 'type:green',
      value: 5,
    });
  }, []);
}
```

---

### Option 3: DataDog

**Installation:**

```bash
npm install @datadog/browser-rum @datadog/browser-logs
```

**Setup (`src/main.ts`):**

```typescript
import { datadogRum } from '@datadog/browser-rum';

if (import.meta.env.PROD) {
  datadogRum.init({
    applicationId: import.meta.env.VITE_DD_APP_ID,
    clientToken: import.meta.env.VITE_DD_CLIENT_TOKEN,
    site: 'datadoghq.com',
    service: 'ray-retailer-tea-coffee',
    env: import.meta.env.MODE,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  });

  datadogRum.startSessionReplayRecording();
}
```

**Sending events:**

```typescript
import { datadogRum } from '@datadog/browser-rum';

analytics.on('event', (event) => {
  datadogRum.addUserAction(event.type, {
    route: event.route,
    ...event.metadata,
  });
});
```

---

## Dashboards & Reports

### Key Metrics to Monitor

**Performance:**
- Average API response time (target: < 500ms)
- Fallback activation rate (target: < 5%)
- Page load time (target: < 3 sec desktop, < 5 sec mobile)

**User Engagement:**
- Filter usage rate (% of sessions using filters)
- Product view conversion (product views → add to cart)
- Average products viewed per session

**System Health:**
- Backend availability % (target: > 99%)
- Error rate (target: < 1%)
- Fallback activation reasons (categorize by error type)

---

### Dashboard Template (Grafana/Kibana)

**Panel 1: API Performance Over Time**
```
Query: SELECT endpoint, AVG(duration) FROM api_requests WHERE status=200 GROUP BY endpoint
```

**Panel 2: Fallback Activation Rate**
```
Query: SELECT COUNT(*) FROM fallback_activated WHERE route='tea' OR route='coffee'
```

**Panel 3: Top Filters Used**
```
Query: SELECT filter_type, filter_value, COUNT(*) FROM filter_applied GROUP BY filter_type, filter_value ORDER BY COUNT(*) DESC LIMIT 10
```

**Panel 4: Product View to Cart Conversion**
```
Query: SELECT product_viewed / add_to_cart * 100 AS conversion_rate FROM events
```

---

## Debugging & Session Export

### Export Session Data

**In Browser Console:**

```javascript
// Get analytics instance
const analytics = window.__TEA_COFFEE_ANALYTICS__;

// Export all events
const data = analytics.exportEvents();
console.log(JSON.stringify(data, null, 2));

// Get session summary
const summary = analytics.getSessionSummary();
console.log(summary);
```

**Output Example:**

```json
{
  "sessionId": "session-1727961600000-abc123",
  "duration": 125000,
  "eventCount": 45,
  "metricsCount": 12,
  "userId": "user-123"
}
```

---

### Debug Mode

**Enable verbose logging:**

```typescript
import { getAnalytics } from '@/lib/tea-coffee-analytics';

const analytics = getAnalytics();

// Access internal state (for debugging only)
const { events, metrics } = analytics.exportEvents();

// Review recent events
console.log('Recent 10 events:', events.slice(-10));

// Analyze API performance
const slowRequests = metrics.filter(m => m.duration > 1000);
console.log('Slow API requests:', slowRequests);
```

---

## Privacy & Compliance

### GDPR Compliance

**Data Collection:**
- ✅ Analytics tracks user interactions (anonymous session ID)
- ✅ No PII collected (unless explicitly tracked as userId)
- ✅ User can opt-out of analytics

**Implementation:**

```typescript
// Check for privacy mode / Do Not Track
if (navigator.doNotTrack === '1') {
  // Disable analytics
  analytics.disable();
}

// Cookie consent
if (!window.cookieConsent?.analytics) {
  analytics.disable();
}
```

### Data Retention

**Recommended:**
- Development: No retention (in-memory only)
- Production: 90 days retention in analytics service
- User has right to request deletion

---

## Deployment Checklist

- [ ] Sentry DSN configured in production env
- [ ] Google Analytics 4 property ID set
- [ ] DataDog app ID and client token set
- [ ] Analytics endpoint configured
- [ ] Event schema documented
- [ ] Dashboard created in monitoring service
- [ ] Alerting rules configured (error rate > 5%, latency > 1000ms)
- [ ] Privacy policy updated
- [ ] GDPR compliance reviewed
- [ ] Data retention policy set
- [ ] Team access configured

---

## Rollout Plan

### Phase 1: Development (Week 1)
- ✅ Analytics module created
- [ ] Local testing with mock events
- [ ] Verify all events logged to console

### Phase 2: Staging (Week 2)
- [ ] Deploy to staging with Sentry
- [ ] Collect 1-2 days of staging data
- [ ] Review dashboards
- [ ] Verify no performance degradation

### Phase 3: Production (Week 3+)
- [ ] Deploy to production
- [ ] Monitor error rates first 24 hours
- [ ] Review dashboards daily for first week
- [ ] Adjust alert thresholds based on baseline

---

## Troubleshooting

### Events Not Appearing

1. Check console for errors: `[TeaCoffeeAnalytics]`
2. Verify analytics endpoint configured: `window.__ANALYTICS_ENDPOINT__`
3. Check network tab for failed requests
4. Verify cookies/localStorage permissions

### High API Response Times

1. Check backend availability
2. Look for timeout errors in console
3. Verify network conditions (throttle simulation)
4. Check database query performance

### High Fallback Rate

1. Check backend health
2. Review network errors in console
3. Verify CORS headers from backend
4. Check rate limiting on API

---

## Next Steps

1. **Choose monitoring service** (Sentry, GA4, DataDog, or custom)
2. **Configure environment variables** for production
3. **Integrate analytics module** into routes (see Step 1-2 above)
4. **Create dashboards** in monitoring service
5. **Set up alerting rules** for critical metrics
6. **Document dashboards** for team access
7. **Review privacy & compliance** with legal
8. **Deploy to staging** and collect baseline data
9. **Monitor for 24 hours** before production deployment

---

**Prepared:** October 5, 2026  
**Status:** Ready for Implementation  
**Effort:** 4-6 hours integration + 2-4 hours monitoring setup