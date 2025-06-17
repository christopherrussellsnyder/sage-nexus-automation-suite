
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Eye, 
  BarChart3,
  MessageSquare,
  Lightbulb,
  Search,
  RefreshCw
} from "lucide-react";

const CompetitiveIntelligencePanel = () => {
  const [industry, setIndustry] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const runAnalysis = async () => {
    setAnalyzing(true);
    
    // Simulate comprehensive analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockAnalysis = {
      industryOverview: {
        marketSize: '$12.4B',
        growthRate: '18.5%',
        competitorCount: 247,
        avgConversionRate: 3.8
      },
      topPerformers: [
        {
          name: 'IndustryLeader Pro',
          marketShare: '23%',
          conversionRate: 5.2,
          topMessages: [
            'The only solution you\'ll ever need',
            'Transform your business in 30 days',
            'Join 50,000+ successful customers'
          ],
          emotionalTriggers: ['urgency', 'social proof', 'authority'],
          weaknesses: ['Generic messaging', 'Limited personalization']
        },
        {
          name: 'MarketDominator Inc',
          marketShare: '18%',
          conversionRate: 4.7,
          topMessages: [
            'Guaranteed results or money back',
            'From struggling to thriving in 90 days',
            'The insider secret to massive growth'
          ],
          emotionalTriggers: ['guarantee', 'transformation', 'exclusivity'],
          weaknesses: ['Overpromising', 'Weak social proof']
        }
      ],
      copyTrends: [
        {
          trend: 'Outcome-focused headlines',
          usage: '78%',
          effectiveness: 'High',
          examples: ['Double your revenue in 60 days', 'From zero to $100K in 6 months']
        },
        {
          trend: 'Social proof in CTAs',
          usage: '65%',
          effectiveness: 'Medium',
          examples: ['Join 10,000+ successful entrepreneurs', 'See why 5,000+ customers choose us']
        },
        {
          trend: 'Problem-agitation-solution structure',
          usage: '82%',
          effectiveness: 'Very High',
          examples: ['Tired of slow growth? Here\'s the solution...']
        }
      ],
      psychologyTriggers: [
        { trigger: 'Urgency', usage: '89%', effectiveness: 4.2 },
        { trigger: 'Social Proof', usage: '76%', effectiveness: 4.0 },
        { trigger: 'Authority', usage: '71%', effectiveness: 3.8 },
        { trigger: 'Scarcity', usage: '68%', effectiveness: 3.9 },
        { trigger: 'Fear of Missing Out', usage: '64%', effectiveness: 4.1 }
      ],
      gapOpportunities: [
        'Most competitors focus on features, not outcomes',
        'Limited use of storytelling in copy',
        'Weak emotional connection in messaging',
        'Generic value propositions',
        'Inconsistent brand voice across platforms'
      ],
      recommendations: [
        'Use transformation-focused headlines with specific timeframes',
        'Incorporate customer success stories in body copy',
        'Lead with unique value proposition, not features',
        'Use emotional triggers: urgency + social proof combination',
        'Test problem-agitation-solution framework for landing pages'
      ]
    };

    setAnalysis(mockAnalysis);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Analysis Input */}
      {!analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Competitive Copy Intelligence</span>
            </CardTitle>
            <CardDescription>
              Analyze your industry's top-performing copy to identify opportunities and best practices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry/Niche</Label>
              <Input
                id="industry"
                placeholder="e.g., SaaS, E-commerce, Digital Marketing, Coaching"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
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
              {analyzing ? 'Analyzing Industry Copy...' : 'Analyze Competitive Copy'}
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
              <h3 className="text-2xl font-bold">Copy Intelligence Report</h3>
              <p className="text-muted-foreground">Industry: {industry}</p>
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
                    <p className="text-2xl font-bold">{analysis.industryOverview.growthRate}</p>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-purple-500" />
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
                  <Zap className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">{analysis.industryOverview.avgConversionRate}%</p>
                    <p className="text-sm text-muted-foreground">Avg Conversion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="competitors" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="competitors">Top Performers</TabsTrigger>
              <TabsTrigger value="trends">Copy Trends</TabsTrigger>
              <TabsTrigger value="psychology">Psychology</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="competitors" className="space-y-4">
              {analysis.topPerformers.map((competitor: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{competitor.name}</span>
                      <div className="flex space-x-2">
                        <Badge variant="secondary">{competitor.marketShare} market share</Badge>
                        <Badge variant="default">{competitor.conversionRate}% conversion</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Top-Performing Messages:</Label>
                      <ul className="mt-2 space-y-1">
                        {competitor.topMessages.map((message: string, msgIndex: number) => (
                          <li key={msgIndex} className="text-sm bg-gray-50 p-2 rounded">
                            "{message}"
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Emotional Triggers:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {competitor.emotionalTriggers.map((trigger: string, triggerIndex: number) => (
                            <Badge key={triggerIndex} variant="outline" className="text-blue-600">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Weaknesses:</Label>
                        <ul className="mt-1 space-y-1">
                          {competitor.weaknesses.map((weakness: string, weakIndex: number) => (
                            <li key={weakIndex} className="text-sm text-red-600">
                              • {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              {analysis.copyTrends.map((trend: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{trend.trend}</span>
                      <div className="flex space-x-2">
                        <Badge variant="secondary">{trend.usage} usage</Badge>
                        <Badge variant={trend.effectiveness === 'Very High' ? 'default' : trend.effectiveness === 'High' ? 'secondary' : 'outline'}>
                          {trend.effectiveness}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label className="text-sm font-medium">Examples:</Label>
                      <ul className="mt-2 space-y-1">
                        {trend.examples.map((example: string, exIndex: number) => (
                          <li key={exIndex} className="text-sm bg-blue-50 p-2 rounded">
                            "{example}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="psychology" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Psychology Trigger Effectiveness</CardTitle>
                  <CardDescription>Based on analysis of top-performing copy in your industry</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.psychologyTriggers.map((trigger: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Zap className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="font-medium">{trigger.trigger}</p>
                            <p className="text-sm text-muted-foreground">Used by {trigger.usage} of competitors</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{trigger.effectiveness}/5</p>
                          <p className="text-xs text-muted-foreground">Effectiveness</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>Market Gaps</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.gapOpportunities.map((gap: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <span className="text-sm">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default CompetitiveIntelligencePanel;
