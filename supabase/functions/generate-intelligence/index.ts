import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced configuration for maximum reliability
const CONFIG = {
  MAX_RETRIES: 4,
  BASE_DELAY: 2000,
  MAX_DELAY: 15000,
  TIMEOUT: 90000, // Increased to 90 seconds
  CACHE_TTL: 300000, // 5 minutes
};

// In-memory cache for responses (simple implementation)
const responseCache = new Map();

console.log('Enhanced intelligence generation function loaded successfully');

// Utility functions for enhanced reliability
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const exponentialBackoff = (attempt: number) => 
  Math.min(CONFIG.BASE_DELAY * Math.pow(2, attempt), CONFIG.MAX_DELAY);

const createCacheKey = (formData: any, businessType: string, intelligenceMode: string) => 
  JSON.stringify({ formData, businessType, intelligenceMode });

const validateRequestData = (data: any) => {
  if (!data.formData || !data.businessType || !data.intelligenceMode) {
    throw new Error('Missing required request data: formData, businessType, or intelligenceMode');
  }
  
  if (!data.formData.businessName || !data.formData.industry) {
    throw new Error('Missing required business data: businessName or industry');
  }
  
  return true;
};

const sanitizeInput = (input: any) => {
  if (typeof input === 'string') {
    return input.trim().slice(0, 1000); // Limit input length
  }
  return input;
};

const makeOpenAIRequest = async (prompt: string, apiKey: string, attempt = 0): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
  
  try {
    console.log(`Making OpenAI request (attempt ${attempt + 1}/${CONFIG.MAX_RETRIES + 1})`);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14', // Use the latest flagship model for highest quality
        messages: [
          { 
            role: 'system', 
            content: `You are an elite business intelligence AI with access to the latest market data and industry insights. You conduct thorough analysis using advanced research methodologies and generate actionable, data-driven intelligence reports. Your expertise spans marketing strategy, competitive analysis, content planning, and business optimization across all industries and business types. Always respond with comprehensive, detailed, and highly specific JSON containing professional-grade business intelligence.` 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8, // Higher creativity for more unique insights
        max_tokens: 8000 // Double the tokens for more comprehensive responses
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      
      // Handle specific error codes with different retry logic
      if (response.status === 429) { // Rate limit
        if (attempt < CONFIG.MAX_RETRIES) {
          const delay = exponentialBackoff(attempt) * 2; // Double delay for rate limits
          console.log(`Rate limited, retrying in ${delay}ms...`);
          await sleep(delay);
          return makeOpenAIRequest(prompt, apiKey, attempt + 1);
        }
      }
      
      if (response.status >= 500 && attempt < CONFIG.MAX_RETRIES) {
        const delay = exponentialBackoff(attempt);
        console.log(`Server error ${response.status}, retrying in ${delay}ms...`);
        await sleep(delay);
        return makeOpenAIRequest(prompt, apiKey, attempt + 1);
      }
      
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from OpenAI');
    }
    
    return data;
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      console.log('Request timed out');
      if (attempt < CONFIG.MAX_RETRIES) {
        const delay = exponentialBackoff(attempt);
        console.log(`Timeout, retrying in ${delay}ms...`);
        await sleep(delay);
        return makeOpenAIRequest(prompt, apiKey, attempt + 1);
      }
      throw new Error('Request timed out after retries');
    }
    
    // Network errors - retry with exponential backoff
    if (attempt < CONFIG.MAX_RETRIES && (error.code === 'ECONNRESET' || error.code === 'ENOTFOUND')) {
      const delay = exponentialBackoff(attempt);
      console.log(`Network error, retrying in ${delay}ms...`);
      await sleep(delay);
      return makeOpenAIRequest(prompt, apiKey, attempt + 1);
    }
    
    throw error;
  }
};

