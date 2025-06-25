
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Globe, Calendar, Target, Lightbulb, AlertTriangle } from 'lucide-react';

interface IndustryInsightsProps {
  data: any;
}

const IndustryInsights = ({ data }: IndustryInsightsProps) => {
  console.log('Industry Insights - Checking data structure:', data);
  console.log('AI Industry data:', data.insights?.industryInsights);

  // Use correct data path: data.insights.industryInsights
  const aiIndustryInsights = data.insights?.industryInsights || [];
  const isAIGenerated = aiIndustryInsights.length > 0;

  console.log('Using AI industry data:', isAIGenerated);
  console.log('Industry insights count:', aiIndustryInsights.length);

  // Template fallback data
  const templateInsights = [
    {
      trend: 'Accelerating AI adoption across service industries',
      impact: 'Growing demand for specialized automation solutions',
      opportunity: 'Position as early adopter with proven expertise',
      timeline: 'Peak opportunity in next 12-18 months',
      actionPlan: [
        'Develop industry-specific case studies',
        'Create automation assessments',
        'Build strategic partnerships'
      ],
      economicFactors: [
        {
          factor: 'Labor cost inflation driving automation adoption',
          businessImpact: 'Increased urgency for efficiency solutions',
          marketingAngle: 'Cost savings messaging becomes more compelling'
        }
      ]
    }
  ];

  const insights = isAIGenerated ? aiIndustryInsights : templateInsights;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>{isAIGenerated ? 'AI-Generated' : 'Template'} Industry Insights</span>
        </CardTitle>
        <CardDescription>
          {isAIGenerated 
            ? 'Real-time market trends and strategic opportunities in your industry'
            : 'Template industry analysis (AI data not available)'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {insights.map((insight: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              {/* Main Trend */}
              <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Market Trend
                </h4>
                <p className="text-blue-700">{insight.trend}</p>
              </div>

              {/* Impact & Opportunity */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-green-50 rounded border border-green-200">
                  <h5 className="font-medium text-green-800 mb-1">Business Impact</h5>
                  <p className="text-sm text-green-700">{insight.impact}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-1">Strategic Opportunity</h5>
                  <p className="text-sm text-purple-700">{insight.opportunity}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-4 p-3 bg-orange-50 rounded border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Timeline
                </h5>
                <p className="text-sm text-orange-700">{insight.timeline}</p>
              </div>

              {/* Action Plan */}
              {insight.actionPlan && (
                <div className="mb-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Recommended Action Plan
                  </h5>
                  <ul className="space-y-1">
                    {insight.actionPlan.map((action: string, actionIndex: number) => (
                      <li key={actionIndex} className="text-sm flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                        <span className="text-yellow-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Economic Factors */}
              {insight.economicFactors && insight.economicFactors.length > 0 && (
                <div className="p-3 bg-red-50 rounded border border-red-200">
                  <h5 className="font-medium text-red-800 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Economic Factors
                  </h5>
                  <div className="space-y-3">
                    {insight.economicFactors.map((factor: any, factorIndex: number) => (
                      <div key={factorIndex} className="p-2 bg-white rounded border">
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="font-medium text-red-700">Factor: </span>
                            <span>{factor.factor}</span>
                          </div>
                          <div>
                            <span className="font-medium text-blue-700">Business Impact: </span>
                            <span>{factor.businessImpact}</span>
                          </div>
                          <div>
                            <span className="font-medium text-green-700">Marketing Angle: </span>
                            <span>{factor.marketingAngle}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Data Status Indicator */}
          {!isAIGenerated && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                ⚠️ Displaying template industry insights - AI analysis not available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryInsights;
