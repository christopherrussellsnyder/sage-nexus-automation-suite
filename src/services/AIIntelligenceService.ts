
interface IntelligenceRequest {
  formData: {
    businessName: string;
    industry: string;
    targetAudience: string;
    productService: string;
    uniqueValue: string;
    monthlyRevenue: string;
    businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
    currentChallenges?: any;
    goals?: any;
    timeline?: any;
    competitorData?: any;
    currentMetrics?: any;
    copyType?: string;
    copywritingChallenges?: string;
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
    console.log('Generating AI intelligence with request:', request);
    
    try {
      // Simulate API call - replace with actual AI service integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { formData, intelligenceMode, businessType } = request;
      
      // Generate different responses based on intelligence mode
      switch (intelligenceMode) {
        case 'copywriting':
          return this.generateCopywritingIntelligence(formData);
        case 'marketing':
          return this.generateMarketingIntelligence(formData);
        case 'competitor':
          return this.generateCompetitorIntelligence(formData);
        default:
          return this.generateFullIntelligence(formData);
      }
    } catch (error) {
      console.error('AI Intelligence generation failed:', error);
      throw new Error('Failed to generate AI intelligence. Please check your configuration.');
    }
  }

  private static generateCopywritingIntelligence(formData: any) {
    return {
      copywritingRecommendations: [
        {
          type: formData.copyType || 'website',
          headline: `Transform your ${formData.industry} business with compelling copy`,
          subheading: 'AI-powered messaging that converts visitors into customers',
          variations: [
            'Professional copy that drives results',
            'Convert more visitors with strategic messaging',
            'Your success story starts with better copy'
          ],
          emotionalTriggers: ['urgency', 'trust', 'exclusivity'],
          awarenessStage: 'problem-aware'
        }
      ],
      industryInsights: [
        {
          insight: `${formData.industry} businesses see 40% higher conversion rates with personalized messaging`,
          recommendation: 'Focus on industry-specific pain points in your copy',
          priority: 'high'
        }
      ]
    };
  }

  private static generateMarketingIntelligence(formData: any) {
    return {
      platformRecommendations: [
        {
          platform: 'Google Ads',
          priority: 'high',
          reasoning: `Perfect for ${formData.industry} targeting`,
          estimatedCost: '$500-1500/month',
          expectedROI: '300%'
        }
      ],
      monthlyPlan: [
        {
          day: 1,
          activity: 'Launch initial campaign setup',
          platform: 'Google Ads',
          priority: 'high'
        }
      ],
      metricOptimization: [
        {
          metric: 'Conversion Rate',
          currentValue: formData.currentMetrics?.conversionRate || '2.5%',
          targetValue: '4.5%',
          strategy: 'Optimize landing pages and ad copy'
        }
      ]
    };
  }

  private static generateCompetitorIntelligence(formData: any) {
    return {
      competitorInsights: [
        {
          competitor: `Leading ${formData.industry} Company`,
          strength: 'Strong social media presence',
          weakness: 'Limited mobile optimization',
          opportunity: 'Target mobile-first messaging'
        }
      ],
      industryInsights: [
        {
          insight: `${formData.industry} market growing at 15% annually`,
          recommendation: 'Capitalize on market expansion',
          priority: 'high'
        }
      ]
    };
  }

  private static generateFullIntelligence(formData: any) {
    return {
      platformRecommendations: [
        {
          platform: 'Google Ads',
          priority: 'high',
          reasoning: `Perfect for ${formData.industry} targeting`,
          estimatedCost: '$500-1500/month',
          expectedROI: '300%'
        },
        {
          platform: 'Facebook Ads',
          priority: 'medium',
          reasoning: 'Great for brand awareness and retargeting',
          estimatedCost: '$300-800/month',
          expectedROI: '250%'
        }
      ],
      monthlyPlan: [
        {
          day: 1,
          activity: 'Launch initial campaign setup',
          platform: 'Google Ads',
          priority: 'high'
        },
        {
          day: 7,
          activity: 'Analyze first week performance',
          platform: 'All Platforms',
          priority: 'medium'
        }
      ],
      copywritingRecommendations: [
        {
          type: 'website',
          headline: `Transform your ${formData.industry} business`,
          subheading: 'Professional solutions that deliver results',
          variations: [
            'Industry-leading solutions for growth',
            'Your success partner in business',
            'Proven strategies for your industry'
          ],
          emotionalTriggers: ['trust', 'results', 'expertise'],
          awarenessStage: 'solution-aware'
        }
      ],
      competitorInsights: [
        {
          competitor: `Top ${formData.industry} Competitor`,
          strength: 'Established market presence',
          weakness: 'Outdated marketing approach',
          opportunity: 'Leverage modern digital strategies'
        }
      ],
      metricOptimization: [
        {
          metric: 'Cost Per Acquisition',
          currentValue: formData.currentMetrics?.cpa || '$50',
          targetValue: '$35',
          strategy: 'Improve targeting and ad relevance'
        }
      ],
      budgetStrategy: [
        {
          allocation: 'Google Ads: 40%',
          reasoning: 'Highest intent traffic',
          monthlyBudget: '$800'
        },
        {
          allocation: 'Facebook Ads: 30%',
          reasoning: 'Brand awareness and retargeting',
          monthlyBudget: '$600'
        }
      ],
      industryInsights: [
        {
          insight: `${formData.industry} businesses prioritizing digital marketing see 23% more growth`,
          recommendation: 'Invest in comprehensive digital strategy',
          priority: 'high'
        }
      ]
    };
  }
}
