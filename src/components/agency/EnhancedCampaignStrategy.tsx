
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Users, DollarSign, Eye, MousePointer, ShoppingCart, Brain } from 'lucide-react';

interface CampaignStrategyProps {
  campaignData: any;
  onClose: () => void;
}

const EnhancedCampaignStrategy = ({ campaignData, onClose }: CampaignStrategyProps) => {
  const [activeStage, setActiveStage] = useState(0);

  // Generate industry-specific funnel stages based on objectives
  const generateFunnelStages = () => {
    const baseStages = [
      { 
        name: 'Awareness', 
        description: 'Educational content showcasing industry expertise and problem identification',
        icon: Eye,
        color: 'bg-blue-500'
      },
      { 
        name: 'Interest', 
        description: 'Value-driven content demonstrating solutions and building trust',
        icon: Target,
        color: 'bg-green-500'
      },
      { 
        name: 'Consideration', 
        description: 'Social proof, testimonials, and detailed solution explanations',
        icon: Users,
        color: 'bg-purple-500'
      },
      { 
        name: 'Intent', 
        description: 'Personalized offers and direct response opportunities',
        icon: MousePointer,
        color: 'bg-orange-500'
      },
      { 
        name: 'Conversion', 
        description: 'Qualified leads ready for consultation or purchase',
        icon: ShoppingCart,
        color: 'bg-red-500'
      }
    ];
    return baseStages;
  };

  // Generate priority metrics based on objectives
  const getPriorityMetrics = () => {
    const leadGenMetrics = ['Conversion Rate', 'Cost Per Action (CPA)', 'Click-Through Rate', 'Cost Per Click', 'Return on Ad Spend'];
    const salesMetrics = ['Return on Ad Spend', 'Conversion Rate', 'Cost Per Action', 'Average Order Value', 'Customer Lifetime Value'];
    const awarenessMetrics = ['Reach', 'Impressions', 'Brand Mention Rate', 'Engagement Rate', 'Share of Voice'];
    
    if (campaignData.objectives.includes('Lead Generation')) return leadGenMetrics;
    if (campaignData.objectives.includes('Sales Conversion')) return salesMetrics;
    return awarenessMetrics;
  };

  // Generate platform-specific strategies
  const getPlatformStrategies = () => {
    return {
      facebook: {
        name: 'Facebook',
        icon: '📘',
        objective: campaignData.objectives.includes('Lead Generation') ? 'Lead Generation' : 'Conversions',
        targeting: getIndustryTargeting('facebook'),
        adStructure: getAdStructure('facebook'),
        copywriting: getCopywritingStrategy('facebook')
      },
      instagram: {
        name: 'Instagram', 
        icon: '📷',
        objective: 'Brand Awareness + Conversions',
        targeting: getIndustryTargeting('instagram'),
        adStructure: getAdStructure('instagram'),
        copywriting: getCopywritingStrategy('instagram')
      },
      tiktok: {
        name: 'TikTok',
        icon: '🎵',
        objective: 'Video Views + Conversions',
        targeting: getIndustryTargeting('tiktok'),
        adStructure: getAdStructure('tiktok'),
        copywriting: getCopywritingStrategy('tiktok')
      },
      google: {
        name: 'Google Ads',
        icon: '🔍',
        objective: 'Search Conversions',
        targeting: getIndustryTargeting('google'),
        adStructure: getAdStructure('google'),
        copywriting: getCopywritingStrategy('google')
      },
      linkedin: {
        name: 'LinkedIn',
        icon: '💼',
        objective: 'B2B Lead Generation',
        targeting: getIndustryTargeting('linkedin'),
        adStructure: getAdStructure('linkedin'),
        copywriting: getCopywritingStrategy('linkedin')
      }
    };
  };

  const getIndustryTargeting = (platform: string) => {
    const industry = campaignData.industry.toLowerCase();
    const baseTargeting = {
      facebook: [`${campaignData.targetAudience}`, 'Interest-based targeting', 'Lookalike audiences from existing customers', 'Behavioral targeting based on purchase intent'],
      instagram: [`Visual-first ${campaignData.targetAudience}`, 'Lifestyle and interest targeting', 'Hashtag and location targeting', 'Influencer audience overlap'],
      tiktok: [`Gen Z and Millennial ${campaignData.targetAudience}`, 'Trend and audio-based targeting', 'Creator audience targeting', 'Viral content interest groups'],
      google: [`High-intent search terms related to ${campaignData.product}`, 'Industry-specific keywords', 'Competitor targeting', 'Geographic and demographic filters'],
      linkedin: [`Professional ${campaignData.targetAudience}`, 'Job title and company size targeting', 'Industry and skills targeting', 'Professional interest groups']
    };
    return baseTargeting[platform as keyof typeof baseTargeting] || baseTargeting.facebook;
  };

  const getAdStructure = (platform: string) => {
    const structures = {
      facebook: [
        'Single image or video showcasing key benefits',
        'Carousel ads showing multiple product features/services',
        'Video testimonials and case studies',
        'Educational content addressing common pain points'
      ],
      instagram: [
        'High-quality lifestyle imagery',
        'Story ads with interactive elements',
        'Reel ads showcasing product in action',
        'User-generated content campaigns'
      ],
      tiktok: [
        'Native-style educational videos',
        'Behind-the-scenes content',
        'Trending audio with branded message',
        'Challenge or transformation content'
      ],
      google: [
        'Text ads with compelling headlines',
        'Responsive search ads with multiple variations',
        'Shopping ads for e-commerce',
        'Display ads for retargeting'
      ],
      linkedin: [
        'Professional single image ads',
        'Sponsored content posts',
        'Video ads with business focus',
        'Lead gen forms with valuable offers'
      ]
    };
    return structures[platform as keyof typeof structures] || structures.facebook;
  };

  const getCopywritingStrategy = (platform: string) => {
    const strategies = {
      facebook: {
        headline: `Transform Your ${campaignData.industry} Results with ${campaignData.businessName || 'Our Solution'}`,
        structure: [
          `Open with relatable ${campaignData.industry} challenge`,
          'Introduce proven solution with credibility markers',
          'Include specific benefits and social proof',
          `End with clear CTA: "Get Your Free ${campaignData.industry} Consultation"`
        ]
      },
      instagram: {
        headline: `${campaignData.industry} Success Made Simple`,
        structure: [
          'Begin with aspirational lifestyle benefit',
          'Use visual storytelling with emojis',
          'Highlight transformation potential',
          'CTA: "Swipe up to transform your results"'
        ]
      },
      tiktok: {
        headline: `The ${campaignData.industry} Secret Everyone's Talking About`,
        structure: [
          'Hook: Surprising industry statistic (first 3 seconds)',
          'Problem: Common industry frustration',
          'Solution: Quick demonstration of benefits',
          'CTA: "Link in bio for full details"'
        ]
      },
      google: {
        headline: `${campaignData.industry} Solution | Proven Results`,
        structure: [
          'Include target keywords naturally',
          'Highlight unique value proposition',
          'Use action-oriented language',
          'Include location if relevant'
        ]
      },
      linkedin: {
        headline: `Professional ${campaignData.industry} Solutions`,
        structure: [
          'Address business pain points directly',
          'Include industry credibility markers',
          'Focus on ROI and business impact',
          'Professional, authoritative tone'
        ]
      }
    };
    return strategies[platform as keyof typeof strategies] || strategies.facebook;
  };

  const getOptimizationStrategies = () => {
    return [
      {
        strategy: 'A/B Testing',
        description: `Test emotional vs. rational appeals for ${campaignData.industry} audience, headline variations, and visual approaches`
      },
      {
        strategy: 'Retargeting Sequences',
        description: 'Create segments for content engagers, website visitors, and abandoned actions with tailored messaging'
      },
      {
        strategy: 'Creative Refresh',
        description: 'Update ad creative every 2-3 weeks with new testimonials, offers, and seasonal relevance'
      },
      {
        strategy: 'Landing Page Optimization',
        description: 'Ensure landing pages match ad messaging with clear value props and minimal friction'
      },
      {
        strategy: 'Attribution Tracking',
        description: 'Implement proper tracking to understand full customer journey and optimize accordingly'
      }
    ];
  };

  const funnelStages = generateFunnelStages();
  const priorityMetrics = getPriorityMetrics();
  const platformStrategies = getPlatformStrategies();
  const optimizationStrategies = getOptimizationStrategies();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Campaign Strategy</h2>
          <p className="text-muted-foreground">
            Comprehensive {campaignData.industry} campaign strategy with platform-specific optimizations
          </p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Back to Wizard
        </Button>
      </div>

      <Tabs defaultValue="funnel" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="funnel">Marketing Funnel</TabsTrigger>
          <TabsTrigger value="platforms">Platform Strategy</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>{campaignData.industry} Marketing Funnel</span>
              </CardTitle>
              <CardDescription>
                Optimized funnel stages for your {campaignData.objectives.join(', ')} objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mx-auto max-w-3xl mb-8">
                {funnelStages.map((stage, index) => {
                  const width = 100 - (index * 15);
                  const StageIcon = stage.icon;
                  return (
                    <div 
                      key={index}
                      className={`relative mx-auto mb-2 p-4 text-center text-white font-medium rounded-lg cursor-pointer transition-all ${
                        activeStage === index ? 'ring-4 ring-blue-300' : ''
                      }`}
                      style={{ 
                        width: `${width}%`,
                        opacity: 0.9 - (index * 0.1)
                      }}
                      onClick={() => setActiveStage(index)}
                    >
                      <div className={`${stage.color} p-4 rounded-lg`}>
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <StageIcon className="h-5 w-5" />
                          <span className="font-bold">{stage.name}</span>
                        </div>
                        <p className="text-sm">{stage.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stage Details */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-bold mb-2">{funnelStages[activeStage].name} Stage Details</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {funnelStages[activeStage].description}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Content Focus:</h5>
                    <ul className="text-sm space-y-1">
                      {activeStage === 0 && (
                        <>
                          <li>• Educational content about {campaignData.industry} challenges</li>
                          <li>• Industry trend analysis and insights</li>
                          <li>• Problem identification and awareness</li>
                        </>
                      )}
                      {activeStage === 1 && (
                        <>
                          <li>• Solution demonstrations and benefits</li>
                          <li>• Case studies and success stories</li>
                          <li>• Value proposition communication</li>
                        </>
                      )}
                      {activeStage === 2 && (
                        <>
                          <li>• Customer testimonials and reviews</li>
                          <li>• Detailed product/service comparisons</li>
                          <li>• Trust signals and credibility markers</li>
                        </>
                      )}
                      {activeStage === 3 && (
                        <>
                          <li>• Personalized offers and incentives</li>
                          <li>• Limited-time promotions</li>
                          <li>• Direct response opportunities</li>
                        </>
                      )}
                      {activeStage === 4 && (
                        <>
                          <li>• Simplified conversion process</li>
                          <li>• Clear next steps and expectations</li>
                          <li>• Immediate value delivery</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Key Tactics:</h5>
                    <ul className="text-sm space-y-1">
                      {activeStage === 0 && (
                        <>
                          <li>• Blog posts and educational videos</li>
                          <li>• Social media engagement</li>
                          <li>• SEO-optimized content</li>
                        </>
                      )}
                      {activeStage === 1 && (
                        <>
                          <li>• Product demonstrations</li>
                          <li>• Free resources and tools</li>
                          <li>• Webinars and workshops</li>
                        </>
                      )}
                      {activeStage === 2 && (
                        <>
                          <li>• Social proof campaigns</li>
                          <li>• Retargeting sequences</li>
                          <li>• Comparison guides</li>
                        </>
                      )}
                      {activeStage === 3 && (
                        <>
                          <li>• Targeted offers</li>
                          <li>• Urgency and scarcity</li>
                          <li>• Personalized outreach</li>
                        </>
                      )}
                      {activeStage === 4 && (
                        <>
                          <li>• Streamlined forms</li>
                          <li>• Multiple contact options</li>
                          <li>• Immediate follow-up</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid gap-6">
            {Object.entries(platformStrategies).map(([key, platform]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{platform.icon}</span>
                    <span>{platform.name}</span>
                    <Badge variant="secondary">{platform.objective}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-bold mb-2">Targeting Strategy</h4>
                      <ul className="text-sm space-y-1">
                        {platform.targeting.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Ad Structure</h4>
                      <ul className="text-sm space-y-1">
                        {platform.adStructure.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Copywriting Strategy</h4>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{platform.copywriting.headline}</p>
                        <ul className="text-sm space-y-1">
                          {platform.copywriting.structure.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Priority Metrics for {campaignData.industry}</CardTitle>
              <CardDescription>
                Key performance indicators ranked by importance for your campaign objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {priorityMetrics.map((metric, index) => (
                  <div key={index} className="bg-primary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{index + 1}</div>
                    <div className="text-sm font-medium">{metric}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold">Primary KPIs</h4>
                  <div className="space-y-3">
                    {priorityMetrics.slice(0, 3).map((metric, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">{metric}</p>
                          <p className="text-sm text-muted-foreground">Track daily and optimize weekly</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold">Secondary KPIs</h4>
                  <div className="space-y-3">
                    {priorityMetrics.slice(3).map((metric, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">{metric}</p>
                          <p className="text-sm text-muted-foreground">Monitor weekly and analyze monthly</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Strategies</CardTitle>
              <CardDescription>
                Proven tactics to maximize your {campaignData.industry} campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {optimizationStrategies.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-2">{item.strategy}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-bold mb-3">Campaign Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium w-20">Week 1-2:</div>
                    <div className="text-sm">Launch initial campaigns, gather baseline data</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium w-20">Week 3-4:</div>
                    <div className="text-sm">Analyze performance, implement A/B tests</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium w-20">Week 5-6:</div>
                    <div className="text-sm">Scale winning creatives, expand targeting</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium w-20">Week 7-8:</div>
                    <div className="text-sm">Optimize landing pages, refine messaging</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium w-20">Ongoing:</div>
                    <div className="text-sm">Continuous optimization and scaling</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedCampaignStrategy;
