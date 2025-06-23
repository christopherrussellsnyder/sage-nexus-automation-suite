
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
}

const MonthlyPlan = ({ data }: MonthlyPlanProps) => {
  const [viewMode, setViewMode] = useState<'preview' | 'full'>('preview');
  const [selectedDay, setSelectedDay] = useState<ContentDay | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);

  // Generate comprehensive 30-day plan based on business data
  const generateContentPlan = (): ContentDay[] => {
    const businessType = data.businessType || 'general';
    const industry = data.formData?.industry || 'general';
    const targetAudience = data.formData?.targetAudience || 'target audience';
    const monthlyRevenue = data.formData?.monthlyRevenue || '10k-50k';
    const productService = data.formData?.productService || 'product/service';
    
    const platforms = ['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'Google'];
    const contentTypes: ('ad' | 'organic')[] = ['ad', 'organic'];
    
    // Industry-specific hooks and content
    const industryHooks = getIndustryHooks(industry);
    const industryContent = getIndustryContent(industry, businessType);
    
    const plan: ContentDay[] = [];
    
    for (let day = 1; day <= 30; day++) {
      const platform = platforms[day % platforms.length];
      const contentType = contentTypes[day % contentTypes.length];
      const hook = industryHooks[day % industryHooks.length];
      const content = industryContent[day % industryContent.length];
      
      plan.push({
        day,
        platform,
        contentType,
        hook: hook.replace('{audience}', targetAudience).replace('{industry}', industry),
        body: content.body.replace('{service}', productService).replace('{audience}', targetAudience),
        cta: content.cta,
        visualSuggestion: content.visual.replace('{industry}', industry),
        targetAudience,
        keyMessage: content.keyMessage,
        expectedMetrics: calculateMetrics(contentType, platform, monthlyRevenue),
        hashtags: platform === 'Instagram' || platform === 'TikTok' ? generateHashtags(industry, businessType) : undefined,
        adSpendRecommendation: contentType === 'ad' ? getAdSpendRecommendation(monthlyRevenue, platform) : undefined,
        industryTips: getIndustryTips(industry, businessType, day)
      });
    }
    
    return plan;
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
          AI-generated content calendar tailored for your {data.formData?.industry || 'business'} targeting {data.formData?.targetAudience || 'your audience'}
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
              <p className="text-muted-foreground">+ 27 more days of optimized content</p>
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

        {/* Detailed Preview Dialog */}
        <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Day {selectedDay?.day} - {selectedDay?.platform} Content Preview</DialogTitle>
              <DialogDescription>
                Detailed content breakdown and optimization recommendations
              </DialogDescription>
            </DialogHeader>
            
            {selectedDay && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Content Details</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Hook</label>
                          <p className="text-sm bg-gray-50 p-3 rounded">{selectedDay.hook}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Body</label>
                          <p className="text-sm bg-gray-50 p-3 rounded">{selectedDay.body}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Call to Action</label>
                          <p className="text-sm bg-gray-50 p-3 rounded">{selectedDay.cta}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Key Message</label>
                          <p className="text-sm bg-gray-50 p-3 rounded">{selectedDay.keyMessage}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Optimization Details</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Visual Suggestion</label>
                          <p className="text-sm bg-gray-50 p-3 rounded">{selectedDay.visualSuggestion}</p>
                        </div>
                        {selectedDay.hashtags && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Hashtags</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedDay.hashtags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedDay.adSpendRecommendation && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Ad Spend Strategy</label>
                            <p className="text-sm bg-blue-50 p-3 rounded border border-blue-200">{selectedDay.adSpendRecommendation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

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

                <div>
                  <h4 className="font-semibold mb-2">Industry-Specific Tips</h4>
                  <ul className="space-y-1">
                    {selectedDay.industryTips.map((tip, i) => (
                      <li key={i} className="text-sm bg-gray-50 p-2 rounded flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// Component for individual content day cards
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
          Preview
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Hook</label>
          <div className="flex items-center space-x-2">
            <p className="text-sm bg-gray-50 p-2 rounded flex-1">{day.hook}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onCopy(day.hook)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Call to Action</label>
            <p className="text-sm bg-gray-50 p-2 rounded">{day.cta}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Key Message</label>
            <p className="text-sm bg-gray-50 p-2 rounded">{day.keyMessage}</p>
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
const getIndustryHooks = (industry: string): string[] => {
  const hooks: Record<string, string[]> = {
    'ecommerce': [
      "Stop scrolling if you're tired of overpriced {industry} products",
      "This {industry} secret changed everything for {audience}",
      "Warning: Don't buy {industry} products until you read this",
      "The {industry} mistake that's costing {audience} thousands",
      "Why 90% of {audience} choose the wrong {industry} solution"
    ],
    'saas': [
      "Stop wasting time on manual {industry} processes",
      "This software automation saves {audience} 20+ hours per week",
      "The {industry} tool that {audience} wish they found sooner",
      "How {audience} 10x their productivity with this simple {industry} hack",
      "Warning: Your competitors are already using this {industry} advantage"
    ],
    'fitness': [
      "Stop doing workouts that don't work for {audience}",
      "This fitness transformation shocked everyone at the gym",
      "The nutrition mistake that's sabotaging {audience} results",
      "How {audience} lost 30+ pounds without giving up their favorite foods",
      "The 15-minute workout that beats hour-long gym sessions"
    ],
    'coaching': [
      "Stop letting limiting beliefs hold {audience} back",
      "This mindset shift transformed my client's entire business",
      "The coaching method that gets {audience} results in 30 days",
      "How {audience} breakthrough their biggest obstacles",
      "The success blueprint that {audience} have been missing"
    ],
    'finance': [
      "Stop losing money on bad {industry} investments",
      "This financial strategy helped {audience} retire early",
      "The money mistake that keeps {audience} broke",
      "How {audience} build wealth even with a small income",
      "The financial freedom formula for {audience}"
    ]
  };
  
  return hooks[industry] || hooks['ecommerce'];
};

const getIndustryContent = (industry: string, businessType: string) => {
  const content = [
    {
      body: "Our proven {service} system helps {audience} achieve their goals without the typical industry challenges. Join thousands who have already transformed their results.",
      cta: "Get Started Today",
      visual: "Split-screen showing before/after results with customer testimonial overlay",
      keyMessage: "Proven results and transformation"
    },
    {
      body: "Behind-the-scenes look at how we help {audience} streamline their {industry} operations for maximum efficiency and growth.",
      cta: "Learn Our Method",
      visual: "Behind-the-scenes video showing process in action",
      keyMessage: "Transparency and process expertise"
    },
    {
      body: "Discover the {industry} strategy that top performers use but most {audience} don't know about. Limited spots available.",
      cta: "Claim Your Spot",
      visual: "Professional demonstration with clear value proposition",
      keyMessage: "Exclusivity and insider knowledge"
    }
  ];
  
  return content;
};

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
