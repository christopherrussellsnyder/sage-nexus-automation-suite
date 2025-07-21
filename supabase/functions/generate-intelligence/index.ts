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