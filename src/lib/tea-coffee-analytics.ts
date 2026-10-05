/**
 * Tea & Coffee Analytics & Monitoring
 * 
 * Tracks user interactions, API performance, and system health for the tea-coffee department.
 * Events are logged locally in development and can be sent to external monitoring services
 * (Sentry, DataDog, Google Analytics, etc.) in production.
 */

// ═════════════════════════════════════════════════════════════════════════════
// Event Types
// ═════════════════════════════════════════════════════════════════════════════

export type TeaCoffeeEventType =
  | 'page-view'
  | 'filter-applied'
  | 'filter-cleared'
  | 'product-viewed'
  | 'add-to-cart'
  | 'api-request-start'
  | 'api-request-complete'
  | 'api-request-error'
  | 'fallback-activated'
  | 'performance-metric';

export interface TeaCoffeeEvent {
  type: TeaCoffeeEventType;
  timestamp: string;
  route: 'tea' | 'coffee' | 'product' | 'unknown';
  metadata: Record<string, unknown>;
  userId?: string;
  sessionId: string;
}

export interface APIPerformanceMetric {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: number;
  duration: number; // milliseconds
  timestamp: string;
  error?: string;
  dataSourceUsed: 'backend' | 'csv';
}

export interface UserInteractionEvent {
  type: 'filter-applied' | 'filter-cleared' | 'product-viewed' | 'add-to-cart';
  route: 'tea' | 'coffee' | 'product';
  filterType?: string;
  filterValue?: string;
  productSlug?: string;
  quantity?: number;
  timestamp: string;
}

// ═════════════════════════════════════════════════════════════════════════════
// Analytics Manager
// ═════════════════════════════════════════════════════════════════════════════

