
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

    // Create comprehensive structured prompt for OpenAI with specific examples
    const systemPrompt = `You are an expert business intelligence AI that provides comprehensive marketing and business insights. You MUST respond with a valid JSON object that includes ALL required sections with specific, actionable data. Do not use placeholder text or generic examples - all data must be tailored to the specific business provided.`;
    
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
    
    You MUST provide a structured JSON response with ALL of these sections filled with specific, actionable data for ${formData.businessName}:

    {
      "generatedAt": "${new Date().toISOString()}",
      "intelligenceMode": "${intelligenceMode}",
      "businessType": "${businessType}",
      "formData": ${JSON.stringify(formData)},
      "budgetStrategy": {
        "recommendedStrategy": "Specific strategy based on ${formData.monthlyRevenue} revenue and ${businessType} business model",
        "monthlyBudgetAllocation": {
          "primaryPlatform": "60% ($X,XXX) - [Platform Name] with reasoning",
          "secondaryPlatform": "30% ($X,XXX) - [Platform Name] with reasoning", 
          "testing": "10% ($XXX) - A/B testing and optimization budget"
        },
        "expectedROAS": "4.2",
        "targetCPM": "15.50",
        "reasoning": "Detailed explanation of why this strategy works for ${formData.businessName} in ${formData.industry}"
      },
      "platformRecommendations": [
        {
          "platform": "Facebook Ads",
          "priority": 1,
          "score": 88,
          "reasoning": "Specific reasoning for ${formData.businessName} targeting ${formData.targetAudience}",
          "expectedMetrics": {
            "roas": 4.2,
            "cpm": 12.50,
            "conversionRate": 3.8
          },
          "budgetAllocation": 45
        },
        {
          "platform": "Google Ads",
          "priority": 2,
          "score": 82,
          "reasoning": "Search intent alignment with ${formData.productService}",
          "expectedMetrics": {
            "roas": 3.8,
            "cpm": 18.75,
            "conversionRate": 4.2
          },
          "budgetAllocation": 35
        },
        {
          "platform": "LinkedIn Ads",
          "priority": 3,
          "score": 74,
          "reasoning": "B2B targeting for ${formData.industry} industry",
          "expectedMetrics": {
            "roas": 3.2,
            "cpm": 28.50,
            "conversionRate": 2.8
          },
          "budgetAllocation": 20
        }
      ],
      "monthlyPlan": [
        {
          "day": 1,
          "platform": "Facebook",
          "contentType": "ad",
          "hook": "Attention ${formData.targetAudience}: ${formData.uniqueValue}",
          "body": "Specific body content addressing ${formData.currentChallenges || 'pain points'} for ${formData.businessName}",
          "cta": "Get Started Today",
          "visualSuggestion": "High-quality image showing ${formData.productService} in action",
          "targetAudience": "${formData.targetAudience}",
          "keyMessage": "Core value proposition messaging",
          "expectedMetrics": {
            "reach": 5000,
            "engagement": 250,
            "cost": 45,
            "conversions": 12
          },
          "strategicReasoning": "Day 1 launch builds initial awareness for ${formData.businessName}"
        },
        {
          "day": 2,
          "platform": "Google",
          "contentType": "ad",
          "hook": "Best ${formData.productService} for ${formData.targetAudience}",
          "body": "Search-focused content highlighting ${formData.uniqueValue}",
          "cta": "Learn More",
          "visualSuggestion": "Product showcase or service demonstration",
          "targetAudience": "High-intent searchers",
          "keyMessage": "Solution-focused messaging",
          "expectedMetrics": {
            "reach": 3000,
            "engagement": 180,
            "cost": 55,
            "conversions": 15
          },
          "strategicReasoning": "Capitalize on search intent for ${formData.productService}"
        }
      ],
      "metricOptimization": [
        {
          "metric": "Conversion Rate",
          "currentBenchmark": "2.3%",
          "targetBenchmark": "4.1%", 
          "improvementStrategies": [
            "Optimize landing page for ${formData.targetAudience}",
            "A/B test CTA buttons and forms",
            "Implement social proof for ${formData.businessName}",
            "Streamline checkout process for ${formData.productService}"
          ],
          "timeline": "8-12 weeks",
          "expectedROI": "78% increase in conversions"
        },
        {
          "metric": "Cost Per Acquisition (CPA)",
          "currentBenchmark": "$85",
          "targetBenchmark": "$62", 
          "improvementStrategies": [
            "Refine audience targeting for ${formData.targetAudience}",
            "Improve ad relevance scores",
            "Optimize bidding strategies for ${formData.industry}",
            "Enhanced negative keyword lists"
          ],
          "timeline": "6-10 weeks",
          "expectedROI": "27% reduction in acquisition costs"
        }
      ],
      "competitorInsights": [
        {
          "competitor": "Primary Competitor in ${formData.industry}",
          "strengths": [
            "Strong brand recognition in ${formData.industry}",
            "Established customer base",
            "Higher marketing budget allocation"
          ],
          "weaknesses": [
            "Limited focus on ${formData.targetAudience}",
            "Outdated messaging compared to ${formData.uniqueValue}",
            "Poor mobile experience"
          ],
          "opportunities": [
            "Capitalize on their weak ${formData.targetAudience} targeting",
            "Highlight ${formData.uniqueValue} advantage",
            "Target their dissatisfied customers"
          ],
          "strategicRecommendations": [
            "Position ${formData.businessName} as the modern alternative",
            "Focus ad spend on competitor's weak platforms",
            "Create comparison content highlighting ${formData.uniqueValue}"
          ]
        }
      ],
      "copywritingRecommendations": [
        {
          "copyType": "website",
          "recommendations": [
            "Lead with ${formData.uniqueValue} in headline",
            "Address ${formData.currentChallenges || 'customer pain points'} directly",
            "Use industry-specific language for ${formData.industry}",
            "Include social proof and testimonials"
          ],
          "examples": [
            {
              "before": "We provide services",
              "after": "${formData.businessName}: ${formData.uniqueValue} for ${formData.targetAudience}",
              "improvement": "Specific value proposition instead of generic statement"
            }
          ],
          "emotionalTriggers": [
            "Trust and credibility",
            "Fear of missing out",
            "Success and achievement",
            "Problem-solution fit"
          ]
        },
        {
          "copyType": "ads",
          "recommendations": [
            "Hook with ${formData.targetAudience}-specific pain points",
            "Highlight ${formData.uniqueValue} benefits",
            "Include specific results or outcomes",
            "Strong, action-oriented CTAs"
          ],
          "examples": [
            {
              "before": "Try our product today",
              "after": "Finally, ${formData.productService} that ${formData.uniqueValue} - Get Started",
              "improvement": "Specific benefit-focused CTA"
            }
          ],
          "emotionalTriggers": [
            "Urgency and scarcity",
            "Frustration relief",
            "Desire for improvement",
            "Social acceptance"
          ]
        }
      ],
      "industryInsights": [
        {
          "trend": "Growing demand in ${formData.industry} for ${formData.productService}",
          "impact": "Increased opportunity for ${formData.businessName}",
          "actionableAdvice": "Scale marketing efforts to capture market share",
          "timeline": "Next 6-12 months"
        }
      ]
    }

    CRITICAL: Generate SPECIFIC data for ${formData.businessName}. Replace ALL placeholder text with actual recommendations, metrics, and strategies. Do not use generic examples.
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
      
      // Ensure all required fields are present with defaults
      intelligenceData.generatedAt = new Date().toISOString();
      intelligenceData.intelligenceMode = intelligenceMode;
      intelligenceData.businessType = businessType;
      intelligenceData.formData = formData;
      
      // Validate that key sections exist
      if (!intelligenceData.budgetStrategy) {
        intelligenceData.budgetStrategy = {
          recommendedStrategy: `Focus on digital marketing for ${formData.businessName}`,
          monthlyBudgetAllocation: {
            primaryPlatform: "50% - Primary platform allocation",
            secondaryPlatform: "30% - Secondary platform allocation",
            testing: "20% - Testing and optimization"
          },
          expectedROAS: "3.5",
          targetCPM: "20.00"
        };
      }
      
      // Ensure arrays exist
      intelligenceData.platformRecommendations = intelligenceData.platformRecommendations || [];
      intelligenceData.monthlyPlan = intelligenceData.monthlyPlan || [];
      intelligenceData.metricOptimization = intelligenceData.metricOptimization || [];
      intelligenceData.competitorInsights = intelligenceData.competitorInsights || [];
      intelligenceData.copywritingRecommendations = intelligenceData.copywritingRecommendations || [];
      intelligenceData.industryInsights = intelligenceData.industryInsights || [];
      
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.log('Raw AI response:', aiResponse);
      
      // Create structured fallback with actual business data
      intelligenceData = {
        generatedAt: new Date().toISOString(),
        intelligenceMode: intelligenceMode,
        businessType: businessType,
        formData: formData,
        budgetStrategy: {
          recommendedStrategy: `AI-generated strategy for ${formData.businessName} in ${formData.industry}`,
          monthlyBudgetAllocation: {
            primaryPlatform: "50% - Facebook/Meta advertising",
            secondaryPlatform: "30% - Google Ads",
            testing: "20% - Testing and optimization"
          },
          expectedROAS: "3.8",
          targetCPM: "18.50"
        },
        platformRecommendations: [
          {
            platform: "Facebook Ads",
            priority: 1,
            score: 85,
            reasoning: `Optimal for reaching ${formData.targetAudience} in ${formData.industry}`,
            expectedMetrics: { roas: 3.8, cpm: 15.25, conversionRate: 3.2 },
            budgetAllocation: 50
          }
        ],
        monthlyPlan: [
          {
            day: 1,
            platform: "Facebook",
            contentType: "ad",
            hook: `Transform your ${formData.productService} experience`,
            body: `Discover why ${formData.businessName} is the choice for ${formData.targetAudience}`,
            cta: "Get Started Today",
            visualSuggestion: "Professional product showcase",
            targetAudience: formData.targetAudience,
            keyMessage: formData.uniqueValue,
            expectedMetrics: { reach: 5000, engagement: 200, cost: 50, conversions: 10 },
            strategicReasoning: "Initial awareness campaign launch"
          }
        ],
        metricOptimization: [
          {
            metric: "Conversion Rate",
            currentBenchmark: "2.1%",
            targetBenchmark: "3.8%",
            improvementStrategies: [
              `Optimize landing pages for ${formData.targetAudience}`,
              "Improve call-to-action placement",
              "A/B test form fields and checkout process"
            ],
            timeline: "8-12 weeks",
            expectedROI: "65% improvement in conversions"
          }
        ],
        competitorInsights: [
          {
            competitor: `Main competitor in ${formData.industry}`,
            strengths: ["Established market presence", "Brand recognition"],
            weaknesses: ["Limited digital presence", "Outdated messaging"],
            opportunities: [`Better targeting of ${formData.targetAudience}`, "Modern digital approach"],
            strategicRecommendations: [`Position ${formData.businessName} as innovative alternative`]
          }
        ],
        copywritingRecommendations: [
          {
            copyType: "website",
            recommendations: [
              `Highlight ${formData.uniqueValue} prominently`,
              `Address specific needs of ${formData.targetAudience}`,
              "Use clear, benefit-focused headlines"
            ],
            examples: [
              {
                before: "We offer services",
                after: `${formData.businessName} delivers ${formData.uniqueValue}`,
                improvement: "Specific value proposition"
              }
            ],
            emotionalTriggers: ["Trust", "Success", "Problem-solving"]
          }
        ],
        industryInsights: [
          {
            trend: `Growing market demand in ${formData.industry}`,
            impact: `Opportunity for ${formData.businessName} growth`,
            actionableAdvice: "Increase marketing investment to capture market share",
            timeline: "Next 6 months"
          }
        ],
        aiGeneratedContent: aiResponse,
        fullAIResponse: aiResponse,
        parseError: 'Structured fallback used due to JSON parsing issue'
      };
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