const parseAIResponse = (aiResponse: string, formData: any, businessType: string) => {
  console.log('Raw AI Response:', aiResponse.substring(0, 200) + '...');
  
  // Multiple parsing strategies for enhanced reliability
  const parsingStrategies = [
    // Strategy 1: Direct JSON parse
    () => JSON.parse(aiResponse),
    
    // Strategy 2: Clean markdown and parse
    () => {
      const cleaned = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleaned);
    },
    
    // Strategy 3: Extract JSON from text
    () => {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    },
    
    // Strategy 4: More aggressive cleaning
    () => {
      let cleaned = aiResponse
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/^\s*[\r\n]/gm, '')
        .trim();
      
      // Find the first { and last }
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      
      if (start !== -1 && end !== -1 && end > start) {
        cleaned = cleaned.substring(start, end + 1);
        return JSON.parse(cleaned);
      }
      
      throw new Error('Could not extract valid JSON');
    }
  ];
  
  for (let i = 0; i < parsingStrategies.length; i++) {
    try {
      console.log(`Attempting parsing strategy ${i + 1}`);
      const result = parsingStrategies[i]();
      console.log(`Successfully parsed with strategy ${i + 1}`);
      
      // CRITICAL: Validate that ALL required sections are present in AI response
      const requiredSections = [
        'budgetStrategy', 'copywritingRecommendations', 'platformRecommendations',
        'monthlyPlan', 'contentCalendar', 'industryInsights', 'actionPlans',
        'metricOptimization', 'competitorInsights'
      ];
      
      const missingSections = requiredSections.filter(section => !result[section] || 
        (Array.isArray(result[section]) && result[section].length === 0));
      
      if (missingSections.length > 0) {
        console.error('AI response missing required sections:', missingSections);
        throw new Error(`AI response incomplete - missing: ${missingSections.join(', ')}`);
      }
      
      console.log('AI response contains all required sections');
      return result;
    } catch (error) {
      console.log(`Parsing strategy ${i + 1} failed:`, error.message);
      continue;
    }
  }
  
  // If all parsing fails, throw error instead of using fallback
  console.error('CRITICAL: AI response parsing completely failed');
  console.error('Raw response that failed:', aiResponse);
  throw new Error('Failed to parse AI response - API may not be generating proper intelligence data');
};

