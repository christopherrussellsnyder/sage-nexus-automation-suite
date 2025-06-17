
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  DollarSign, 
  BarChart3,
  Eye,
  MessageSquare,
  ArrowLeft,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface MarketingSolutionResultsProps {
  data: {
    businessData: any;
    competitorData: any;
    marketingSolution: any;
    timestamp: string;
  };
  onClose: () => void;
}

const MarketingSolutionResults = ({ data, onClose }: MarketingSolutionResultsProps) => {
  const { businessData, competitorData, marketingSolution } = data;

  const getMetricColor = (value: number, thresholds: any) => {
    if (value >= thresholds.excellent) return 'text-green-600';
    if (value >= thresholds.good) return 'text-blue-600';
    if (value >= thresholds.average) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricBadge = (value: number, thresholds: any) => {
    if (value >= thresholds.excellent) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (value >= thresholds.good) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    if (value >= thresholds.average) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Complete Marketing Solution</h2>
          <p className="text-muted-foreground">
            Comprehensive 30-day plan for {businessData.businessName}
          </p>
        </div>
        <Button variant="outline" onClick={onClose} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Generator</span>
        </Button>
      </div>

      {/* Strategy Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{marketingSolution.strategy.expectedROAS}x</p>
                <p className="text-sm text-muted-foreground">Expected ROAS</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold">${businessData.budget}</p>
                <p className="text-sm text-muted-foreground">Monthly Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">30</p>
                <p className="text-sm text-muted-foreground">Days Planned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{marketingSolution.strategy.primaryPlatforms.length}</p>
                <p className="text-sm text-muted-foreground">Primary Platforms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="strategy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="calendar">30-Day Plan</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Strategy Tab */}
        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Strategy Overview</CardTitle>
              <CardDescription>Your personalized marketing approach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Primary Platforms (Priority Order)</h4>
                <div className="flex flex-wrap gap-2">
                  {marketingSolution.strategy.primaryPlatforms.map((platform: string, index: number) => (
                    <Badge key={platform} variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}. {platform}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Key Objectives</h4>
                <ul className="space-y-1">
                  {marketingSolution.strategy.keyObjectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Content Calendar Summary</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Weekly</p>
                    <p className="text-lg font-semibold">
                      {marketingSolution.contentCalendar.weekly.adCount} Ads + {marketingSolution.contentCalendar.weekly.organicPosts} Posts
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly</p>
                    <p className="text-lg font-semibold">
                      {marketingSolution.contentCalendar.monthly.totalAds + marketingSolution.contentCalendar.monthly.totalOrganicPosts} Total Pieces
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis Results</CardTitle>
              <CardDescription>Insights from top performers in your industry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Platform Priority Recommendations</h4>
                <div className="space-y-3">
                  {competitorData.platformPriorities?.map((platform: any, index: number) => (
                    <div key={platform.platform} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            #{platform.priority}
                          </Badge>
                          <h5 className="font-semibold">{platform.platform}</h5>
                        </div>
                        <Badge variant="outline">{platform.budgetAllocation}% Budget</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{platform.reasoning}</p>
                      <p className="text-sm font-medium">{platform.expectedResults}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Top Converting Emotional Triggers</h4>
                <div className="flex flex-wrap gap-2">
                  {competitorData.emotionalTriggers?.primary?.map((trigger: string) => (
                    <Badge key={trigger} className="bg-blue-100 text-blue-800">
                      {trigger.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Market Gap Opportunities</h4>
                <ul className="space-y-2">
                  {marketingSolution.competitorInsights.gapOpportunities.map((gap: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 30-Day Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Marketing Calendar</CardTitle>
              <CardDescription>Day-by-day specific tasks and content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {marketingSolution.monthlyPlan.map((task: any) => (
                  <div key={task.day} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">Day {task.day}</Badge>
                        <Badge variant={task.contentType === 'ad' ? 'default' : 'secondary'}>
                          {task.platform}
                        </Badge>
                        <Badge variant="outline">
                          {task.contentType === 'ad' ? 'Paid Ad' : 'Organic Post'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Est. {task.expectedMetrics.estimatedConversions} conversions
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-sm">Hook: </span>
                        <span className="text-sm">{task.hook}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">Body: </span>
                        <span className="text-sm">{task.body}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">CTA: </span>
                        <span className="text-sm">{task.cta}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">Visual: </span>
                        <span className="text-sm">{task.visual}</span>
                      </div>
                      {task.hashtags && (
                        <div>
                          <span className="font-semibold text-sm">Hashtags: </span>
                          <span className="text-sm">{task.hashtags.join(' ')}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 p-3 bg-muted rounded">
                      <p className="text-sm font-medium mb-1">Why this works:</p>
                      <p className="text-sm text-muted-foreground">{task.reasoning}</p>
                    </div>

                    <div className="mt-2">
                      <details className="text-sm">
                        <summary className="cursor-pointer font-medium">Optimization Tips</summary>
                        <ul className="mt-2 space-y-1 ml-4">
                          {task.optimizationTips.map((tip: string, index: number) => (
                            <li key={index} className="text-muted-foreground">• {tip}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metric Optimization Guide</CardTitle>
              <CardDescription>How to improve each key metric</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {marketingSolution.metricOptimization.map((metric: any) => (
                <div key={metric.metric} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{metric.metric}</h4>
                    {getMetricBadge(metric.currentBenchmark, metric.warningThresholds)}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Benchmark</p>
                      <p className={`text-lg font-semibold ${getMetricColor(metric.currentBenchmark, metric.warningThresholds)}`}>
                        {metric.currentBenchmark}{metric.metric.includes('Rate') || metric.metric.includes('CTR') ? '%' : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Target Benchmark</p>
                      <p className="text-lg font-semibold text-green-600">
                        {metric.targetBenchmark}{metric.metric.includes('Rate') || metric.metric.includes('CTR') ? '%' : ''}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Improvement Strategies:</h5>
                    <ul className="space-y-1">
                      {metric.improvementStrategies.map((strategy: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3">
                    <h5 className="font-medium mb-2">Performance Thresholds:</h5>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center p-2 bg-red-50 rounded">
                        <p className="text-red-600 font-medium">Poor</p>
                        <p>&lt; {metric.warningThresholds.poor}</p>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <p className="text-yellow-600 font-medium">Average</p>
                        <p>{metric.warningThresholds.poor}-{metric.warningThresholds.average}</p>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <p className="text-blue-600 font-medium">Good</p>
                        <p>{metric.warningThresholds.average}-{metric.warningThresholds.good}</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <p className="text-green-600 font-medium">Excellent</p>
                        <p>&gt; {metric.warningThresholds.excellent}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>Optimized spend across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(marketingSolution.strategy.budgetAllocation).map(([platform, amount]: [string, any]) => (
                  <div key={platform} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{platform}</h4>
                      <p className="text-sm text-muted-foreground">
                        {((amount / businessData.budget) * 100).toFixed(0)}% of total budget
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${amount}</p>
                      <p className="text-sm text-muted-foreground">per month</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Insights</CardTitle>
              <CardDescription>Tailored recommendations for your industry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketingSolution.industrySpecificTips.map((tip: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-500 mt-0.5" />
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingSolutionResults;
