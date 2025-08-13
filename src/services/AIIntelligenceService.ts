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
  private static readonly CONFIG = {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    TIMEOUT: 30000, // 30 seconds to match edge function timeout
    CACHE_TTL: 300000, // 5 minutes
  };

  private static cache = new Map<string, { data: AIGeneratedContent; timestamp: number }>();

  private static createCacheKey(request: IntelligenceRequest): string {
    return JSON.stringify({
      businessName: request.formData.businessName,
      industry: request.formData.industry,
      businessType: request.businessType,
      intelligenceMode: request.intelligenceMode
    });
  }

  private static validateRequest(request: IntelligenceRequest): void {
    if (!request.formData?.businessName) {
      throw new Error('Business name is required');
    }
    if (!request.formData?.industry) {
      throw new Error('Industry is required');
    }
    if (!request.businessType) {
      throw new Error('Business type is required');
    }
    if (!request.intelligenceMode) {
      throw new Error('Intelligence mode is required');
    }
  }

  private static sanitizeRequest(request: IntelligenceRequest): IntelligenceRequest {
    return {
      ...request,
      formData: {
        ...request.formData,
        businessName: request.formData.businessName?.trim().slice(0, 100),
        industry: request.formData.industry?.trim().slice(0, 100),
        targetAudience: request.formData.targetAudience?.trim().slice(0, 200),
        productService: request.formData.productService?.trim().slice(0, 200),
        uniqueValue: request.formData.uniqueValue?.trim().slice(0, 200),
        monthlyRevenue: request.formData.monthlyRevenue?.trim().slice(0, 50),
        currentChallenges: request.formData.currentChallenges?.trim().slice(0, 500),
      }
    };
  }

  private static async makeRequestWithRetry(request: IntelligenceRequest): Promise<any> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= this.CONFIG.MAX_RETRIES; attempt++) {
      try {
        console.log(`Intelligence request attempt ${attempt + 1}/${this.CONFIG.MAX_RETRIES + 1}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.CONFIG.TIMEOUT);
        
        // Ensure the request is properly serialized
        const requestBody = {
          formData: request.formData,
          intelligenceMode: request.intelligenceMode,
          businessType: request.businessType
        };

        console.log('Sending request with business:', requestBody.formData.businessName);
        
        const { data, error } = await supabase.functions.invoke('generate-intelligence', {
          body: requestBody
        });

        clearTimeout(timeoutId);

        if (error) {
          console.error('Supabase function error:', error);
          throw new Error(error.message || 'Edge function error');
        }

        if (!data) {
          throw new Error('No data received from intelligence generation');
        }

        console.log('✅ Intelligence generation successful');
        return data;
        
      } catch (error) {
        lastError = error as Error;
        console.warn(`Intelligence request attempt ${attempt + 1} failed:`, error);
        
        // Don't retry on certain errors
        if (error.message?.includes('validation') || error.message?.includes('authentication')) {
          throw error;
        }
        
        // Don't retry on the last attempt
        if (attempt === this.CONFIG.MAX_RETRIES) {
          break;
        }
        
        // Wait before retrying
        const delay = this.CONFIG.RETRY_DELAY * Math.pow(2, attempt);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }

  private static validateResponse(data: any): AIGeneratedContent {
    const requiredSections = [
      'budgetStrategy',
      'platformRecommendations', 
      'monthlyPlan',
      'metricOptimization',
      'competitorInsights',
      'copywritingRecommendations',
      'contentCalendar',
      'industryInsights', 
      'actionPlans'
    ];

    const missingSections = requiredSections.filter(section => !data[section] || 
      (Array.isArray(data[section]) && data[section].length === 0));
    
    if (missingSections.length > 0) {
      console.error('CRITICAL: AI response missing required sections:', missingSections);
      console.error('This indicates the OpenAI API did not generate complete intelligence data');
      
      // Instead of filling with fallback data, throw an error to force API regeneration
      throw new Error(`Intelligence API failed to generate complete data. Missing sections: ${missingSections.join(', ')}. Please check OpenAI API key and try again.`);
    }

    // Ensure required metadata exists
    data.generatedAt = data.generatedAt || new Date().toISOString();
    
    console.log('✅ AI response validation passed - all required sections present');
    return data as AIGeneratedContent;
  }

  static async generateIntelligence(request: IntelligenceRequest): Promise<AIGeneratedContent> {
    const startTime = Date.now();
    console.log('Starting enhanced AI intelligence generation for:', request.formData.businessName);

    try {
      // Validate and sanitize request
      this.validateRequest(request);
      const sanitizedRequest = this.sanitizeRequest(request);

      // Check cache first
      const cacheKey = this.createCacheKey(sanitizedRequest);
      const cachedData = this.cache.get(cacheKey);
      
      if (cachedData && (Date.now() - cachedData.timestamp < this.CONFIG.CACHE_TTL)) {
        console.log('Returning cached intelligence data');
        return cachedData.data;
      }

      // Make request with enhanced error handling and retries
      const data = await this.makeRequestWithRetry(sanitizedRequest);
      
      // Validate and enhance response
      const validatedData = this.validateResponse(data);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: validatedData,
        timestamp: Date.now()
      });
      
      // Cleanup old cache entries
      if (this.cache.size > 50) {
        const oldestEntry = Array.from(this.cache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
        this.cache.delete(oldestEntry[0]);
      }

      const processingTime = Date.now() - startTime;
      console.log(`AI intelligence generated successfully in ${processingTime}ms`);
      console.log('Generated sections:', Object.keys(validatedData).filter(key => 
        ['budgetStrategy', 'platformRecommendations', 'monthlyPlan', 'metricOptimization', 
         'competitorInsights', 'copywritingRecommendations'].includes(key)
      ));

      return validatedData;
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      console.error(`Error generating AI intelligence after ${processingTime}ms:`, error);
      
      // Enhanced error with more context
      const enhancedError = new Error(
        `Intelligence generation failed: ${error.message || 'Unknown error'}`
      );
      enhancedError.name = 'IntelligenceGenerationError';
      throw enhancedError;
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