class TeaCoffeeAnalytics {
  private sessionId: string;
  private userId?: string;
  private startTime: number;
  private events: TeaCoffeeEvent[] = [];
  private performanceMetrics: APIPerformanceMetric[] = [];
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.isEnabled = import.meta.env.MODE !== 'test';
  }

  /**
   * Set user ID for tracking
   */
  setUserId(userId: string): void {
    this.userId = userId;
    this.log('debug', 'User ID set', { userId });
  }

  /**
   * Track page view
   */
  trackPageView(route: 'tea' | 'coffee' | 'product', productName?: string): void {
    if (!this.isEnabled) return;

    const event: TeaCoffeeEvent = {
      type: 'page-view',
      timestamp: new Date().toISOString(),
      route,
      metadata: {
        productName: productName || null,
        sessionDuration: Date.now() - this.startTime,
      },
      userId: this.userId,
      sessionId: this.sessionId,
    };

    this.events.push(event);
    this.log('info', `📄 Page View: ${route}`, { productName });
  }

  /**
   * Track filter application
   */
  trackFilterApplied(
    route: 'tea' | 'coffee',
    filterType: string,
    filterValue: string,
    resultCount: number
  ): void {
    if (!this.isEnabled) return;

    const event: UserInteractionEvent = {
      type: 'filter-applied',
      route,
      filterType,
      filterValue,
      timestamp: new Date().toISOString(),
    };

    this.log('info', `🔍 Filter Applied: ${filterType}=${filterValue}`, {
      resultCount,
      route,
    });

    // Send to tracking service if available
    this.sendToAnalyticsService('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
      result_count: resultCount,
      route,
    });
  }

  /**
   * Track filter cleared
   */
  trackFilterCleared(route: 'tea' | 'coffee', filterType: string): void {
    if (!this.isEnabled) return;

    this.log('info', `🔄 Filter Cleared: ${filterType}`, { route });

    this.sendToAnalyticsService('filter_cleared', {
      filter_type: filterType,
      route,
    });
  }

  /**
   * Track product view
   */
  trackProductViewed(productSlug: string, productName: string): void {
    if (!this.isEnabled) return;

    const event: UserInteractionEvent = {
      type: 'product-viewed',
      route: 'product',
      productSlug,
      timestamp: new Date().toISOString(),
    };

    this.log('info', `👁️ Product Viewed: ${productName}`, { productSlug });

    this.sendToAnalyticsService('product_viewed', {
      product_slug: productSlug,
      product_name: productName,
    });
  }

  /**
   * Track add to cart
   */
  trackAddToCart(productSlug: string, productName: string, quantity: number): void {
    if (!this.isEnabled) return;

    const event: UserInteractionEvent = {
      type: 'add-to-cart',
      route: 'product',
      productSlug,
      quantity,
      timestamp: new Date().toISOString(),
    };

    this.log('info', `🛒 Added to Cart: ${productName} x${quantity}`, {
      productSlug,
    });

    this.sendToAnalyticsService('add_to_cart', {
      product_slug: productSlug,
      product_name: productName,
      quantity,
    });
  }

  /**
   * Track API request start
   */
  trackAPIRequestStart(endpoint: string, method: 'GET' | 'POST' = 'GET'): number {
    if (!this.isEnabled) return Date.now();

    const requestId = Date.now();
    this.log('debug', `🔄 API Request: ${method} ${endpoint}`);

    return requestId;
  }

  /**
   * Track API request completion
   */
  trackAPIRequestComplete(
    requestId: number,
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    status: number,
    dataSourceUsed: 'backend' | 'csv' = 'backend'
  ): void {
    if (!this.isEnabled) return;

    const duration = Date.now() - requestId;
    const metric: APIPerformanceMetric = {
      endpoint,
      method,
      status,
      duration,
      timestamp: new Date().toISOString(),
      dataSourceUsed,
    };

    this.performanceMetrics.push(metric);

    const statusEmoji = status < 300 ? '✅' : status < 400 ? '⚠️' : '❌';
    this.log('info', `${statusEmoji} API Complete: ${method} ${endpoint} (${duration}ms)`, {
      status,
      dataSourceUsed,
    });

    // Track performance metric
    this.sendToAnalyticsService('api_request', {
      endpoint,
      method,
      status,
      duration,
      data_source: dataSourceUsed,
    });
  }

  /**
   * Track API request error
   */
  trackAPIRequestError(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    error: Error | string,
    fallbackUsed: boolean
  ): void {
    if (!this.isEnabled) return;

    const errorMessage = error instanceof Error ? error.message : String(error);

    this.log('error', `❌ API Error: ${method} ${endpoint}`, {
      error: errorMessage,
      fallbackUsed,
    });

    this.sendToAnalyticsService('api_error', {
      endpoint,
      method,
      error: errorMessage,
      fallback_used: fallbackUsed,
    });
  }

  /**
   * Track fallback activation
   */
  trackFallbackActivated(route: 'tea' | 'coffee' | 'product', reason: string): void {
    if (!this.isEnabled) return;

    this.log('warn', `📌 Fallback Activated: ${route}`, { reason });

    this.sendToAnalyticsService('fallback_activated', {
      route,
      reason,
    });
  }

  /**
   * Track performance metric
   */
  trackPerformanceMetric(
    metricName: string,
    value: number,
    unit: string = 'ms'
  ): void {
    if (!this.isEnabled) return;

    this.log('info', `⏱️ Performance: ${metricName}=${value}${unit}`);

    this.sendToAnalyticsService('performance_metric', {
      metric_name: metricName,
      value,
      unit,
    });
  }

  /**
   * Get session summary
   */
  getSessionSummary(): {
    sessionId: string;
    duration: number;
    eventCount: number;
    metricsCount: number;
    userId?: string;
  } {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.startTime,
      eventCount: this.events.length,
      metricsCount: this.performanceMetrics.length,
      userId: this.userId,
    };
  }

  /**
   * Export events for debugging
   */
  exportEvents(): {
    events: TeaCoffeeEvent[];
    metrics: APIPerformanceMetric[];
  } {
    return {
      events: [...this.events],
      metrics: [...this.performanceMetrics],
    };
  }

  /**
   * Send event to external analytics service
   */
  private sendToAnalyticsService(eventName: string, properties: Record<string, unknown>): void {
    // In development, just log
    if (import.meta.env.MODE === 'development') {
      this.log('debug', `📊 Analytics Event: ${eventName}`, properties);
      return;
    }

    // In production, send to monitoring service
    // Example: Sentry, DataDog, Google Analytics, etc.
    if (window.__ANALYTICS_ENDPOINT__) {
      fetch(window.__ANALYTICS_ENDPOINT__, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          properties,
          timestamp: new Date().toISOString(),
          sessionId: this.sessionId,
          userId: this.userId,
        }),
      }).catch(err => {
        // Silently fail - don't block user interactions
        console.debug('Failed to send analytics event', err);
      });
    }
  }

  /**
   * Internal logging
   */
  private log(level: 'debug' | 'info' | 'warn' | 'error', message: string, data?: Record<string, unknown>): void {
    const prefix = `[TeaCoffeeAnalytics]`;
    
    if (level === 'error') {
      console.error(prefix, message, data);
    } else if (level === 'warn') {
      console.warn(prefix, message, data);
    } else if (level === 'info') {
      console.log(prefix, message, data);
    } else {
      console.debug(prefix, message, data);
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Extend window object for analytics endpoint
declare global {
  interface Window {
    __ANALYTICS_ENDPOINT__?: string;
    __TEA_COFFEE_ANALYTICS__?: TeaCoffeeAnalytics;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// Singleton Instance
// ═════════════════════════════════════════════════════════════════════════════

let analyticsInstance: TeaCoffeeAnalytics | null = null;

export function initializeAnalytics(): TeaCoffeeAnalytics {
  if (!analyticsInstance) {
    analyticsInstance = new TeaCoffeeAnalytics();
    window.__TEA_COFFEE_ANALYTICS__ = analyticsInstance;
  }
  return analyticsInstance;
}

export function getAnalytics(): TeaCoffeeAnalytics {
  if (!analyticsInstance) {
    return initializeAnalytics();
  }
  return analyticsInstance;
}

// Auto-initialize on module load
const analytics = initializeAnalytics();
export default analytics;
