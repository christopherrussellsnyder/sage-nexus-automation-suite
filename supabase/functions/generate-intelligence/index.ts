
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced configuration for maximum reliability
const CONFIG = {
  MAX_RETRIES: 2, // Reduced retries to prevent infinite loops
  BASE_DELAY: 1000,
  MAX_DELAY: 5000,
  TIMEOUT: 25000, // 25 seconds to leave buffer for response processing
  CACHE_TTL: 300000,
};

// In-memory cache for responses
const responseCache = new Map();

console.log('Enhanced intelligence generation function loaded successfully');

// Utility functions
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
    return input.trim().slice(0, 1000);
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
        model: 'gpt-4o-mini', // Using faster, more reliable model
        messages: [
          { 
            role: 'system', 
            content: `You are a business intelligence AI. Generate a comprehensive JSON response with business insights. CRITICAL: Your response must be valid JSON only - no markdown, no code blocks, no extra text. Start with { and end with }. Keep responses concise but complete.` 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3, // Lower temperature for more consistent JSON
        max_tokens: 3000 // Further reduced to ensure faster responses
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      
      if (response.status === 429 && attempt < CONFIG.MAX_RETRIES) {
        const delay = exponentialBackoff(attempt) * 2;
        console.log(`Rate limited, retrying in ${delay}ms...`);
        await sleep(delay);
        return makeOpenAIRequest(prompt, apiKey, attempt + 1);
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
  console.log('Raw AI Response length:', aiResponse.length);
  
  // Clean the response aggressively
  let cleanedResponse = aiResponse.trim();
  
  // Remove all markdown formatting
  cleanedResponse = cleanedResponse.replace(/```json\s*\n?/gi, '').replace(/```\s*$/gi, '').trim();
  cleanedResponse = cleanedResponse.replace(/^[^{]*{/, '{').replace(/}[^}]*$/, '}');
  
  // Extract JSON between first { and last }
  const jsonStart = cleanedResponse.indexOf('{');
  const jsonEnd = cleanedResponse.lastIndexOf('}');
  
  if (jsonStart === -1 || jsonEnd === -1) {
    console.error('No JSON structure found');
    return createFallbackResponse(formData, businessType);
  }
  
  cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
  
  // Fix common JSON issues
  cleanedResponse = cleanedResponse
    .replace(/,\s*}/g, '}')  // Remove trailing commas
    .replace(/,\s*]/g, ']')  // Remove trailing commas in arrays
    .replace(/\n/g, ' ')     // Remove newlines
    .replace(/\t/g, ' ')     // Remove tabs
    .replace(/\s+/g, ' ');   // Normalize whitespace
  
  try {
    const result = JSON.parse(cleanedResponse);
    console.log('Successfully parsed JSON response');
    
    // Fill any missing sections with fallback data
    const fallback = createFallbackResponse(formData, businessType);
    const completeResult = { ...fallback, ...result };
    
    return completeResult;
  } catch (error) {
    console.error('JSON parsing failed completely, using fallback:', error.message);
    return createFallbackResponse(formData, businessType);
  }
};

