import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Eye, Copy, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthlyPlanProps {
  data: any;
}

interface ContentDay {
  day: number;
  platform: string;
  contentType: 'ad' | 'organic';
  hook: string;
  body: string;
  cta: string;
  visualSuggestion: string;
  targetAudience: string;
  keyMessage: string;
  expectedMetrics: {
    reach: number;
    engagement: number;
    cost: number;
    conversions: number;
  };
  hashtags?: string[];
  adSpendRecommendation?: string;
  industryTips: string[];
  fullScript: string;
}

const MonthlyPlan = ({ data }: MonthlyPlanProps) => {
  const [viewMode, setViewMode] = useState<'preview' | 'full'>('preview');
  const [selectedDay, setSelectedDay] = useState<ContentDay | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);

  // Generate comprehensive 30-day plan with detailed copy
  const generateContentPlan = (): ContentDay[] => {
    const businessType = data.businessType || 'general';
    const industry = data.formData?.industry || 'general';
    const targetAudience = data.formData?.targetAudience || 'target audience';
    const monthlyRevenue = data.formData?.monthlyRevenue || '10k-50k';
    const productService = data.formData?.productService || 'product/service';
    const businessName = data.formData?.businessName || 'Your Business';
    const uniqueValue = data.formData?.uniqueValue || 'unique solution';
    
    const platforms = ['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'Google'];
    const contentTypes: ('ad' | 'organic')[] = ['ad', 'organic'];
    
    const plan: ContentDay[] = [];
    
    for (let day = 1; day <= 30; day++) {
      const platform = platforms[day % platforms.length];
      const contentType = contentTypes[day % contentTypes.length];
      
      const contentTemplate = generateDetailedContent(
        businessType, 
        industry, 
        targetAudience, 
        productService, 
        businessName, 
        uniqueValue, 
        day, 
        platform, 
        contentType
      );
      
      plan.push({
        day,
        platform,
        contentType,
        hook: contentTemplate.hook,
        body: contentTemplate.body,
        cta: contentTemplate.cta,
        fullScript: contentTemplate.fullScript,
        visualSuggestion: contentTemplate.visual,
        targetAudience,
        keyMessage: contentTemplate.keyMessage,
        expectedMetrics: calculateMetrics(contentType, platform, monthlyRevenue),
        hashtags: platform === 'Instagram' || platform === 'TikTok' ? generateHashtags(industry, businessType) : undefined,
        adSpendRecommendation: contentType === 'ad' ? getAdSpendRecommendation(monthlyRevenue, platform) : undefined,
        industryTips: getIndustryTips(industry, businessType, day)
      });
    }
    
    return plan;
  };

  // Generate detailed, cohesive content that flows together
  const generateDetailedContent = (
    businessType: string, 
    industry: string, 
    targetAudience: string, 
    productService: string, 
    businessName: string, 
    uniqueValue: string, 
    day: number, 
    platform: string, 
    contentType: 'ad' | 'organic'
  ) => {
    const contentStrategies = getContentStrategies(businessType, industry);
    const strategy = contentStrategies[day % contentStrategies.length];
    
    const hooks = getIndustryHooks(industry, businessType);
    const hook = hooks[day % hooks.length]
      .replace('{audience}', targetAudience)
      .replace('{industry}', industry)
      .replace('{business}', businessName);

    // Generate detailed body copy that connects to the hook
    const bodyParts = generateBodyContent(strategy, targetAudience, productService, businessName, uniqueValue, industry, businessType);
    
    const ctas = getStrategicCTAs(businessType, strategy.objective);
    const cta = ctas[day % ctas.length];

    // Create full script that flows from hook to body to CTA
    const fullScript = createFullScript(hook, bodyParts, cta, strategy);

    return {
      hook,
      body: bodyParts.join(' '),
      cta,
      fullScript,
      visual: generateVisualSuggestion(strategy, platform, contentType, industry),
      keyMessage: strategy.keyMessage.replace('{service}', productService)
    };
  };

  const getContentStrategies = (businessType: string, industry: string) => {
    const strategies = [
      {
        theme: 'Problem Identification',
        objective: 'awareness',
        keyMessage: 'Identify with the pain point your {service} solves',
        emotionalTrigger: 'frustration'
      },
      {
        theme: 'Solution Introduction',
        objective: 'consideration',
        keyMessage: 'Present your {service} as the solution',
        emotionalTrigger: 'hope'
      },
      {
        theme: 'Social Proof',
        objective: 'trust',
        keyMessage: 'Build credibility through testimonials and results',
        emotionalTrigger: 'trust'
      },
      {
        theme: 'Urgency Creation',
        objective: 'conversion',
        keyMessage: 'Create time-sensitive motivation to act',
        emotionalTrigger: 'urgency'
      },
      {
        theme: 'Value Demonstration',
        objective: 'consideration',
        keyMessage: 'Show tangible benefits and ROI',
        emotionalTrigger: 'desire'
      },
      {
        theme: 'Objection Handling',
        objective: 'conversion',
        keyMessage: 'Address common hesitations and concerns',
        emotionalTrigger: 'reassurance'
      },
      {
        theme: 'Authority Building',
        objective: 'trust',
        keyMessage: 'Establish expertise and industry leadership',
        emotionalTrigger: 'respect'
      }
    ];

    return strategies;
  };

  const getIndustryHooks = (industry: string, businessType: string): string[] => {
    const hookTemplates: Record<string, string[]> = {
      'ecommerce': [
        "If you're tired of browsing endless products without finding what you actually need, this changes everything...",
        "Most {audience} waste $X every month on products that don't deliver. Here's what actually works:",
        "I used to think all {industry} products were the same until I discovered this game-changing difference...",
        "Warning: Don't buy another {industry} product until you read this shocking truth...",
        "The #1 mistake {audience} make when shopping for {industry} products (and how to avoid it)",
        "This {industry} secret has helped over 10,000 {audience} save money while getting better results",
        "Why 90% of {audience} choose the wrong {industry} solution (and how you can be in the smart 10%)"
      ],
      'saas': [
        "If you're still doing [process] manually, you're losing $X every month in productivity...",
        "Most {audience} waste 20+ hours per week on tasks that could be automated. Here's how to get those hours back:",
        "I used to spend my entire day on {industry} tasks until I found this solution that changed everything...",
        "The average {audience} loses $X annually to inefficient {industry} processes. Here's the fix:",
        "Stop letting outdated {industry} methods hold your business back. This changes everything:",
        "Why successful {audience} are switching from traditional {industry} methods to this new approach",
        "The {industry} automation secret that's helping businesses scale 10x faster"
      ],
      'fitness': [
        "If you've tried every diet and workout plan but still aren't seeing results, this is why...",
        "Most people fail at fitness because they're missing this one crucial element...",
        "I used to struggle with [fitness goal] until I discovered this scientifically-proven method...",
        "The fitness industry doesn't want you to know this simple truth about getting results...",
        "Why 95% of people fail at their fitness goals (and the 5% who succeed do this instead)",
        "This fitness breakthrough is helping ordinary people achieve extraordinary transformations",
        "The #1 reason your workouts aren't working (and how to fix it in the next 30 days)"
      ],
      'coaching': [
        "If you feel stuck in your current situation and don't know how to break through, this is for you...",
        "Most {audience} stay trapped in mediocrity because they don't know this success secret...",
        "I used to think success was just for 'other people' until I learned this life-changing principle...",
        "The mindset shift that separates high achievers from everyone else (and how to develop it)",
        "Why most people never reach their full potential (and the simple fix that changes everything)",
        "This coaching breakthrough has helped thousands transform their lives in just 90 days",
        "The success formula that turns dreams into reality (used by top 1% performers)"
      ]
    };
    
    return hookTemplates[industry] || hookTemplates['ecommerce'];
  };

  const generateBodyContent = (
    strategy: any, 
    targetAudience: string, 
    productService: string, 
    businessName: string, 
    uniqueValue: string, 
    industry: string, 
    businessType: string
  ): string[] => {
    const bodyParts = [];

    // Opening - connect to hook
    bodyParts.push(`Here's what most ${targetAudience} don't realize: the ${industry} industry has been doing things the same way for years, but there's a better approach that's finally available.`);

    // Problem amplification
    bodyParts.push(`Every day, I see ${targetAudience} struggling with [specific pain point] because they're using outdated methods that simply don't work in today's market.`);

    // Solution introduction
    bodyParts.push(`That's exactly why we created ${productService} at ${businessName}. Our ${uniqueValue} specifically addresses the root cause of these challenges, not just the symptoms.`);

    // Proof and credibility
    bodyParts.push(`In the last 12 months alone, we've helped over [X] ${targetAudience} achieve [specific result], with an average improvement of [Y]% in just [timeframe].`);

    // Unique mechanism
    bodyParts.push(`What makes our approach different is [unique process/method]. While others focus on [common approach], we've discovered that [better approach] delivers 3x better results.`);

    // Social proof
    bodyParts.push(`Just last week, [client name/type] told us: "I wish I had found ${businessName} sooner. In just [timeframe], I've achieved more progress than in the previous [longer timeframe] combined."`);

    // Urgency/scarcity
    bodyParts.push(`Here's the thing: we can only work with a limited number of ${targetAudience} each month to ensure everyone gets the personalized attention they deserve.`);

    return bodyParts;
  };

  const getStrategicCTAs = (businessType: string, objective: string): string[] => {
    const ctaMap: Record<string, string[]> = {
      'awareness': [
        'Learn More About This Solution',
        'Discover How This Works',
        'Get the Full Story Here',
        'See the Complete Method'
      ],
      'consideration': [
        'Schedule Your Free Strategy Call',
        'Get Your Custom Analysis',
        'Claim Your Free Assessment',
        'Book Your Discovery Session'
      ],
      'conversion': [
        'Start Your Transformation Today',
        'Secure Your Spot Now',
        'Get Instant Access',
        'Join the Program'
      ],
      'trust': [
        'Read the Success Stories',
        'See the Proof',
        'Watch the Case Study',
        'View the Results'
      ]
    };

    return ctaMap[objective] || ctaMap['consideration'];
  };

  const createFullScript = (hook: string, bodyParts: string[], cta: string, strategy: any): string => {
    return `
**HOOK:**
${hook}

**BODY COPY:**
${bodyParts.join('\n\n')}

**CALL TO ACTION:**
${cta}

**STRATEGY NOTE:**
This ${strategy.theme.toLowerCase()} content is designed to trigger ${strategy.emotionalTrigger} and move the audience toward ${strategy.objective}. The copy flows from problem identification through solution presentation to clear action step.

**PERFORMANCE OPTIMIZATION:**
- Hook addresses specific pain point
- Body builds credibility and urgency
- CTA creates clear next step
- Overall message maintains consistent theme
`.trim();
  };

  const generateVisualSuggestion = (strategy: any, platform: string, contentType: string, industry: string): string => {
    const visualMap: Record<string, string> = {
      'Problem Identification': `Before/after comparison showing the struggle vs. solution, optimized for ${platform} ${contentType} format`,
      'Solution Introduction': `Product/service demonstration with clear value proposition overlay for ${platform}`,
      'Social Proof': `Customer testimonial video or carousel of success stories formatted for ${platform}`,
      'Urgency Creation': `Eye-catching countdown or limited-time graphics designed for ${platform} engagement`,
      'Value Demonstration': `Infographic or video showing tangible benefits and ROI, ${platform} optimized`,
      'Objection Handling': `FAQ-style visual or split-screen addressing concerns, perfect for ${platform}`,
      'Authority Building': `Professional behind-the-scenes or credibility indicators for ${platform}`
    };

    return visualMap[strategy.theme] || `High-converting ${platform} creative with clear value proposition`;
  };

  const contentPlan = generateContentPlan();
  const totalWeeks = Math.ceil(30 / 7);
  const currentWeekDays = contentPlan.slice((currentWeek - 1) * 7, currentWeek * 7);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openPreview = (day: ContentDay) => {
    setSelectedDay(day);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>30-Day Content Calendar</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('preview')}
            >
              <List className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant={viewMode === 'full' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('full')}
            >
              <Grid className="h-4 w-4 mr-2" />
              View Full Calendar
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Detailed, cohesive content scripts tailored for your {data.formData?.industry || 'business'} targeting {data.formData?.targetAudience || 'your audience'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {viewMode === 'preview' ? (
          // Preview mode - show first 3 days
          <div className="space-y-6">
            {contentPlan.slice(0, 3).map((day, index) => (
              <ContentDayCard key={index} day={day} onPreview={openPreview} onCopy={copyToClipboard} />
            ))}
            
            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-muted-foreground">+ 27 more days of detailed, conversion-focused content</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => setViewMode('full')}
              >
                View Full Calendar
              </Button>
            </div>
          </div>
        ) : (
          // Full calendar mode
          <div className="space-y-4">
            {/* Week navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                disabled={currentWeek === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Week
              </Button>
              <span className="text-sm font-medium">
                Week {currentWeek} of {totalWeeks}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(Math.min(totalWeeks, currentWeek + 1))}
                disabled={currentWeek === totalWeeks}
              >
                Next Week
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Week content */}
            <div className="space-y-4">
              {currentWeekDays.map((day, index) => (
                <ContentDayCard key={index} day={day} onPreview={openPreview} onCopy={copyToClipboard} />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Detailed Preview Dialog */}
        <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Day {selectedDay?.day} - {selectedDay?.platform} Complete Content Script</DialogTitle>
              <DialogDescription>
                Full copy breakdown with strategic insights and optimization recommendations
              </DialogDescription>
            </DialogHeader>
            
            {selectedDay && (
              <div className="space-y-6">
                {/* Full Script Display */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Complete Content Script</h4>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">{selectedDay.fullScript}</pre>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => copyToClipboard(selectedDay.fullScript)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Full Script
                  </Button>
                </div>

                {/* Metrics Display */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-600">{selectedDay.expectedMetrics.reach.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Expected Reach</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="font-semibold text-green-600">{selectedDay.expectedMetrics.engagement}</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-600">{selectedDay.expectedMetrics.conversions}</div>
                    <div className="text-xs text-muted-foreground">Conversions</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded">
                    <div className="font-semibold text-orange-600">
                      {selectedDay.expectedMetrics.cost > 0 ? `$${selectedDay.expectedMetrics.cost}` : 'Free'}
                    </div>
                    <div className="text-xs text-muted-foreground">Daily Cost</div>
                  </div>
                </div>

                {/* Visual and Optimization Details */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Visual Strategy</h4>
                    <p className="text-sm bg-gray-50 p-3 rounded">{selectedDay.visualSuggestion}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Message</h4>
                    <p className="text-sm bg-blue-50 p-3 rounded border border-blue-200">{selectedDay.keyMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// Enhanced ContentDayCard component
const ContentDayCard = ({ day, onPreview, onCopy }: { 
  day: ContentDay; 
  onPreview: (day: ContentDay) => void;
  onCopy: (text: string) => void;
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Badge variant="outline">Day {day.day}</Badge>
          <Badge className={
            day.platform === 'Facebook' ? 'bg-blue-500' : 
            day.platform === 'Instagram' ? 'bg-pink-500' : 
            day.platform === 'TikTok' ? 'bg-black' :
            day.platform === 'LinkedIn' ? 'bg-blue-700' :
            'bg-green-500'
          }>
            {day.platform}
          </Badge>
          <Badge variant={day.contentType === 'ad' ? 'default' : 'secondary'}>
            {day.contentType.toUpperCase()}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onPreview(day)}>
          <Eye className="h-4 w-4 mr-2" />
          View Full Script
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Hook</label>
          <div className="flex items-start space-x-2">
            <p className="text-sm bg-gray-50 p-3 rounded flex-1 leading-relaxed">{day.hook}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onCopy(day.hook)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Body Preview</label>
          <p className="text-sm bg-gray-50 p-3 rounded leading-relaxed">
            {day.body.substring(0, 200)}...
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Call to Action</label>
            <p className="text-sm bg-blue-50 p-2 rounded border border-blue-200">{day.cta}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Key Message</label>
            <p className="text-sm bg-green-50 p-2 rounded border border-green-200">{day.keyMessage}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-semibold text-blue-600">{day.expectedMetrics.reach.toLocaleString()}</div>
            <div className="text-muted-foreground">Reach</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-semibold text-green-600">{day.expectedMetrics.engagement}</div>
            <div className="text-muted-foreground">Engagement</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded">
            <div className="font-semibold text-purple-600">{day.expectedMetrics.conversions}</div>
            <div className="text-muted-foreground">Conversions</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded">
            <div className="font-semibold text-orange-600">
              {day.expectedMetrics.cost > 0 ? `$${day.expectedMetrics.cost}` : 'Free'}
            </div>
            <div className="text-muted-foreground">Cost</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for generating industry-specific content
const calculateMetrics = (contentType: 'ad' | 'organic', platform: string, revenue: string) => {
  const revenueMultiplier = getRevenueMultiplier(revenue);
  const platformMultiplier = getPlatformMultiplier(platform);
  
  const baseReach = contentType === 'ad' ? 15000 : 8000;
  const baseEngagement = contentType === 'ad' ? 450 : 320;
  const baseCost = contentType === 'ad' ? 125 : 0;
  const baseConversions = contentType === 'ad' ? 12 : 6;
  
  return {
    reach: Math.round(baseReach * revenueMultiplier * platformMultiplier),
    engagement: Math.round(baseEngagement * platformMultiplier),
    cost: Math.round(baseCost * revenueMultiplier),
    conversions: Math.round(baseConversions * revenueMultiplier)
  };
};

const getRevenueMultiplier = (revenue: string): number => {
  const multipliers: Record<string, number> = {
    '0-10k': 0.5,
    '10k-50k': 1.0,
    '50k-100k': 1.5,
    '100k-500k': 2.0,
    '500k+': 3.0
  };
  return multipliers[revenue] || 1.0;
};

const getPlatformMultiplier = (platform: string): number => {
  const multipliers: Record<string, number> = {
    'Facebook': 1.2,
    'Instagram': 1.0,
    'TikTok': 1.5,
    'LinkedIn': 0.8,
    'Google': 1.1
  };
  return multipliers[platform] || 1.0;
};

const generateHashtags = (industry: string, businessType: string): string[] => {
  const base = [`#${industry.toLowerCase()}`, `#${businessType.toLowerCase()}`];
  const industry_tags: Record<string, string[]> = {
    'ecommerce': ['#onlineshopping', '#ecommercestore', '#onlinebusiness'],
    'saas': ['#software', '#productivity', '#automation'],
    'fitness': ['#fitness', '#health', '#workout'],
    'coaching': ['#coaching', '#mindset', '#success'],
    'finance': ['#finance', '#investing', '#wealth']
  };
  
  return [...base, ...(industry_tags[industry] || []), '#growth', '#success'];
};

const getAdSpendRecommendation = (revenue: string, platform: string): string => {
  const budgetRecommendations: Record<string, Record<string, string>> = {
    '0-10k': {
      'Facebook': 'Start with $5-10/day, focus on engagement and building audience',
      'Instagram': 'Allocate $3-7/day, prioritize visual content and stories',
      'Google': 'Begin with $8-15/day for search ads, target long-tail keywords',
      'TikTok': 'Test with $5-10/day, focus on creative video content',
      'LinkedIn': 'Start with $10-20/day for B2B targeting'
    },
    '10k-50k': {
      'Facebook': 'Invest $15-30/day, test multiple ad sets and audiences',
      'Instagram': 'Allocate $10-25/day, use shopping ads and reels',
      'Google': 'Budget $20-40/day, expand to display network',
      'TikTok': 'Spend $15-30/day, leverage trending sounds and effects',
      'LinkedIn': 'Invest $25-50/day for professional targeting'
    },
    '50k-100k': {
      'Facebook': 'Scale to $30-60/day, implement lookalike audiences',
      'Instagram': 'Increase to $25-50/day, focus on conversion campaigns',
      'Google': 'Expand to $40-80/day, add remarketing campaigns',
      'TikTok': 'Boost to $30-60/day, test spark ads and branded effects',
      'LinkedIn': 'Scale to $50-100/day, use sponsored content and messages'
    }
  };
  
  return budgetRecommendations[revenue]?.[platform] || 'Adjust spend based on performance metrics and ROI goals';
};

const getIndustryTips = (industry: string, businessType: string, day: number): string[] => {
  const tips: Record<string, string[]> = {
    'ecommerce': [
      'Use high-quality product images with lifestyle context',
      'Include customer reviews and ratings in ad copy',
      'Test urgency elements like limited-time offers',
      'Highlight free shipping and easy returns'
    ],
    'saas': [
      'Focus on specific pain points your software solves',
      'Include free trial or demo offers in every CTA',
      'Use data and metrics to prove ROI',
      'Target decision-makers with job title precision'
    ],
    'fitness': [
      'Show real transformation results and timelines',
      'Address common fitness myths and misconceptions',
      'Include difficulty level and time commitment',
      'Use before/after visuals for credibility'
    ],
    'coaching': [
      'Share specific client success stories and outcomes',
      'Address the emotional aspects of transformation',
      'Offer value upfront with tips or assessments',
      'Build authority with credentials and experience'
    ]
  };
  
  const industryTipsList = tips[industry] || tips['ecommerce'];
  return [industryTipsList[day % industryTipsList.length]];
};

export default MonthlyPlan;
