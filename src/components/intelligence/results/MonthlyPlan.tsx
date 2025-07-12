
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign, TrendingUp, Clock, Target, Zap } from 'lucide-react';

interface MonthlyPlanProps {
  data: any;
}

const MonthlyPlan = ({ data }: MonthlyPlanProps) => {
  const monthlyPlan = data.monthlyPlan || [];

  if (!monthlyPlan || monthlyPlan.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI-Generated 30-Day Content Calendar</CardTitle>
          <CardDescription>
            AI content calendar not available. Please regenerate the report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No AI-generated monthly plan found in the current report.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>AI-Generated 30-Day Optimized Content Calendar</span>
        </CardTitle>
        <CardDescription>
          Advanced ecommerce-optimized content strategy with proven formulas and psychological triggers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {monthlyPlan.slice(0, 30).map((day: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-semibold">Day {day.day || index + 1}</Badge>
                  <Badge variant={day.contentType === 'ad' ? 'default' : 'secondary'}>
                    {day.contentType || 'content'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {day.platform || 'Platform'}
                  </Badge>
                  {day.expectedMetrics?.readTime && (
                    <Badge variant="outline" className="text-xs flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{day.expectedMetrics.readTime}</span>
                    </Badge>
                  )}
                </div>
                {day.expectedMetrics?.reach && (
                  <div className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{day.expectedMetrics.reach.toLocaleString()} reach</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {/* Hook, Body, CTA Structure */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white p-3 rounded border-l-4 border-l-green-500">
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="h-4 w-4 text-green-600" />
                      <h4 className="font-semibold text-sm text-green-800">Hook</h4>
                    </div>
                    <p className="text-sm font-medium">
                      {day.hook || 'AI Hook Not Generated'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border-l-4 border-l-blue-500">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <h4 className="font-semibold text-sm text-blue-800">Body</h4>
                    </div>
                    <p className="text-sm">
                      {day.body || 'AI body content not generated'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border-l-4 border-l-purple-500">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <h4 className="font-semibold text-sm text-purple-800">Call-to-Action</h4>
                    </div>
                    <p className="text-sm font-semibold">
                      {day.cta || 'CTA'}
                    </p>
                  </div>
                </div>
                
                {/* Strategic Reasoning */}
                {day.strategicReasoning && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded border-l-4 border-l-amber-400">
                    <div className="flex items-start space-x-2">
                      <div className="bg-amber-100 p-1 rounded">
                        <Target className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-amber-800 mb-1">AI Strategic Analysis</h5>
                        <p className="text-xs text-amber-700">{day.strategicReasoning}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Psychological Triggers */}
                {day.psychologicalTriggers && day.psychologicalTriggers.length > 0 && (
                  <div className="bg-pink-50 p-3 rounded">
                    <h5 className="font-semibold text-sm text-pink-800 mb-2">Psychological Triggers Applied</h5>
                    <div className="flex flex-wrap gap-1">
                      {day.psychologicalTriggers.map((trigger: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-pink-100 text-pink-700">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Performance Metrics */}
                {day.expectedMetrics && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="h-3 w-3 text-blue-500" />
                        <span className="text-xs font-medium">Reach</span>
                      </div>
                      <span className="text-sm font-semibold">{day.expectedMetrics.reach || 'N/A'}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium">Engagement</span>
                      </div>
                      <span className="text-sm font-semibold">{day.expectedMetrics.engagement || 'N/A'}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <DollarSign className="h-3 w-3 text-purple-500" />
                        <span className="text-xs font-medium">Cost</span>
                      </div>
                      <span className="text-sm font-semibold">${day.expectedMetrics.cost || 'N/A'}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Target className="h-3 w-3 text-orange-500" />
                        <span className="text-xs font-medium">Conversions</span>
                      </div>
                      <span className="text-sm font-semibold">{day.expectedMetrics.conversions || 'N/A'}</span>
                    </div>
                  </div>
                )}
                
                {/* Industry Benchmarks */}
                {day.industryBenchmarks && (
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-sm text-gray-800 mb-2">Industry Benchmarks</h5>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">CTR:</span>
                        <span className="ml-1 font-medium">{day.industryBenchmarks.expectedCTR}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Conv Rate:</span>
                        <span className="ml-1 font-medium">{day.industryBenchmarks.conversionRate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Engagement:</span>
                        <span className="ml-1 font-medium">{day.industryBenchmarks.engagementRate}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Visual Suggestion */}
                {day.visualSuggestion && (
                  <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>Visual Recommendation:</strong> {day.visualSuggestion}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 p-2 rounded">
              <Zap className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Advanced Ecommerce Optimization Applied</h4>
              <div className="space-y-2 text-sm text-green-700">
                <p>✅ <strong>Optimal Ad Length:</strong> 1-2 sentences for maximum engagement (3-8 second read time)</p>
                <p>✅ <strong>Proven Formulas:</strong> Problem-Solution, Benefit-Proof, and Social Proof Hook strategies</p>
                <p>✅ <strong>Psychological Triggers:</strong> Industry-specific triggers for higher conversion rates</p>
                <p>✅ <strong>Platform Optimization:</strong> Content tailored for each platform's unique requirements</p>
                <p>✅ <strong>Performance Focus:</strong> Every piece optimized for measurable business results</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyPlan;
