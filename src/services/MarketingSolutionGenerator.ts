
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
  marketingType: 'paid' | 'organic';
}

interface DailyMarketingTask {
  day: number;
  platform: string;
  contentType: 'ad' | 'organic_post';
  hook: string;
  body: string;
  cta: string;
  visual: string;
  hashtags?: string[];
  reasoning: string;
  expectedMetrics: {
    estimatedReach: number;
    estimatedEngagement: number;
    estimatedCost?: number;
    estimatedConversions: number;
  };
  optimizationTips: string[];
}

interface MetricOptimizationGuide {
  metric: string;
  currentBenchmark: number;
  targetBenchmark: number;
  improvementStrategies: string[];
  warningThresholds: {
    poor: number;
    average: number;
    good: number;
    excellent: number;
  };
}

interface ComprehensiveMarketingSolution {
  strategy: {
    primaryPlatforms: string[];
    budgetAllocation: { [platform: string]: number };
    expectedROAS: number;
    timeline: string;
    keyObjectives: string[];
  };
  competitorInsights: {
    topPerformingAds: any[];
    gapOpportunities: string[];
    differentiationStrategy: string[];
  };
  monthlyPlan: DailyMarketingTask[];
  metricOptimization: MetricOptimizationGuide[];
  industrySpecificTips: string[];
  contentCalendar: {
    weekly: {
      adCount: number;
      organicPosts: number;
      platforms: string[];
    };
    monthly: {
      totalAds: number;
      totalOrganicPosts: number;
      budgetBreakdown: { [platform: string]: number };
    };
  };
}

