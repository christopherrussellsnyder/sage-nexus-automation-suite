
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    monthlyAdBudget?: string;
    websiteTraffic?: number;
    conversionRate?: number;
    primaryGoals?: string[];
    competitorNames?: string[];
    competitorStrengths?: string[];
    competitorWeaknesses?: string[];
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
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in Supabase secrets.');
    }

    const request: IntelligenceRequest = await req.json();
    const { formData, intelligenceMode, businessType } = request;

    console.log('Processing enhanced intelligence request for:', formData.businessName);
    console.log('Intelligence mode:', intelligenceMode);
    console.log('Business type:', businessType);

    const enhancedComprehensivePrompt = `
You are an expert business intelligence analyst with access to real-time market data, competitive intelligence, and advanced analytics. Generate a comprehensive, data-driven intelligence report that incorporates current market conditions, competitor analysis, and actionable strategies.

BUSINESS DATA TO ANALYZE:
- Business Name: ${formData.businessName}
- Industry: ${formData.industry}
- Business Type: ${businessType}
- Target Audience: ${formData.targetAudience}
- Product/Service: ${formData.productService}
- Unique Value Proposition: ${formData.uniqueValue}
- Monthly Revenue: ${formData.monthlyRevenue}
- Monthly Ad Budget: ${formData.monthlyAdBudget || 'Not specified'}
- Website Traffic: ${formData.websiteTraffic || 'Not specified'}
- Conversion Rate: ${formData.conversionRate || 'Not specified'}
- Current Challenges: ${formData.currentChallenges || 'Not specified'}
- Primary Goals: ${formData.primaryGoals?.join(', ') || formData.goals?.join(', ') || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}
- Competitor Names: ${formData.competitorNames?.join(', ') || 'Not specified'}
- Competitor Strengths: ${formData.competitorStrengths?.join(', ') || 'Not specified'}
- Competitor Weaknesses: ${formData.competitorWeaknesses?.join(', ') || 'Not specified'}

ENHANCED INTELLIGENCE REQUIREMENTS:

1. PLATFORM RECOMMENDATIONS - Provide comprehensive platform analysis including:
   - Real-time advertising costs (CPM, CPC, CPV) specific to their industry and location
   - Detailed audience overlap analysis between platforms
   - Day-by-day platform performance recommendations based on business type
   - Specific targeting parameters (interests, behaviors, demographics) for each platform
   - Platform-specific creative format recommendations with exact dimensions
   - Seasonal adjustments and trending opportunities
   - Budget scaling strategies with clear milestones and KPIs
   - Current algorithm insights and platform-specific best practices

2. 30-DAY CONTENT CALENDAR - Generate industry-specific content that includes:
   - Content referencing current events, trends, and seasonal factors relevant to their industry
   - Specific data points and statistics relevant to their industry in each post
   - Detailed psychological triggers and persuasion techniques for each piece
   - A/B testing suggestions with specific variables to test
   - Content performance prediction scores based on current trends
   - Detailed hashtag research with trending and niche hashtags
   - Specific engagement strategies and community management responses
   - Cross-platform content adaptation guidelines
   - Detailed analytics tracking instructions for each piece

3. BUDGET STRATEGY - Create advanced budget allocation including:
   - Real-time platform pricing for their specific targeting parameters
   - Budget scaling frameworks with clear trigger points
   - Budget allocation strategies based on current business stage and goals
   - Day-parting and seasonality budget adjustments
   - Detailed ROAS targets and optimization thresholds for each platform
   - Crisis management budget strategies for underperforming campaigns
   - Budget diversification strategies for risk management
   - Advanced attribution modeling recommendations

4. COPYWRITING RECOMMENDATIONS - Provide advanced copy strategies including:
   - Analysis of competitor copy currently performing well with improved alternatives
   - Specific emotional triggers based on target audience psychology
   - Copy variations for different customer awareness stages (unaware, problem-aware, solution-aware, product-aware, most-aware)
   - Specific power words and phrases that convert highest in their industry
   - Detailed A/B testing frameworks with statistical significance guidelines
   - Conversion optimization tactics specific to their current conversion rate
   - Personalization strategies based on audience segments
   - Detailed funnel copy connecting seamlessly from awareness to conversion

5. METRIC OPTIMIZATION - Provide comprehensive performance analysis including:
   - Real-time industry benchmarks specific to their business size and location
   - Detailed statistical analysis of current performance vs. industry standards
   - Specific, step-by-step optimization protocols with exact implementation timelines
   - Detailed ROI calculations for each optimization recommendation
   - Predictive analytics showing expected results timeline and milestones
   - Specific tool recommendations with setup instructions
   - Detailed attribution modeling recommendations
   - Advanced optimization strategies for above-average performers

6. COMPETITIVE INTELLIGENCE - Deliver deep competitive analysis including:
   - Real-time competitive pricing analysis with positioning recommendations
   - Detailed SWOT analysis with specific actionable insights
   - Competitive content gap analysis with specific opportunities
   - Competitor traffic source analysis and acquisition strategy insights
   - Detailed competitive keyword analysis with content opportunities
   - Specific strategies to capitalize on competitor weaknesses immediately
   - Competitive social media strategy analysis with engagement benchmarks
   - Competitor conversion funnel analysis with optimization opportunities

7. INDUSTRY INSIGHTS - Provide comprehensive market intelligence including:
   - Current industry trends affecting their specific business model
   - Economic indicators impacting their target demographic
   - Consumer spending patterns and buying behavior in their industry
   - Emerging opportunities and threats in their market
   - Regulatory changes or industry developments affecting their business
   - Seasonal patterns and cyclical trends specific to their industry
   - Technology trends and innovations impacting their sector

CRITICAL REQUIREMENTS:
- Every recommendation must include specific numbers, percentages, and quantifiable metrics
- All strategies must include exact implementation steps with timelines
- All suggestions must reference current, real-time data sources
- Every template must be 100% ready-to-use without additional editing
- All content must reflect their specific industry terminology and insider knowledge
- Every recommendation must account for their current business stage and resources
- All strategies must align with their stated goals and timeline
- Every output must consider their competitive landscape and positioning
- All recommendations must include immediate next steps and success metrics
- Every strategy must include performance optimization guidelines and troubleshooting

Respond ONLY with valid JSON in this exact structure:
{
  "platformRecommendations": [
    {
      "platform": "Platform Name",
      "priority": 1,
      "reasoning": "Detailed reasoning based on their specific business data and current market conditions",
      "expectedMetrics": {
        "roas": 0.0,
        "cpm": 0.0,
        "cpc": 0.0,
        "conversionRate": 0.0,
        "reach": 0,
        "engagementRate": 0.0
      },
      "budgetAllocation": 0,
      "targetingParameters": {
        "demographics": ["specific demographic targeting"],
        "interests": ["specific interest targeting"],
        "behaviors": ["specific behavior targeting"],
        "customAudiences": ["specific custom audience strategies"]
      },
      "creativeFormats": [
        {
          "format": "Format name",
          "dimensions": "Exact dimensions",
          "bestPractices": ["Specific best practices"],
          "performanceTips": ["Performance optimization tips"]
        }
      ],
      "seasonalAdjustments": [
        {
          "period": "Time period",
          "adjustment": "Specific adjustment strategy",
          "expectedImpact": "Expected performance impact"
        }
      ],
      "scalingStrategy": {
        "phase1": {
          "budget": 0,
          "duration": "Duration",
          "kpis": ["Specific KPIs to track"],
          "successMetrics": ["Success criteria"]
        },
        "phase2": {
          "budget": 0,
          "duration": "Duration",
          "kpis": ["Specific KPIs to track"],
          "successMetrics": ["Success criteria"]
        }
      }
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "Platform",
      "contentType": "ad or organic",
      "hook": "Industry-specific hook with current trends",
      "body": "Body copy with specific data points and statistics",
      "cta": "Specific call to action",
      "visualSuggestion": "Detailed visual guidance",
      "targetAudience": "Specific audience segment",
      "keyMessage": "Core message aligned with their value prop",
      "hashtags": ["trending", "niche", "industry-specific"],
      "psychologicalTriggers": ["Specific psychological triggers used"],
      "abTestingVariables": ["Variables to test"],
      "performancePrediction": {
        "score": 0,
        "reasoning": "Why this score based on current trends"
      },
      "expectedMetrics": {
        "reach": 0,
        "engagement": 0,
        "cost": 0,
        "conversions": 0,
        "shareRate": 0.0,
        "saveRate": 0.0
      },
      "strategicReasoning": "Detailed reasoning for this content strategy",
      "engagementStrategy": "Specific community management approach",
      "crossPlatformAdaptation": {
        "instagram": "Platform-specific adaptation",
        "facebook": "Platform-specific adaptation",
        "tiktok": "Platform-specific adaptation",
        "linkedin": "Platform-specific adaptation"
      },
      "analyticsTracking": ["Specific metrics to track and how"]
    }
  ],
  "budgetStrategy": [
    {
      "category": "Category name",
      "monthlyBudget": 0,
      "allocation": [
        {
          "platform": "Platform",
          "percentage": 0,
          "dailySpend": 0,
          "reasoning": "Detailed reasoning based on real-time pricing",
          "targetingCosts": {
            "cpm": 0,
            "cpc": 0,
            "cpa": 0
          },
          "scalingTriggers": ["Specific performance triggers for scaling"],
          "dayPartingStrategy": {
            "morning": "Budget allocation strategy",
            "afternoon": "Budget allocation strategy",
            "evening": "Budget allocation strategy"
          },
          "seasonalAdjustments": [
            {
              "period": "Time period",
              "budgetChange": "Percentage change",
              "reasoning": "Why this adjustment"
            }
          ]
        }
      ],
      "roasTargets": [
        {
          "timeframe": "30 days",
          "target": 0.0,
          "optimizationThreshold": 0.0
        },
        {
          "timeframe": "60 days",
          "target": 0.0,
          "optimizationThreshold": 0.0
        },
        {
          "timeframe": "90 days",
          "target": 0.0,
          "optimizationThreshold": 0.0
        }
      ],
      "crisisManagement": {
        "underperformanceThreshold": 0.0,
        "actions": ["Specific actions to take"],
        "budgetReallocation": "Reallocation strategy"
      },
      "attributionModeling": "Recommended attribution model and setup",
      "optimizationTips": ["Advanced optimization strategies"]
    }
  ],
  "copywritingRecommendations": [
    {
      "copyType": "Type of copy",
      "competitorAnalysis": {
        "topPerformingCopy": "Current top competitor copy",
        "improvedVersion": "Your improved alternative",
        "improvementReasoning": "Why your version will outperform"
      },
      "awarenessStageVariations": {
        "unaware": "Copy for unaware prospects",
        "problemAware": "Copy for problem-aware prospects",
        "solutionAware": "Copy for solution-aware prospects",
        "productAware": "Copy for product-aware prospects",
        "mostAware": "Copy for most-aware prospects"
      },
      "emotionalTriggers": [
        {
          "trigger": "Specific emotional trigger",
          "implementation": "How to implement in copy",
          "expectedImpact": "Expected conversion impact"
        }
      ],
      "powerWords": ["Industry-specific power words that drive conversions"],
      "abTestingFramework": {
        "variables": ["Specific variables to test"],
        "hypotheses": ["Testing hypotheses"],
        "successMetrics": ["Metrics to measure"],
        "statisticalSignificance": "Required sample size and confidence level"
      },
      "personalizationStrategies": [
        {
          "segment": "Audience segment",
          "approach": "Personalization approach",
          "copyVariation": "Specific copy variation"
        }
      ],
      "funnelCopy": {
        "awareness": "Top-of-funnel copy",
        "consideration": "Middle-of-funnel copy",
        "conversion": "Bottom-of-funnel copy",
        "retention": "Post-purchase copy"
      },
      "conversionOptimization": [
        {
          "currentRate": "Their current conversion rate",
          "tactic": "Specific optimization tactic",
          "expectedImprovement": "Expected improvement percentage",
          "implementationSteps": ["Step-by-step implementation"]
        }
      ]
    }
  ],
  "metricOptimization": [
    {
      "metric": "Specific metric",
      "industryBenchmark": {
        "businessSize": "Their business size benchmark",
        "location": "Location-specific benchmark",
        "industry": "Industry-specific benchmark"
      },
      "currentPerformance": "Their current performance analysis",
      "targetImprovement": "Specific improvement target",
      "optimizationProtocol": [
        {
          "step": 1,
          "action": "Specific action to take",
          "timeline": "Implementation timeline",
          "expectedImpact": "Expected impact on metric"
        }
      ],
      "roiCalculation": {
        "investmentRequired": 0,
        "expectedReturn": 0,
        "paybackPeriod": "Time to recoup investment",
        "longTermValue": "Long-term value projection"
      },
      "predictiveAnalytics": {
        "30DayProjection": "30-day performance projection",
        "60DayProjection": "60-day performance projection",
        "90DayProjection": "90-day performance projection",
        "milestones": ["Key milestones to track"]
      },
      "toolRecommendations": [
        {
          "tool": "Specific tool name",
          "purpose": "Why this tool",
          "setupInstructions": "How to set it up",
          "cost": "Tool cost"
        }
      ],
      "attributionModeling": "Recommended attribution approach",
      "advancedStrategies": ["Strategies for above-average performers"]
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Specific competitor name",
      "pricingAnalysis": {
        "currentPricing": "Their current pricing",
        "recommendation": "Your pricing positioning",
        "reasoning": "Why this positioning works"
      },
      "swotAnalysis": {
        "strengths": ["Detailed competitive strengths"],
        "weaknesses": ["Exploitable weaknesses"],
        "opportunities": ["Market opportunities"],
        "threats": ["Competitive threats"]
      },
      "contentGapAnalysis": [
        {
          "gap": "Specific content gap",
          "opportunity": "Content opportunity for you",
          "implementationStrategy": "How to capitalize"
        }
      ],
      "trafficSources": [
        {
          "source": "Traffic source",
          "percentage": 0,
          "acquisitionStrategy": "How to compete for this traffic"
        }
      ],
      "keywordAnalysis": {
        "topKeywords": ["Their top-performing keywords"],
        "gaps": ["Keyword gaps you can exploit"],
        "opportunities": ["Keyword opportunities for you"]
      },
      "weaknessExploitation": [
        {
          "weakness": "Specific weakness",
          "strategy": "How to exploit immediately",
          "expectedImpact": "Expected competitive advantage"
        }
      ],
      "socialMediaStrategy": {
        "platforms": ["Their active platforms"],
        "engagementRates": ["Their engagement benchmarks"],
        "contentStrategy": "Their content approach",
        "opportunities": ["How to outperform them"]
      },
      "conversionFunnelAnalysis": {
        "strengths": ["Their funnel strengths"],
        "weaknesses": ["Their funnel weaknesses"],
        "optimizationOpportunities": ["How you can do better"]
      }
    }
  ],
  "industryInsights": [
    {
      "trend": "Specific industry trend",
      "impact": "Impact on their business model",
      "actionableAdvice": "Specific actions to take",
      "timeline": "Implementation timeline",
      "economicIndicators": [
        {
          "indicator": "Specific economic indicator",
          "impact": "How it affects their business",
          "strategy": "How to adapt"
        }
      ],
      "consumerBehavior": {
        "patterns": ["Current spending patterns"],
        "shifts": ["Behavioral shifts to watch"],
        "opportunities": ["Opportunities to capitalize"]
      },
      "seasonalPatterns": [
        {
          "season": "Specific season/period",
          "impact": "Impact on their business",
          "strategy": "Seasonal strategy recommendation"
        }
      ],
      "technologyTrends": [
        {
          "trend": "Technology trend",
          "relevance": "How it affects their industry",
          "adoption": "Recommended adoption strategy"
        }
      ],
      "regulatoryChanges": [
        {
          "change": "Regulatory change",
          "impact": "Impact on their business",
          "compliance": "Compliance strategy"
        }
      ],
      "emergingOpportunities": [
        {
          "opportunity": "Specific market opportunity",
          "potential": "Revenue potential",
          "strategy": "How to capitalize",
          "timeline": "Time to market"
        }
      ]
    }
  ]
}`;

    console.log('Sending enhanced request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert business intelligence analyst with access to real-time market data, competitive intelligence, and advanced analytics. You generate comprehensive, data-driven intelligence reports with specific, actionable recommendations. Every recommendation must include quantifiable metrics, exact implementation steps, and be 100% ready-to-use. You have deep expertise in digital marketing, competitive analysis, consumer psychology, and business strategy across all industries.'
          },
          {
            role: 'user',
            content: enhancedComprehensivePrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error status:', response.status);
      console.error('OpenAI API error response:', errorText);
      
      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else if (response.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`OpenAI API request failed with status ${response.status}: ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from OpenAI API');
    }

    const aiResponse = data.choices[0].message.content;

    console.log('Parsing enhanced AI response as JSON...');

    let intelligenceData;
    try {
      // Clean the response to ensure it's valid JSON
      const cleanedResponse = aiResponse.trim();
      const jsonStart = cleanedResponse.indexOf('{');
      const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('No JSON found in AI response');
      }
      
      const jsonContent = cleanedResponse.substring(jsonStart, jsonEnd);
      intelligenceData = JSON.parse(jsonContent);
      
      console.log('Successfully parsed enhanced AI-generated intelligence data');
      
      // Validate that all required sections are present and contain comprehensive data
      const requiredSections = ['platformRecommendations', 'monthlyPlan', 'budgetStrategy', 'copywritingRecommendations', 'metricOptimization', 'competitorInsights', 'industryInsights'];
      const missingSections = requiredSections.filter(section => !intelligenceData[section] || !Array.isArray(intelligenceData[section]) || intelligenceData[section].length === 0);
      
      if (missingSections.length > 0) {
        throw new Error(`Enhanced AI intelligence generation incomplete. Missing sections: ${missingSections.join(', ')}. All sections must contain comprehensive, data-driven insights.`);
      }
      
      // Validate depth of content in each section
      const validateSectionDepth = (section, minFields) => {
        if (intelligenceData[section][0] && Object.keys(intelligenceData[section][0]).length < minFields) {
          throw new Error(`${section} lacks required depth. Enhanced intelligence requires comprehensive data analysis.`);
        }
      };
      
      validateSectionDepth('platformRecommendations', 8);
      validateSectionDepth('monthlyPlan', 12);
      validateSectionDepth('budgetStrategy', 6);
      validateSectionDepth('copywritingRecommendations', 7);
      validateSectionDepth('metricOptimization', 8);
      validateSectionDepth('competitorInsights', 8);
      validateSectionDepth('industryInsights', 6);
      
    } catch (parseError) {
      console.error('Failed to parse enhanced AI response as JSON:', parseError);
      console.error('AI Response was:', aiResponse);
      throw new Error('AI generated invalid enhanced response format. The intelligence system requires comprehensive, structured data analysis. Please try again.');
    }

    return new Response(JSON.stringify(intelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhanced generate-intelligence function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Enhanced intelligence generation requires comprehensive AI analysis of your business data with real-time market insights, competitive intelligence, and actionable strategies. Please ensure your OpenAI API key is properly configured and try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
