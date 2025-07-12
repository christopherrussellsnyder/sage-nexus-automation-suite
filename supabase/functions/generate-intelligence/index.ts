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
    clientDetails?: any; // New field for client information
    idealCustomerProfile?: any; // New field for sales ideal customer
    productToSell?: string; // New field for sales product
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
    const request: IntelligenceRequest = await req.json();
    const { formData, intelligenceMode, businessType } = request;

    console.log('Generating intelligence for:', formData.businessName);

    if (!INTELLIGENCE_API_KEY) {
      throw new Error('Intelligence API key not configured');
    }

    // Calculate realistic metric targets based on user data
    const metricTargets = calculateRealisticMetrics(formData, businessType);

    // Create specialized system prompts based on business type
    const systemPrompt = getSpecializedSystemPrompt(businessType, intelligenceMode, formData, metricTargets);
    const userPrompt = getSpecializedUserPrompt(businessType, intelligenceMode, formData);

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

    console.log('AI Response received, parsing JSON...');

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
      console.log('Raw AI response:', aiResponse);
      
      // Create specialized fallback
      intelligenceData = createSpecializedFallback(formData, businessType, intelligenceMode);
    }

    console.log('Intelligence data structured successfully');
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

function getSpecializedSystemPrompt(businessType: string, intelligenceMode: string, formData: any, metricTargets: any): string {
  const basePrompt = `You are an expert business intelligence AI specialized in ${businessType} businesses.`;
  
  switch (businessType) {
    case 'copywriting':
      return `${basePrompt} You provide comprehensive copywriting insights including email sequences, ad copy optimization, and psychological triggers. You MUST respond with a valid JSON object that includes:
      - copywritingRecommendations: Detailed copy strategies and frameworks
      - emailSequence: 30-day email sequence for client nurturing
      - monthlyPlan: 30-day content calendar for client advertising
      - competitorInsights: Analysis of top-performing copy in the client's industry
      - metricOptimization: Copy performance metrics (CTR, conversion rates, engagement)
      - industryInsights: Copywriting trends and opportunities
      
      DO NOT include budgetStrategy as copywriters don't handle client budgets.`;
      
    case 'agency':
      return `${basePrompt} You provide marketing agency insights including client acquisition and client delivery strategies. You MUST respond with a valid JSON object that includes:
      - budgetStrategy: Client budget recommendations and agency growth budget
      - platformRecommendations: Best platforms for both client delivery and agency growth
      - monthlyPlan: TWO 30-day plans - one for client delivery, one for agency client acquisition
      - clientDeliveryPlan: Specific 30-day plan for serving existing clients
      - agencyGrowthPlan: Specific 30-day plan for acquiring new agency clients
      - metricOptimization: Agency and client performance metrics
      - competitorInsights: Analysis of competing agencies and client industry
      - industryInsights: Marketing trends and opportunities`;
      
    case 'sales':
      return `${basePrompt} You provide sales organization insights focused on closing deals and lead conversion. You MUST respond with a valid JSON object that includes:
      - salesStrategy: Deal closing strategies and lead conversion tactics
      - emailSequence: 30-day email sequence for nurturing prospects to close
      - phoneCallScript: Optimized phone scripts for different stages of the sales process
      - monthlyPlan: 30-day sales activity calendar focused on closing deals
      - metricOptimization: Sales metrics (close rate, pipeline velocity, deal size)
      - competitorInsights: Analysis of top sales strategies in the industry
      - prospectingInsights: Ideal customer profile optimization
      - industryInsights: Sales trends and psychological triggers for the industry
      
      Focus on closing deals, not outreach. Include psychological triggers specific to ${formData.industry || 'the industry'}.`;
      
    default: // ecommerce
      return `${basePrompt} You provide comprehensive ecommerce optimization insights with advanced conversion strategies. You MUST respond with a valid JSON object that includes ALL standard sections with ecommerce-specific optimization.`;
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
    case 'copywriting':
      return `${baseInfo}
      
      Generate comprehensive copywriting intelligence for ${formData.businessName}. Focus on:
      1. High-converting copy frameworks and psychological triggers
      2. 30-day email sequence for client nurturing and conversion
      3. 30-day content calendar for client's advertising campaigns
      4. Analysis of top-performing copy in ${formData.industry} industry
      5. Copy performance optimization strategies
      
      Client Details: ${formData.clientDetails ? JSON.stringify(formData.clientDetails) : 'Not provided'}
      
      Intelligence Mode: ${intelligenceMode}`;
      
    case 'agency':
      return `${baseInfo}
      
      Generate comprehensive marketing agency intelligence for ${formData.businessName}. Provide:
      1. TWO separate 30-day content calendars:
         - One for delivering results to existing clients
         - One for acquiring new agency clients
      2. Client budget optimization strategies
      3. Agency growth and scaling tactics
      4. Competitive analysis of other agencies and client industries
      
      Client Details: ${formData.clientDetails ? JSON.stringify(formData.clientDetails) : 'Not provided - focus on agency growth strategies'}
      
      Intelligence Mode: ${intelligenceMode}`;
      
    case 'sales':
      return `${baseInfo}
      
      Generate comprehensive sales intelligence for ${formData.businessName}. Focus on:
      1. Deal closing strategies and conversion tactics
      2. 30-day email sequence optimized for closing prospects
      3. Phone call scripts for different sales stages
      4. 30-day sales activity calendar focused on closing deals
      5. Psychological triggers specific to ${formData.industry}
      
      Product to Sell: ${formData.productToSell || 'Not specified'}
      Ideal Customer Profile: ${formData.idealCustomerProfile ? JSON.stringify(formData.idealCustomerProfile) : 'Not provided'}
      
      Intelligence Mode: ${intelligenceMode}`;
      
    default:
      return `${baseInfo}
      
      Generate comprehensive ecommerce intelligence for ${formData.businessName}.
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
        metricOptimization: []
      };
    case 'agency':
      return {
        ...baseData,
        budgetStrategy: {},
        platformRecommendations: [],
        clientDeliveryPlan: [],
        agencyGrowthPlan: [],
        metricOptimization: []
      };
    case 'sales':
      return {
        ...baseData,
        salesStrategy: {},
        emailSequence: [],
        phoneCallScript: {},
        prospectingInsights: [],
        metricOptimization: []
      };
    default:
      return {
        ...baseData,
        budgetStrategy: {},
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
