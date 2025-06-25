
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Target, TrendingUp, Hash, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface MonthlyPlanProps {
  data: any;
}

const MonthlyPlan = ({ data }: MonthlyPlanProps) => {
  const [viewMode, setViewMode] = useState<'overview' | 'full'>('overview');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  console.log('Monthly Plan - Checking data structure:', data);
  console.log('AI Monthly Plan count:', data.insights?.monthlyPlan?.length);

  // Use correct data path: data.insights.monthlyPlan
  const aiContentPlan = data.insights?.monthlyPlan || [];
  const isAIGenerated = aiContentPlan.length > 0;
  const hasComplete30Days = aiContentPlan.length >= 30;

  console.log('Using AI generated plan:', isAIGenerated);
  console.log('Content plan length:', aiContentPlan.length);
  console.log('Has complete 30 days:', hasComplete30Days);

  const getContentTypeColor = (type: string) => {
    return type === 'ad' ? 'bg-blue-500' : 'bg-green-500';
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return '💼';
      case 'facebook': return '📘';
      case 'instagram': return '📸';
      case 'twitter': return '🐦';
      case 'google ads': return '🔍';
      case 'tiktok': return '🎵';
      default: return '📱';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{isAIGenerated ? 'AI-Generated' : 'Template'} Content Calendar</span>
              {hasComplete30Days && (
                <Badge className="bg-green-500 text-white ml-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Complete 30-Day Plan
                </Badge>
              )}
              {isAIGenerated && !hasComplete30Days && (
                <Badge variant="outline" className="border-amber-500 text-amber-600 ml-2">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {aiContentPlan.length} Days Generated
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-base">
              {isAIGenerated 
                ? `${hasComplete30Days ? 'Complete' : 'Partial'} AI-generated content strategy with ${aiContentPlan.length} days of personalized content based on your business data`
                : 'Template content calendar (AI data not available)'
              }
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'overview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('overview')}
            >
              Overview
            </Button>
            <Button
              variant={viewMode === 'full' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('full')}
            >
              Full Calendar ({aiContentPlan.length} days)
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Data Quality Alert */}
        {isAIGenerated && !hasComplete30Days && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Partial Content Calendar</h4>
              <p className="text-sm text-amber-700">
                Generated {aiContentPlan.length} days of content. For complete 30-day planning, try regenerating the intelligence report.
              </p>
            </div>
          </div>
        )}

        {/* Complete Calendar Success Alert */}
        {hasComplete30Days && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Complete 30-Day AI Strategy</h4>
              <p className="text-sm text-green-700">
                Your full month content calendar is ready with platform-optimized content, targeting strategies, and performance predictions.
              </p>
            </div>
          </div>
        )}

        {/* Overview Mode - First 7 days */}
        {viewMode === 'overview' && (
          <div className="space-y-4">
            <div className="grid gap-4">
              {aiContentPlan.slice(0, 7).map((day: any) => (
                <div key={day.day} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-semibold">Day {day.day}</Badge>
                      <Badge className={`${getContentTypeColor(day.contentType)} text-white`}>
                        {day.contentType}
                      </Badge>
                      <span className="text-sm font-medium flex items-center space-x-2">
                        <span className="text-lg">{getPlatformIcon(day.platform)}</span>
                        <span>{day.platform}</span>
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      Est. {day.expectedMetrics?.reach?.toLocaleString() || 'N/A'} reach
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-base mb-2 text-gray-800">{day.hook}</h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{day.body}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-sm font-medium bg-blue-50 text-blue-700 border-blue-200">
                      {day.cta}
                    </Badge>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      {day.expectedMetrics?.cost && (
                        <span className="bg-purple-50 px-2 py-1 rounded text-purple-700">Cost: ${day.expectedMetrics.cost}</span>
                      )}
                      {day.expectedMetrics?.conversions && (
                        <span className="bg-green-50 px-2 py-1 rounded text-green-700">Conv: {day.expectedMetrics.conversions}</span>
                      )}
                    </div>
                  </div>

                  {/* Enhanced AI-Specific Details */}
                  {isAIGenerated && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-semibold text-blue-800 flex items-center">
                            <Target className="h-3 w-3 mr-1" />
                            Target Audience:
                          </span>
                          <p className="text-blue-700 mt-1">{day.targetAudience}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-800 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Key Message:
                          </span>
                          <p className="text-purple-700 mt-1">{day.keyMessage}</p>
                        </div>
                      </div>
                      {day.hashtags && (
                        <div className="mt-3">
                          <span className="font-semibold text-indigo-800 flex items-center mb-2">
                            <Hash className="h-3 w-3 mr-1" />
                            Hashtags:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {day.hashtags.map((tag: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-indigo-100 text-indigo-800">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full text-base py-3"
              onClick={() => setViewMode('full')}
            >
              View Full {aiContentPlan.length}-Day Calendar
              {hasComplete30Days && <span className="ml-2 text-green-600">✓ Complete</span>}
            </Button>
          </div>
        )}

        {/* Full Calendar Mode - All days */}
        {viewMode === 'full' && (
          <div className="space-y-4">
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {aiContentPlan.map((day: any) => (
                <div 
                  key={day.day} 
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedDay === day.day ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="font-semibold">Day {day.day}</Badge>
                      <Badge className={`${getContentTypeColor(day.contentType)} text-white`}>
                        {day.contentType}
                      </Badge>
                      <span className="text-sm font-medium flex items-center space-x-1">
                        <span>{getPlatformIcon(day.platform)}</span>
                        <span>{day.platform}</span>
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <h4 className="font-semibold text-sm mb-1">{day.hook}</h4>
                  
                  {selectedDay === day.day && (
                    <div className="mt-3 space-y-3">
                      <div className="p-3 bg-gray-50 rounded">
                        <h5 className="font-medium text-sm mb-1">Content Body:</h5>
                        <p className="text-sm text-muted-foreground">{day.body}</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h5 className="font-medium text-sm mb-1">Visual Suggestion:</h5>
                          <p className="text-xs text-muted-foreground">{day.visualSuggestion}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-1">Strategic Reasoning:</h5>
                          <p className="text-xs text-muted-foreground">{day.strategicReasoning}</p>
                        </div>
                      </div>

                      {/* Enhanced AI Features */}
                      {isAIGenerated && day.psychologicalTriggers && (
                        <div className="p-3 bg-purple-50 rounded border border-purple-200">
                          <h5 className="font-medium text-purple-800 mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            Psychological Triggers:
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {day.psychologicalTriggers.map((trigger: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                                {trigger}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {day.expectedMetrics && (
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div className="p-2 bg-green-50 rounded border border-green-200">
                            <div className="text-sm font-semibold text-green-600">
                              {day.expectedMetrics.reach?.toLocaleString() || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Reach</div>
                          </div>
                          <div className="p-2 bg-blue-50 rounded border border-blue-200">
                            <div className="text-sm font-semibold text-blue-600">
                              {day.expectedMetrics.engagement || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Engagement</div>
                          </div>
                          <div className="p-2 bg-purple-50 rounded border border-purple-200">
                            <div className="text-sm font-semibold text-purple-600">
                              ${day.expectedMetrics.cost || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Cost</div>
                          </div>
                          <div className="p-2 bg-orange-50 rounded border border-orange-200">
                            <div className="text-sm font-semibold text-orange-600">
                              {day.expectedMetrics.conversions || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Conversions</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Data Status Indicator */}
        {!isAIGenerated && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Template Content Calendar</h4>
              <p className="text-sm text-yellow-700">
                AI-generated content calendar not available. Please regenerate your intelligence report for personalized 30-day content planning.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyPlan;
