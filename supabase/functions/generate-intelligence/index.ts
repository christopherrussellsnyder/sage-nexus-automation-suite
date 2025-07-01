
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

    // Use the updated OpenAI API key directly
    const openAIApiKey = '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';
    
    console.log('OpenAI API key configured successfully');
    console.log('API key starts with:', openAIApiKey.substring(0, 20) + '...');

    // Create comprehensive prompt for complete intelligence generation
    const prompt = `You are an expert business intelligence analyst specializing in ${businessType} businesses. Generate a comprehensive business intelligence report for ${formData.businessName}.

BUSINESS CONTEXT:
Business Name: ${formData.businessName}
Industry: ${formData.industry}
Business Type: ${businessType}
Target Audience: ${formData.targetAudience}
Product/Service: ${formData.productService || 'Not specified'}
Monthly Revenue: ${formData.monthlyRevenue || 'Not specified'}
Monthly Ad Budget: ${formData.monthlyAdBudget || formData.marketingBudget || 'Not specified'}
Team Size: ${formData.teamSize || 'Not specified'}
Business Stage: ${formData.businessStage || 'Not specified'}
Primary Goal: ${formData.primaryGoal || 'Not specified'}
Current Challenges: ${formData.currentChallenges || 'Not specified'}
Monthly Traffic: ${formData.monthlyTraffic || 'Not specified'}
Conversion Rate: ${formData.conversionRate || 'Not specified'}
Marketing Budget: ${formData.marketingBudget || 'Not specified'}
Client Retention Rate: ${formData.clientRetentionRate || 'Not specified'}
Average Project Value: ${formData.averageProjectValue || 'Not specified'}
Revenue Target: ${formData.revenueTarget || 'Not specified'}
Success Metrics: ${formData.successMetrics || 'Not specified'}
Current Obstacles: ${formData.currentObstacles || 'Not specified'}
Market Position: ${formData.marketPosition || 'Not specified'}
Competitive Advantage: ${formData.competitiveAdvantage || 'Not specified'}

CRITICAL: Generate a comprehensive JSON response with exactly these sections. Each section MUST be fully populated with detailed, actionable insights specific to ${formData.businessName}:

{
  "platformRecommendations": [
    {
      "platform": "Facebook",
      "priority": 1,
      "reasoning": "Detailed explanation why Facebook is recommended for ${formData.businessName} in the ${formData.industry} industry targeting ${formData.targetAudience}",
      "expectedMetrics": {
        "roas": 4.2,
        "cpm": 12.50,
        "cpc": 1.85,
        "conversionRate": 3.8
      },
      "budgetAllocation": 35,
      "targetingParameters": {
        "demographics": "Specific demographics for ${formData.targetAudience}",
        "interests": ["relevant interest 1", "relevant interest 2", "relevant interest 3"],
        "behaviors": ["relevant behavior 1", "relevant behavior 2"]
      }
    },
    {
      "platform": "Google Ads",
      "priority": 2,
      "reasoning": "Search intent targeting for ${formData.productService} in ${formData.industry}",
      "expectedMetrics": {
        "roas": 5.1,
        "cpm": 18.75,
        "cpc": 2.25,
        "conversionRate": 4.2
      },
      "budgetAllocation": 30,
      "targetingParameters": {
        "keywords": ["${formData.industry} specific keywords", "product related keywords"],
        "demographics": "Business decision makers interested in ${formData.productService}",
        "locations": ["primary market locations"]
      }
    },
    {
      "platform": "LinkedIn",
      "priority": 3,
      "reasoning": "Professional network targeting for ${businessType} reaching ${formData.targetAudience}",
      "expectedMetrics": {
        "roas": 3.8,
        "cpm": 25.00,
        "cpc": 3.50,
        "conversionRate": 2.5
      },
      "budgetAllocation": 25,
      "targetingParameters": {
        "jobTitles": ["decision maker titles for ${formData.targetAudience}"],
        "industries": ["${formData.industry}", "related industries"],
        "companySize": ["appropriate company sizes for ${businessType}"]
      }
    }
  ],
  "monthlyPlan": [
    ${Array.from({length: 30}, (_, i) => `{
      "day": ${i + 1},
      "platform": "${['Facebook', 'Google Ads', 'LinkedIn', 'Instagram', 'Twitter'][i % 5]}",
      "contentType": "${['ad_campaign', 'social_post', 'blog_content', 'video_content', 'email_campaign'][i % 5]}",
      "hook": "Day ${i + 1}: Compelling hook for ${formData.businessName} targeting ${formData.targetAudience}",
      "body": "Detailed content strategy for ${formData.productService} addressing ${formData.currentChallenges || 'key challenges'}",
      "cta": "Strong call-to-action driving ${formData.primaryGoal || 'business goals'}",
      "reasoning": "Strategic reasoning for day ${i + 1} content in ${formData.industry} market",
      "visualSuggestions": "Visual recommendations for ${formData.targetAudience} engagement"
    }`).join(',\n    ')}
  ],
  "copywritingRecommendations": [
    {
      "stage": "awareness",
      "hook": "Problem-focused hook addressing ${formData.currentChallenges || 'industry challenges'} for ${formData.targetAudience}",
      "body": "Educational content about ${formData.industry} challenges and how ${formData.businessName} provides solutions",
      "cta": "Learn More About Our ${formData.productService}",
      "emotional_triggers": ["curiosity", "concern", "hope"],
      "personalization": "Specific messaging for ${formData.targetAudience} in ${formData.industry}"
    },
    {
      "stage": "consideration",
      "hook": "Solution-focused hook highlighting ${formData.competitiveAdvantage || 'unique benefits'} of ${formData.businessName}",
      "body": "Detailed explanation of ${formData.productService} benefits and ROI for ${formData.targetAudience}",
      "cta": "See How We Help ${formData.targetAudience}",
      "emotional_triggers": ["trust", "excitement", "confidence"],
      "personalization": "Industry-specific value propositions for ${formData.industry}"
    },
    {
      "stage": "decision",
      "hook": "Urgency-driven hook with compelling offer for ${formData.businessName}",
      "body": "Clear value proposition and reason to choose ${formData.businessName} over competitors",
      "cta": "Start Your ${formData.productService} Journey Today",
      "emotional_triggers": ["urgency", "fear_of_missing_out", "excitement"],
      "personalization": "Direct messaging to ${formData.targetAudience} decision-makers"
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Leading ${formData.industry} Competitor A",
      "keyStrategy": "Analysis of primary marketing approach targeting ${formData.targetAudience}",
      "performanceMetric": "Market share and engagement analysis in ${formData.industry}",
      "applicationForUser": "How ${formData.businessName} can differentiate using ${formData.competitiveAdvantage || 'unique strengths'}"
    },
    {
      "competitor": "Major ${formData.industry} Competitor B",
      "keyStrategy": "Their positioning strategy and pricing model for ${formData.productService} alternatives",
      "performanceMetric": "Revenue growth and customer acquisition metrics",
      "applicationForUser": "Specific tactics ${formData.businessName} should adopt or avoid"
    },
    {
      "competitor": "Emerging ${formData.industry} Player",
      "keyStrategy": "Innovative approach or technology disrupting ${formData.industry}",
      "performanceMetric": "Growth rate and market penetration speed",
      "applicationForUser": "Strategic opportunities for ${formData.businessName} to stay competitive"
    }
  ],
  "industryInsights": [
    {
      "trend": "Digital transformation trend affecting ${formData.industry} and ${formData.targetAudience}",
      "impact": "How this trend changes ${formData.targetAudience} buying behavior and ${formData.productService} demand",
      "opportunity": "Specific opportunity for ${formData.businessName} to capitalize on this trend",
      "recommendation": "Actionable implementation steps for ${formData.businessName}"
    },
    {
      "trend": "Market consolidation patterns in ${formData.industry}",
      "impact": "Competitive landscape changes affecting ${formData.targetAudience} choices",
      "opportunity": "Market positioning opportunity for ${formData.businessName}",
      "recommendation": "Strategic positioning recommendation for competitive advantage"
    },
    {
      "trend": "Technology adoption in ${formData.industry} affecting ${formData.productService}",
      "impact": "Changing customer expectations and service delivery methods",
      "opportunity": "Innovation opportunity for ${formData.businessName}",
      "recommendation": "Technology integration strategy for ${formData.businessName}"
    }
  ],
  "budgetStrategy": [
    {
      "category": "Paid Advertising",
      "allocation": 40,
      "reasoning": "Primary growth driver for ${businessType} targeting ${formData.targetAudience}",
      "expectedROI": 3.5,
      "implementation": "Focus on Facebook and Google Ads optimized for ${formData.primaryGoal || 'revenue growth'}"
    },
    {
      "category": "Content Marketing",
      "allocation": 25,
      "reasoning": "Long-term authority building in ${formData.industry} for ${formData.targetAudience}",
      "expectedROI": 2.8,
      "implementation": "Create ${formData.industry}-specific content addressing ${formData.currentChallenges || 'market challenges'}"
    },
    {
      "category": "Email Marketing",
      "allocation": 15,
      "reasoning": "High ROI channel for nurturing ${formData.targetAudience} leads",
      "expectedROI": 6.2,
      "implementation": "Automated sequences for ${businessType} customer journey"
    },
    {
      "category": "Social Media Marketing",
      "allocation": 10,
      "reasoning": "Brand building and community engagement with ${formData.targetAudience}",
      "expectedROI": 2.0,
      "implementation": "Platform-specific content strategy for ${formData.targetAudience}"
    },
    {
      "category": "SEO & Website Optimization",
      "allocation": 10,
      "reasoning": "Long-term organic growth for ${formData.productService} searches",
      "expectedROI": 4.0,
      "implementation": "Optimize for ${formData.industry} keywords and user experience"
    }
  ],
  "metricOptimization": [
    {
      "metric": "Conversion Rate",
      "currentValue": "${formData.conversionRate || '2.5'}%",
      "targetValue": "4.0%",
      "strategy": "A/B test landing pages for ${formData.targetAudience} and optimize ${formData.productService} presentation",
      "timeline": "3 months",
      "implementation": "Start with homepage and key landing page optimization"
    },
    {
      "metric": "Customer Acquisition Cost",
      "currentValue": "$${formData.averageProjectValue ? (parseInt(formData.averageProjectValue) * 0.15).toString() : '150'}",
      "targetValue": "$100",
      "strategy": "Optimize targeting for ${formData.targetAudience} and improve organic reach in ${formData.industry}",
      "timeline": "6 months",
      "implementation": "Focus on high-intent keywords and audience refinement"
    },
    {
      "metric": "Monthly Revenue",
      "currentValue": "${formData.monthlyRevenue || 'Current baseline'}",
      "targetValue": "${formData.revenueTarget || 'Target growth'}",
      "strategy": "Scale ${formData.productService} sales through optimized funnel and ${formData.competitiveAdvantage || 'unique positioning'}",
      "timeline": "12 months",
      "implementation": "Multi-channel approach focusing on ${formData.primaryGoal || 'revenue optimization'}"
    }
  ]
}

CRITICAL REQUIREMENTS:
- Generate comprehensive, detailed content for ALL sections
- Make each recommendation specific to ${formData.businessName}, ${formData.industry}, and ${formData.targetAudience}
- Ensure monthlyPlan has exactly 30 detailed, unique entries
- Include realistic metrics and actionable strategies
- Reference specific business context throughout
- Ensure all JSON is valid and properly formatted
- Make recommendations data-driven and industry-specific
- Do not include any text before or after the JSON response
- Populate every field with meaningful, relevant content`;

    console.log('Sending request to OpenAI API...');

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
            content: 'You are a business intelligence expert. Always respond with valid JSON only, no markdown formatting, no explanatory text before or after the JSON. Generate comprehensive, detailed business intelligence data with every field fully populated.'
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
    console.log('OpenAI API response headers:', Object.fromEntries(openAIResponse.headers.entries()));

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error response:', errorText);
      
      if (openAIResponse.status === 401) {
        console.error('Authentication failed - API key issue');
        throw new Error('OpenAI API authentication failed - please verify your API key is valid and has sufficient credits');
      } else if (openAIResponse.status === 429) {
        throw new Error('OpenAI API rate limit exceeded - please try again in a few minutes');
      } else if (openAIResponse.status === 500) {
        throw new Error('OpenAI service error - please try again');
      }
      
      throw new Error(`OpenAI API error: ${openAIResponse.status} - ${errorText}`);
    }

    const openAIData = await openAIResponse.json();
    console.log('OpenAI response received successfully');
    console.log('Response data structure:', Object.keys(openAIData));

    const aiResponseContent = openAIData.choices[0].message.content;
    console.log('AI response content length:', aiResponseContent.length);
    console.log('AI response preview:', aiResponseContent.substring(0, 200));

    let intelligenceData;
    try {
      intelligenceData = JSON.parse(aiResponseContent);
      console.log('JSON parsing successful');
      console.log('Parsed data keys:', Object.keys(intelligenceData));
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Raw AI response (first 1000 chars):', aiResponseContent.substring(0, 1000));
      
      // Enhanced JSON cleaning and parsing
      try {
        const cleanedContent = aiResponseContent
          .replace(/```json\s*/g, '')
          .replace(/```\s*/g, '')
          .replace(/^\s+|\s+$/g, '')
          .replace(/,(\s*[}\]])/g, '$1')
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
        
        intelligenceData = JSON.parse(cleanedContent);
        console.log('JSON parsing successful after cleaning');
      } catch (secondParseError) {
        console.error('Second JSON parsing attempt failed:', secondParseError);
        throw new Error('Failed to parse AI response - invalid JSON format received from OpenAI');
      }
    }

    // Validate the structure and ensure completeness
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
      console.log(`Validation - ${section}: ${isValid ? '✓' : '✗'} (${intelligenceData[section]?.length || 0} items)`);
    });

    const validSections = Object.values(validationResults).filter(Boolean).length;
    const completionRate = validSections / requiredSections.length;

    console.log(`Intelligence generation quality: ${Math.round(completionRate * 100)}% complete (${validSections}/${requiredSections.length} sections)`);

    if (completionRate < 0.5) {
      console.warn('Low completion rate detected:', completionRate);
      throw new Error('Incomplete intelligence data generated - please try again for better results');
    }

    const response = {
      insights: intelligenceData,
      generatedAt: new Date().toISOString(),
      intelligenceMode,
      businessType,
      businessName: formData.businessName,
      isAIGenerated: true,
      dataQuality: {
        completeness: completionRate,
        aiContentRatio: 1.0,
        sectionsGenerated: validSections,
        totalSections: requiredSections.length,
        validationDetails: validationResults
      }
    };

    console.log('Intelligence generation completed successfully');
    console.log('Final response structure:', Object.keys(response));

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

    let statusCode = 500;
    let errorMessage = error.message;
    
    if (error.message.includes('OpenAI API authentication failed')) {
      statusCode = 401;
      errorMessage = 'OpenAI API authentication failed - please verify your API key is valid and has sufficient credits';
    } else if (error.message.includes('rate limit')) {
      statusCode = 429;
      errorMessage = 'API rate limit exceeded. Please try again in a few minutes.';
    } else if (error.message.includes('required')) {
      statusCode = 400;
      errorMessage = error.message;
    } else if (error.message.includes('JSON') || error.message.includes('parse')) {
      statusCode = 422;
      errorMessage = 'Data processing error: Invalid response format from AI service';
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