const createCompleteResponse = (partialResult: any, formData: any, businessType: string, missingSections: string[]) => {
  console.log('Filling missing sections:', missingSections);
  
  const fallback = createFallbackResponse(formData, businessType);
  
  // Merge partial result with fallback data for missing sections
  const completeResult = { ...partialResult };
  
  missingSections.forEach(section => {
    if (fallback[section]) {
      completeResult[section] = fallback[section];
      console.log(`Added fallback data for: ${section}`);
    }
  });
  
  return completeResult;
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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      console.error(`[${requestId}] No OpenAI API key found`);
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured',
        requestId,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[${requestId}] API key validated, processing request...`);
    
    let requestData;
    try {
      const rawBody = await req.text();
      console.log(`[${requestId}] Raw request body length:`, rawBody.length);
      
      if (!rawBody || rawBody.trim() === '') {
        throw new Error('Empty request body');
      }
      
      requestData = JSON.parse(rawBody);
      console.log(`[${requestId}] Successfully parsed request data`);
    } catch (error) {
      console.error(`[${requestId}] Invalid JSON in request:`, error);
      console.error(`[${requestId}] Request body was:`, await req.text().catch(() => 'Could not read body'));
      return new Response(JSON.stringify({ 
        error: 'Invalid request format - please check your request body',
        requestId,
        timestamp: new Date().toISOString(),
        details: error.message
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    validateRequestData(requestData);
    
    const { formData, intelligenceMode, businessType } = requestData;
    
    const sanitizedFormData = {
      ...formData,
      businessName: sanitizeInput(formData.businessName),
      industry: sanitizeInput(formData.industry),
      targetAudience: sanitizeInput(formData.targetAudience),
      productService: sanitizeInput(formData.productService),
    };
    
    console.log(`[${requestId}] Processing for business: ${sanitizedFormData.businessName}, Type: ${businessType}`);

    // Check cache
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
    
    const apiResponse = await makeOpenAIRequest(prompt, OPENAI_API_KEY);
    const aiResponse = apiResponse.choices[0].message.content;
    
    console.log(`[${requestId}] Received AI response, parsing...`);
    
    const intelligenceData = parseAIResponse(aiResponse, sanitizedFormData, businessType);

    // Add metadata
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
    
    console.log(`[${requestId}] Intelligence generation completed successfully in ${Date.now() - startTime}ms`);
    
    return new Response(JSON.stringify(intelligenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(`[${requestId}] Function error after ${processingTime}ms:`, error);
    
    const errorResponse = {
      error: error.message || 'Internal server error',
      requestId,
      timestamp: new Date().toISOString(),
      processingTime,
      retryable: !error.message?.includes('validation')
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createPrompt(formData: any, businessType: string, intelligenceMode: string): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `Generate a comprehensive business intelligence JSON for ${formData.businessName} in the ${formData.industry} industry. 

CRITICAL: Respond ONLY with valid JSON. No markdown, no explanations, no code blocks. Start with { and end with }.

Business Details:
- Company: ${formData.businessName}
- Industry: ${formData.industry}
- Target: ${formData.targetAudience}
- Service: ${formData.productService}
- Revenue: ${formData.monthlyRevenue}/month
- Type: ${businessType}

Generate this exact JSON structure:

{
  "budgetStrategy": {
    "totalBudget": "$2000",
    "allocation": {
      "advertising": 60,
      "content": 20,
      "tools": 20
    },
    "recommendations": [
      "Specific budget recommendation 1 for ${formData.industry}",
      "Specific budget recommendation 2 for ${formData.targetAudience}",
      "Specific budget recommendation 3 for ${formData.productService}"
    ],
    "reasoning": "Industry-specific budget reasoning for ${formData.businessName}"
  },
  "copywritingRecommendations": [
    {
      "type": "email",
      "headline": "Compelling email subject for ${formData.targetAudience}",
      "content": "Complete email copy addressing ${formData.targetAudience} pain points for ${formData.productService}",
      "cta": "Action-oriented CTA",
      "strategicReasoning": "Why this works for ${formData.industry} businesses"
    },
    {
      "type": "ad",
      "headline": "High-converting ad headline for ${formData.targetAudience}",
      "content": "Complete ad copy showcasing ${formData.productService} unique value",
      "cta": "Conversion-optimized CTA",
      "strategicReasoning": "Industry-specific ad strategy explanation"
    },
    {
      "type": "social",
      "headline": "Engaging social media hook for ${formData.targetAudience}",
      "content": "Social media copy driving engagement for ${formData.industry}",
      "cta": "Engagement CTA",
      "strategicReasoning": "Social platform optimization strategy"
    }
  ],
  "platformRecommendations": [
    {
      "platform": "LinkedIn",
      "priority": "High",
      "reasoning": "Platform strategy for ${formData.targetAudience} in ${formData.industry}",
      "budget": "$800",
      "expectedROI": "4.2x",
      "audienceSize": "2M+ targetable users",
      "competitiveAdvantage": "Specific advantage strategy"
    },
    {
      "platform": "Facebook",
      "priority": "Medium",
      "reasoning": "Secondary platform strategy",
      "budget": "$600",
      "expectedROI": "3.5x",
      "audienceSize": "1.5M+ users",
      "competitiveAdvantage": "Facebook-specific strategy"
    }
  ],
  "monthlyPlan": [
    ${Array.from({length: 30}, (_, i) => `{
      "day": ${i + 1},
      "platform": "${['LinkedIn', 'Facebook', 'Instagram', 'Twitter'][i % 4]}",
      "contentType": "${['post', 'video', 'carousel', 'story'][i % 4]}",
      "title": "Day ${i + 1}: ${formData.industry} content for ${formData.targetAudience}",
      "description": "Specific content description for ${formData.productService} targeting ${formData.targetAudience}",
      "hashtags": "#${formData.industry.replace(/\s+/g, '')} #Business #Growth",
      "postTime": "${['09:00', '12:00', '15:00', '18:00'][i % 4]} AM",
      "expectedEngagement": "${Math.floor(Math.random() * 50) + 20}+ interactions",
      "strategicGoal": "Day ${i + 1} business objective"
    }`).join(',\n    ')}
  ],
  "contentCalendar": [
    {
      "week": 1,
      "theme": "Brand Awareness for ${formData.businessName}",
      "objective": "Establish authority in ${formData.industry}",
      "content": [
        {"day": 1, "type": "video", "title": "${formData.businessName} Introduction", "platform": "LinkedIn", "kpi": "Views"},
        {"day": 3, "type": "blog", "title": "${formData.industry} Trends Analysis", "platform": "Website", "kpi": "Reads"},
        {"day": 5, "type": "infographic", "title": "${formData.productService} Benefits", "platform": "Instagram", "kpi": "Shares"},
        {"day": 7, "type": "testimonial", "title": "Client Success Story", "platform": "Facebook", "kpi": "Engagement"}
      ]
    },
    {
      "week": 2,
      "theme": "Education & Value",
      "objective": "Educate ${formData.targetAudience} about ${formData.productService}",
      "content": [
        {"day": 8, "type": "tutorial", "title": "How to Maximize ${formData.productService}", "platform": "YouTube", "kpi": "Watch time"},
        {"day": 10, "type": "case-study", "title": "${formData.industry} Case Study", "platform": "LinkedIn", "kpi": "Comments"},
        {"day": 12, "type": "comparison", "title": "Why Choose ${formData.businessName}", "platform": "Blog", "kpi": "Conversions"},
        {"day": 14, "type": "webinar", "title": "${formData.industry} Expert Talk", "platform": "Zoom", "kpi": "Attendees"}
      ]
    },
    {
      "week": 3,
      "theme": "Social Proof",
      "objective": "Build trust with ${formData.targetAudience}",
      "content": [
        {"day": 15, "type": "reviews", "title": "Client Reviews Showcase", "platform": "Website", "kpi": "Trust score"},
        {"day": 17, "type": "behind-scenes", "title": "${formData.businessName} Culture", "platform": "Instagram", "kpi": "Engagement"},
        {"day": 19, "type": "user-generated", "title": "Customer Spotlights", "platform": "Facebook", "kpi": "Shares"},
        {"day": 21, "type": "awards", "title": "Industry Recognition", "platform": "LinkedIn", "kpi": "Credibility"}
      ]
    },
    {
      "week": 4,
      "theme": "Conversion Focus",
      "objective": "Drive sales for ${formData.productService}",
      "content": [
        {"day": 22, "type": "demo", "title": "${formData.productService} Demo", "platform": "Website", "kpi": "Sign-ups"},
        {"day": 24, "type": "offer", "title": "Special ${formData.businessName} Promotion", "platform": "Email", "kpi": "Sales"},
        {"day": 26, "type": "urgency", "title": "Limited Time Offer", "platform": "All", "kpi": "Conversions"},
        {"day": 28, "type": "consultation", "title": "Free Strategy Call", "platform": "Landing page", "kpi": "Bookings"}
      ]
    }
  ],
  "metricOptimization": {
    "conversionRate": {
      "current": "2.1%",
      "target": "4.5%",
      "strategy": "Optimize landing pages for ${formData.targetAudience}",
      "timeline": "90 days",
      "expectedImpact": "115% improvement"
    },
    "cpa": {
      "current": "$65",
      "target": "$35",
      "strategy": "Improve targeting for ${formData.industry}",
      "timeline": "60 days",
      "expectedImpact": "$30 cost reduction"
    },
    "roas": {
      "current": "3.2x",
      "target": "5.8x",
      "strategy": "Focus on high-converting ${formData.productService} campaigns",
      "timeline": "120 days",
      "expectedImpact": "81% ROAS increase"
    },
    "clickThroughRate": {
      "current": "1.8%",
      "target": "3.2%",
      "strategy": "A/B test ad creatives for ${formData.targetAudience}",
      "timeline": "45 days",
      "expectedImpact": "78% CTR improvement"
    }
  },
  "competitorInsights": [
    {
      "competitor": "Leading ${formData.industry} Company A",
      "marketPosition": "Market leader in ${formData.industry}",
      "strength": "Strong brand recognition",
      "opportunity": "Limited personalization for ${formData.targetAudience}",
      "recommendation": "Leverage personalized approach for ${formData.productService}",
      "marketShare": "25%",
      "pricingStrategy": "Premium pricing",
      "differentiationOpportunity": "Better customer service"
    },
    {
      "competitor": "${formData.industry} Competitor B",
      "marketPosition": "Growing challenger",
      "strength": "Competitive pricing",
      "opportunity": "Weak ${formData.targetAudience} engagement",
      "recommendation": "Superior engagement strategy",
      "marketShare": "15%",
      "pricingStrategy": "Value pricing",
      "differentiationOpportunity": "Enhanced user experience"
    }
  ],
  "industryInsights": [
    {
      "trend": "Digital transformation in ${formData.industry}",
      "impact": "High",
      "action": "Implement digital-first strategy for ${formData.productService}",
      "timeline": "Q2 2025",
      "investmentRequired": "$5,000",
      "competitiveAdvantage": "Early adopter advantage",
      "riskLevel": "Medium"
    },
    {
      "trend": "Increased demand from ${formData.targetAudience}",
      "impact": "High",
      "action": "Scale ${formData.productService} offerings",
      "timeline": "Q1 2025",
      "investmentRequired": "$3,000",
      "competitiveAdvantage": "Market share growth",
      "riskLevel": "Low"
    }
  ],
  "actionPlans": [
    {
      "week": 1,
      "focus": "Foundation setup for ${formData.businessName}",
      "objective": "Establish tracking and analytics",
      "tasks": [
        "Set up conversion tracking for ${formData.productService}",
        "Create brand guidelines for ${formData.industry}",
        "Launch awareness campaigns targeting ${formData.targetAudience}"
      ],
      "budget": "$500",
      "expectedOutcomes": "20% increase in brand awareness",
      "riskMitigation": "Test small budgets first"
    },
    {
      "week": 2,
      "focus": "Content creation for ${formData.targetAudience}",
      "objective": "Develop content library",
      "tasks": [
        "Create ${formData.industry} educational content",
        "Develop ${formData.productService} case studies",
        "Design social media templates"
      ],
      "budget": "$400",
      "expectedOutcomes": "30+ content pieces created",
      "riskMitigation": "Focus on evergreen content"
    },
    {
      "week": 3,
      "focus": "Campaign optimization",
      "objective": "Improve performance metrics",
      "tasks": [
        "A/B test ad creatives for ${formData.targetAudience}",
        "Optimize landing pages for ${formData.productService}",
        "Refine audience targeting"
      ],
      "budget": "$600",
      "expectedOutcomes": "25% improvement in CTR",
      "riskMitigation": "Monitor daily and adjust quickly"
    },
    {
      "week": 4,
      "focus": "Scale successful initiatives",
      "objective": "Increase budget on winning campaigns",
      "tasks": [
        "Scale top-performing ${formData.productService} ads",
        "Expand to new platforms",
        "Plan next month strategy"
      ],
      "budget": "$500",
      "expectedOutcomes": "40% increase in conversions",
      "riskMitigation": "Gradual budget increases"
    }
  ]
}`;
}

function createFallbackResponse(formData: any, businessType: string) {
  return {
    budgetStrategy: {
      totalBudget: "$2000",
      allocation: { advertising: 60, content: 20, tools: 20 },
      recommendations: [
        `Focus advertising budget on platforms where ${formData.targetAudience} are most active`,
        `Invest in content creation that showcases ${formData.productService} expertise`,
        `Allocate tools budget for automation and analytics in ${formData.industry}`
      ],
      reasoning: `Budget strategy optimized for ${formData.businessName} in ${formData.industry} targeting ${formData.targetAudience}`
    },
    copywritingRecommendations: [
      {
        type: "email",
        headline: `Transform Your ${formData.industry} Results with ${formData.businessName}`,
        content: `Discover how ${formData.productService} can help ${formData.targetAudience} achieve better outcomes. Our proven approach has helped businesses like yours succeed.`,
        cta: "Get Started Today",
        strategicReasoning: `Email strategy focused on ${formData.targetAudience} pain points and ${formData.productService} benefits`
      },
      {
        type: "ad",
        headline: `#1 ${formData.productService} for ${formData.targetAudience}`,
        content: `Join successful ${formData.industry} businesses who trust ${formData.businessName}. See results fast with our proven ${formData.productService}.`,
        cta: "Learn More Now",
        strategicReasoning: `Ad copy designed to attract ${formData.targetAudience} with social proof and urgency`
      },
      {
        type: "social",
        headline: `Why ${formData.targetAudience} Choose ${formData.businessName}`,
        content: `Discover the ${formData.productService} that's helping ${formData.industry} businesses thrive. Join our community today.`,
        cta: "See Success Stories",
        strategicReasoning: `Social content optimized for engagement with ${formData.targetAudience}`
      }
    ],
    platformRecommendations: [
      {
        platform: "LinkedIn",
        priority: "High",
        reasoning: `LinkedIn is ideal for reaching ${formData.targetAudience} in ${formData.industry}`,
        budget: "$800",
        expectedROI: "4.2x",
        audienceSize: "2M+ professionals",
        competitiveAdvantage: "Professional networking and thought leadership"
      },
      {
        platform: "Facebook",
        priority: "Medium",
        reasoning: `Facebook offers broad reach for ${formData.targetAudience} with detailed targeting`,
        budget: "$600",
        expectedROI: "3.5x",
        audienceSize: "1.8M+ users",
        competitiveAdvantage: "Advanced targeting and retargeting capabilities"
      }
    ],
    monthlyPlan: Array.from({length: 30}, (_, i) => ({
      day: i + 1,
      platform: ["LinkedIn", "Facebook", "Instagram", "Twitter"][i % 4],
      contentType: ["post", "video", "image", "story"][i % 4],
      title: `Day ${i + 1}: ${formData.industry} Content Strategy`,
      description: `Strategic content for ${formData.targetAudience} focusing on ${formData.productService}`,
      hashtags: `#${formData.industry.replace(/\s+/g, '')} #Business #Growth`,
      postTime: ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"][i % 4],
      expectedEngagement: `${20 + (i % 30)}+ interactions`,
      strategicGoal: `Build awareness and engagement for ${formData.businessName}`
    })),
    contentCalendar: [
      {
        week: 1,
        theme: `${formData.businessName} Brand Introduction`,
        objective: `Establish presence in ${formData.industry}`,
        content: [
          { day: 1, type: "video", title: "Company Introduction", platform: "LinkedIn", kpi: "Views" },
          { day: 3, type: "blog", title: `${formData.industry} Insights`, platform: "Website", kpi: "Reads" },
          { day: 5, type: "infographic", title: `${formData.productService} Benefits`, platform: "Instagram", kpi: "Shares" },
          { day: 7, type: "testimonial", title: "Client Success", platform: "Facebook", kpi: "Engagement" }
        ]
      },
      {
        week: 2,
        theme: "Educational Content",
        objective: `Educate ${formData.targetAudience}`,
        content: [
          { day: 8, type: "tutorial", title: `How to Use ${formData.productService}`, platform: "YouTube", kpi: "Watch time" },
          { day: 10, type: "case-study", title: `${formData.industry} Success Story`, platform: "LinkedIn", kpi: "Comments" },
          { day: 12, type: "comparison", title: "Why Choose Us", platform: "Blog", kpi: "Conversions" },
          { day: 14, type: "webinar", title: "Expert Discussion", platform: "Zoom", kpi: "Attendees" }
        ]
      },
      {
        week: 3,
        theme: "Social Proof",
        objective: "Build trust and credibility",
        content: [
          { day: 15, type: "reviews", title: "Customer Reviews", platform: "Website", kpi: "Trust" },
          { day: 17, type: "behind-scenes", title: "Company Culture", platform: "Instagram", kpi: "Engagement" },
          { day: 19, type: "user-generated", title: "Customer Stories", platform: "Facebook", kpi: "Shares" },
          { day: 21, type: "awards", title: "Recognition", platform: "LinkedIn", kpi: "Credibility" }
        ]
      },
      {
        week: 4,
        theme: "Conversion Focus",
        objective: "Drive sales and leads",
        content: [
          { day: 22, type: "demo", title: "Product Demo", platform: "Website", kpi: "Sign-ups" },
          { day: 24, type: "offer", title: "Special Promotion", platform: "Email", kpi: "Sales" },
          { day: 26, type: "urgency", title: "Limited Offer", platform: "All", kpi: "Conversions" },
          { day: 28, type: "consultation", title: "Free Consultation", platform: "Landing page", kpi: "Bookings" }
        ]
      }
    ],
    metricOptimization: {
      conversionRate: { current: "2.1%", target: "4.0%", strategy: "Optimize for conversions", timeline: "90 days", expectedImpact: "90% improvement" },
      cpa: { current: "$50", target: "$30", strategy: "Improve targeting", timeline: "60 days", expectedImpact: "$20 reduction" },
      roas: { current: "3.2x", target: "5.0x", strategy: "Focus on high-converting campaigns", timeline: "120 days", expectedImpact: "56% increase" },
      clickThroughRate: { current: "1.8%", target: "2.8%", strategy: "A/B test creatives", timeline: "45 days", expectedImpact: "56% improvement" }
    },
    competitorInsights: [
      {
        competitor: `${formData.industry} Leader A`,
        marketPosition: "Market leader",
        strength: "Brand recognition",
        opportunity: "Limited innovation",
        recommendation: "Leverage innovative approach",
        marketShare: "25%",
        pricingStrategy: "Premium",
        differentiationOpportunity: "Better customer service"
      },
      {
        competitor: `${formData.industry} Company B`,
        marketPosition: "Growing competitor",
        strength: "Competitive pricing",
        opportunity: "Weak customer support",
        recommendation: "Focus on superior support",
        marketShare: "15%",
        pricingStrategy: "Value-based",
        differentiationOpportunity: "Enhanced user experience"
      }
    ],
    industryInsights: [
      {
        trend: `Digital transformation in ${formData.industry}`,
        impact: "High",
        action: "Implement digital strategy",
        timeline: "Q2 2025",
        investmentRequired: "$5,000",
        competitiveAdvantage: "First-mover advantage",
        riskLevel: "Medium"
      },
      {
        trend: `Growing demand from ${formData.targetAudience}`,
        impact: "High",
        action: "Scale service offerings",
        timeline: "Q1 2025",
        investmentRequired: "$3,000",
        competitiveAdvantage: "Market expansion",
        riskLevel: "Low"
      }
    ],
    actionPlans: [
      {
        week: 1,
        focus: "Setup and Foundation",
        objective: "Establish tracking systems",
        tasks: [
          "Set up analytics and tracking",
          "Create brand guidelines",
          "Launch initial campaigns"
        ],
        budget: "$500",
        expectedOutcomes: "Foundation established",
        riskMitigation: "Start with small tests"
      },
      {
        week: 2,
        focus: "Content Development",
        objective: "Create content library",
        tasks: [
          "Develop educational content",
          "Create case studies",
          "Design templates"
        ],
        budget: "$400",
        expectedOutcomes: "30+ content pieces",
        riskMitigation: "Focus on evergreen content"
      },
      {
        week: 3,
        focus: "Optimization",
        objective: "Improve performance",
        tasks: [
          "A/B test campaigns",
          "Optimize landing pages",
          "Refine targeting"
        ],
        budget: "$600",
        expectedOutcomes: "25% performance improvement",
        riskMitigation: "Daily monitoring"
      },
      {
        week: 4,
        focus: "Scaling",
        objective: "Scale successful campaigns",
        tasks: [
          "Increase winning campaign budgets",
          "Expand to new platforms",
          "Plan next phase"
        ],
        budget: "$500",
        expectedOutcomes: "40% increase in results",
        riskMitigation: "Gradual scaling"
      }
    ]
  };
}
