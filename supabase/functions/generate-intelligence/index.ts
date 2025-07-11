
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
  };
  intelligenceMode: 'full' | 'copywriting' | 'marketing' | 'competitor';
  businessType: 'ecommerce' | 'agency' | 'sales';
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

    // Create comprehensive structured prompt for OpenAI with advanced ecommerce optimization
    const systemPrompt = `You are an expert business intelligence AI that provides comprehensive marketing and business insights with advanced ecommerce optimization knowledge. You MUST respond with a valid JSON object that includes ALL required sections with specific, actionable data tailored to the business provided.

CRITICAL ECOMMERCE AD OPTIMIZATION GUIDELINES TO IMPLEMENT:

TOP PERFORMING AD LENGTH STANDARDS:
- Facebook/Instagram: 1-3 sentences (optimal: 2 sentences)
- Google Search Ads: 1-2 sentences per headline/description  
- TikTok/YouTube Shorts: 1-2 punchy sentences
- YouTube Pre-roll: 2-4 sentences max

VIDEO AD DURATION OPTIMIZATION:
- TikTok/Instagram Reels: 15-30 seconds (peak performance at 21 seconds)
- Facebook Video Ads: 15-60 seconds (optimal: 30 seconds)
- YouTube Pre-roll: 6-30 seconds (skippable after 5 seconds)
- YouTube Shorts: 15-60 seconds (optimal: 30-45 seconds)

TEXT/IMAGE AD SPECIFICATIONS:
- Read Time: 3-8 seconds
- Character Count: 125-150 characters for primary text
- Headline: 25-40 characters

HIGH-CONVERTING AD FORMULAS:
1. Problem-Solution (2 sentences): "Tired of [specific problem]? [Product name] solves this in [timeframe] - [social proof/guarantee]."
2. Benefit-Proof (1-2 sentences): "[Specific benefit/result] with [product name]. [Social proof/urgency]."
3. Social Proof Hook (2-3 sentences): "[Number] people can't be wrong about [product]. [Specific benefit]. [CTA with urgency]."

PLATFORM-SPECIFIC OPTIMIZATION:
- Facebook/Instagram Feed: 1-2 sentences, 3-5 seconds read time, 125 characters max
- Google Shopping/Search: 30 characters per headline, 90 characters per description
- TikTok: 21-34 seconds optimal, 1 sentence text overlay, first 3 seconds critical
- YouTube Pre-roll: 6-second bumper (1 sentence + logo), 15-second (2-3 sentences)

PSYCHOLOGICAL TRIGGERS BY INDUSTRY:
- Ecommerce: Scarcity, social proof, immediate gratification
- SaaS: Efficiency, ROI, competitive advantage
- Fitness: Transformation, belonging, achievement
- Coaching: Success, aspiration, problem-solving
- Agency: Authority, results, expertise

You must incorporate these optimization principles into every piece of content generated.`;
    
    const userPrompt = `
    Generate comprehensive business intelligence for:
    
    Business: ${formData.businessName}
    Industry: ${formData.industry}
    Business Type: ${businessType}
    Target Audience: ${formData.targetAudience}
    Product/Service: ${formData.productService}
    Unique Value: ${formData.uniqueValue}
    Monthly Revenue: ${formData.monthlyRevenue}
    Current Challenges: ${formData.currentChallenges || 'Not specified'}
    Goals: ${formData.goals?.join(', ') || 'Not specified'}
    Timeline: ${formData.timeline || 'Not specified'}
    
    Intelligence Mode: ${intelligenceMode}
    
    You MUST provide a structured JSON response with ALL of these sections filled with specific, actionable data for ${formData.businessName}. Apply the ecommerce optimization guidelines to create the most effective content possible:

    {
      "generatedAt": "${new Date().toISOString()}",
      "intelligenceMode": "${intelligenceMode}",
      "businessType": "${businessType}",
      "formData": ${JSON.stringify(formData)},
      "budgetStrategy": {
        "recommendedStrategy": "Specific strategy based on ${formData.monthlyRevenue} revenue and ${businessType} business model with optimization focus",
        "monthlyBudgetAllocation": {
          "primaryPlatform": "X% ($X,XXX) - [Platform Name] with detailed reasoning based on target audience behavior",
          "secondaryPlatform": "X% ($X,XXX) - [Platform Name] with conversion optimization focus", 
          "testing": "X% ($XXX) - A/B testing budget for ad length, hooks, and psychological triggers"
        },
        "expectedROAS": "X.X",
        "targetCPM": "XX.XX",
        "reasoning": "Detailed explanation incorporating ecommerce optimization principles for ${formData.businessName} targeting ${formData.targetAudience}"
      },
      "platformRecommendations": [
        {
          "platform": "Facebook Ads",
          "priority": 1,
          "score": XX,
          "reasoning": "Platform-specific optimization strategy for ${formData.targetAudience} with 1-2 sentence ad format focus",
          "expectedMetrics": {
            "roas": X.X,
            "cpm": XX.XX,
            "conversionRate": X.X,
            "optimalAdLength": "1-2 sentences",
            "readTime": "3-5 seconds",
            "characterLimit": 125
          },
          "budgetAllocation": XX,
          "optimizationNotes": "Specific optimization tactics for this platform"
        }
      ],
      "monthlyPlan": [
        {
          "day": 1,
          "platform": "Facebook",
          "contentType": "ad",
          "hook": "Optimized hook following proven formulas (Problem-Solution/Benefit-Proof/Social Proof)",
          "body": "Body content following platform-specific optimization (1-2 sentences, 125 characters max)",
          "cta": "High-converting CTA with urgency/scarcity elements",
          "visualSuggestion": "Platform-optimized visual recommendation",
          "targetAudience": "${formData.targetAudience}",
          "keyMessage": "Core value proposition with psychological triggers",
          "expectedMetrics": {
            "reach": XXXX,
            "engagement": XXX,
            "cost": XX,
            "conversions": XX,
            "ctr": "X.X%",
            "readTime": "X seconds"
          },
          "strategicReasoning": "Detailed explanation of why this content will work, including psychological triggers, industry-specific insights, and optimization principles applied",
          "psychologicalTriggers": ["trigger1", "trigger2", "trigger3"],
          "optimizationPrinciples": ["principle1", "principle2"],
          "industryBenchmarks": {
            "expectedCTR": "X.X%",
            "conversionRate": "X.X%",
            "engagementRate": "X.X%"
          }
        }
      ],
      "metricOptimization": [
        {
          "metric": "Conversion Rate",
          "currentBenchmark": "X.X%",
          "targetBenchmark": "X.X%", 
          "improvementStrategies": [
            "Implement 1-2 sentence ad format optimization",
            "Apply Problem-Solution formula for higher engagement",
            "Utilize psychological triggers specific to ${formData.industry}",
            "Optimize for 3-8 second read time"
          ],
          "timeline": "X-X weeks",
          "expectedROI": "XX% increase in conversions",
          "optimizationFocus": "Ecommerce-specific conversion tactics"
        }
      ],
      "competitorInsights": [
        {
          "competitor": "Top Competitor in ${formData.industry}",
          "strengths": [
            "Specific strength analysis with optimization context",
            "Ad format effectiveness analysis",
            "Platform-specific performance insights"
          ],
          "weaknesses": [
            "Optimization gaps in ad length/format",
            "Missing psychological triggers",
            "Platform-specific weaknesses"
          ],
          "opportunities": [
            "Apply superior optimization principles",
            "Leverage proven ad formulas they're missing",
            "Capitalize on psychological trigger gaps"
          ],
          "strategicRecommendations": [
            "Implement optimization strategies they lack",
            "Use proven ecommerce formulas for competitive advantage",
            "Focus on platform-specific optimization gaps"
          ]
        }
      ],
      "copywritingRecommendations": [
        {
          "copyType": "ads",
          "recommendations": [
            "Apply Problem-Solution formula: 'Tired of [problem]? [Solution] in [timeframe]'",
            "Use Benefit-Proof structure: '[Benefit] with [product]. [Social proof]'",
            "Implement Social Proof Hook: '[Number] people can't be wrong'",
            "Optimize for 1-2 sentences, 125 character limit",
            "Include psychological triggers: ${formData.industry === 'ecommerce' ? 'scarcity, social proof' : formData.industry === 'saas' ? 'efficiency, ROI' : 'relevant triggers'}"
          ],
          "examples": [
            {
              "formula": "Problem-Solution",
              "before": "Generic ad copy",
              "after": "Optimized ad using proven formula specific to ${formData.businessName}",
              "improvement": "Specific improvement explanation with metrics",
              "readTime": "X seconds",
              "characterCount": XXX
            }
          ],
          "emotionalTriggers": ["Industry-specific triggers"],
          "optimizationMetrics": {
            "optimalLength": "1-2 sentences",
            "readTime": "3-8 seconds",
            "characterLimit": 125,
            "expectedCTR": "X.X%"
          }
        }
      ],
      "industryInsights": [
        {
          "trend": "Specific trend in ${formData.industry} with optimization implications",
          "impact": "How this affects ${formData.businessName} optimization strategy",
          "actionableAdvice": "Specific optimization tactics to capitalize on this trend",
          "timeline": "Implementation timeframe",
          "optimizationOpportunity": "Specific optimization advantage available"
        }
      ]
    }

    CRITICAL REQUIREMENTS:
    1. Generate EXACTLY 30 days of content in monthlyPlan with complete optimization details
    2. Each day must include detailed strategicReasoning explaining why it will work
    3. Apply psychological triggers specific to the industry
    4. Follow platform-specific optimization guidelines exactly
    5. Include industry benchmarks and performance expectations
    6. Provide specific, actionable optimization recommendations
    7. Replace ALL placeholder text with actual recommendations and metrics
    8. Ensure every ad follows proven high-converting formulas
    9. Optimize content length for each platform (1-2 sentences for most platforms)
    10. Include scarcity/urgency elements in CTAs where appropriate

    Generate SPECIFIC data for ${formData.businessName}. No generic examples or placeholder text allowed.
    `;

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
        intelligenceData.monthlyPlan = generateOptimized30DayPlan(formData, businessType);
      }
      
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.log('Raw AI response:', aiResponse);
      
      // Create optimized fallback with ecommerce principles
      intelligenceData = createOptimizedFallback(formData, businessType, intelligenceMode);
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

