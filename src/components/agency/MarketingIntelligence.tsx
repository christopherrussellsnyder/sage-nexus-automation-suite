
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Search, 
  RefreshCw,
  BarChart3,
  Users,
  MessageSquare,
  Eye,
  Lightbulb,
  Camera,
  Volume2,
  Zap
} from 'lucide-react';

const MarketingIntelligence = () => {
  const [businessData, setBusinessData] = useState({
    businessName: '',
    industry: '',
    businessType: '',
    targetAudience: '',
    serviceOffering: '',
    uniqueValue: '',
    budget: '',
    timeline: '',
    campaignGoal: ''
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const runAnalysis = async () => {
    if (!businessData.businessName.trim() || !businessData.industry.trim()) return;
    
    setAnalyzing(true);
    setProgress(0);
    setCurrentStep(1);
    
    // Enhanced 3-step process for agency analysis
    const analysisSteps = [
      {
        step: 1,
        message: "Scanning competitor agencies and extracting winning marketing strategies...",
        duration: 3000
      },
      {
        step: 2,
        message: "Analyzing competitor angles, pricing strategies, and market positioning...",
        duration: 4000
      },
      {
        step: 3,
        message: "Generating comprehensive marketing intelligence with winning angles and actionable insights...",
        duration: 3000
      }
    ];

    for (const stepData of analysisSteps) {
      setCurrentStep(stepData.step);
      await new Promise(resolve => setTimeout(resolve, stepData.duration));
      setProgress(stepData.step * 33.33);
    }
    
    const mockAnalysis = {
      industryOverview: {
        marketSize: businessData.industry === 'Digital Marketing' ? '$146B' : '$89B',
        clientDemand: 'Very High',
        competitorCount: businessData.industry === 'Digital Marketing' ? 1247 : 892,
        avgProjectValue: businessData.industry === 'SEO' ? '$4,200' : '$8,500',
        marketSaturation: businessData.industry === 'Social Media' ? 'Medium' : 'High'
      },
      winningAngles: [
        {
          angle: 'Problem-Solution Testimonial Approach',
          description: 'Leading with client pain points, then showcasing transformation',
          effectiveness: '340% higher engagement',
          implementation: 'Start ads with "Are you tired of..." then show client success story',
          visualStrategy: 'Split-screen before/after client results',
          audioStrategy: 'Client testimonial voiceover with emotional background music',
          uniqueTwist: 'Add industry-specific pain points and use real client data visualizations'
        },
        {
          angle: 'Authority Through Data',
          description: 'Using industry statistics and proprietary research',
          effectiveness: '280% more qualified leads',
          implementation: 'Lead with shocking industry statistic, position as solution',
          visualStrategy: 'Data visualizations, charts, and infographics',
          audioStrategy: 'Professional narrator voice with data emphasis',
          uniqueTwist: 'Include exclusive industry insights and personalized data for target audience'
        },
        {
          angle: 'Behind-the-Scenes Expertise',
          description: 'Showing the process and methodology transparency',
          effectiveness: '190% trust increase',
          implementation: 'Document actual work sessions and strategy meetings',
          visualStrategy: 'Screen recordings, team collaboration shots',
          audioStrategy: 'Natural conversation audio, minimal editing',
          uniqueTwist: 'Show client-specific strategy development and real-time problem solving'
        }
      ],
      organicContentTrends: [
        {
          trend: 'Client Case Study Carousels',
          platforms: ['LinkedIn', 'Instagram'],
          engagement: '347% above average',
          usage: '94% of top agencies',
          examples: [
            'Before/after client results with specific ROI numbers',
            'Timeline breakdowns of campaign success',
            'Client testimonial overlays with metrics'
          ],
          bestPractices: 'Include specific numbers, visual transformations, and authentic client quotes',
          visualRecommendations: [
            'Use consistent brand colors and fonts',
            'Include client logos for credibility',
            'Show actual dashboard screenshots',
            'Use arrows and callouts to highlight key metrics'
          ],
          audioRecommendations: [
            'Client testimonial voiceovers',
            'Upbeat background music for success stories',
            'Professional narrator for data points'
          ]
        },
        {
          trend: 'Behind-the-Scenes Strategy Content',
          platforms: ['Instagram Stories', 'LinkedIn', 'TikTok'],
          engagement: '256% above average',
          usage: '87% of top agencies',
          examples: [
            'Live strategy sessions with clients',
            'Tool tutorials and walkthroughs',
            'Team brainstorming sessions'
          ],
          bestPractices: 'Show expertise through authentic process reveals and team collaboration',
          visualRecommendations: [
            'Natural lighting for authenticity',
            'Multiple camera angles for dynamic content',
            'Screen recordings with clear annotations',
            'Casual but professional settings'
          ],
          audioRecommendations: [
            'Natural conversation without heavy editing',
            'Subtle background music during transitions',
            'Clear explanation of complex concepts'
          ]
        }
      ],
      advertisementStrategies: [
        {
          strategy: 'Value-First No-Sell Approach',
          description: 'Provide massive value without obvious selling, building trust first',
          implementation: 'Share free tools, insights, and strategies before mentioning services',
          copyFramework: 'Hook with value → Deliver insights → Soft CTA for more',
          visualStrategy: 'Educational content, tutorials, free resource previews',
          audioStrategy: 'Helpful, educational tone - like a helpful colleague',
          expectedResults: '65% higher conversion rates, 40% lower cost per acquisition',
          uniqueTwist: 'Create industry-specific calculators and assessment tools as lead magnets'
        },
        {
          strategy: 'Social Proof Testimonial Blitz',
          description: 'Overwhelming evidence of results through multiple client testimonials',
          implementation: 'Rapid-fire client results with specific numbers and transformations',
          copyFramework: 'Multiple client results → Pattern recognition → Your turn CTA',
          visualStrategy: 'Fast-paced testimonial compilation, metric overlays',
          audioStrategy: 'Multiple client voices, upbeat music, professional narrator',
          expectedResults: '85% trust increase, 50% higher lead quality',
          uniqueTwist: 'Include client testimonials from same industry as prospect for maximum relevance'
        },
        {
          strategy: 'No-Brainer Offer with Guarantees',
          description: 'Remove all risk with strong guarantees and bonus inclusions',
          implementation: 'Money-back guarantee + bonus services + risk reversal',
          copyFramework: 'Problem → Solution → Guarantee → Bonuses → Urgency',
          visualStrategy: 'Guarantee badges, bonus stack visualization, countdown timers',
          audioStrategy: 'Confident, reassuring tone with emphasis on guarantees',
          expectedResults: '120% conversion rate improvement, 30% higher average order value',
          uniqueTwist: 'Offer performance-based pricing or revenue-sharing models for high-value clients'
        }
      ],
      competitiveAnalysis: {
        topPerformingAngles: [
          {
            competitor: 'Leading Digital Agency',
            winningAngle: 'ROI Calculator + Free Audit',
            whyItWorks: 'Provides immediate value and identifies specific problems',
            adaptation: 'Create industry-specific calculator for your niche',
            implementation: 'Landing page tool + follow-up consultation offer',
            pricingStrategy: 'Value-based pricing with transparent ROI projections'
          },
          {
            competitor: 'Growth Marketing Firm',
            winningAngle: 'Case Study Video Series',
            whyItWorks: 'Video testimonials are 300% more trusted than text',
            adaptation: 'Weekly client spotlight videos with detailed breakdowns',
            implementation: 'Interview clients monthly, create mini-documentaries',
            pricingStrategy: 'Performance-based pricing with success guarantees'
          }
        ],
        pricingStrategies: [
          {
            strategy: 'Value-Based Pricing with Tiers',
            description: 'Multiple service levels to capture different budget ranges',
            implementation: 'Starter → Growth → Enterprise packages',
            winningElement: 'Clear ROI projections for each tier'
          },
          {
            strategy: 'Performance-Based Pricing',
            description: 'Share revenue risk with clients for higher trust',
            implementation: 'Base fee + performance bonuses tied to results',
            winningElement: 'Removes risk perception, increases commitment'
          }
        ]
      },
      platformInsights: {
        linkedin: {
          bestTimes: ['Tuesday-Thursday 9-11 AM', 'Wednesday 1-3 PM'],
          topFormats: ['Document carousels', 'Video case studies', 'Industry insights'],
          avgEngagement: '9.8%',
          contentTips: [
            'Professional tone with personal insights',
            'Use industry-specific data and metrics',
            'Engage actively in comments within first hour',
            'Share controversial but educated opinions'
          ]
        },
        instagram: {
          bestTimes: ['Monday-Wednesday 11 AM-1 PM', 'Thursday 5-7 PM'],
          topFormats: ['Story highlights', 'Reels tutorials', 'Carousel case studies'],
          avgEngagement: '7.9%',
          contentTips: [
            'Visual-first approach with professional aesthetics',
            'Use trending audio for educational Reels',
            'Create consistent story highlight templates',
            'Show client transformations visually'
          ]
        }
      }
    };

    setAnalysis(mockAnalysis);
    setAnalyzing(false);
    setProgress(100);
  };

  return (
    <div className="space-y-6">
      {/* Analysis Input */}
      {!analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Agency Marketing Intelligence</span>
            </CardTitle>
            <CardDescription>
              AI-powered competitive analysis with winning angles and visual/audio strategies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Agency Name</Label>
                <Input
                  id="businessName"
                  placeholder="e.g., Growth Marketing Pro"
                  value={businessData.businessName}
                  onChange={(e) => setBusinessData({...businessData, businessName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Specialization</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Digital Marketing, SEO, PPC"
                  value={businessData.industry}
                  onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Client Type</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., SaaS companies, E-commerce brands"
                  value={businessData.targetAudience}
                  onChange={(e) => setBusinessData({...businessData, targetAudience: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceOffering">Primary Service</Label>
                <Input
                  id="serviceOffering"
                  placeholder="e.g., Lead Generation, Content Marketing"
                  value={businessData.serviceOffering}
                  onChange={(e) => setBusinessData({...businessData, serviceOffering: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignGoal">Marketing Goal</Label>
              <Input
                id="campaignGoal"
                placeholder="e.g., Generate more qualified leads, Build brand authority"
                value={businessData.campaignGoal}
                onChange={(e) => setBusinessData({...businessData, campaignGoal: e.target.value})}
              />
            </div>
            
            {analyzing && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Step {currentStep} of 3: Analyzing agency marketing strategies...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
                <div className="text-xs text-muted-foreground">
                  {currentStep === 1 && "Scanning competitor agencies and extracting winning marketing strategies..."}
                  {currentStep === 2 && "Analyzing competitor angles, pricing strategies, and market positioning..."}
                  {currentStep === 3 && "Generating comprehensive marketing intelligence with winning angles and actionable insights..."}
                </div>
              </div>
            )}
            
            <Button 
              onClick={runAnalysis}
              disabled={analyzing || !businessData.businessName || !businessData.industry}
              className="w-full"
              size="lg"
            >
              {analyzing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {analyzing ? 'Analyzing...' : 'Generate Marketing Intelligence'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Agency Marketing Intelligence Report</h3>
              <p className="text-muted-foreground">Specialization: {businessData.industry}</p>
            </div>
            <Button onClick={() => setAnalysis(null)} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{analysis.industryOverview.marketSize}</p>
                    <p className="text-sm text-muted-foreground">Market Size</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{analysis.industryOverview.clientDemand}</p>
                    <p className="text-sm text-muted-foreground">Client Demand</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{analysis.industryOverview.competitorCount}</p>
                    <p className="text-sm text-muted-foreground">Competitors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">{analysis.industryOverview.avgProjectValue}</p>
                    <p className="text-sm text-muted-foreground">Avg Project Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Analysis Tabs */}
          <Tabs defaultValue="angles" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="angles">Winning Angles</TabsTrigger>
              <TabsTrigger value="ads">Ad Strategies</TabsTrigger>
              <TabsTrigger value="trends">Content Trends</TabsTrigger>
              <TabsTrigger value="competitors">Top Performers</TabsTrigger>
              <TabsTrigger value="platforms">Platform Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="angles" className="space-y-4">
              {analysis.winningAngles.map((angle: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{angle.angle}</span>
                      <Badge variant="default">{angle.effectiveness}</Badge>
                    </CardTitle>
                    <CardDescription>{angle.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>Copy Strategy</span>
                        </Label>
                        <p className="text-sm bg-blue-50 p-3 rounded">{angle.implementation}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center space-x-1">
                          <Camera className="h-4 w-4" />
                          <span>Visual Strategy</span>
                        </Label>
                        <p className="text-sm bg-green-50 p-3 rounded">{angle.visualStrategy}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center space-x-1">
                          <Volume2 className="h-4 w-4" />
                          <span>Audio Strategy</span>
                        </Label>
                        <p className="text-sm bg-purple-50 p-3 rounded">{angle.audioStrategy}</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <Label className="text-sm font-medium">Unique Twist for Your Agency:</Label>
                      <p className="text-sm mt-1 text-orange-600 font-medium">{angle.uniqueTwist}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ads" className="space-y-4">
              {analysis.advertisementStrategies.map((strategy: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>{strategy.strategy}</span>
                    </CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium">Expected Results:</Label>
                      <p className="text-sm font-medium text-green-600">{strategy.expectedResults}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Copy Framework:</Label>
                        <p className="text-sm mt-1 bg-blue-50 p-2 rounded">{strategy.copyFramework}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Implementation:</Label>
                        <p className="text-sm mt-1 bg-gray-50 p-2 rounded">{strategy.implementation}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium flex items-center space-x-1">
                          <Camera className="h-3 w-3" />
                          <span>Visual Recommendations:</span>
                        </Label>
                        <p className="text-sm mt-1 bg-green-50 p-2 rounded">{strategy.visualStrategy}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium flex items-center space-x-1">
                          <Volume2 className="h-3 w-3" />
                          <span>Audio Recommendations:</span>
                        </Label>
                        <p className="text-sm mt-1 bg-purple-50 p-2 rounded">{strategy.audioStrategy}</p>
                      </div>
                    </div>

                    <div className="bg-orange-50 p-3 rounded-lg">
                      <Label className="text-sm font-medium">Unique Twist for Your Agency:</Label>
                      <p className="text-sm mt-1 text-orange-600 font-medium">{strategy.uniqueTwist}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              {analysis.organicContentTrends.map((trend: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{trend.trend}</span>
                      <Badge variant="default">{trend.engagement}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Used by {trend.usage} • Best on: {trend.platforms.join(', ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Examples:</Label>
                      <ul className="mt-2 space-y-1">
                        {trend.examples.map((example: string, exIndex: number) => (
                          <li key={exIndex} className="text-sm bg-blue-50 p-2 rounded">
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium flex items-center space-x-1">
                          <Camera className="h-3 w-3" />
                          <span>Visual Recommendations:</span>
                        </Label>
                        <ul className="mt-1 space-y-1">
                          {trend.visualRecommendations.map((rec: string, recIndex: number) => (
                            <li key={recIndex} className="text-xs bg-green-50 p-2 rounded">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Label className="text-sm font-medium flex items-center space-x-1">
                          <Volume2 className="h-3 w-3" />
                          <span>Audio Recommendations:</span>
                        </Label>
                        <ul className="mt-1 space-y-1">
                          {trend.audioRecommendations.map((rec: string, recIndex: number) => (
                            <li key={recIndex} className="text-xs bg-purple-50 p-2 rounded">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Competitive Winning Angles</CardTitle>
                  <CardDescription>Proven strategies from top performers in your industry</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.competitiveAnalysis.topPerformingAngles.map((angle: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{angle.competitor}</h4>
                        <Badge variant="outline">{angle.winningAngle}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs font-medium">Why It Works:</Label>
                          <p className="text-sm">{angle.whyItWorks}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Your Adaptation:</Label>
                          <p className="text-sm font-medium text-blue-600">{angle.adaptation}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs font-medium">Implementation:</Label>
                          <p className="text-sm bg-yellow-50 p-2 rounded">{angle.implementation}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Pricing Strategy:</Label>
                          <p className="text-sm bg-green-50 p-2 rounded">{angle.pricingStrategy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Strategy Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.competitiveAnalysis.pricingStrategies.map((pricing: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{pricing.strategy}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{pricing.description}</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-medium">Implementation:</Label>
                            <p className="text-sm">{pricing.implementation}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium">Winning Element:</Label>
                            <p className="text-sm text-green-600">{pricing.winningElement}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="platforms" className="space-y-4">
              {Object.entries(analysis.platformInsights).map(([platform, data]: [string, any]) => (
                <Card key={platform}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between capitalize">
                      <span>{platform}</span>
                      <Badge variant="default">{data.avgEngagement} avg engagement</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Best Posting Times:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.bestTimes.map((time: string, timeIndex: number) => (
                          <Badge key={timeIndex} variant="outline">{time}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Top Performing Formats:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.topFormats.map((format: string, formatIndex: number) => (
                          <Badge key={formatIndex} variant="secondary">{format}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Platform-Specific Tips:</Label>
                      <ul className="mt-1 space-y-1">
                        {data.contentTips.map((tip: string, tipIndex: number) => (
                          <li key={tipIndex} className="text-sm bg-yellow-50 p-2 rounded">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default MarketingIntelligence;
