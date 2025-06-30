
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
        
        if (textResponse.includes('<!DOCTYPE') || textResponse.includes('<html>')) {
          throw new Error('Intelligence generation service is not available. The API endpoint may not be properly configured.');
        }
        
        throw new Error('Server returned invalid response format. Expected JSON.');
      }

      const data = await response.json();
      console.log('Successfully received intelligence data');
      console.log('Raw API response structure:', Object.keys(data));
      
      // Process the data correctly - fix the double nesting issue
      return this.processIntelligenceData(data, request);
    } catch (error) {
      console.error('AI Intelligence Service Error:', error);
      
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
    console.log('Processing intelligence data...');
    console.log('Input data structure:', Object.keys(data));
    
    // Fix the double nesting issue - extract insights correctly
    let insights;
    if (data.insights && data.insights.insights) {
      // Handle double-nested structure from API
      console.log('Detected double-nested structure, extracting from insights.insights');
      insights = data.insights.insights;
    } else if (data.insights) {
      // Handle single-nested structure
      console.log('Using single-nested structure from insights');
      insights = data.insights;
    } else {
      // Fallback to data itself
      console.log('Using data directly as insights');
      insights = data;
    }
    
    // Log what we received after correction
    console.log('Processed insights structure:', {
      platformRecommendations: Array.isArray(insights.platformRecommendations) ? insights.platformRecommendations.length : 'not array',
      monthlyPlan: Array.isArray(insights.monthlyPlan) ? insights.monthlyPlan.length : 'not array',
      copywritingRecommendations: Array.isArray(insights.copywritingRecommendations) ? insights.copywritingRecommendations.length : 'not array',
      competitorInsights: Array.isArray(insights.competitorInsights) ? insights.competitorInsights.length : 'not array',
      industryInsights: Array.isArray(insights.industryInsights) ? insights.industryInsights.length : 'not array',
      budgetStrategy: Array.isArray(insights.budgetStrategy) ? insights.budgetStrategy.length : 'not array',
      metricOptimization: Array.isArray(insights.metricOptimization) ? insights.metricOptimization.length : 'not array'
    });

    // Ensure all arrays exist and are properly formatted
    const processedInsights = {
      platformRecommendations: Array.isArray(insights.platformRecommendations) ? insights.platformRecommendations : [],
      monthlyPlan: Array.isArray(insights.monthlyPlan) ? insights.monthlyPlan : [],
      budgetStrategy: Array.isArray(insights.budgetStrategy) ? insights.budgetStrategy : [],
      copywritingRecommendations: Array.isArray(insights.copywritingRecommendations) ? insights.copywritingRecommendations : [],
      metricOptimization: Array.isArray(insights.metricOptimization) ? insights.metricOptimization : [],
      competitorInsights: Array.isArray(insights.competitorInsights) ? insights.competitorInsights : [],
      industryInsights: Array.isArray(insights.industryInsights) ? insights.industryInsights : []
    };

    // Validate AI content quality
    const validation = this.validateAIContent(processedInsights);
    console.log('Content validation after processing:', validation);

    const processedData = {
      insights: processedInsights, // Return as single-nested structure
      generatedAt: new Date().toISOString(),
      intelligenceMode: request.intelligenceMode,
      businessType: request.businessType,
      businessName: request.formData.businessName,
      isAIGenerated: validation.isAIGenerated,
      dataQuality: {
        completeness: validation.completeness,
        aiContentRatio: validation.aiContentRatio,
        sectionsGenerated: validation.sectionsGenerated
      }
    };

    console.log('Final processed data structure:', {
      insightsKeys: Object.keys(processedData.insights),
      totalSections: Object.keys(processedData.insights).length,
      isAIGenerated: processedData.isAIGenerated,
      completeness: processedData.dataQuality.completeness,
      aiContentRatio: processedData.dataQuality.aiContentRatio
    });

    return processedData;
  }

  private static validateAIContent(insights: any): {
    isAIGenerated: boolean;
    completeness: number;
    aiContentRatio: number;
    sectionsGenerated: number;
  } {
    const sections = [
      { name: 'platformRecommendations', data: insights.platformRecommendations },
      { name: 'monthlyPlan', data: insights.monthlyPlan },
      { name: 'copywritingRecommendations', data: insights.copywritingRecommendations },
      { name: 'competitorInsights', data: insights.competitorInsights },
      { name: 'industryInsights', data: insights.industryInsights },
      { name: 'budgetStrategy', data: insights.budgetStrategy },
      { name: 'metricOptimization', data: insights.metricOptimization }
    ];

    let validSections = 0;
    let qualitySections = 0;

    sections.forEach(section => {
      const hasData = Array.isArray(section.data) && section.data.length > 0;
      if (hasData) {
        validSections++;
        console.log(`✓ Section ${section.name} has ${section.data.length} items`);
        
        // Check for AI-specific quality indicators
        const hasQualityData = section.data.some((item: any) => {
          // Look for complex objects with multiple properties
          return item && typeof item === 'object' && Object.keys(item).length > 3;
        });
        
        if (hasQualityData) {
          qualitySections++;
        }
      } else {
        console.log(`✗ Section ${section.name} is empty or invalid`);
      }
    });

    const completeness = validSections / sections.length;
    const aiContentRatio = qualitySections / sections.length;
    const isAIGenerated = validSections >= 4; // At least 4 out of 7 sections should have data

    console.log('Final validation results:', {
      validSections,
      qualitySections,
      totalSections: sections.length,
      completeness,
      aiContentRatio,
      isAIGenerated
    });

    return {
      isAIGenerated,
      completeness,
      aiContentRatio,
      sectionsGenerated: validSections
    };
  }
}
