
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
  CheckCircle,
  AlertTriangle,
  Brain,
  Eye
} from 'lucide-react';

const MockSolutionPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data that represents what would be generated
  const mockData = {
    businessData: {
      businessName: "Your Business Name",
      industry: "E-commerce",
      businessType: "B2C",
      targetAudience: "Young professionals aged 25-35",
      productPrice: 299,
      productDescription: "Premium fitness tracking device with AI coaching",
      monthlyUsers: 10000,
      conversionRate: 2.5,
      budget: 5000,
      timeline: "90 days",
      campaignGoal: "Increase Sales",
      marketingType: "paid"
    },
    solution: {
      platformRecommendations: [
        {
          platform: "Facebook",
          priority: 1,
          reasoning: "Best ROI for E-commerce businesses targeting Young professionals aged 25-35 with your budget range of $5,000",
          expectedMetrics: {
            roas: 3.8,
            cpm: 9.20,
            conversionRate: 4.1
          }
        },
        {
          platform: "Instagram",
          priority: 2,
          reasoning: "Strong visual platform ideal for E-commerce with paid marketing approach",
          expectedMetrics: {
            roas: 3.2,
            cpm: 12.40,
            conversionRate: 3.6
          }
        },
        {
          platform: "Google",
          priority: 3,
          reasoning: "High-intent traffic perfect for Increase Sales goal with immediate conversion potential",
          expectedMetrics: {
            roas: 4.5,
            cpm: 15.80,
            conversionRate: 5.2
          }
        }
      ],
      monthlyPlan: [
        {
          day: 1,
          platform: "Facebook",
          contentType: "ad",
          hook: "Are you still struggling with low conversion rates in your E-commerce business?",
          body: "Your Business Name has developed a proven system that helps Young professionals aged 25-35 achieve Increase Sales without the typical challenges of the E-commerce industry. Our Premium fitness tracking device with AI coaching delivers consistent results even if you've tried other solutions before.",
          cta: "Get Started Today",
          reasoning: "Day 1 focuses on urgency trigger to maximize Increase Sales for Young professionals aged 25-35.",
          visualSuggestions: "Split-screen showing before/after results with customer testimonial overlay, optimized for Facebook feed placement",
          expectedMetrics: {
            roas: 4.2,
            cpm: 12.8,
            cpc: 1.85,
            conversionRate: 2.8,
            estimatedReach: 1000,
            estimatedEngagement: 200,
            estimatedCost: 250,
            estimatedConversions: 25
          }
        },
        {
          day: 2,
          platform: "Instagram",
          contentType: "ad",
          hook: "Young professionals aged 25-35 love this one simple trick that boosts results by 300%",
          body: "Your Business Name has developed a proven system that helps Young professionals aged 25-35 achieve Increase Sales without the typical challenges of the E-commerce industry. Our Premium fitness tracking device with AI coaching delivers consistent results even if you've tried other solutions before.",
          cta: "Claim Your Free Analysis",
          reasoning: "Day 2 focuses on urgency trigger to maximize Increase Sales for Young professionals aged 25-35.",
          visualSuggestions: "Split-screen showing before/after results with customer testimonial overlay, optimized for Instagram feed placement",
          expectedMetrics: {
            roas: 3.5,
            cpm: 8.5,
            cpc: 2.25,
            conversionRate: 3.2,
            estimatedReach: 1000,
            estimatedEngagement: 200,
            estimatedCost: 250,
            estimatedConversions: 25
          }
        }
        // ... continues for 30 days
      ],
      industryEmotions: ["urgency", "exclusivity", "fear of missing out", "trust"],
      optimizationTips: [
        {
          metric: "Conversion Rate",
          issue: "Below industry average of 3.2%",
          solution: "Implement clearer pricing tiers and streamline checkout process",
          expectedImprovement: "25-40% increase in conversions"
        },
        {
          metric: "Cost Per Click",
          issue: "Higher than optimal for your industry",
          solution: "Refresh creative assets with emotional triggers and improve targeting precision",
          expectedImprovement: "15-30% cost reduction"
        },
        {
          metric: "Customer Retention",
          issue: "High churn after initial engagement",
          solution: "Implement automated follow-up sequence with value-add content",
          expectedImprovement: "45% increase in repeat purchases"
        }
      ],
      competitorInsights: [
        {
          competitor: "Top Competitor in Your Industry",
          keyStrategy: "Problem-solution narrative with strong social proof elements",
          performanceMetric: "4.2% conversion rate, $18 CPM",
          applicationForUser: "Implement similar testimonial-driven approach with your unique value proposition"
        },
        {
          competitor: "Emerging Brand",
          keyStrategy: "High-frequency posting with user-generated content",
          performanceMetric: "8.5% engagement rate, 22% monthly growth",
          applicationForUser: "Launch a branded hashtag campaign to generate authentic UGC"
        },
        {
          competitor: "Enterprise Player",
          keyStrategy: "Authority positioning through data-driven content",
          performanceMetric: "380% ROI on white paper campaigns",
          applicationForUser: "Create a simplified research report highlighting key industry trends"
        }
      ]
    }
  };

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
            <Eye className="h-8 w-8 text-primary" />
            <span>Marketing Solution Preview</span>
          </h2>
          <p className="text-muted-foreground">
            This is what your marketing intelligence report would look like
          </p>
        </div>
        <Badge variant="secondary">Mock Preview</Badge>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold">3.8x</p>
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
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Top Platforms</p>
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
              <DollarSign className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">$5,000</p>
                <p className="text-sm text-muted-foreground">Monthly Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Strategy Overview</TabsTrigger>
          <TabsTrigger value="calendar">30-Day Plan</TabsTrigger>
          <TabsTrigger value="metrics">Optimization</TabsTrigger>
          <TabsTrigger value="insights">Competitor Intel</TabsTrigger>
        </TabsList>

        {/* Strategy Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Strategy</CardTitle>
                <CardDescription>Recommended platform priorities and expected performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.solution.platformRecommendations.map((platform, index) => (
                  <div key={platform.platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={index === 0 ? 'default' : 'secondary'}>
                          #{index + 1}
                        </Badge>
                        <span className="font-medium">{platform.platform}</span>
                      </div>
                      <span className="text-sm font-medium">{platform.expectedMetrics.roas}x ROAS</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{platform.reasoning}</p>
                    <div className="text-xs text-muted-foreground">
                      CPM: ${platform.expectedMetrics.cpm} | Conv: {platform.expectedMetrics.conversionRate}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Emotional Triggers</CardTitle>
                <CardDescription>Key emotions that drive conversions in your industry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {mockData.solution.industryEmotions.map((emotion, index) => (
                    <Badge key={index} variant="outline" className="capitalize">
                      {emotion}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  These emotional triggers are specifically effective for {mockData.businessData.industry} businesses targeting {mockData.businessData.targetAudience}.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 30-Day Calendar Preview */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Marketing Calendar Preview</CardTitle>
              <CardDescription>Sample of your day-by-day content and campaign plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockData.solution.monthlyPlan.slice(0, 5).map((day) => (
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
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{day.body}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{day.cta}</Badge>
                      <div className="text-xs text-muted-foreground">
                        ${day.expectedMetrics.estimatedCost} • {day.expectedMetrics.estimatedConversions} conv.
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center py-4 text-muted-foreground">
                  <p>... and 25 more days of detailed content planning</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Optimization */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid gap-6">
            {mockData.solution.optimizationTips.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{metric.metric}</span>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-600">
                        Needs Improvement
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2"><strong>Issue:</strong> {metric.issue}</p>
                      <p className="text-sm text-muted-foreground mb-2"><strong>Solution:</strong> {metric.solution}</p>
                      <p className="text-sm text-green-600"><strong>Expected Improvement:</strong> {metric.expectedImprovement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Competitor Insights */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            {mockData.solution.competitorInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <span>{insight.competitor}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm">Key Strategy</h4>
                      <p className="text-sm text-muted-foreground">{insight.keyStrategy}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Performance</h4>
                      <p className="text-sm text-muted-foreground">{insight.performanceMetric}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">How to Apply</h4>
                      <p className="text-sm text-green-600">{insight.applicationForUser}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockSolutionPreview;
