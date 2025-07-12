
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign, TrendingUp, Clock, Target, Zap, Building2 } from 'lucide-react';

interface MonthlyPlanProps {
  data: any;
  businessType?: string;
}

const MonthlyPlan = ({ data, businessType }: MonthlyPlanProps) => {
  const monthlyPlan = data.monthlyPlan || [];
  const agencyClientPlan = data.agencyClientPlan || [];

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

  const getCalendarTitle = () => {
    switch (businessType) {
      case 'copywriting':
        return 'AI-Generated 30-Day Copywriting Client Work Calendar';
      case 'agency':
        return 'AI-Generated 30-Day Agency Content Calendar';
      case 'sales':
        return 'AI-Generated 30-Day Sales Activity Calendar';
      default:
        return 'AI-Generated 30-Day Optimized Content Calendar';
    }
  };

  const getCalendarDescription = () => {
    switch (businessType) {
      case 'copywriting':
        return 'Copywriting project schedule optimized for client deliverables and high-converting copy creation';
      case 'agency':
        return 'Dual-purpose calendar: client campaign management and agency growth activities';
      case 'sales':
        return 'Sales activity schedule focused on lead nurturing, follow-ups, and deal closing';
      default:
        return 'Advanced ecommerce-optimized content strategy with proven formulas and psychological triggers';
    }
  };

  const renderPlanCard = (plan: any[], title: string, description: string, icon: any) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {plan.slice(0, 30).map((day: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-semibold">Day {day.day || index + 1}</Badge>
                  <Badge variant={day.contentType === 'ad' ? 'default' : 'secondary'}>
                    {day.contentType || 'activity'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {day.platform || day.activityType || 'Task'}
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
                      <h4 className="font-semibold text-sm text-green-800">
                        {businessType === 'sales' ? 'Objective' : 'Hook'}
                      </h4>
                    </div>
                    <p className="text-sm font-medium">
                      {day.hook || day.objective || 'AI content not generated'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border-l-4 border-l-blue-500">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <h4 className="font-semibold text-sm text-blue-800">
                        {businessType === 'sales' ? 'Activity' : 'Body'}
                      </h4>
                    </div>
                    <p className="text-sm">
                      {day.body || day.activity || 'AI content not generated'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border-l-4 border-l-purple-500">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <h4 className="font-semibold text-sm text-purple-800">
                        {businessType === 'sales' ? 'Expected Outcome' : 'Call-to-Action'}
                      </h4>
                    </div>
                    <p className="text-sm font-semibold">
                      {day.cta || day.expectedOutcome || 'Outcome'}
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
                
                {/* Business Type Specific Triggers */}
                {(day.psychologicalTriggers || day.salesTechniques || day.copywritingPrinciples) && (
                  <div className="bg-pink-50 p-3 rounded">
                    <h5 className="font-semibold text-sm text-pink-800 mb-2">
                      {businessType === 'sales' ? 'Sales Techniques Applied' : 
                       businessType === 'copywriting' ? 'Copywriting Principles' : 
                       'Psychological Triggers Applied'}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {(day.psychologicalTriggers || day.salesTechniques || day.copywritingPrinciples || []).map((item: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-pink-100 text-pink-700">
                          {item}
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
                        <span className="text-xs font-medium">
                          {businessType === 'sales' ? 'Contacts' : 'Reach'}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">{day.expectedMetrics.reach || day.expectedMetrics.contacts || 'N/A'}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium">
                          {businessType === 'sales' ? 'Responses' : 'Engagement'}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">{day.expectedMetrics.engagement || day.expectedMetrics.responses || 'N/A'}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <DollarSign className="h-3 w-3 text-purple-500" />
                        <span className="text-xs font-medium">
                          {businessType === 'sales' ? 'Revenue' : 'Cost'}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        ${day.expectedMetrics.cost || day.expectedMetrics.revenue || 'N/A'}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Target className="h-3 w-3 text-orange-500" />
                        <span className="text-xs font-medium">
                          {businessType === 'sales' ? 'Deals' : 'Conversions'}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">{day.expectedMetrics.conversions || day.expectedMetrics.deals || 'N/A'}</span>
                    </div>
                  </div>
                )}
                
                {/* Visual Suggestion or Task Details */}
                {(day.visualSuggestion || day.taskDetails) && (
                  <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>{businessType === 'sales' ? 'Task Details:' : 'Visual Recommendation:'}</strong> {day.visualSuggestion || day.taskDetails}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Main Calendar */}
      {renderPlanCard(
        monthlyPlan, 
        getCalendarTitle(), 
        getCalendarDescription(),
        <Calendar className="h-5 w-5" />
      )}

      {/* Agency Client Calendar */}
      {businessType === 'agency' && agencyClientPlan && agencyClientPlan.length > 0 && 
        renderPlanCard(
          agencyClientPlan,
          'AI-Generated 30-Day Client Campaign Calendar',
          'Dedicated calendar for managing your client campaigns and deliverables',
          <Building2 className="h-5 w-5" />
        )
      }
      
      {/* Business Type Optimization Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded border border-green-200 p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">
                  {businessType === 'copywriting' ? 'Copywriting Intelligence Applied' :
                   businessType === 'agency' ? 'Agency Intelligence Applied' :
                   businessType === 'sales' ? 'Sales Intelligence Applied' :
                   'Advanced Optimization Applied'}
                </h4>
                <div className="space-y-2 text-sm text-green-700">
                  {businessType === 'copywriting' && (
                    <>
                      <p>✅ <strong>Client-Focused Content:</strong> All activities optimized for client deliverables and results</p>
                      <p>✅ <strong>Copy Performance:</strong> Metrics focused on conversion rates and client satisfaction</p>
                      <p>✅ <strong>Industry Analysis:</strong> Competitor copy analysis for each client's specific niche</p>
                      <p>✅ <strong>Professional Development:</strong> Activities to improve copywriting skills and client retention</p>
                    </>
                  )}
                  {businessType === 'agency' && (
                    <>
                      <p>✅ <strong>Dual-Purpose Strategy:</strong> Content for both client work and agency growth</p>
                      <p>✅ <strong>Client Campaign Management:</strong> Structured approach to client deliverables</p>
                      <p>✅ <strong>Agency Marketing:</strong> Activities to attract new clients and showcase expertise</p>
                      <p>✅ <strong>Scalable Systems:</strong> Processes that work for multiple clients simultaneously</p>
                    </>
                  )}
                  {businessType === 'sales' && (
                    <>
                      <p>✅ <strong>Deal-Closing Focus:</strong> Activities optimized for converting leads to customers</p>
                      <p>✅ <strong>Relationship Building:</strong> Systematic approach to nurturing prospects</p>
                      <p>✅ <strong>Sales Metrics:</strong> KPIs focused on revenue generation and deal velocity</p>
                      <p>✅ <strong>Competitive Positioning:</strong> Market intelligence for better closing strategies</p>
                    </>
                  )}
                  {!['copywriting', 'agency', 'sales'].includes(businessType) && (
                    <>
                      <p>✅ <strong>Optimal Content Length:</strong> 1-2 sentences for maximum engagement (3-8 second read time)</p>
                      <p>✅ <strong>Proven Formulas:</strong> Problem-Solution, Benefit-Proof, and Social Proof Hook strategies</p>
                      <p>✅ <strong>Psychological Triggers:</strong> Industry-specific triggers for higher conversion rates</p>
                      <p>✅ <strong>Platform Optimization:</strong> Content tailored for each platform's unique requirements</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyPlan;
