
export interface BusinessData {
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

export interface CompetitorData {
  competitors: Array<{
    domain: string;
    monthlyVisitors: number;
    conversionRate: number;
    adSpend: number;
    roas: number;
    topAds: Array<{
      hook: string;
      body: string;
      cta: string;
      emotions: string[];
      platform: string;
    }>;
  }>;
  emotionalTriggers: {
    primary: string[];
    secondary: string[];
  };
  platformPriorities: Array<{
    platform: string;
    priority: number;
    budgetAllocation: number;
    reasoning: string;
    expectedResults: string;
  }>;
}

export interface MarketingSolution {
  strategy: {
    primaryPlatforms: string[];
    keyObjectives: string[];
    expectedROAS: number;
    budgetAllocation: Record<string, number>;
  };
  contentCalendar: {
    weekly: {
      adCount: number;
      organicPosts: number;
    };
    monthly: {
      totalAds: number;
      totalOrganicPosts: number;
    };
  };
  monthlyPlan: Array<{
    day: number;
    platform: string;
    contentType: 'ad' | 'organic';
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
  }>;
  metricOptimization: Array<{
    metric: string;
    currentBenchmark: number;
    targetBenchmark: number;
    warningThresholds: {
      poor: number;
      average: number;
      good: number;
      excellent: number;
    };
    improvementStrategies: string[];
  }>;
  industrySpecificTips: string[];
  competitorInsights: {
    gapOpportunities: string[];
    differentiationStrategy: string[];
  };
}

export class MarketingSolutionGenerator {
  static async generateComprehensiveSolution(
    businessData: BusinessData,
    competitorData: CompetitorData
  ): Promise<MarketingSolution> {
    // Calculate budget allocation based on platform priorities
    const budgetAllocation: Record<string, number> = {};
    const totalBudget = businessData.budget;
    
    competitorData.platformPriorities.forEach(platform => {
      const allocation = (platform.budgetAllocation / 100) * totalBudget;
      budgetAllocation[platform.platform] = Math.round(allocation);
    });

    // Generate 30-day content plan
    const monthlyPlan = this.generateMonthlyPlan(businessData, competitorData);
    
    // Calculate expected ROAS based on industry and budget
    const expectedROAS = this.calculateExpectedROAS(businessData, competitorData);
    
    // Generate metric optimization guide
    const metricOptimization = this.generateMetricOptimization(businessData);
    
    // Generate industry-specific tips
    const industryTips = this.generateIndustryTips(businessData);
    
    // Generate competitive insights
    const competitorInsights = this.generateCompetitorInsights(competitorData);

    return {
      strategy: {
        primaryPlatforms: competitorData.platformPriorities
          .sort((a, b) => a.priority - b.priority)
          .slice(0, 3)
          .map(p => p.platform),
        keyObjectives: this.generateKeyObjectives(businessData),
        expectedROAS,
        budgetAllocation
      },
      contentCalendar: {
        weekly: {
          adCount: businessData.marketingType === 'paid' ? 5 : 2,
          organicPosts: businessData.marketingType === 'organic' ? 7 : 5
        },
        monthly: {
          totalAds: businessData.marketingType === 'paid' ? 20 : 8,
          totalOrganicPosts: businessData.marketingType === 'organic' ? 28 : 20
        }
      },
      monthlyPlan,
      metricOptimization,
      industrySpecificTips: industryTips,
      competitorInsights
    };
  }

  private static generateMonthlyPlan(
    businessData: BusinessData,
    competitorData: CompetitorData
  ) {
    const plan = [];
    const platforms = competitorData.platformPriorities
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 3);
    
    const contentTypes = businessData.marketingType === 'paid' 
      ? ['ad', 'ad', 'organic'] 
      : ['organic', 'organic', 'ad'];
    
