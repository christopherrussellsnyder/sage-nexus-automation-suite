
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, TrendingUp, AlertTriangle, Target } from 'lucide-react';

interface CompetitorInsightsProps {
  data: any;
}

const CompetitorInsights = ({ data }: CompetitorInsightsProps) => {
  const competitorInsights = data.competitorInsights || [];

  if (!competitorInsights || competitorInsights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>AI Competitive Intelligence</span>
          </CardTitle>
          <CardDescription>
            AI competitive analysis not available. Please regenerate the report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No AI-generated competitive insights found in the current report.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>AI Competitive Intelligence</span>
        </CardTitle>
        <CardDescription>
          AI-generated competitor analysis and strategic recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {competitorInsights.map((competitor: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{competitor.competitor || `Competitor ${index + 1}`}</h3>
                <Badge variant="outline">AI Analyzed</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                {competitor.strengths && competitor.strengths.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>AI-Identified Strengths</span>
                    </h4>
                    <ul className="space-y-2">
                      {competitor.strengths.map((strength: string, i: number) => (
                        <li key={i} className="text-sm flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Weaknesses */}
                {competitor.weaknesses && competitor.weaknesses.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2 text-red-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span>AI-Identified Weaknesses</span>
                    </h4>
                    <ul className="space-y-2">
                      {competitor.weaknesses.map((weakness: string, i: number) => (
                        <li key={i} className="text-sm flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Opportunities */}
              {competitor.opportunities && competitor.opportunities.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-3 flex items-center space-x-2 text-blue-600">
                    <Target className="h-4 w-4" />
                    <span>AI-Spotted Opportunities</span>
                  </h4>
                  <ul className="space-y-2">
                    {competitor.opportunities.map((opportunity: string, i: number) => (
                      <li key={i} className="text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Strategic Recommendations */}
              {competitor.strategicRecommendations && competitor.strategicRecommendations.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <h4 className="font-semibold mb-2 text-yellow-800">AI Strategic Recommendations</h4>
                  <ul className="space-y-1">
                    {competitor.strategicRecommendations.map((recommendation: string, i: number) => (
                      <li key={i} className="text-sm text-yellow-700 flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-indigo-50 rounded border border-indigo-200">
          <p className="text-sm text-indigo-800">
            <strong>AI Competitive Analysis:</strong> These insights are generated by AI analysis of competitor 
            strategies, market positioning, and performance data to identify strategic opportunities for your business.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorInsights;
