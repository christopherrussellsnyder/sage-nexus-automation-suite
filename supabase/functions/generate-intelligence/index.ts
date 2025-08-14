
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced configuration for maximum reliability
const CONFIG = {
  MAX_RETRIES: 3, // Increased retries
  BASE_DELAY: 2000, // Increased base delay
  MAX_DELAY: 10000, // Increased max delay
  TIMEOUT: 50000, // Increased to 50 seconds for complex prompts
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
        temperature: 0.2, // Even lower temperature for more consistent JSON
        max_tokens: 2000, // Reduced to ensure faster responses
        stream: false // Ensure non-streaming response
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
  console.log('First 500 chars of AI response:', aiResponse.substring(0, 500));
  
  // Enhanced JSON extraction with multiple fallback strategies
  let cleanedResponse = aiResponse.trim();
  
  // Strategy 1: Try to find complete JSON block
  const jsonBlockMatch = cleanedResponse.match(/```json\s*\n?([\s\S]*?)\n?```/i);
  if (jsonBlockMatch) {
    cleanedResponse = jsonBlockMatch[1].trim();
    console.log('Found JSON block in markdown');
  } else {
    // Strategy 2: Remove markdown formatting
    cleanedResponse = cleanedResponse.replace(/```json\s*\n?/gi, '').replace(/```\s*$/gi, '').trim();
  }
  
  // Strategy 3: Find JSON boundaries more intelligently
  let jsonStart = cleanedResponse.indexOf('{');
  let jsonEnd = -1;
  
  if (jsonStart !== -1) {
    let braceCount = 0;
    for (let i = jsonStart; i < cleanedResponse.length; i++) {
      if (cleanedResponse[i] === '{') braceCount++;
      if (cleanedResponse[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          jsonEnd = i;
          break;
        }
      }
    }
  }
  
  if (jsonStart === -1 || jsonEnd === -1) {
    console.error('No valid JSON structure found, attempting content extraction');
    // Strategy 4: Try to extract content from incomplete response
    return extractContentFromPartialResponse(aiResponse, formData, businessType);
  }
  
  cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
  
  // Enhanced JSON cleaning with better error recovery
  cleanedResponse = cleanedResponse
    .replace(/,\s*}/g, '}')                    // Remove trailing commas in objects
    .replace(/,\s*]/g, ']')                    // Remove trailing commas in arrays
    .replace(/\n/g, ' ')                       // Remove newlines
    .replace(/\t/g, ' ')                       // Remove tabs
    .replace(/\s+/g, ' ')                      // Normalize whitespace
    .replace(/([{,]\s*)"([^"]*)":/g, '$1"$2":') // Fix key formatting
    .replace(/:\s*"([^"]*)"([,}])/g, ': "$1"$2'); // Fix value formatting
  
  try {
    const result = JSON.parse(cleanedResponse);
    console.log('✅ Successfully parsed AI-generated JSON response');
    console.log('AI response sections found:', Object.keys(result));
    
    // Validate all required sections are present and have real data
    const requiredSections = ['budgetStrategy', 'copywritingRecommendations', 'platformRecommendations', 'monthlyPlan', 'contentCalendar', 'metricOptimization', 'competitorInsights', 'industryInsights', 'actionPlans'];
    const missingSections = requiredSections.filter(section => !result[section] || !hasRealContent(result[section]));
    
    if (missingSections.length > 0) {
      console.log(`⚠️ Missing or invalid sections detected: ${missingSections.join(', ')}`);
      return createCompleteResponse(result, formData, businessType, missingSections);
    }
    
    return { ...result, _source: 'ai_generated', _timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('❌ JSON parsing failed:', error.message);
    console.log('Attempting content extraction from malformed response...');
    return extractContentFromPartialResponse(aiResponse, formData, businessType);
  }
};