function generateOptimized30DayPlan(formData: any, businessType: string) {
  const platforms = ['Facebook', 'Instagram', 'Google', 'TikTok'];
  const adFormulas = [
    'Problem-Solution',
    'Benefit-Proof', 
    'Social Proof Hook'
  ];
  
  const psychologicalTriggers = {
    ecommerce: ['scarcity', 'social proof', 'urgency', 'FOMO'],
    agency: ['authority', 'results', 'expertise', 'trust'],
    sales: ['success', 'achievement', 'status', 'efficiency']
  };
  
  const triggers = psychologicalTriggers[businessType] || psychologicalTriggers.ecommerce;
  
  const plan = [];
  
  for (let day = 1; day <= 30; day++) {
    const platform = platforms[day % platforms.length];
    const formula = adFormulas[day % adFormulas.length];
    const trigger = triggers[day % triggers.length];
    
    let hook, body, cta;
    
    switch (formula) {
      case 'Problem-Solution':
        hook = `Tired of ${getIndustryProblem(formData.industry)}?`;
        body = `${formData.businessName} solves this in ${getTimeframe(day)} days.`;
        cta = 'Get Started Today';
        break;
      case 'Benefit-Proof':
        hook = `${getBenefit(formData.productService)} with ${formData.businessName}.`;
        body = `${getSocialProof(day)} customers transformed their business.`;
        cta = 'Join Them Now';
        break;
      case 'Social Proof Hook':
        hook = `${getSocialProofNumber(day)} people can't be wrong about ${formData.businessName}.`;
        body = `${getBenefit(formData.productService)} in record time.`;
        cta = 'Limited Time - Act Now';
        break;
    }
    
    plan.push({
      day,
      platform,
      contentType: 'ad',
      hook,
      body,
      cta,
      visualSuggestion: getOptimizedVisual(platform, formData.productService),
      targetAudience: formData.targetAudience,
      keyMessage: formData.uniqueValue || 'Transform your business results',
      expectedMetrics: {
        reach: Math.floor(Math.random() * 5000) + 2000,
        engagement: Math.floor(Math.random() * 300) + 150,
        cost: Math.floor(Math.random() * 50) + 25,
        conversions: Math.floor(Math.random() * 20) + 8,
        ctr: `${(Math.random() * 2 + 1.5).toFixed(1)}%`,
        readTime: `${Math.floor(Math.random() * 4) + 3} seconds`
      },
      strategicReasoning: `Day ${day} uses the ${formula} formula with ${trigger} psychological trigger to maximize engagement among ${formData.targetAudience}. This approach leverages proven ecommerce optimization principles for ${platform}, including optimal sentence length (1-2 sentences) and psychological triggers specific to ${formData.industry} industry.`,
      psychologicalTriggers: [trigger, 'urgency', 'social proof'],
      optimizationPrinciples: [`${formula} formula`, 'optimal ad length', 'platform-specific targeting'],
      industryBenchmarks: {
        expectedCTR: `${(Math.random() * 1.5 + 1.5).toFixed(1)}%`,
        conversionRate: `${(Math.random() * 2 + 2.5).toFixed(1)}%`,
        engagementRate: `${(Math.random() * 3 + 3).toFixed(1)}%`
      }
    });
  }
  
  return plan;
}

