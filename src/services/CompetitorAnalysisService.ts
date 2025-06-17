
interface CompetitorMetrics {
  domain: string;
  monthlyVisitors: number;
  conversionRate: number;
  adSpend: number;
  roas: number;
  topAds: AdPerformanceData[];
  organicContent: OrganicContentData[];
  websiteCopy: WebsiteCopyData;
}

interface AdPerformanceData {
  platform: 'facebook' | 'google' | 'tiktok' | 'instagram';
  hook: string;
  body: string;
  cta: string;
  visual: string;
  metrics: {
    cpm: number;
    cpc: number;
    ctr: number;
    conversionRate: number;
    roas: number;
    impressions: number;
    reach: number;
  };
  emotions: string[];
  videoAnalysis?: {
    duration: number;
    visualElements: string[];
    musicType: string;
    pacing: string;
  };
}

interface OrganicContentData {
  platform: 'facebook' | 'tiktok' | 'instagram' | 'linkedin';
  caption: string;
  hashtags: string[];
  visualType: string;
  metrics: {
    likes: number;
    shares: number;
    comments: number;
    saves: number;
    reach: number;
    engagement_rate: number;
  };
  emotions: string[];
  contentThemes: string[];
}

interface WebsiteCopyData {
  headlines: string[];
  valuePropositions: string[];
  testimonials: string[];
  features: string[];
  pricingStrategy: {
    mainPrice: number;
    offers: string[];
    guarantees: string[];
  };
}

interface IndustryEmotionalTriggers {
  primary: string[];
  secondary: string[];
  avoid: string[];
  bestConverting: string[];
}

interface PlatformPriority {
  platform: string;
  priority: number;
  reasoning: string;
  expectedResults: string;
  budgetAllocation: number;
}

