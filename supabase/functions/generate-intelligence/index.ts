import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log('Edge function loaded successfully');

serve(async (req) => {
  console.log('Request received:', req.method, req.url);
  
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      console.error('No OpenAI API key found');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('API key found, processing request...');
    
    const { formData, intelligenceMode, businessType } = await req.json();
    
    console.log('Processing for business:', formData?.businessName, 'Type:', businessType);

    const prompt = createPrompt(formData, businessType, intelligenceMode);
    
    console.log('Calling OpenAI...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert business intelligence AI. Always respond with valid JSON containing business insights.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI error:', response.status, errorText);
      return new Response(JSON.stringify({ error: `OpenAI API error: ${response.status}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('Got AI response, parsing...');
    
    let intelligenceData;
    try {
      const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      intelligenceData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.log('JSON parse failed, creating fallback response...');
      intelligenceData = createFallbackResponse(formData, businessType);
    }

    // Add required metadata
    intelligenceData.generatedAt = new Date().toISOString();
    intelligenceData.businessType = businessType;
    intelligenceData.intelligenceMode = intelligenceMode;
    intelligenceData.formData = formData;

    console.log('Returning intelligence data successfully');
    
    return new Response(JSON.stringify(intelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createPrompt(formData: any, businessType: string, intelligenceMode: string): string {
  return `Generate comprehensive business intelligence for ${formData.businessName}.
  
Business Details:
- Industry: ${formData.industry}
- Target Audience: ${formData.targetAudience}
- Product/Service: ${formData.productService}
- Monthly Revenue: ${formData.monthlyRevenue}
- Business Type: ${businessType}
- Current Challenges: ${formData.currentChallenges || 'None specified'}

Generate a detailed JSON response with the following structure:
{
  "budgetStrategy": {
    "totalBudget": "$2000",
    "allocation": {"advertising": 60, "content": 20, "tools": 20},
    "recommendations": ["Focus on high-converting platforms", "Test different ad formats"]
  },
  "copywritingRecommendations": [
    {
      "type": "email",
      "headline": "Boost Your Sales Today",
      "content": "Compelling email copy...",
      "cta": "Get Started Now"
    }
  ],
  "platformRecommendations": [
    {
      "platform": "Facebook",
      "priority": "High",
      "reasoning": "Large audience, good targeting",
      "budget": "$800"
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "Facebook",
      "contentType": "video",
      "title": "Product Demo",
      "description": "Show product benefits"
    }
  ],
  "metricOptimization": {
    "conversionRate": {"current": "2%", "target": "4%"},
    "cpa": {"current": "$50", "target": "$35"},
    "roas": {"current": "3x", "target": "5x"}
  },
  "competitorInsights": [
    {
      "competitor": "Company ABC",
      "strength": "Strong social media presence",
      "opportunity": "Limited mobile optimization"
    }
  ],
  "industryInsights": [
    {
      "trend": "Video content growth",
      "impact": "High",
      "action": "Increase video production"
    }
  ]
}

Make sure the response is valid JSON and includes realistic, actionable insights.`;
}

function createFallbackResponse(formData: any, businessType: string) {
  return {
    budgetStrategy: {
      totalBudget: "$2000",
      allocation: { advertising: 60, content: 20, tools: 20 },
      recommendations: [
        "Focus budget on highest-converting platforms",
        "Test small budgets across multiple channels initially",
        "Allocate 60% to advertising for maximum reach"
      ]
    },
    copywritingRecommendations: [
      {
        type: "email",
        headline: `Transform Your ${formData.industry} Business Today`,
        content: `Discover how ${formData.businessName} can help ${formData.targetAudience} achieve better results...`,
        cta: "Get Started Now"
      },
      {
        type: "ad",
        headline: `#1 ${formData.productService} Solution`,
        content: `Join thousands of satisfied customers who trust ${formData.businessName}...`,
        cta: "Learn More"
      }
    ],
    platformRecommendations: [
      {
        platform: "Facebook",
        priority: "High",
        reasoning: "Large audience reach and sophisticated targeting options",
        budget: "$800"
      },
      {
        platform: "Google Ads",
        priority: "High", 
        reasoning: "High-intent search traffic with immediate results",
        budget: "$600"
      }
    ],
    monthlyPlan: Array.from({length: 30}, (_, i) => ({
      day: i + 1,
      platform: ["Facebook", "Instagram", "Google", "TikTok"][i % 4],
      contentType: ["video", "image", "text", "story"][i % 4],
      title: `Day ${i + 1} Content`,
      description: `Engaging content for ${formData.targetAudience}`
    })),
    metricOptimization: {
      conversionRate: { current: "2.1%", target: "3.8%" },
      cpa: { current: "$45", target: "$32" },
      roas: { current: "3.2x", target: "4.8x" }
    },
    competitorInsights: [
      {
        competitor: "Industry Leader",
        strength: "Strong brand recognition",
        opportunity: "Limited personalization in messaging"
      }
    ],
    industryInsights: [
      {
        trend: "Increased focus on personalization",
        impact: "High",
        action: "Implement dynamic content strategies"
      }
    ]
  };
}