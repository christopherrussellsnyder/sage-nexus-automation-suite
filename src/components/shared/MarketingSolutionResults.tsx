
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  BarChart3, 
  DollarSign,
  Eye,
  MousePointer,
  Users,
  Calendar,
  Zap,
  AlertTriangle,
  CheckCircle,
  Star,
  PlayCircle,
  Image,
  Hash,
  Heart,
  Share,
  MessageCircle,
  Download
} from 'lucide-react';

interface MarketingSolutionResultsProps {
  data: any;
  onClose: () => void;
}

const MarketingSolutionResults = ({ data, onClose }: MarketingSolutionResultsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const { businessData, competitorData, marketingSolution } = data;

  const getMetricColor = (metric: string, value: number) => {
    const thresholds = marketingSolution.metricOptimization?.find((m: any) => m.metric === metric)?.warningThresholds;
    if (!thresholds) return 'text-gray-600';
    
    if (value >= thresholds.excellent) return 'text-green-600';
    if (value >= thresholds.good) return 'text-blue-600';
    if (value >= thresholds.average) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricIcon = (value: number, thresholds: any) => {
    if (value >= thresholds.excellent) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (value >= thresholds.good) return <TrendingUp className="h-4 w-4 text-blue-500" />;
    if (value >= thresholds.average) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onClose} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Generator</span>
        </Button>
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </Button>
      </div>

      {/* Business Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Marketing Solution for {businessData.businessName}</span>
          </CardTitle>
          <CardDescription>
            {businessData.industry} • {businessData.businessType} • ${businessData.productPrice} • {businessData.timeline}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{marketingSolution.strategy?.expectedROAS}x</p>
              <p className="text-sm text-muted-foreground">Expected ROAS</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">${businessData.budget}</p>
              <p className="text-sm text-muted-foreground">Monthly Budget</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{marketingSolution.strategy?.primaryPlatforms?.length}</p>
              <p className="text-sm text-muted-foreground">Primary Platforms</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">30</p>
              <p className="text-sm text-muted-foreground">Days of Content</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="calendar">30-Day Plan</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Strategy Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Strategy Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Primary Platforms (Priority Order)</h4>
                <div className="flex flex-wrap gap-2">
                  {marketingSolution.strategy?.primaryPlatforms?.map((platform: string, index: number) => (
                    <Badge key={platform} variant={index === 0 ? 'default' : 'secondary'}>
                      #{index + 1} {platform}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Key Objectives</h4>
                <ul className="space-y-1">
                  {marketingSolution.strategy?.keyObjectives?.map((objective: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Content Calendar Summary</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-900">Weekly</p>
                    <p className="text-sm text-blue-700">
                      {marketingSolution.contentCalendar?.weekly?.adCount} ads • {marketingSolution.contentCalendar?.weekly?.organicPosts} organic posts
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-900">Monthly</p>
                    <p className="text-sm text-green-700">
                      {marketingSolution.contentCalendar?.monthly?.totalAds} total ads • {marketingSolution.contentCalendar?.monthly?.totalOrganicPosts} total posts
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {marketingSolution.industrySpecificTips?.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
              <CardDescription>Top performing competitors in your industry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {competitorData.competitors?.map((competitor: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{competitor.domain}</h4>
                    <Badge variant="secondary">{competitor.roas}x ROAS</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Monthly Visitors</p>
                      <p className="text-blue-600">{competitor.monthlyVisitors?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Conversion Rate</p>
                      <p className="text-green-600">{competitor.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="font-medium">Ad Spend</p>
                      <p className="text-purple-600">${competitor.adSpend?.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Top Performing Ad</h5>
                    {competitor.topAds?.[0] && (
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">HOOK</p>
                          <p className="text-sm font-medium">{competitor.topAds[0].hook}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">BODY</p>
                          <p className="text-sm">{competitor.topAds[0].body}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">CTA</p>
                          <p className="text-sm font-medium text-blue-600">{competitor.topAds[0].cta}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {competitor.topAds[0].emotions?.map((emotion: string) => (
                            <Badge key={emotion} variant="outline" className="text-xs">{emotion}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Competitive Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Competitive Insights & Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Gap Opportunities</h4>
                <ul className="space-y-1">
                  {marketingSolution.competitorInsights?.gapOpportunities?.map((gap: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Differentiation Strategy</h4>
                <ul className="space-y-1">
                  {marketingSolution.competitorInsights?.differentiationStrategy?.map((strategy: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{strategy}</span>
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
              <CardDescription>Daily content and advertising strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {marketingSolution.monthlyPlan?.map((task: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold">Day {task.day}</span>
                        <Badge variant="outline">{task.platform}</Badge>
                        <Badge variant={task.contentType === 'ad' ? 'default' : 'secondary'}>
                          {task.contentType === 'ad' ? 'Paid Ad' : 'Organic Post'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-500">HOOK</p>
                          <p className="text-sm font-medium">{task.hook}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">BODY</p>
                          <p className="text-sm">{task.body}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">CTA</p>
                          <p className="text-sm font-medium text-blue-600">{task.cta}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">VISUAL</p>
                          <p className="text-sm">{task.visual}</p>
                        </div>
                        {task.hashtags && (
                          <div>
                            <p className="text-xs font-medium text-gray-500">HASHTAGS</p>
                            <div className="flex flex-wrap gap-1">
                              {task.hashtags.map((hashtag: string) => (
                                <Badge key={hashtag} variant="outline" className="text-xs">{hashtag}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-500">REASONING</p>
                          <p className="text-sm">{task.reasoning}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-gray-500">EXPECTED METRICS</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{task.expectedMetrics?.estimatedReach?.toLocaleString()} reach</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{task.expectedMetrics?.estimatedEngagement?.toLocaleString()} engagement</span>
                            </div>
                            {task.expectedMetrics?.estimatedCost && (
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>${task.expectedMetrics.estimatedCost} cost</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Target className="h-3 w-3" />
                              <span>{task.expectedMetrics?.estimatedConversions} conversions</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-gray-500">OPTIMIZATION TIPS</p>
                          <ul className="text-xs space-y-1">
                            {task.optimizationTips?.slice(0, 2).map((tip: string, tipIndex: number) => (
                              <li key={tipIndex} className="flex items-start space-x-1">
                                <span className="text-blue-500">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metric Optimization Guide</CardTitle>
              <CardDescription>Benchmarks and improvement strategies for key metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {marketingSolution.metricOptimization?.map((metric: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{metric.metric}</h4>
                    <div className="flex items-center space-x-2">
                      {getMetricIcon(metric.currentBenchmark, metric.warningThresholds)}
                      <span className={`font-medium ${getMetricColor(metric.metric, metric.currentBenchmark)}`}>
                        {metric.currentBenchmark}{metric.metric === 'CPM' || metric.metric === 'CPC' ? '' : metric.metric.includes('Rate') ? '%' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Current vs Target</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current: {metric.currentBenchmark}</span>
                          <span>Target: {metric.targetBenchmark}</span>
                        </div>
                        <Progress 
                          value={(metric.currentBenchmark / metric.targetBenchmark) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="mt-3 grid grid-cols-4 gap-1 text-xs">
                        <div className="text-center">
                          <div className="w-full h-2 bg-red-200 rounded"></div>
                          <span>Poor: {metric.warningThresholds.poor}</span>
                        </div>
                        <div className="text-center">
                          <div className="w-full h-2 bg-yellow-200 rounded"></div>
                          <span>Avg: {metric.warningThresholds.average}</span>
                        </div>
                        <div className="text-center">
                          <div className="w-full h-2 bg-blue-200 rounded"></div>
                          <span>Good: {metric.warningThresholds.good}</span>
                        </div>
                        <div className="text-center">
                          <div className="w-full h-2 bg-green-200 rounded"></div>
                          <span>Excel: {metric.warningThresholds.excellent}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Improvement Strategies</p>
                      <ul className="space-y-1">
                        {metric.improvementStrategies?.map((strategy: string, strategyIndex: number) => (
                          <li key={strategyIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                            <span className="text-sm">{strategy}</span>
                          </li>
                        ))}
                      </ul>
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
              <CardTitle>Budget Allocation Strategy</CardTitle>
              <CardDescription>Optimized budget distribution across platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Platform Budget Allocation</h4>
                  <div className="space-y-3">
                    {Object.entries(marketingSolution.strategy?.budgetAllocation || {}).map(([platform, amount]: [string, any]) => (
                      <div key={platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">{platform}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${amount?.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">
                            {((amount / businessData.budget) * 100).toFixed(0)}% of budget
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Expected Performance</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">Expected ROAS</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{marketingSolution.strategy?.expectedROAS}x</p>
                      <p className="text-xs text-green-700">Return on Ad Spend</p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Projected Revenue</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        ${(businessData.budget * marketingSolution.strategy?.expectedROAS).toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-700">Monthly Revenue Target</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emotional Triggers & Market Insights</CardTitle>
              <CardDescription>Psychological drivers that work in your industry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Primary Emotional Triggers</h4>
                  <div className="flex flex-wrap gap-2">
                    {competitorData.emotionalTriggers?.primary?.map((trigger: string) => (
                      <Badge key={trigger} className="bg-green-100 text-green-800">{trigger}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Secondary Triggers</h4>
                  <div className="flex flex-wrap gap-2">
                    {competitorData.emotionalTriggers?.secondary?.map((trigger: string) => (
                      <Badge key={trigger} variant="outline">{trigger}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Platform Priorities & Reasoning</h4>
                <div className="space-y-3">
                  {competitorData.platformPriorities?.map((platform: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={index < 2 ? 'default' : 'secondary'}>#{platform.priority}</Badge>
                          <span className="font-medium">{platform.platform}</span>
                        </div>
                        <Badge variant="outline">{platform.budgetAllocation}% budget</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{platform.reasoning}</p>
                      <p className="text-sm font-medium text-blue-600">{platform.expectedResults}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingSolutionResults;
