
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
  Lightbulb
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
    
    // 3-step process for agency analysis
    const analysisSteps = [
      {
        step: 1,
        message: "Analyzing top agency websites in your specialization...",
        duration: 3000
      },
      {
        step: 2,
        message: "Extracting winning content strategies and client acquisition methods...",
        duration: 4000
      },
      {
        step: 3,
        message: "Generating comprehensive agency marketing intelligence report...",
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
          bestPractices: 'Include specific numbers, visual transformations, and authentic client quotes'
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
          bestPractices: 'Show expertise through authentic process reveals and team collaboration'
        },
        {
          trend: 'Educational Tutorial Series',
          platforms: ['LinkedIn', 'YouTube', 'TikTok'],
          engagement: '298% above average',
          usage: '91% of top agencies',
          examples: [
            `${businessData.industry} tip series`,
            'Tool comparisons and reviews',
            'Industry trend predictions'
          ],
          bestPractices: 'Focus on actionable insights, trending topics, and tool demonstrations'
        }
      ],
      topPerformers: [
        {
          name: `${businessData.industry} Growth Agency`,
          specialties: [businessData.industry, 'Lead Generation', 'ROI Optimization'],
          contentStrategy: 'Educational + Case Studies + Thought Leadership',
          postFrequency: '5-6 times/week',
          avgEngagement: '14.2%',
          followers: '125K',
          topContent: [
            `How we scaled a ${businessData.targetAudience} business from $50K to $500K in 12 months`,
            `The ${businessData.industry} strategy that increased client ROI by 400%`,
            'Weekly industry insights every Tuesday'
          ],
          contentCalendar: {
            monday: 'Industry news commentary',
            tuesday: 'Educational tutorials',
            wednesday: 'Client success stories',
            thursday: 'Behind-the-scenes content',
            friday: 'Weekly tips and insights'
          }
        }
      ],
      contentOpportunities: [
        {
          opportunity: `${businessData.industry}-specific tutorials are underutilized`,
          potential: 'High engagement potential in your niche',
          actionable: `Create weekly ${businessData.industry} tutorials targeting ${businessData.targetAudience}`
        },
        {
          opportunity: 'Live client consultation content drives massive engagement',
          potential: 'Builds strong trust and showcases expertise',
          actionable: 'Host monthly live strategy sessions and document the process'
        }
      ],
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
      },
      competitiveAnalysis: {
        avgPostFrequency: '5.1 posts per week',
        topHashtags: [`#${businessData.industry.toLowerCase()}`, '#agencylife', '#clientresults', '#businessgrowth'],
        commonMistakes: [
          'Too much self-promotion without value',
          'Generic content not tailored to specialization',
          'Inconsistent posting schedule',
          'Poor engagement with prospect comments'
        ],
        successFactors: [
          'Consistent value-first educational content',
          'Strong visual branding and professional aesthetics',
          'Regular client success story showcases',
          'Active community engagement and thought leadership'
        ]
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
              AI-powered competitive analysis for agency marketing strategies
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
                  {currentStep === 1 && "Scanning top agency websites and content strategies..."}
                  {currentStep === 2 && "Extracting winning client acquisition methods and content patterns..."}
                  {currentStep === 3 && "Generating comprehensive marketing intelligence report..."}
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

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="trends" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trends">Content Trends</TabsTrigger>
              <TabsTrigger value="competitors">Top Performers</TabsTrigger>
              <TabsTrigger value="platforms">Platform Insights</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

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
                  <CardContent className="space-y-3">
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
                    <div>
                      <Label className="text-sm font-medium">Best Practices:</Label>
                      <p className="text-sm bg-green-50 p-2 rounded mt-1">{trend.bestPractices}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              {analysis.topPerformers.map((performer: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{performer.name}</span>
                      <div className="flex space-x-2">
                        <Badge variant="secondary">{performer.avgEngagement} engagement</Badge>
                        <Badge variant="outline">{performer.followers} followers</Badge>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Specialties: {performer.specialties.join(', ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Content Strategy:</Label>
                        <p className="text-sm mt-1">{performer.contentStrategy}</p>
                        <p className="text-xs text-muted-foreground mt-1">Posts {performer.postFrequency}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Top Performing Content:</Label>
                        <ul className="mt-1 space-y-1">
                          {performer.topContent.map((content: string, contentIndex: number) => (
                            <li key={contentIndex} className="text-sm">
                              • {content}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Weekly Content Calendar:</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {Object.entries(performer.contentCalendar).map(([day, content]: [string, any]) => (
                          <div key={day} className="text-xs bg-purple-50 p-2 rounded">
                            <strong className="capitalize">{day}:</strong> {content}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

            <TabsContent value="opportunities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5" />
                    <span>Content Opportunities</span>
                  </CardTitle>
                  <CardDescription>Underutilized marketing strategies with high potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.contentOpportunities.map((item: any, index: number) => (
                      <li key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{item.opportunity}</p>
                          <p className="text-xs text-muted-foreground">{item.potential}</p>
                          <p className="text-xs bg-white p-2 rounded">{item.actionable}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Competitive Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Common Mistakes to Avoid:</Label>
                    <ul className="mt-2 space-y-1">
                      {analysis.competitiveAnalysis.commonMistakes.map((mistake: string, index: number) => (
                        <li key={index} className="text-sm bg-red-50 p-2 rounded flex items-center">
                          <span className="text-red-500 mr-2">❌</span>
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Success Factors:</Label>
                    <ul className="mt-2 space-y-1">
                      {analysis.competitiveAnalysis.successFactors.map((factor: string, index: number) => (
                        <li key={index} className="text-sm bg-green-50 p-2 rounded flex items-center">
                          <span className="text-green-500 mr-2">✅</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default MarketingIntelligence;
