import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get OpenAI API key from Supabase secrets
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

console.log('=== Edge Function Loaded ===');
console.log('OpenAI API Key configured:', !!OPENAI_API_KEY);

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
    clientDetails?: any;
    idealCustomerProfile?: any;
    productToSell?: string;
  };
  intelligenceMode: 'full' | 'copywriting' | 'marketing' | 'competitor';
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
}

serve(async (req) => {
  console.log('=== EDGE FUNCTION STARTED ===');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Function invoked with method:', req.method);
    
    let request: IntelligenceRequest;
    try {
      request = await req.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { formData, intelligenceMode, businessType } = request;
    console.log('Processing intelligence request for:', formData?.businessName || 'Unknown business');

    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate realistic metric targets based on user data
    const metricTargets = calculateRealisticMetrics(formData, businessType);

    // Create specialized system prompts based on business type
    const systemPrompt = getSpecializedSystemPrompt(businessType, intelligenceMode, formData, metricTargets);
    const userPrompt = getSpecializedUserPrompt(businessType, intelligenceMode, formData);

    console.log('Calling OpenAI API...');
    
    // Create a timeout promise for 45 seconds
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('OpenAI API request timed out after 45 seconds')), 45000);
    });

    // Create the fetch promise
    const fetchPromise = fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
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

    console.log('Waiting for OpenAI response...');
    
    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return new Response(JSON.stringify({ 
        error: `OpenAI API error: ${response.status} - ${errorData}` 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Response received, parsing...');

    // Try to parse as JSON
    let intelligenceData;
    try {
      // Clean the response to ensure it's valid JSON
      const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      intelligenceData = JSON.parse(cleanResponse);
      
      // Ensure all required fields are present
      intelligenceData.generatedAt = new Date().toISOString();
      intelligenceData.intelligenceMode = intelligenceMode;
      intelligenceData.businessType = businessType;
      intelligenceData.formData = formData;
      
      // Ensure monthlyPlan has exactly 30 days
      if (!intelligenceData.monthlyPlan || intelligenceData.monthlyPlan.length < 30) {
        console.log('Generating additional days for 30-day plan...');
        intelligenceData.monthlyPlan = generateSpecialized30DayPlan(formData, businessType);
      }
      
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.log('Raw AI response length:', aiResponse.length);
      
      // Create specialized fallback
      intelligenceData = createSpecializedFallback(formData, businessType, intelligenceMode);
    }

    console.log('Intelligence data structured successfully');
    return new Response(JSON.stringify(intelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-intelligence function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Unknown error occurred',
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getSpecializedSystemPrompt(businessType: string, intelligenceMode: string, formData: any, metricTargets: any): string {
  const basePrompt = `You are an expert business intelligence AI specialized in ${businessType} businesses.`;
  
  switch (businessType) {
    case 'ecommerce':
      return `${basePrompt} You provide comprehensive ecommerce optimization insights. You MUST respond with a valid JSON object that includes:
      - budgetStrategy: Detailed budget allocation and strategy recommendations
      - copywritingRecommendations: AI-powered copy optimization for product pages, ads, and emails
      - platformRecommendations: Best advertising platforms with detailed reasoning
      - monthlyPlan: AI-generated 30-day optimized content calendar with daily posts
      - metricOptimization: AI metric optimization targets for conversion rates, ROAS, etc.
      - competitorInsights: Competitive intelligence analysis
      
      Focus on conversion optimization, customer acquisition, and revenue growth strategies.`;
      
    case 'agency':
      return `${basePrompt} You provide comprehensive marketing agency insights including dual-focus strategies. You MUST respond with a valid JSON object that includes:
      - budgetStrategy: Budget recommendations for agency growth AND client budget management strategies
      - copywritingRecommendations: Copy strategies for both agency client acquisition AND client campaign delivery (include audience field: 'user' for agency, 'client' for client campaigns)
      - platformRecommendations: Best platforms for both agency growth AND client campaign delivery
      - monthlyPlan: AI-generated 30-day content calendar for agency growth
      - clientDeliveryPlan: Separate 30-day plan for client service delivery
      - agencyGrowthPlan: Specific 30-day plan for acquiring new agency clients
      - metricOptimization: Performance metrics for both agency growth and client results
      - competitorInsights: Analysis of competing agencies AND client industry competitors
      - industryInsights: Marketing trends and opportunities
      
      Provide strategies for both agency growth and exceptional client delivery.`;
      
    case 'sales':
      return `${basePrompt} You provide comprehensive sales organization insights focused on lead generation and deal closing. You MUST respond with a valid JSON object that includes:
      - budgetStrategy: Budget allocation specifically for lead generation activities
      - copywritingRecommendations: Copy optimization for email sequences AND phone call sales scripts
      - monthlyPlan: AI-generated 30-day content calendar for lead generation (if needed for content marketing)
      - metricOptimization: Sales metrics optimization (close rates, pipeline velocity, deal size metrics)
      - competitorInsights: Analysis of top sales strategies in the industry
      - prospectingInsights: Ideal customer profile optimization and lead generation strategies
      - industryInsights: Sales trends and psychological triggers for the industry
      
      Focus on lead generation, deal closing, and sales process optimization for ${formData.industry || 'the industry'}.`;
      
    case 'copywriting':
      return `${basePrompt} You provide comprehensive copywriting business insights with dual-focus strategies. You MUST respond with a valid JSON object that includes:
      - copywritingRecommendations: Advanced copy strategies for both copywriter client acquisition AND client campaign delivery (include audience field: 'user' for copywriter business, 'client' for client campaigns)
      - monthlyPlan: AI-generated 30-day content calendar for copywriter business growth (lead generation content)
      - clientCopyPlan: Separate 30-day copy calendar for client advertisement campaigns
      - metricOptimization: Copy performance metrics for email sequences and conversion optimization
      - competitorInsights: Analysis of top-performing copy in the client's industry
      - industryInsights: Copywriting trends and opportunities
      - emailSequence: 30-day email sequence for client nurturing and conversion
      
      DO NOT include budgetStrategy as copywriters don't handle client budgets directly.
      Focus on copy performance, client results, and copywriter business growth.`;
      
    default:
      return `${basePrompt} You provide comprehensive business optimization insights with advanced strategies.`;
  }
}

function getSpecializedUserPrompt(businessType: string, intelligenceMode: string, formData: any): string {
  const baseInfo = `
    Business: ${formData.businessName}
    Industry: ${formData.industry}
    Business Type: ${businessType}
    Target Audience: ${formData.targetAudience}
    Product/Service: ${formData.productService}
    Unique Value: ${formData.uniqueValue || 'Not specified'}
    Monthly Revenue: ${formData.monthlyRevenue}
    Current Challenges: ${formData.currentChallenges || 'Not specified'}
    Goals: ${formData.goals?.join(', ') || 'Not specified'}
    Timeline: ${formData.timeline || 'Not specified'}`;

  switch (businessType) {
    case 'ecommerce':
      return `${baseInfo}
      
      Generate comprehensive ecommerce intelligence for ${formData.businessName}. Focus on:
      1. Budget Strategy: Detailed budget allocation for growth
      2. AI Copywriting Recommendations: Product page optimization, ad copy, email campaigns
      3. Platform Recommendations: Best advertising platforms with detailed analysis
      4. AI Generated 30 Day Optimized Content Calendar: Daily content strategy
      5. AI Metric Optimization Targets: Conversion rates, ROAS, customer acquisition costs
      6. Competitive Intelligence: Competitor analysis and positioning strategies
      
      Intelligence Mode: ${intelligenceMode}`;
      
    case 'agency':
      return `${baseInfo}
      
      Generate comprehensive marketing agency intelligence for ${formData.businessName}. Provide:
      1. Budget Strategy: For agency growth AND client budget management
      2. AI Copywriting Recommendations: For agency client acquisition AND client campaign delivery
      3. Platform Recommendations: Best platforms for agency growth AND client delivery
      4. AI Generated 30 Day Optimized Content Calendar: For agency growth
      5. Client Service Delivery Plan: 30-day plan for serving existing clients
      6. AI Metric Optimization Targets: For both agency growth and client results
      7. Competitive Intelligence: Competing agencies AND client industry analysis
      
      Client Details: ${formData.clientDetails ? JSON.stringify(formData.clientDetails) : 'Not provided - focus on agency growth strategies'}
      
      Intelligence Mode: ${intelligenceMode}`;
      
    case 'sales':
      return `${baseInfo}
      
      Generate comprehensive sales intelligence for ${formData.businessName}. Focus on:
      1. Budget Strategy: For lead generation activities
      2. AI Copywriting Recommendations: Email sequences AND phone call sales scripts
      3. AI Generated 30 Day Optimized Content Calendar: For lead generation (if needed)
      4. AI Metric Optimization Targets: Sales metrics and deal closing optimization
      5. Competitive Intelligence: Top sales strategies in ${formData.industry}
      
      Product to Sell: ${formData.productToSell || 'Not specified'}
      Ideal Customer Profile: ${formData.idealCustomerProfile ? JSON.stringify(formData.idealCustomerProfile) : 'Not provided'}
      
      Intelligence Mode: ${intelligenceMode}`;
      
    case 'copywriting':
      return `${baseInfo}
      
      Generate comprehensive copywriting intelligence for ${formData.businessName}. Focus on:
      1. AI Copywriting Recommendations: For copywriter client acquisition AND client campaign delivery
      2. AI Generated 30 Day Optimized Content Calendar: For copywriter business growth
      3. Client Copy Plan: 30-day copy calendar for client advertisement campaigns
      4. AI Metric Optimization Targets: Copy performance metrics and email sequences
      5. Competitive Intelligence: Top-performing copy in client's industry
      
      Client Details: ${formData.clientDetails ? JSON.stringify(formData.clientDetails) : 'Not provided'}
      
      Intelligence Mode: ${intelligenceMode}`;
      
    default:
      return `${baseInfo}
      
      Generate comprehensive business intelligence for ${formData.businessName}.
      Intelligence Mode: ${intelligenceMode}`;
  }
}

function calculateRealisticMetrics(formData: any, businessType: string) {
  const currentConversionRate = parseFloat(formData.conversionRate) || 0;
  const monthlyRevenue = parseFloat(formData.monthlyRevenue?.replace(/[^\d.-]/g, '')) || 0;
  const adBudget = parseFloat(formData.monthlyAdBudget?.replace(/[^\d.-]/g, '')) || parseFloat(formData.marketingBudget?.replace(/[^\d.-]/g, '')) || 1000;
  
  // Calculate target conversion rate using the specified formula
  let targetConversionRate;
  if (currentConversionRate >= 0 && currentConversionRate <= 1) {
    targetConversionRate = Math.min(currentConversionRate + 1.75, 8); // +1.5-2%
  } else if (currentConversionRate > 1 && currentConversionRate <= 3) {
    targetConversionRate = Math.min(currentConversionRate + 1.0, 8); // +0.8-1.2%
  } else if (currentConversionRate > 3) {
    targetConversionRate = Math.min(currentConversionRate + 0.4, 8); // +0.3-0.5%
  } else {
    targetConversionRate = 2.0; // Default for new businesses
  }
  
  // Calculate current and target CPA
  const currentConversions = (monthlyRevenue * (currentConversionRate / 100)) || 1;
  const currentCPA = currentConversions > 0 ? Math.round(adBudget / currentConversions) : 75; // Industry benchmark
  const targetCPA = Math.round(currentCPA * 0.75); // 25% improvement (0.7-0.8 range)
  
  // Calculate current and target ROAS using the specified formula
  const currentROAS = monthlyRevenue > 0 && adBudget > 0 ? (monthlyRevenue / adBudget) : 0;
  let targetROAS;
  if (currentROAS < 2) {
    targetROAS = 2.75; // 2.5-3x
  } else if (currentROAS >= 2 && currentROAS <= 4) {
    targetROAS = currentROAS + 1.25; // +1-1.5x
  } else if (currentROAS > 4) {
    targetROAS = currentROAS + 0.75; // +0.5-1x
  } else {
    targetROAS = 3.0; // Default target
  }
  
  // Calculate revenue target based on user goals
  const revenueTarget = formData.revenueTarget || (monthlyRevenue * 2.5);
  
  return {
    conversionRate: targetConversionRate.toFixed(1),
    currentCPA: `$${currentCPA}`,
    cpa: `$${targetCPA}`,
    cpaImprovement: Math.round(((currentCPA - targetCPA) / currentCPA) * 100),
    currentROAS: currentROAS.toFixed(1),
    roas: targetROAS.toFixed(1),
    roasImprovement: Math.round(((targetROAS - currentROAS) / (currentROAS || 1)) * 100),
    revenue: `$${revenueTarget.toLocaleString()}`
  };
}

function generateSpecialized30DayPlan(formData: any, businessType: string) {
  const platforms = ['Facebook', 'Instagram', 'Google', 'TikTok'];
  const plan = [];
  
  for (let day = 1; day <= 30; day++) {
    const platform = platforms[day % platforms.length];
    
    let content;
    switch (businessType) {
      case 'copywriting':
        content = generateCopywritingContent(day, platform, formData);
        break;
      case 'agency':
        content = generateAgencyContent(day, platform, formData);
        break;
      case 'sales':
        content = generateSalesContent(day, platform, formData);
        break;
      default:
        content = generateEcommerceContent(day, platform, formData);
    }
    
    plan.push(content);
  }
  
  return plan;
}

function generateCopywritingContent(day: number, platform: string, formData: any) {
  return {
    day,
    platform,
    contentType: 'ad',
    hook: `Day ${day}: ${getIndustryProblem(formData.industry)} affecting your results?`,
    body: `${formData.businessName} copywriting transforms your messaging for maximum impact.`,
    cta: 'Get High-Converting Copy Today',
    visualSuggestion: 'Before/after results showcase or testimonial graphic',
    targetAudience: formData.targetAudience,
    keyMessage: 'Professional copywriting drives real results',
    expectedMetrics: {
      reach: Math.floor(Math.random() * 3000) + 1500,
      engagement: Math.floor(Math.random() * 200) + 100,
      cost: Math.floor(Math.random() * 40) + 20,
      conversions: Math.floor(Math.random() * 15) + 5,
      ctr: `${(Math.random() * 1.5 + 2).toFixed(1)}%`,
      readTime: `${Math.floor(Math.random() * 3) + 4} seconds`
    },
    strategicReasoning: `Day ${day} copywriting content uses problem-solution framework targeting ${formData.targetAudience} with industry-specific pain points.`,
    copywritingFocus: 'High-converting headlines and persuasive messaging',
    psychologicalTriggers: ['credibility', 'results', 'transformation']
  };
}

function generateAgencyContent(day: number, platform: string, formData: any) {
  const isClientContent = day % 2 === 0; // Alternate between client and agency content
  
  if (isClientContent && formData.clientDetails) {
    return {
      day,
      platform,
      contentType: 'ad',
      contentFor: 'client',
      hook: `Day ${day}: Client Success - ${getIndustryProblem(formData.clientDetails.industry)}`,
      body: `${formData.clientDetails.businessName || 'Our client'} achieves breakthrough results with strategic marketing.`,
      cta: 'See Client Success',
      visualSuggestion: 'Client results and performance metrics',
      targetAudience: formData.clientDetails.targetAudience || formData.targetAudience,
      keyMessage: 'Delivering exceptional results for clients',
      expectedMetrics: {
        reach: Math.floor(Math.random() * 4000) + 2000,
        engagement: Math.floor(Math.random() * 250) + 125,
        cost: Math.floor(Math.random() * 60) + 30,
        conversions: Math.floor(Math.random() * 20) + 10
      },
      strategicReasoning: `Day ${day} client-focused content showcasing agency expertise and client success.`
    };
  } else {
    return {
      day,
      platform,
      contentType: 'ad',
      contentFor: 'agency',
      hook: `Day ${day}: Marketing Agency Results That Matter`,
      body: `${formData.businessName} delivers measurable growth for businesses like yours.`,
      cta: 'Partner With Us',
      visualSuggestion: 'Agency case studies and client testimonials',
      targetAudience: 'Business owners seeking marketing growth',
      keyMessage: 'Expert marketing agency driving real business growth',
      expectedMetrics: {
        reach: Math.floor(Math.random() * 3500) + 1750,
        engagement: Math.floor(Math.random() * 200) + 100,
        cost: Math.floor(Math.random() * 50) + 25,
        conversions: Math.floor(Math.random() * 18) + 8
      },
      strategicReasoning: `Day ${day} agency growth content targeting potential clients with proven results.`
    };
  }
}

function generateSalesContent(day: number, platform: string, formData: any) {
  return {
    day,
    platform,
    contentType: 'sales',
    hook: `Day ${day}: ${getIndustryProblem(formData.industry)} costing you deals?`,
    body: `${formData.productToSell || 'Our solution'} helps ${formData.targetAudience} close more deals effectively.`,
    cta: 'Close More Deals Now',
    visualSuggestion: 'Sales success stories and testimonials',
    targetAudience: formData.idealCustomerProfile?.description || formData.targetAudience,
    keyMessage: 'Professional sales training drives results',
    expectedMetrics: {
      reach: Math.floor(Math.random() * 2500) + 1250,
      engagement: Math.floor(Math.random() * 150) + 75,
      cost: Math.floor(Math.random() * 35) + 18,
      conversions: Math.floor(Math.random() * 12) + 6
    },
    strategicReasoning: `Day ${day} sales-focused content using industry-specific psychological triggers for ${formData.industry}.`,
    salesFocus: 'Deal closing and conversion optimization',
    psychologicalTriggers: ['success', 'achievement', 'status', 'urgency']
  };
}

function generateEcommerceContent(day: number, platform: string, formData: any) {
  return {
    day,
    platform,
    contentType: 'ad',
    hook: `Day ${day}: ${getIndustryProblem(formData.industry)} solved!`,
    body: `${formData.businessName} delivers the solution you've been looking for.`,
    cta: 'Shop Now',
    visualSuggestion: 'Product showcase and customer reviews',
    targetAudience: formData.targetAudience,
    keyMessage: formData.uniqueValue || 'Quality products that deliver results',
    expectedMetrics: {
      reach: Math.floor(Math.random() * 5000) + 2500,
      engagement: Math.floor(Math.random() * 300) + 150,
      cost: Math.floor(Math.random() * 50) + 25,
      conversions: Math.floor(Math.random() * 25) + 12
    },
    strategicReasoning: `Day ${day} ecommerce content optimized for ${formData.industry} with conversion-focused messaging.`
  };
}

function createSpecializedFallback(formData: any, businessType: string, intelligenceMode: string) {
  const baseData = {
    generatedAt: new Date().toISOString(),
    intelligenceMode,
    businessType,
    formData,
    monthlyPlan: generateSpecialized30DayPlan(formData, businessType),
    competitorInsights: [],
    industryInsights: []
  };

  switch (businessType) {
    case 'copywriting':
      return {
        ...baseData,
        copywritingRecommendations: [],
        emailSequence: [],
        metricOptimization: [],
        clientCopyPlan: []
      };
    case 'agency':
      return {
        ...baseData,
        budgetStrategy: {},
        copywritingRecommendations: [],
        platformRecommendations: [],
        clientDeliveryPlan: [],
        agencyGrowthPlan: [],
        metricOptimization: []
      };
    case 'sales':
      return {
        ...baseData,
        budgetStrategy: {},
        copywritingRecommendations: [],
        prospectingInsights: [],
        metricOptimization: []
      };
    default:
      return {
        ...baseData,
        budgetStrategy: {},
        copywritingRecommendations: [],
        platformRecommendations: [],
        metricOptimization: []
      };
  }
}

function getIndustryProblem(industry: string): string {
  const problems = {
    'ecommerce': 'low conversion rates and high cart abandonment',
    'saas': 'inefficient processes and poor ROI',
    'fitness': 'slow results and lack of motivation',
    'coaching': 'stagnant growth and unclear direction',
    'agency': 'inconsistent lead generation and client retention',
    'copywriting': 'poor converting copy and low client results',
    'default': 'poor performance and wasted resources'
  };
  return problems[industry.toLowerCase()] || problems.default;
}
