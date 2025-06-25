
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Eye, Target, TrendingUp, Clock, Zap, Users, BarChart3, CheckCircle2 } from 'lucide-react';

interface PlatformRecommendationsProps {
  data: any;
}

const PlatformRecommendations = ({ data }: PlatformRecommendationsProps) => {
  console.log('Platform Recommendations - Checking data structure:', data);
  console.log('AI Data exists:', !!data.insights);
  console.log('Platform data:', data.insights?.platformRecommendations);

  // Use correct data path: data.insights.platformRecommendations
  const aiPlatforms = data.insights?.platformRecommendations?.map((platform: any, index: number) => ({
    name: platform.platform,
    priority: platform.priority,
    score: Math.round((platform.expectedMetrics?.roas / 6) * 100) || 85, // Scale ROAS to 100-point score
    reasoning: platform.reasoning,
    expectedMetrics: {
      roas: `${platform.expectedMetrics?.roas || 3.5}x`,
      cpm: `$${platform.expectedMetrics?.cpm || 15}`,
      conversionRate: `${platform.expectedMetrics?.conversionRate || 3.2}%`,
      reach: platform.expectedMetrics?.reach?.toLocaleString() || 'N/A'
    },
    budgetAllocation: platform.budgetAllocation,
    targetingParameters: platform.targetingParameters,
    dayPartingStrategy: platform.dayPartingStrategy,
    scalingTriggers: platform.scalingTriggers
  })) || [];

  // Fallback template data (only used if no AI data available)
  const templatePlatforms = [
    {
      name: 'LinkedIn',
      priority: 1,
      score: 92,
      reasoning: 'Best ROI for executive targeting with advanced B2B options.',
      expectedMetrics: { roas: '4.2x', cpm: '$25.50', conversionRate: '3.8%', reach: '50,000' },
      budgetAllocation: 40
    },
    {
      name: 'Facebook',
      priority: 2,
      score: 88,
      reasoning: 'Strong reach for business owners with proven conversion rates.',
      expectedMetrics: { roas: '3.8x', cpm: '$15.20', conversionRate: '3.2%', reach: '125,000' },
      budgetAllocation: 30
    }
  ];

  const platforms = aiPlatforms.length > 0 ? aiPlatforms : templatePlatforms;
  const isAIGenerated = aiPlatforms.length > 0;

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl">
          <BarChart3 className="h-6 w-6" />
          <span>AI Platform Recommendations</span>
          {isAIGenerated && (
            <Badge className="bg-green-500 text-white">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              AI Optimized
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-base">
          {isAIGenerated ? 'AI-ranked marketing platforms optimized for your business goals and budget' : 'Template platform recommendations (AI data not available)'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {platforms.map((platform, index) => (
            <div key={index} className="p-5 border-2 rounded-xl hover:shadow-lg transition-shadow bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Badge className={`${getPriorityColor(platform.priority)} text-white px-3 py-1 text-sm font-bold`}>
                    #{platform.priority} Priority
                  </Badge>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{platform.name}</h4>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-sm text-muted-foreground font-medium">AI Optimization Score:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-green-600">{platform.score}</span>
                        <span className="text-sm text-muted-foreground">/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="border-blue-300 text-blue-700 font-semibold px-3 py-1">
                    {platform.budgetAllocation}% Budget
                  </Badge>
                </div>
              </div>
              
              <Progress value={platform.score} className="mb-4 h-3" />
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-200">
                {platform.reasoning}
              </p>
              
              <div className="grid grid-cols-4 gap-4 text-sm mb-5">
                <div className="text-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="font-bold text-lg text-green-600">{platform.expectedMetrics.roas}</div>
                  <div className="text-muted-foreground font-medium">ROAS</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="font-bold text-lg text-blue-600">{platform.expectedMetrics.cpm}</div>
                  <div className="text-muted-foreground font-medium">CPM</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <div className="font-bold text-lg text-purple-600">{platform.expectedMetrics.conversionRate}</div>
                  <div className="text-muted-foreground font-medium">Conv. Rate</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <div className="font-bold text-lg text-orange-600">{platform.expectedMetrics.reach}</div>
                  <div className="text-muted-foreground font-medium">Est. Reach</div>
                </div>
              </div>

              {/* Enhanced AI Advanced Targeting Details */}
              {isAIGenerated && platform.targetingParameters && (
                <div className="mt-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <h5 className="font-bold text-blue-800 mb-3 flex items-center text-base">
                    <Target className="h-5 w-5 mr-2" />
                    AI Advanced Targeting Strategy
                  </h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <span className="font-bold text-blue-800 flex items-center mb-2">
                        <Users className="h-4 w-4 mr-1" />
                        Demographics:
                      </span>
                      <p className="text-blue-700">{platform.targetingParameters.demographics?.join(', ')}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <span className="font-bold text-blue-800 flex items-center mb-2">
                        <Eye className="h-4 w-4 mr-1" />
                        Interests:
                      </span>
                      <p className="text-blue-700">{platform.targetingParameters.interests?.join(', ')}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <span className="font-bold text-blue-800 flex items-center mb-2">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Behaviors:
                      </span>
                      <p className="text-blue-700">{platform.targetingParameters.behaviors?.join(', ')}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <span className="font-bold text-blue-800 flex items-center mb-2">
                        <Target className="h-4 w-4 mr-1" />
                        Custom Audiences:
                      </span>
                      <p className="text-blue-700">{platform.targetingParameters.customAudiences?.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced AI Day-parting Strategy */}
              {isAIGenerated && platform.dayPartingStrategy && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <h5 className="font-bold text-green-800 mb-3 flex items-center text-base">
                    <Clock className="h-5 w-5 mr-2" />
                    AI Day-parting Strategy
                  </h5>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="p-3 bg-white rounded-lg border-2 border-blue-200">
                      <span className="font-bold text-blue-800 block mb-2">Morning:</span>
                      <p className="text-blue-700">{platform.dayPartingStrategy.morning}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border-2 border-green-200">
                      <span className="font-bold text-green-800 block mb-2">Afternoon:</span>
                      <p className="text-green-700">{platform.dayPartingStrategy.afternoon}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border-2 border-purple-200">
                      <span className="font-bold text-purple-800 block mb-2">Evening:</span>
                      <p className="text-purple-700">{platform.dayPartingStrategy.evening}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Scaling Triggers */}
              {isAIGenerated && platform.scalingTriggers && (
                <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
                  <h5 className="font-bold text-yellow-800 mb-3 flex items-center text-base">
                    <Zap className="h-5 w-5 mr-2" />
                    AI Scaling Triggers
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {platform.scalingTriggers.map((trigger: string, i: number) => (
                      <Badge key={i} className="bg-yellow-500 text-white font-semibold px-3 py-1">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Enhanced AI Data Status */}
          {!isAIGenerated && (
            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Template Data Notice</h4>
                <p className="text-sm text-yellow-700">
                  Displaying template platform recommendations - AI optimization not available. Regenerate your intelligence report for personalized platform strategies.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformRecommendations;