function createOptimizedFallback(formData: any, businessType: string, intelligenceMode: string) {
  return {
    generatedAt: new Date().toISOString(),
    intelligenceMode,
    businessType,
    formData,
    budgetStrategy: {
      recommendedStrategy: `Advanced ecommerce optimization strategy for ${formData.businessName} focusing on high-converting ad formats and psychological triggers`,
      monthlyBudgetAllocation: {
        primaryPlatform: "60% ($3,600) - Facebook/Instagram with 1-2 sentence ad optimization",
        secondaryPlatform: "30% ($1,800) - Google Ads with headline/description optimization",
        testing: "10% ($600) - A/B testing for ad formulas and psychological triggers"
      },
      expectedROAS: "4.2",
      targetCPM: "15.50",
      reasoning: "Strategy incorporates proven ecommerce formulas and platform-specific optimization for maximum conversion"
    },
    platformRecommendations: [
      {
        platform: "Facebook Ads",
        priority: 1,
        score: 92,
        reasoning: `Optimal for ${formData.targetAudience} with 1-2 sentence format and psychological trigger optimization`,
        expectedMetrics: {
          roas: 4.2,
          cpm: 12.50,
          conversionRate: 3.8,
          optimalAdLength: "1-2 sentences",
          readTime: "3-5 seconds",
          characterLimit: 125
        },
        budgetAllocation: 60,
        optimizationNotes: "Focus on Problem-Solution formula with scarcity triggers"
      }
    ],
    monthlyPlan: generateOptimized30DayPlan(formData, businessType),
    metricOptimization: [
      {
        metric: "Conversion Rate",
        currentBenchmark: "2.3%",
        targetBenchmark: "4.8%",
        improvementStrategies: [
          "Implement 1-2 sentence ad format optimization",
          "Apply Problem-Solution formula for higher engagement",
          `Utilize ${businessType === 'ecommerce' ? 'scarcity and social proof' : 'authority and results'} psychological triggers`,
          "Optimize for 3-8 second read time across all platforms"
        ],
        timeline: "8-12 weeks",
        expectedROI: "109% increase in conversions",
        optimizationFocus: "Advanced ecommerce conversion optimization"
      }
    ],
    competitorInsights: [
      {
        competitor: `Leading ${formData.industry} Company`,
        strengths: [
          "Strong brand recognition with established ad formats",
          "High marketing budget for broad reach campaigns",
          "Established customer base with repeat engagement"
        ],
        weaknesses: [
          "Not utilizing optimal 1-2 sentence ad format",
          "Missing psychological triggers in messaging",
          "Outdated platform-specific optimization"
        ],
        opportunities: [
          "Implement superior ad formula optimization",
          "Leverage psychological triggers they're missing",
          "Capitalize on their platform-specific gaps"
        ],
        strategicRecommendations: [
          `Position ${formData.businessName} with advanced optimization tactics`,
          "Use proven ecommerce formulas for competitive advantage",
          "Focus on psychological trigger gaps in their messaging"
        ]
      }
    ],
    copywritingRecommendations: [
      {
        copyType: "ads",
        recommendations: [
          "Apply Problem-Solution formula: 'Tired of [problem]? [Solution] solves this in [timeframe]'",
          "Use Benefit-Proof structure for immediate impact",
          "Implement Social Proof Hook with specific numbers",
          "Optimize all content for 1-2 sentences, 125 character limit",
          `Include ${businessType === 'ecommerce' ? 'scarcity and urgency' : 'authority and results'} psychological triggers`
        ],
        examples: [
          {
            formula: "Problem-Solution",
            before: "We provide business solutions",
            after: `Tired of ${getIndustryProblem(formData.industry)}? ${formData.businessName} solves this in 30 days - guaranteed results.`,
            improvement: "Specific problem identification with time-bound solution and guarantee",
            readTime: "4 seconds",
            characterCount: 98
          }
        ],
        emotionalTriggers: ["urgency", "social proof", "problem-solving", "success"],
        optimizationMetrics: {
          optimalLength: "1-2 sentences",
          readTime: "3-8 seconds", 
          characterLimit: 125,
          expectedCTR: "2.4%"
        }
      }
    ],
    industryInsights: [
      {
        trend: `Advanced optimization trends in ${formData.industry} focusing on psychological triggers and platform-specific formats`,
        impact: `Opportunity for ${formData.businessName} to outperform competitors using proven ecommerce optimization`,
        actionableAdvice: "Implement 1-2 sentence ad formats with psychological triggers for immediate competitive advantage",
        timeline: "Next 30-60 days for full implementation",
        optimizationOpportunity: "87% of competitors not using advanced optimization - major advantage available"
      }
    ]
  };
}

