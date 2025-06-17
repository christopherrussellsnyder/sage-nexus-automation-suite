
export class MarketingUtils {
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  static formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  static formatPercentage(num: number): string {
    return `${num.toFixed(1)}%`;
  }

  static calculateROAS(revenue: number, adSpend: number): number {
    if (adSpend === 0) return 0;
    return Math.round((revenue / adSpend) * 100) / 100;
  }

  static calculateCPM(cost: number, impressions: number): number {
    if (impressions === 0) return 0;
    return Math.round((cost / impressions) * 1000 * 100) / 100;
  }

  static calculateCTR(clicks: number, impressions: number): number {
    if (impressions === 0) return 0;
    return Math.round((clicks / impressions) * 100 * 100) / 100;
  }

  static getMetricStatus(value: number, thresholds: {
    poor: number;
    average: number;
    good: number;
    excellent: number;
  }): 'poor' | 'average' | 'good' | 'excellent' {
    if (value >= thresholds.excellent) return 'excellent';
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.average) return 'average';
    return 'poor';
  }

  static getMetricColor(status: string): string {
    const colors = {
      poor: 'text-red-600',
      average: 'text-yellow-600',
      good: 'text-blue-600',
      excellent: 'text-green-600'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  }

  static generateMockCompetitorData(industry: string) {
    const industries = {
      'ecommerce': {
        competitors: ['shopify-store-1.com', 'ecom-brand-2.com', 'online-retailer-3.com'],
        avgROAS: 4.2,
        avgConversion: 3.1
      },
      'saas': {
        competitors: ['saas-tool-1.com', 'software-company-2.com', 'tech-startup-3.com'],
        avgROAS: 3.8,
        avgConversion: 2.8
      },
      'fitness': {
        competitors: ['fitness-brand-1.com', 'workout-app-2.com', 'gym-franchise-3.com'],
        avgROAS: 4.5,
        avgConversion: 4.2
      },
      'default': {
        competitors: ['competitor-1.com', 'competitor-2.com', 'competitor-3.com'],
        avgROAS: 4.0,
        avgConversion: 3.0
      }
    };

    return industries[industry.toLowerCase() as keyof typeof industries] || industries.default;
  }

  static getIndustryBenchmarks(industry: string) {
    const benchmarks: Record<string, any> = {
      'ecommerce': {
        conversionRate: { min: 2.0, avg: 3.1, max: 5.2 },
        cpc: { min: 0.8, avg: 1.5, max: 3.2 },
        roas: { min: 3.0, avg: 4.2, max: 6.8 }
      },
      'saas': {
        conversionRate: { min: 1.5, avg: 2.8, max: 4.5 },
        cpc: { min: 2.1, avg: 3.8, max: 6.2 },
        roas: { min: 2.5, avg: 3.8, max: 5.8 }
      },
      'fitness': {
        conversionRate: { min: 2.8, avg: 4.2, max: 7.1 },
        cpc: { min: 1.2, avg: 2.2, max: 4.1 },
        roas: { min: 3.2, avg: 4.5, max: 7.2 }
      }
    };

    return benchmarks[industry.toLowerCase()] || benchmarks['ecommerce'];
  }

  static generateOptimizationTips(metric: string, currentValue: number, targetValue: number): string[] {
    const tips: Record<string, string[]> = {
      'conversion_rate': [
        'Optimize landing page load speed and mobile responsiveness',
        'A/B test headlines, CTAs, and form layouts',
        'Add social proof elements like testimonials and reviews',
        'Simplify the conversion process and reduce friction points',
        'Implement exit-intent popups with compelling offers'
      ],
      'cpc': [
        'Improve ad relevance scores through better keyword targeting',
        'Use negative keywords to filter out irrelevant traffic',
        'Optimize ad scheduling for peak performance hours',
        'Create more specific ad groups with tighter keyword themes',
        'Test different bidding strategies and bid adjustments'
      ],
      'roas': [
        'Focus budget on highest-performing campaigns and keywords',
        'Implement conversion tracking for better optimization',
        'Use audience segmentation for more targeted messaging',
        'Create lookalike audiences based on best customers',
        'Optimize for customer lifetime value, not just initial purchase'
      ]
    };

    const metricKey = metric.toLowerCase().replace(/\s+/g, '_');
    return tips[metricKey] || [
      'Monitor performance metrics regularly',
      'Test different approaches systematically',
      'Focus on high-impact optimization opportunities'
    ];
  }
}
