import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Eye, Target, TrendingUp, Clock, Zap, Users, BarChart3, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface PlatformRecommendationsProps {
  data: any;
}

const PlatformRecommendations = ({ data }: PlatformRecommendationsProps) => {
  const [expandedPlatforms, setExpandedPlatforms] = useState<Record<number, boolean>>({});

  console.log('Platform Recommendations - Checking data structure:', data);
  console.log('AI Data exists:', !!data.insights);
  console.log('Platform data:', data.insights?.platformRecommendations);

  const togglePlatform = (index: number) => {
    setExpandedPlatforms(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Use correct data path: data.insights.platformRecommendations
  const aiPlatforms = data.insights?.platformRecommendations?.map((platform: any, index: number) => ({
    name: platform.platform,
    priority: platform.priority,
    score: Math.round((platform.expectedMetrics?.roas / 6) * 100) || 85,
    reasoning: platform.reasoning,
    expectedMetrics: {
      roas: `${platform.expectedMetrics?.roas || 3.5}x`,
      cpm: `$${platform.expectedMetrics?.cpm || 15}`,
      conversionRate: `${platform.expectedMetrics?.conversionRate || 3.2}%`,
      reach: platform.expectedMetrics?.reach?.toLocaleString() || 'N/A'
    },
    budgetAllocation: platform.budgetAllocation,
    targetingParameters: platform.targetingParameters || {
      demographics: ['Business owners 25-45', 'Decision makers', 'Entrepreneurs'],
      interests: ['Business automation', 'Productivity tools', 'SaaS solutions'],
      behaviors: ['Frequent business tool users', 'Early adopters', 'High purchase intent'],
      customAudiences: ['Website visitors', 'Email subscribers', 'Lookalike audiences']
    },
    dayPartingStrategy: platform.dayPartingStrategy || {
      morning: 'Focus on business decision-makers starting their day',
      afternoon: 'Target lunch-break browsers and mid-day planners',
      evening: 'Reach entrepreneurs working extended hours'
    },
    scalingTriggers: platform.scalingTriggers || ['ROAS > 3x', 'CTR > 2%', 'CPC < $5']
  })) || [];

  // Fallback template data (only used if no AI data available)
  const templatePlatforms = [
    {
      name: 'LinkedIn',
      priority: 1,
      score: 92,
      reasoning: 'Best ROI for executive targeting with advanced B2B options.',
      expectedMetrics: { roas: '4.2x', cpm: '$25.50', conversionRate: '3.8%', reach: '50,000' },
      budgetAllocation: 40,
      targetingParameters: {
        demographics: ['Business owners 25-45', 'Decision makers', 'Entrepreneurs'],
        interests: ['Business automation', 'Productivity tools', 'SaaS solutions'],
        behaviors: ['Frequent business tool users', 'Early adopters', 'High purchase intent'],
        customAudiences: ['Website visitors', 'Email subscribers', 'Lookalike audiences']
      },
      dayPartingStrategy: {
        morning: 'Focus on business decision-makers starting their day',
        afternoon: 'Target lunch-break browsers and mid-day planners',
        evening: 'Reach entrepreneurs working extended hours'
      },
      scalingTriggers: ['ROAS > 3x', 'CTR > 2%', 'CPC < $5']
    },
    {
      name: 'Facebook',
      priority: 2,
      score: 88,
      reasoning: 'Strong reach for business owners with proven conversion rates.',
      expectedMetrics: { roas: '3.8x', cpm: '$15.20', conversionRate: '3.2%', reach: '125,000' },
      budgetAllocation: 30,
      targetingParameters: {
        demographics: ['Small business owners', 'Managers', 'Consultants'],
        interests: ['Business growth', 'Marketing tools', 'Automation'],
        behaviors: ['Small business owners', 'Engaged shoppers', 'Technology adopters'],
        customAudiences: ['Past customers', 'Cart abandoners', 'Video viewers']
      },
      dayPartingStrategy: {
        morning: 'Target early-rising business owners',
        afternoon: 'Focus on lunch-time social media users',
        evening: 'Reach after-work planners and researchers'
      },
      scalingTriggers: ['ROAS > 2.5x', 'CTR > 1.8%', 'CPC < $3']
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
            <div key={index} className="p-6 border-2 rounded-xl hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Badge className={`${getPriorityColor(platform.priority)} text-white px-4 py-2 text-sm font-bold`}>
                    #{platform.priority} Priority
                  </Badge>
                  <div>
                    <h4 className="font-bold text-xl text-gray-800">{platform.name}</h4>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-sm text-muted-foreground font-medium">AI Optimization Score:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600">{platform.score}</span>
                        <span className="text-sm text-muted-foreground">/100</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="border-blue-300 text-blue-700 font-semibold px-4 py-2 text-base">
                    {platform.budgetAllocation}% Budget
                  </Badge>
                </div>
              </div>
              
              <Progress value={platform.score} className="mb-4 h-3" />
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-200">
                {platform.reasoning}
              </p>
              
              <div className="grid grid-cols-4 gap-4 text-sm mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="font-bold text-xl text-green-600">{platform.expectedMetrics.roas}</div>
                  <div className="text-muted-foreground font-medium">ROAS</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="font-bold text-xl text-blue-600">{platform.expectedMetrics.cpm}</div>
                  <div className="text-muted-foreground font-medium">CPM</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <div className="font-bold text-xl text-purple-600">{platform.expectedMetrics.conversionRate}</div>
                  <div className="text-muted-foreground font-medium">Conv. Rate</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <div className="font-bold text-xl text-orange-600">{platform.expectedMetrics.reach}</div>
                  <div className="text-muted-foreground font-medium">Est. Reach</div>
                </div>
              </div>

              {/* Enhanced Targeting Parameters - Now Prominent */}
              <Collapsible open={expandedPlatforms[index]} onOpenChange={() => togglePlatform(index)}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full mb-4 h-12 text-base font-semibold border-2 border-blue-300 hover:bg-blue-50">
                    <Target className="h-5 w-5 mr-3" />
                    Advanced Targeting Strategy
                    {expandedPlatforms[index] ? <ChevronUp className="h-5 w-5 ml-3" /> : <ChevronDown className="h-5 w-5 ml-3" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                    <h5 className="font-bold text-blue-800 mb-4 flex items-center text-lg">
                      <Target className="h-6 w-6 mr-2" />
                      Precision Targeting Parameters
                    </h5>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
                        <span className="font-bold text-blue-800 flex items-center mb-3 text-base">
                          <Users className="h-5 w-5 mr-2" />
                          Demographics
                        </span>
                        <div className="space-y-2">
                          {platform.targetingParameters.demographics.map((demo: string, i: number) => (
                            <Badge key={i} variant="outline" className="mr-2 mb-2 bg-blue-50 text-blue-700 border-blue-300 font-medium">
                              {demo}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm">
                        <span className="font-bold text-green-800 flex items-center mb-3 text-base">
                          <Eye className="h-5 w-5 mr-2" />
                          Interests
                        </span>
                        <div className="space-y-2">
                          {platform.targetingParameters.interests.map((interest: string, i: number) => (
                            <Badge key={i} variant="outline" className="mr-2 mb-2 bg-green-50 text-green-700 border-green-300 font-medium">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-2 border-purple-200 shadow-sm">
                        <span className="font-bold text-purple-800 flex items-center mb-3 text-base">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          Behaviors
                        </span>
                        <div className="space-y-2">
                          {platform.targetingParameters.behaviors.map((behavior: string, i: number) => (
                            <Badge key={i} variant="outline" className="mr-2 mb-2 bg-purple-50 text-purple-700 border-purple-300 font-medium">
                              {behavior}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-2 border-orange-200 shadow-sm">
                        <span className="font-bold text-orange-800 flex items-center mb-3 text-base">
                          <Target className="h-5 w-5 mr-2" />
                          Custom Audiences
                        </span>
                        <div className="space-y-2">
                          {platform.targetingParameters.customAudiences.map((audience: string, i: number) => (
                            <Badge key={i} variant="outline" className="mr-2 mb-2 bg-orange-50 text-orange-700 border-orange-300 font-medium">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Day-parting Strategy */}
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <h5 className="font-bold text-green-800 mb-4 flex items-center text-lg">
                      <Clock className="h-6 w-6 mr-2" />
                      Optimal Timing Strategy
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
                        <span className="font-bold text-blue-800 block mb-3 text-base">🌅 Morning (6-11 AM)</span>
                        <p className="text-blue-700 text-sm leading-relaxed">{platform.dayPartingStrategy.morning}</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm">
                        <span className="font-bold text-green-800 block mb-3 text-base">☀️ Afternoon (12-5 PM)</span>
                        <p className="text-green-700 text-sm leading-relaxed">{platform.dayPartingStrategy.afternoon}</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-2 border-purple-200 shadow-sm">
                        <span className="font-bold text-purple-800 block mb-3 text-base">🌙 Evening (6-11 PM)</span>
                        <p className="text-purple-700 text-sm leading-relaxed">{platform.dayPartingStrategy.evening}</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Scaling Triggers */}
                  <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
                    <h5 className="font-bold text-yellow-800 mb-4 flex items-center text-lg">
                      <Zap className="h-6 w-6 mr-2" />
                      Scaling Triggers & Thresholds
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {platform.scalingTriggers.map((trigger: string, i: number) => (
                        <Badge key={i} className="bg-yellow-500 text-white font-semibold px-4 py-2 text-sm">
                          ⚡ {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
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