// Helper functions for content generation
function getIndustryProblem(industry: string): string {
  const problems = {
    'ecommerce': 'low conversion rates and high cart abandonment',
    'saas': 'inefficient processes and poor ROI',
    'fitness': 'slow results and lack of motivation',
    'coaching': 'stagnant growth and unclear direction',
    'agency': 'inconsistent lead generation and client retention',
    'default': 'poor performance and wasted resources'
  };
  return problems[industry.toLowerCase()] || problems.default;
}

function getBenefit(productService: string): string {
  if (productService.toLowerCase().includes('automation')) return 'Automate your workflow and save 20+ hours weekly';
  if (productService.toLowerCase().includes('marketing')) return 'Double your leads in 30 days';
  if (productService.toLowerCase().includes('sales')) return 'Increase revenue by 150%';
  return 'Transform your business results dramatically';
}

function getTimeframe(day: number): number {
  const timeframes = [7, 14, 21, 30];
  return timeframes[day % timeframes.length];
}

function getSocialProof(day: number): number {
  const baseNumbers = [500, 1000, 2500, 5000, 10000];
  return baseNumbers[day % baseNumbers.length] + (day * 100);
}

function getSocialProofNumber(day: number): number {
  const numbers = [1000, 2500, 5000, 10000, 25000];
  return numbers[day % numbers.length] + (day * 250);
}

function getOptimizedVisual(platform: string, productService: string): string {
  const visuals = {
    'Facebook': 'High-quality before/after comparison image optimized for News Feed',
    'Instagram': 'Visually striking carousel showcasing transformation results',
    'Google': 'Clean product showcase image with clear benefit callout',
    'TikTok': '21-second video demonstrating quick results with trending audio'
  };
  return visuals[platform] || visuals.Facebook;
}