// New function to extract content from partial/malformed AI responses
const extractContentFromPartialResponse = (aiResponse: string, formData: any, businessType: string) => {
  console.log('🔧 Extracting content from partial AI response...');
  
  const sections = {};
  const text = aiResponse.toLowerCase();
  
  // Try to extract budget information
  const budgetMatch = aiResponse.match(/budget[^{]*{([^}]+)}/i);
  if (budgetMatch) {
    console.log('📊 Found budget content in AI response');
  }
  
  // Try to extract copywriting recommendations
  const copyMatch = aiResponse.match(/copywriting[^[]*\[([^\]]+)\]/i);
  if (copyMatch) {
    console.log('✍️ Found copywriting content in AI response');
  }
  
  // If we found any extractable content, merge with fallback
  const fallback = createFallbackResponse(formData, businessType);
  return { ...fallback, ...sections, _source: 'partial_extraction', _timestamp: new Date().toISOString() };
};

// Helper function to check if content is real or template
const hasRealContent = (section: any): boolean => {
  if (!section) return false;
  
  const sectionStr = JSON.stringify(section).toLowerCase();
  
  // Check for template/placeholder indicators
  const templateIndicators = [
    'lorem ipsum',
    'placeholder',
    'template',
    'example',
    'sample data',
    'coming soon',
    'to be determined',
    'day 1: day 2: day 3',
    'strategic content for',
    'focus advertising budget on platforms where'
  ];
  
  return !templateIndicators.some(indicator => sectionStr.includes(indicator));
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
      console.log(`[${requestId}] Raw request body length:`, rawBody?.length || 0);
      
      if (!rawBody || rawBody.trim() === '') {
        console.error(`[${requestId}] Empty request body received`);
        return new Response(JSON.stringify({ 
          error: 'Empty request body - please ensure data is being sent correctly',
          requestId,
          timestamp: new Date().toISOString()
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      requestData = JSON.parse(rawBody);
      console.log(`[${requestId}] Successfully parsed request data for business:`, requestData?.formData?.businessName || 'Unknown');
    } catch (error) {
      console.error(`[${requestId}] JSON parsing error:`, error.message);
      console.error(`[${requestId}] Raw body sample:`, await req.text().catch(() => 'Could not read body again'));
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON format in request body',
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
  // Enhanced comprehensive marketing intelligence generation
  return `You are an expert marketing strategist and business intelligence analyst. Generate a comprehensive marketing intelligence report for ${formData.businessName}.

CRITICAL REQUIREMENTS:
- Return ONLY valid JSON (no markdown, no explanations)  
- Use specific, actionable data (never generic templates)
- Base ALL recommendations on the business details provided
- Include real metrics, specific strategies, and detailed insights
- Apply all enhanced marketing intelligence criteria below

BUSINESS CONTEXT:
Company: ${formData.businessName}
Industry: ${formData.industry}
Target Audience: ${formData.targetAudience}
Product/Service: ${formData.productService}
Goals: ${formData.goals || 'Growth and market expansion'}
Current Challenges: ${formData.challenges || 'Market competition and customer acquisition'}
Budget Range: ${formData.budget || '$1000-5000/month'}

ENHANCED MARKETING INTELLIGENCE CRITERIA & DATA TO IMPLEMENT:

ADVERTISEMENT GENERATION PRINCIPLES:
- Focus on providing value and solutions rather than directly selling products
- Use the art of selling without customers knowing they're being sold to
- Include compelling testimonials showing real solutions and results
- Create no-brainer offers with clear value propositions
- For e-commerce: recommend order bundles, quantity discounts, and product page bumps
- Find winning angles based on business type and niche to beat competitors
- Look for competitive advantages in pricing, marketing angles, discounts, or unique offers
- Don't reinvent marketing - take proven winning ads and add unique twists
- Provide recommendations for copy, visuals, AND audio elements of advertisements
- Take data from proven winning ads (body, hook, CTA, visuals, ad type) and add unique business-specific twists

EMAIL SEQUENCE OPTIMIZATION:
- Sell the solution and outcomes, not just the product features
- Focus on problem-solving and transformation stories
- Include testimonials showcasing specific solutions provided to customers
- Avoid making customers feel like they're being taken advantage of
- Build trust through value-first messaging
- Emphasize selling the solution the service provides rather than the product itself

PRODUCT RESEARCH CRITERIA (E-commerce specific):
- Prioritize evergreen products with validated markets over trendy items
- Avoid products with significant trend dip-offs
- Evaluate products based on:
  * Does it solve a painful problem?
  * High profit margin potential?
  * Upsell opportunities available?
  * Easy to ship and fulfill?
- Include specific reasoning for why each product is recommended
- Focus on products with long-term viability and improvement potential
- Look for products that are new but have very high potential for being evergreen long-term

WEBSITE COPY STRATEGY DIFFERENCES:
- E-commerce: Value-based content focused on solutions and problems solved, provide maximum value about the product and solutions it solves
- Agency: Sales sequence approach targeting specific problems the agency solves, designed as a sales sequence around the solution
- Emphasize benefits and transformations over features for both

PERFORMANCE METRICS INTEGRATION & BENCHMARKS:

PRIMARY CONVERSION METRICS TARGETS:
- Trial Sign-ups: 2-5% visitor conversion, 15-25% trial-to-paid
- Lead Quality: 5-15% email capture rate
- Session Duration: 2-5 minutes target
- Bounce Rate: <40% target
- Conversion Rate: 2-5% landing page CVR

AD COPY OPTIMIZATION TARGETS:
- Facebook/Instagram CTR: 1-2% (good), 2%+ (excellent)
- Google Search CTR: 3-5% (good), 5%+ (excellent)
- Google Display CTR: 0.5-1% (good), 1%+ (excellent)
- LinkedIn CTR: 0.5-1% (good), 1%+ (excellent)
- TikTok/Snapchat CTR: 1-3% (good), 3%+ (excellent)
- Cost Per Acquisition: <$20-50 for SaaS trial sign-ups
- ROAS: 3:1 minimum, 4-6:1 ideal
- Cost Per Click ranges by platform
- Relevance/Quality Scores: 6-10+ targets

EMAIL MARKETING BENCHMARKS:
- Open Rate: 22-25% for SaaS/marketing tools (good), 25%+ (excellent)
- Click-Through Rate: 3-5% (good), 5%+ (excellent)
- Welcome Series: 50-60% open rate for first email
- Conversion Rate: 1-3% for promotional emails
- Newsletter CTR: 2-4%
- Email Attribution: 15-25% of total revenue
- Unsubscribe Rate: <0.5% per email

SOCIAL MEDIA ENGAGEMENT TARGETS:
- Instagram: 1-3% (good), 3-6% (excellent), 6%+ (viral potential)
- Facebook: 0.5-1% (good), 1-2% (excellent)
- LinkedIn: 2-4% (good), 4-8% (excellent)
- TikTok: 5-9% (good), 9-16% (excellent)
- Twitter: 0.5-1% (good), 1-3% (excellent)
- YouTube: 3-5% (good), 5-10% (excellent)
- Video Completion: 50%+ target
- Story Completion: 70%+ target

WINNING ANGLES RESEARCH CRITERIA:
- Find winning angles based on business type and niche to beat competitors
- Look for competitive advantages in pricing strategies
- Identify unique marketing angles competitors aren't using
- Find specific discount strategies that work for the industry
- Create unique offers that differentiate from competition
- Maximize results through competitive positioning

METRICS FEEDBACK INTEGRATION:
When website copy, ad copy, email marketing, or social media content is lacking in specific metrics, provide optimization recommendations using the benchmark data above. Give specific feedback on best course of action for improvement.

${intelligenceMode === 'copywriting' ? `
COPYWRITING-FOCUSED ANALYSIS:
Focus primarily on copywriting strategies, content creation, and messaging optimization.
Include detailed copy recommendations for different channels and audiences.
Integrate email sequence best practices and persuasive copywriting frameworks.
Apply all copywriting-specific metrics and benchmarks above.
` : ''}

${intelligenceMode === 'marketing' ? `
MARKETING-FOCUSED ANALYSIS:
Focus on marketing channels, campaigns, and growth strategies.
Emphasize platform recommendations and promotional tactics.
Include winning angle research and competitive positioning strategies.
Apply all marketing and advertising metrics above.
` : ''}

${intelligenceMode === 'competitor' ? `
COMPETITOR-FOCUSED ANALYSIS:
Emphasize competitive analysis, market positioning, and differentiation strategies.
Provide detailed insights on outperforming competitors.
Focus on unique value propositions and market gap opportunities.
Include winning angles and competitive advantages.
` : ''}

Generate this complete intelligence report structure with specific, detailed data:

{
  "budgetStrategy": {
    "totalBudget": "Generate realistic budget based on ${formData.budget || '$2000-3000'}",
    "allocation": {
      "advertising": "Calculate % based on ${formData.industry} best practices",
      "content": "Determine % for ${formData.targetAudience} content needs",
      "tools": "Allocate % for ${formData.productService} specific tools",
      "research": "Budget for competitor analysis in ${formData.industry}"
    },
    "monthlyBreakdown": {
      "month1": "Initial setup and testing budget",
      "month2": "Scaling based on performance data",
      "month3": "Full campaign optimization budget"
    },
    "recommendations": [
      "Specific recommendation for ${formData.businessName} advertising in ${formData.industry}",
      "Content strategy budget for reaching ${formData.targetAudience}",
      "Tool recommendations for ${formData.productService} optimization",
      "ROI tracking and analytics budget allocation"
    ],
    "expectedROI": "Calculate realistic ROI for ${formData.industry}",
    "riskMitigation": "Budget protection strategies for ${formData.businessName}"
  },
  "copywritingRecommendations": [
    {
      "type": "email",
      "headline": "Create compelling email subject for ${formData.targetAudience} interested in ${formData.productService}",
      "content": "Write persuasive email content addressing ${formData.targetAudience} pain points and how ${formData.productService} solves them",
      "cta": "Generate action-oriented CTA for ${formData.businessName}",
      "audience": "${formData.targetAudience}",
      "painPoints": "Identify specific pain points for ${formData.targetAudience} in ${formData.industry}",
      "benefits": "List key benefits of ${formData.productService}",
      "urgency": "Create urgency without being pushy",
      "personalization": "Personalization strategies for ${formData.businessName}"
    },
    {
      "type": "advertisement",
      "headline": "Write attention-grabbing ad headline for ${formData.targetAudience}",
      "content": "Create ad copy that highlights ${formData.productService} unique value proposition",
      "cta": "Design conversion-focused CTA",
      "platform": "Optimize for best platform for ${formData.industry}",
      "targeting": "Targeting keywords for ${formData.targetAudience}",
      "emotion": "Emotional triggers for ${formData.industry} audience",
      "competitiveEdge": "Differentiate from competitors in ${formData.industry}"
    },
    {
      "type": "social",
      "headline": "Social media post headline for ${formData.businessName}",
      "content": "Engaging social content showcasing ${formData.productService}",
      "cta": "Social-optimized call to action",
      "hashtags": "Relevant hashtags for ${formData.industry} and ${formData.targetAudience}",
      "engagement": "Engagement strategies for social platforms",
      "visualConcept": "Visual content ideas for ${formData.productService}",
      "postingTimes": "Optimal posting times for ${formData.targetAudience}"
    },
    {
      "type": "website",
      "headline": "Homepage headline for ${formData.businessName}",
      "content": "Website copy that converts ${formData.targetAudience}",
      "cta": "Primary conversion CTA for website",
      "seo": "SEO-optimized content for ${formData.industry}",
      "trustSignals": "Trust-building elements for ${formData.productService}",
      "valueProposition": "Clear value proposition for ${formData.targetAudience}",
      "conversionPath": "User journey optimization for ${formData.businessName}"
    }
  ],
  "platformRecommendations": [
    {
      "platform": "Determine best platform for ${formData.industry} and ${formData.targetAudience}",
      "priority": "Rank based on ${formData.targetAudience} behavior and ${formData.industry} standards",
      "reasoning": "Specific reason why this platform works for ${formData.businessName} targeting ${formData.targetAudience}",
      "budget": "Calculate optimal budget allocation for this platform",
      "expectedROI": "Realistic ROI based on ${formData.industry} benchmarks",
      "audienceSize": "Estimated reach for ${formData.targetAudience} on this platform",
      "contentStrategy": "Platform-specific content strategy for ${formData.productService}",
      "competitiveAnalysis": "How competitors in ${formData.industry} use this platform",
      "timeline": "Implementation timeline for ${formData.businessName}",
      "metrics": "Key metrics to track for ${formData.productService} campaigns"
    },
    {
      "platform": "Second best platform for ${formData.targetAudience}",
      "priority": "Rank appropriately for ${formData.businessName}",
      "reasoning": "Why this platform is valuable for ${formData.industry}",
      "budget": "Budget recommendation based on platform performance",
      "expectedROI": "Realistic ROI expectations for ${formData.targetAudience}",
      "audienceSize": "Target audience size on this platform",
      "contentStrategy": "Content approach for ${formData.productService}",
      "competitiveAnalysis": "Competitor presence and opportunities",
      "timeline": "Launch timeline for ${formData.businessName}",
      "metrics": "Success metrics for ${formData.industry}"
    },
    {
      "platform": "Third platform recommendation",
      "priority": "Appropriate priority level",
      "reasoning": "Strategic value for ${formData.businessName}",
      "budget": "Budget allocation for testing",
      "expectedROI": "Conservative ROI estimate",
      "audienceSize": "Niche audience potential",
      "contentStrategy": "Testing strategy for ${formData.productService}",
      "competitiveAnalysis": "Competitive landscape analysis",
      "timeline": "Testing and evaluation timeline",
      "metrics": "Test metrics and KPIs"
    }
  ],
  "monthlyPlan": [
    {"day": 1, "platform": "Best platform for ${formData.targetAudience}", "contentType": "Optimal content type for ${formData.productService}", "title": "Specific day 1 content for ${formData.businessName}", "objective": "Day 1 marketing objective", "metrics": "Success metrics for day 1"},
    {"day": 3, "platform": "Platform 2", "contentType": "Content type 2", "title": "Day 3 content specific to ${formData.industry}", "objective": "Day 3 objective", "metrics": "Day 3 KPIs"},
    {"day": 5, "platform": "Platform 3", "contentType": "Content type 3", "title": "Day 5 content for ${formData.targetAudience}", "objective": "Day 5 goal", "metrics": "Day 5 measurements"},
    {"day": 7, "platform": "Best performing platform", "contentType": "High-engagement content", "title": "Week 1 recap for ${formData.businessName}", "objective": "Week 1 summary", "metrics": "Week 1 performance"},
    {"day": 10, "platform": "Platform for ${formData.targetAudience}", "contentType": "Educational content", "title": "Day 10 educational content about ${formData.productService}", "objective": "Education objective", "metrics": "Engagement metrics"},
    {"day": 12, "platform": "Second platform", "contentType": "Promotional content", "title": "Day 12 promotion for ${formData.businessName}", "objective": "Promotional goal", "metrics": "Conversion metrics"},
    {"day": 15, "platform": "Visual platform", "contentType": "Visual content", "title": "Mid-month visual content for ${formData.productService}", "objective": "Visual engagement", "metrics": "Visual metrics"},
    {"day": 17, "platform": "Professional platform", "contentType": "Thought leadership", "title": "Day 17 thought leadership in ${formData.industry}", "objective": "Authority building", "metrics": "Authority metrics"},
    {"day": 20, "platform": "Community platform", "contentType": "Community content", "title": "Day 20 community engagement for ${formData.targetAudience}", "objective": "Community building", "metrics": "Community metrics"},
    {"day": 22, "platform": "Primary platform", "contentType": "Success story", "title": "Day 22 success story for ${formData.businessName}", "objective": "Social proof", "metrics": "Credibility metrics"},
    {"day": 25, "platform": "Conversion platform", "contentType": "Call to action", "title": "Day 25 CTA for ${formData.productService}", "objective": "Drive conversions", "metrics": "Conversion rate"},
    {"day": 28, "platform": "Review platform", "contentType": "Month review", "title": "Month-end review for ${formData.businessName}", "objective": "Performance review", "metrics": "Monthly KPIs"},
    {"day": 30, "platform": "Planning platform", "contentType": "Next month preview", "title": "Next month strategy for ${formData.targetAudience}", "objective": "Future planning", "metrics": "Planning metrics"}
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
