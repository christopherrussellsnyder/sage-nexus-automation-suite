
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

    console.log('Processing intelligence request for:', formData.businessName);
    console.log('Intelligence mode:', intelligenceMode);
    console.log('Business type:', businessType);

    const comprehensivePrompt = `
You are an expert business strategist and marketing consultant. Analyze the following business data and generate a comprehensive intelligence report in valid JSON format.

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
- Competitor Information: ${JSON.stringify(formData.competitorData) || 'Not specified'}
- Current Metrics: ${JSON.stringify(formData.currentMetrics) || 'Not specified'}

ANALYSIS REQUIREMENTS:
Based on the above business data, generate a comprehensive analysis that includes:

1. PLATFORM RECOMMENDATIONS - Analyze their business type, target audience, and budget to recommend the best platforms (Facebook, Instagram, TikTok, Google Ads, LinkedIn, etc.) with:
   - Priority ranking based on their specific audience and industry
   - Expected ROAS, CPM, conversion rates based on their business model
   - Budget allocation percentages that make sense for their revenue level
   - Platform-specific reasoning tied to their unique value proposition

2. 30-DAY CONTENT CALENDAR - Generate 30 days of specific content based on their business:
   - Daily content tailored to their product/service and target audience
   - Mix of ad copy and organic content appropriate for their industry
   - Hooks, body copy, and CTAs that reflect their unique value proposition
   - Visual suggestions relevant to their business type
   - Expected performance metrics based on their current conversion rates
   - Strategic reasoning for each piece of content

3. BUDGET STRATEGY - Create a budget plan based on their monthly revenue and ad budget:
   - Category breakdown that fits their revenue level
   - Platform allocation based on their target audience demographics  
   - Daily spend recommendations within their stated budget
   - ROI optimization tips specific to their industry and challenges

4. COPYWRITING RECOMMENDATIONS - Analyze their messaging needs:
   - Copy strategies specific to their industry and audience
   - Before/after examples using their actual product/service context
   - Emotional triggers that work for their target demographic
   - A/B testing suggestions relevant to their business goals

5. METRIC OPTIMIZATION - Based on their current performance:
   - Analysis of their stated conversion rates and traffic
   - Improvement targets realistic for their industry
   - Actionable steps addressing their specific challenges  
   - Expected ROI calculations based on their revenue level

6. COMPETITOR INSIGHTS - Analyze their competitive landscape:
   - Insights based on any competitor data they provided
   - Market positioning opportunities for their unique value prop
   - Strategic recommendations to differentiate from competitors
   - Actionable competitive advantages they can implement

7. INDUSTRY INSIGHTS - Provide industry-specific intelligence:
   - Current trends affecting their specific industry
   - Future opportunities relevant to their business model
   - Actionable advice tailored to their target audience
   - Implementation timelines that align with their goals

CRITICAL REQUIREMENTS:
- Every recommendation must be based on and reference their specific business data
- All metrics and projections should consider their stated revenue level and current performance
- Content suggestions must reflect their unique value proposition and target audience  
- Budget recommendations must work within their stated financial parameters
- All insights must be actionable and tied to their stated goals and challenges
- Use their actual business name, product/service, and industry throughout all recommendations

Respond ONLY with valid JSON in this exact structure:
{
  "platformRecommendations": [
    {
      "platform": "Platform Name",
      "priority": 1,
      "reasoning": "Specific reasoning based on their business data",
      "expectedMetrics": {
        "roas": 0.0,
        "cpm": 0.0,
        "conversionRate": 0.0,
        "reach": 0
      },
      "budgetAllocation": 0
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "Platform",
      "contentType": "ad or organic",
      "hook": "Specific hook for their business",
      "body": "Body copy referencing their product/service",
      "cta": "Call to action",
      "visualSuggestion": "Visual suggestion for their business",
      "targetAudience": "Their specific target audience",
      "keyMessage": "Message tied to their value prop",
      "hashtags": ["relevant", "hashtags"],
      "expectedMetrics": {
        "reach": 0,
        "engagement": 0,
        "cost": 0,
        "conversions": 0
      },
      "strategicReasoning": "Why this content works for their business"
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
          "reasoning": "Why this allocation works for their business"
        }
      ],
      "optimizationTips": ["Tips specific to their challenges"]
    }
  ],
  "copywritingRecommendations": [
    {
      "copyType": "Type of copy",
      "recommendations": ["Recommendations for their industry"],
      "examples": [
        {
          "before": "Generic copy example",
          "after": "Improved copy using their business context",
          "improvement": "Why this works for their audience"
        }
      ],
      "emotionalTriggers": ["Triggers that work for their demographic"]
    }
  ],
  "metricOptimization": [
    {
      "metric": "Specific metric",
      "currentPerformance": "Based on their stated metrics",
      "targetImprovement": "Realistic target for their business",
      "actionSteps": ["Steps addressing their specific challenges"],
      "timeline": "Realistic timeline",
      "expectedROI": "ROI calculation based on their revenue"
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Competitor name or market leader",
      "strengths": ["Strengths relevant to their industry"],
      "weaknesses": ["Weaknesses they can exploit"],
      "opportunities": ["Opportunities for their business"],
      "strategicRecommendations": ["How they can compete effectively"]
    }
  ],
  "industryInsights": [
    {
      "trend": "Trend affecting their industry",
      "impact": "How it impacts their business model",
      "actionableAdvice": "What they should do about it",
      "timeline": "When to implement"
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
            content: 'You are an expert business strategist and marketing consultant. You analyze business data and generate comprehensive, actionable intelligence reports in valid JSON format. Every recommendation must be based on and reference the specific business data provided. Never use generic or placeholder content.'
          },
          {
            role: 'user',
            content: comprehensivePrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      
      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else if (response.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`OpenAI API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Received response from OpenAI, parsing JSON...');

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
      
      console.log('Successfully parsed AI-generated intelligence data');
      
      // Validate that all required sections are present and contain data
      const requiredSections = ['platformRecommendations', 'monthlyPlan', 'budgetStrategy', 'copywritingRecommendations', 'metricOptimization', 'competitorInsights', 'industryInsights'];
      const missingSections = requiredSections.filter(section => !intelligenceData[section] || !Array.isArray(intelligenceData[section]) || intelligenceData[section].length === 0);
      
      if (missingSections.length > 0) {
        throw new Error(`AI response missing required sections: ${missingSections.join(', ')}`);
      }
      
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('AI Response was:', aiResponse);
      throw new Error('AI generated invalid response format. Please try again.');
    }

    return new Response(JSON.stringify(intelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-intelligence function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'All intelligence must be generated by AI analysis of your business data. Please ensure your OpenAI API key is properly configured and try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
