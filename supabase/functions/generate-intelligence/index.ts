
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get Intelligence API key from Supabase secrets
const INTELLIGENCE_API_KEY = Deno.env.get('INTELLIGENCE_API_KEY');

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

    console.log('Generating intelligence for:', formData.businessName);

    if (!INTELLIGENCE_API_KEY) {
      throw new Error('Intelligence API key not configured');
    }

    // Create comprehensive structured prompt for OpenAI
    const systemPrompt = `You are an expert business intelligence AI that provides comprehensive marketing and business insights. You MUST respond with a valid JSON object that includes ALL required sections with specific data and metrics.`;
    
    const userPrompt = `
    Generate comprehensive business intelligence for:
    
    Business: ${formData.businessName}
    Industry: ${formData.industry}
    Business Type: ${businessType}
    Target Audience: ${formData.targetAudience}
    Product/Service: ${formData.productService}
    Unique Value: ${formData.uniqueValue}
    Monthly Revenue: ${formData.monthlyRevenue}
    Current Challenges: ${formData.currentChallenges || 'Not specified'}
    Goals: ${formData.goals?.join(', ') || 'Not specified'}
    Timeline: ${formData.timeline || 'Not specified'}
    
    Intelligence Mode: ${intelligenceMode}
    
    You MUST provide a structured JSON response with ALL of these sections filled with specific, actionable data:

    {
      "generatedAt": "current timestamp",
      "intelligenceMode": "${intelligenceMode}",
      "businessType": "${businessType}",
      "formData": "include the original form data",
      "budgetStrategy": {
        "recommendedStrategy": "specific strategy based on revenue and business type",
        "monthlyBudgetAllocation": {
          "primaryPlatform": "percentage and dollar amount",
          "secondaryPlatform": "percentage and dollar amount", 
          "testing": "percentage and dollar amount"
        },
        "expectedROAS": "specific number",
        "targetCPM": "specific dollar amount",
        "reasoning": "detailed explanation of strategy"
      },
      "platformRecommendations": [
        {
          "platform": "specific platform name",
          "priority": "number 1-4",
          "score": "optimization score 1-100",
          "reasoning": "specific reasoning for this business",
          "expectedMetrics": {
            "roas": "specific number",
            "cpm": "specific dollar amount",
            "conversionRate": "specific percentage"
          },
          "budgetAllocation": "specific percentage"
        }
      ],
      "monthlyPlan": [
        {
          "day": "day number",
          "platform": "specific platform",
          "contentType": "ad or organic",
          "hook": "specific hook for this business",
          "body": "specific body content",
          "cta": "specific call to action",
          "visualSuggestion": "specific visual recommendation",
          "targetAudience": "specific audience segment",
          "keyMessage": "specific message",
          "expectedMetrics": {
            "reach": "estimated reach number",
            "engagement": "estimated engagement",
            "cost": "estimated cost",
            "conversions": "estimated conversions"
          },
          "strategicReasoning": "why this content on this day"
        }
      ],
      "metricOptimization": [
        {
          "metric": "specific metric name",
          "currentBenchmark": "current performance number",
          "targetBenchmark": "target performance number", 
          "improvementStrategies": ["specific actionable strategies"],
          "timeline": "specific timeframe",
          "expectedROI": "specific ROI improvement"
        }
      ],
      "competitorInsights": [
        {
          "competitor": "identified competitor name",
          "strengths": ["specific strengths observed"],
          "weaknesses": ["specific weaknesses to exploit"],
          "opportunities": ["specific opportunities"],
          "strategicRecommendations": ["specific actions to take"]
        }
      ],
      "copywritingRecommendations": [
        {
          "copyType": "specific copy type (website/ads/email/social)",
          "recommendations": ["specific copywriting advice"],
          "examples": [
            {
              "before": "example of current/typical copy",
              "after": "improved copy example",
              "improvement": "explanation of improvement"
            }
          ],
          "emotionalTriggers": ["specific triggers for this audience"],
          "testingStrategy": "A/B testing recommendations"
        }
      ],
      "industryInsights": [
        {
          "trend": "specific industry trend",
          "impact": "impact on this business",
          "actionableAdvice": "specific actions to take",
          "timeline": "when to implement"
        }
      ]
    }

    Provide specific, actionable data for ${formData.businessName} in the ${formData.industry} industry. DO NOT use placeholder text or generic examples. All metrics, strategies, and recommendations must be tailored to this specific business context.
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${INTELLIGENCE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Response received, processing...');

    // Try to parse as JSON
    let intelligenceData;
    try {
      intelligenceData = JSON.parse(aiResponse);
      
      // Ensure all required fields are present
      intelligenceData.generatedAt = new Date().toISOString();
      intelligenceData.intelligenceMode = intelligenceMode;
      intelligenceData.businessType = businessType;
      intelligenceData.formData = formData;
      
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.log('Raw AI response:', aiResponse);
      
      // If JSON parsing fails, create a structured response with the raw content
      intelligenceData = {
        generatedAt: new Date().toISOString(),
        intelligenceMode: intelligenceMode,
        businessType: businessType,
        formData: formData,
        aiGeneratedContent: aiResponse,
        fullAIResponse: aiResponse,
        error: 'Failed to parse structured response, falling back to raw content'
      };
    }

    console.log('Intelligence generated successfully using AI API');
    return new Response(JSON.stringify(intelligenceData), {
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
