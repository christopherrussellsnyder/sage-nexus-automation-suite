
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
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockAnalysis = {
      industryOverview: {
        marketSize: '$8.2B',
        clientDemand: 'High',
        competitorCount: 156,
        avgProjectValue: '$4,200'
      },
      organicContentTrends: [
        {
          trend: 'Educational carousel posts',
          platforms: ['Instagram', 'LinkedIn'],
          engagement: '127% above average',
          usage: '78% of top agencies',
          examples: ['Step-by-step tutorials', 'Industry insights', 'Tool comparisons']
        },
        {
          trend: 'Behind-the-scenes content',
          platforms: ['Instagram Stories', 'TikTok'],
          engagement: '89% above average',
          usage: '65% of top agencies',
          examples: ['Team meetings', 'Client wins', 'Office culture']
        },
        {
          trend: 'Client success stories',
          platforms: ['LinkedIn', 'Facebook'],
          engagement: '156% above average',
          usage: '92% of top agencies',
          examples: ['Before/after results', 'ROI testimonials', 'Case study videos']
        }
      ],
      topPerformers: [
        {
          name: 'Digital Growth Agency',
          specialties: ['SEO', 'PPC', 'Content Marketing'],
          contentStrategy: 'Educational + Case Studies',
          postFrequency: '3-4 times/week',
          avgEngagement: '8.4%',
          followers: '42K',
          topContent: [
            'How we increased client ROI by 340%',
            '5 SEO mistakes that cost businesses $10K+',
            'Client transformation Tuesday series'
          ]
        },
        {
          name: 'Creative Collective Co',
          specialties: ['Brand Design', 'Social Media', 'Video'],
          contentStrategy: 'Visual Storytelling + Process',
          postFrequency: '5-6 times/week',
          avgEngagement: '12.1%',
          followers: '28K',
          topContent: [
            'Brand transformation time-lapses',
            'Design process breakdowns',
            'Client collaboration stories'
          ]
        }
      ],
      contentOpportunities: [
        'Industry-specific how-to guides underused',
        'Tool reviews and comparisons have high engagement potential',
        'Client interview content is rare but highly effective',
        'Process transparency content builds strong trust',
        'Trend prediction posts establish thought leadership'
      ],
      platformInsights: {
        linkedin: {
          bestTimes: ['Tuesday-Thursday 9-11 AM'],
          topFormats: ['Document carousels', 'Video testimonials', 'Industry insights'],
          avgEngagement: '6.8%'
        },
        instagram: {
          bestTimes: ['Monday-Wednesday 11 AM-1 PM'],
          topFormats: ['Story highlights', 'Reels tutorials', 'Carousel tips'],
          avgEngagement: '4.2%'
        },
        facebook: {
          bestTimes: ['Wednesday-Friday 1-3 PM'],
          topFormats: ['Client stories', 'Live Q&As', 'Group discussions'],
          avgEngagement: '3.1%'
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
              Analyze organic content strategies and trends in your agency niche
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
              <h3 className="text-2xl font-bold">Marketing Intelligence Report</h3>
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
                  <CardContent>
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
                    {analysis.contentOpportunities.map((opportunity: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <span className="text-sm">{opportunity}</span>
                      </li>
                    ))}
                  </ul>
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