    const hooks = [
      "Stop scrolling if you're tired of...",
      "This simple trick changed everything for...",
      "Why most people fail at...",
      "The secret that nobody talks about...",
      "Before you spend another dollar on...",
      "Here's what happened when I...",
      "The biggest mistake I see people make...",
      "This might sound crazy, but...",
      "I used to think... until I discovered...",
      "Warning: Don't try this unless..."
    ];

    const ctas = [
      "Get started today",
      "Learn more now",
      "Claim your spot",
      "Don't miss out",
      "Start your journey",
      "Transform your life",
      "Join thousands of others",
      "Take action now",
      "Discover the secret",
      "Unlock your potential"
    ];

    for (let day = 1; day <= 30; day++) {
      const platform = platforms[day % platforms.length];
      const contentType = contentTypes[day % contentTypes.length];
      const hook = hooks[day % hooks.length];
      const cta = ctas[day % ctas.length];

      plan.push({
        day,
        platform: platform.platform,
        contentType,
        hook,
        body: `Compelling content that addresses ${businessData.targetAudience} pain points and showcases ${businessData.productDescription}. Focus on ${competitorData.emotionalTriggers.primary[0]} to drive engagement.`,
        cta,
        visual: contentType === 'ad' 
          ? `High-converting ${platform.platform} ad creative with product focus`
          : `Engaging social media graphic for ${platform.platform}`,
        hashtags: platform.platform.toLowerCase().includes('instagram') || platform.platform.toLowerCase().includes('tiktok')
          ? [`#${businessData.industry.toLowerCase()}`, `#${businessData.businessType.toLowerCase()}`, '#growth', '#success']
          : undefined,
        reasoning: `Day ${day} focuses on ${competitorData.emotionalTriggers.primary[0]} trigger to maximize ${businessData.campaignGoal} for ${businessData.targetAudience}.`,
        expectedMetrics: {
          estimatedReach: Math.round(businessData.monthlyUsers * (contentType === 'ad' ? 0.1 : 0.05)),
          estimatedEngagement: Math.round(businessData.monthlyUsers * 0.02),
          estimatedCost: contentType === 'ad' ? Math.round(businessData.budget / 20) : undefined,
          estimatedConversions: Math.round(businessData.monthlyUsers * (businessData.conversionRate / 100) * 0.1)
        },
        optimizationTips: [
          `Test different variations of the ${hook.split(' ')[0].toLowerCase()} hook`,
          `A/B test CTA placement and color for ${platform.platform}`,
          `Monitor ${businessData.campaignGoal} metrics closely`
        ]
      });
    }

    return plan;
  }

  private static calculateExpectedROAS(
    businessData: BusinessData,
    competitorData: CompetitorData
  ): number {
    const industryMultipliers: Record<string, number> = {
      'ecommerce': 4.2,
      'saas': 3.8,
      'fitness': 4.5,
      'coaching': 5.2,
      'agency': 3.5,
      'default': 4.0
    };

    const baseROAS = industryMultipliers[businessData.industry.toLowerCase()] || industryMultipliers.default;
    const competitorAvgROAS = competitorData.competitors.reduce((sum, comp) => sum + comp.roas, 0) / competitorData.competitors.length;
    
    return Math.round(((baseROAS + competitorAvgROAS) / 2) * 10) / 10;
  }

  private static generateKeyObjectives(businessData: BusinessData): string[] {
    const objectives = [
      `Increase ${businessData.campaignGoal} by 150% within ${businessData.timeline}`,
      `Achieve ${businessData.conversionRate * 1.5}% conversion rate improvement`,
      `Build brand awareness within ${businessData.targetAudience} segment`,
      `Establish market leadership in ${businessData.industry}`,
      `Generate $${businessData.budget * 4} in revenue from marketing efforts`
    ];

    return objectives.slice(0, 4);
  }

