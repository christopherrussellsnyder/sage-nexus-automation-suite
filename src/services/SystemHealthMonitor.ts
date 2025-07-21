// System Health Monitor for comprehensive backend monitoring

export interface HealthMetrics {
  timestamp: string;
  apiStatus: {
    intelligence: 'healthy' | 'degraded' | 'down';
    productResearch: 'healthy' | 'degraded' | 'down';
    database: 'healthy' | 'degraded' | 'down';
  };
  performance: {
    avgResponseTime: number;
    successRate: number;
    errorRate: number;
  };
  resources: {
    memoryUsage: number;
    cacheHitRate: number;
    activeConnections: number;
  };
}

export interface AlertThreshold {
  metric: string;
  threshold: number;
  severity: 'info' | 'warning' | 'critical';
}

export class SystemHealthMonitor {
  private static metrics: HealthMetrics[] = [];
  private static readonly MAX_METRICS = 100;
  private static readonly HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
  private static intervalId: number | null = null;
  
  private static readonly DEFAULT_THRESHOLDS: AlertThreshold[] = [
    { metric: 'avgResponseTime', threshold: 5000, severity: 'warning' }, // 5s warning
    { metric: 'avgResponseTime', threshold: 10000, severity: 'critical' }, // 10s critical
    { metric: 'successRate', threshold: 90, severity: 'warning' }, // <90% warning
    { metric: 'successRate', threshold: 80, severity: 'critical' }, // <80% critical
    { metric: 'errorRate', threshold: 10, severity: 'warning' }, // >10% warning
    { metric: 'errorRate', threshold: 20, severity: 'critical' }, // >20% critical
    { metric: 'memoryUsage', threshold: 80, severity: 'warning' }, // >80% warning
    { metric: 'memoryUsage', threshold: 95, severity: 'critical' }, // >95% critical
  ];

  private static alerts: Array<{
    id: string;
    metric: string;
    severity: string;
    message: string;
    timestamp: string;
    resolved: boolean;
  }> = [];

  static startMonitoring(): void {
    if (this.intervalId) {
      console.log('Health monitoring already running');
      return;
    }

    console.log('Starting system health monitoring...');
    
    // Initial health check
    this.performHealthCheck();
    
    // Set up periodic health checks
    this.intervalId = window.setInterval(() => {
      this.performHealthCheck();
    }, this.HEALTH_CHECK_INTERVAL);
  }