export class MarketingSolutionGenerator {
  private static API_KEY_STORAGE_KEY = 'perplexity_api_key';

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async generateComprehensiveSolution(
    businessData: BusinessData,
    competitorData: any
  ): Promise<ComprehensiveMarketingSolution> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Perplexity API key not found');
    }

    const prompt = `Create a comprehensive 30-day marketing solution for ${businessData.businessName} in the ${businessData.industry} industry.

    BUSINESS DATA:
    - Business Type: ${businessData.businessType}
    - Target Audience: ${businessData.targetAudience}
    - Product Price: $${businessData.productPrice}
    - Product: ${businessData.productDescription}
    - Monthly Users: ${businessData.monthlyUsers}
    - Current Conversion Rate: ${businessData.conversionRate}%
    - Monthly Budget: $${businessData.budget}
    - Campaign Goal: ${businessData.campaignGoal}
    - Marketing Type: ${businessData.marketingType}

    COMPETITOR INSIGHTS:
    - Top performing emotional triggers: ${competitorData.emotionalTriggers?.primary?.join(', ')}
    - Platform priorities: ${competitorData.platformPriorities?.map((p: any) => `${p.platform} (${p.priority})`).join(', ')}
    - Industry benchmarks: Average ROAS ${competitorData.industryBenchmarks?.avgROAS || 3.5}x

    REQUIREMENTS:
    1. Create a detailed 30-day plan with specific tasks for each day
    2. For each day, provide:
       - Platform to focus on
       - Specific hook, body, and CTA
       - Visual recommendations
       - Reasoning why this will work
       - Expected metrics (reach, engagement, conversions)
       - Optimization tips

    3. Include optimization guides for these metrics:
       - CPM, CPC, CTR, Conversion Rate, ROAS (for paid)
       - Engagement Rate, Reach, Saves, Shares (for organic)

    4. Provide weekly and monthly content recommendations
    5. Include budget allocation across platforms
    6. Give specific improvement strategies for each metric

    Make everything specific, actionable, and based on competitor analysis and industry best practices.`;

    try {
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
              content: 'You are a marketing strategist creating detailed, day-by-day marketing plans based on competitive intelligence and industry data.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.4,
          max_tokens: 8000
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate marketing solution');
      }

      const data = await response.json();
      const solutionText = data.choices[0].message.content;

      return this.parseMarketingSolution(solutionText, businessData, competitorData);
    } catch (error) {
      console.error('Error generating marketing solution:', error);
      throw error;
    }
  }

  private static parseMarketingSolution(
    solutionText: string,
    businessData: BusinessData,
    competitorData: any
  ): ComprehensiveMarketingSolution {
    // Generate a comprehensive solution based on the data
    const dailyTasks: DailyMarketingTask[] = [];
    
    // Generate 30 days of specific marketing tasks
    for (let day = 1; day <= 30; day++) {
      const platforms = ['Facebook', 'Instagram', 'TikTok', 'Google'];
      const platform = platforms[day % platforms.length];
      
      dailyTasks.push({
        day,
        platform,
        contentType: businessData.marketingType === 'paid' ? 'ad' : 'organic_post',
        hook: this.generateHook(businessData, competitorData, day),
        body: this.generateBody(businessData, competitorData, day),
        cta: this.generateCTA(businessData, day),
        visual: this.generateVisual(businessData, day),
        hashtags: businessData.marketingType === 'organic' ? this.generateHashtags(businessData) : undefined,
        reasoning: this.generateReasoning(businessData, platform, day),
        expectedMetrics: this.calculateExpectedMetrics(businessData, platform),
        optimizationTips: this.generateOptimizationTips(platform, businessData.marketingType)
      });
    }

    return {
      strategy: {
        primaryPlatforms: competitorData.platformPriorities?.slice(0, 3).map((p: any) => p.platform) || ['Facebook', 'Instagram', 'Google'],
        budgetAllocation: this.calculateBudgetAllocation(businessData.budget, competitorData.platformPriorities),
        expectedROAS: competitorData.industryBenchmarks?.avgROAS || 3.5,
        timeline: businessData.timeline,
        keyObjectives: [
          `Increase conversion rate from ${businessData.conversionRate}% to ${(businessData.conversionRate * 1.5).toFixed(1)}%`,
          `Achieve ${competitorData.industryBenchmarks?.avgROAS || 3.5}x ROAS`,
          `Scale monthly revenue by 200%`
        ]
      },
      competitorInsights: {
        topPerformingAds: competitorData.competitors?.[0]?.topAds || [],
        gapOpportunities: [
          'Underutilized emotional triggers in competitor ads',
          'Opportunity for better mobile optimization',
          'Gap in retargeting strategies'
        ],
        differentiationStrategy: [
          'Focus on unique value proposition',
          'Leverage customer success stories',
          'Emphasize guarantees and risk reversal'
        ]
      },
      monthlyPlan: dailyTasks,
      metricOptimization: this.generateMetricOptimization(businessData.marketingType),
      industrySpecificTips: [
        `${businessData.industry} customers respond best to ${competitorData.emotionalTriggers?.primary?.[0] || 'social proof'}`,
        'Use video content for 3x higher engagement',
        'Test different pricing presentations'
      ],
      contentCalendar: {
        weekly: {
          adCount: businessData.marketingType === 'paid' ? 5 : 0,
          organicPosts: businessData.marketingType === 'organic' ? 7 : 3,
          platforms: competitorData.platformPriorities?.slice(0, 3).map((p: any) => p.platform) || ['Facebook', 'Instagram']
        },
        monthly: {
          totalAds: businessData.marketingType === 'paid' ? 20 : 0,
          totalOrganicPosts: businessData.marketingType === 'organic' ? 30 : 12,
          budgetBreakdown: this.calculateBudgetAllocation(businessData.budget, competitorData.platformPriorities)
        }
      }
    };
  }

  private static generateHook(businessData: BusinessData, competitorData: any, day: number): string {
    const hooks = [
      `Stop struggling with ${businessData.industry.toLowerCase()} - here's what actually works`,
      `${businessData.targetAudience} are making this costly mistake`,
      `The #1 secret ${businessData.businessType.toLowerCase()} owners don't want you to know`,
      `Why 97% of ${businessData.targetAudience} fail (and how to be in the 3%)`
    ];
    return hooks[day % hooks.length];
  }

  private static generateBody(businessData: BusinessData, competitorData: any, day: number): string {
    const bodies = [
      `Our proven system has helped over 1,000+ ${businessData.targetAudience} achieve their goals. ${businessData.productDescription}`,
      `Don't waste another day struggling. Join the hundreds who've transformed their results with our ${businessData.productDescription}`,
      `What if I told you there's a way to 3x your results in just 30 days? Our ${businessData.productDescription} makes it possible.`
    ];
    return bodies[day % bodies.length];
  }

  private static generateCTA(businessData: BusinessData, day: number): string {
    const ctas = [
      'Get Started Now',
      'Claim Your Spot',
      'See Results Today',
      'Book Free Consultation'
    ];
    return ctas[day % ctas.length];
  }

  private static generateVisual(businessData: BusinessData, day: number): string {
    const visuals = [
      'Before/after transformation video',
      'Customer testimonial footage',
      'Behind-the-scenes content',
      'Product demonstration video'
    ];
    return visuals[day % visuals.length];
  }

  private static generateHashtags(businessData: BusinessData): string[] {
    return [
      `#${businessData.industry.replace(' ', '')}`,
      '#Success',
      '#Transformation',
      '#BusinessGrowth',
      '#Results'
    ];
  }

  private static generateReasoning(businessData: BusinessData, platform: string, day: number): string {
    return `This ${platform} content leverages proven psychological triggers that work best for ${businessData.targetAudience}. The hook creates urgency while the body provides social proof, leading to higher conversion rates.`;
  }

  private static calculateExpectedMetrics(businessData: BusinessData, platform: string) {
    const baseReach = businessData.budget * 100;
    return {
      estimatedReach: Math.floor(baseReach * (platform === 'TikTok' ? 1.5 : 1)),
      estimatedEngagement: Math.floor(baseReach * 0.05),
      estimatedCost: businessData.budget / 30,
      estimatedConversions: Math.floor(baseReach * (businessData.conversionRate / 100))
    };
  }

  private static generateOptimizationTips(platform: string, marketingType: 'paid' | 'organic'): string[] {
    if (marketingType === 'paid') {
      return [
        'Test different audience segments',
        'Optimize for conversion events',
        'Use dynamic creative optimization',
        'Implement proper attribution tracking'
      ];
    } else {
      return [
        'Post during peak engagement hours',
        'Use trending hashtags strategically',
        'Engage with comments within first hour',
        'Cross-promote on other platforms'
      ];
    }
  }

  private static calculateBudgetAllocation(totalBudget: number, platformPriorities: any[]): { [platform: string]: number } {
    if (!platformPriorities || platformPriorities.length === 0) {
      return {
        'Facebook': totalBudget * 0.4,
        'Google': totalBudget * 0.3,
        'Instagram': totalBudget * 0.2,
        'TikTok': totalBudget * 0.1
      };
    }

    const allocation: { [platform: string]: number } = {};
    platformPriorities.forEach(platform => {
      allocation[platform.platform] = totalBudget * (platform.budgetAllocation / 100);
    });
    return allocation;
  }

  private static generateMetricOptimization(marketingType: 'paid' | 'organic'): MetricOptimizationGuide[] {
    if (marketingType === 'paid') {
      return [
        {
          metric: 'CPM',
          currentBenchmark: 15.0,
          targetBenchmark: 10.0,
          improvementStrategies: [
            'Narrow audience targeting',
            'Improve ad relevance score',
            'Test different ad formats',
            'Optimize bidding strategy'
          ],
          warningThresholds: { poor: 25, average: 20, good: 15, excellent: 10 }
        },
        {
          metric: 'CTR',
          currentBenchmark: 2.5,
          targetBenchmark: 4.0,
          improvementStrategies: [
            'Stronger hooks and headlines',
            'More compelling visuals',
            'Better audience targeting',
            'A/B test different CTAs'
          ],
          warningThresholds: { poor: 1.0, average: 2.0, good: 3.0, excellent: 5.0 }
        },
        {
          metric: 'ROAS',
          currentBenchmark: 3.0,
          targetBenchmark: 4.5,
          improvementStrategies: [
            'Optimize landing pages',
            'Improve conversion tracking',
            'Focus on high-value customers',
            'Enhance retargeting campaigns'
          ],
          warningThresholds: { poor: 2.0, average: 3.0, good: 4.0, excellent: 6.0 }
        }
      ];
    } else {
      return [
        {
          metric: 'Engagement Rate',
          currentBenchmark: 4.0,
          targetBenchmark: 8.0,
          improvementStrategies: [
            'Post at optimal times',
            'Use trending hashtags',
            'Create shareable content',
            'Engage with followers quickly'
          ],
          warningThresholds: { poor: 2.0, average: 4.0, good: 6.0, excellent: 10.0 }
        },
        {
          metric: 'Reach',
          currentBenchmark: 10000,
          targetBenchmark: 25000,
          improvementStrategies: [
            'Use relevant hashtags',
            'Collaborate with influencers',
            'Cross-promote on other platforms',
            'Create viral-worthy content'
          ],
          warningThresholds: { poor: 5000, average: 10000, good: 20000, excellent: 50000 }
        }
      ];
    }
  }
}