  private static generateMetricOptimization(businessData: BusinessData) {
    return [
      {
        metric: 'Conversion Rate',
        currentBenchmark: businessData.conversionRate,
        targetBenchmark: businessData.conversionRate * 1.8,
        warningThresholds: {
          poor: 1.0,
          average: 2.5,
          good: 4.0,
          excellent: 6.0
        },
        improvementStrategies: [
          'Optimize landing page load speed and mobile experience',
          'A/B test headlines and call-to-action buttons',
          'Implement social proof and testimonials',
          'Reduce form fields and simplify checkout process'
        ]
      },
      {
        metric: 'Cost Per Click (CPC)',
        currentBenchmark: Math.round((businessData.budget / businessData.monthlyUsers) * 100) / 100,
        targetBenchmark: Math.round((businessData.budget / (businessData.monthlyUsers * 1.3)) * 100) / 100,
        warningThresholds: {
          poor: 5.0,
          average: 3.0,
          good: 2.0,
          excellent: 1.0
        },
        improvementStrategies: [
          'Improve ad relevance and quality scores',
          'Target more specific, long-tail keywords',
          'Optimize ad scheduling for peak performance hours',
          'Refine audience targeting to reduce competition'
        ]
      },
      {
        metric: 'Return on Ad Spend (ROAS)',
        currentBenchmark: 3.2,
        targetBenchmark: 5.0,
        warningThresholds: {
          poor: 2.0,
          average: 3.0,
          good: 4.0,
          excellent: 5.0
        },
        improvementStrategies: [
          'Focus budget on highest-performing campaigns',
          'Implement dynamic product ads for better targeting',
          'Optimize for lifetime value, not just initial purchase',
          'Use retargeting campaigns to re-engage warm audiences'
        ]
      }
    ];
  }

  private static generateIndustryTips(businessData: BusinessData): string[] {
    const industryTips: Record<string, string[]> = {
      'ecommerce': [
        'Use abandoned cart email sequences to recover 15-30% of lost sales',
        'Implement user-generated content campaigns to build social proof',
        'Create seasonal and holiday-specific marketing campaigns',
        'Focus on mobile optimization - 60% of purchases happen on mobile'
      ],
      'saas': [
        'Offer free trials with feature limitations rather than time limits',
        'Create in-depth case studies showcasing ROI for existing customers',
        'Use progressive onboarding to reduce churn in first 30 days',
        'Implement usage-based email campaigns to encourage feature adoption'
      ],
      'fitness': [
        'Leverage before/after transformations in all marketing materials',
        'Create community-driven challenges and accountability programs',
        'Partner with micro-influencers in fitness and wellness niches',
        'Use time-sensitive offers to create urgency around health goals'
      ],
      'coaching': [
        'Share client success stories and testimonials prominently',
        'Offer free discovery calls to build trust and demonstrate value',
        'Create valuable lead magnets like assessments or mini-courses',
        'Use video content to showcase personality and build connection'
      ]
    };

    return industryTips[businessData.industry.toLowerCase()] || [
      'Focus on customer testimonials and social proof',
      'Create valuable content that addresses customer pain points',
      'Use retargeting campaigns to stay top-of-mind',
      'Implement email marketing automation for nurturing leads'
    ];
  }

  private static generateCompetitorInsights(competitorData: CompetitorData) {
    const gaps = [
      'Opportunity to dominate untapped emotional triggers in messaging',
      'Gap in platform coverage - competitors weak on emerging platforms',
      'Pricing positioning opportunity in premium market segment',
      'Content frequency gap - competitors posting inconsistently',
      'Customer service differentiation opportunity in response time'
    ];

    const differentiation = [
      'Focus on unique value proposition that competitors are missing',
      'Create more personalized customer experience than market leaders',
      'Implement faster customer service response than industry average',
      'Develop proprietary methodology or framework for market leadership',
      'Build stronger community engagement than existing competitors'
    ];

    return {
      gapOpportunities: gaps.slice(0, 3),
      differentiationStrategy: differentiation.slice(0, 3)
    };
  }
}
