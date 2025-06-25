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
  Share2,
  AlertTriangle,
  Shield,
  Zap,
  Brain,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface ResultsOverviewProps {
  data: any;
  businessType: string | null;
}

const ResultsOverview = ({ data, businessType }: ResultsOverviewProps) => {
  const [selectedCopyType, setSelectedCopyType] = useState<'website' | 'ads' | 'email' | 'social'>('website');
  
  console.log('Results Overview - Checking data structure:', data);
  console.log('Copywriting data:', data.insights?.copywritingRecommendations);
  console.log('Budget Strategy data:', data.insights?.budgetStrategy);
  
  const businessData = data.formData || {};
  const industry = businessData.industry || 'general';
  const targetAudience = businessData.targetAudience || 'target audience';
  const monthlyRevenue = businessData.monthlyRevenue || '10k-50k';
  const adBudget = businessData.monthlyAdBudget || '500-2k';

  // Use correct data path: data.insights.copywritingRecommendations
  const aiCopyRecommendations = data.insights?.copywritingRecommendations?.[0];
  const hasAICopywriting = !!aiCopyRecommendations;

  // Use correct data path: data.insights.budgetStrategy
  const aiBudgetStrategy = data.insights?.budgetStrategy?.[0];
  const hasAIBudgetStrategy = !!aiBudgetStrategy;

  console.log('Has AI copywriting:', hasAICopywriting);
  console.log('Has AI budget strategy:', hasAIBudgetStrategy);

  // Enhanced AI Awareness Stage Display
  const renderAwarenessStages = () => {
    if (!aiCopyRecommendations?.awarenessStageVariations) return null;

    return (
      <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl border-2 border-blue-200">
        <h4 className="text-lg font-bold mb-4 flex items-center text-blue-800">
          <Brain className="h-5 w-5 mr-2" />
          AI Customer Awareness Journey
        </h4>
        <div className="space-y-4">
          {Object.entries(aiCopyRecommendations.awarenessStageVariations).map(([stage, copy], index) => (
            <div key={stage} className="border-l-4 border-blue-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="capitalize font-semibold text-blue-700 border-blue-300">
                  Stage {index + 1}: {stage.replace(/([A-Z])/g, ' $1').trim()}
                </Badge>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">{copy as string}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Enhanced AI Emotional Triggers Display
  const renderEmotionalTriggers = () => {
    if (!aiCopyRecommendations?.emotionalTriggers) return null;

    return (
      <div className="mt-6 p-5 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border-2 border-green-200">
        <h4 className="text-lg font-bold mb-4 flex items-center text-green-800">
          <Zap className="h-5 w-5 mr-2" />
          High-Impact Emotional Triggers
        </h4>
        <div className="grid gap-4">
          {aiCopyRecommendations.emotionalTriggers.map((trigger: any, index: number) => (
            <div key={index} className="p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-bold text-green-800 text-base">{trigger.trigger}</h5>
                <Badge className="bg-green-100 text-green-800 font-semibold">
                  +{trigger.expectedImpact}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2 leading-relaxed">{trigger.implementation}</p>
              <div className="text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full inline-block">
                Expected Impact: {trigger.expectedImpact}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Enhanced A/B Testing Framework Display
  const renderABTestingFramework = () => {
    if (!aiCopyRecommendations?.abTestingFramework) return null;

    return (
      <div className="mt-6 p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 rounded-xl border-2 border-purple-200">
        <h4 className="text-lg font-bold mb-4 flex items-center text-purple-800">
          <Target className="h-5 w-5 mr-2" />
          Advanced A/B Testing Strategy
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <h5 className="font-bold text-purple-800 mb-3 flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Variables to Test:
            </h5>
            <ul className="space-y-2">
              {aiCopyRecommendations.abTestingFramework.variables?.map((variable: string, index: number) => (
                <li key={index} className="text-sm flex items-center space-x-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="font-medium">{variable}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <h5 className="font-bold text-purple-800 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Success Metrics:
            </h5>
            <ul className="space-y-2">
              {aiCopyRecommendations.abTestingFramework.successMetrics?.map((metric: string, index: number) => (
                <li key={index} className="text-sm flex items-center space-x-3">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span className="font-medium">{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {aiCopyRecommendations.abTestingFramework.statisticalSignificance && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <span className="text-sm font-bold text-purple-800">Statistical Requirements: </span>
            <span className="text-sm text-gray-600">{aiCopyRecommendations.abTestingFramework.statisticalSignificance}</span>
          </div>
        )}
      </div>
    );
  };

  // Enhanced Crisis Management Display
  const renderCrisisManagement = () => {
    if (!aiBudgetStrategy?.crisisManagement) return null;

    return (
      <div className="mt-6 p-5 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-xl border-2 border-red-200">
        <h4 className="text-lg font-bold mb-4 flex items-center text-red-800">
          <Shield className="h-5 w-5 mr-2" />
          Crisis Management Protocols
        </h4>
        <div className="grid gap-4">
          <div className="p-4 bg-white rounded-lg border border-red-200">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-bold text-red-800">Underperformance Threshold</h5>
              <Badge className="bg-red-100 text-red-800 text-lg font-bold">
                {aiBudgetStrategy.crisisManagement.underperformanceThreshold}x ROAS
              </Badge>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-orange-200">
            <h5 className="font-bold text-orange-800 mb-3">Automated Actions</h5>
            <ul className="space-y-2">
              {aiBudgetStrategy.crisisManagement.actions?.map((action: string, index: number) => (
                <li key={index} className="text-sm flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg border border-yellow-200">
            <h5 className="font-bold text-yellow-800 mb-2">Budget Reallocation Strategy</h5>
            <p className="text-sm font-medium text-gray-700">{aiBudgetStrategy.crisisManagement.budgetReallocation}</p>
          </div>

          {aiBudgetStrategy.crisisManagement.emergencyRemarketing && (
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <h5 className="font-bold text-red-800 mb-3">Emergency Remarketing Campaigns</h5>
              <div className="flex flex-wrap gap-2">
                {aiBudgetStrategy.crisisManagement.emergencyRemarketing.map((campaign: string, index: number) => (
                  <Badge key={index} variant="outline" className="border-red-300 text-red-700">
                    {campaign}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Enhanced AI Budget Strategy Display
  const renderBudgetStrategy = () => {
    if (!aiBudgetStrategy) return null;

    return (
      <div className="mt-6 p-5 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-xl border-2 border-yellow-200">
        <h4 className="text-lg font-bold mb-4 flex items-center text-yellow-800">
          <DollarSign className="h-5 w-5 mr-2" />
          AI Budget Strategy & Allocation
        </h4>
        
        {/* Platform Allocations */}
        {aiBudgetStrategy.allocation && (
          <div className="space-y-4 mb-6">
            {aiBudgetStrategy.allocation.map((platform: any, index: number) => (
              <div key={index} className="p-4 bg-white rounded-lg border-2 border-yellow-200 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-bold text-yellow-800 text-base">{platform.platform}</h5>
                  <div className="flex space-x-2">
                    <Badge className="bg-yellow-100 text-yellow-800 font-bold text-sm">
                      {platform.percentage}%
                    </Badge>
                    <Badge variant="outline" className="border-yellow-400 text-yellow-700 font-semibold">
                      ${platform.dailySpend}/day
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{platform.reasoning}</p>
                
                {/* Enhanced Day-parting Strategy */}
                {platform.dayPartingStrategy && (
                  <div className="grid grid-cols-3 gap-3 text-xs mt-3">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <span className="font-bold text-blue-800">Morning:</span>
                      <p className="text-blue-700 mt-1">{platform.dayPartingStrategy.morning}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <span className="font-bold text-green-800">Afternoon:</span>
                      <p className="text-green-700 mt-1">{platform.dayPartingStrategy.afternoon}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <span className="font-bold text-purple-800">Evening:</span>
                      <p className="text-purple-700 mt-1">{platform.dayPartingStrategy.evening}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Enhanced ROAS Targets */}
        {aiBudgetStrategy.roasTargets && (
          <div className="p-4 bg-white rounded-lg border-2 border-orange-200">
            <h5 className="font-bold text-orange-800 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              ROAS Targets & Timeline
            </h5>
            <div className="grid gap-3">
              {aiBudgetStrategy.roasTargets.map((target: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm font-medium">{target.timeframe}</span>
                  <Badge className="bg-orange-500 text-white font-bold">
                    {target.target}x ROAS
                  </Badge>
                </div>
              ))}
            </div>
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
            <CardDescription>
              {hasAIBudgetStrategy ? 'AI-optimized spending recommendations' : 'Template budget recommendations'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasAIBudgetStrategy ? (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">AI Budget Allocation</Label>
                <div className="space-y-2 mt-2">
                  {aiBudgetStrategy.allocation?.map((platform: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{platform.platform}</span>
                      <span className="font-semibold">{platform.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}

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
              <Lightbulb className="h-6 w-6" />
              <span className="text-xl">{hasAICopywriting ? 'AI-Generated' : 'Template'} Copywriting Intelligence</span>
              {hasAICopywriting && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              )}
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
          <CardDescription className="text-base">
            {hasAICopywriting 
              ? `Advanced AI copywriting analysis for your ${industry} business targeting ${targetAudience}`
              : `Template copywriting recommendations for your ${industry} business targeting ${targetAudience}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasAICopywriting ? (
            <div className="space-y-6">
              {/* Enhanced AI Competitor Analysis */}
              {aiCopyRecommendations.competitorAnalysis && (
                <div className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                  <h4 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    AI Competitor Copy Analysis
                  </h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-white rounded-lg border border-orange-200">
                      <span className="font-bold text-orange-800">Common Approaches: </span> 
                      <p className="text-sm mt-1">{aiCopyRecommendations.competitorAnalysis.commonApproaches}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-red-200">
                      <span className="font-bold text-red-800">Your Improved Strategy: </span> 
                      <p className="text-sm text-red-700 font-medium mt-1">{aiCopyRecommendations.competitorAnalysis.improvedStrategy}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-green-200">
                      <span className="font-bold text-green-800">Key Differentiators: </span> 
                      <p className="text-sm text-green-700 mt-1">{aiCopyRecommendations.competitorAnalysis.differentiationPoints}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced AI Components */}
              {renderAwarenessStages()}
              {renderEmotionalTriggers()}
              {renderABTestingFramework()}

              {/* Enhanced AI Power Words */}
              {aiCopyRecommendations.powerWords && (
                <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
                  <h4 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    High-Converting Power Words
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {aiCopyRecommendations.powerWords.map((word: string, index: number) => (
                      <Badge key={index} className="bg-yellow-500 text-white font-semibold text-sm px-3 py-1">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced AI Funnel Copy */}
              {aiCopyRecommendations.funnelCopy && (
                <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-200">
                  <h4 className="text-lg font-bold text-indigo-800 mb-4 flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    AI Funnel Copy Strategy
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(aiCopyRecommendations.funnelCopy).map(([stage, copy]) => (
                      <div key={stage} className="p-4 bg-white rounded-lg border-2 border-indigo-200">
                        <Badge variant="outline" className="mb-3 capitalize font-semibold text-indigo-700 border-indigo-300">
                          {stage}
                        </Badge>
                        <p className="text-sm text-gray-600 leading-relaxed">{copy as string}</p>
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

          {/* Enhanced AI Budget Strategy */}
          {renderBudgetStrategy()}
          
          {/* Enhanced Crisis Management */}
          {renderCrisisManagement()}
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

      {/* Enhanced AI Data Status */}
      {!hasAICopywriting && (
        <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Template Data Notice</h4>
            <p className="text-sm text-yellow-700">
              Displaying template copywriting recommendations - AI analysis not available. Regenerate your intelligence report for personalized insights.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsOverview;
