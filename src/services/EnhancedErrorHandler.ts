// Enhanced Error Handler for maximum reliability and user experience

export interface ErrorContext {
  service: string;
  operation: string;
  timestamp: string;
  requestId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface EnhancedError extends Error {
  code?: string;
  context?: ErrorContext;
  retryable?: boolean;
  userMessage?: string;
}

export class ErrorHandler {
  private static errorLog: EnhancedError[] = [];
  private static readonly MAX_LOG_SIZE = 100;

  // Error codes for different types of failures
  static readonly ERROR_CODES = {
    NETWORK: 'NETWORK_ERROR',
    TIMEOUT: 'TIMEOUT_ERROR', 
    VALIDATION: 'VALIDATION_ERROR',
    API_RATE_LIMIT: 'API_RATE_LIMIT',
    API_KEY: 'API_KEY_ERROR',
    PARSING: 'PARSING_ERROR',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    UNKNOWN: 'UNKNOWN_ERROR'
  } as const;

  static createError(
    message: string,
    code: string,
    context: ErrorContext,
    retryable = false,
    userMessage?: string
  ): EnhancedError {
    const error: EnhancedError = new Error(message);
    error.name = 'EnhancedError';
    error.code = code;
    error.context = context;
    error.retryable = retryable;
    error.userMessage = userMessage || this.getDefaultUserMessage(code);

    this.logError(error);
    return error;
  }

  static logError(error: EnhancedError): void {
    this.errorLog.push(error);
    
    // Keep log size manageable
    if (this.errorLog.length > this.MAX_LOG_SIZE) {
      this.errorLog.shift();
    }

    // Enhanced logging with context
    console.error('Enhanced Error Log:', {
      message: error.message,
      code: error.code,
      retryable: error.retryable,
      context: error.context,
      stack: error.stack
    });
  }

  static getDefaultUserMessage(code: string): string {
    switch (code) {
      case this.ERROR_CODES.NETWORK:
        return 'Network connection issue. Please check your internet connection and try again.';
      case this.ERROR_CODES.TIMEOUT:
        return 'Request timed out. Please try again in a moment.';
      case this.ERROR_CODES.VALIDATION:
        return 'Please check your input and try again.';
      case this.ERROR_CODES.API_RATE_LIMIT:
        return 'Too many requests. Please wait a moment before trying again.';
      case this.ERROR_CODES.API_KEY:
        return 'Service configuration issue. Please contact support.';
      case this.ERROR_CODES.PARSING:
        return 'Data processing error. Please try again.';
      case this.ERROR_CODES.SERVICE_UNAVAILABLE:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  static handleApiError(error: any, context: ErrorContext): EnhancedError {
    let code: string = this.ERROR_CODES.UNKNOWN;
    let retryable = false;
    let message = error.message || 'Unknown error';

    // Categorize errors for better handling
    if (error.name === 'AbortError' || message.includes('timeout')) {
      code = this.ERROR_CODES.TIMEOUT;
      retryable = true;
    } else if (message.includes('network') || message.includes('fetch')) {
      code = this.ERROR_CODES.NETWORK;
      retryable = true;
    } else if (message.includes('rate limit') || message.includes('429')) {
      code = this.ERROR_CODES.API_RATE_LIMIT;
      retryable = true;
    } else if (message.includes('API key') || message.includes('401') || message.includes('403')) {
      code = this.ERROR_CODES.API_KEY;
      retryable = false;
    } else if (message.includes('validation') || message.includes('400')) {
      code = this.ERROR_CODES.VALIDATION;
      retryable = false;
    } else if (message.includes('parsing') || message.includes('JSON')) {
      code = this.ERROR_CODES.PARSING;
      retryable = true;
    } else if (message.includes('503') || message.includes('502') || message.includes('500')) {
      code = this.ERROR_CODES.SERVICE_UNAVAILABLE;
      retryable = true;
    }

    return this.createError(message, code, context, retryable);
  }

  static getErrorStats(): {
    total: number;
    byCode: Record<string, number>;
    recentErrors: EnhancedError[];
  } {
    const byCode: Record<string, number> = {};
    
    this.errorLog.forEach(error => {
      const code = error.code || 'UNKNOWN';
      byCode[code] = (byCode[code] || 0) + 1;
    });

    return {
      total: this.errorLog.length,
      byCode,
      recentErrors: this.errorLog.slice(-10)
    };
  }

  static clearErrorLog(): void {
    this.errorLog = [];
    console.log('Error log cleared');
  }

  static shouldRetry(error: EnhancedError, attempt: number, maxRetries: number): boolean {
    if (attempt >= maxRetries) return false;
    if (!error.retryable) return false;
    
    // Special cases for retry logic
    if (error.code === this.ERROR_CODES.API_RATE_LIMIT) {
      return attempt < 2; // Limited retries for rate limiting
    }
    
    return true;
  }

  static getRetryDelay(error: EnhancedError, attempt: number): number {
    const baseDelay = 1000; // 1 second
    
    switch (error.code) {
      case this.ERROR_CODES.API_RATE_LIMIT:
        return baseDelay * Math.pow(2, attempt) * 2; // Longer delays for rate limits
      case this.ERROR_CODES.NETWORK:
      case this.ERROR_CODES.TIMEOUT:
        return baseDelay * Math.pow(2, attempt);
      default:
        return baseDelay;
    }
  }
}

// Utility function for services to handle errors consistently
export const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  context: ErrorContext
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    throw ErrorHandler.handleApiError(error, context);
  }
};

// Performance monitoring utility
export class PerformanceMonitor {
  private static metrics: Array<{
    operation: string;
    duration: number;
    timestamp: string;
    success: boolean;
  }> = [];

