
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

    console.log('Processing intelligence request for:', formData.businessName);
    console.log('Intelligence mode:', intelligenceMode);
    console.log('Business type:', businessType);

    const intelligencePrompt = `
You are a world-class business intelligence analyst. Generate a comprehensive, actionable intelligence report for this business.

BUSINESS PROFILE:
- Business: ${formData.businessName}
- Industry: ${formData.industry}
- Business Type: ${businessType}
- Target Audience: ${formData.targetAudience}
- Product/Service: ${formData.productService}
- Unique Value: ${formData.uniqueValue}
- Monthly Revenue: ${formData.monthlyRevenue}
- Monthly Ad Budget: ${formData.monthlyAdBudget || 'Not specified'}
- Current Challenges: ${formData.currentChallenges || 'Not specified'}
- Goals: ${formData.primaryGoals?.join(', ') || formData.goals?.join(', ') || 'Not specified'}

CRITICAL REQUIREMENTS:
1. Generate a complete 30-day content calendar (all 30 days)
2. Provide detailed platform recommendations with specific metrics
3. Include comprehensive copywriting analysis with awareness stages
4. Deliver actionable competitor insights
5. Provide detailed budget strategy with specific allocations
6. Include metric optimization with implementation steps

You must respond with VALID JSON only. No markdown formatting, no code blocks, just pure JSON.

Generate the response as this EXACT JSON structure:

{
  "platformRecommendations": [
    {
      "platform": "LinkedIn",
      "priority": 1,
      "reasoning": "LinkedIn is optimal for B2B targeting with professional decision-makers and executives",
      "expectedMetrics": {
        "roas": 4.2,
        "cpm": 15.0,
        "cpc": 3.5,
        "conversionRate": 3.8,
        "reach": 12000,
        "engagementRate": 2.1
      },
      "budgetAllocation": 40,
      "targetingParameters": {
        "demographics": ["Business owners, CEOs, decision-makers aged 35-55"],
        "interests": ["Business automation, AI technology, productivity tools"],
        "behaviors": ["Active LinkedIn users, content engagers, B2B decision-makers"],
        "customAudiences": ["Lookalike audiences from existing customers, website visitors"]
      }
    },
    {
      "platform": "Google Ads",
      "priority": 2,
      "reasoning": "High-intent search traffic for automation solutions with strong commercial intent",
      "expectedMetrics": {
        "roas": 3.8,
        "cpm": 25.0,
        "cpc": 2.8,
        "conversionRate": 4.5,
        "reach": 8000,
        "engagementRate": 3.2
      },
      "budgetAllocation": 35,
      "targetingParameters": {
        "demographics": ["Business owners searching for automation solutions"],
        "interests": ["Business efficiency, AI automation, productivity software"],
        "behaviors": ["High commercial intent searchers, solution seekers"],
        "customAudiences": ["Search remarketing lists, similar audiences"]
      }
    },
    {
      "platform": "Facebook",
      "priority": 3,
      "reasoning": "Broad reach for awareness and detailed targeting options for business audiences",
      "expectedMetrics": {
        "roas": 3.2,
        "cpm": 12.0,
        "cpc": 1.8,
        "conversionRate": 2.9,
        "reach": 15000,
        "engagementRate": 1.8
      },
      "budgetAllocation": 25,
      "targetingParameters": {
        "demographics": ["Small business owners, entrepreneurs aged 30-50"],
        "interests": ["Business management, automation tools, productivity"],
        "behaviors": ["Small business owners, frequent online shoppers"],
        "customAudiences": ["Website visitors, email subscribers, lookalike audiences"]
      }
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "LinkedIn",
      "contentType": "ad",
      "hook": "Stop spending 20+ hours a week on tasks that AI can handle in minutes",
      "body": "Leading ${formData.industry} companies are saving 40% of their operational time with AI automation. While your competitors are still doing manual work, you could be focusing on strategy and growth. Our AI solutions eliminate repetitive tasks and free up your team for high-value activities.",
      "cta": "Book a free automation audit",
      "visualSuggestion": "Split-screen showing manual vs automated workflow with time savings highlighted",
      "targetAudience": "Business owners in ${formData.industry}",
      "keyMessage": "Time freedom through AI automation",
      "hashtags": ["#AIAutomation", "#BusinessEfficiency", "#TimeManagement"],
      "psychologicalTriggers": ["Time scarcity", "Competitive advantage", "Fear of missing out"],
      "abTestingVariables": ["Hook variation", "CTA wording", "Visual approach"],
      "performancePrediction": {
        "score": 88,
        "reasoning": "Strong pain point focus with clear value proposition"
      },
      "expectedMetrics": {
        "reach": 5000,
        "engagement": 350,
        "cost": 180,
        "conversions": 14,
        "shareRate": 0.07,
        "saveRate": 0.03
      },
      "strategicReasoning": "Addresses primary pain point of time management for business owners",
      "engagementStrategy": "Respond with time-saving tips and offer free resources",
      "crossPlatformAdaptation": {
        "linkedin": "Professional tone focusing on business efficiency",
        "facebook": "More casual approach emphasizing work-life balance",
        "instagram": "Visual story showing before/after scenarios",
        "twitter": "Concise thread about automation benefits"
      }
    },
    {
      "day": 2,
      "platform": "Google Ads",
      "contentType": "ad",
      "hook": "AI Automation for ${formData.industry} Businesses",
      "body": "Streamline your operations with custom AI solutions. Reduce manual work by 60% and focus on growing your business. Trusted by 200+ companies.",
      "cta": "Get free consultation",
      "visualSuggestion": "Professional dashboard showing automated workflows",
      "targetAudience": "Business owners searching for automation",
      "keyMessage": "Custom AI solutions for business growth",
      "hashtags": ["#AIAutomation", "#BusinessGrowth"],
      "psychologicalTriggers": ["Efficiency", "Growth opportunity"],
      "abTestingVariables": ["Headline approach", "CTA text"],
      "performancePrediction": {
        "score": 85,
        "reasoning": "High-intent search targeting with strong value proposition"
      },
      "expectedMetrics": {
        "reach": 3000,
        "engagement": 180,
        "cost": 150,
        "conversions": 12,
        "shareRate": 0.04,
        "saveRate": 0.02
      },
      "strategicReasoning": "Captures high-intent search traffic",
      "engagementStrategy": "Immediate follow-up with consultation booking",
      "crossPlatformAdaptation": {
        "linkedin": "B2B focused messaging",
        "facebook": "Broader business owner appeal",
        "instagram": "Visual automation demonstrations",
        "twitter": "Quick automation tips and insights"
      }
    }
  ],
  "budgetStrategy": [
    {
      "category": "Platform Advertising",
      "monthlyBudget": 8000,
      "allocation": [
        {
          "platform": "LinkedIn",
          "percentage": 40,
          "dailySpend": 107,
          "reasoning": "Highest ROI for B2B targeting and professional audience engagement",
          "targetingCosts": {
            "cpm": 15,
            "cpc": 3.5,
            "cpa": 85
          },
          "scalingTriggers": ["ROAS above 4.0", "Conversion rate above 3.5%"],
          "dayPartingStrategy": {
            "morning": "9AM-12PM: 35% budget for business hours engagement",
            "afternoon": "1PM-5PM: 45% budget for peak professional activity",
            "evening": "6PM-9PM: 20% budget for after-hours planning"
          }
        },
        {
          "platform": "Google Ads",
          "percentage": 35,
          "dailySpend": 93,
          "reasoning": "High-intent search traffic with strong commercial signals",
          "targetingCosts": {
            "cpm": 25,
            "cpc": 2.8,
            "cpa": 70
          },
          "scalingTriggers": ["ROAS above 3.5", "Quality Score above 8"],
          "dayPartingStrategy": {
            "morning": "8AM-11AM: 30% budget for business search patterns",
            "afternoon": "12PM-6PM: 50% budget for peak search volume",
            "evening": "7PM-10PM: 20% budget for research and planning"
          }
        },
        {
          "platform": "Facebook",
          "percentage": 25,
          "dailySpend": 67,
          "reasoning": "Broad reach for awareness and detailed targeting capabilities",
          "targetingCosts": {
            "cpm": 12,
            "cpc": 1.8,
            "cpa": 95
          },
          "scalingTriggers": ["ROAS above 3.0", "Engagement rate above 2%"],
          "dayPartingStrategy": {
            "morning": "7AM-10AM: 25% budget for early engagement",
            "afternoon": "11AM-4PM: 40% budget for peak social activity",
            "evening": "5PM-10PM: 35% budget for leisure browsing"
          }
        }
      ],
      "roasTargets": [
        {
          "timeframe": "30 days",
          "target": 3.8,
          "optimizationThreshold": 3.0
        }
      ],
      "crisisManagement": {
        "underperformanceThreshold": 2.5,
        "actions": ["Pause underperforming ad sets", "Increase budget to top performers", "Implement emergency remarketing campaigns"],
        "budgetReallocation": "Shift 30% of budget from underperforming platforms to top performer"
      }
    }
  ],
  "copywritingRecommendations": [
    {
      "copyType": "Executive Email Outreach",
      "competitorAnalysis": {
        "commonApproaches": "Generic automation benefits and generic ROI claims",
        "improvedStrategy": "Focus on specific time savings and industry-relevant case studies",
        "differentiationPoints": "Personalized automation strategies and proven ${formData.industry} expertise"
      },
      "awarenessStageVariations": {
        "unaware": "Did you know that ${formData.industry} businesses waste 35% of their time on tasks that could be automated?",
        "problemAware": "Tired of spending hours on repetitive tasks that keep you from growing your business?",
        "solutionAware": "AI automation is transforming how ${formData.industry} companies operate - here's how it works",
        "productAware": "See how ${formData.businessName} helps ${formData.industry} businesses save 20+ hours per week",
        "mostAware": "Ready to implement AI automation? ${formData.businessName} can have your system running in 2 weeks"
      },
      "emotionalTriggers": [
        {
          "trigger": "Time scarcity and overwhelm",
          "implementation": "Use urgent language about time waste and missed opportunities",
          "expectedImpact": "25% higher response rates"
        },
        {
          "trigger": "Competitive advantage fear",
          "implementation": "Highlight how competitors are getting ahead with automation",
          "expectedImpact": "20% increase in consultation bookings"
        },
        {
          "trigger": "Growth ambition",
          "implementation": "Connect automation to business expansion possibilities",
          "expectedImpact": "30% higher engagement rates"
        }
      ],
      "powerWords": ["Transform", "Eliminate", "Streamline", "Accelerate", "Optimize", "Dominate", "Revolutionary", "Exclusive"],
      "abTestingFramework": {
        "variables": ["Subject line approach", "Email length", "CTA placement", "Social proof inclusion"],
        "hypotheses": ["Urgency-based subject lines increase open rates", "Shorter emails improve click-through rates"],
        "successMetrics": ["Open rate >25%", "Click rate >8%", "Response rate >3%"],
        "statisticalSignificance": "95% confidence level with minimum 500 recipients per variation"
      },
      "funnelCopy": {
        "awareness": "Educational content about automation ROI and industry trends",
        "consideration": "Case studies and detailed solution explanations",
        "conversion": "Consultation booking with clear next steps",
        "retention": "Onboarding sequences and success tracking"
      }
    }
  ],
  "metricOptimization": [
    {
      "metric": "Lead Conversion Rate",
      "industryBenchmark": {
        "aiAutomationAgencies": "2.8% average for agencies under 10k/month revenue",
        "executiveTargeting": "4.2% for B2B services targeting decision-makers",
        "currentPosition": "Estimated 2.1% based on current setup"
      },
      "currentAnalysis": "Low conversion likely due to generic messaging and basic landing page optimization",
      "targetImprovement": "Increase to 4.0% within 60 days through targeted improvements",
      "optimizationProtocol": [
        {
          "step": 1,
          "action": "Implement industry-specific landing pages with case studies",
          "timeline": "Week 1-2",
          "expectedImpact": "20-30% conversion improvement",
          "implementationDetails": ["Create ${formData.industry}-specific landing pages", "Add social proof and testimonials", "Implement heat mapping and user session recording"]
        },
        {
          "step": 2,
          "action": "Deploy advanced lead scoring and nurturing sequences",
          "timeline": "Week 3-4",
          "expectedImpact": "15-25% additional improvement",
          "implementationDetails": ["Set up behavioral tracking", "Create automated follow-up sequences", "Implement lead scoring algorithms"]
        }
      ],
      "roiCalculation": {
        "investmentRequired": 3500,
        "expectedReturn": 12000,
        "paybackPeriod": "6-8 weeks",
        "longTermValue": "Additional $8,000 monthly revenue within 90 days"
      }
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Typical AI Automation Agencies",
      "marketPosition": "Generic positioning with broad automation services",
      "pricingAnalysis": {
        "averagePackages": "$2,500-7,500/month for automation services",
        "pricingStrategy": "Position ${formData.businessName} at premium $4,000-9,000 range with superior results",
        "valueGapOpportunity": "Offer industry-specific expertise and faster implementation"
      },
      "marketingStrategy": {
        "commonApproaches": ["Generic LinkedIn outreach", "Basic case studies", "Broad targeting"],
        "weaknesses": ["Lack of industry specialization", "Generic messaging", "Poor follow-up"],
        "opportunities": ["Industry-specific case studies", "Executive-focused messaging", "Advanced nurturing sequences"]
      },
      "weaknessExploitation": [
        {
          "weakness": "Generic, one-size-fits-all approach",
          "strategy": "Position as ${formData.industry} automation specialists",
          "implementation": "Create industry-specific case studies and testimonials",
          "expectedImpact": "35-50% higher conversion rates vs generic competitors"
        }
      ]
    }
  ],
  "industryInsights": [
    {
      "trend": "Accelerating AI adoption in ${formData.industry} sector",
      "impact": "Growing demand for specialized automation solutions",
      "opportunity": "Position as industry-specific automation experts",
      "timeline": "Peak opportunity in next 12-18 months",
      "actionPlan": ["Develop ${formData.industry}-specific case studies", "Create industry automation assessments", "Build partnerships with ${formData.industry} associations"],
      "economicFactors": [
        {
          "factor": "Labor cost inflation driving automation adoption",
          "businessImpact": "Increased urgency for efficiency solutions",
          "marketingAngle": "Cost savings messaging becomes more compelling"
        }
      ]
    }
  ]
}`;

    console.log('Sending request to OpenAI...');

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
            content: 'You are a business intelligence analyst. You must respond with valid JSON only. No markdown formatting, no code blocks, just pure JSON that can be parsed directly.'
          },
          {
            role: 'user',
            content: intelligencePrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from OpenAI API');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('AI response length:', aiResponse.length);

    let intelligenceData;
    try {
      // Clean the response to ensure it's valid JSON
      const cleanedResponse = aiResponse.trim();
      
      // Remove any potential markdown formatting
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON object found in AI response');
      }
      
      const jsonContent = jsonMatch[0];
      intelligenceData = JSON.parse(jsonContent);
      
      console.log('Successfully parsed AI response');
      
      // Validate required sections
      const requiredSections = ['platformRecommendations', 'monthlyPlan', 'budgetStrategy', 'copywritingRecommendations', 'metricOptimization', 'competitorInsights', 'industryInsights'];
      const missingSections = requiredSections.filter(section => !intelligenceData[section]);
      
      if (missingSections.length > 0) {
        console.warn('Missing sections:', missingSections);
      }
      
      // Ensure we have at least basic data for each section
      if (!intelligenceData.platformRecommendations || intelligenceData.platformRecommendations.length === 0) {
        intelligenceData.platformRecommendations = [
          {
            platform: "LinkedIn",
            priority: 1,
            reasoning: "Professional B2B network optimal for targeting business decision-makers",
            expectedMetrics: { roas: 4.2, cpm: 15.0, cpc: 3.5, conversionRate: 3.8, reach: 12000, engagementRate: 2.1 },
            budgetAllocation: 40
          }
        ];
      }
      
      if (!intelligenceData.monthlyPlan || intelligenceData.monthlyPlan.length === 0) {
        // Generate at least 30 days of content
        intelligenceData.monthlyPlan = Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          platform: i % 3 === 0 ? "LinkedIn" : i % 3 === 1 ? "Google Ads" : "Facebook",
          contentType: i % 2 === 0 ? "ad" : "organic",
          hook: `Day ${i + 1}: Transform your ${formData.industry} business with AI automation`,
          body: `Discover how ${formData.businessName} can streamline your operations and boost productivity. Join successful ${formData.industry} businesses already saving time and money.`,
          cta: "Book free consultation",
          visualSuggestion: "Professional business automation dashboard",
          targetAudience: formData.targetAudience,
          keyMessage: "Efficiency through automation",
          expectedMetrics: { reach: 5000, engagement: 300, cost: 150, conversions: 12 }
        }));
      }
      
      // Add metadata
      intelligenceData.generatedAt = new Date().toISOString();
      intelligenceData.intelligenceMode = intelligenceMode;
      intelligenceData.businessType = businessType;
      intelligenceData.businessName = formData.businessName;
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw AI response:', aiResponse);
      throw new Error('AI generated invalid response format. Please try again.');
    }

    return new Response(JSON.stringify(intelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-intelligence function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Intelligence generation failed. Please check your API configuration and try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
