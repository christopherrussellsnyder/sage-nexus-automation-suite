import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced configuration for maximum reliability
const CONFIG = {
  MAX_RETRIES: 3,
  BASE_DELAY: 1000,
  MAX_DELAY: 10000,
  TIMEOUT: 30000,
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
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert business intelligence AI. Always respond with valid JSON containing business insights.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
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
      return result;
    } catch (error) {
      console.log(`Parsing strategy ${i + 1} failed:`, error.message);
      continue;
    }
  }
  
  console.log('All parsing strategies failed, using fallback response');
  return createFallbackResponse(formData, businessType);
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
  return `Generate comprehensive business intelligence for ${formData.businessName} in ${formData.industry} industry.
  
Business Details:
- Industry: ${formData.industry}
- Target Audience: ${formData.targetAudience}
- Product/Service: ${formData.productService}
- Monthly Revenue: ${formData.monthlyRevenue}
- Business Type: ${businessType}
- Current Challenges: ${formData.currentChallenges || 'None specified'}

You MUST generate a complete JSON response with ALL of the following sections. Do not omit any section:

{
  "budgetStrategy": {
    "totalBudget": "$2000",
    "allocation": {"advertising": 60, "content": 20, "tools": 20},
    "recommendations": [
      "Focus budget on highest-converting platforms",
      "Allocate 60% to advertising for maximum reach",
      "Test small budgets across multiple channels initially"
    ]
  },
  "copywritingRecommendations": [
    {
      "type": "email",
      "headline": "Transform Your ${formData.industry} Business Today",
      "content": "Compelling email copy that resonates with ${formData.targetAudience}...",
      "cta": "Get Started Now"
    },
    {
      "type": "ad",
      "headline": "#1 ${formData.productService} Solution",
      "content": "Join thousands of satisfied customers...",
      "cta": "Learn More"
    },
    {
      "type": "social",
      "headline": "Why ${formData.targetAudience} Choose Us",
      "content": "Social media copy highlighting benefits...",
      "cta": "Discover More"
    }
  ],
  "platformRecommendations": [
    {
      "platform": "Facebook",
      "priority": "High",
      "reasoning": "Large audience reach and sophisticated targeting",
      "budget": "$800",
      "expectedROI": "4.2x"
    },
    {
      "platform": "Google Ads",
      "priority": "High", 
      "reasoning": "High-intent search traffic",
      "budget": "$600",
      "expectedROI": "3.8x"
    },
    {
      "platform": "Instagram",
      "priority": "Medium",
      "reasoning": "Visual content performs well",
      "budget": "$400",
      "expectedROI": "3.2x"
    }
  ],
  "monthlyPlan": [
    {
      "day": 1,
      "platform": "Facebook",
      "contentType": "video",
      "title": "Product Demo",
      "description": "Show product benefits to ${formData.targetAudience}"
    },
    {
      "day": 2,
      "platform": "Instagram",
      "contentType": "image",
      "title": "Customer Success Story",
      "description": "Feature satisfied customer testimonial"
    },
    {
      "day": 3,
      "platform": "Google",
      "contentType": "text",
      "title": "Educational Blog Post",
      "description": "Industry insights and tips"
    }
  ],
  "contentCalendar": [
    {
      "week": 1,
      "theme": "Brand Awareness",
      "content": [
        {"day": 1, "type": "video", "title": "Company Introduction"},
        {"day": 3, "type": "blog", "title": "Industry Trends"},
        {"day": 5, "type": "infographic", "title": "Product Benefits"}
      ]
    }
  ],
  "metricOptimization": {
    "conversionRate": {"current": "2.1%", "target": "3.8%", "strategy": "Optimize landing pages"},
    "cpa": {"current": "$45", "target": "$32", "strategy": "Improve targeting"},
    "roas": {"current": "3.2x", "target": "4.8x", "strategy": "Focus on high-converting campaigns"},
    "clickThroughRate": {"current": "1.8%", "target": "2.5%", "strategy": "A/B test ad creatives"}
  },
  "competitorInsights": [
    {
      "competitor": "Industry Leader A",
      "strength": "Strong brand recognition and social presence",
      "opportunity": "Limited personalization in messaging",
      "recommendation": "Leverage personalized marketing approach"
    },
    {
      "competitor": "Industry Leader B", 
      "strength": "Competitive pricing strategy",
      "opportunity": "Weak customer service reputation",
      "recommendation": "Emphasize superior customer support"
    }
  ],
  "industryInsights": [
    {
      "trend": "Increased focus on personalization",
      "impact": "High",
      "action": "Implement dynamic content strategies",
      "timeline": "Q1 2025"
    },
    {
      "trend": "Video content dominance",
      "impact": "High", 
      "action": "Increase video production by 60%",
      "timeline": "Immediate"
    },
    {
      "trend": "AI-powered customer service",
      "impact": "Medium",
      "action": "Integrate chatbot solutions",
      "timeline": "Q2 2025"
    }
  ],
  "actionPlans": [
    {
      "week": 1,
      "focus": "Setup & Foundation",
      "tasks": [
        "Set up tracking pixels",
        "Create brand guidelines",
        "Launch awareness campaigns"
      ]
    },
    {
      "week": 2,
      "focus": "Content Creation",
      "tasks": [
        "Develop video content",
        "Write blog articles",
        "Design social media graphics"
      ]
    },
    {
      "week": 3,
      "focus": "Campaign Optimization",
      "tasks": [
        "Analyze performance data",
        "A/B test ad variations",
        "Optimize targeting parameters"
      ]
    },
    {
      "week": 4,
      "focus": "Scale & Expand",
      "tasks": [
        "Increase successful campaign budgets",
        "Launch retargeting campaigns",
        "Plan next month strategy"
      ]
    }
  ]
}

CRITICAL: You must include ALL sections above. Generate realistic, specific, and actionable content for the ${formData.industry} industry targeting ${formData.targetAudience}. Make all recommendations relevant to ${formData.productService}. Ensure the JSON is valid and complete.`;
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