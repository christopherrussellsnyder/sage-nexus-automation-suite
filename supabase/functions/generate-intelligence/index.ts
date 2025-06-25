
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
    console.log('Edge function called - checking configuration...');
    
    // Check if OpenAI API key is configured
    if (!openAIApiKey || openAIApiKey.trim() === '') {
      console.error('OpenAI API key not configured or empty');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in Supabase secrets.',
        details: 'The AI intelligence generation requires a valid OpenAI API key to function properly.'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const request: IntelligenceRequest = await req.json();
    const { formData, intelligenceMode, businessType } = request;

    console.log('Processing intelligence request for:', formData.businessName);
    console.log('Intelligence mode:', intelligenceMode);
    console.log('Business type:', businessType);

    // Validate required fields
    if (!formData.businessName || !formData.industry || !formData.targetAudience) {
      return new Response(JSON.stringify({ 
        error: 'Missing required business information',
        details: 'Business name, industry, and target audience are required fields.'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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

Generate the response as this EXACT JSON structure with 30 days of content:

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
      },
      "dayPartingStrategy": {
        "morning": "9AM-12PM: 35% budget for business hours engagement",
        "afternoon": "1PM-5PM: 45% budget for peak professional activity",
        "evening": "6PM-9PM: 20% budget for after-hours planning"
      },
      "scalingTriggers": ["ROAS above 4.0", "Conversion rate above 3.5%", "CPA below $85"]
    }
  ],
  "monthlyPlan": ${JSON.stringify(Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    platform: ["LinkedIn", "Google Ads", "Facebook", "Instagram", "TikTok"][i % 5],
    contentType: i % 2 === 0 ? "ad" : "organic",
    hook: `Day ${i + 1}: ${formData.businessName} transforms ${formData.industry} operations`,
    body: `Discover how ${formData.businessName} helps ${formData.targetAudience} achieve ${formData.uniqueValue || 'operational excellence'} through innovative solutions.`,
    cta: ["Book consultation", "Get free audit", "Start free trial", "Learn more", "Contact us"][i % 5],
    visualSuggestion: `Professional ${formData.industry} visual showing transformation results`,
    targetAudience: formData.targetAudience,
    keyMessage: `${formData.uniqueValue || 'Innovation'} for ${formData.industry}`,
    hashtags: [`#${formData.industry}`, "#BusinessGrowth", "#Innovation"],
    expectedMetrics: {
      reach: Math.floor(Math.random() * 10000) + 3000,
      engagement: Math.floor(Math.random() * 500) + 200,
      cost: Math.floor(Math.random() * 150) + 50,
      conversions: Math.floor(Math.random() * 20) + 8
    },
    strategicReasoning: `Day ${i + 1} focuses on ${["awareness", "consideration", "conversion", "retention", "advocacy"][i % 5]}`
  })))},
  "budgetStrategy": [
    {
      "category": "Platform Advertising",
      "monthlyBudget": parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000'),
      "allocation": [
        {
          "platform": "LinkedIn",
          "percentage": 40,
          "dailySpend": Math.round((parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.4) / 30),
          "reasoning": "Highest ROI for B2B targeting and professional audience engagement"
        }
      ],
      "crisisManagement": {
        "underperformanceThreshold": 2.5,
        "actions": ["Pause underperforming ad sets", "Increase budget to top performers"],
        "budgetReallocation": "Shift 30% of budget from underperforming platforms to top performer"
      }
    }
  ],
  "copywritingRecommendations": [
    {
      "copyType": "Executive Outreach",
      "awarenessStageVariations": {
        "unaware": "Did you know that ${formData.industry} businesses waste 35% of their time on tasks that could be automated?",
        "problemAware": "Tired of spending hours on repetitive tasks that keep you from growing your business?",
        "solutionAware": "AI automation is transforming how ${formData.industry} companies operate - here's how it works",
        "productAware": "See how ${formData.businessName} helps ${formData.industry} businesses save 20+ hours per week",
        "mostAware": "Ready to implement solutions? ${formData.businessName} can have your system running in 2 weeks"
      },
      "emotionalTriggers": [
        {
          "trigger": "Time scarcity and overwhelm",
          "implementation": "Use urgent language about time waste and missed opportunities",
          "expectedImpact": "25% higher response rates"
        }
      ],
      "powerWords": ["Transform", "Eliminate", "Streamline", "Accelerate", "Optimize"]
    }
  ],
  "metricOptimization": [
    {
      "metric": "Lead Conversion Rate",
      "currentAnalysis": "Optimization needed for ${formData.industry} targeting",
      "targetImprovement": "Increase conversion rate by 40% within 60 days",
      "actionSteps": ["Implement industry-specific landing pages", "Add social proof", "Optimize funnel flow"]
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Generic ${formData.industry} providers",
      "weaknesses": ["Lack of specialization", "Generic messaging", "Poor follow-up"],
      "opportunities": ["Industry-specific expertise", "Personalized approach", "Better service delivery"]
    }
  ],
  "industryInsights": [
    {
      "trend": "Growing demand for ${formData.industry} solutions",
      "impact": "Increased market opportunity for specialized providers",
      "actionableAdvice": "Position as industry specialist with proven expertise"
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
        console.error('No JSON object found in AI response');
        console.error('Raw response:', aiResponse);
        throw new Error('No JSON object found in AI response');
      }
      
      const jsonContent = jsonMatch[0];
      intelligenceData = JSON.parse(jsonContent);
      
      console.log('Successfully parsed AI response');
      console.log('Monthly plan entries:', intelligenceData.monthlyPlan?.length || 0);
      
      // Ensure we have at least basic data structure
      if (!intelligenceData.platformRecommendations) {
        intelligenceData.platformRecommendations = [];
      }
      if (!intelligenceData.monthlyPlan) {
        intelligenceData.monthlyPlan = [];
      }
      if (!intelligenceData.budgetStrategy) {
        intelligenceData.budgetStrategy = [];
      }
      if (!intelligenceData.copywritingRecommendations) {
        intelligenceData.copywritingRecommendations = [];
      }
      if (!intelligenceData.metricOptimization) {
        intelligenceData.metricOptimization = [];
      }
      if (!intelligenceData.competitorInsights) {
        intelligenceData.competitorInsights = [];
      }
      if (!intelligenceData.industryInsights) {
        intelligenceData.industryInsights = [];
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
      details: 'Intelligence generation failed. Please check your configuration and try again.',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
