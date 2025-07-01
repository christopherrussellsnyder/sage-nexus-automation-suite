
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

    // Use the specific API key provided
    const openAIApiKey = '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';
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    console.log('OpenAI API key configured, proceeding with request');

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
- Team Size: ${formData.teamSize || 'Not specified'}
- Business Stage: ${formData.businessStage || 'Not specified'}
- Primary Goal: ${formData.primaryGoal || 'Not specified'}
- Current Challenges: ${formData.currentChallenges || 'Not specified'}
- Monthly Traffic: ${formData.monthlyTraffic || 'Not specified'}
- Conversion Rate: ${formData.conversionRate || 'Not specified'}
- Marketing Budget: ${formData.marketingBudget || 'Not specified'}
- Client Retention Rate: ${formData.clientRetentionRate || 'Not specified'}
- Average Project Value: ${formData.averageProjectValue || 'Not specified'}
- Revenue Target: ${formData.revenueTarget || 'Not specified'}
- Success Metrics: ${formData.successMetrics || 'Not specified'}
- Current Obstacles: ${formData.currentObstacles || 'Not specified'}
- Market Position: ${formData.marketPosition || 'Not specified'}
- Competitive Advantage: ${formData.competitiveAdvantage || 'Not specified'}

Generate a detailed JSON response with exactly these sections. Each section must be fully populated with comprehensive, actionable insights:

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
      "reasoning": "High intent traffic from search queries relevant to ${formData.productService}",
      "expectedMetrics": {
        "roas": 5.1,
        "cpm": 18.75,
        "cpc": 2.25,
        "conversionRate": 4.2
      },
      "budgetAllocation": 30,
      "targetingParameters": {
        "keywords": ["${formData.industry} keywords", "product specific keywords"],
        "demographics": "Business professionals interested in ${formData.productService}",
        "locations": ["primary market locations"]
      }
    },
    {
      "platform": "LinkedIn",
      "priority": 3,
      "reasoning": "Professional network perfect for ${businessType} targeting ${formData.targetAudience}",
      "expectedMetrics": {
        "roas": 3.8,
        "cpm": 25.00,
        "cpc": 3.50,
        "conversionRate": 2.5
      },
      "budgetAllocation": 25,
      "targetingParameters": {
        "jobTitles": ["relevant job titles for ${formData.targetAudience}"],
        "industries": ["${formData.industry}", "related industries"],
        "companySize": ["appropriate company sizes"]
      }
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "Facebook",
      "contentType": "ad",
      "hook": "Compelling hook addressing ${formData.currentChallenges || 'key pain points'}",
      "body": "Detailed body copy explaining how ${formData.businessName} solves problems for ${formData.targetAudience}",
      "cta": "Strong call-to-action",
      "reasoning": "Strategic reasoning for this approach on day 1",
      "visualSuggestions": "Specific visual recommendations"
    },
    {
      "day": 2,
      "platform": "Google Ads",
      "contentType": "search_ad",
      "hook": "Search-optimized headline for ${formData.productService}",
      "body": "Compelling description highlighting unique value proposition",
      "cta": "Action-oriented CTA",
      "reasoning": "Why this search strategy works for day 2",
      "visualSuggestions": "Landing page optimization suggestions"
    }
  ],
  "copywritingRecommendations": [
    {
      "stage": "awareness",
      "hook": "Problem-focused hook for ${formData.targetAudience}",
      "body": "Educational content addressing ${formData.currentChallenges || 'industry challenges'}",
      "cta": "Soft CTA for engagement",
      "emotional_triggers": ["specific emotions for ${formData.targetAudience}"],
      "personalization": "Specific personalization for ${formData.industry}"
    },
    {
      "stage": "consideration",
      "hook": "Solution-focused hook highlighting ${formData.competitiveAdvantage || 'unique benefits'}",
      "body": "Detailed explanation of ${formData.productService} benefits",
      "cta": "Consideration-stage CTA",
      "emotional_triggers": ["trust", "excitement", "confidence"],
      "personalization": "Industry-specific messaging for ${formData.industry}"
    },
    {
      "stage": "decision",
      "hook": "Urgency-driven hook with specific offer",
      "body": "Compelling reason to choose ${formData.businessName} now",
      "cta": "Strong conversion CTA",
      "emotional_triggers": ["urgency", "fear of missing out"],
      "personalization": "Direct address to ${formData.targetAudience} decision-makers"
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Main Industry Competitor A",
      "keyStrategy": "Detailed analysis of their primary marketing approach",
      "performanceMetric": "Observed performance indicators",
      "applicationForUser": "How ${formData.businessName} can differentiate using ${formData.competitiveAdvantage || 'unique strengths'}"
    },
    {
      "competitor": "Main Industry Competitor B",
      "keyStrategy": "Analysis of their positioning strategy",
      "performanceMetric": "Market share and engagement metrics",
      "applicationForUser": "Specific tactics ${formData.businessName} should adopt or avoid"
    },
    {
      "competitor": "Emerging Competitor",
      "keyStrategy": "Their innovative approach or technology",
      "performanceMetric": "Growth rate and market penetration",
      "applicationForUser": "Opportunities for ${formData.businessName} to stay ahead"
    }
  ],
  "industryInsights": [
    {
      "trend": "Major ${formData.industry} industry trend",
      "impact": "How this affects ${formData.targetAudience} buying behavior",
      "opportunity": "Specific opportunity for ${formData.businessName}",
      "recommendation": "Actionable steps to capitalize on this trend"
    },
    {
      "trend": "Technology adoption in ${formData.industry}",
      "impact": "Changes in customer expectations",
      "opportunity": "How ${formData.productService} can address new needs",
      "recommendation": "Implementation strategy for ${formData.businessName}"
    },
    {
      "trend": "Market consolidation or fragmentation",
      "impact": "Competitive landscape changes",
      "opportunity": "Market positioning opportunity",
      "recommendation": "Strategic positioning for ${formData.businessName}"
    }
  ],
  "budgetStrategy": [
    {
      "category": "Paid Advertising",
      "allocation": 40,
      "reasoning": "Primary growth driver for ${businessType} targeting ${formData.targetAudience}",
      "expectedROI": 3.5,
      "implementation": "Start with Facebook and Google Ads focusing on ${formData.primaryGoal || 'growth'}"
    },
    {
      "category": "Content Marketing",
      "allocation": 25,
      "reasoning": "Long-term SEO and authority building in ${formData.industry}",
      "expectedROI": 2.8,
      "implementation": "Create ${formData.industry}-specific content addressing ${formData.currentChallenges || 'common challenges'}"
    },
    {
      "category": "Email Marketing",
      "allocation": 15,
      "reasoning": "High ROI for nurturing ${formData.targetAudience}",
      "expectedROI": 6.2,
      "implementation": "Automated sequences for ${formData.businessType} funnel"
    },
    {
      "category": "Social Media Marketing",
      "allocation": 10,
      "reasoning": "Brand building and community engagement",
      "expectedROI": 2.0,
      "implementation": "Platform-specific content for ${formData.targetAudience}"
    },
    {
      "category": "SEO & Website Optimization",
      "allocation": 10,
      "reasoning": "Long-term organic growth for ${formData.productService}",
      "expectedROI": 4.0,
      "implementation": "Optimize for ${formData.industry} keywords and user experience"
    }
  ],
  "metricOptimization": [
    {
      "metric": "Conversion Rate",
      "currentValue": "${formData.conversionRate || '2.5'}%",
      "targetValue": "4.0%",
      "strategy": "A/B test landing pages specifically for ${formData.targetAudience} and optimize ${formData.productService} presentation",
      "timeline": "3 months",
      "implementation": "Start with homepage and primary landing page optimization"
    },
    {
      "metric": "Customer Acquisition Cost",
      "currentValue": "$${formData.averageProjectValue ? (parseInt(formData.averageProjectValue) * 0.15).toString() : '150'}",
      "targetValue": "$100",
      "strategy": "Optimize ad targeting for ${formData.targetAudience} and improve organic reach through ${formData.industry} content",
      "timeline": "6 months",
      "implementation": "Focus on high-intent keywords and audience refinement"
    },
    {
      "metric": "Monthly Revenue",
      "currentValue": "${formData.monthlyRevenue || 'Current level'}",
      "targetValue": "${formData.revenueTarget || 'Target level'}",
      "strategy": "Increase ${formData.productService} sales through optimized funnel and ${formData.competitiveAdvantage || 'unique positioning'}",
      "timeline": "12 months",
      "implementation": "Multi-channel approach with focus on ${formData.primaryGoal || 'revenue growth'}"
    }
  ]
}

