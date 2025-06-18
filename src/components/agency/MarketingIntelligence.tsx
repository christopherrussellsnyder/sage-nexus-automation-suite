
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
  const [industry, setIndustry] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const runAnalysis = async () => {
    if (!industry.trim()) return;
    
    setAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const progressSteps = [
      "Analyzing agency websites in your niche...",
      "Extracting organic content strategies...",
      "Identifying top-performing content types...",
      "Generating intelligence report..."
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 25);
    }
    
    const mockAnalysis = {
      industryOverview: {
        marketSize: '$12.8B',
        clientDemand: 'Very High',
        competitorCount: 342,
        avgProjectValue: '$8,500'
      },
      organicContentTrends: [
        {
          trend: 'Case Study Carousels',
          platforms: ['LinkedIn', 'Instagram'],
          engagement: '247% above average',
          usage: '89% of top agencies',
          examples: ['Before/after client results', 'ROI breakdowns', 'Process walkthroughs'],
          bestPractices: 'Use specific numbers, visual transformations, and client testimonials'
        },
        {
          trend: 'Behind-the-Scenes Content',
          platforms: ['Instagram Stories', 'LinkedIn'],
          engagement: '156% above average',
          usage: '73% of top agencies',
          examples: ['Team strategy sessions', 'Client meetings', 'Tool tutorials'],
          bestPractices: 'Show authenticity, team expertise, and client collaboration'
        },
        {
          trend: 'Educational Tutorial Series',
          platforms: ['LinkedIn', 'YouTube', 'TikTok'],
          engagement: '198% above average',
          usage: '82% of top agencies',
          examples: ['Marketing tip series', 'Tool comparisons', 'Industry insights'],
          bestPractices: 'Focus on actionable tips, trending topics, and tool demonstrations'
        },
        {
          trend: 'Client Success Spotlights',
          platforms: ['LinkedIn', 'Facebook'],
          engagement: '289% above average',
          usage: '95% of top agencies',
          examples: ['Client transformation stories', 'Revenue growth highlights', 'Award announcements'],
          bestPractices: 'Include specific metrics, client quotes, and visual proof'
        }
      ],
      topPerformers: [
        {
          name: 'Growth Marketing Pro',
          specialties: ['Digital Marketing', 'SEO', 'PPC'],
          contentStrategy: 'Educational + Case Studies + Thought Leadership',
          postFrequency: '4-5 times/week',
          avgEngagement: '12.8%',
          followers: '85K',
          topContent: [
            'How we scaled a SaaS from $10K to $100K MRR in 8 months',
            'The SEO strategy that increased organic traffic by 400%',
            'Weekly marketing insights every Tuesday'
          ],
          contentCalendar: {
            monday: 'Industry news commentary',
            tuesday: 'Educational tutorials',
            wednesday: 'Client success stories',
            thursday: 'Behind-the-scenes',
            friday: 'Weekly roundup/tips'
          }
        },
        {
          name: 'Creative Agency Collective',
          specialties: ['Brand Design', 'Creative Strategy', 'Content'],
          contentStrategy: 'Visual Storytelling + Process Shows + Portfolio',
          postFrequency: '6-7 times/week',
          avgEngagement: '15.2%',
          followers: '64K',
          topContent: [
            'Brand transformation time-lapses',
            'Design process breakdowns',
            'Client collaboration stories'
          ],
          contentCalendar: {
            monday: 'Monday motivation/inspiration',
            tuesday: 'Transformation Tuesday',
            wednesday: 'Work-in-progress Wednesday',
            thursday: 'Throwback Thursday (past projects)',
            friday: 'Feature Friday (team/client spotlight)'
          }
        }
      ],
      contentOpportunities: [
        {
          opportunity: 'Industry-specific tutorials are underused',
          potential: 'High engagement potential',
          actionable: 'Create niche-specific how-to content for your target industries'
        },
        {
          opportunity: 'Client interview content is rare but highly effective',
          potential: 'Builds strong trust and credibility',
          actionable: 'Schedule monthly client interviews and turn into content series'
        },
        {
          opportunity: 'Tool reviews and comparisons drive high engagement',
          potential: 'Positions as industry expert',
          actionable: 'Review marketing tools your clients use and provide honest comparisons'
        },
        {
          opportunity: 'Trend prediction posts establish thought leadership',
          potential: 'Increases industry authority',
          actionable: 'Share monthly trend predictions and analysis for your specialization'
        }
      ],
      platformInsights: {
        linkedin: {
          bestTimes: ['Tuesday-Thursday 9-11 AM', 'Wednesday 1-3 PM'],
          topFormats: ['Document carousels', 'Video case studies', 'Industry insights', 'Client testimonials'],
          avgEngagement: '8.4%',
          contentTips: [
            'Professional tone with personal touches',
            'Use data and specific metrics',
            'Engage in comments within first hour',
            'Share industry news with your take'
          ]
        },
        instagram: {
          bestTimes: ['Monday-Wednesday 11 AM-1 PM', 'Thursday 5-7 PM'],
          topFormats: ['Story highlights', 'Reels tutorials', 'Carousel case studies', 'Behind-the-scenes'],
          avgEngagement: '6.7%',
          contentTips: [
            'Visual-first approach',
            'Use trending audio for Reels',
            'Create story templates for consistency',
            'Highlight client transformations visually'
          ]
        },
        facebook: {
          bestTimes: ['Wednesday-Friday 1-3 PM', 'Saturday 12-2 PM'],
          topFormats: ['Client success posts', 'Educational videos', 'Live Q&As', 'Community discussions'],
          avgEngagement: '4.2%',
          contentTips: [
            'Longer-form content performs well',
            'Use Facebook Live for real-time engagement',
            'Create discussion posts with questions',
            'Share detailed case studies'
          ]
        },
        youtube: {
          bestTimes: ['Tuesday-Thursday 2-4 PM', 'Saturday-Sunday 9-11 AM'],
          topFormats: ['Tutorial series', 'Client case studies', 'Tool reviews', 'Industry analysis'],
          avgEngagement: '3.8%',
          contentTips: [
            'Create series for better retention',
            'Optimize thumbnails and titles',
            'Include clear CTAs in videos',
            'Collaborate with other agencies'
          ]
        }
      },
      competitiveAnalysis: {
        avgPostFrequency: '4.2 posts per week',
        topHashtags: ['#digitalmarketing', '#marketingagency', '#ROI', '#growthhacking', '#businessgrowth'],
        commonMistakes: [
          'Too much self-promotion, not enough value',
          'Inconsistent posting schedule',
          'Generic content not tailored to niche',
          'Poor engagement with audience comments'
        ],
        successFactors: [
          'Consistent value-first approach',
          'Strong visual branding',
          'Regular client success showcases',
          'Active community engagement'
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
              Analyze organic content strategies and trends in your agency specialization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Agency Specialization</Label>
              <Input
                id="industry"
                placeholder="e.g., Digital Marketing, Design, SEO, Social Media"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            
            {analyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing organic content trends...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground">
                  Scanning competitor content, engagement patterns, and industry insights...
                </p>
              </div>
            )}
            
            <Button 
              onClick={runAnalysis}
              disabled={analyzing || !industry}
              className="w-full"
              size="lg"
            >
              {analyzing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {analyzing ? 'Analyzing...' : 'Analyze Content Strategy'}
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
              <p className="text-muted-foreground">Specialization: {industry}</p>
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
                  <CardDescription>Underutilized content strategies with high potential</CardDescription>
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
