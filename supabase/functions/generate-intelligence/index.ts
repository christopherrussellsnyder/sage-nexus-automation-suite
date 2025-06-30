
import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    businessType: string;
    monthlyRevenue?: string;
    monthlyAdBudget?: string;
    teamSize?: string;
    businessStage?: string;
    primaryGoal?: string;
    currentChallenges?: string;
    monthlyTraffic?: string;
    conversionRate?: string;
    marketingBudget?: string;
    clientRetentionRate?: string;
    averageProjectValue?: string;
    primaryGoals?: string[];
    revenueTarget?: string;
    successMetrics?: string;
    currentObstacles?: string;
    marketPosition?: string;
    competitiveAdvantage?: string;
    competitors?: any[];
  };
  intelligenceMode: string;
  businessType: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== INTELLIGENCE GENERATION EDGE FUNCTION CALLED ===');
    
    const requestData: IntelligenceRequest = await req.json();
    const { formData, intelligenceMode, businessType } = requestData;

    console.log('Processing intelligence request:', {
      businessName: formData.businessName,
      industry: formData.industry,
      intelligenceMode,
      businessType,
      hasTargetAudience: !!formData.targetAudience,
      hasProductService: !!formData.productService,
      hasCompetitors: formData.competitors && formData.competitors.length > 0,
      monthlyBudget: formData.monthlyAdBudget || formData.marketingBudget
    });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create comprehensive prompt for intelligence generation
    const prompt = `You are an expert business intelligence analyst. Generate a comprehensive business intelligence report for ${formData.businessName}.

BUSINESS CONTEXT:
- Business Name: ${formData.businessName}
- Industry: ${formData.industry}
- Business Type: ${businessType}
- Target Audience: ${formData.targetAudience}
- Product/Service: ${formData.productService}
- Monthly Revenue: ${formData.monthlyRevenue || 'Not specified'}
- Monthly Ad Budget: ${formData.monthlyAdBudget || formData.marketingBudget || 'Not specified'}
- Team Size: ${formData.teamSize || 'Not specified'}
- Business Stage: ${formData.businessStage || 'Not specified'}
- Primary Goal: ${formData.primaryGoal || 'Not specified'}
- Current Challenges: ${formData.currentChallenges || 'Not specified'}
- Monthly Traffic: ${formData.monthlyTraffic || 'Not specified'}
- Conversion Rate: ${formData.conversionRate || 'Not specified'}
- Revenue Target: ${formData.revenueTarget || 'Not specified'}
- Success Metrics: ${formData.successMetrics || 'Not specified'}
- Current Obstacles: ${formData.currentObstacles || 'Not specified'}
- Market Position: ${formData.marketPosition || 'Not specified'}
- Competitive Advantage: ${formData.competitiveAdvantage || 'Not specified'}

Generate a detailed JSON response with exactly these sections (ensure all arrays have multiple items):

{
  "platformRecommendations": [
    {
      "platform": "Facebook",
      "priority": 1,
      "reasoning": "Detailed explanation for Facebook recommendation",
      "expectedMetrics": {
        "roas": 4.2,
        "cpm": 12.50,
        "cpc": 1.85,
        "conversionRate": 3.8,
        "estimatedReach": 45000,
        "expectedLeads": 180
      },
      "budgetAllocation": 35,
      "targetingParameters": {
        "demographics": "Specific demographic targeting",
        "interests": ["interest1", "interest2", "interest3"],
        "behaviors": ["behavior1", "behavior2", "behavior3"],
        "customAudiences": ["audience1", "audience2", "audience3"],
        "locations": ["location1", "location2", "location3"]
      },
      "adFormats": ["format1", "format2", "format3"],
      "contentStrategy": ["strategy1", "strategy2", "strategy3"]
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "Facebook",
      "contentType": "ad",
      "hook": "Compelling hook for day 1",
      "body": "Detailed body content",
      "cta": "Strong call to action",
      "reasoning": "Strategic reasoning",
      "visualSuggestions": "Visual content suggestions",
      "expectedMetrics": {
        "reach": 15000,
        "engagement": 4.5,
        "conversions": 45
      }
    }
  ],
  "copywritingRecommendations": [
    {
      "stage": "awareness",
      "hook": "Attention-grabbing hook",
      "body": "Compelling body copy",
      "cta": "Clear call to action",
      "emotional_triggers": ["trigger1", "trigger2"],
      "personalization": "Personalization strategy",
      "urgency_elements": ["element1", "element2"],
      "social_proof": "Social proof elements",
      "pain_points": ["pain1", "pain2"],
      "benefits": ["benefit1", "benefit2"],
      "objection_handling": "How to handle objections"
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Competitor Name",
      "keyStrategy": "Their main strategy",
      "performanceMetric": "Key performance indicator",
      "applicationForUser": "How to apply this insight",
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "opportunities": ["opportunity1", "opportunity2"],
      "marketShare": "Estimated market share",
      "pricingStrategy": "Their pricing approach"
    }
  ],
  "industryInsights": [
    {
      "trend": "Industry trend name",
      "impact": "Impact on business",
      "opportunity": "Opportunity description",
      "recommendation": "Specific recommendation",
      "timeline": "Implementation timeline",
      "resources_needed": ["resource1", "resource2"],
      "success_metrics": ["metric1", "metric2"],
      "risk_factors": ["risk1", "risk2"]
    }
  ],
  "budgetStrategy": [
    {
      "category": "Paid Advertising",
      "allocation": 40,
      "reasoning": "Why this allocation",
      "expectedROI": 3.5,
      "implementation": "How to implement",
      "monitoring": "How to monitor",
      "optimization": "Optimization strategy",
      "timeline": "Implementation timeline",
      "kpis": ["kpi1", "kpi2", "kpi3"]
    }
  ],
  "metricOptimization": [
    {
      "metric": "Conversion Rate",
      "currentValue": "Current performance",
      "targetValue": "Target performance",
      "strategy": "Optimization strategy",
      "tactics": ["tactic1", "tactic2", "tactic3"],
      "timeline": "Expected timeline",
      "resources": ["resource1", "resource2"],
      "expectedImprovement": "Expected improvement percentage",
      "measurement": "How to measure success"
    }
  ]
}

CRITICAL REQUIREMENTS:
1. Generate at least 3-4 items in each array
2. Provide specific, actionable recommendations
3. Include realistic metrics and timelines
4. Ensure all JSON is valid and properly formatted
5. Generate 30 days for monthlyPlan (days 1-30)
6. Make recommendations specific to the business type and industry
7. Ensure the response is valid JSON without any markdown formatting
8. Do not include any text before or after the JSON response`;

    console.log('Sending request to OpenAI with comprehensive prompt');

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are a business intelligence expert. Always respond with valid JSON only, no markdown formatting, no explanatory text before or after the JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" }
      }),
    });

    console.log('OpenAI API response status:', openAIResponse.status);

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${openAIResponse.status}`);
    }

    const openAIData = await openAIResponse.json();
    console.log('OpenAI response received successfully');

    const aiResponseContent = openAIData.choices[0].message.content;
    console.log('AI response length:', aiResponseContent.length);

    let intelligenceData;
    try {
      // Parse the JSON response directly
      intelligenceData = JSON.parse(aiResponseContent);
      console.log('JSON parsing successful');
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Raw AI response (first 1500 chars):', aiResponseContent.substring(0, 1500));
      
      // Try to clean and parse again
      try {
        const cleanedContent = aiResponseContent
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .replace(/^\s*|\s*$/g, '')
          .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
        
        intelligenceData = JSON.parse(cleanedContent);
        console.log('JSON parsing successful after cleaning');
      } catch (secondParseError) {
        console.error('Second JSON parsing attempt failed:', secondParseError);
        throw new Error('AI generated response could not be parsed as valid JSON. The intelligence service may need adjustment. Please try again.');
      }
    }

    // Validate the structure
    const requiredSections = [
      'platformRecommendations',
      'monthlyPlan',
      'copywritingRecommendations',
      'competitorInsights',
      'industryInsights',
      'budgetStrategy',
      'metricOptimization'
    ];

    const validationResults = {};
    requiredSections.forEach(section => {
      const isValid = Array.isArray(intelligenceData[section]) && intelligenceData[section].length > 0;
      validationResults[section] = isValid;
      console.log(`${section}: ${isValid ? '✓' : '✗'} (${intelligenceData[section]?.length || 0} items)`);
    });

    const validSections = Object.values(validationResults).filter(Boolean).length;
    const completionRate = validSections / requiredSections.length;

    console.log(`Data quality: ${Math.round(completionRate * 100)}% complete (${validSections}/${requiredSections.length} sections)`);

    const response = {
      insights: intelligenceData,
      generatedAt: new Date().toISOString(),
      intelligenceMode,
      businessType,
      businessName: formData.businessName,
      isAIGenerated: completionRate >= 0.5,
      dataQuality: {
        completeness: completionRate,
        aiContentRatio: completionRate >= 0.7 ? 1 : completionRate * 1.5,
        sectionsGenerated: validSections,
        totalSections: requiredSections.length,
        validationDetails: validationResults
      }
    };

    console.log('Intelligence generation completed successfully');

    return new Response(JSON.stringify(response), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('=== EDGE FUNCTION ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);

    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Intelligence generation encountered an error. Please verify your configuration and try again.',
        timestamp: new Date().toISOString(),
        errorType: error.constructor.name
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
