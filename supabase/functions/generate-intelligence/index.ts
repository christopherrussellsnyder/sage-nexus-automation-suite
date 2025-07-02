
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface IntelligenceRequest {
  formData: {
    businessName: string;
    industry: string;
    targetAudience: string;
    productService: string;
    uniqueValue: string;
    monthlyRevenue: string;
    businessType: string;
    currentChallenges?: string;
    goals?: string[];
    timeline?: string;
    competitorData?: any;
    currentMetrics?: any;
  };
  intelligenceMode: 'full' | 'copywriting' | 'marketing' | 'competitor';
  businessType: 'ecommerce' | 'agency' | 'sales';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: IntelligenceRequest = await req.json();
    const { formData, intelligenceMode, businessType } = request;

    // Generate mock intelligence data without using any AI/API
    const mockIntelligenceData = {
      platformRecommendations: [
        {
          platform: 'Facebook',
          priority: 1,
          reasoning: `Based on ${formData.industry} industry targeting ${formData.targetAudience}`,
          expectedMetrics: { roas: 3.2, cpm: 8.5, conversionRate: 2.8, reach: 15000 },
          budgetAllocation: 35
        },
        {
          platform: 'Instagram',
          priority: 2,
          reasoning: `Visual platform ideal for ${formData.productService} promotion`,
          expectedMetrics: { roas: 2.8, cpm: 12.0, conversionRate: 2.4, reach: 12000 },
          budgetAllocation: 25
        },
        {
          platform: 'Google',
          priority: 3,
          reasoning: `High-intent traffic for ${formData.businessName}`,
          expectedMetrics: { roas: 4.1, cpm: 15.2, conversionRate: 3.5, reach: 8000 },
          budgetAllocation: 30
        }
      ],
      monthlyPlan: Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        platform: ['Facebook', 'Instagram', 'Google', 'TikTok'][i % 4],
        contentType: i % 2 === 0 ? 'ad' : 'organic',
        hook: `Day ${i + 1} hook for ${formData.businessName}`,
        body: `Content targeting ${formData.targetAudience} in ${formData.industry}`,
        cta: 'Get Started Today',
        visualSuggestion: `${formData.productService} showcase visual`,
        targetAudience: formData.targetAudience,
        keyMessage: `Strategic message for ${formData.uniqueValue}`,
        expectedMetrics: { reach: 12000, engagement: 450, cost: 85, conversions: 8 },
        strategicReasoning: `Day ${i + 1} focuses on ${formData.industry} market engagement`
      })),
      budgetStrategy: [
        {
          category: 'Monthly Marketing Budget',
          monthlyBudget: parseInt(formData.monthlyRevenue) * 0.1 || 5000,
          allocation: [
            { platform: 'Facebook', percentage: 35, dailySpend: 58, reasoning: 'Primary audience platform' },
            { platform: 'Instagram', percentage: 25, dailySpend: 42, reasoning: 'Visual content engagement' },
            { platform: 'Google', percentage: 30, dailySpend: 50, reasoning: 'High-intent traffic' },
            { platform: 'TikTok', percentage: 10, dailySpend: 17, reasoning: 'Emerging audience' }
          ],
          optimizationTips: [
            'Start with proven platforms',
            'Test new audiences gradually',
            'Monitor ROI closely',
            'Scale successful campaigns'
          ]
        }
      ],
      copywritingRecommendations: [
        {
          copyType: 'Primary Messaging',
          recommendations: [
            `Emphasize ${formData.uniqueValue} in headlines`,
            `Address ${formData.targetAudience} pain points directly`,
            'Include social proof and testimonials',
            'Use action-oriented language'
          ],
          examples: [
            { 
              before: 'We offer great products', 
              after: `${formData.businessName} delivers ${formData.uniqueValue}`, 
              improvement: 'More specific and value-focused' 
            }
          ],
          emotionalTriggers: ['urgency', 'social proof', 'authority', 'scarcity']
        }
      ],
      metricOptimization: [
        {
          metric: 'Conversion Rate',
          currentPerformance: '2.3%',
          targetImprovement: '4.1%',
          actionSteps: [
            'Optimize landing pages for mobile',
            'Add social proof elements',
            'Simplify checkout process',
            'A/B test call-to-action buttons'
          ],
          timeline: '30-60 days',
          expectedROI: '78% increase in conversions'
        },
        {
          metric: 'Customer Acquisition Cost',
          currentPerformance: '$45',
          targetImprovement: '$32',
          actionSteps: [
            'Improve ad targeting',
            'Optimize landing page conversion',
            'Implement retargeting campaigns',
            'Focus on high-performing platforms'
          ],
          timeline: '45-90 days',
          expectedROI: '29% reduction in CAC'
        }
      ],
      competitorInsights: [
        {
          competitor: `${formData.industry} Market Leader`,
          strengths: ['Brand recognition', 'Large marketing budget', 'Established audience'],
          weaknesses: ['Generic messaging', 'Poor customer service', 'Slow innovation'],
          opportunities: [
            `Emphasize ${formData.uniqueValue}`,
            'Focus on personalized service',
            'Target underserved segments'
          ],
          strategicRecommendations: [
            'Differentiate through unique value proposition',
            'Build strong customer relationships',
            'Innovate faster than competitors'
          ]
        }
      ],
      industryInsights: [
        {
          trend: `Digital Transformation in ${formData.industry}`,
          impact: 'High - reshaping customer expectations',
          actionableAdvice: 'Implement digital-first customer experience',
          timeline: 'Next 6 months'
        },
        {
          trend: 'Personalization at Scale',
          impact: 'Medium - improving conversion rates',
          actionableAdvice: 'Use data to personalize marketing messages',
          timeline: 'Next 3 months'
        }
      ]
    };

    return new Response(JSON.stringify(mockIntelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-intelligence function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
