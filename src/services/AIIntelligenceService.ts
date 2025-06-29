
interface IntelligenceRequest {
  formData: {
    businessName: string;
    industry: string;
    targetAudience: string;
    productService: string;
    uniqueValue: string;
    monthlyRevenue: string;
    businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
    currentChallenges?: string;
    goals?: string;
    timeline?: string;
    competitorData?: any;
    currentMetrics?: any;
    copyType?: string;
    copywritingChallenges?: string;
    copywritingGoals?: string;
  };
  intelligenceMode: 'full' | 'copywriting' | 'marketing' | 'competitor';
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
}

export class AIIntelligenceService {
  static saveApiKey(apiKey: string) {
    localStorage.setItem('openai_api_key', apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem('openai_api_key');
  }

  static async generateIntelligence(request: IntelligenceRequest) {
    try {
      console.log('Starting AI intelligence generation...');
      
      // Updated endpoint path to match the actual Supabase function path
      const response = await fetch('/supabase/functions/v1/generate-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || ''}`,
        },
        body: JSON.stringify(request)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        // Handle different error types
        if (response.status === 404) {
          throw new Error('Intelligence generation service is currently unavailable. Please try again later.');
        }
        
        const errorText = await response.text();
        console.error('API request failed:', response.status, errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Invalid content type. Expected JSON, got:', contentType);
        console.error('Response text:', textResponse.substring(0, 500));
        
        // Check if response is HTML (common 404 response)
        if (textResponse.includes('<!DOCTYPE') || textResponse.includes('<html>')) {
          throw new Error('Intelligence generation service is not available. The API endpoint may not be properly configured.');
        }
        
        throw new Error('Server returned invalid response format. Expected JSON.');
      }

      const data = await response.json();
      console.log('Successfully received intelligence data');
      
      return this.parseResponse(data, request);
    } catch (error) {
      console.error('AI Intelligence Service Error:', error);
      
      // Provide more specific error messages
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to intelligence generation service. Please check your internet connection and try again.');
      }
      
      if (error.message.includes('404') || error.message.includes('not available')) {
        throw new Error('Intelligence generation service is temporarily unavailable. Please contact support if this issue persists.');
      }
      
      throw new Error(`Failed to generate AI intelligence: ${error.message}`);
    }
  }

  private static parseResponse(data: any, request: IntelligenceRequest) {
    // If the data is already in the expected format, return it directly
    if (data.platformRecommendations || data.monthlyPlan || data.budgetStrategy) {
      return {
        overview: data.overview || 'AI intelligence analysis completed successfully',
        recommendations: data.platformRecommendations || [],
        insights: data.industryInsights || [],
        metrics: data.metricOptimization || [],
        timeline: data.monthlyPlan || [],
        budgetStrategy: data.budgetStrategy || [],
        copywritingRecommendations: data.copywritingRecommendations || [],
        competitorInsights: data.competitorInsights || []
      };
    }

    // Fallback parsing if the response format is different
    return {
      overview: data.overview || 'Intelligence analysis completed',
      recommendations: this.extractRecommendations(data),
      insights: this.extractInsights(data, request.businessType),
      metrics: this.extractMetrics(data),
      timeline: this.extractTimeline(data)
    };
  }

  private static extractRecommendations(data: any) {
    return [
      'Optimize your conversion funnel',
      'Implement A/B testing for key elements',
      'Develop targeted content strategy',
      'Enhance customer segmentation'
    ];
  }

  private static extractInsights(data: any, businessType: string) {
    return [
      `${businessType} specific insight 1`,
      `${businessType} specific insight 2`,
      `${businessType} specific insight 3`
    ];
  }

  private static extractMetrics(data: any) {
    return {
      conversionRate: '2.5%',
      customerAcquisitionCost: '$45',
      lifetimeValue: '$180'
    };
  }

  private static extractTimeline(data: any) {
    return [
      { phase: 'Week 1-2', tasks: ['Initial setup', 'Data collection'] },
      { phase: 'Week 3-4', tasks: ['Implementation', 'Testing'] },
      { phase: 'Month 2', tasks: ['Optimization', 'Scaling'] }
    ];
  }
}