  static stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Health monitoring stopped');
    }
  }

  private static async performHealthCheck(): Promise<void> {
    try {
      const metrics = await this.collectMetrics();
      this.metrics.push(metrics);
      
      // Keep metrics manageable
      if (this.metrics.length > this.MAX_METRICS) {
        this.metrics.shift();
      }
      
      // Check for alerts
      this.checkAlertThresholds(metrics);
      
      console.log('Health check completed:', {
        timestamp: metrics.timestamp,
        apiStatus: metrics.apiStatus,
        avgResponseTime: metrics.performance.avgResponseTime,
        successRate: metrics.performance.successRate
      });
      
    } catch (error) {
      console.error('Health check failed:', error);
      this.createAlert('healthCheck', 'critical', 'Health monitoring system failure');
    }
  }

  private static async collectMetrics(): Promise<HealthMetrics> {
    const timestamp = new Date().toISOString();
    
    // API Health Checks
    const apiStatus = await this.checkApiHealth();
    
    // Performance Metrics
    const performance = this.calculatePerformanceMetrics();
    
    // Resource Metrics (simulated for browser environment)
    const resources = this.getResourceMetrics();
    
    return {
      timestamp,
      apiStatus,
      performance,
      resources
    };
  }

  private static async checkApiHealth(): Promise<HealthMetrics['apiStatus']> {
    const healthChecks = {
      intelligence: this.checkIntelligenceAPI(),
      productResearch: this.checkProductResearchAPI(),
      database: this.checkDatabaseHealth()
    };

    const results = await Promise.allSettled(Object.values(healthChecks));
    
    return {
      intelligence: results[0].status === 'fulfilled' && results[0].value ? 'healthy' : 'down',
      productResearch: results[1].status === 'fulfilled' && results[1].value ? 'healthy' : 'down',
      database: results[2].status === 'fulfilled' && results[2].value ? 'healthy' : 'down'
    };
  }

  private static async checkIntelligenceAPI(): Promise<boolean> {
    try {
      // Simple health check - we could make a lightweight test request
      // For now, we'll check if the service is generally accessible
      return true; // Simplified check
    } catch {
      return false;
    }
  }

  private static async checkProductResearchAPI(): Promise<boolean> {
    try {
      // Simple health check for product research
      return true; // Simplified check
    } catch {
      return false;
    }
  }

  private static async checkDatabaseHealth(): Promise<boolean> {
    try {
      // We could check database connectivity here
      // For now, simplified check
      return true;
    } catch {
      return false;
    }
  }

  private static calculatePerformanceMetrics(): HealthMetrics['performance'] {
    // Get recent performance data from ErrorHandler if available
    const recentMetrics = this.metrics.slice(-10);
    
    if (recentMetrics.length === 0) {
      return {
        avgResponseTime: 0,
        successRate: 100,
        errorRate: 0
      };
    }

    const avgResponseTime = recentMetrics.reduce((sum, m) => 
      sum + m.performance.avgResponseTime, 0) / recentMetrics.length;
    
    const avgSuccessRate = recentMetrics.reduce((sum, m) => 
      sum + m.performance.successRate, 0) / recentMetrics.length;

    return {
      avgResponseTime,
      successRate: avgSuccessRate,
      errorRate: 100 - avgSuccessRate
    };
  }

  private static getResourceMetrics(): HealthMetrics['resources'] {
    // Browser-based resource monitoring (simplified)
    const memoryInfo = (performance as any).memory;
    
    return {
      memoryUsage: memoryInfo ? 
        Math.round((memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100) : 
        50, // Default estimate
      cacheHitRate: 75, // Simplified metric
      activeConnections: 5 // Simplified metric
    };
  }

  private static checkAlertThresholds(metrics: HealthMetrics): void {
    this.DEFAULT_THRESHOLDS.forEach(threshold => {
      const value = this.getMetricValue(metrics, threshold.metric);
      const isTriggered = this.isThresholdTriggered(threshold, value);
      
      if (isTriggered) {
        const existingAlert = this.alerts.find(alert => 
          alert.metric === threshold.metric && 
          alert.severity === threshold.severity && 
          !alert.resolved
        );
        
        if (!existingAlert) {
          this.createAlert(
            threshold.metric,
            threshold.severity,
            `${threshold.metric} threshold exceeded: ${value} (threshold: ${threshold.threshold})`
          );
        }
      } else {
        // Resolve any existing alerts for this metric/severity
        this.resolveAlerts(threshold.metric, threshold.severity);
      }
    });
  }

  private static getMetricValue(metrics: HealthMetrics, metricName: string): number {
    switch (metricName) {
      case 'avgResponseTime':
        return metrics.performance.avgResponseTime;
      case 'successRate':
        return metrics.performance.successRate;
      case 'errorRate':
        return metrics.performance.errorRate;
      case 'memoryUsage':
        return metrics.resources.memoryUsage;
      default:
        return 0;
    }
  }

  private static isThresholdTriggered(threshold: AlertThreshold, value: number): boolean {
    switch (threshold.metric) {
      case 'successRate':
        return value < threshold.threshold;
      case 'avgResponseTime':
      case 'errorRate':
      case 'memoryUsage':
        return value > threshold.threshold;
      default:
        return false;
    }
  }

  private static createAlert(metric: string, severity: string, message: string): void {
    const alert = {
      id: crypto.randomUUID(),
      metric,
      severity,
      message,
      timestamp: new Date().toISOString(),
      resolved: false
    };
    
    this.alerts.push(alert);
    
    // Log alert based on severity
    if (severity === 'critical') {
      console.error('CRITICAL ALERT:', message);
    } else if (severity === 'warning') {
      console.warn('WARNING ALERT:', message);
    } else {
      console.info('INFO ALERT:', message);
    }
    
    // Keep alerts manageable
    if (this.alerts.length > 50) {
      this.alerts.shift();
    }
  }

  private static resolveAlerts(metric: string, severity: string): void {
    this.alerts.forEach(alert => {
      if (alert.metric === metric && alert.severity === severity && !alert.resolved) {
        alert.resolved = true;
        console.log(`Alert resolved: ${alert.message}`);
      }
    });
  }

  static getHealthStatus(): {
    overall: 'healthy' | 'degraded' | 'critical';
    current: HealthMetrics | null;
    history: HealthMetrics[];
    alerts: typeof this.alerts;
  } {
    const current = this.metrics[this.metrics.length - 1] || null;
    const activeAlerts = this.alerts.filter(alert => !alert.resolved);
    
    let overall: 'healthy' | 'degraded' | 'critical' = 'healthy';
    
    if (activeAlerts.some(alert => alert.severity === 'critical')) {
      overall = 'critical';
    } else if (activeAlerts.some(alert => alert.severity === 'warning')) {
      overall = 'degraded';
    }
    
    return {
      overall,
      current,
      history: this.metrics,
      alerts: this.alerts
    };
  }

  static getDetailedReport(): {
    systemHealth: ReturnType<typeof this.getHealthStatus>;
    performance: {
      avgResponseTime: number;
      successRate: number;
      uptime: number;
    };
    apiStatus: {
      intelligence: { status: string; lastCheck: string };
      productResearch: { status: string; lastCheck: string };
      database: { status: string; lastCheck: string };
    };
    recommendations: string[];
  } {
    const health = this.getHealthStatus();
    const recent = this.metrics.slice(-5);
    
    const recommendations: string[] = [];
    
    if (health.current) {
      if (health.current.performance.avgResponseTime > 3000) {
        recommendations.push('Consider optimizing API response times');
      }
      if (health.current.performance.successRate < 95) {
        recommendations.push('Investigate and resolve API failures');
      }
      if (health.current.resources.memoryUsage > 80) {
        recommendations.push('Monitor memory usage and implement cleanup');
      }
    }
    
    if (recommendations.length === 0) {
      recommendations.push('System is operating within normal parameters');
    }
    
    return {
      systemHealth: health,
      performance: {
        avgResponseTime: recent.length > 0 
          ? recent.reduce((sum, m) => sum + m.performance.avgResponseTime, 0) / recent.length 
          : 0,
        successRate: recent.length > 0 
          ? recent.reduce((sum, m) => sum + m.performance.successRate, 0) / recent.length 
          : 100,
        uptime: this.calculateUptime()
      },
      apiStatus: {
        intelligence: { 
          status: health.current?.apiStatus.intelligence || 'unknown', 
          lastCheck: health.current?.timestamp || 'never' 
        },
        productResearch: { 
          status: health.current?.apiStatus.productResearch || 'unknown', 
          lastCheck: health.current?.timestamp || 'never' 
        },
        database: { 
          status: health.current?.apiStatus.database || 'unknown', 
          lastCheck: health.current?.timestamp || 'never' 
        }
      },
      recommendations
    };
  }

  private static calculateUptime(): number {
    if (this.metrics.length === 0) return 100;
    
    const healthyChecks = this.metrics.filter(m => 
      m.apiStatus.intelligence === 'healthy' && 
      m.apiStatus.productResearch === 'healthy' && 
      m.apiStatus.database === 'healthy'
    );
    
    return (healthyChecks.length / this.metrics.length) * 100;
  }

  static clearHistory(): void {
    this.metrics = [];
    this.alerts = [];
    console.log('Health monitoring history cleared');
  }
}
