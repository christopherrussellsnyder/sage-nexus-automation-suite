
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Target,
  Zap,
  Brain,
  Download,
  RefreshCw
} from 'lucide-react';

interface IntelligenceResultsProps {
  data: any;
  businessType: string;
  onBack: () => void;
}

const IntelligenceResults = ({ data, businessType, onBack }: IntelligenceResultsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getMetricStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return { status: 'excellent', color: 'text-green-600', icon: CheckCircle };
    if (percentage >= 70) return { status: 'good', color: 'text-blue-600', icon: TrendingUp };
    if (percentage >= 50) return { status: 'warning', color: 'text-orange-600', icon: AlertTriangle };
    return { status: 'critical', color: 'text-red-600', icon: TrendingDown };
  };

  const conversionMetric = data.metricInsights.conversionRate;
  const conversionStatus = getMetricStatus(conversionMetric.current, conversionMetric.target);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Setup
          </Button>
          <div>
            <h3 className="text-2xl font-bold">Intelligence Report</h3>
            <p className="text-muted-foreground">Comprehensive analysis for {data.businessData.businessName}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Performance Summary */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{data.performanceAnalysis.strengths.length}</p>
                    <p className="text-sm text-muted-foreground">Strengths</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{data.performanceAnalysis.weaknesses.length}</p>
                    <p className="text-sm text-muted-foreground">Areas to Improve</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{data.performanceAnalysis.opportunities.length}</p>
                    <p className="text-sm text-muted-foreground">Opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{data.businessData.primaryGoals.length}</p>
                    <p className="text-sm text-muted-foreground">Active Goals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SWOT Analysis */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.performanceAnalysis.strengths.map((strength: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-sm">{strength}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Areas for Improvement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.performanceAnalysis.weaknesses.map((weakness: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-sm">{weakness}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                  <span>Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.performanceAnalysis.opportunities.map((opportunity: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-sm">{opportunity}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <TrendingDown className="h-5 w-5" />
                  <span>Threats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.performanceAnalysis.threats.map((threat: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-sm">{threat}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Performance Metrics Analysis</span>
              </CardTitle>
              <CardDescription>Current performance vs industry benchmarks and targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <conversionStatus.icon className={`h-5 w-5 ${conversionStatus.color}`} />
                    <div>
                      <p className="font-medium">Conversion Rate</p>
                      <p className="text-sm text-muted-foreground">Website visitors to customers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{conversionMetric.current}%</p>
                    <p className="text-sm text-muted-foreground">Target: {conversionMetric.target}%</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Target</span>
                    <span>{Math.round((conversionMetric.current / conversionMetric.target) * 100)}%</span>
                  </div>
                  <Progress value={(conversionMetric.current / conversionMetric.target) * 100} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {conversionMetric.current}%</span>
                    <span>Industry: {conversionMetric.industry}%</span>
                    <span>Target: {conversionMetric.target}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Optimization Recommendations</h4>
                <div className="space-y-1">
                  {conversionMetric.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-blue-800">
                      <Zap className="h-3 w-3" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CAC Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    ${Math.round(data.metricInsights.customerAcquisitionCost.current)}
                  </p>
                  <p className="text-sm text-muted-foreground">Current CAC</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    ${Math.round(data.metricInsights.customerAcquisitionCost.target)}
                  </p>
                  <p className="text-sm text-muted-foreground">Target CAC</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    ${data.businessData.customerLifetimeValue}
                  </p>
                  <p className="text-sm text-muted-foreground">Customer LTV</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">CAC Optimization Strategies</h4>
                {data.metricInsights.customerAcquisitionCost.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Target className="h-3 w-3 text-blue-500" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Roadmap</CardTitle>
              <CardDescription>Prioritized action plan for improvement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-3">🚨 Immediate Actions (This Week)</h4>
                <div className="space-y-2">
                  {data.optimizationPlan.immediate.map((action: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                      <Zap className="h-4 w-4 text-red-600" />
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-orange-600 mb-3">📅 Short-term Goals (Next 30 Days)</h4>
                <div className="space-y-2">
                  {data.optimizationPlan.shortTerm.map((action: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                      <Target className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600 mb-3">🎯 Long-term Strategy (Next 90 Days)</h4>
                <div className="space-y-2">
                  {data.optimizationPlan.longTerm.map((action: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Quick Wins</CardTitle>
                <CardDescription>High-impact, low-effort improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-800">Optimize Call-to-Action Buttons</h5>
                    <p className="text-sm text-green-700 mt-1">
                      Change button colors to high-contrast colors and test different action words.
                      Expected lift: 5-15% conversion rate improvement.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-800">Add Social Proof Elements</h5>
                    <p className="text-sm text-green-700 mt-1">
                      Include customer testimonials and trust badges on key pages.
                      Expected lift: 8-20% conversion rate improvement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Strategic Improvements</CardTitle>
                <CardDescription>Medium-term initiatives for significant growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800">Implement Email Automation</h5>
                    <p className="text-sm text-blue-700 mt-1">
                      Set up welcome series and abandoned cart recovery sequences.
                      Expected impact: 15-25% increase in customer lifetime value.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800">Develop Content Marketing Strategy</h5>
                    <p className="text-sm text-blue-700 mt-1">
                      Create valuable content to attract organic traffic and build authority.
                      Expected impact: 30-50% reduction in customer acquisition cost.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Metric-Specific Recommendations</CardTitle>
              <CardDescription>Targeted advice based on your current performance gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h5 className="font-medium text-red-800">Conversion Rate Optimization</h5>
                  <p className="text-sm text-red-700 mt-1">
                    Your current conversion rate of {conversionMetric.current}% is below the industry average of {conversionMetric.industry}%. 
                    Focus on landing page optimization, form simplification, and trust signal implementation.
                  </p>
                  <div className="mt-2 space-y-1">
                    {conversionMetric.recommendations.slice(0, 2).map((rec: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-red-600">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h5 className="font-medium text-orange-800">Customer Acquisition Cost Reduction</h5>
                  <p className="text-sm text-orange-700 mt-1">
                    Your CAC of ${Math.round(data.metricInsights.customerAcquisitionCost.current)} exceeds the recommended 33% of LTV. 
                    Focus on organic growth channels and improving conversion rates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntelligenceResults;
