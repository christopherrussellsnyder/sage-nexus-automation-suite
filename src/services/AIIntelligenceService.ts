
import { supabase } from '@/integrations/supabase/client';

interface BusinessFormData {
  businessName: string;
  industry: string;
  targetAudience: string;
  productService: string;
  uniqueValue: string;
  monthlyRevenue: string;
  businessType: string;
  currentChallenges?: string;
  goals?: string[];
  timeline?: string;
  competitorData?: any;
  currentMetrics?: any;
}

interface IntelligenceRequest {
  formData: BusinessFormData;
  intelligenceMode: 'full' | 'copywriting' | 'marketing' | 'competitor';
  businessType: 'ecommerce' | 'agency' | 'sales';
}

interface AIGeneratedContent {
  platformRecommendations: PlatformRecommendation[];
  monthlyPlan: DailyContent[];
  budgetStrategy: BudgetRecommendation[];
  copywritingRecommendations: CopywritingInsight[];
  metricOptimization: MetricOptimization[];
  competitorInsights: CompetitorInsight[];
  industryInsights: IndustryInsight[];
}

interface PlatformRecommendation {
  platform: string;
  priority: number;
  reasoning: string;
  expectedMetrics: {
    roas: number;
    cpm: number;
    conversionRate: number;
    reach: number;
  };
  budgetAllocation: number;
}

interface DailyContent {
  day: number;
  platform: string;
  contentType: 'ad' | 'organic';
  hook: string;
  body: string;
  cta: string;
  visualSuggestion: string;
  targetAudience: string;
  keyMessage: string;
  hashtags?: string[];
  expectedMetrics: {
    reach: number;
    engagement: number;
    cost: number;
    conversions: number;
  };
  strategicReasoning: string;
}

interface BudgetRecommendation {
  category: string;
  monthlyBudget: number;
  allocation: {
    platform: string;
    percentage: number;
    dailySpend: number;
    reasoning: string;
  }[];
  optimizationTips: string[];
}

interface CopywritingInsight {
  copyType: string;
  recommendations: string[];
  examples: {
    before: string;
    after: string;
    improvement: string;
  }[];
  emotionalTriggers: string[];
}

interface MetricOptimization {
  metric: string;
  currentPerformance: string;
  targetImprovement: string;
  actionSteps: string[];
  timeline: string;
  expectedROI: string;
}

interface CompetitorInsight {
  competitor: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  strategicRecommendations: string[];
}

interface IndustryInsight {
  trend: string;
  impact: string;
  actionableAdvice: string;
  timeline: string;
}

export class AIIntelligenceService {
  static async generateIntelligence(request: IntelligenceRequest): Promise<AIGeneratedContent> {
    console.log('Generating AI-powered intelligence for:', request.formData.businessName);

    try {
      // Call the Supabase Edge Function with intelligence-specific API key
      const { data, error } = await supabase.functions.invoke('generate-intelligence', {
        body: request
      });

      if (error) {
        console.error('Intelligence generation error:', error);
        throw new Error(error.message || 'Failed to generate AI intelligence');
      }

      if (!data) {
        throw new Error('No intelligence data received from AI generation');
      }

      console.log('AI intelligence generated successfully');
      return data as AIGeneratedContent;
    } catch (error) {
      console.error('Error generating AI intelligence:', error);
      throw error;
    }
  }

  static saveApiKey(apiKey: string): void {
    // API keys are now handled at the service level for specific features
    console.log('API keys are managed per feature - Intelligence API key configured');
  }
}
