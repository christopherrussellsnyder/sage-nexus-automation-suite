
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

Generate a focused response with this structure (limit each day to essential information):

{
  "platformRecommendations": [
    {
      "platform": "LinkedIn",
      "priority": 1,
      "reasoning": "Optimal for B2B targeting with professional decision-makers",
      "expectedMetrics": {
        "roas": 4.2,
        "cpm": 15.0,
        "cpc": 3.5,
        "conversionRate": 3.8
      },
      "budgetAllocation": 40
    }
  ],
  "monthlyPlan": [
    ${Array.from({ length: 5 }, (_, i) => `
    {
      "day": ${i + 1},
      "platform": "${['LinkedIn', 'Google Ads', 'Facebook', 'Instagram', 'TikTok'][i]}",
      "contentType": "${i % 2 === 0 ? 'ad' : 'organic'}",
      "hook": "Day ${i + 1}: ${formData.businessName} transforms ${formData.industry}",
      "body": "Brief description for ${formData.targetAudience}",
      "cta": "${['Book consultation', 'Get free audit', 'Start trial', 'Learn more', 'Contact us'][i]}",
      "expectedMetrics": {
        "reach": ${Math.floor(Math.random() * 10000) + 3000},
        "engagement": ${Math.floor(Math.random() * 500) + 200}
      }
    }`).join(',')}
  ],
  "budgetStrategy": [
    {
      "category": "Platform Advertising",
      "monthlyBudget": ${parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000')},
      "allocation": [
        {
          "platform": "LinkedIn",
          "percentage": 40,
          "reasoning": "Highest ROI for B2B targeting"
        }
      ]
    }
  ],
  "copywritingRecommendations": [
    {
      "copyType": "Executive Outreach",
      "awarenessStageVariations": {
        "unaware": "Did you know ${formData.industry} businesses waste time on manual tasks?",
        "problemAware": "Tired of repetitive tasks keeping you from growth?",
        "solutionAware": "AI automation transforms ${formData.industry} operations",
        "productAware": "${formData.businessName} helps save 20+ hours weekly",
        "mostAware": "Ready to implement? ${formData.businessName} delivers in 2 weeks"
      }
    }
  ],
  "metricOptimization": [
    {
      "metric": "Lead Conversion Rate",
      "currentAnalysis": "Optimization needed for ${formData.industry}",
      "targetImprovement": "Increase by 40% within 60 days",
      "actionSteps": ["Industry-specific landing pages", "Add social proof"]
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Generic ${formData.industry} providers",
      "weaknesses": ["Lack specialization", "Generic messaging"],
      "opportunities": ["Industry expertise", "Personalized approach"]
    }
  ],
  "industryInsights": [
    {
      "trend": "Growing ${formData.industry} automation demand",
      "impact": "Increased market opportunity",
      "actionableAdvice": "Position as industry specialist"
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
            content: 'You are a business intelligence analyst. You must respond with valid JSON only. No markdown formatting, no code blocks, just pure JSON that can be parsed directly. Keep responses concise but comprehensive.'
          },
          {
            role: 'user',
            content: intelligencePrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 6000
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
      
      // Try to parse directly first
      try {
        intelligenceData = JSON.parse(cleanedResponse);
      } catch (directParseError) {
        // If direct parsing fails, try to extract JSON object
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error('No JSON object found in AI response');
          console.error('Raw response:', aiResponse.substring(0, 1000) + '...');
          throw new Error('No valid JSON object found in AI response');
        }
        
        const jsonContent = jsonMatch[0];
        intelligenceData = JSON.parse(jsonContent);
      }
      
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

      // Generate remaining days if needed (up to 30)
      if (intelligenceData.monthlyPlan && intelligenceData.monthlyPlan.length < 30) {
        const platforms = ['LinkedIn', 'Facebook', 'Instagram', 'Google Ads', 'TikTok'];
        const ctas = ['Book consultation', 'Get free audit', 'Start trial', 'Learn more', 'Contact us'];
        
        for (let day = intelligenceData.monthlyPlan.length + 1; day <= 30; day++) {
          const platform = platforms[day % platforms.length];
          const cta = ctas[day % ctas.length];
          
          intelligenceData.monthlyPlan.push({
            day,
            platform,
            contentType: day % 2 === 0 ? 'organic' : 'ad',
            hook: `Day ${day}: ${formData.businessName} enhances ${formData.industry} efficiency`,
            body: `Discover how ${formData.businessName} helps ${formData.targetAudience} achieve better results`,
            cta,
            expectedMetrics: {
              reach: Math.floor(Math.random() * 8000) + 3000,
              engagement: Math.floor(Math.random() * 400) + 200,
              cost: Math.floor(Math.random() * 150) + 50,
              conversions: Math.floor(Math.random() * 15) + 5
            },
            strategicReasoning: `Day ${day} focuses on ${['awareness', 'consideration', 'conversion'][day % 3]}`
          });
        }
      }
      
      // Add metadata
      intelligenceData.generatedAt = new Date().toISOString();
      intelligenceData.intelligenceMode = intelligenceMode;
      intelligenceData.businessType = businessType;
      intelligenceData.businessName = formData.businessName;
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw AI response (first 1000 chars):', aiResponse.substring(0, 1000));
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
