
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
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
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

    // Enhanced prompt for comprehensive intelligence generation
    const intelligencePrompt = `
You are an elite business intelligence strategist with deep expertise in ${formData.industry} and ${businessType} businesses. Generate a comprehensive, actionable intelligence report.

BUSINESS CONTEXT:
- Company: ${formData.businessName}
- Industry: ${formData.industry}
- Business Model: ${businessType}
- Target Market: ${formData.targetAudience}
- Product/Service: ${formData.productService}
- Unique Value: ${formData.uniqueValue}
- Monthly Revenue: ${formData.monthlyRevenue}
- Ad Budget: ${formData.monthlyAdBudget || '$5,000'}
- Challenges: ${formData.currentChallenges || 'Growth and lead generation'}
- Goals: ${formData.primaryGoals?.join(', ') || formData.goals?.join(', ') || 'Increase revenue and market share'}

CRITICAL REQUIREMENTS - Generate ALL sections with rich, specific data:

1. PLATFORM RECOMMENDATIONS (minimum 4 platforms):
   - Include Facebook, Instagram, LinkedIn, Google Ads, TikTok, YouTube
   - Provide specific ROAS, CPM, CPC, conversion rates based on industry benchmarks
   - Detailed targeting parameters and audience segments
   - Budget allocation percentages that total 100%

2. COMPLETE 30-DAY CONTENT CALENDAR:
   - All 30 days with specific content for each day
   - Mix of ad copy and organic content
   - Industry-specific hooks, pain points, solutions
   - Platform-specific optimization
   - Realistic engagement and cost projections

3. COPYWRITING RECOMMENDATIONS:
   - 5+ awareness stage variations for different customer journey stages
   - Industry-specific emotional triggers
   - Psychological persuasion techniques
   - A/B testing frameworks

4. COMPETITOR INSIGHTS:
   - 3+ competitor analysis with specific strategies
   - Market gaps and opportunities
   - Competitive advantages to leverage

5. INDUSTRY INSIGHTS:
   - Current market trends in ${formData.industry}
   - Economic factors affecting the industry
   - Growth opportunities and threats

6. BUDGET STRATEGY:
   - Detailed monthly budget breakdown
   - ROI projections by channel
   - Cost optimization strategies

7. METRIC OPTIMIZATION:
   - Current vs target benchmarks
   - Specific improvement strategies
   - Implementation timelines

Respond with ONLY valid JSON in this exact structure (no markdown, no code blocks):

{
  "platformRecommendations": [
    {
      "platform": "Facebook",
      "priority": 1,
      "reasoning": "Detailed industry-specific reasoning for ${formData.industry} targeting ${formData.targetAudience}",
      "expectedMetrics": {
        "roas": 4.2,
        "cpm": 12.50,
        "cpc": 1.85,
        "conversionRate": 3.8
      },
      "budgetAllocation": 35,
      "targetingParameters": {
        "demographics": "Specific age, income, education for ${formData.targetAudience}",
        "interests": ["Industry-specific interests"],
        "behaviors": ["Purchase behaviors relevant to ${formData.productService}"],
        "customAudiences": ["Lookalike audiences", "Website visitors"]
      },
      "adFormats": ["Video ads", "Carousel ads", "Dynamic ads"]
    },
    {
      "platform": "LinkedIn",
      "priority": 2,
      "reasoning": "Professional targeting for ${businessType} in ${formData.industry}",
      "expectedMetrics": {
        "roas": 3.8,
        "cpm": 18.75,
        "cpc": 4.25,
        "conversionRate": 2.9
      },
      "budgetAllocation": 25,
      "targetingParameters": {
        "jobTitles": ["Decision maker titles in ${formData.industry}"],
        "industries": ["${formData.industry}", "Related industries"],
        "companySizes": ["Ideal company sizes for ${formData.targetAudience}"],
        "skills": ["Professional skills relevant to ${formData.productService}"]
      },
      "adFormats": ["Sponsored content", "Message ads", "Lead gen forms"]
    },
    {
      "platform": "Google Ads",
      "priority": 3,
      "reasoning": "High-intent search traffic for ${formData.productService}",
      "expectedMetrics": {
        "roas": 5.1,
        "cpm": 25.00,
        "cpc": 3.50,
        "conversionRate": 4.2
      },
      "budgetAllocation": 30,
      "targetingParameters": {
        "keywords": ["High-intent keywords for ${formData.productService}"],
        "audiences": ["In-market audiences", "Custom intent"],
        "locations": ["Geographic targeting based on business model"],
        "devices": ["Desktop", "Mobile optimization"]
      },
      "adFormats": ["Search ads", "Display ads", "Shopping ads"]
    },
    {
      "platform": "Instagram",
      "priority": 4,
      "reasoning": "Visual storytelling for ${formData.industry} brand building",
      "expectedMetrics": {
        "roas": 3.2,
        "cpm": 15.25,
        "cpc": 2.10,
        "conversionRate": 3.1
      },
      "budgetAllocation": 10,
      "targetingParameters": {
        "interests": ["Lifestyle interests of ${formData.targetAudience}"],
        "hashtags": ["Industry-relevant hashtags"],
        "influencers": ["Micro-influencer partnerships"],
        "contentTypes": ["Stories", "Reels", "IGTV"]
      },
      "adFormats": ["Story ads", "Reel ads", "Collection ads"]
    }
  ],
  "monthlyPlan": [
    ${Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const platforms = ['Facebook', 'LinkedIn', 'Instagram', 'Google Ads', 'TikTok'];
      const platform = platforms[day % platforms.length];
      const contentTypes = ['Problem-aware hook', 'Solution demonstration', 'Social proof', 'Urgency/scarcity', 'Value proposition'];
      const contentType = contentTypes[day % contentTypes.length];
      
      return `{
        "day": ${day},
        "platform": "${platform}",
        "contentType": "${day % 2 === 0 ? 'ad' : 'organic'}",
        "hook": "Day ${day}: ${contentType} - ${formData.businessName} transforms ${formData.industry} operations for ${formData.targetAudience}",
        "body": "Discover how ${formData.businessName} helps ${formData.targetAudience} overcome ${formData.currentChallenges || 'common industry challenges'} with our proven ${formData.productService}. Join ${Math.floor(Math.random() * 5000) + 1000}+ satisfied clients.",
        "cta": "${['Book Free Consultation', 'Get Instant Quote', 'Start Free Trial', 'Download Guide', 'Schedule Demo', 'Claim Discount'][day % 6]}",
        "expectedMetrics": {
          "reach": ${Math.floor(Math.random() * 15000) + 5000},
          "engagement": ${Math.floor(Math.random() * 800) + 300},
          "cost": ${Math.floor(Math.random() * 200) + 75},
          "conversions": ${Math.floor(Math.random() * 25) + 8}
        },
        "strategicReasoning": "Day ${day} focuses on ${['awareness building', 'consideration nurturing', 'conversion optimization'][day % 3]} with ${contentType.toLowerCase()}",
        "psychologicalTriggers": ["${['Social proof', 'Authority', 'Scarcity', 'Reciprocity', 'Commitment'][day % 5]}"],
        "targetAudience": "Segment ${day % 3 + 1}: ${formData.targetAudience} ${['new prospects', 'engaged leads', 'ready buyers'][day % 3]}"
      }`;
    }).join(',\n    ')}
  ],
  "budgetStrategy": [
    {
      "category": "Platform Advertising",
      "monthlyBudget": ${parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000')},
      "allocation": [
        {
          "platform": "Facebook",
          "percentage": 35,
          "amount": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.35)},
          "reasoning": "Highest volume and targeting precision for ${formData.targetAudience}",
          "expectedROI": "4.2x return, ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.35 * 4.2)} revenue"
        },
        {
          "platform": "Google Ads",
          "percentage": 30,
          "amount": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.30)},
          "reasoning": "High-intent traffic with best conversion rates",
          "expectedROI": "5.1x return, ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.30 * 5.1)} revenue"
        },
        {
          "platform": "LinkedIn",
          "percentage": 25,
          "amount": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.25)},
          "reasoning": "Premium B2B targeting for ${businessType} decision makers",
          "expectedROI": "3.8x return, ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.25 * 3.8)} revenue"
        },
        {
          "platform": "Instagram",
          "percentage": 10,
          "amount": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.10)},
          "reasoning": "Brand awareness and visual storytelling",
          "expectedROI": "3.2x return, ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.10 * 3.2)} revenue"
        }
      ],
      "optimizationStrategy": "Start with 70% budget on proven platforms (Facebook, Google), scale winners after 2 weeks",
      "riskMitigation": "Diversified spend prevents single-platform dependency"
    }
  ],
  "copywritingRecommendations": [
    {
      "copyType": "Executive Decision Maker Outreach",
      "awarenessStageVariations": {
        "unaware": "Are ${formData.targetAudience} in ${formData.industry} missing 40% revenue due to outdated processes?",
        "problemAware": "Tired of ${formData.currentChallenges || 'inefficient operations'} costing your ${formData.industry} business thousands monthly?",
        "solutionAware": "Why ${formData.businessName}'s ${formData.productService} outperforms traditional ${formData.industry} solutions by 300%",
        "productAware": "${formData.businessName} delivers results other ${formData.industry} providers can't match - here's proof",
        "mostAware": "Ready to implement? ${formData.businessName} guarantees results in 30 days or money back"
      },
      "emotionalTriggers": ["Fear of missing out", "Social proof", "Authority", "Urgency", "Reciprocity"],
      "psychologicalFrameworks": ["Problem-Agitation-Solution", "Before-After-Bridge", "AIDA", "PAS"],
      "industrySpecificAngles": [
        "${formData.industry} businesses waste average $${Math.floor(Math.random() * 50000) + 10000} annually on inefficient processes",
        "Top ${formData.industry} companies use ${formData.productService} to stay competitive",
        "New ${formData.industry} regulations make ${formData.productService} essential for compliance"
      ]
    },
    {
      "copyType": "Social Media Engagement",
      "awarenessStageVariations": {
        "unaware": "This ${formData.industry} secret could transform your business overnight",
        "problemAware": "Stop struggling with ${formData.currentChallenges || 'common pain points'} - there's a better way",
        "solutionAware": "Compare: ${formData.businessName} vs traditional ${formData.industry} approaches",
        "productAware": "See why ${formData.targetAudience} choose ${formData.businessName} over competitors",
        "mostAware": "Limited time: Get ${formData.businessName} with exclusive bonuses"
      },
      "contentFormats": ["Video testimonials", "Before/after case studies", "Behind-the-scenes", "Educational carousels"],
      "engagementHooks": ["Question-based openings", "Controversial statements", "Personal stories", "Industry insights"]
    }
  ],
  "metricOptimization": [
    {
      "metric": "Lead Conversion Rate",
      "currentBenchmark": ${formData.conversionRate || Math.random() * 3 + 1},
      "industryAverage": ${formData.industry === 'saas' ? '4.2' : formData.industry === 'ecommerce' ? '2.8' : '3.5'},
      "targetBenchmark": ${(formData.conversionRate || Math.random() * 3 + 1) * 1.6},
      "gapAnalysis": "Current rate ${formData.conversionRate || '2.1'}% vs industry standard ${formData.industry === 'saas' ? '4.2' : '3.5'}%",
      "improvementStrategies": [
        "Implement ${formData.industry}-specific landing page optimization",
        "Add social proof from ${formData.targetAudience} testimonials",
        "A/B test ${formData.productService} value proposition messaging",
        "Create urgency with limited-time offers for ${formData.businessName}",
        "Optimize form fields for ${formData.targetAudience} preferences"
      ],
      "expectedImprovement": "Increase to ${(formData.conversionRate || 2.1) * 1.6}% within 60 days",
      "implementationTimeline": "Phase 1: Landing page optimization (Week 1-2), Phase 2: Social proof integration (Week 3-4), Phase 3: A/B testing (Week 5-8)"
    },
    {
      "metric": "Customer Acquisition Cost (CAC)",
      "currentBenchmark": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') / 50)},
      "industryAverage": ${formData.industry === 'saas' ? '120' : formData.industry === 'ecommerce' ? '45' : '85'},
      "targetBenchmark": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') / 75)},
      "improvementStrategies": [
        "Refine ${formData.targetAudience} targeting to reduce waste",
        "Improve ad creative relevance for ${formData.industry}",
        "Implement retargeting campaigns for ${formData.businessName}",
        "Optimize bidding strategies across platforms",
        "Create lookalike audiences from best customers"
      ],
      "expectedImprovement": "Reduce CAC by 30% through targeting optimization"
    },
    {
      "metric": "Return on Ad Spend (ROAS)",
      "currentBenchmark": 3.2,
      "industryAverage": ${formData.industry === 'saas' ? '4.8' : formData.industry === 'ecommerce' ? '4.2' : '3.8'},
      "targetBenchmark": 4.5,
      "improvementStrategies": [
        "Focus budget on highest-performing ${formData.industry} keywords",
        "Implement advanced audience segmentation for ${formData.targetAudience}",
        "Create ${formData.productService}-specific landing pages",
        "Use dynamic creative optimization",
        "Implement conversion tracking improvements"
      ],
      "expectedImprovement": "Achieve 4.5x ROAS through strategic optimization"
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Market Leader in ${formData.industry}",
      "marketShare": "${Math.floor(Math.random() * 25) + 15}%",
      "keyStrategies": [
        "Heavy investment in ${formData.targetAudience} education content",
        "Premium positioning with ${formData.productService} differentiation",
        "Strong ${formData.industry} partnership network"
      ],
      "strengths": ["Brand recognition", "Resource depth", "Market presence"],
      "weaknesses": ["Higher pricing", "Slower innovation", "Less personalized service"],
      "opportunities": [
        "Underserve ${formData.targetAudience} with personalized ${formData.productService}",
        "Offer more competitive pricing than market leader",
        "Provide faster implementation and support"
      ],
      "marketingTactics": {
        "platforms": ["LinkedIn", "Google Ads", "Industry publications"],
        "messaging": ["Enterprise-focused", "ROI-driven", "Industry expertise"],
        "contentStrategy": ["Whitepapers", "Webinars", "Case studies"]
      },
      "averageCAC": ${Math.floor(Math.random() * 200) + 150},
      "estimatedROAS": "3.8x"
    },
    {
      "competitor": "Emerging ${formData.industry} Disruptor",
      "marketShare": "${Math.floor(Math.random() * 10) + 5}%",
      "keyStrategies": [
        "Aggressive social media presence targeting ${formData.targetAudience}",
        "Simplified ${formData.productService} positioning",
        "Rapid feature development and innovation"
      ],
      "strengths": ["Agility", "Modern tech stack", "Social media savvy"],
      "weaknesses": ["Limited track record", "Smaller support team", "Less industry credibility"],
      "opportunities": [
        "Leverage ${formData.businessName}'s experience advantage",
        "Highlight proven results over promises",
        "Emphasize stability and reliability"
      ],
      "marketingTactics": {
        "platforms": ["TikTok", "Instagram", "Facebook"],
        "messaging": ["Disruptive", "Simple", "Modern"],
        "contentStrategy": ["Video content", "User-generated content", "Influencer partnerships"]
      },
      "averageCAC": ${Math.floor(Math.random() * 100) + 75},
      "estimatedROAS": "4.2x"
    }
  ],
  "industryInsights": [
    {
      "trend": "Accelerating digital transformation in ${formData.industry}",
      "impact": "Growing demand for ${formData.productService} solutions",
      "opportunity": "Position ${formData.businessName} as the ${formData.industry} digital transformation leader",
      "timeline": "Peak demand expected in next 18-24 months",
      "actionPlan": [
        "Develop ${formData.industry}-specific case studies showcasing transformation results",
        "Create educational content about digital transformation for ${formData.targetAudience}",
        "Partner with ${formData.industry} associations and thought leaders",
        "Build specialized ${formData.productService} packages for digital transformation"
      ],
      "marketSize": "$${Math.floor(Math.random() * 50) + 25}B globally, growing at ${Math.floor(Math.random() * 15) + 10}% annually",
      "economicFactors": [
        {
          "factor": "Labor cost inflation driving ${formData.industry} automation adoption",
          "businessImpact": "Increased urgency for efficiency solutions like ${formData.productService}",
          "marketingAngle": "Cost savings messaging becomes more compelling for ${formData.targetAudience}"
        },
        {
          "factor": "Remote work trends changing ${formData.industry} operations",
          "businessImpact": "New use cases for ${formData.productService} in distributed teams",
          "marketingAngle": "Highlight remote-friendly features and collaboration benefits"
        }
      ]
    },
    {
      "trend": "Increased focus on ${formData.industry} sustainability and compliance",
      "impact": "New requirements creating market opportunity for compliant ${formData.productService}",
      "opportunity": "Differentiate ${formData.businessName} through sustainability positioning",
      "timeline": "Regulatory pressure increasing over next 12 months",
      "actionPlan": [
        "Develop sustainability features in ${formData.productService}",
        "Create compliance-focused messaging for ${formData.targetAudience}",
        "Partner with sustainability consultants in ${formData.industry}",
        "Publish thought leadership on sustainable ${formData.industry} practices"
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
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are an elite business intelligence strategist. Generate comprehensive, actionable intelligence reports with specific, personalized data. Respond with valid JSON only - no markdown formatting, no code blocks, just pure JSON that can be parsed directly. Ensure all sections are fully populated with detailed, industry-specific content.'
          },
          {
            role: 'user',
            content: intelligencePrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 8000
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      // Handle different error types
      if (response.status === 404) {
        throw new Error('Intelligence generation service is currently unavailable. Please try again later.');
      }
      
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API request failed: ${response.status} - ${errorText}`);
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
      console.log('Platform recommendations:', intelligenceData.platformRecommendations?.length || 0);
      console.log('Monthly plan entries:', intelligenceData.monthlyPlan?.length || 0);
      console.log('Copywriting recommendations:', intelligenceData.copywritingRecommendations?.length || 0);
      console.log('Competitor insights:', intelligenceData.competitorInsights?.length || 0);
      console.log('Industry insights:', intelligenceData.industryInsights?.length || 0);
      console.log('Budget strategy entries:', intelligenceData.budgetStrategy?.length || 0);
      
      // Ensure we have the required data structure
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
      intelligenceData.isAIGenerated = true;
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw AI response (first 1000 chars):', aiResponse.substring(0, 1000));
      throw new Error('AI generated invalid response format. Please try again.');
    }

    return new Response(JSON.stringify({ insights: intelligenceData }), {
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
