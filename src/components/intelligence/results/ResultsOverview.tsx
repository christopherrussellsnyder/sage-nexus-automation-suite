
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Lightbulb,
  Globe,
  Mail,
  Megaphone,
  Share2
} from 'lucide-react';

interface ResultsOverviewProps {
  data: any;
  businessType: string | null;
}

const ResultsOverview = ({ data, businessType }: ResultsOverviewProps) => {
  const [selectedCopyType, setSelectedCopyType] = useState<'website' | 'ads' | 'email' | 'social'>('website');
  
  const businessData = data.formData || {};
  const industry = businessData.industry || 'general';
  const targetAudience = businessData.targetAudience || 'target audience';
  const monthlyRevenue = businessData.monthlyRevenue || '10k-50k';
  const adBudget = businessData.monthlyAdBudget || '500-2k';

  const generateCopywritingRecommendations = (type: string) => {
    const recommendations: Record<string, any> = {
      website: {
        title: 'Website Copy Strategy',
        icon: Globe,
        recommendations: [
          {
            section: 'Hero Section',
            copy: `Transform Your ${industry} Business with ${businessData.businessName || 'Our Solution'}`,
            description: `Headline that immediately communicates value to ${targetAudience}`,
            cta: 'Get Started Today'
          },
          {
            section: 'Value Proposition',
            copy: `The only ${industry} solution that ${targetAudience} need to achieve their goals`,
            description: 'Clear positioning statement that differentiates from competitors',
            cta: 'Learn More'
          },
          {
            section: 'Social Proof',
            copy: `Join 10,000+ ${targetAudience} who have already transformed their ${industry} results`,
            description: 'Credibility-building section with testimonials and case studies',
            cta: 'See Success Stories'
          }
        ]
      },
      ads: {
        title: 'Advertising Copy Strategy',
        icon: Megaphone,
        recommendations: [
          {
            section: 'Facebook/Instagram Ads',
            copy: `Stop struggling with ${industry} challenges. This solution helps ${targetAudience} get results in 30 days.`,
            description: 'Problem-solution format with specific timeline',
            cta: 'Claim Your Spot'
          },
          {
            section: 'Google Ads',
            copy: `#1 ${industry} Solution for ${targetAudience} - Free Demo Available`,
            description: 'Authority positioning with clear offer',
            cta: 'Book Free Demo'
          },
          {
            section: 'Retargeting Ads',
            copy: `Still thinking about improving your ${industry} results? Here's what you're missing...`,
            description: 'Gentle reminder with curiosity gap',
            cta: 'See What You Missed'
          }
        ]
      },
      email: {
        title: 'Email Marketing Strategy',
        icon: Mail,
        recommendations: [
          {
            section: 'Welcome Email',
            copy: `Welcome to the ${businessData.businessName || 'community'}! Here's what happens next...`,
            description: 'Set expectations and build excitement for new subscribers',
            cta: 'Get Your First Win'
          },
          {
            section: 'Value Email',
            copy: `The #1 mistake ${targetAudience} make in ${industry} (and how to avoid it)`,
            description: 'Educational content that positions you as an authority',
            cta: 'Read the Full Guide'
          },
          {
            section: 'Sales Email',
            copy: `Last chance: ${targetAudience} are getting amazing ${industry} results with this`,
            description: 'Urgency-driven sales email with social proof',
            cta: 'Join Before It's Too Late'
          }
        ]
      },
      social: {
        title: 'Social Media Strategy',
        icon: Share2,
        recommendations: [
          {
            section: 'Educational Post',
            copy: `3 ${industry} tips that every ${targetAudience} should know:\n\n1. [Specific tip]\n2. [Actionable advice]\n3. [Quick win]`,
            description: 'Value-driven content that educates your audience',
            cta: 'Save this post →'
          },
          {
            section: 'Behind-the-Scenes',
            copy: `Behind the scenes: How we help ${targetAudience} transform their ${industry} results`,
            description: 'Authentic content that builds trust and connection',
            cta: 'Want to know more?'
          },
          {
            section: 'User-Generated Content',
            copy: `Amazing results from one of our ${targetAudience}! This is what's possible when you...`,
            description: 'Social proof through customer success stories',
            cta: 'Your turn! Start here →'
          }
        ]
      }
    };

    return recommendations[type] || recommendations.website;
  };

  const currentRecommendations = generateCopywritingRecommendations(selectedCopyType);

  const getRevenueInsight = () => {
    const insights: Record<string, string> = {
      '0-10k': 'Focus on building audience and proving concept with organic content',
      '10k-50k': 'Perfect stage for scaling with targeted advertising and automation',
      '50k-100k': 'Optimize conversion funnels and expand to new platforms',
      '100k-500k': 'Implement advanced segmentation and personalization',
      '500k+': 'Focus on enterprise solutions and strategic partnerships'
    };
    return insights[monthlyRevenue] || insights['10k-50k'];
  };

  const getBudgetStrategy = () => {
    const strategies: Record<string, string> = {
      '0-500': 'Start with organic content, test small paid campaigns on best-performing platforms',
      '500-2k': 'Split 70/30 between top platform and testing secondary channels',
      '2k-5k': 'Diversify across 2-3 platforms with A/B testing on all campaigns',
      '5k-10k': 'Scale winning campaigns and implement advanced targeting',
      '10k-25k': 'Multi-platform presence with sophisticated attribution tracking',
      '25k+': 'Enterprise-level campaigns with custom audiences and lookalikes'
    };
    return strategies[adBudget] || strategies['500-2k'];
  };

  return (
    <div className="space-y-6">
      {/* Business Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Business Overview</span>
            </CardTitle>
            <CardDescription>Key insights about your business and market position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Industry</Label>
                <p className="font-semibold capitalize">{industry}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Business Type</Label>
                <p className="font-semibold capitalize">{businessType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Revenue Stage</Label>
                <p className="font-semibold">${monthlyRevenue}/month</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Ad Budget</Label>
                <p className="font-semibold">${adBudget}/month</p>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
              <p className="text-sm bg-gray-50 p-2 rounded">{targetAudience}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Strategic Focus</Label>
              <p className="text-sm bg-blue-50 p-2 rounded border border-blue-200">{getRevenueInsight()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Budget Strategy</span>
            </CardTitle>
            <CardDescription>Optimized spending recommendations for your budget</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Recommended Strategy</Label>
              <p className="text-sm bg-green-50 p-2 rounded border border-green-200">{getBudgetStrategy()}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Budget Allocation</Label>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Primary Platform (Facebook/Google)</span>
                  <span className="font-semibold">60%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Secondary Platform (Instagram/TikTok)</span>
                  <span className="font-semibold">25%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Testing & Optimization</span>
                  <span className="font-semibold">15%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-600">4.2x</div>
                <div className="text-xs text-muted-foreground">Expected ROAS</div>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <div className="font-semibold text-green-600">$12.50</div>
                <div className="text-xs text-muted-foreground">Target CPM</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Copywriting Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>AI Copywriting Recommendations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="copyType" className="text-sm">Content Type:</Label>
              <Select value={selectedCopyType} onValueChange={(value: any) => setSelectedCopyType(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website Copy</SelectItem>
                  <SelectItem value="ads">Ad Copy</SelectItem>
                  <SelectItem value="email">Email Marketing</SelectItem>
                  <SelectItem value="social">Social Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
          <CardDescription>
            Tailored copywriting recommendations for your {industry} business targeting {targetAudience}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <currentRecommendations.icon className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">{currentRecommendations.title}</h3>
            </div>
            
            <div className="space-y-4">
              {currentRecommendations.recommendations.map((rec: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{rec.section}</Badge>
                    <Button variant="ghost" size="sm">
                      Copy Template
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Copy</Label>
                      <p className="text-sm bg-gray-50 p-2 rounded font-medium">{rec.copy}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Strategy</Label>
                        <p className="text-xs text-muted-foreground">{rec.description}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Call to Action</Label>
                        <p className="text-xs bg-blue-50 p-1 rounded text-blue-700 font-medium">{rec.cta}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-muted-foreground">Audience Match</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">+127%</p>
                <p className="text-xs text-muted-foreground">Growth Potential</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">3.8%</p>
                <p className="text-xs text-muted-foreground">Target CVR</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">30</p>
                <p className="text-xs text-muted-foreground">Days to Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsOverview;
