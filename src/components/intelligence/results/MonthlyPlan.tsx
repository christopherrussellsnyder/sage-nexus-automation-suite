
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Users, 
  Eye,
  MousePointer,
  DollarSign,
  MessageSquare,
  Share2,
  Mail,
  Globe,
  Lightbulb
} from 'lucide-react';

interface MonthlyPlanProps {
  data: any;
}

const MonthlyPlan = ({ data }: MonthlyPlanProps) => {
  // Ensure we access the correct data structure
  const monthlyPlan = data.monthlyPlan || [];
  
  console.log('MonthlyPlan - Full data:', data);
  console.log('MonthlyPlan - Monthly plan array:', monthlyPlan);

  const getPlatformIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'facebook':
      case 'facebook ads':
        return '📘';
      case 'google':
      case 'google ads':
        return '🔍';
      case 'instagram':
        return '📷';
      case 'linkedin':
        return '💼';
      case 'twitter':
        return '🐦';
      case 'email':
        return '📧';
      default:
        return '🌐';
    }
  };

  const getContentTypeColor = (contentType: string) => {
    switch (contentType?.toLowerCase()) {
      case 'ad':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'organic':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'email':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  if (!monthlyPlan || monthlyPlan.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>AI-Generated 30-Day Content Plan</span>
          </CardTitle>
          <CardDescription>Comprehensive daily content strategy optimized for your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <Calendar className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-700 mb-2">No Monthly Plan Generated</h3>
            <p className="text-sm text-yellow-600 mb-4">
              The AI monthly content plan was not generated or is missing from the response.
            </p>
            <Button variant="outline" className="text-yellow-700 border-yellow-300">
              Please regenerate the report to get your 30-day content plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group content by weeks
  const weeklyGroups = monthlyPlan.reduce((acc: any, day: any) => {
    const weekNumber = Math.ceil(day.day / 7);
    if (!acc[weekNumber]) acc[weekNumber] = [];
    acc[weekNumber].push(day);
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>AI-Generated 30-Day Content Plan</span>
        </CardTitle>
        <CardDescription>
          {monthlyPlan.length} days of AI-optimized content strategy with proven formulas and psychological triggers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{monthlyPlan.length}</div>
              <div className="text-xs text-blue-600">Total Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {monthlyPlan.filter((day: any) => day.contentType === 'ad').length}
              </div>
              <div className="text-xs text-green-600">Ad Contents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {monthlyPlan.filter((day: any) => day.contentType === 'organic').length}
              </div>
              <div className="text-xs text-purple-600">Organic Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(monthlyPlan.map((day: any) => day.platform)).size}
              </div>
              <div className="text-xs text-orange-600">Platforms</div>
            </div>
          </div>

          {/* Weekly Tabs */}
          <Tabs defaultValue="week1" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {Object.keys(weeklyGroups).map((week) => (
                <TabsTrigger key={week} value={`week${week}`}>
                  Week {week}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(weeklyGroups).map(([weekNum, days]: [string, any]) => (
              <TabsContent key={weekNum} value={`week${weekNum}`} className="space-y-4">
                <div className="grid gap-4">
                  {days.map((day: any, index: number) => (
                    <Card key={`${weekNum}-${day.day}-${index}`} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="font-medium">
                              Day {day.day}
                            </Badge>
                            <Badge className={getContentTypeColor(day.contentType)}>
                              {getPlatformIcon(day.platform)} {day.platform} - {day.contentType}
                            </Badge>
                          </div>
                          {day.expectedMetrics && (
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              {day.expectedMetrics.reach && (
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{day.expectedMetrics.reach?.toLocaleString()} reach</span>
                                </div>
                              )}
                              {day.expectedMetrics.cost && (
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="h-3 w-3" />
                                  <span>${day.expectedMetrics.cost}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Hook */}
                        {day.hook && (
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground flex items-center space-x-1">
                              <Lightbulb className="h-3 w-3" />
                              <span>AI-Generated Hook</span>
                            </Label>
                            <p className="text-sm font-medium bg-yellow-50 p-2 rounded border border-yellow-200 mt-1">
                              {day.hook}
                            </p>
                          </div>
                        )}

                        {/* Body */}
                        {day.body && (
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>AI-Generated Body Content</span>
                            </Label>
                            <p className="text-sm bg-blue-50 p-3 rounded border border-blue-200 mt-1">
                              {day.body}
                            </p>
                          </div>
                        )}

                        {/* CTA */}
                        {day.cta && (
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground flex items-center space-x-1">
                              <MousePointer className="h-3 w-3" />
                              <span>Call-to-Action</span>
                            </Label>
                            <Badge className="mt-1 bg-green-100 text-green-700 border border-green-200">
                              {day.cta}
                            </Badge>
                          </div>
                        )}

                        {/* Additional Details Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t">
                          {day.targetAudience && (
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">Target Audience</Label>
                              <p className="text-xs bg-purple-50 p-2 rounded mt-1">{day.targetAudience}</p>
                            </div>
                          )}
                          
                          {day.keyMessage && (
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">Key Message</Label>
                              <p className="text-xs bg-green-50 p-2 rounded mt-1">{day.keyMessage}</p>
                            </div>
                          )}
                          
                          {day.visualSuggestion && (
                            <div className="md:col-span-2">
                              <Label className="text-xs font-medium text-muted-foreground">Visual Suggestion</Label>
                              <p className="text-xs bg-orange-50 p-2 rounded mt-1">{day.visualSuggestion}</p>
                            </div>
                          )}

                          {day.strategicReasoning && (
                            <div className="md:col-span-2">
                              <Label className="text-xs font-medium text-muted-foreground">AI Strategic Reasoning</Label>
                              <p className="text-xs bg-gray-50 p-2 rounded mt-1 italic">{day.strategicReasoning}</p>
                            </div>
                          )}
                        </div>

                        {/* Expected Metrics */}
                        {day.expectedMetrics && Object.keys(day.expectedMetrics).length > 0 && (
                          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded border">
                            <Label className="text-xs font-medium text-muted-foreground mb-2 block">Expected Performance Metrics</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                              {day.expectedMetrics.reach && (
                                <div className="text-center">
                                  <div className="font-semibold text-blue-600">{day.expectedMetrics.reach.toLocaleString()}</div>
                                  <div className="text-blue-500">Reach</div>
                                </div>
                              )}
                              {day.expectedMetrics.engagement && (
                                <div className="text-center">
                                  <div className="font-semibold text-green-600">{day.expectedMetrics.engagement}</div>
                                  <div className="text-green-500">Engagement</div>
                                </div>
                              )}
                              {day.expectedMetrics.conversions && (
                                <div className="text-center">
                                  <div className="font-semibold text-purple-600">{day.expectedMetrics.conversions}</div>
                                  <div className="text-purple-500">Conversions</div>
                                </div>
                              )}
                              {day.expectedMetrics.cost && (
                                <div className="text-center">
                                  <div className="font-semibold text-orange-600">${day.expectedMetrics.cost}</div>
                                  <div className="text-orange-500">Cost</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* AI-Generated Notice */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-green-100 text-green-700">AI-Generated</Badge>
              <span className="text-sm font-medium text-green-700">Advanced Content Strategy</span>
            </div>
            <p className="text-sm text-green-600">
              This 30-day content plan uses AI analysis of your business data, industry trends, and proven marketing formulas. 
              Each piece of content is strategically designed with psychological triggers and platform-specific optimizations.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface LabelProps {
  className?: string;
  children: React.ReactNode;
}

const Label = ({ className = "", children }: LabelProps) => (
  <div className={`text-sm font-medium text-muted-foreground ${className}`}>
    {children}
  </div>
);

export default MonthlyPlan;