export class CompetitorAnalysisService {
  private static API_KEY_STORAGE_KEY = 'perplexity_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async analyzeCompetitors(
    industry: string,
    businessType: string,
    targetAudience: string,
    productPrice: number,
    budget: number
  ): Promise<{
    competitors: CompetitorMetrics[];
    industryBenchmarks: any;
    emotionalTriggers: IndustryEmotionalTriggers;
    platformPriorities: PlatformPriority[];
  }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Perplexity API key not found. Please set your API key first.');
    }

    const prompt = `Analyze the top 10 performing competitors in the ${industry} ${businessType} industry targeting ${targetAudience} with similar products priced around $${productPrice}.

    For each competitor, provide detailed analysis including:
    
    1. WEBSITE METRICS:
    - Monthly website visitors
    - Conversion rates
    - Bounce rates
    - Average session duration
    
    2. AD LIBRARY ANALYSIS (Facebook, Google, TikTok, Instagram):
    - Top performing ad copy (hook, body, CTA)
    - Visual analysis (colors, layouts, video elements)
    - Performance metrics (CPM, CPC, CTR, ROAS, impressions, reach)
    - Emotional triggers used
    - Video analysis (duration, pacing, music, visual elements)
    
    3. ORGANIC CONTENT ANALYSIS:
    - Top performing organic posts per platform
    - Caption analysis and hashtag strategies
    - Engagement metrics (likes, shares, comments, saves)
    - Content themes and posting frequency
    - Visual content analysis
    
    4. WEBSITE COPY ANALYSIS:
    - Converting headlines and value propositions
    - Testimonial strategies
    - Feature presentations
    - Pricing and offer strategies
    
    5. INDUSTRY EMOTIONAL TRIGGERS:
    - Primary emotions that convert best
    - Secondary emotions for support
    - Emotions to avoid
    - Specific emotional triggers for this industry
    
    6. PLATFORM PRIORITY RANKING:
    - Best platforms for this industry/audience
    - Budget allocation recommendations
    - Expected results per platform
    - Reasoning for each platform priority

    Provide specific, actionable data with real numbers and examples.`;

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
              content: 'You are a competitive intelligence expert with access to ad libraries and website analytics. Provide detailed, data-driven analysis with specific metrics and examples.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 8000,
          search_recency_filter: 'month'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze competitors');
      }

      const data = await response.json();
      const analysisText = data.choices[0].message.content;

      return this.parseCompetitorData(analysisText, industry, businessType);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
      throw error;
    }
  }

  private static parseCompetitorData(
    analysisText: string,
    industry: string,
    businessType: string
  ): {
    competitors: CompetitorMetrics[];
    industryBenchmarks: any;
    emotionalTriggers: IndustryEmotionalTriggers;
    platformPriorities: PlatformPriority[];
  } {
    // In a real implementation, this would parse the AI response
    // For now, returning structured mock data based on the analysis
    return {
      competitors: [
        {
          domain: 'topcompetitor1.com',
          monthlyVisitors: 250000,
          conversionRate: 3.2,
          adSpend: 45000,
          roas: 4.2,
          topAds: [
            {
              platform: 'facebook',
              hook: 'Stop wasting money on solutions that don\'t work',
              body: 'Join 10,000+ businesses who increased their revenue by 300% in 90 days',
              cta: 'Get Your Free Strategy Call',
              visual: 'Before/after transformation video',
              metrics: {
                cpm: 12.50,
                cpc: 2.30,
                ctr: 5.4,
                conversionRate: 8.2,
                roas: 4.8,
                impressions: 1200000,
                reach: 850000
              },
              emotions: ['urgency', 'social_proof', 'transformation'],
              videoAnalysis: {
                duration: 30,
                visualElements: ['split_screen', 'bold_text_overlay', 'testimonial_clips'],
                musicType: 'upbeat_corporate',
                pacing: 'fast'
              }
            }
          ],
          organicContent: [
            {
              platform: 'tiktok',
              caption: 'POV: You finally found a solution that actually works 💪 #BusinessGrowth #Success',
              hashtags: ['#BusinessGrowth', '#Success', '#Entrepreneur'],
              visualType: 'behind_the_scenes',
              metrics: {
                likes: 45000,
                shares: 8200,
                comments: 1200,
                saves: 3400,
                reach: 320000,
                engagement_rate: 18.1
              },
              emotions: ['relatability', 'achievement'],
              contentThemes: ['behind_scenes', 'success_stories']
            }
          ],
          websiteCopy: {
            headlines: ['Transform Your Business in 90 Days or Less'],
            valuePropositions: ['Proven system used by 10,000+ businesses'],
            testimonials: ['Increased revenue by 300% in first quarter'],
            features: ['24/7 Support', 'Money-back Guarantee', 'Personal Coach'],
            pricingStrategy: {
              mainPrice: 997,
              offers: ['50% off for first 100 customers'],
              guarantees: ['90-day money back guarantee']
            }
          }
        }
      ],
      industryBenchmarks: {
        avgConversionRate: 2.8,
        avgCPM: 15.20,
        avgCPC: 3.10,
        avgROAS: 3.5,
        avgEngagementRate: 4.2
      },
      emotionalTriggers: {
        primary: ['urgency', 'social_proof', 'transformation'],
        secondary: ['authority', 'scarcity', 'fear_of_missing_out'],
        avoid: ['fear', 'negative_comparison'],
        bestConverting: ['social_proof', 'transformation', 'urgency']
      },
      platformPriorities: [
        {
          platform: 'Facebook',
          priority: 1,
          reasoning: 'Highest ROAS and conversion rates for this industry',
          expectedResults: '4.2x ROAS with 3.2% conversion rate',
          budgetAllocation: 40
        },
        {
          platform: 'Google Ads',
          priority: 2,
          reasoning: 'High intent traffic with lower CPC',
          expectedResults: '3.8x ROAS with 4.1% conversion rate',
          budgetAllocation: 30
        },
        {
          platform: 'TikTok',
          priority: 3,
          reasoning: 'Growing audience with high engagement',
          expectedResults: '2.9x ROAS with 2.8% conversion rate',
          budgetAllocation: 20
        },
        {
          platform: 'Instagram',
          priority: 4,
          reasoning: 'Good for brand awareness and retargeting',
          expectedResults: '2.5x ROAS with 2.1% conversion rate',
          budgetAllocation: 10
        }
      ]
    };
  }
}