CRITICAL REQUIREMENTS:
1. Generate comprehensive, detailed content for ALL sections
2. Make each recommendation specific to ${formData.businessName}, ${formData.industry}, and ${formData.targetAudience}
3. Ensure monthlyPlan has at least 30 detailed entries
4. Include realistic metrics and actionable strategies
5. Reference the specific business context throughout
6. Ensure all JSON is valid and properly formatted
7. Make recommendations data-driven and industry-specific
8. Do not include any text before or after the JSON response
9. Ensure every field is populated with meaningful, relevant content`;

    console.log('Sending request to OpenAI API with comprehensive prompt');

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

    // Extend monthlyPlan to 30 days
    if (intelligenceData.monthlyPlan && intelligenceData.monthlyPlan.length < 30) {
      const baseEntries = [...intelligenceData.monthlyPlan];
      const platforms = ['Facebook', 'Google Ads', 'LinkedIn', 'Instagram', 'Twitter'];
      const contentTypes = ['ad', 'social_post', 'blog_post', 'video', 'infographic'];
      
      while (intelligenceData.monthlyPlan.length < 30) {
        const dayNumber = intelligenceData.monthlyPlan.length + 1;
        const platform = platforms[dayNumber % platforms.length];
        const contentType = contentTypes[dayNumber % contentTypes.length];
        
        intelligenceData.monthlyPlan.push({
          day: dayNumber,
          platform: platform,
          contentType: contentType,
          hook: `Day ${dayNumber}: Strategic ${contentType} for ${formData.businessName}`,
          body: `Targeted content for ${formData.targetAudience} addressing ${formData.currentChallenges || 'key challenges'} with ${formData.productService}`,
          cta: `Engage with ${formData.businessName}`,
          reasoning: `Strategic ${contentType} on ${platform} to maintain engagement and drive ${formData.primaryGoal || 'business growth'}`,
          visualSuggestions: `${platform}-optimized visuals for ${formData.industry} audience`
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
