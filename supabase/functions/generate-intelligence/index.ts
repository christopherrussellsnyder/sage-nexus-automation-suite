
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
    competitors?: any[];
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
    console.log('=== INTELLIGENCE GENERATION EDGE FUNCTION CALLED ===');
    
    // Enhanced API key validation
    if (!openAIApiKey || openAIApiKey.trim() === '' || openAIApiKey === 'your-openai-api-key-here') {
      console.error('OpenAI API key validation failed:', {
        exists: !!openAIApiKey,
        length: openAIApiKey?.length || 0,
        isPlaceholder: openAIApiKey === 'your-openai-api-key-here'
      });
      
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not properly configured',
        details: 'Please ensure a valid OpenAI API key is set in the OPENAI_API_KEY secret in Supabase Edge Functions settings.',
        configurationRequired: true
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const request: IntelligenceRequest = await req.json();
    const { formData, intelligenceMode, businessType } = request;

    console.log('Processing intelligence request:', {
      businessName: formData.businessName,
      industry: formData.industry,
      intelligenceMode: intelligenceMode,
      businessType: businessType,
      hasTargetAudience: !!formData.targetAudience,
      hasProductService: !!formData.productService,
      hasCompetitors: formData.competitors?.length > 0,
      monthlyBudget: formData.monthlyAdBudget || 'Not specified'
    });

    // Enhanced validation
    const requiredFields = ['businessName', 'industry', 'targetAudience'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return new Response(JSON.stringify({ 
        error: 'Missing required business information',
        details: `The following fields are required: ${missingFields.join(', ')}`,
        missingFields: missingFields
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Enhanced and optimized prompt for maximum data generation
    const intelligencePrompt = `
You are an elite business intelligence strategist and data analyst. Generate a comprehensive, actionable intelligence report with MAXIMUM detail and specificity.

BUSINESS CONTEXT:
- Company: ${formData.businessName}
- Industry: ${formData.industry}
- Business Model: ${businessType}
- Target Market: ${formData.targetAudience}
- Product/Service: ${formData.productService || 'Various services'}
- Unique Value: ${formData.uniqueValue || 'Quality and reliability'}
- Monthly Revenue: ${formData.monthlyRevenue || 'Growing'}
- Monthly Ad Budget: ${formData.monthlyAdBudget || '$5,000'}
- Current Challenges: ${formData.currentChallenges || 'Growth and lead generation'}
- Primary Goals: ${Array.isArray(formData.primaryGoals) ? formData.primaryGoals.join(', ') : formData.goals || 'Increase revenue and market share'}
- Competitors: ${formData.competitors?.length > 0 ? formData.competitors.map(c => c.name).join(', ') : 'Various industry players'}

CRITICAL REQUIREMENT: You MUST generate ALL 7 sections with rich, specific, actionable data. Each section must contain multiple detailed entries.

RESPONSE STRUCTURE - Generate EXACTLY this JSON structure with NO markdown, NO code blocks, PURE JSON ONLY:

{
  "platformRecommendations": [
    {
      "platform": "Facebook",
      "priority": 1,
      "reasoning": "Primary platform for ${formData.targetAudience} in ${formData.industry} with excellent targeting capabilities and proven ROI for ${businessType} businesses",
      "expectedMetrics": {
        "roas": 4.2,
        "cpm": 12.50,
        "cpc": 1.85,
        "conversionRate": 3.8,
        "estimatedReach": 45000,
        "expectedLeads": 180
      },
      "budgetAllocation": 35,
      "targetingParameters": {
        "demographics": "Age 25-54, ${formData.targetAudience} with household income $50K+, college-educated professionals",
        "interests": ["${formData.industry} solutions", "Business efficiency", "Professional development", "${formData.productService}"],
        "behaviors": ["Small business owners", "Frequent online buyers", "Technology early adopters", "B2B decision makers"],
        "customAudiences": ["Website visitors", "Email subscribers", "Lookalike from best customers", "Video viewers 75%+"],
        "locations": ["United States", "Canada", "Major metropolitan areas", "Business districts"]
      },
      "adFormats": ["Video testimonials", "Carousel showcases", "Dynamic retargeting", "Lead generation forms"],
      "contentStrategy": ["Problem-aware hooks", "Social proof stories", "Solution demonstrations", "Urgency-driven CTAs"]
    },
    {
      "platform": "LinkedIn",
      "priority": 2,
      "reasoning": "Essential for B2B targeting in ${formData.industry}, reaching decision-makers and influencers directly",
      "expectedMetrics": {
        "roas": 3.8,
        "cpm": 18.75,
        "cpc": 4.25,
        "conversionRate": 2.9,
        "estimatedReach": 28000,
        "expectedLeads": 95
      },
      "budgetAllocation": 25,
      "targetingParameters": {
        "jobTitles": ["CEO", "COO", "VP Operations", "Business Development", "Marketing Director", "${formData.industry} Manager"],
        "industries": ["${formData.industry}", "Professional Services", "Technology", "Consulting", "Manufacturing"],
        "companySizes": ["11-50 employees", "51-200 employees", "201-1000 employees"],
        "skills": ["${formData.productService}", "Business Strategy", "Operations Management", "Digital Transformation"],
        "seniority": ["Director", "VP", "C-level", "Owner", "Partner"]
      },
      "adFormats": ["Sponsored content", "Message ads", "Event promotion", "Document downloads"],
      "contentStrategy": ["Industry insights", "Executive thought leadership", "Case study highlights", "ROI calculators"]
    },
    {
      "platform": "Google Ads",
      "priority": 3,
      "reasoning": "Capture highest-intent traffic searching for ${formData.productService} and ${formData.industry} solutions",
      "expectedMetrics": {
        "roas": 5.1,
        "cpm": 25.00,
        "cpc": 3.50,
        "conversionRate": 4.2,
        "estimatedReach": 35000,
        "expectedLeads": 210
      },
      "budgetAllocation": 30,
      "targetingParameters": {
        "keywords": ["${formData.productService}", "${formData.industry} solutions", "${formData.businessName}", "best ${formData.industry} company", "${formData.targetAudience} services"],
        "audiences": ["In-market for business services", "Custom intent ${formData.industry}", "Similar audiences", "Remarketing lists"],
        "locations": ["United States", "Canada", "Target metro areas", "Exclude rural areas"],
        "devices": ["Desktop priority", "Mobile optimized", "Tablet secondary"],
        "scheduling": ["Business hours focus", "Weekday emphasis", "Peak performance times"]
      },
      "adFormats": ["Search ads", "Display remarketing", "YouTube video ads", "Shopping campaigns"],
      "contentStrategy": ["High-intent keywords", "Competitive comparisons", "Local service emphasis", "Immediate response CTAs"]
    },
    {
      "platform": "Instagram",
      "priority": 4,
      "reasoning": "Visual storytelling for ${formData.businessName} brand building and engagement with younger ${formData.targetAudience}",
      "expectedMetrics": {
        "roas": 3.2,
        "cpm": 15.25,
        "cpc": 2.10,
        "conversionRate": 3.1,
        "estimatedReach": 32000,
        "expectedLeads": 85
      },
      "budgetAllocation": 10,
      "targetingParameters": {
        "interests": ["${formData.industry}", "Business improvement", "Entrepreneurship", "Professional growth", "${formData.productService}"],
        "hashtags": ["#${formData.industry.replace(/\s+/g, '')}", "#BusinessGrowth", "#${formData.businessName.replace(/\s+/g, '')}", "#ProfessionalServices"],
        "influencers": ["Micro-influencers in ${formData.industry}", "Business coaches", "Industry thought leaders"],
        "contentTypes": ["Stories", "Reels", "IGTV", "Carousel posts"]
      },
      "adFormats": ["Story ads", "Reel advertisements", "Collection showcases", "User-generated content"],
      "contentStrategy": ["Behind-the-scenes", "Client success stories", "Quick tips and tricks", "Industry trends"]
    }
  ],
  "monthlyPlan": [
    ${Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const platforms = ['Facebook', 'LinkedIn', 'Instagram', 'Google Ads', 'TikTok', 'YouTube'];
      const platform = platforms[day % platforms.length];
      const contentTypes = [
        'Problem-aware hook targeting immediate pain points',
        'Solution demonstration with clear benefits',
        'Social proof featuring client testimonials',
        'Urgency/scarcity driving immediate action',
        'Value proposition highlighting unique advantages',
        'Educational content building authority',
        'Behind-the-scenes building trust',
        'Industry insights establishing expertise'
      ];
      const contentType = contentTypes[day % contentTypes.length];
      const hooks = [
        `Are ${formData.targetAudience} in ${formData.industry} losing money due to inefficient processes?`,
        `This ${formData.industry} breakthrough is transforming how ${formData.targetAudience} operate`,
        `Why ${formData.businessName} outperforms traditional ${formData.industry} solutions by 300%`,
        `${formData.targetAudience} who use ${formData.productService} see average 40% improvement`,
        `Warning: ${formData.industry} businesses without ${formData.productService} risk falling behind`,
        `Case Study: How ${formData.businessName} helped a ${formData.industry} client increase revenue`,
        `The #1 mistake ${formData.targetAudience} make when choosing ${formData.industry} solutions`,
        `Limited Time: Special offer for ${formData.targetAudience} ready to transform their business`
      ];
      
      return `{
        "day": ${day},
        "platform": "${platform}",
        "contentType": "${day % 2 === 0 ? 'paid_ad' : 'organic_content'}",
        "hook": "${hooks[day % hooks.length]}",
        "body": "Discover how ${formData.businessName} revolutionizes ${formData.industry} operations for ${formData.targetAudience}. Our proven ${formData.productService} methodology has helped ${Math.floor(Math.random() * 500) + 100}+ clients achieve measurable results. Don't let your competitors get ahead - see why industry leaders choose ${formData.businessName} for sustainable growth and operational excellence.",
        "cta": "${['Book Free Strategy Call', 'Get Instant Quote', 'Start Free Consultation', 'Download Industry Guide', 'Schedule Live Demo', 'Claim Limited Discount', 'Access Case Studies', 'Join Exclusive Webinar'][day % 8]}",
        "expectedMetrics": {
          "reach": ${Math.floor(Math.random() * 20000) + 8000},
          "engagement": ${Math.floor(Math.random() * 1200) + 400},
          "cost": ${Math.floor(Math.random() * 300) + 100},
          "conversions": ${Math.floor(Math.random() * 35) + 12},
          "ctr": ${(Math.random() * 3 + 1).toFixed(2)},
          "cpm": ${(Math.random() * 20 + 10).toFixed(2)}
        },
        "strategicReasoning": "Day ${day} targets ${['awareness building', 'consideration nurturing', 'conversion optimization', 'retention focus'][day % 4]} with ${contentType.toLowerCase()} to maximize ${platform} algorithm performance",
        "psychologicalTriggers": ["${['Social proof', 'Authority', 'Scarcity', 'Reciprocity', 'Commitment', 'Consistency', 'Liking'][day % 7]}"],
        "targetAudience": "Segment ${day % 4 + 1}: ${formData.targetAudience} ${['new prospects discovering solutions', 'engaged leads comparing options', 'ready buyers seeking providers', 'existing clients for retention'][day % 4]}",
        "contentPillars": ["${['Educational', 'Inspirational', 'Promotional', 'Community'][day % 4]}"],
        "keyMessage": "${['Transform your business', 'Proven results guaranteed', 'Industry leader trusted', 'Limited time opportunity'][day % 4]}",
        "callToActionType": "${['Lead generation', 'Direct response', 'Awareness building', 'Engagement driving'][day % 4]}"
      }`;
    }).join(',\n    ')}
  ],
  "budgetStrategy": [
    {
      "category": "Digital Advertising Investment",
      "monthlyBudget": ${parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000')},
      "allocation": [
        {
          "platform": "Facebook",
          "percentage": 35,
          "amount": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.35)},
          "reasoning": "Highest volume targeting precision for ${formData.targetAudience} with proven conversion rates in ${formData.industry}",
          "expectedROI": "4.2x return generating $${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.35 * 4.2)} revenue",
          "keyMetrics": {
            "estimatedLeads": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.35 / 25)},
            "costPerLead": 25,
            "conversionRate": "3.8%",
            "averageOrderValue": 450
          }
        },
        {
          "platform": "Google Ads",
          "percentage": 30,
          "amount": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.30)},
          "reasoning": "Highest-intent traffic with superior conversion rates for ${formData.productService} searches",
          "expectedROI": "5.1x return generating $${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.30 * 5.1)} revenue",
          "keyMetrics": {
            "estimatedLeads": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.30 / 20)},
            "costPerLead": 20,
            "conversionRate": "4.2%",
            "averageOrderValue": 520
          }
        },
        {
          "platform": "LinkedIn",
          "percentage": 25,
          "amount": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.25)},
          "reasoning": "Premium B2B targeting reaching ${businessType} decision makers and ${formData.industry} executives",
          "expectedROI": "3.8x return generating $${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.25 * 3.8)} revenue",
          "keyMetrics": {
            "estimatedLeads": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.25 / 35)},
            "costPerLead": 35,
            "conversionRate": "2.9%",
            "averageOrderValue": 680
          }
        },
        {
          "platform": "Instagram",
          "percentage": 10,
          "amount": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.10)},
          "reasoning": "Brand awareness and visual storytelling for ${formData.businessName} targeting younger ${formData.targetAudience}",
          "expectedROI": "3.2x return generating $${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.10 * 3.2)} revenue",
          "keyMetrics": {
            "estimatedLeads": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') * 0.10 / 30)},
            "costPerLead": 30,
            "conversionRate": "3.1%",
            "averageOrderValue": 380
          }
        }
      ],
      "optimizationStrategy": "Start with 70% budget on highest-performing platforms (Facebook, Google), scale winners after 14 days of data collection",
      "riskMitigation": "Diversified spend prevents single-platform dependency, automated bid adjustments based on performance",
      "scalingPlan": "Increase budget by 20% monthly on platforms exceeding 4x ROAS, reduce by 15% on underperformers",
      "seasonalAdjustments": "Increase budget by 30% during Q4, reduce by 10% during Q1, adjust for industry-specific peak periods"
    }
  ],
  "copywritingRecommendations": [
    {
      "copyType": "Executive Decision Maker Outreach",
      "awarenessStageVariations": {
        "unaware": "Are ${formData.targetAudience} in ${formData.industry} missing 40% revenue opportunities due to outdated processes?",
        "problemAware": "Tired of ${formData.currentChallenges || 'inefficient operations'} costing your ${formData.industry} business thousands monthly?",
        "solutionAware": "Why ${formData.businessName}'s ${formData.productService} outperforms traditional ${formData.industry} solutions by 300%",
        "productAware": "${formData.businessName} delivers results other ${formData.industry} providers can't match - here's documented proof",
        "mostAware": "Ready to implement? ${formData.businessName} guarantees measurable results in 30 days or full money back"
      },
      "emotionalTriggers": ["Fear of missing out on growth", "Social proof from industry leaders", "Authority through expertise", "Urgency from market changes", "Reciprocity through value-first approach"],
      "psychologicalFrameworks": ["Problem-Agitation-Solution", "Before-After-Bridge", "AIDA with social proof", "PAS with urgency", "Hero's Journey narrative"],
      "industrySpecificAngles": [
        "${formData.industry} businesses waste average $${Math.floor(Math.random() * 50000) + 15000} annually on inefficient processes",
        "Top ${formData.industry} companies use ${formData.productService} to maintain competitive advantage",
        "New ${formData.industry} regulations make ${formData.productService} essential for compliance and growth",
        "${formData.targetAudience} who don't adopt ${formData.productService} risk losing 25% market share",
        "Industry leaders report 40% efficiency gains after implementing ${formData.businessName} solutions"
      ],
      "conversionOptimization": {
        "headlines": ["Transform Your ${formData.industry} Business in 30 Days", "The ${formData.productService} Solution ${formData.targetAudience} Trust Most", "Why ${formData.businessName} Guarantees Results Others Can't"],
        "subheadlines": ["Proven system used by 500+ ${formData.industry} companies", "Get measurable results or your money back", "Join the ${formData.targetAudience} seeing 40% growth"],
        "bulletPoints": ["Reduce operational costs by 30%", "Increase efficiency within 14 days", "Full support and implementation", "Risk-free guarantee"]
      }
    },
    {
      "copyType": "Social Media Engagement Content",
      "awarenessStageVariations": {
        "unaware": "This ${formData.industry} secret could transform your business overnight",
        "problemAware": "Stop struggling with ${formData.currentChallenges || 'common pain points'} - there's a proven better way",
        "solutionAware": "Compare: ${formData.businessName} vs traditional ${formData.industry} approaches - the difference is remarkable",
        "productAware": "See why smart ${formData.targetAudience} choose ${formData.businessName} over expensive alternatives",
        "mostAware": "Limited spots available: Get ${formData.businessName} with exclusive implementation bonuses"
      },
      "contentFormats": ["Video testimonials from real clients", "Before/after transformation case studies", "Behind-the-scenes process reveals", "Educational carousel posts", "Live Q&A sessions"],
      "engagementHooks": ["Question-based openings that demand responses", "Controversial industry statements", "Personal founder stories", "Insider industry insights", "Myth-busting content"],
      "platformSpecific": {
        "Facebook": ["Long-form storytelling", "Community building", "Live video demonstrations"],
        "LinkedIn": ["Professional insights", "Industry thought leadership", "B2B case studies"],
        "Instagram": ["Visual storytelling", "Story highlights", "Reel tutorials"],
        "TikTok": ["Quick tips", "Behind-the-scenes", "Trending audio adaptations"]
      }
    },
    {
      "copyType": "Email Marketing Sequences",
      "awarenessStageVariations": {
        "unaware": "Subject: The ${formData.industry} trend that's changing everything",
        "problemAware": "Subject: Still dealing with ${formData.currentChallenges || 'these common issues'}?",
        "solutionAware": "Subject: ${formData.businessName} vs [Competitor] - honest comparison",
        "productAware": "Subject: Your ${formData.businessName} questions answered",
        "mostAware": "Subject: Ready to get started? Here's what happens next"
      },
      "sequenceStrategy": ["Welcome & expectation setting", "Problem identification & education", "Solution introduction", "Social proof & testimonials", "Objection handling", "Limited-time offer", "Final call to action"],
      "personalizationTactics": ["Industry-specific examples", "Role-based messaging", "Behavioral triggers", "Geographic customization", "Company size adjustments"]
    }
  ],
  "metricOptimization": [
    {
      "metric": "Lead Conversion Rate",
      "currentBenchmark": ${formData.conversionRate || (Math.random() * 3 + 1).toFixed(1)},
      "industryAverage": ${formData.industry?.toLowerCase().includes('saas') ? '4.2' : formData.industry?.toLowerCase().includes('ecommerce') ? '2.8' : '3.5'},
      "targetBenchmark": ${((formData.conversionRate || 2.1) * 1.6).toFixed(1)},
      "gapAnalysis": "Current rate ${formData.conversionRate || '2.1'}% vs industry standard ${formData.industry?.toLowerCase().includes('saas') ? '4.2' : '3.5'}% - opportunity for ${(((formData.conversionRate || 2.1) * 1.6) - (formData.conversionRate || 2.1)).toFixed(1)}% improvement",
      "improvementStrategies": [
        "Implement ${formData.industry}-specific landing page optimization with heat mapping analysis",
        "Add social proof section featuring ${formData.targetAudience} testimonials and case studies",
        "A/B test ${formData.productService} value proposition messaging across 5 variations",
        "Create urgency elements with limited-time offers specifically for ${formData.businessName}",
        "Optimize form fields reducing friction for ${formData.targetAudience} preferences",
        "Implement exit-intent popups with special offers",
        "Add live chat for immediate question resolution",
        "Create mobile-first responsive design optimization"
      ],
      "expectedImprovement": "Increase to ${((formData.conversionRate || 2.1) * 1.6).toFixed(1)}% within 60-90 days through systematic optimization",
      "implementationTimeline": "Phase 1: Landing page optimization (Week 1-2), Phase 2: Social proof integration (Week 3-4), Phase 3: A/B testing campaign (Week 5-8), Phase 4: Advanced personalization (Week 9-12)",
      "measurementPlan": "Daily conversion tracking, weekly cohort analysis, monthly ROI assessment, quarterly strategy review"
    },
    {
      "metric": "Customer Acquisition Cost (CAC)",
      "currentBenchmark": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') / 50)},
      "industryAverage": ${formData.industry?.toLowerCase().includes('saas') ? '150' : formData.industry?.toLowerCase().includes('ecommerce') ? '65' : '95'},
      "targetBenchmark": ${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') / 75)},
      "gapAnalysis": "Current CAC $${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') / 50)} vs target $${Math.floor(parseInt(formData.monthlyAdBudget?.replace(/[^0-9]/g, '') || '5000') / 75)} - potential 33% cost reduction",
      "improvementStrategies": [
        "Refine ${formData.targetAudience} targeting parameters to eliminate low-converting segments",
        "Improve ad creative relevance specifically for ${formData.industry} decision makers",
        "Implement comprehensive retargeting campaigns for ${formData.businessName} website visitors",
        "Optimize bidding strategies across all advertising platforms",
        "Create detailed lookalike audiences from highest-value customers",
        "Develop organic content strategy to reduce paid dependency",
        "Implement referral program to leverage existing customer networks",
        "Focus budget on highest-performing keywords and audiences"
      ],
      "expectedImprovement": "Reduce CAC by 35% through strategic targeting and creative optimization",
      "implementationTimeline": "Immediate: Audience refinement, Week 2: Creative testing, Week 4: Bidding optimization, Week 8: Full system implementation"
    },
    {
      "metric": "Return on Ad Spend (ROAS)",
      "currentBenchmark": 3.2,
      "industryAverage": ${formData.industry?.toLowerCase().includes('saas') ? '4.8' : formData.industry?.toLowerCase().includes('ecommerce') ? '4.2' : '3.8'},
      "targetBenchmark": 4.8,
      "gapAnalysis": "Current ROAS 3.2x vs industry benchmark ${formData.industry?.toLowerCase().includes('saas') ? '4.8' : '3.8'}x - opportunity for 50% improvement",
      "improvementStrategies": [
        "Focus budget allocation on highest-performing ${formData.industry} keywords and audiences",
        "Implement advanced audience segmentation targeting ${formData.targetAudience} specifically",
        "Create dedicated ${formData.productService} landing pages for each traffic source",
        "Use dynamic creative optimization for personalized ad experiences",
        "Implement comprehensive conversion tracking including offline conversions",
        "Develop sequential retargeting campaigns based on engagement levels",
        "Create video testimonials featuring successful ${formData.targetAudience} clients",
        "Optimize for micro-conversions leading to higher-value sales"
      ],
      "expectedImprovement": "Achieve 4.8x ROAS through systematic optimization and audience refinement",
      "implementationTimeline": "Month 1: Foundation setup, Month 2: Testing and optimization, Month 3: Scaling successful campaigns"
    },
    {
      "metric": "Customer Lifetime Value (CLV)",
      "currentBenchmark": 1250,
      "industryAverage": 1850,
      "targetBenchmark": 2100,
      "gapAnalysis": "Current CLV $1,250 vs industry average $1,850 - 68% improvement opportunity",
      "improvementStrategies": [
        "Develop comprehensive onboarding program for new ${formData.targetAudience} clients",
        "Create upselling opportunities with complementary ${formData.productService} offerings",
        "Implement customer success program with regular check-ins",
        "Build loyalty program rewarding long-term ${formData.businessName} clients",
        "Develop premium service tiers for high-value customers",
        "Create educational content maintaining ongoing engagement",
        "Implement feedback loops for continuous service improvement",
        "Develop referral incentives encouraging customer advocacy"
      ],
      "expectedImprovement": "Increase CLV to $2,100 through retention and expansion strategies"
    }
  ],
  "competitorInsights": [
    {
      "competitor": "Primary Market Leader in ${formData.industry}",
      "marketShare": "${Math.floor(Math.random() * 20) + 20}%",
      "keyStrategies": [
        "Heavy investment in ${formData.targetAudience} education and thought leadership content",
        "Premium positioning with ${formData.productService} differentiation and high-touch service",
        "Extensive ${formData.industry} partnership network and strategic alliances",
        "Aggressive content marketing across multiple channels",
        "High-value webinar series targeting decision makers"
      ],
      "strengths": ["Established brand recognition in ${formData.industry}", "Deep financial resources for marketing", "Large customer base and testimonials", "Comprehensive service offerings", "Strong referral network"],
      "weaknesses": ["Higher pricing limiting small business access", "Slower innovation due to corporate structure", "Less personalized service approach", "Complex onboarding process", "Limited customization options"],
      "opportunities": [
        "Underserve price-sensitive ${formData.targetAudience} with competitive ${formData.productService} pricing",
        "Offer more personalized service than large competitor can provide",
        "Provide faster implementation and responsive customer support",
        "Focus on specific ${formData.industry} niches they ignore",
        "Leverage agility for rapid feature development"
      ],
      "marketingTactics": {
        "platforms": ["LinkedIn Sponsored Content", "Google Ads Search", "Industry publication advertising", "Conference sponsorships"],
        "messaging": ["Enterprise-focused solutions", "ROI-driven value propositions", "Industry expertise positioning", "Scalability emphasis"],
        "contentStrategy": ["Comprehensive whitepapers", "Executive webinar series", "Industry research reports", "Customer success case studies"],
        "budgetEstimate": "$50,000-$75,000 monthly across all channels"
      },
      "averageCAC": ${Math.floor(Math.random() * 150) + 200},
      "estimatedROAS": "3.8x",
      "customerRetention": "85%",
      "competitiveAdvantages": "Brand recognition, resource depth, market presence, partnership network"
    },
    {
      "competitor": "Emerging ${formData.industry} Disruptor",
      "marketShare": "${Math.floor(Math.random() * 8) + 8}%",
      "keyStrategies": [
        "Aggressive social media presence targeting younger ${formData.targetAudience} demographics",
        "Simplified ${formData.productService} positioning with easy onboarding",
        "Rapid feature development and innovation cycles",
        "Competitive pricing with freemium model",
        "Strong influencer and partnership marketing"
      ],
      "strengths": ["High agility and innovation speed", "Modern technology stack", "Strong social media presence", "Competitive pricing model", "Simplified user experience"],
      "weaknesses": ["Limited industry track record", "Smaller support team", "Less established credibility", "Limited enterprise features", "Potential scalability concerns"],
      "opportunities": [
        "Emphasize ${formData.businessName}'s proven experience and stability",
        "Highlight comprehensive support and service quality",
        "Focus on enterprise-ready features they lack",
        "Leverage customer testimonials and case studies",
        "Position as reliable long-term partner"
      ],
      "marketingTactics": {
        "platforms": ["TikTok and Instagram advertising", "YouTube video content", "Facebook community building", "LinkedIn organic growth"],
        "messaging": ["Disruptive innovation", "Simple and modern approach", "Affordable accessibility", "Rapid results focus"],
        "contentStrategy": ["Short-form video content", "User-generated content campaigns", "Influencer collaborations", "Tutorial and how-to content"],
        "budgetEstimate": "$25,000-$35,000 monthly focused on digital channels"
      },
      "averageCAC": ${Math.floor(Math.random() * 75) + 100},
      "estimatedROAS": "4.5x",
      "customerRetention": "72%",
      "competitiveAdvantages": "Innovation speed, modern approach, cost efficiency, social media expertise"
    },
    {
      "competitor": "Regional ${formData.industry} Specialist",
      "marketShare": "${Math.floor(Math.random() * 6) + 5}%",
      "keyStrategies": [
        "Deep local market knowledge and relationships",
        "Specialized ${formData.productService} for regional ${formData.targetAudience}",
        "Strong word-of-mouth and referral network",
        "Participation in local business events and networking",
        "Customized solutions for local market needs"
      ],
      "strengths": ["Local market expertise", "Strong community relationships", "Personalized service approach", "Regional industry knowledge", "Established local partnerships"],
      "weaknesses": ["Limited scalability beyond region", "Smaller marketing budget", "Less technological sophistication", "Limited service breadth", "Dependence on local market"],
      "opportunities": [
        "Expand beyond their regional limitations",
        "Leverage technology they may lack",
        "Offer broader service portfolio",
        "Scale successful local strategies nationally",
        "Combine local approach with broader reach"
      ],
      "marketingTactics": {
        "platforms": ["Local Google Ads", "Facebook local targeting", "Chamber of Commerce partnerships", "Local publication advertising"],
        "messaging": ["Local expertise", "Community partnership", "Personalized attention", "Regional specialization"],
        "contentStrategy": ["Local case studies", "Community involvement stories", "Regional industry insights", "Local networking content"],
        "budgetEstimate": "$8,000-$15,000 monthly focused on local channels"
      },
      "averageCAC": ${Math.floor(Math.random() * 50) + 125},
      "estimatedROAS": "3.5x",
      "customerRetention": "88%",
      "competitiveAdvantages": "Local relationships, community trust, personalized service, regional expertise"
    }
  ],
  "industryInsights": [
    {
      "trend": "Accelerating digital transformation adoption in ${formData.industry} sector",
      "impact": "Growing demand for comprehensive ${formData.productService} solutions and implementation support",
      "opportunity": "Position ${formData.businessName} as the leading ${formData.industry} digital transformation partner",
      "timeline": "Peak demand expected within next 18-24 months with sustained growth",
      "marketSize": "$${Math.floor(Math.random() * 40) + 35}B globally, growing at ${Math.floor(Math.random() * 12) + 12}% annually",
      "actionPlan": [
        "Develop comprehensive ${formData.industry}-specific digital transformation case studies",
        "Create educational content series about transformation benefits for ${formData.targetAudience}",
        "Build strategic partnerships with technology vendors in ${formData.industry}",
        "Develop specialized ${formData.productService} packages for digital transformation",
        "Establish thought leadership through speaking at ${formData.industry} conferences",
        "Create ROI calculator specifically for digital transformation initiatives",
        "Build dedicated landing pages for transformation-focused campaigns"
      ],
      "economicFactors": [
        {
          "factor": "Labor cost inflation driving ${formData.industry} automation adoption",
          "businessImpact": "Increased urgency for efficiency solutions like ${formData.productService} to reduce operational costs",
          "marketingAngle": "Cost savings messaging becomes more compelling for budget-conscious ${formData.targetAudience}",
          "timeframe": "Immediate impact with accelerating adoption over next 12 months"
        },
        {
          "factor": "Remote work trends fundamentally changing ${formData.industry} operations",
          "businessImpact": "New use cases for ${formData.productService} in distributed team management and collaboration",
          "marketingAngle": "Highlight remote-friendly features and virtual collaboration benefits",
          "timeframe": "Ongoing trend with permanent operational changes"
        },
        {
          "factor": "Supply chain disruptions requiring operational resilience in ${formData.industry}",
          "businessImpact": "Demand for ${formData.productService} solutions that improve operational flexibility",
          "marketingAngle": "Emphasize resilience and adaptability benefits of ${formData.businessName} solutions",
          "timeframe": "Medium-term priority over next 24 months"
        }
      ],
      "competitiveIntelligence": "Market leaders investing heavily in digital capabilities, creating opportunity for specialized providers like ${formData.businessName}",
      "customerBehaviorShifts": "Increasing preference for comprehensive solutions over point products, growing importance of implementation support"
    },
    {
      "trend": "Increased focus on ${formData.industry} sustainability and regulatory compliance",
      "impact": "New requirements creating market opportunity for compliant ${formData.productService} solutions",
      "opportunity": "Differentiate ${formData.businessName} through comprehensive compliance and sustainability positioning",
      "timeline": "Regulatory pressure intensifying over next 12-18 months",
      "marketSize": "$${Math.floor(Math.random() * 25) + 15}B compliance market growing at ${Math.floor(Math.random() * 18) + 15}% annually",
      "actionPlan": [
        "Develop sustainability-focused features within ${formData.productService} offerings",
        "Create compliance-focused messaging specifically for regulated ${formData.targetAudience}",
        "Build partnerships with sustainability consultants specializing in ${formData.industry}",
        "Publish thought leadership content on sustainable ${formData.industry} practices",
        "Develop compliance checklist and assessment tools",
        "Create dedicated compliance landing pages and resources",
        "Establish expertise through regulatory training and certifications"
      ],
      "economicFactors": [
        {
          "factor": "Regulatory fines and penalties increasing compliance urgency",
          "businessImpact": "Higher perceived value for compliance-ready ${formData.productService} solutions",
          "marketingAngle": "Risk mitigation and compliance assurance messaging",
          "timeframe": "Immediate priority with increasing urgency"
        }
      ],
      "competitiveIntelligence": "Few competitors offering comprehensive compliance solutions, significant differentiation opportunity",
      "customerBehaviorShifts": "Compliance becoming primary decision factor rather than secondary consideration"
    },
    {
      "trend": "Growing importance of data analytics and performance measurement in ${formData.industry}",
      "impact": "Increased demand for ${formData.productService} with robust reporting and analytics capabilities",
      "opportunity": "Position ${formData.businessName} as data-driven solution provider with superior analytics",
      "timeline": "Immediate trend with accelerating adoption over next 12 months",
      "marketSize": "$${Math.floor(Math.random() * 30) + 20}B analytics market in ${formData.industry} growing at ${Math.floor(Math.random() * 20) + 18}% annually",
      "actionPlan": [
        "Enhance ${formData.productService} with advanced analytics and reporting features",
        "Create data-focused case studies showing measurable ROI for ${formData.targetAudience}",
        "Develop interactive ROI calculators and assessment tools",
        "Build dashboard demos showcasing data visualization capabilities",
        "Create educational webinar series on data-driven decision making",
        "Establish partnerships with business intelligence tool providers",
        "Develop analytics-focused sales collateral and presentations"
      ],
      "economicFactors": [
        {
          "factor": "Increased investor and stakeholder demand for performance transparency",
          "businessImpact": "Higher value placed on solutions providing clear ROI measurement",
          "marketingAngle": "Transparency and accountability messaging resonates strongly",
          "timeframe": "Ongoing priority with increasing importance"
        }
      ],
      "competitiveIntelligence": "Analytics becoming key differentiator, early adopters gaining competitive advantage",
      "customerBehaviorShifts": "Decision makers requiring proof of measurable impact before purchase"
    }
  ]
}`;

    console.log('Sending optimized request to OpenAI with enhanced prompt');

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
            content: 'You are an elite business intelligence strategist and senior consultant. Your expertise spans multiple industries with deep knowledge in business optimization, marketing strategy, competitive analysis, and growth acceleration. Generate comprehensive, actionable intelligence reports with maximum detail and specificity. CRITICAL: Respond with valid JSON only - absolutely no markdown formatting, no code blocks, no explanatory text, just pure JSON that can be parsed directly. Every section must be fully populated with detailed, industry-specific, actionable content. Generate ALL 7 required sections with substantial data in each.'
          },
          {
            role: 'user',
            content: intelligencePrompt
          }
        ],
        temperature: 0.2, // Lower temperature for more consistent output
        max_tokens: 8000
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      if (response.status === 401) {
        throw new Error('OpenAI API authentication failed. Please verify your API key is valid and has sufficient credits.');
      } else if (response.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please wait a moment and try again.');
      } else if (response.status === 400) {
        throw new Error('Invalid request to OpenAI API. Please check your input data.');
      }
      
      throw new Error(`OpenAI API request failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response structure from OpenAI API');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('AI response length:', aiResponse.length);

    let intelligenceData;
    try {
      // Enhanced JSON parsing with better error handling
      const cleanedResponse = aiResponse.trim();
      
      // Remove any potential markdown formatting
      const jsonContent = cleanedResponse
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .replace(/^\s*```.*$/gm, '')
        .trim();
      
      console.log('Parsing cleaned JSON response...');
      intelligenceData = JSON.parse(jsonContent);
      
      console.log('Successfully parsed AI response');
      
      // Comprehensive validation of all required sections
      const requiredSections = [
        'platformRecommendations',
        'monthlyPlan',
        'budgetStrategy',
        'copywritingRecommendations',
        'metricOptimization',
        'competitorInsights',
        'industryInsights'
      ];
      
      let validationResults = {};
      requiredSections.forEach(section => {
        const sectionData = intelligenceData[section];
        const isValid = Array.isArray(sectionData) && sectionData.length > 0;
        validationResults[section] = {
          valid: isValid,
          count: sectionData?.length || 0
        };
        console.log(`Section ${section}: ${isValid ? '✓' : '✗'} (${sectionData?.length || 0} items)`);
      });
      
      // Ensure minimum data structure exists
      requiredSections.forEach(section => {
        if (!intelligenceData[section]) {
          console.log(`Creating empty array for missing section: ${section}`);
          intelligenceData[section] = [];
        }
      });

      // Add comprehensive metadata
      intelligenceData.generatedAt = new Date().toISOString();
      intelligenceData.intelligenceMode = intelligenceMode;
      intelligenceData.businessType = businessType;
      intelligenceData.businessName = formData.businessName;
      intelligenceData.isAIGenerated = true;
      intelligenceData.validationResults = validationResults;
      
      console.log('=== FINAL INTELLIGENCE DATA SUMMARY ===');
      console.log('Business Name:', formData.businessName);
      console.log('Intelligence Mode:', intelligenceMode);
      console.log('Sections Generated:', Object.values(validationResults).filter(r => r.valid).length);
      console.log('Total Items Generated:', Object.values(validationResults).reduce((sum, r) => sum + r.count, 0));
      
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Raw AI response (first 1500 chars):', aiResponse.substring(0, 1500));
      console.error('Response structure analysis:', {
        length: aiResponse.length,
        startsWithBrace: aiResponse.trim().startsWith('{'),
        endsWithBrace: aiResponse.trim().endsWith('}'),
        hasMarkdown: aiResponse.includes('```'),
        firstChars: aiResponse.substring(0, 100)
      });
      
      throw new Error('AI generated response could not be parsed as valid JSON. The intelligence service may need adjustment. Please try again.');
    }

    return new Response(JSON.stringify({ insights: intelligenceData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('=== EDGE FUNCTION ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Intelligence generation encountered an error. Please verify your configuration and try again.',
      timestamp: new Date().toISOString(),
      errorType: error.constructor.name
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