  static startOperation(operation: string): () => void {
    const startTime = Date.now();
    
    return (success = true) => {
      const duration = Date.now() - startTime;
      this.metrics.push({
        operation,
        duration,
        timestamp: new Date().toISOString(),
        success
      });

      // Keep metrics manageable
      if (this.metrics.length > 200) {
        this.metrics.shift();
      }

      console.log(`Performance: ${operation} ${success ? 'succeeded' : 'failed'} in ${duration}ms`);
    };
  }

  static getMetrics() {
    const successMetrics = this.metrics.filter(m => m.success);
    const totalOperations = this.metrics.length;
    const successRate = totalOperations > 0 ? (successMetrics.length / totalOperations) * 100 : 0;
    
    const avgDuration = successMetrics.length > 0 
      ? successMetrics.reduce((sum, m) => sum + m.duration, 0) / successMetrics.length 
      : 0;

    const operationStats: Record<string, { count: number; avgDuration: number; successRate: number }> = {};
    
    this.metrics.forEach(metric => {
      if (!operationStats[metric.operation]) {
        operationStats[metric.operation] = { count: 0, avgDuration: 0, successRate: 0 };
      }
      operationStats[metric.operation].count++;
    });

    Object.keys(operationStats).forEach(operation => {
      const operationMetrics = this.metrics.filter(m => m.operation === operation);
      const successfulMetrics = operationMetrics.filter(m => m.success);
      
      operationStats[operation].avgDuration = successfulMetrics.length > 0
        ? successfulMetrics.reduce((sum, m) => sum + m.duration, 0) / successfulMetrics.length
        : 0;
      
      operationStats[operation].successRate = operationMetrics.length > 0
        ? (successfulMetrics.length / operationMetrics.length) * 100
        : 0;
    });

    return {
      totalOperations,
      successRate,
      avgDuration,
      operationStats,
      recentMetrics: this.metrics.slice(-20)
    };
  }

  static clearMetrics(): void {
    this.metrics = [];
    console.log('Performance metrics cleared');
  }
}
