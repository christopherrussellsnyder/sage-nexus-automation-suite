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
  clientDetails?: any;
  idealCustomerProfile?: any;
  productToSell?: string;
}

interface IntelligenceRequest {
  formData: BusinessFormData;
  intelligenceMode: 'full' | 'copywriting' | 'marketing' | 'competitor';
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
}

interface AIGeneratedContent {
  generatedAt: string;
  intelligenceMode: string;
  businessType: string;
  formData: BusinessFormData;
  budgetStrategy: {
    recommendedStrategy: string;
    monthlyBudgetAllocation: {
      primaryPlatform: string;
      secondaryPlatform: string;
      testing: string;
    };
    expectedROAS: string;
    targetCPM: string;
    reasoning?: string;
  };
  platformRecommendations: PlatformRecommendation[];
  monthlyPlan: DailyContent[];
  metricOptimization: MetricOptimization[];
  competitorInsights: CompetitorInsight[];
  copywritingRecommendations: CopywritingInsight[];
  industryInsights: IndustryInsight[];
  aiGeneratedContent?: string;
  fullAIResponse?: string;
}

interface PlatformRecommendation {
  platform: string;
  priority: number;
  score: number;
  reasoning: string;
  expectedMetrics: {
    roas: number;
    cpm: number;
    conversionRate: number;
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
  expectedMetrics: {
    reach: number;
    engagement: number;
    cost: number;
    conversions: number;
  };
  strategicReasoning: string;
}

interface MetricOptimization {
  metric: string;
  currentBenchmark: string;
  targetBenchmark: string;
  improvementStrategies: string[];
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

interface IndustryInsight {
  trend: string;
  impact: string;
  actionableAdvice: string;
  timeline: string;
}

export class AIIntelligenceService {
  static async generateIntelligence(request: IntelligenceRequest): Promise<AIGeneratedContent> {
    console.log('Starting AI intelligence generation...');
    console.log('Generating AI-powered intelligence for:', request.formData.businessName);

    try {
      // Call the Supabase Edge Function which uses the INTELLIGENCE_API_KEY secret
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

      // Validate that all required sections are present
      const requiredSections = [
        'budgetStrategy',
        'platformRecommendations', 
        'monthlyPlan',
        'metricOptimization',
        'competitorInsights',
        'copywritingRecommendations'
      ];

      const missingSections = requiredSections.filter(section => !data[section] || 
        (Array.isArray(data[section]) && data[section].length === 0));

      if (missingSections.length > 0) {
        console.warn('Missing sections in AI response:', missingSections);
        // Continue with partial data rather than failing
      }

      console.log('AI intelligence generated successfully');
      console.log('Generated sections:', Object.keys(data).filter(key => 
        ['budgetStrategy', 'platformRecommendations', 'monthlyPlan', 'metricOptimization', 
         'competitorInsights', 'copywritingRecommendations'].includes(key)
      ));

      return data as AIGeneratedContent;
    } catch (error) {
      console.error('Error generating AI intelligence:', error);
      throw error;
    }
  }

  static async generateCopywritingIntelligence(request: IntelligenceRequest): Promise<AIGeneratedContent> {
    console.log('Generating AI-powered copywriting intelligence for:', request.formData.businessName);

    // Set the intelligence mode to copywriting
    const copywritingRequest = {
      ...request,
      intelligenceMode: 'copywriting' as const
    };

    return this.generateIntelligence(copywritingRequest);
  }

  static saveApiKey(apiKey: string): void {
    // API keys are now managed through Supabase secrets
    console.log('API keys are managed through Supabase secrets - Intelligence API key configured');
  }
}
