
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
      console.log('Request details:', {
        businessName: request.formData.businessName,
        intelligenceMode: request.intelligenceMode,
        businessType: request.businessType
      });
      
      // Use the full Supabase URL for the edge function
      const supabaseUrl = 'https://qtckfvprvpxbbteinxve.supabase.co';
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-intelligence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y2tmdnBydnB4YmJ0ZWlueHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjY0MTcsImV4cCI6MjA2NDkwMjQxN30.0he21MpcO1l-pdiMcfekTtzlSiVRNYSaDWjHa_SFFBs`,
        },
        body: JSON.stringify(request)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API request failed:', response.status, errorText);
        
        // Handle different error types with more specific messages
        if (response.status === 404) {
          throw new Error('Intelligence generation service is currently unavailable. The edge function may not be deployed properly.');
        } else if (response.status === 401) {
          throw new Error('Authentication failed. Please check your API configuration.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else if (response.status >= 500) {
          throw new Error('Server error occurred. Please try again in a few minutes.');
        }
        
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
      console.log('Data structure validation:', {
        hasInsights: !!data.insights,
        hasPlatforms: !!data.insights?.platformRecommendations?.length,
        hasMonthlyPlan: !!data.insights?.monthlyPlan?.length,
        hasCopywriting: !!data.insights?.copywritingRecommendations?.length,
        hasCompetitors: !!data.insights?.competitorInsights?.length,
        hasIndustry: !!data.insights?.industryInsights?.length,
        hasBudget: !!data.insights?.budgetStrategy?.length,
        hasMetrics: !!data.insights?.metricOptimization?.length
      });
      
      return this.processIntelligenceData(data, request);
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

  private static processIntelligenceData(data: any, request: IntelligenceRequest) {
    // Enhanced data processing with validation and enrichment
    const insights = data.insights || {};
    
    // Validate that we have actual AI-generated content
    const isAIGenerated = this.validateAIContent(insights);
    
    console.log('Processing intelligence data:', {
      isAIGenerated,
      platformCount: insights.platformRecommendations?.length || 0,
      monthlyPlanDays: insights.monthlyPlan?.length || 0,
      copywritingCount: insights.copywritingRecommendations?.length || 0,
      competitorCount: insights.competitorInsights?.length || 0,
      industryCount: insights.industryInsights?.length || 0,
      budgetCount: insights.budgetStrategy?.length || 0,
      metricsCount: insights.metricOptimization?.length || 0
    });

    const processedData = {
      insights: {
        ...insights,
        // Ensure all required arrays exist
        platformRecommendations: insights.platformRecommendations || [],
        monthlyPlan: insights.monthlyPlan || [],
        budgetStrategy: insights.budgetStrategy || [],
        copywritingRecommendations: insights.copywritingRecommendations || [],
        metricOptimization: insights.metricOptimization || [],
        competitorInsights: insights.competitorInsights || [],
        industryInsights: insights.industryInsights || []
      },
      // Add metadata
      generatedAt: new Date().toISOString(),
      intelligenceMode: request.intelligenceMode,
      businessType: request.businessType,
      businessName: request.formData.businessName,
      isAIGenerated: isAIGenerated,
      dataQuality: {
        completeness: this.calculateCompleteness(insights),
        aiContentRatio: this.calculateAIContentRatio(insights),
        sectionsGenerated: this.countGeneratedSections(insights)
      }
    };

    // If we don't have enough AI content, add fallback enrichment
    if (!isAIGenerated || processedData.dataQuality.completeness < 0.7) {
      console.log('Enriching data due to low AI content quality');
      processedData.insights = this.enrichWithFallbackData(processedData.insights, request);
    }

    return processedData;
  }

  private static validateAIContent(insights: any): boolean {
    const validationChecks = {
      hasPlatforms: !!(insights.platformRecommendations?.length > 0),
      hasMonthlyPlan: !!(insights.monthlyPlan?.length >= 30),
      hasCopywriting: !!(insights.copywritingRecommendations?.length > 0),
      hasCompetitors: !!(insights.competitorInsights?.length > 0),
      hasIndustry: !!(insights.industryInsights?.length > 0),
      hasBudget: !!(insights.budgetStrategy?.length > 0),
      hasMetrics: !!(insights.metricOptimization?.length > 0)
    };

    const validSections = Object.values(validationChecks).filter(Boolean).length;
    return validSections >= 5; // At least 5 out of 7 sections should be populated
  }

  private static calculateCompleteness(insights: any): number {
    const totalSections = 7;
    const completedSections = [
      insights.platformRecommendations?.length > 0,
      insights.monthlyPlan?.length >= 30,
      insights.copywritingRecommendations?.length > 0,
      insights.competitorInsights?.length > 0,
      insights.industryInsights?.length > 0,
      insights.budgetStrategy?.length > 0,
      insights.metricOptimization?.length > 0
    ].filter(Boolean).length;

    return completedSections / totalSections;
  }

  private static calculateAIContentRatio(insights: any): number {
    // Check for AI-specific content patterns vs template patterns
    const aiIndicators = [
      insights.platformRecommendations?.some((p: any) => p.targetingParameters),
      insights.monthlyPlan?.some((d: any) => d.psychologicalTriggers),
      insights.copywritingRecommendations?.some((c: any) => c.awarenessStageVariations),
      insights.competitorInsights?.some((c: any) => c.marketingTactics),
      insights.industryInsights?.some((i: any) => i.economicFactors)
    ].filter(Boolean).length;

    return aiIndicators / 5;
  }

  private static countGeneratedSections(insights: any): number {
    return [
      insights.platformRecommendations?.length || 0,
      insights.monthlyPlan?.length || 0,
      insights.copywritingRecommendations?.length || 0,
      insights.competitorInsights?.length || 0,
      insights.industryInsights?.length || 0,
      insights.budgetStrategy?.length || 0,
      insights.metricOptimization?.length || 0
    ].reduce((sum, count) => sum + (count > 0 ? 1 : 0), 0);
  }

  private static enrichWithFallbackData(insights: any, request: IntelligenceRequest) {
    console.log('Enriching data with fallback content...');
    
    // Only add fallback data if sections are completely empty
    if (!insights.platformRecommendations?.length) {
      insights.platformRecommendations = this.generateFallbackPlatforms(request);
    }
    
    if (!insights.monthlyPlan?.length || insights.monthlyPlan.length < 30) {
      insights.monthlyPlan = this.generateFallbackMonthlyPlan(request);
    }
    
    if (!insights.copywritingRecommendations?.length) {
      insights.copywritingRecommendations = this.generateFallbackCopywriting(request);
    }
    
    if (!insights.competitorInsights?.length) {
      insights.competitorInsights = this.generateFallbackCompetitors(request);
    }
    
    if (!insights.industryInsights?.length) {
      insights.industryInsights = this.generateFallbackIndustry(request);
    }

    return insights;
  }

  private static generateFallbackPlatforms(request: IntelligenceRequest) {
    return [
      {
        platform: 'Facebook',
        priority: 1,
        reasoning: `Optimal for ${request.formData.businessType} targeting ${request.formData.targetAudience} with comprehensive targeting options`,
        expectedMetrics: { roas: 4.2, cpm: 12.50, cpc: 1.85, conversionRate: 3.8 },
        budgetAllocation: 35
      },
      {
        platform: 'Google Ads',
        priority: 2,
        reasoning: `High-intent search traffic for ${request.formData.productService} with strong conversion potential`,
        expectedMetrics: { roas: 5.1, cpm: 25.00, cpc: 3.50, conversionRate: 4.2 },
        budgetAllocation: 30
      }
    ];
  }

  private static generateFallbackMonthlyPlan(request: IntelligenceRequest) {
    const plan = [];
    for (let day = 1; day <= 30; day++) {
      plan.push({
        day,
        platform: ['Facebook', 'Instagram', 'LinkedIn', 'Google Ads'][day % 4],
        contentType: day % 2 === 0 ? 'ad' : 'organic',
        hook: `Day ${day}: ${request.formData.businessName} transforms ${request.formData.industry}`,
        body: `Discover how ${request.formData.businessName} helps ${request.formData.targetAudience} achieve better results`,
        cta: ['Book Consultation', 'Get Quote', 'Start Trial', 'Learn More'][day % 4],
        expectedMetrics: {
          reach: Math.floor(Math.random() * 8000) + 3000,
          engagement: Math.floor(Math.random() * 400) + 200
        }
      });
    }
    return plan;
  }

  private static generateFallbackCopywriting(request: IntelligenceRequest) {
    return [{
      copyType: 'Primary Outreach',
      awarenessStageVariations: {
        unaware: `Are ${request.formData.targetAudience} missing growth opportunities?`,
        problemAware: `Struggling with challenges in ${request.formData.industry}?`,
        solutionAware: `${request.formData.businessName} offers proven solutions`,
        productAware: `See why clients choose ${request.formData.businessName}`,
        mostAware: `Ready to get started with ${request.formData.businessName}?`
      }
    }];
  }

  private static generateFallbackCompetitors(request: IntelligenceRequest) {
    return [{
      competitor: `Leading ${request.formData.industry} Provider`,
      keyStrategies: ['Market leadership', 'Premium positioning', 'Established presence'],
      strengths: ['Brand recognition', 'Market share', 'Resources'],
      weaknesses: ['Higher pricing', 'Less flexibility', 'Slower innovation'],
      opportunities: ['Personalized service', 'Competitive pricing', 'Faster implementation']
    }];
  }

  private static generateFallbackIndustry(request: IntelligenceRequest) {
    return [{
      trend: `Growing demand for ${request.formData.productService} in ${request.formData.industry}`,
      impact: `Increased market opportunities for ${request.formData.businessType} businesses`,
      opportunity: `Position ${request.formData.businessName} as industry leader`,
      timeline: 'Growing opportunity over next 12-18 months'
    }];
  }
}
