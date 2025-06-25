
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
  
  console.log('Results Overview - AI Data:', data);
  console.log('Copywriting Recommendations:', data.insights?.copywritingRecommendations);
  
  const businessData = data.formData || {};
  const industry = businessData.industry || 'general';
  const targetAudience = businessData.targetAudience || 'target audience';
  const monthlyRevenue = businessData.monthlyRevenue || '10k-50k';
  const adBudget = businessData.monthlyAdBudget || '500-2k';

  // Use AI copywriting recommendations if available
  const aiCopyRecommendations = data.insights?.copywritingRecommendations?.[0];
  const hasAICopywriting = !!aiCopyRecommendations;

  // AI Awareness Stage Display
  const renderAwarenessStages = () => {
    if (!aiCopyRecommendations?.awarenessStageVariations) return null;

    return (
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <h4 className="font-semibold mb-3 flex items-center">
          <Target className="h-4 w-4 mr-2 text-blue-600" />
          AI Customer Awareness Stages
        </h4>
        <div className="space-y-3">
          {Object.entries(aiCopyRecommendations.awarenessStageVariations).map(([stage, copy]) => (
            <div key={stage} className="border-l-4 border-blue-400 pl-3">
              <Badge variant="outline" className="mb-1 capitalize">{stage.replace(/([A-Z])/g, ' $1').trim()}</Badge>
              <p className="text-sm text-gray-700 font-medium">{copy as string}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // AI Emotional Triggers Display
  const renderEmotionalTriggers = () => {
    if (!aiCopyRecommendations?.emotionalTriggers) return null;

    return (
      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
        <h4 className="font-semibold mb-3 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
          AI Emotional Triggers
        </h4>
        <div className="space-y-3">
          {aiCopyRecommendations.emotionalTriggers.map((trigger: any, index: number) => (
            <div key={index} className="p-3 bg-white rounded border border-green-200">
              <h5 className="font-medium text-green-800 mb-1">{trigger.trigger}</h5>
              <p className="text-sm text-gray-600 mb-2">{trigger.implementation}</p>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                Expected Impact: {trigger.expectedImpact}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // AI A/B Testing Framework Display
  const renderABTestingFramework = () => {
    if (!aiCopyRecommendations?.abTestingFramework) return null;

    return (
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
        <h4 className="font-semibold mb-3 flex items-center">
          <Target className="h-4 w-4 mr-2 text-purple-600" />
          AI A/B Testing Strategy
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-purple-800 mb-2">Variables to Test:</h5>
            <ul className="space-y-1">
              {aiCopyRecommendations.abTestingFramework.variables?.map((variable: string, index: number) => (
                <li key={index} className="text-sm flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>{variable}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-purple-800 mb-2">Success Metrics:</h5>
            <ul className="space-y-1">
              {aiCopyRecommendations.abTestingFramework.successMetrics?.map((metric: string, index: number) => (
                <li key={index} className="text-sm flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {aiCopyRecommendations.abTestingFramework.statisticalSignificance && (
          <div className="mt-3 p-2 bg-white rounded border">
            <span className="text-sm font-medium">Statistical Requirements: </span>
            <span className="text-sm text-gray-600">{aiCopyRecommendations.abTestingFramework.statisticalSignificance}</span>
          </div>
        )}
      </div>
    );
  };

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

      {/* Enhanced AI Copywriting Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>{hasAICopywriting ? 'AI-Generated' : 'Template'} Copywriting Intelligence</span>
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
            {hasAICopywriting 
              ? `Advanced AI copywriting analysis for your ${industry} business targeting ${targetAudience}`
              : `Template copywriting recommendations for your ${industry} business targeting ${targetAudience}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasAICopywriting ? (
            <div className="space-y-6">
              {/* AI Competitor Analysis */}
              {aiCopyRecommendations.competitorAnalysis && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">AI Competitor Copy Analysis</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Common Approaches: </span>
                      <span className="text-sm">{aiCopyRecommendations.competitorAnalysis.commonApproaches}</span>
                    </div>
                    <div>
                      <span className="font-medium">Your Improved Strategy: </span>
                      <span className="text-sm text-orange-700 font-medium">{aiCopyRecommendations.competitorAnalysis.improvedStrategy}</span>
                    </div>
                    <div>
                      <span className="font-medium">Key Differentiators: </span>
                      <span className="text-sm">{aiCopyRecommendations.competitorAnalysis.differentiationPoints}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Awareness Stages */}
              {renderAwarenessStages()}

              {/* AI Emotional Triggers */}
              {renderEmotionalTriggers()}

              {/* AI A/B Testing Framework */}
              {renderABTestingFramework()}

              {/* AI Power Words */}
              {aiCopyRecommendations.powerWords && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">AI-Recommended Power Words</h4>
                  <div className="flex flex-wrap gap-2">
                    {aiCopyRecommendations.powerWords.map((word: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Funnel Copy */}
              {aiCopyRecommendations.funnelCopy && (
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-3">AI Funnel Copy Strategy</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(aiCopyRecommendations.funnelCopy).map(([stage, copy]) => (
                      <div key={stage} className="p-3 bg-white rounded border">
                        <Badge variant="outline" className="mb-2 capitalize">{stage}</Badge>
                        <p className="text-sm text-gray-600">{copy as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">AI copywriting analysis not available - using template recommendations</p>
            </div>
          )}
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

      {/* AI Data Status */}
      {!hasAICopywriting && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            ⚠️ Displaying template copywriting recommendations - AI analysis not available
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsOverview;
