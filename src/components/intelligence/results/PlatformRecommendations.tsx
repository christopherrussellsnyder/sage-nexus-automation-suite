
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Eye, Target, TrendingUp } from 'lucide-react';

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
        <CardTitle>AI Platform Recommendations</CardTitle>
        <CardDescription>
          {isAIGenerated ? 'AI-ranked marketing platforms optimized for your business goals and budget' : 'Template platform recommendations (AI data not available)'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {platforms.map((platform, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge className={`${getPriorityColor(platform.priority)} text-white`}>
                    #{platform.priority}
                  </Badge>
                  <div>
                    <h4 className="font-semibold">{platform.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">AI Optimization Score:</span>
                      <span className="text-sm font-medium">{platform.score}/100</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{platform.budgetAllocation}% Budget</Badge>
                </div>
              </div>
              
              <Progress value={platform.score} className="mb-3" />
              
              <p className="text-sm text-muted-foreground mb-3">{platform.reasoning}</p>
              
              <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-green-600">{platform.expectedMetrics.roas}</div>
                  <div className="text-muted-foreground">ROAS</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-blue-600">{platform.expectedMetrics.cpm}</div>
                  <div className="text-muted-foreground">CPM</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-purple-600">{platform.expectedMetrics.conversionRate}</div>
                  <div className="text-muted-foreground">Conv. Rate</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-orange-600">{platform.expectedMetrics.reach}</div>
                  <div className="text-muted-foreground">Est. Reach</div>
                </div>
              </div>

              {/* AI Advanced Targeting Details */}
              {isAIGenerated && platform.targetingParameters && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    AI Targeting Strategy
                  </h5>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Demographics:</span>
                      <p className="text-blue-700">{platform.targetingParameters.demographics?.join(', ')}</p>
                    </div>
                    <div>
                      <span className="font-medium">Interests:</span>
                      <p className="text-blue-700">{platform.targetingParameters.interests?.join(', ')}</p>
                    </div>
                    <div>
                      <span className="font-medium">Behaviors:</span>
                      <p className="text-blue-700">{platform.targetingParameters.behaviors?.join(', ')}</p>
                    </div>
                    <div>
                      <span className="font-medium">Custom Audiences:</span>
                      <p className="text-blue-700">{platform.targetingParameters.customAudiences?.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Day-parting Strategy */}
              {isAIGenerated && platform.dayPartingStrategy && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">AI Day-parting Strategy</h5>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="font-medium">Morning:</span>
                      <p className="text-green-700">{platform.dayPartingStrategy.morning}</p>
                    </div>
                    <div>
                      <span className="font-medium">Afternoon:</span>
                      <p className="text-green-700">{platform.dayPartingStrategy.afternoon}</p>
                    </div>
                    <div>
                      <span className="font-medium">Evening:</span>
                      <p className="text-green-700">{platform.dayPartingStrategy.evening}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Scaling Triggers */}
              {isAIGenerated && platform.scalingTriggers && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-2">Scaling Triggers</h5>
                  <div className="flex flex-wrap gap-2">
                    {platform.scalingTriggers.map((trigger: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">{trigger}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* AI Data Status */}
          {!isAIGenerated && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                ⚠️ Displaying template data - AI platform recommendations not available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformRecommendations;
