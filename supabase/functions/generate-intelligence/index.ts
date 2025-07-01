
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
    console.log('=== INTELLIGENCE GENERATION EDGE FUNCTION STARTED ===');
    
    const requestData: IntelligenceRequest = await req.json();
    const { formData, intelligenceMode, businessType } = requestData;

    console.log('Processing intelligence request:', {
      businessName: formData.businessName,
      industry: formData.industry,
      intelligenceMode,
      businessType
    });

    // Validate required fields
    if (!formData.businessName?.trim()) {
      throw new Error('Business name is required');
    }
    if (!formData.industry?.trim()) {
      throw new Error('Industry is required');
    }
    if (!formData.targetAudience?.trim()) {
      throw new Error('Target audience is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment');
      throw new Error('OpenAI API key not configured');
    }

    console.log('OpenAI API key found, proceeding with request');

    // Create comprehensive prompt for intelligence generation
    const prompt = `You are an expert business intelligence analyst. Generate a comprehensive business intelligence report for ${formData.businessName}.

BUSINESS CONTEXT:
- Business Name: ${formData.businessName}
- Industry: ${formData.industry}
- Business Type: ${businessType}
- Target Audience: ${formData.targetAudience}
- Product/Service: ${formData.productService || 'Not specified'}
- Monthly Revenue: ${formData.monthlyRevenue || 'Not specified'}
- Monthly Ad Budget: ${formData.monthlyAdBudget || formData.marketingBudget || 'Not specified'}

Generate a detailed JSON response with exactly these sections:

{
  "platformRecommendations": [
    {
      "platform": "Facebook",
      "priority": 1,
      "reasoning": "Detailed explanation why Facebook is recommended",
      "expectedMetrics": {
        "roas": 4.2,
        "cpm": 12.50,
        "cpc": 1.85,
        "conversionRate": 3.8
      },
      "budgetAllocation": 35,
      "targetingParameters": {
        "demographics": "Age 25-45, college-educated professionals",
        "interests": ["business", "productivity", "technology"],
        "behaviors": ["online shoppers", "business decision makers"]
      }
    },
    {
      "platform": "Google Ads",
      "priority": 2,
      "reasoning": "High intent traffic from search queries",
      "expectedMetrics": {
        "roas": 5.1,
        "cpm": 18.75,
        "cpc": 2.25,
        "conversionRate": 4.2
      },
      "budgetAllocation": 30,
      "targetingParameters": {
        "keywords": ["business software", "productivity tools"],
        "demographics": "Business professionals",
        "locations": ["United States", "Canada"]
      }
    },
    {
      "platform": "LinkedIn",
      "priority": 3,
      "reasoning": "B2B focused audience for professional services",
      "expectedMetrics": {
        "roas": 3.8,
        "cpm": 25.00,
        "cpc": 3.50,
        "conversionRate": 2.5
      },
      "budgetAllocation": 25,
      "targetingParameters": {
        "jobTitles": ["CEO", "Marketing Manager", "Business Owner"],
        "industries": ["Technology", "Consulting", "Finance"],
        "companySize": ["11-50", "51-200", "201-500"]
      }
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "Facebook",
      "contentType": "ad",
      "hook": "Stop wasting time on manual tasks",
      "body": "Our ${formData.productService || 'solution'} helps ${formData.targetAudience} save 10+ hours per week",
      "cta": "Start Your Free Trial",
      "reasoning": "Focus on pain point and time savings",
      "visualSuggestions": "Professional person looking frustrated at computer"
    },
    {
      "day": 2,
      "platform": "Google Ads",
      "contentType": "search_ad",
      "hook": "Best ${formData.industry} Solution",
      "body": "Trusted by 1000+ businesses. Get results in 30 days or money back.",
      "cta": "Get Started Today",
      "reasoning": "Build trust with social proof",
      "visualSuggestions": "Clean, professional landing page"
    },
    {
      "day": 3,
      "platform": "LinkedIn",
      "contentType": "sponsored_content",
      "hook": "How ${formData.businessName} Transforms ${formData.industry}",
      "body": "Case study: See how we helped Company X achieve 300% ROI",
      "cta": "Read Full Case Study",
      "reasoning": "B2B audience loves case studies",
      "visualSuggestions": "Professional case study graphic"
    }
  ],
  "copywritingRecommendations": [
    {
      "stage": "awareness",
      "hook": "Are you tired of [pain point]?",
      "body": "Most ${formData.targetAudience} struggle with this exact problem. Here's why...",
      "cta": "Learn More",
      "emotional_triggers": ["frustration", "curiosity"],
      "personalization": "Speak directly to target audience pain points"
    },
    {
      "stage": "consideration",
      "hook": "Why ${formData.businessName} is different",
      "body": "Unlike other solutions, we focus on [unique value proposition]",
      "cta": "See How It Works",
      "emotional_triggers": ["hope", "excitement"],
      "personalization": "Address specific industry challenges"
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Main Competitor A",
      "keyStrategy": "Heavy focus on social media advertising",
      "performanceMetric": "High engagement but low conversion",
      "applicationForUser": "Focus on conversion optimization rather than just engagement"
    },
    {
      "competitor": "Main Competitor B",
      "keyStrategy": "Premium pricing strategy",
      "performanceMetric": "High profit margins but limited market reach",
      "applicationForUser": "Consider value-based pricing to capture market share"
    }
  ],
  "industryInsights": [
    {
      "trend": "Digital transformation acceleration",
      "impact": "Increased demand for ${formData.productService || 'digital solutions'}",
      "opportunity": "Position as essential business tool",
      "recommendation": "Emphasize digital-first approach in messaging"
    },
    {
      "trend": "Remote work normalization",
      "impact": "Changed how businesses operate",
      "opportunity": "Appeal to distributed teams",
      "recommendation": "Highlight collaboration and remote-friendly features"
    }
  ],
  "budgetStrategy": [
    {
      "category": "Paid Advertising",
      "allocation": 40,
      "reasoning": "Primary growth driver",
      "expectedROI": 3.5,
      "implementation": "Start with Facebook and Google Ads"
    },
    {
      "category": "Content Marketing",
      "allocation": 25,
      "reasoning": "Long-term SEO and authority building",
      "expectedROI": 2.8,
      "implementation": "Blog posts, case studies, whitepapers"
    },
    {
      "category": "Email Marketing",
      "allocation": 15,
      "reasoning": "High ROI for nurturing leads",
      "expectedROI": 6.2,
      "implementation": "Automated sequences and newsletters"
    }
  ],
  "metricOptimization": [
    {
      "metric": "Conversion Rate",
      "currentValue": "2.5%",
      "targetValue": "4.0%",
      "strategy": "A/B test landing pages and improve call-to-action placement",
      "timeline": "3 months"
    },
    {
      "metric": "Customer Acquisition Cost",
      "currentValue": "$150",
      "targetValue": "$100",
      "strategy": "Optimize ad targeting and improve organic reach",
      "timeline": "6 months"
    }
  ]
}

CRITICAL REQUIREMENTS:
1. Generate at least 3 items in each array section
2. Provide specific, actionable recommendations
3. Include realistic metrics and timelines
4. Ensure all JSON is valid and properly formatted
5. Make recommendations specific to the business type and industry
6. Ensure the response is valid JSON without any markdown formatting
7. Do not include any text before or after the JSON response
8. All monthlyPlan should have at least 30 days (extend the pattern)`;

    console.log('Sending request to OpenAI API');

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
            content: 'You are a business intelligence expert. Always respond with valid JSON only, no markdown formatting, no explanatory text before or after the JSON. Generate comprehensive business intelligence data.'
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
      
      if (openAIResponse.status === 401) {
        throw new Error('Invalid OpenAI API key');
      } else if (openAIResponse.status === 429) {
        throw new Error('OpenAI API rate limit exceeded');
      } else if (openAIResponse.status === 500) {
        throw new Error('OpenAI service error');
      }
      
      throw new Error(`OpenAI API error: ${openAIResponse.status}`);
    }

    const openAIData = await openAIResponse.json();
    console.log('OpenAI response received successfully');

    const aiResponseContent = openAIData.choices[0].message.content;
    console.log('AI response length:', aiResponseContent.length);

    let intelligenceData;
    try {
      intelligenceData = JSON.parse(aiResponseContent);
      console.log('JSON parsing successful');
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Raw AI response (first 500 chars):', aiResponseContent.substring(0, 500));
      
      // Try to clean and parse again
      try {
        const cleanedContent = aiResponseContent
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .replace(/^\s*|\s*$/g, '')
          .replace(/,(\s*[}\]])/g, '$1');
        
        intelligenceData = JSON.parse(cleanedContent);
        console.log('JSON parsing successful after cleaning');
      } catch (secondParseError) {
        console.error('Second JSON parsing attempt failed:', secondParseError);
        throw new Error('Failed to parse AI response as valid JSON');
      }
    }

    // Extend monthlyPlan to 30 days if needed
    if (intelligenceData.monthlyPlan && intelligenceData.monthlyPlan.length < 30) {
      const baseEntries = [...intelligenceData.monthlyPlan];
      while (intelligenceData.monthlyPlan.length < 30) {
        const dayNumber = intelligenceData.monthlyPlan.length + 1;
        const baseEntry = baseEntries[dayNumber % baseEntries.length];
        intelligenceData.monthlyPlan.push({
          ...baseEntry,
          day: dayNumber,
          hook: `${baseEntry.hook} - Day ${dayNumber}`,
          reasoning: `${baseEntry.reasoning} - Strategic continuation for day ${dayNumber}`
        });
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

    // Enhanced error response with specific error types
    let statusCode = 500;
    let errorMessage = error.message;
    
    if (error.message.includes('OpenAI API key')) {
      statusCode = 401;
      errorMessage = 'OpenAI API key not configured or invalid';
    } else if (error.message.includes('rate limit')) {
      statusCode = 429;
      errorMessage = 'API rate limit exceeded. Please try again in a few minutes.';
    } else if (error.message.includes('required')) {
      statusCode = 400;
      errorMessage = error.message;
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: 'Intelligence generation service error',
        timestamp: new Date().toISOString(),
        errorType: error.constructor.name
      }),
      {
        status: statusCode,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
