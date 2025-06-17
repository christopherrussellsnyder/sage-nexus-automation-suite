
interface BusinessData {
  businessName: string;
  industry: string;
  businessType: string;
  targetAudience: string;
  productPrice: number;
  productDescription: string;
  monthlyUsers: number;
  conversionRate: number;
  budget: number;
  timeline: string;
  campaignGoal: string;
  marketingType: 'organic' | 'paid';
}

interface CompetitorMetrics {
  domain: string;
  monthlyVisitors: number;
  conversionRate: number;
  topAds: AdData[];
  organicContent: OrganicContentData[];
  platformPerformance: PlatformMetrics[];
}

interface AdData {
  platform: string;
  hook: string;
  body: string;
  cta: string;
  roas: number;
  cpm: number;
  impressions: number;
  reach: number;
  cpc: number;
  conversionRate: number;
  emotions: string[];
  visualDescription: string;
}

interface OrganicContentData {
  platform: string;
  caption: string;
  likes: number;
  shares: number;
  comments: number;
  engagement: number;
  contentType: string;
  visualDescription: string;
  emotions: string[];
}

interface PlatformMetrics {
  platform: string;
  priority: number;
  expectedROAS: number;
  expectedCPM: number;
  expectedConversion: number;
  reasoning: string;
}

interface MarketingSolution {
  platformRecommendations: PlatformRecommendation[];
  monthlyPlan: DailyMarketingPlan[];
  industryEmotions: string[];
  optimizationTips: OptimizationTip[];
  competitorInsights: CompetitorInsight[];
}

interface PlatformRecommendation {
  platform: string;
  priority: number;
  reasoning: string;
  expectedMetrics: {
    roas: number;
    cpm: number;
    conversionRate: number;
  };
}

interface DailyMarketingPlan {
  day: number;
  platform: string;
  contentType: 'ad' | 'organic';
  hook: string;
  body: string;
  cta: string;
  reasoning: string;
  visualSuggestions: string;
  expectedMetrics: any;
}

interface OptimizationTip {
  metric: string;
  issue: string;
  solution: string;
  expectedImprovement: string;
}

interface CompetitorInsight {
  competitor: string;
  keyStrategy: string;
  performanceMetric: string;
  applicationForUser: string;
}

