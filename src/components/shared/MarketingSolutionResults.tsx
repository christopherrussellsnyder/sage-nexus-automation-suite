
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  BarChart3, 
  DollarSign, 
  Users, 
  Zap,
  Download,
  X,
  CheckCircle,
  AlertTriangle,
  Brain,
  Megaphone
} from 'lucide-react';

interface MarketingSolutionResultsProps {
  data: any;
  onClose: () => void;
}

const MarketingSolutionResults = ({ data, onClose }: MarketingSolutionResultsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { businessData, competitorData, solution } = data;

  const getMetricColor = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio >= 0.8) return 'text-green-600';
    if (ratio >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricIcon = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio >= 0.8) return <CheckCircle className="h-4 w-4 text-green-600" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span>Marketing Intelligence Report</span>
          </h2>
          <p className="text-muted-foreground">
            Comprehensive analysis for {businessData.businessName}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{solution.strategy.expectedROAS}x</p>
                <p className="text-sm text-muted-foreground">Expected ROAS</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{competitorData.competitors.length}</p>
                <p className="text-sm text-muted-foreground">Competitors Analyzed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{solution.monthlyPlan.length}</p>
                <p className="text-sm text-muted-foreground">Days Planned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">${businessData.budget.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Monthly Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Strategy Overview</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Intel</TabsTrigger>
          <TabsTrigger value="calendar">30-Day Plan</TabsTrigger>
          <TabsTrigger value="metrics">Optimization</TabsTrigger>
          <TabsTrigger value="insights">Industry Insights</TabsTrigger>
        </TabsList>

        {/* Strategy Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Strategy</CardTitle>
                <CardDescription>Recommended platform priorities and budget allocation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {solution.strategy.primaryPlatforms.map((platform: string, index: number) => (
                  <div key={platform} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant={index === 0 ? 'default' : 'secondary'}>
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{platform}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ${solution.strategy.budgetAllocation[platform]?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Objectives</CardTitle>
                <CardDescription>Primary goals for your marketing campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {solution.strategy.keyObjectives.map((objective: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Calendar Overview</CardTitle>
              <CardDescription>Planned content distribution across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{solution.contentCalendar.weekly.adCount}</p>
                  <p className="text-sm text-muted-foreground">Ads per Week</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{solution.contentCalendar.weekly.organicPosts}</p>
                  <p className="text-sm text-muted-foreground">Organic Posts per Week</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{solution.contentCalendar.monthly.totalAds}</p>
                  <p className="text-sm text-muted-foreground">Total Monthly Ads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{solution.contentCalendar.monthly.totalOrganicPosts}</p>
                  <p className="text-sm text-muted-foreground">Total Organic Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitor Intelligence */}
        <TabsContent value="competitors" className="space-y-6">
          <div className="grid gap-6">
            {competitorData.competitors.slice(0, 3).map((competitor: any, index: number) => (
              <Card key={competitor.domain}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span>{competitor.domain}</span>
                    </CardTitle>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span>{competitor.monthlyVisitors.toLocaleString()} monthly visitors</span>
                      <span>{competitor.roas}x ROAS</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Top Performing Ad</h4>
                      <div className="bg-muted p-3 rounded-lg space-y-2">
                        <p className="text-sm font-medium">{competitor.topAds[0]?.hook}</p>
                        <p className="text-xs text-muted-foreground">{competitor.topAds[0]?.body}</p>
                        <Badge size="sm">{competitor.topAds[0]?.cta}</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Conversion Rate:</span>
                          <span className="font-medium">{competitor.conversionRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Ad Spend:</span>
                          <span className="font-medium">${competitor.adSpend.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>ROAS:</span>
                          <span className="font-medium">{competitor.roas}x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 30-Day Calendar */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Marketing Calendar</CardTitle>
              <CardDescription>Day-by-day content and campaign plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {solution.monthlyPlan.slice(0, 10).map((day: any) => (
                  <div key={day.day} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Day {day.day}</Badge>
                        <Badge variant={day.contentType === 'ad' ? 'default' : 'secondary'}>
                          {day.contentType}
                        </Badge>
                        <span className="text-sm font-medium">{day.platform}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Est. {day.expectedMetrics.estimatedReach.toLocaleString()} reach
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{day.hook}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{day.body}</p>
                    <div className="flex items-center justify-between">
                      <Badge size="sm" variant="outline">{day.cta}</Badge>
                      <div className="text-xs text-muted-foreground">
                        {day.expectedMetrics.estimatedCost && `$${day.expectedMetrics.estimatedCost}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Optimization */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid gap-6">
            {solution.metricOptimization.map((metric: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{metric.metric}</span>
                    <div className="flex items-center space-x-2">
                      {getMetricIcon(metric.currentBenchmark, metric.targetBenchmark)}
                      <span className={`text-sm font-medium ${getMetricColor(metric.currentBenchmark, metric.targetBenchmark)}`}>
                        {metric.currentBenchmark} → {metric.targetBenchmark}
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Current Progress</span>
                        <span>{Math.round((metric.currentBenchmark / metric.targetBenchmark) * 100)}%</span>
                      </div>
                      <Progress value={(metric.currentBenchmark / metric.targetBenchmark) * 100} />
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Improvement Strategies</h4>
                      <ul className="space-y-1">
                        {metric.improvementStrategies.map((strategy: string, i: number) => (
                          <li key={i} className="text-sm flex items-start space-x-2">
                            <Zap className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Industry Insights */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry-Specific Tips</CardTitle>
                <CardDescription>Tailored recommendations for your industry</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {solution.industrySpecificTips.map((tip: string, index: number) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Advantages</CardTitle>
                <CardDescription>How to differentiate from competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Gap Opportunities</h4>
                    <ul className="space-y-2">
                      {solution.competitorInsights.gapOpportunities.map((gap: string, index: number) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <Target className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Differentiation Strategy</h4>
                    <ul className="space-y-2">
                      {solution.competitorInsights.differentiationStrategy.map((strategy: string, index: number) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <Zap className="h-3 w-3 text-purple-500 mt-1 flex-shrink-0" />
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingSolutionResults;
