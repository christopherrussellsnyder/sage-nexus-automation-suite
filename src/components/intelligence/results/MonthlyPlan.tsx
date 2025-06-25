
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Target, TrendingUp, Hash, Users } from 'lucide-react';

interface MonthlyPlanProps {
  data: any;
}

const MonthlyPlan = ({ data }: MonthlyPlanProps) => {
  const [viewMode, setViewMode] = useState<'overview' | 'full'>('overview');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  console.log('Monthly Plan - Checking data structure:', data);
  console.log('AI Monthly Plan:', data.insights?.monthlyPlan);

  // Use correct data path: data.insights.monthlyPlan
  const aiContentPlan = data.insights?.monthlyPlan || [];
  
  // Generate template data only as fallback
  const generateTemplateContentPlan = () => {
    return Array.from({ length: 30 }, (_, index) => ({
      day: index + 1,
      platform: index % 3 === 0 ? 'LinkedIn' : index % 3 === 1 ? 'Facebook' : 'Instagram',
      contentType: index % 2 === 0 ? 'ad' : 'organic',
      hook: `Day ${index + 1}: Transform your AI automation results with this proven strategy`,
      body: `Discover how businesses are achieving 40% efficiency gains through automated workflows. This specific approach helps executives save 15+ hours per week while increasing revenue by 25%.`,
      cta: index % 2 === 0 ? 'Book Free Consultation' : 'Learn More',
      visualSuggestion: 'Professional executive in modern office with automation dashboard',
      targetAudience: 'C-suite executives in manufacturing and professional services',
      keyMessage: 'AI automation drives measurable business results',
      hashtags: ['#AIAutomation', '#BusinessEfficiency', '#ExecutiveProductivity'],
      expectedMetrics: {
        reach: Math.floor(Math.random() * 10000) + 5000,
        engagement: Math.floor(Math.random() * 500) + 200,
        cost: Math.floor(Math.random() * 100) + 50,
        conversions: Math.floor(Math.random() * 20) + 5
      },
      strategicReasoning: `Day ${index + 1} focuses on building awareness through value-driven content targeting executives seeking operational efficiency.`
    }));
  };

  const contentPlan = aiContentPlan.length > 0 ? aiContentPlan : generateTemplateContentPlan();
  const isAIGenerated = aiContentPlan.length > 0;

  console.log('Using AI generated plan:', isAIGenerated);
  console.log('Content plan length:', contentPlan.length);

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
              <span>{isAIGenerated ? 'AI-Generated' : 'Template'} 30-Day Content Calendar</span>
            </CardTitle>
            <CardDescription>
              {isAIGenerated 
                ? `Personalized content strategy with ${contentPlan.length} days of content based on your business data`
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
              Full Calendar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Overview Mode - First 7 days */}
        {viewMode === 'overview' && (
          <div className="space-y-4">
            <div className="grid gap-4">
              {contentPlan.slice(0, 7).map((day: any) => (
                <div key={day.day} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Day {day.day}</Badge>
                      <Badge className={`${getContentTypeColor(day.contentType)} text-white`}>
                        {day.contentType}
                      </Badge>
                      <span className="text-sm font-medium flex items-center space-x-1">
                        <span>{getPlatformIcon(day.platform)}</span>
                        <span>{day.platform}</span>
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Est. {day.expectedMetrics?.reach?.toLocaleString() || 'N/A'} reach
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-sm mb-1">{day.hook}</h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{day.body}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{day.cta}</Badge>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      {day.expectedMetrics?.cost && (
                        <span>Cost: ${day.expectedMetrics.cost}</span>
                      )}
                      {day.expectedMetrics?.conversions && (
                        <span>Conv: {day.expectedMetrics.conversions}</span>
                      )}
                    </div>
                  </div>

                  {/* AI-Specific Details */}
                  {isAIGenerated && (
                    <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="grid md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium text-blue-800">Target:</span>
                          <p className="text-blue-700">{day.targetAudience}</p>
                        </div>
                        <div>
                          <span className="font-medium text-blue-800">Key Message:</span>
                          <p className="text-blue-700">{day.keyMessage}</p>
                        </div>
                      </div>
                      {day.hashtags && (
                        <div className="mt-2">
                          <span className="font-medium text-blue-800">Hashtags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {day.hashtags.map((tag: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
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
              className="w-full"
              onClick={() => setViewMode('full')}
            >
              View Full 30-Day Calendar ({contentPlan.length} days)
            </Button>
          </div>
        )}

        {/* Full Calendar Mode - All days */}
        {viewMode === 'full' && (
          <div className="space-y-4">
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {contentPlan.map((day: any) => (
                <div 
                  key={day.day} 
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedDay === day.day ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Day {day.day}</Badge>
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

                      {/* Advanced AI Features */}
                      {isAIGenerated && day.psychologicalTriggers && (
                        <div className="p-3 bg-purple-50 rounded border border-purple-200">
                          <h5 className="font-medium text-purple-800 mb-2">Psychological Triggers:</h5>
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
                          <div className="p-2 bg-green-50 rounded">
                            <div className="text-sm font-semibold text-green-600">
                              {day.expectedMetrics.reach?.toLocaleString() || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Reach</div>
                          </div>
                          <div className="p-2 bg-blue-50 rounded">
                            <div className="text-sm font-semibold text-blue-600">
                              {day.expectedMetrics.engagement || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Engagement</div>
                          </div>
                          <div className="p-2 bg-purple-50 rounded">
                            <div className="text-sm font-semibold text-purple-600">
                              ${day.expectedMetrics.cost || 'N/A'}
                            </div>
                            <div className="text-xs text-muted-foreground">Cost</div>
                          </div>
                          <div className="p-2 bg-orange-50 rounded">
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

        {/* Data Status Indicator */}
        {!isAIGenerated && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              ⚠️ Displaying template content calendar - AI-generated plan not available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyPlan;