export class MarketingIntelligenceService {
  private static API_KEY_STORAGE_KEY = 'perplexity_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async generateMarketingSolution(businessData: BusinessData): Promise<MarketingSolution> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Perplexity API key not found. Please set your API key first.');
    }

    try {
      // First, analyze competitors
      const competitorData = await this.analyzeCompetitors(businessData, apiKey);
      
      // Then generate the marketing solution
      const solution = await this.createMarketingSolution(businessData, competitorData, apiKey);
      
      return solution;
    } catch (error) {
      console.error('Error generating marketing solution:', error);
      throw error;
    }
  }

  private static async analyzeCompetitors(businessData: BusinessData, apiKey: string): Promise<CompetitorMetrics[]> {
    const prompt = `Analyze the top 10 competitors in the ${businessData.industry} ${businessData.businessType} industry targeting ${businessData.targetAudience}.

    For each competitor, provide:
    1. Website domain and monthly traffic estimates
    2. Conversion rate estimates
    3. Top performing ${businessData.marketingType === 'paid' ? 'advertisements from Facebook, Google, TikTok, Instagram ad libraries' : 'organic content from Facebook, TikTok, Instagram'}
    4. Specific ad copy breakdown (hook, body, CTA) and performance metrics (ROAS, CPM, impressions, reach, CPC, conversion rates)
    5. Visual descriptions of top performing content
    6. Emotional triggers used effectively
    7. Platform-specific performance data

    Focus on recent data (last 3 months) and provide specific examples with actual performance metrics where available.`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a marketing intelligence expert analyzing competitor data. Provide detailed, specific metrics and examples.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000,
        search_recency_filter: 'month'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze competitors');
    }

    const data = await response.json();
    return this.parseCompetitorData(data.choices[0].message.content);
  }

  private static async createMarketingSolution(
    businessData: BusinessData, 
    competitorData: CompetitorMetrics[], 
    apiKey: string
  ): Promise<MarketingSolution> {
    const prompt = `Create a comprehensive 30-day marketing solution for ${businessData.businessName}.

    Business Details:
    - Industry: ${businessData.industry}
    - Business Type: ${businessData.businessType}
    - Target Audience: ${businessData.targetAudience}
    - Product Price: $${businessData.productPrice}
    - Product: ${businessData.productDescription}
    - Monthly Users: ${businessData.monthlyUsers}
    - Current Conversion Rate: ${businessData.conversionRate}%
    - Budget: $${businessData.budget}
    - Campaign Goal: ${businessData.campaignGoal}
    - Marketing Type: ${businessData.marketingType}

    Based on competitor analysis, create:
    1. Platform priority ranking (Facebook, Google, TikTok, Instagram) with reasoning
    2. 30-day content calendar with specific ${businessData.marketingType === 'paid' ? 'ad templates' : 'organic content'} for each day
    3. For each template: hook, body, CTA, visual suggestions, and performance reasoning
    4. Industry-specific emotional triggers that convert best
    5. Optimization recommendations for each metric (ROAS, CPM, CPC, conversion rate, engagement)
    6. Competitor insights and how to apply them

    Make recommendations based on the user's current metrics vs competitor benchmarks.`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a marketing strategist creating detailed, actionable marketing solutions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate marketing solution');
    }

    const data = await response.json();
    return this.parseMarketingSolution(data.choices[0].message.content, businessData);
  }

  private static parseCompetitorData(analysisText: string): CompetitorMetrics[] {
    // In production, this would parse the AI response using NLP
    // For now, returning structured mock data based on typical competitor analysis
    return [
      {
        domain: 'competitor1.com',
        monthlyVisitors: 150000,
        conversionRate: 3.2,
        topAds: [
          {
            platform: 'Facebook',
            hook: 'Stop wasting money on solutions that don\'t work',
            body: 'Our proven system has helped 10,000+ businesses increase revenue by 300% in just 90 days',
            cta: 'Get Started Free Today',
            roas: 4.2,
            cpm: 8.50,
            impressions: 250000,
            reach: 180000,
            cpc: 1.20,
            conversionRate: 3.8,
            emotions: ['urgency', 'social proof', 'fear of missing out'],
            visualDescription: 'Split screen showing before/after business results with testimonial overlay'
          }
        ],
        organicContent: [
          {
            platform: 'TikTok',
            caption: 'POV: You finally found a solution that actually works 👀',
            likes: 45000,
            shares: 3200,
            comments: 1800,
            engagement: 8.2,
            contentType: 'behind-the-scenes',
            visualDescription: 'Quick montage of success stories with trending audio',
            emotions: ['curiosity', 'relatability', 'aspiration']
          }
        ],
        platformPerformance: [
          {
            platform: 'Facebook',
            priority: 1,
            expectedROAS: 4.2,
            expectedCPM: 8.50,
            expectedConversion: 3.8,
            reasoning: 'Best for detailed targeting and proven conversion rates'
          }
        ]
      }
    ];
  }

  private static parseMarketingSolution(solutionText: string, businessData: BusinessData): MarketingSolution {
    // In production, this would parse the AI response
    // For now, returning structured solution based on business data
    return {
      platformRecommendations: [
        {
          platform: 'Facebook',
          priority: 1,
          reasoning: 'Best ROI for your target demographic and budget range',
          expectedMetrics: {
            roas: 3.8,
            cpm: 9.20,
            conversionRate: 4.1
          }
        },
        {
          platform: 'Instagram',
          priority: 2,
          reasoning: 'Strong visual platform for your product category',
          expectedMetrics: {
            roas: 3.2,
            cpm: 12.40,
            conversionRate: 3.6
          }
        }
      ],
      monthlyPlan: this.generateMonthlyPlan(businessData),
      industryEmotions: ['urgency', 'social proof', 'transformation', 'exclusivity'],
      optimizationTips: [
        {
          metric: 'ROAS',
          issue: 'Below industry average of 4.0',
          solution: 'Improve ad targeting and test high-converting competitor hooks',
          expectedImprovement: '25-40% increase in ROAS'
        },
        {
          metric: 'CPM',
          issue: 'Higher than optimal range',
          solution: 'Refresh creative assets and test different audience segments',
          expectedImprovement: '15-30% reduction in CPM'
        }
      ],
      competitorInsights: [
        {
          competitor: 'Top Competitor',
          keyStrategy: 'Problem-agitation-solution framework with strong social proof',
          performanceMetric: '4.2 ROAS, 3.8% conversion rate',
          applicationForUser: 'Implement similar testimonial-driven approach with your unique value proposition'
        }
      ]
    };
  }

  private static generateMonthlyPlan(businessData: BusinessData): DailyMarketingPlan[] {
    const plan: DailyMarketingPlan[] = [];
    const platforms = ['Facebook', 'Instagram', 'TikTok', 'Google'];
    
    for (let day = 1; day <= 30; day++) {
      const platform = platforms[day % platforms.length];
      
      plan.push({
        day,
        platform,
        contentType: businessData.marketingType === 'paid' ? 'ad' : 'organic',
        hook: `Day ${day}: Are you still struggling with [specific problem]?`,
        body: `Here's how ${businessData.businessName} solves this exact issue for businesses like yours...`,
        cta: businessData.marketingType === 'paid' ? 'Get Started Now' : 'Follow for more tips',
        reasoning: `Optimized for ${platform} algorithm and your target audience behavior patterns`,
        visualSuggestions: `${businessData.marketingType === 'paid' ? 'Split-screen comparison' : 'Behind-the-scenes content'} showing your product in action`,
        expectedMetrics: {
          roas: businessData.marketingType === 'paid' ? 3.5 : null,
          engagement: businessData.marketingType === 'organic' ? 6.2 : null,
          reach: 15000
        }
      });
    }
    
    return plan;
  }
}