serve(async (req) => {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  
  console.log(`[${requestId}] Request received: ${req.method} ${req.url}`);
  
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Environment validation
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      console.error(`[${requestId}] No OpenAI API key found`);
      return new Response(JSON.stringify({ 
        error: 'Service configuration error',
        requestId,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[${requestId}] API key validated, processing request...`);
    
    // Parse and validate request data
    let requestData;
    try {
      requestData = await req.json();
    } catch (error) {
      console.error(`[${requestId}] Invalid JSON in request:`, error);
      return new Response(JSON.stringify({ 
        error: 'Invalid request format',
        requestId,
        timestamp: new Date().toISOString()
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Validate and sanitize input
    validateRequestData(requestData);
    
    const { formData, intelligenceMode, businessType } = requestData;
    
    // Sanitize inputs
    const sanitizedFormData = {
      ...formData,
      businessName: sanitizeInput(formData.businessName),
      industry: sanitizeInput(formData.industry),
      targetAudience: sanitizeInput(formData.targetAudience),
      productService: sanitizeInput(formData.productService),
    };
    
    console.log(`[${requestId}] Processing for business: ${sanitizedFormData.businessName}, Type: ${businessType}`);

    // Check cache first
    const cacheKey = createCacheKey(sanitizedFormData, businessType, intelligenceMode);
    const cachedResponse = responseCache.get(cacheKey);
    
    if (cachedResponse && (Date.now() - cachedResponse.timestamp < CONFIG.CACHE_TTL)) {
      console.log(`[${requestId}] Returning cached response`);
      return new Response(JSON.stringify({
        ...cachedResponse.data,
        cached: true,
        requestId
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = createPrompt(sanitizedFormData, businessType, intelligenceMode);
    
    console.log(`[${requestId}] Calling OpenAI API...`);
    
    // Make enhanced API request with retries
    const apiResponse = await makeOpenAIRequest(prompt, OPENAI_API_KEY);
    const aiResponse = apiResponse.choices[0].message.content;
    
    console.log(`[${requestId}] Received AI response, parsing...`);
    
    // Enhanced parsing with multiple fallback strategies
    const intelligenceData = parseAIResponse(aiResponse, sanitizedFormData, businessType);

    // Add required metadata
    intelligenceData.generatedAt = new Date().toISOString();
    intelligenceData.businessType = businessType;
    intelligenceData.intelligenceMode = intelligenceMode;
    intelligenceData.formData = sanitizedFormData;
    intelligenceData.requestId = requestId;
    intelligenceData.processingTime = Date.now() - startTime;

    // Cache the response
    responseCache.set(cacheKey, {
      data: intelligenceData,
      timestamp: Date.now()
    });
    
    // Cleanup old cache entries (basic memory management)
    if (responseCache.size > 100) {
      const oldestEntries = Array.from(responseCache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp)
        .slice(0, 20);
      oldestEntries.forEach(([key]) => responseCache.delete(key));
    }

    console.log(`[${requestId}] Intelligence generation completed successfully in ${Date.now() - startTime}ms`);
    
    return new Response(JSON.stringify(intelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(`[${requestId}] Function error after ${processingTime}ms:`, error);
    
    // Enhanced error response
    const errorResponse = {
      error: error.message || 'Internal server error',
      requestId,
      timestamp: new Date().toISOString(),
      processingTime,
      retryable: error.message?.includes('timeout') || error.message?.includes('rate limit')
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createPrompt(formData: any, businessType: string, intelligenceMode: string): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `As an elite business intelligence consultant with deep expertise in ${formData.industry} industry, conduct a comprehensive strategic analysis for ${formData.businessName}. Your analysis must be data-driven, industry-specific, and highly actionable.

## BUSINESS INTELLIGENCE BRIEF
**Company:** ${formData.businessName}
**Industry:** ${formData.industry}  
**Target Market:** ${formData.targetAudience}
**Product/Service:** ${formData.productService}
**Revenue Scale:** ${formData.monthlyRevenue}/month
**Business Model:** ${businessType}
**Key Challenges:** ${formData.currentChallenges || 'Not specified'}
**Analysis Date:** ${currentDate}

## RESEARCH METHODOLOGY
Apply advanced business intelligence research including:
- Industry trend analysis and competitive positioning
- Target audience behavioral insights and psychographics
- Platform performance data and ROI optimization strategies
- Content strategy frameworks based on conversion psychology
- Budget allocation models using historical performance data
- Predictive analytics for growth opportunities

## MANDATORY OUTPUT STRUCTURE
Generate a complete JSON response containing ALL sections below. Each section must be professionally researched, industry-specific, and immediately actionable:

{
  "budgetStrategy": {
    "totalBudget": "$2000",
    "allocation": {
      "advertising": 60,
      "content": 20, 
      "tools": 20
    },
    "recommendations": [
      "Data-driven budget allocation strategy #1 specific to ${formData.industry}",
      "ROI optimization approach #2 targeting ${formData.targetAudience}",  
      "Risk management strategy #3 for ${formData.productService} business"
    ],
    "reasoning": "Detailed explanation of budget allocation based on ${formData.industry} industry benchmarks and ${formData.targetAudience} behavior patterns"
  },
  "copywritingRecommendations": [
    {
      "type": "email",
      "headline": "Compelling, psychology-driven email subject line for ${formData.targetAudience}",
      "content": "Complete 3-4 sentence email copy that addresses specific pain points of ${formData.targetAudience} and positions ${formData.productService} as the ideal solution. Include emotional triggers and urgency elements specific to ${formData.industry}.",
      "cta": "Action-oriented CTA that converts",
      "strategicReasoning": "Explanation of psychological triggers used and why this approach works for ${formData.targetAudience}"
    },
    {
      "type": "ad",
      "headline": "High-converting ad headline that speaks directly to ${formData.targetAudience} desires",
      "content": "Complete Facebook/Google ad copy (3-4 sentences) that showcases unique value proposition of ${formData.productService}. Include social proof elements and address objections common in ${formData.industry}.",
      "cta": "Conversion-optimized CTA",
      "strategicReasoning": "Why this messaging strategy outperforms competitors in ${formData.industry}"
    },
    {
      "type": "social",
      "headline": "Viral-potential social media hook for ${formData.targetAudience}",
      "content": "Engaging social media copy (2-3 sentences) that drives engagement and shares. Optimized for algorithm performance and includes trending elements relevant to ${formData.industry}.",
      "cta": "Engagement-driving CTA",
      "strategicReasoning": "Platform-specific optimization strategy and engagement psychology"
    }
  ],
  "platformRecommendations": [
    {
      "platform": "Primary platform recommendation based on ${formData.targetAudience} data",
      "priority": "Priority level with justification",
      "reasoning": "Comprehensive analysis of why this platform delivers best ROI for ${formData.industry} businesses targeting ${formData.targetAudience}",
      "budget": "Specific dollar amount with breakdown",
      "expectedROI": "Realistic ROI based on industry benchmarks",
      "audienceSize": "Estimated reachable audience size",
      "competitiveAdvantage": "How to outperform competitors on this platform"
    },
    {
      "platform": "Secondary platform with growth potential",
      "priority": "Priority level with justification", 
      "reasoning": "Strategic rationale for secondary platform selection",
      "budget": "Allocated budget amount",
      "expectedROI": "Expected return on investment",
      "audienceSize": "Platform-specific audience potential",
      "competitiveAdvantage": "Unique positioning strategy"
    },
    {
      "platform": "Tertiary platform for testing/expansion",
      "priority": "Priority level with justification",
      "reasoning": "Long-term strategic value and testing approach",
      "budget": "Test budget allocation",
      "expectedROI": "Conservative ROI expectations",
      "audienceSize": "Available audience metrics",
      "competitiveAdvantage": "Differentiation strategy"
    }
  ],
  "monthlyPlan": [
    Generate exactly 30 detailed daily content plans, each with:
    {
      "day": 1-30,
      "platform": "Platform optimized for content type and day",
      "contentType": "Specific content format (video, carousel, story, reel, blog, infographic, etc.)",
      "title": "Compelling, specific title that drives engagement for ${formData.targetAudience}",
      "description": "Detailed 2-3 sentence description of content including key messaging, visual elements, and strategic purpose",
      "hashtags": "5-10 industry-relevant hashtags",
      "postTime": "Optimal posting time based on audience behavior",
      "expectedEngagement": "Projected engagement metrics",
      "strategicGoal": "How this content supports overall business objectives"
    }
  ],
  "contentCalendar": [
    Generate 4 weeks of strategic content themes:
    {
      "week": 1,
      "theme": "Strategic theme aligned with customer journey stage",
      "objective": "Specific business objective for this week",
      "content": [
        {"day": 1, "type": "content type", "title": "Specific engaging title", "platform": "optimal platform", "kpi": "success metric"},
        {"day": 3, "type": "content type", "title": "Specific engaging title", "platform": "optimal platform", "kpi": "success metric"},
        {"day": 5, "type": "content type", "title": "Specific engaging title", "platform": "optimal platform", "kpi": "success metric"},
        {"day": 7, "type": "content type", "title": "Specific engaging title", "platform": "optimal platform", "kpi": "success metric"}
      ]
    }
    // Repeat for weeks 2, 3, and 4 with progressive themes
  ],
  "metricOptimization": {
    "conversionRate": {
      "current": "Industry-realistic current rate",
      "target": "Achievable target based on ${formData.industry} benchmarks", 
      "strategy": "Specific 3-step optimization strategy",
      "timeline": "Implementation timeline",
      "expectedImpact": "Quantified improvement projection"
    },
    "cpa": {
      "current": "Current cost per acquisition estimate",
      "target": "Optimized target CPA",
      "strategy": "Detailed cost reduction strategy",
      "timeline": "Optimization timeline", 
      "expectedImpact": "Cost savings projection"
    },
    "roas": {
      "current": "Current return on ad spend",
      "target": "Achievable ROAS target",
      "strategy": "ROI improvement methodology",
      "timeline": "Implementation schedule",
      "expectedImpact": "Revenue increase projection"
    },
    "clickThroughRate": {
      "current": "Industry-standard baseline CTR",
      "target": "Optimized CTR goal",
      "strategy": "Click optimization strategy",
      "timeline": "Testing and implementation plan",
      "expectedImpact": "Traffic increase estimate"
    }
  },
  "competitorInsights": [
    {
      "competitor": "Specific major competitor in ${formData.industry}",
      "marketPosition": "Their current market positioning",
      "strength": "Their primary competitive advantage",
      "opportunity": "Specific gap or weakness to exploit",
      "recommendation": "Detailed strategy to gain competitive advantage",
      "marketShare": "Estimated market share percentage",
      "pricingStrategy": "Their pricing approach",
      "differentiationOpportunity": "How ${formData.businessName} can differentiate"
    },
    {
      "competitor": "Second key competitor analysis",
      "marketPosition": "Their positioning strategy",
      "strength": "What they do well",
      "opportunity": "Exploitable weakness",
      "recommendation": "Competitive response strategy",
      "marketShare": "Market presence estimate",
      "pricingStrategy": "Pricing model analysis",
      "differentiationOpportunity": "Unique positioning angle"
    }
  ],
  "industryInsights": [
    {
      "trend": "Major industry trend #1 impacting ${formData.industry}",
      "impact": "Quantified business impact level (High/Medium/Low)",
      "action": "Specific actionable response strategy",
      "timeline": "Implementation timeline (Q1 2025, Q2 2025, Immediate, etc.)",
      "investmentRequired": "Estimated resource investment",
      "competitiveAdvantage": "How leveraging this trend creates advantage",
      "riskLevel": "Implementation risk assessment"
    },
    {
      "trend": "Emerging opportunity #2 for ${formData.targetAudience}",
      "impact": "Business impact assessment",
      "action": "Strategic implementation plan",
      "timeline": "Execution timeline",
      "investmentRequired": "Required investment estimate",
      "competitiveAdvantage": "Market positioning benefit",
      "riskLevel": "Risk evaluation"
    },
    {
      "trend": "Technology/market shift #3 affecting ${formData.productService}",
      "impact": "Impact on business model",
      "action": "Adaptation strategy",
      "timeline": "Response timeline",
      "investmentRequired": "Investment requirements",
      "competitiveAdvantage": "Strategic advantage potential",
      "riskLevel": "Associated risks"
    }
  ],
  "actionPlans": [
    {
      "week": 1,
      "focus": "Strategic foundation and setup for ${formData.businessName}",
      "objective": "Specific measurable goal for week 1",
      "tasks": [
        "Detailed specific task #1 with clear deliverable",
        "Detailed specific task #2 with timeline and responsibility",
        "Detailed specific task #3 with success metrics"
      ],
      "budget": "Week 1 budget allocation",
      "expectedOutcomes": "Projected results and KPIs",
      "riskMitigation": "Potential risks and mitigation strategies"
    },
    {
      "week": 2,
      "focus": "Content creation and audience engagement for ${formData.targetAudience}",
      "objective": "Week 2 measurable objective",
      "tasks": [
        "Specific content creation task with details",
        "Audience engagement initiative with metrics",
        "Platform optimization task with KPIs"
      ],
      "budget": "Week 2 budget breakdown",
      "expectedOutcomes": "Success metrics and projections",
      "riskMitigation": "Risk management approaches"
    },
    {
      "week": 3,
      "focus": "Campaign optimization and performance enhancement",
      "objective": "Week 3 performance goals",
      "tasks": [
        "Data analysis and optimization task",
        "A/B testing implementation with specifics",
        "Performance tuning with target metrics"
      ],
      "budget": "Week 3 investment allocation",
      "expectedOutcomes": "Optimization results projection",
      "riskMitigation": "Performance risk management"
    },
    {
      "week": 4,
      "focus": "Scaling successful initiatives and future planning",
      "objective": "Week 4 scaling objectives",
      "tasks": [
        "Scaling strategy implementation",
        "Future planning and strategy development",
        "Performance review and next phase preparation"
      ],
      "budget": "Week 4 scaling budget",
      "expectedOutcomes": "Scaling success metrics",
      "riskMitigation": "Scaling risk management"
    }
  ]
}

## CRITICAL REQUIREMENTS:
1. Every recommendation must be specific to ${formData.industry} industry and ${formData.targetAudience}
2. All content must be immediately actionable with clear implementation steps
3. Budget allocations must reflect realistic ${formData.industry} market conditions
4. Competitor insights must reference actual market dynamics in ${formData.industry}
5. Timeline recommendations must align with ${formData.businessName} business model
6. All metrics must be industry-benchmarked and achievable
7. Generate exactly 30 unique, detailed daily content plans in monthlyPlan
8. Ensure all JSON formatting is valid and complete

Generate professional-grade intelligence that provides genuine competitive advantage for ${formData.businessName} in the ${formData.industry} market.`;
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
      },
      {
        type: "social",
        headline: `Why ${formData.targetAudience} Choose ${formData.businessName}`,
        content: `Social media copy highlighting benefits of ${formData.productService}...`,
        cta: "Discover More"
      }
    ],
    platformRecommendations: [
      {
        platform: "Facebook",
        priority: "High",
        reasoning: "Large audience reach and sophisticated targeting options",
        budget: "$800",
        expectedROI: "4.2x"
      },
      {
        platform: "Google Ads",
        priority: "High", 
        reasoning: "High-intent search traffic with immediate results",
        budget: "$600",
        expectedROI: "3.8x"
      },
      {
        platform: "Instagram",
        priority: "Medium",
        reasoning: "Visual content performs well for engagement",
        budget: "$400",
        expectedROI: "3.2x"
      }
    ],
    monthlyPlan: Array.from({length: 30}, (_, i) => ({
      day: i + 1,
      platform: ["Facebook", "Instagram", "Google", "TikTok"][i % 4],
      contentType: ["video", "image", "text", "story"][i % 4],
      title: `Day ${i + 1} Content - ${formData.industry} Focus`,
      description: `Engaging ${["video", "image", "text", "story"][i % 4]} content for ${formData.targetAudience}`
    })),
    contentCalendar: [
      {
        week: 1,
        theme: "Brand Awareness",
        content: [
          { day: 1, type: "video", title: "Company Introduction" },
          { day: 3, type: "blog", title: `${formData.industry} Trends` },
          { day: 5, type: "infographic", title: "Product Benefits" }
        ]
      },
      {
        week: 2,
        theme: "Product Education",
        content: [
          { day: 8, type: "tutorial", title: "How to Use Our Service" },
          { day: 10, type: "case-study", title: "Customer Success Story" },
          { day: 12, type: "comparison", title: "Why Choose Us" }
        ]
      },
      {
        week: 3,
        theme: "Social Proof",
        content: [
          { day: 15, type: "testimonial", title: "Customer Reviews" },
          { day: 17, type: "behind-scenes", title: "Company Culture" },
          { day: 19, type: "user-generated", title: "Customer Spotlights" }
        ]
      },
      {
        week: 4,
        theme: "Conversion Focus",
        content: [
          { day: 22, type: "demo", title: "Product Demonstration" },
          { day: 24, type: "offer", title: "Special Promotion" },
          { day: 26, type: "urgency", title: "Limited Time Offer" }
        ]
      }
    ],
    metricOptimization: {
      conversionRate: { current: "2.1%", target: "3.8%", strategy: "Optimize landing pages and CTAs" },
      cpa: { current: "$45", target: "$32", strategy: "Improve audience targeting" },
      roas: { current: "3.2x", target: "4.8x", strategy: "Focus on high-converting campaigns" },
      clickThroughRate: { current: "1.8%", target: "2.5%", strategy: "A/B test ad creatives" }
    },
    competitorInsights: [
      {
        competitor: "Industry Leader A",
        strength: "Strong brand recognition and market presence",
        opportunity: "Limited personalization in messaging",
        recommendation: "Leverage personalized marketing approach"
      },
      {
        competitor: "Industry Leader B",
        strength: "Competitive pricing strategy",
        opportunity: "Weak customer service reputation", 
        recommendation: "Emphasize superior customer support"
      }
    ],
    industryInsights: [
      {
        trend: "Increased focus on personalization",
        impact: "High",
        action: "Implement dynamic content strategies",
        timeline: "Q1 2025"
      },
      {
        trend: "Video content dominance",
        impact: "High",
        action: "Increase video production by 60%",
        timeline: "Immediate"
      },
      {
        trend: "AI-powered customer service",
        impact: "Medium",
        action: "Integrate chatbot solutions",
        timeline: "Q2 2025"
      }
    ],
    actionPlans: [
      {
        week: 1,
        focus: "Setup & Foundation",
        tasks: [
          "Set up tracking pixels and analytics",
          "Create comprehensive brand guidelines",
          "Launch initial awareness campaigns"
        ]
      },
      {
        week: 2,
        focus: "Content Creation",
        tasks: [
          "Develop video content library",
          "Write educational blog articles",
          "Design social media graphic templates"
        ]
      },
      {
        week: 3,
        focus: "Campaign Optimization",
        tasks: [
          "Analyze performance data and metrics",
          "A/B test ad variations and copy",
          "Optimize targeting parameters"
        ]
      },
      {
        week: 4,
        focus: "Scale & Expand",
        tasks: [
          "Increase successful campaign budgets",
          "Launch retargeting campaigns",
          "Plan next month strategy and goals"
        ]
      }
    ]
  };
}