
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, AlertTriangle, Users } from 'lucide-react';

interface CompetitorInsightsProps {
  data: any;
  businessType?: string;
}

const CompetitorInsights = ({ data, businessType }: CompetitorInsightsProps) => {
  const insights = data.competitorInsights || {};
  const competitors = data.competitors || [];

  const getInsightsTitle = () => {
    switch (businessType) {
      case 'copywriting':
        return 'Copywriting Competitive Intelligence';
      case 'agency':
        return 'Agency Competitive Intelligence';
      case 'sales':
        return 'Sales Competitive Intelligence';
      default:
        return 'Competitive Intelligence';
    }
  };

  const getInsightsDescription = () => {
    switch (businessType) {
      case 'copywriting':
        return 'Analysis of top-performing copy in your client\'s industry and competitive copywriting landscape';
      case 'agency':
        return 'Analysis of your agency competitive landscape and client industry opportunities';
      case 'sales':
        return 'Analysis of your competitive sales landscape and market positioning for better deal closing';
      default:
        return 'Analysis of your competitive landscape and market opportunities';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>{getInsightsTitle()}</span>
          </CardTitle>
          <CardDescription>
            {getInsightsDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Competitor Analysis */}
          {competitors.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {businessType === 'copywriting' ? 'Industry Copy Analysis' : 
                 businessType === 'sales' ? 'Competitive Sales Analysis' : 
                 'Competitor Analysis'}
              </h3>
              <div className="grid gap-4">
                {competitors.slice(0, 3).map((competitor: any, index: number) => (
                  <Card key={index} className="border-dashed">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{competitor.name || `${businessType === 'copywriting' ? 'Copy Example' : 'Competitor'} ${index + 1}`}</h4>
                        <Badge variant="outline">
                          {competitor.marketShare || 'Performance Benchmark'}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-green-600 mb-2">
                            {businessType === 'copywriting' ? 'Copy Strengths' : 
                             businessType === 'sales' ? 'Sales Advantages' : 
                             'Strengths'}
                          </h5>
                          <ul className="text-sm space-y-1">
                            {Array.isArray(competitor.strengths) 
                              ? competitor.strengths.map((strength: string, i: number) => (
                                  <li key={i} className="flex items-start space-x-2">
                                    <TrendingUp className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                    <span>{strength}</span>
                                  </li>
                                ))
                              : competitor.strengths && (
                                  <li className="flex items-start space-x-2">
                                    <TrendingUp className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                    <span>{competitor.strengths}</span>
                                  </li>
                                )
                            }
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-red-600 mb-2">
                            {businessType === 'copywriting' ? 'Copy Weaknesses' : 
                             businessType === 'sales' ? 'Sales Gaps' : 
                             'Weaknesses'}
                          </h5>
                          <ul className="text-sm space-y-1">
                            {Array.isArray(competitor.weaknesses) 
                              ? competitor.weaknesses.map((weakness: string, i: number) => (
                                  <li key={i} className="flex items-start space-x-2">
                                    <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                                    <span>{weakness}</span>
                                  </li>
                                ))
                              : competitor.weaknesses && (
                                  <li className="flex items-start space-x-2">
                                    <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                                    <span>{competitor.weaknesses}</span>
                                  </li>
                                )
                            }
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Gap Opportunities */}
          {insights.gapOpportunities && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                {businessType === 'copywriting' ? 'Copy Improvement Opportunities' : 
                 businessType === 'sales' ? 'Sales Opportunity Gaps' : 
                 'Market Gap Opportunities'}
              </h3>
              <div className="grid gap-3">
                {Array.isArray(insights.gapOpportunities) 
                  ? insights.gapOpportunities.map((opportunity: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Target className="h-4 w-4 text-blue-600 mt-1" />
                        <span className="text-sm">{opportunity}</span>
                      </div>
                    ))
                  : (
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Target className="h-4 w-4 text-blue-600 mt-1" />
                        <span className="text-sm">{insights.gapOpportunities}</span>
                      </div>
                    )
                }
              </div>
            </div>
          )}

          {/* Differentiation Strategy */}
          {insights.differentiationStrategy && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                {businessType === 'copywriting' ? 'Copy Differentiation Strategy' : 
                 businessType === 'sales' ? 'Sales Differentiation Strategy' : 
                 'Differentiation Strategy'}
              </h3>
              <div className="grid gap-3">
                {Array.isArray(insights.differentiationStrategy) 
                  ? insights.differentiationStrategy.map((strategy: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                        <Users className="h-4 w-4 text-purple-600 mt-1" />
                        <span className="text-sm">{strategy}</span>
                      </div>
                    ))
                  : (
                      <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                        <Users className="h-4 w-4 text-purple-600 mt-1" />
                        <span className="text-sm">{insights.differentiationStrategy}</span>
                      </div>
                    )
                }
              </div>
            </div>
          )}

          {/* Market Position */}
          {data.marketPosition && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                {businessType === 'copywriting' ? 'Copy Market Position' : 
                 businessType === 'sales' ? 'Sales Market Position' : 
                 'Market Position'}
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm">{data.marketPosition}</p>
              </div>
            </div>
          )}

          {/* Competitive Advantage */}
          {data.competitiveAdvantage && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">
                {businessType === 'copywriting' ? 'Copywriting Competitive Advantage' : 
                 businessType === 'sales' ? 'Sales Competitive Advantage' : 
                 'Competitive Advantage'}
              </h3>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm">{data.competitiveAdvantage}</p>
              </div>
            </div>
          )}

          {/* No data message */}
          {(!competitors || competitors.length === 0) && (!insights.gapOpportunities) && (!insights.differentiationStrategy) && (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No competitive intelligence data available.</p>
              <p className="text-sm">Complete the competitive analysis form to see insights here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorInsights;
