import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Lightbulb, 
  Target,
  Globe,
  Eye,
  Zap,
  ArrowRight
} from 'lucide-react';

interface IndustryInsightsProps {
  data: any;
  businessType: string;
}

const IndustryInsights = ({ data, businessType }: IndustryInsightsProps) => {
  // Access the correct AI-generated industry insights data
  const industryInsights = data.industryInsights || [];
  
  console.log('IndustryInsights - Full data:', data);
  console.log('IndustryInsights - Raw insights:', industryInsights);
  
  // Transform the AI data into structured format with timeline indicators
  const transformedInsights = Array.isArray(industryInsights) 
    ? industryInsights.map((insight: any, index: number) => ({
        trend: insight.trend || insight.description || insight.toString(),
        opportunity: insight.action || insight.opportunity || insight.impact || '',
        timeline: insight.timeline || insight.implementationDate || (index === 0 ? 'Q1 2025' : index === 1 ? 'Q2 2025' : 'Immediate'),
        priority: insight.priority || (index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'),
        impact: insight.impact || insight.expectedImpact || 'Significant market opportunity'
      }))
    : [];
  
  const trends = transformedInsights.map(item => item.trend).filter(Boolean);
  const opportunities = transformedInsights.map(item => item.opportunity).filter(Boolean);

  const hasData = trends.length > 0 || opportunities.length > 0;

  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Industry Insights</span>
          </CardTitle>
          <CardDescription>Current market trends and opportunities in your industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <Globe className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-700 mb-2">No Industry Insights Data</h3>
            <p className="text-sm text-yellow-600 mb-4">
              Industry trends and opportunities data was not generated or is missing from the response.
            </p>
            <p className="text-xs text-yellow-600">
              Please regenerate the report to get comprehensive industry analysis.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>Industry Insights</span>
        </CardTitle>
        <CardDescription>
          Current market trends and opportunities in your industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Industry Trends */}
          {trends.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-700">Industry Trends</h3>
              </div>
              <div className="space-y-3">
                {transformedInsights.filter(item => item.trend).map((insight: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 rounded-full p-2 mt-1">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-700">{insight.trend}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {insight.timeline}
                              </Badge>
                              <Badge variant={insight.priority === 'High' ? 'default' : 'secondary'} className="text-xs">
                                {insight.priority}
                              </Badge>
                            </div>
                          </div>
                          {insight.impact && (
                            <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                              Impact: {insight.impact}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Market Opportunities */}
          {opportunities.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-700">Market Opportunities</h3>
              </div>
              <div className="space-y-3">
                {transformedInsights.filter(item => item.opportunity).map((insight: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 rounded-full p-2 mt-1">
                          <Lightbulb className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-700">{insight.opportunity}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {insight.timeline}
                              </Badge>
                              <Badge variant={insight.priority === 'High' ? 'default' : 'secondary'} className="text-xs">
                                {insight.priority}
                              </Badge>
                            </div>
                          </div>
                          {insight.impact && (
                            <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                              Expected Impact: {insight.impact}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Items */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="h-5 w-5 text-purple-600" />
              <h4 className="font-semibold text-purple-700">Recommended Actions</h4>
            </div>
            <div className="space-y-2 text-sm text-purple-600">
              <div className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>Monitor these trends closely for strategic opportunities</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>Align your marketing strategy with emerging market opportunities</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>Consider early adoption of trending technologies or methods</span>
              </div>
            </div>
          </div>

          {/* AI-Generated Notice */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-green-100 text-green-700">AI-Generated</Badge>
              <span className="text-sm font-medium text-green-700">Industry Analysis</span>
            </div>
            <p className="text-sm text-green-600">
              These industry insights are generated through AI analysis of current market data, 
              competitor research, and emerging trends specific to your business sector.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryInsights;