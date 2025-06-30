
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
      console.log('=== AI INTELLIGENCE GENERATION START ===');
      console.log('Request details:', {
        businessName: request.formData.businessName,
        intelligenceMode: request.intelligenceMode,
        businessType: request.businessType,
        formDataKeys: Object.keys(request.formData)
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

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API request failed:', response.status, errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('=== RAW API RESPONSE ===');
      console.log('Response data:', data);
      console.log('Response keys:', Object.keys(data));
      
      // Handle the response structure correctly
      let intelligenceData = data;
      
      // Check if we have nested insights structure
      if (data.insights) {
        console.log('Found insights in response');
        console.log('Insights keys:', Object.keys(data.insights));
        
        // Handle double-nested structure (insights.insights)
        if (data.insights.insights) {
          console.log('Detected double-nested insights structure');
          intelligenceData = data.insights.insights;
        } else {
          console.log('Using single-nested insights structure');
          intelligenceData = data.insights;
        }
      }

      console.log('=== PROCESSED INTELLIGENCE DATA ===');
      console.log('Platform recommendations:', intelligenceData.platformRecommendations?.length || 0);
      console.log('Monthly plan entries:', intelligenceData.monthlyPlan?.length || 0);
      console.log('Copywriting recommendations:', intelligenceData.copywritingRecommendations?.length || 0);
      console.log('Competitor insights:', intelligenceData.competitorInsights?.length || 0);
      console.log('Industry insights:', intelligenceData.industryInsights?.length || 0);
      console.log('Budget strategy entries:', intelligenceData.budgetStrategy?.length || 0);
      console.log('Metric optimization entries:', intelligenceData.metricOptimization?.length || 0);

      // Validate that we have the minimum required data
      const hasValidData = (
        (intelligenceData.platformRecommendations && intelligenceData.platformRecommendations.length > 0) ||
        (intelligenceData.monthlyPlan && intelligenceData.monthlyPlan.length > 0) ||
        (intelligenceData.copywritingRecommendations && intelligenceData.copywritingRecommendations.length > 0) ||
        (intelligenceData.competitorInsights && intelligenceData.competitorInsights.length > 0) ||
        (intelligenceData.industryInsights && intelligenceData.industryInsights.length > 0) ||
        (intelligenceData.budgetStrategy && intelligenceData.budgetStrategy.length > 0) ||
        (intelligenceData.metricOptimization && intelligenceData.metricOptimization.length > 0)
      );

      console.log('Has valid AI data:', hasValidData);

      // Return properly structured data
      const finalData = {
        insights: intelligenceData, // Direct structure without double nesting
        generatedAt: new Date().toISOString(),
        intelligenceMode: request.intelligenceMode,
        businessType: request.businessType,
        businessName: request.formData.businessName,
        isAIGenerated: hasValidData,
        dataQuality: {
          completeness: hasValidData ? 1 : 0,
          aiContentRatio: hasValidData ? 1 : 0,
          sectionsGenerated: this.countGeneratedSections(intelligenceData)
        }
      };

      console.log('=== FINAL RESPONSE STRUCTURE ===');
      console.log('Final data keys:', Object.keys(finalData));
      console.log('Final insights keys:', Object.keys(finalData.insights));
      console.log('Is AI Generated:', finalData.isAIGenerated);
      console.log('Data quality:', finalData.dataQuality);

      return finalData;
    } catch (error) {
      console.error('AI Intelligence Service Error:', error);
      throw new Error(`Failed to generate AI intelligence: ${error.message}`);
    }
  }

  private static countGeneratedSections(data: any): number {
    let count = 0;
    if (data.platformRecommendations && data.platformRecommendations.length > 0) count++;
    if (data.monthlyPlan && data.monthlyPlan.length > 0) count++;
    if (data.copywritingRecommendations && data.copywritingRecommendations.length > 0) count++;
    if (data.competitorInsights && data.competitorInsights.length > 0) count++;
    if (data.industryInsights && data.industryInsights.length > 0) count++;
    if (data.budgetStrategy && data.budgetStrategy.length > 0) count++;
    if (data.metricOptimization && data.metricOptimization.length > 0) count++;
    return count;
  }
}
