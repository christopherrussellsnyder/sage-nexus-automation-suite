
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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in Supabase secrets.');
    }

    const request: IntelligenceRequest = await req.json();
    const { formData, intelligenceMode, businessType } = request;

    console.log('Processing comprehensive intelligence request for:', formData.businessName);
    console.log('Intelligence mode:', intelligenceMode);
    console.log('Business type:', businessType);

    const comprehensiveIntelligencePrompt = `
You are the world's leading business intelligence analyst with access to real-time market data, competitive intelligence platforms, and advanced predictive analytics. Generate a comprehensive, data-driven intelligence report that provides consultant-level insights with specific, actionable strategies.

BUSINESS INTELLIGENCE PROFILE:
- Business: ${formData.businessName}
- Industry: ${formData.industry}
- Business Type: ${businessType}
- Target Audience: ${formData.targetAudience}
- Product/Service: ${formData.productService}
- Unique Value: ${formData.uniqueValue}
- Monthly Revenue: ${formData.monthlyRevenue}
- Monthly Ad Budget: ${formData.monthlyAdBudget || 'Not specified'}
- Website Traffic: ${formData.websiteTraffic || 'Not specified'}
- Conversion Rate: ${formData.conversionRate || 'Not specified'}
- Current Challenges: ${formData.currentChallenges || 'Not specified'}
- Primary Goals: ${formData.primaryGoals?.join(', ') || formData.goals?.join(', ') || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}
- Known Competitors: ${formData.competitorNames?.join(', ') || 'Not specified'}

COMPREHENSIVE INTELLIGENCE REQUIREMENTS:

You must generate a complete 30-day content calendar (all 30 days), not just Day 1. Each section must be based on deep analysis of the business data provided above, current market conditions, and industry-specific insights.

1. PLATFORM RECOMMENDATIONS WITH REAL-TIME INTELLIGENCE
For each recommended platform, provide:
- Current advertising costs (CPM, CPC, CPV) specific to AI automation industry
- Detailed audience targeting parameters with estimated reach numbers
- Platform-specific creative formats with exact dimensions and performance benchmarks
- Day-parting strategies based on when CEOs and business owners are most active
- Seasonal budget adjustments with specific dates and percentage changes
- Scaling strategies with exact KPI thresholds and budget triggers
- Algorithm insights and platform-specific optimization tactics
- Crisis management protocols for underperforming campaigns

2. COMPLETE 30-DAY CONTENT CALENDAR
Create content for ALL 30 days, not just Day 1. For each day include:
- Industry-specific hooks that reference current AI automation trends
- Detailed body copy with statistics and data points relevant to automation ROI
- Platform-specific adaptations (LinkedIn executive focus, Instagram visual stories, etc.)
- Psychological triggers and persuasion techniques for each post
- A/B testing variables with specific hypotheses to test
- Performance prediction scores based on content type and timing
- Hashtag research with trending and niche tags for AI automation
- Community management strategies for each post
- Cross-platform distribution strategies
- Analytics tracking instructions with specific KPIs

3. ADVANCED COPYWRITING INTELLIGENCE
Provide copy analysis that includes:
- Competitor copy analysis with specific improvements for AI automation messaging
- Customer awareness stage variations (unaware of automation needs → most aware of ${formData.businessName})
- Industry-specific power words that convert in B2B automation sales
- Detailed A/B testing frameworks with statistical significance requirements
- Conversion funnel copy that connects awareness to consultation booking
- Emotional trigger analysis specific to CEO pain points (time scarcity, operational inefficiency)
- Personalization strategies for different business sizes and industries
- Objection handling copy for common automation concerns

4. COMPETITIVE INTELLIGENCE WITH ACTIONABLE INSIGHTS
Analyze the competitive landscape including:
- Pricing positioning analysis with specific recommendations
- Content gap analysis showing untapped opportunities in AI automation marketing
- Traffic acquisition strategies based on competitor success patterns
- Social media performance benchmarks for AI automation agencies
- Conversion funnel analysis with specific optimization opportunities
- Weakness exploitation strategies with immediate implementation steps
- Keyword opportunity analysis for SEO and content marketing
- Partnership and collaboration opportunities within the industry

5. METRIC OPTIMIZATION WITH IMPLEMENTATION ROADMAPS
For each metric provide:
- Industry benchmarks specific to AI automation agencies with 0-10k monthly revenue
- Step-by-step optimization protocols with exact timelines
- Tool recommendations with setup instructions and costs
- ROI calculations for each optimization initiative
- Predictive analytics showing 30, 60, and 90-day projections
- Attribution modeling recommendations for accurate measurement
- Advanced optimization strategies for scaling beyond current performance
- Milestone tracking with specific success criteria

6. BUDGET STRATEGY WITH PRECISION ALLOCATION
Include detailed budget analysis with:
- Real-time platform costs for targeting CEOs and business owners
- Scaling frameworks with specific trigger points and thresholds
- Day-parting optimization for maximum CEO engagement
- Seasonal adjustments for business planning cycles (Q4 budget approvals, Q1 implementations)
- Crisis management protocols with budget reallocation strategies
- Attribution modeling setup for accurate ROAS measurement
- Advanced optimization techniques for budget efficiency
- Long-term scaling roadmap with investment milestones

7. INDUSTRY INSIGHTS WITH ECONOMIC INTELLIGENCE
Provide market analysis including:
- Current economic factors affecting small business automation adoption
- Regulatory trends impacting AI and automation industries
- Consumer behavior shifts toward automation solutions
- Seasonal patterns for business service purchases
- Technology trends creating new automation opportunities
- Competitive threats and market positioning strategies
- Emerging opportunities with revenue potential analysis
- Risk mitigation strategies for market changes

CRITICAL REQUIREMENTS:
- Every recommendation must include specific numbers, dates, and quantifiable metrics
- All strategies must have exact implementation steps with timelines
- All content must be 100% ready-to-use without additional editing
- Every insight must be specific to AI automation agencies targeting executives
- All data must reflect current market conditions and industry trends
- Every template must include performance optimization and tracking instructions
- All recommendations must align with the 6-month timeline and current revenue stage

Generate the response as valid JSON matching this EXACT structure:

{
  "platformRecommendations": [
    {
      "platform": "Platform Name",
      "priority": 1,
      "reasoning": "Detailed analysis of why this platform is optimal for AI automation agencies targeting executives",
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
        "demographics": ["Specific demographic criteria for CEOs/executives"],
        "interests": ["AI automation interests and business pain points"],
        "behaviors": ["Executive online behaviors and platform usage"],
        "customAudiences": ["Lookalike and retargeting strategies"]
      },
      "creativeFormats": [
        {
          "format": "Specific format name",
          "dimensions": "Exact pixel dimensions",
          "bestPractices": ["Platform-specific creative guidelines"],
          "performanceTips": ["Optimization tactics for maximum engagement"]
        }
      ],
      "dayPartingStrategy": {
        "morning": "6AM-12PM strategy and budget allocation",
        "afternoon": "12PM-6PM strategy and budget allocation", 
        "evening": "6PM-12AM strategy and budget allocation"
      },
      "seasonalAdjustments": [
        {
          "period": "Specific time period (e.g., Q4 budget planning)",
          "adjustment": "Exact budget and strategy changes",
          "reasoning": "Business cycle rationale for adjustment"
        }
      ],
      "scalingStrategy": {
        "phase1": {
          "budget": 0,
          "duration": "Exact timeframe",
          "kpis": ["Specific KPI thresholds"],
          "successMetrics": ["Measurable success criteria"]
        },
        "phase2": {
          "budget": 0,
          "duration": "Exact timeframe", 
          "kpis": ["Advanced KPI thresholds"],
          "successMetrics": ["Scale-up success criteria"]
        }
      }
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "Primary platform for this content",
      "contentType": "ad or organic",
      "hook": "Industry-specific hook referencing current AI/automation trends",
      "body": "Detailed body copy with specific ROI statistics for automation",
      "cta": "Specific call-to-action for consultation/demo booking",
      "visualSuggestion": "Detailed visual guidance with specific elements",
      "targetAudience": "Specific executive persona (e.g., Manufacturing CEOs)",
      "keyMessage": "Core value proposition aligned with automation benefits",
      "hashtags": ["#AIAutomation", "#BusinessEfficiency", "#ExecutiveProductivity"],
      "psychologicalTriggers": ["Specific triggers like time scarcity, competitive advantage"],
      "abTestingVariables": ["Specific elements to test with hypotheses"],
      "performancePrediction": {
        "score": 85,
        "reasoning": "Data-driven rationale for performance prediction"
      },
      "expectedMetrics": {
        "reach": 5000,
        "engagement": 300,
        "cost": 150,
        "conversions": 12,
        "shareRate": 0.08,
        "saveRate": 0.04
      },
      "strategicReasoning": "Business rationale for content timing and messaging",
      "engagementStrategy": "Specific community management and response tactics",
      "crossPlatformAdaptation": {
        "linkedin": "Executive-focused professional adaptation",
        "facebook": "Business owner community approach",
        "instagram": "Visual storytelling for automation benefits",
        "twitter": "Thought leadership and industry insights"
      },
      "analyticsTracking": ["Specific metrics to monitor and optimization triggers"]
    }
  ],
  "budgetStrategy": [
    {
      "category": "Platform Advertising",
      "monthlyBudget": 0,
      "allocation": [
        {
          "platform": "Platform name",
          "percentage": 0,
          "dailySpend": 0,
          "reasoning": "Data-driven rationale for budget allocation",
          "targetingCosts": {
            "cpm": 0,
            "cpc": 0,
            "cpa": 0
          },
          "scalingTriggers": ["Specific performance thresholds for scaling"],
          "dayPartingStrategy": {
            "morning": "Budget allocation and strategy for morning hours",
            "afternoon": "Budget allocation and strategy for afternoon hours",
            "evening": "Budget allocation and strategy for evening hours"
          },
          "seasonalAdjustments": [
            {
              "period": "Business cycle period",
              "budgetChange": "Specific percentage or dollar change",
              "reasoning": "Business rationale for seasonal adjustment"
            }
          ]
        }
      ],
      "roasTargets": [
        {
          "timeframe": "30 days",
          "target": 0.0,
          "optimizationThreshold": 0.0
        }
      ],
      "crisisManagement": {
        "underperformanceThreshold": 0.0,
        "actions": ["Specific steps to take when performance drops"],
        "budgetReallocation": "Detailed reallocation strategy"
      },
      "attributionModeling": "Recommended attribution setup for accurate measurement",
      "optimizationTips": ["Advanced optimization strategies for budget efficiency"]
    }
  ],
  "copywritingRecommendations": [
    {
      "copyType": "Executive Email Outreach",
      "competitorAnalysis": {
        "commonApproaches": "Analysis of typical AI agency messaging",
        "improvedStrategy": "Superior approach for ${formData.businessName}",
        "differentiationPoints": "Unique value propositions to emphasize"
      },
      "awarenessStageVariations": {
        "unaware": "Copy for executives not aware of automation opportunities",
        "problemAware": "Copy for those recognizing operational inefficiencies",
        "solutionAware": "Copy for those researching automation solutions",
        "productAware": "Copy for those evaluating AI automation providers",
        "mostAware": "Copy for those ready to implement automation"
      },
      "emotionalTriggers": [
        {
          "trigger": "Time scarcity and operational overwhelm",
          "implementation": "Specific copy techniques to leverage this trigger",
          "expectedImpact": "Predicted response improvement"
        }
      ],
      "powerWords": ["Transform", "Streamline", "Accelerate", "Optimize"],
      "abTestingFramework": {
        "variables": ["Subject lines", "CTA placement", "Social proof elements"],
        "hypotheses": ["Specific testing hypotheses with rationale"],
        "successMetrics": ["Metrics to measure test success"],
        "statisticalSignificance": "Required confidence levels and sample sizes"
      },
      "personalizationStrategies": [
        {
          "segment": "Manufacturing executives",
          "approach": "Industry-specific pain points and automation benefits",
          "copyVariation": "Tailored messaging for manufacturing efficiency"
        }
      ],
      "funnelCopy": {
        "awareness": "Educational content about automation ROI",
        "consideration": "Case studies and social proof for evaluation",
        "conversion": "Demo booking and consultation scheduling copy",
        "retention": "Onboarding and success communication"
      }
    }
  ],
  "metricOptimization": [
    {
      "metric": "Lead Conversion Rate",
      "industryBenchmark": {
        "aiAutomationAgencies": "2.3% average for agencies under 10k/month revenue",
        "executiveTargeting": "4.1% for B2B services targeting C-suite",
        "currentPosition": "Analysis of current performance vs benchmarks"
      },
      "currentAnalysis": "Detailed analysis of current performance gaps",
      "targetImprovement": "Specific improvement target with timeline",
      "optimizationProtocol": [
        {
          "step": 1,
          "action": "Implement executive-focused landing page optimization",
          "timeline": "Week 1-2",
          "expectedImpact": "15-25% conversion rate improvement",
          "implementationDetails": ["Specific steps with tools and resources needed"]
        }
      ],
      "roiCalculation": {
        "investmentRequired": 2500,
        "expectedReturn": 8000,
        "paybackPeriod": "6-8 weeks",
        "longTermValue": "Compounded revenue impact over 12 months"
      },
      "predictiveAnalytics": {
        "30DayProjection": "Expected performance improvement in 30 days",
        "60DayProjection": "Expected performance improvement in 60 days", 
        "90DayProjection": "Expected performance improvement in 90 days",
        "milestones": ["Key achievement markers and success indicators"]
      },
      "toolRecommendations": [
        {
          "tool": "HubSpot CRM",
          "purpose": "Executive lead tracking and nurturing automation",
          "setupInstructions": "Step-by-step implementation guide",
          "cost": "$45/month",
          "expectedROI": "3.2x within 90 days"
        }
      ]
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Typical AI Automation Agency",
      "marketPosition": "Analysis of common positioning in the AI automation space",
      "pricingAnalysis": {
        "averagePackages": "$3000-8000/month for similar services",
        "pricingStrategy": "Recommended pricing position for ${formData.businessName}",
        "valueGapOpportunity": "Opportunity to provide superior value at competitive pricing"
      },
      "marketingStrategy": {
        "commonApproaches": ["LinkedIn outreach", "Content marketing", "Referral programs"],
        "weaknesses": ["Generic messaging", "Lack of industry specialization"],
        "opportunities": ["Executive-focused positioning", "Industry-specific case studies"]
      },
      "contentStrategy": {
        "typicalContent": "Generic automation benefits and case studies",
        "contentGaps": ["Executive time-savings calculators", "Industry-specific ROI data"],
        "opportunityAreas": ["Thought leadership on AI trends", "Executive productivity content"]
      },
      "conversionTactics": {
        "commonApproaches": ["Free consultations", "ROI calculators", "Case study downloads"],
        "improvementOpportunities": ["Executive-focused demos", "Industry-specific assessments"],
        "differentiationStrategy": "Unique positioning as executive productivity specialists"
      },
      "weaknessExploitation": [
        {
          "weakness": "Generic, one-size-fits-all automation approaches",
          "strategy": "Position as industry-specialized automation experts",
          "implementation": "Develop industry-specific case studies and demos",
          "expectedImpact": "25-40% higher conversion rates vs generic competitors"
        }
      ]
    }
  ],
  "industryInsights": [
    {
      "trend": "Accelerating adoption of AI automation in mid-market businesses",
      "impact": "Growing demand for specialized automation services",
      "opportunity": "Position as the go-to experts for executive-level automation strategy",
      "timeline": "Peak opportunity in next 12-18 months",
      "actionPlan": ["Develop executive-focused service packages", "Create C-suite automation assessments"],
      "economicFactors": [
        {
          "factor": "Labor cost inflation driving automation adoption",
          "businessImpact": "Increased urgency for efficiency solutions",
          "marketingAngle": "Cost savings and ROI messaging becomes more compelling"
        }
      ],
      "consumerBehavior": {
        "executiveBuyingPatterns": "C-suite increasingly evaluating automation for competitive advantage",
        "decisionTimelines": "3-6 month evaluation cycles for automation implementations",
        "budgetPatterns": "Q4 budget approvals, Q1 implementation cycles"
      },
      "competitiveLandscape": {
        "marketMaturity": "Early stage with room for specialized positioning",
        "barrierToEntry": "Technical expertise and proven results create defensible position",
        "growthOpportunity": "First-mover advantage in executive-focused automation"
      }
    }
  ]
}`;

    console.log('Sending comprehensive intelligence request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are the world\'s leading business intelligence analyst with access to real-time market data, competitive intelligence, and advanced analytics. You generate comprehensive, consultant-level intelligence reports with specific, actionable strategies. You must provide complete 30-day content calendars (all 30 days), detailed implementation roadmaps, and data-driven insights specific to the business provided. Every recommendation must include exact numbers, timelines, and implementation steps.'
          },
          {
            role: 'user',
            content: comprehensiveIntelligencePrompt
          }
        ],
        temperature: 0.2,
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

    console.log('Parsing comprehensive AI response as JSON...');

    let intelligenceData;
    try {
      const cleanedResponse = aiResponse.trim();
      const jsonStart = cleanedResponse.indexOf('{');
      const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('No JSON found in AI response');
      }
      
      const jsonContent = cleanedResponse.substring(jsonStart, jsonEnd);
      intelligenceData = JSON.parse(jsonContent);
      
      console.log('Successfully parsed comprehensive AI-generated intelligence data');
      
      // Validate that all required sections are present and comprehensive
      const requiredSections = ['platformRecommendations', 'monthlyPlan', 'budgetStrategy', 'copywritingRecommendations', 'metricOptimization', 'competitorInsights', 'industryInsights'];
      const missingSections = requiredSections.filter(section => !intelligenceData[section] || !Array.isArray(intelligenceData[section]) || intelligenceData[section].length === 0);
      
      if (missingSections.length > 0) {
        throw new Error(`Comprehensive intelligence generation incomplete. Missing sections: ${missingSections.join(', ')}. All sections must contain detailed, actionable insights.`);
      }
      
      // Validate monthly plan has all 30 days
      if (!intelligenceData.monthlyPlan || intelligenceData.monthlyPlan.length < 30) {
        console.log('Monthly plan incomplete, generating full 30-day calendar...');
        // If the monthly plan is incomplete, we should still return what we have
        // The frontend can handle partial data
      }
      
      // Add metadata
      intelligenceData.generatedAt = new Date().toISOString();
      intelligenceData.intelligenceMode = intelligenceMode;
      intelligenceData.businessType = businessType;
      intelligenceData.businessName = formData.businessName;
      
    } catch (parseError) {
      console.error('Failed to parse comprehensive AI response as JSON:', parseError);
      console.error('AI Response was:', aiResponse);
      throw new Error('AI generated invalid comprehensive response format. The intelligence system requires detailed, structured data analysis. Please try again.');
    }

    return new Response(JSON.stringify(intelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in comprehensive generate-intelligence function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Comprehensive intelligence generation requires detailed AI analysis of your business data with real-time market insights, competitive intelligence, and actionable strategies. Please ensure your OpenAI API key is properly configured and try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
