
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
    monthlyAdBudget?: string;
    teamSize?: string;
    businessStage?: string;
    primaryGoal?: string;
    monthlyTraffic?: string;
    conversionRate?: string;
    marketingBudget?: string;
    clientRetentionRate?: string;
    averageProjectValue?: string;
    primaryGoals?: string[];
    revenueTarget?: string;
    successMetrics?: string;
    currentObstacles?: string;
    marketPosition?: string;
    competitiveAdvantage?: string;
    competitors?: any[];
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
      console.log('=== AI INTELLIGENCE GENERATION STARTED ===');
      console.log('Request payload:', {
        businessName: request.formData.businessName,
        intelligenceMode: request.intelligenceMode,
        businessType: request.businessType,
        hasRequiredData: !!(request.formData.businessName && request.formData.industry && request.formData.targetAudience)
      });
      
      // Enhanced validation before API call
      if (!request.formData.businessName?.trim()) {
        throw new Error('Business name is required for intelligence generation');
      }
      if (!request.formData.industry?.trim()) {
        throw new Error('Industry information is required for intelligence generation');
      }
      if (!request.formData.targetAudience?.trim()) {
        throw new Error('Target audience information is required for intelligence generation');
      }

      const supabaseUrl = 'https://qtckfvprvpxbbteinxve.supabase.co';
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-intelligence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y2tmdnBydnB4YmJ0ZWlueHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjY0MTcsImV4cCI6MjA2NDkwMjQxN30.0he21MpcO1l-pdiMcfekTtzlSiVRNYSaDWjHa_SFFBs`,
        },
        body: JSON.stringify(request)
      });

      console.log('API Response received - Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        
        // Enhanced error messaging
        if (response.status === 400) {
          throw new Error('Invalid request data. Please check all required fields are filled.');
        } else if (response.status === 401) {
          throw new Error('API authentication failed. Please check your OpenAI API key configuration.');
        } else if (response.status === 403) {
          throw new Error('Access denied. Please verify your API key has the necessary permissions.');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        }
        
        throw new Error(`Intelligence generation failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('=== RAW API RESPONSE ANALYSIS ===');
      console.log('Response structure:', {
        hasData: !!data,
        topLevelKeys: data ? Object.keys(data) : [],
        hasInsights: !!data?.insights,
        insightsKeys: data?.insights ? Object.keys(data.insights) : []
      });
      
      // Enhanced data extraction and validation
      let intelligenceData = data;
      
      // Handle nested insights structure
      if (data.insights) {
        console.log('Extracting insights from nested structure');
        intelligenceData = data.insights;
        
        // Handle double-nested structure
        if (data.insights.insights) {
          console.log('Detected double-nested insights - extracting');
          intelligenceData = data.insights.insights;
        }
      }

      // Comprehensive data validation
      const sectionValidation = {
        platformRecommendations: Array.isArray(intelligenceData.platformRecommendations) && intelligenceData.platformRecommendations.length > 0,
        monthlyPlan: Array.isArray(intelligenceData.monthlyPlan) && intelligenceData.monthlyPlan.length >= 25, // At least 25 days
        copywritingRecommendations: Array.isArray(intelligenceData.copywritingRecommendations) && intelligenceData.copywritingRecommendations.length > 0,
        competitorInsights: Array.isArray(intelligenceData.competitorInsights) && intelligenceData.competitorInsights.length > 0,
        industryInsights: Array.isArray(intelligenceData.industryInsights) && intelligenceData.industryInsights.length > 0,
        budgetStrategy: Array.isArray(intelligenceData.budgetStrategy) && intelligenceData.budgetStrategy.length > 0,
        metricOptimization: Array.isArray(intelligenceData.metricOptimization) && intelligenceData.metricOptimization.length > 0
      };

      console.log('=== SECTION VALIDATION RESULTS ===');
      Object.entries(sectionValidation).forEach(([section, isValid]) => {
        const count = intelligenceData[section]?.length || 0;
        console.log(`${section}: ${isValid ? '✓' : '✗'} (${count} items)`);
      });

      const validSections = Object.values(sectionValidation).filter(Boolean).length;
      const totalSections = Object.keys(sectionValidation).length;
      const completionRate = validSections / totalSections;

      console.log(`Completion Rate: ${Math.round(completionRate * 100)}% (${validSections}/${totalSections} sections)`);

      // Ensure minimum data quality
      if (completionRate < 0.4) { // Less than 40% completion
        console.warn('Low completion rate detected:', completionRate);
        console.warn('Available data sections:', validSections);
      }

      // Structure final response
      const finalData = {
        insights: intelligenceData,
        generatedAt: new Date().toISOString(),
        intelligenceMode: request.intelligenceMode,
        businessType: request.businessType,
        businessName: request.formData.businessName,
        isAIGenerated: completionRate >= 0.3, // At least 30% completion to be considered AI-generated
        dataQuality: {
          completeness: completionRate,
          aiContentRatio: completionRate >= 0.5 ? 1 : completionRate * 2, // Higher ratio for better completion
          sectionsGenerated: validSections,
          totalSections: totalSections,
          validationDetails: sectionValidation
        }
      };

      console.log('=== FINAL INTELLIGENCE DATA SUMMARY ===');
      console.log('Business:', finalData.businessName);
      console.log('Mode:', finalData.intelligenceMode);
      console.log('AI Generated:', finalData.isAIGenerated);
      console.log('Completion:', Math.round(finalData.dataQuality.completeness * 100) + '%');
      console.log('Valid Sections:', finalData.dataQuality.sectionsGenerated);

      return finalData;
      
    } catch (error) {
      console.error('=== AI INTELLIGENCE SERVICE ERROR ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Full error:', error);
      
      // Enhanced error handling with specific messages
      if (error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to intelligence service. Please check your internet connection.');
      } else if (error.message.includes('JSON')) {
        throw new Error('Data parsing error: Invalid response from intelligence service. Please try again.');
      } else if (error.message.includes('API key')) {
        throw new Error('Authentication error: Please ensure your OpenAI API key is properly configured in the project settings.');
      }
      
      throw new Error(`Intelligence generation failed: ${error.message}`);
    }
  }

  private static countGeneratedSections(data: any): number {
    let count = 0;
    const sections = [
      'platformRecommendations',
      'monthlyPlan', 
      'copywritingRecommendations',
      'competitorInsights',
      'industryInsights',
      'budgetStrategy',
      'metricOptimization'
    ];
    
    sections.forEach(section => {
      if (Array.isArray(data[section]) && data[section].length > 0) {
        count++;
      }
    });
    
    return count;
  }
}
