/**
 * Tea & Coffee Error Handling & Logging
 * 
 * Centralized error handling for tea-coffee backend integration with CSV fallback.
 * Provides structured logging, error classification, and user-friendly messages.
 */

// Error classification
export type ErrorType = 
  | 'network-error' 
  | 'backend-unavailable' 
  | 'data-not-found' 
  | 'parsing-error' 
  | 'unknown-error';

export interface TeaCoffeeError {
  type: ErrorType;
  message: string;
  details?: string;
  timestamp: string;
  userMessage: string;
}

/**
 * Classify and log API errors
 */
export function classifyError(error: unknown): TeaCoffeeError {
  const timestamp = new Date().toISOString();
  
  if (error instanceof Error) {
    // Network errors (fetch failed, CORS, etc.)
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return {
        type: 'network-error',
        message: `Network error: ${error.message}`,
        details: error.stack,
        timestamp,
        userMessage: 'Connection issue. Using local data.',
      };
    }
    
    // Generic error
    return {
      type: 'unknown-error',
      message: error.message,
      details: error.stack,
      timestamp,
      userMessage: 'Unable to load from server. Using local data.',
    };
  }

  // Non-Error objects
  return {
    type: 'unknown-error',
    message: String(error),
    timestamp,
    userMessage: 'Unable to load from server. Using local data.',
  };
}

/**
 * Log error with context
 */
export function logTeaCoffeeError(
  context: 'load-products' | 'load-product' | 'filter-products',
  error: unknown,
): TeaCoffeeError {
  const classified = classifyError(error);
  
  // Production logging (could be sent to monitoring service)
  console.error(
    `[TeaCoffee:${context}] ${classified.type}:`,
    classified.message,
    {
      details: classified.details,
      timestamp: classified.timestamp,
    }
  );

  // Return for component use
  return classified;
}

/**
 * Format error for user display
 */
export function getUserErrorMessage(error: TeaCoffeeError): string {
  return error.userMessage;
}

/**
 * Should we show error message to user?
 */
export function shouldShowErrorUI(errorType: ErrorType): boolean {
  // Show UI for network/backend issues, not for unknown errors
  return errorType === 'network-error' || errorType === 'backend-unavailable';
}

/**
 * Get error details for debugging
 */
export function getErrorDetails(error: TeaCoffeeError): string {
  if (!error.details) return error.message;
  return `${error.message}\n${error.details}`;
}

/**
 * Analytics event for fallback usage
 */
export interface FallbackEvent {
  eventType: 'fallback-used' | 'backend-available';
  route: 'tea' | 'coffee' | 'product';
  timestamp: string;
  errorType?: ErrorType;
  dataSourceUsed: 'backend' | 'csv';
  retryCount?: number;
}

export function createFallbackEvent(
  route: 'tea' | 'coffee' | 'product',
  dataSourceUsed: 'backend' | 'csv',
  errorType?: ErrorType,
): FallbackEvent {
  return {
    eventType: dataSourceUsed === 'csv' ? 'fallback-used' : 'backend-available',
    route,
    timestamp: new Date().toISOString(),
    errorType,
    dataSourceUsed,
  };
}

/**
 * Log analytics event (for later integration with monitoring)
 */
export function logAnalyticsEvent(event: FallbackEvent): void {
  if (event.eventType === 'fallback-used') {
    console.log(
      `📊 [Analytics] Fallback used for ${event.route}:`,
      {
        dataSource: event.dataSourceUsed,
        errorType: event.errorType,
        timestamp: event.timestamp,
      }
    );
  } else {
    console.log(
      `📊 [Analytics] Backend available for ${event.route}:`,
      { timestamp: event.timestamp }
    );
  }
}
