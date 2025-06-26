
import axios from 'axios';

export interface IntelligenceRequest {
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
  };
  intelligenceMode: 'full' | 'copywriting' | 'marketing' | 'competitor';
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
}

export class AIIntelligenceService {
  private static API_BASE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:5000';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem('openai_api_key', apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem('openai_api_key');
  }

  static async generateIntelligence(requestData: IntelligenceRequest): Promise<any> {
    try {
      const response = await axios.post(`${AIIntelligenceService.API_BASE_URL}/intelligence`, requestData);
      return response.data;
    } catch (error: any) {
      console.error('Error generating AI intelligence:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to generate AI intelligence');
    }
  }
}
