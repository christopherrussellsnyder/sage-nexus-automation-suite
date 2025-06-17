interface CompetitorData {
  domain: string;
  name: string;
  industry: string;
  adCopy: {
    headlines: string[];
    descriptions: string[];
    ctas: string[];
    emotions: string[];
    hooks: string[];
  };
  socialContent: {
    captions: string[];
    hashtags: string[];
    tones: string[];
    contentTypes: string[];
  };
  websiteCopy: {
    headlines: string[];
    valueProps: string[];
    testimonials: string[];
    features: string[];
  };
  pricingStrategy: {
    pricePoints: number[];
    offers: string[];
    guarantees: string[];
  };
  targetAudience: string[];
  brandPersonality: string[];
  contentThemes: string[];
  campaignStrategies: string[];
}

interface IndustryInsights {
  topPerformers: CompetitorData[];
  commonEmotions: string[];
  winningFormulas: string[];
  pricingBenchmarks: {
    average: number;
    premium: number;
    budget: number;
  };
  contentTrends: string[];
  successMetrics: {
    avgCTR: number;
    avgConversionRate: number;
    avgCPA: number;
  };
  marketGaps: string[];
  opportunityAreas: string[];
}

export class CompetitiveIntelligenceService {
  private static API_KEY_STORAGE_KEY = 'openai_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async analyzeIndustryCompetitors(
    industry: string, 
    businessType: string, 
    targetAudience: string,
    userBusinessName: string,
    userUniqueValue: string
  ): Promise<IndustryInsights> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set your API key first.');
    }

    try {
      const prompt = `Analyze the top 10 performing companies in the ${industry} ${businessType} space that target ${targetAudience}. 

      For each competitor, provide:
      1. Best performing ad headlines and descriptions
      2. Most engaging social media content styles and captions
      3. Website copy that converts (headlines, value propositions)
      4. Pricing strategies and offers
      5. Emotional triggers they use effectively
      6. Content themes that get engagement
      7. Target audience specifics
      8. Brand personality traits

      Also identify:
      - Common emotional triggers in this industry
      - Winning content formulas
      - Average pricing benchmarks
      - Content trends that drive results
      - Market gaps and opportunities
      - Success metrics (CTR, conversion rates, CPA)

      Provide detailed analysis with specific examples and actionable insights that ${userBusinessName} can use to differentiate with their unique value: ${userUniqueValue}.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a competitive intelligence expert analyzing marketing data. Provide detailed, actionable insights with specific examples and realistic metrics.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 4000
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze competitors');
      }

      const data = await response.json();
      const analysisText = data.choices[0].message.content;

      // Parse the analysis and structure it
      return this.parseCompetitorAnalysis(analysisText, userBusinessName, userUniqueValue);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
      throw error;
    }
  }

  private static parseCompetitorAnalysis(
    analysisText: string, 
    userBusiness: string, 
    userEdge: string
  ): IndustryInsights {
    // This would normally parse the AI response, but for now I'll return structured mock data
    // In production, you'd use NLP to extract structured data from the analysis
    return {
      topPerformers: [
        {
          domain: 'competitor1.com',
          name: 'Top Competitor 1',
          industry: 'Sample Industry',
          adCopy: {
            headlines: [
              'Transform Your Results in 30 Days',
              'The Solution You\'ve Been Waiting For',
              'Stop Struggling, Start Succeeding'
            ],
            descriptions: [
              'Join thousands who have already transformed their business',
              'Proven system that delivers results in weeks, not months'
            ],
            ctas: ['Get Started Today', 'Claim Your Spot', 'See Results Now'],
            emotions: ['urgency', 'authority', 'social proof', 'transformation'],
            hooks: ['Are you tired of...', 'What if I told you...', 'The secret that...']
          },
          socialContent: {
            captions: [
              'Behind the scenes of our latest success story',
              'The mistake everyone makes in this industry'
            ],
            hashtags: ['#success', '#transformation', '#results'],
            tones: ['inspirational', 'educational', 'behind-the-scenes'],
            contentTypes: ['case studies', 'tips', 'behind-the-scenes', 'testimonials']
          },
          websiteCopy: {
            headlines: [
              'The Industry Leader in Solutions',
              'Transform Your Business Today'
            ],
            valueProps: [
              '10x faster results than traditional methods',
              '24/7 support included'
            ],
            testimonials: [
              'This changed everything for my business',
              'Results in just 2 weeks'
            ],
            features: ['Feature 1', 'Feature 2', 'Feature 3']
          },
          pricingStrategy: {
            pricePoints: [299, 599, 1299],
            offers: ['30-day money back guarantee', 'Limited time 50% off'],
            guarantees: ['Results guaranteed or money back']
          },
          targetAudience: ['business owners', 'entrepreneurs', 'professionals'],
          brandPersonality: ['professional', 'trustworthy', 'results-driven'],
          contentThemes: ['success stories', 'industry insights', 'how-to guides'],
          campaignStrategies: ['social proof focused', 'problem-solution', 'transformation']
        }
      ],
      commonEmotions: ['urgency', 'social proof', 'fear of missing out', 'transformation', 'authority'],
      winningFormulas: [
        'Problem + Agitation + Solution + Social Proof',
        'Before/After Transformation Story',
        'Authority + Credibility + Results'
      ],
      pricingBenchmarks: {
        average: 500,
        premium: 1500,
        budget: 200
      },
      contentTrends: [
        'Behind-the-scenes content',
        'User-generated testimonials',
        'Educational how-to content'
      ],
      successMetrics: {
        avgCTR: 2.5,
        avgConversionRate: 3.2,
        avgCPA: 45
      },
      marketGaps: [
        'Lack of personalized solutions',
        'Poor customer support',
        'Complex onboarding process'
      ],
      opportunityAreas: [
        'Better customer experience',
        'More transparent pricing',
        'Faster results delivery'
      ]
    };
  }

  static async generatePersonalizedStrategy(
    industryInsights: IndustryInsights,
    userBusiness: string,
    userEdge: string,
    campaignGoal: string
  ): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const prompt = `Based on the competitive analysis data, create a personalized marketing strategy for ${userBusiness}.

    User's Unique Edge: ${userEdge}
    Campaign Goal: ${campaignGoal}
    
    Competitor insights show:
    - Common emotions: ${industryInsights.commonEmotions.join(', ')}
    - Winning formulas: ${industryInsights.winningFormulas.join(', ')}
    - Market gaps: ${industryInsights.marketGaps.join(', ')}
    - Opportunity areas: ${industryInsights.opportunityAreas.join(', ')}
    
    Create a strategy that:
    1. Leverages the user's unique edge to differentiate from competitors
    2. Uses proven emotional triggers from top performers
    3. Exploits identified market gaps
    4. Provides specific ad copy, social content, and campaign recommendations
    5. Includes pricing strategy relative to competitors
    
    Be specific and actionable with concrete examples.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a marketing strategist creating personalized campaigns based on competitive intelligence. Focus on actionable recommendations with specific examples.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.4,
          max_tokens: 3000
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate personalized strategy');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating strategy:', error);
      throw error;
    }
  }
}
