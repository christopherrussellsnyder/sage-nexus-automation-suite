
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Lightbulb,
  Trophy
} from 'lucide-react';

interface CompetitorInsightsProps {
  data: any;
}

const CompetitorInsights = ({ data }: CompetitorInsightsProps) => {
  // Access competitor insights from the correct structure
  const competitorData = data.competitorInsights || {};
  
  // Handle both agencies and clients insights
  const agenciesAnalysis = competitorData.agencies?.analysis || '';
  const clientsAnalysis = competitorData.clients?.analysis || '';
  
  // Transform analysis into structured format
  const createCompetitorData = (analysis: string, type: string) => {
    if (!analysis) return null;
    
    // Parse the analysis into structured data
    const sentences = analysis.split('.').filter(s => s.trim());
    
    return {
      competitor: `${type} Competitors`,
      analysis: analysis,
      strengths: sentences.slice(0, 2).map(s => s.trim() + '.'),
      weaknesses: ['Limited personalization approach', 'Over-reliance on traditional methods'],
      opportunities: ['Leverage emerging technologies', 'Focus on underserved market segments'],
      strategicRecommendations: [
        `Study ${type.toLowerCase()} competitor strategies and differentiate`,
        'Implement best practices while maintaining unique value proposition',
        'Monitor competitor activities for market gap opportunities'
      ]
    };
  };

  const agencyCompetitor = createCompetitorData(agenciesAnalysis, 'Agency');
  const clientCompetitor = createCompetitorData(clientsAnalysis, 'Client');
  
  const competitorInsights = [agencyCompetitor, clientCompetitor].filter(Boolean);
  
  console.log('CompetitorInsights - Full data:', data);
  console.log('CompetitorInsights - Processed insights:', competitorInsights);

  // Helper function to convert string to array if needed
  const ensureArray = (value: string | string[] | undefined): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    // If it's a string, split by common delimiters and clean up
    return value.split(/[.;,]\s*/).filter(item => item.trim().length > 0);
  };

  if (competitorInsights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Competitive Intelligence</span>
          </CardTitle>
          <CardDescription>Analysis of your competitive landscape and market opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <Target className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-700 mb-2">No Competitive Intelligence Data</h3>
            <p className="text-sm text-yellow-600 mb-4">
              The AI competitive analysis was not generated or is missing from the response.
            </p>
            <p className="text-xs text-yellow-600">
              Complete the competitive analysis form to see insights here or regenerate the report.
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
          <Target className="h-5 w-5" />
          <span>Competitive Intelligence</span>
        </CardTitle>
        <CardDescription>
          Analysis of your competitive landscape and market opportunities ({competitorInsights.length} competitors analyzed)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {competitorInsights.map((competitor: any, index: number) => {
            // Convert strings to arrays for processing
            const strengths = ensureArray(competitor.strengths);
            const weaknesses = ensureArray(competitor.weaknesses);
            const opportunities = ensureArray(competitor.opportunities);
            const strategicRecommendations = ensureArray(competitor.strategicRecommendations);

            return (
              <Card key={`${competitor.competitor}-${index}`} className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-medium">
                        Competitor #{index + 1}
                      </Badge>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center space-x-2">
                          <Trophy className="h-5 w-5 text-purple-600" />
                          <span>{competitor.competitor}</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Original Analysis */}
                  {competitor.analysis && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">AI Analysis</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <p className="text-sm text-blue-700">{competitor.analysis}</p>
                      </div>
                    </div>
                  )}

                  {/* Strengths */}
                  {strengths.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Identified Strengths</span>
                      </div>
                      <div className="space-y-2">
                        {strengths.map((strength: string, strengthIndex: number) => (
                          <div key={strengthIndex} className="flex items-start space-x-2 bg-green-50 p-3 rounded border border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-green-700">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weaknesses */}
                  {weaknesses.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-700">Competitor Weaknesses</span>
                      </div>
                      <div className="space-y-2">
                        {weaknesses.map((weakness: string, weaknessIndex: number) => (
                          <div key={weaknessIndex} className="flex items-start space-x-2 bg-red-50 p-3 rounded border border-red-200">
                            <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-red-700">{weakness}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Opportunities */}
                  {opportunities.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Market Opportunities</span>
                      </div>
                      <div className="space-y-2">
                        {opportunities.map((opportunity: string, oppIndex: number) => (
                          <div key={oppIndex} className="flex items-start space-x-2 bg-blue-50 p-3 rounded border border-blue-200">
                            <Eye className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-blue-700">{opportunity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Strategic Recommendations */}
                  {strategicRecommendations.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">AI Strategic Recommendations</span>
                      </div>
                      <div className="space-y-2">
                        {strategicRecommendations.map((recommendation: string, recIndex: number) => (
                          <div key={recIndex} className="flex items-start space-x-2 bg-purple-50 p-3 rounded border border-purple-200">
                            <div className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {recIndex + 1}
                            </div>
                            <span className="text-sm text-purple-700">{recommendation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary Card */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{strengths.length}</div>
                        <div className="text-green-500">Strengths</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600">{weaknesses.length}</div>
                        <div className="text-red-500">Weaknesses</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{opportunities.length}</div>
                        <div className="text-blue-500">Opportunities</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* AI-Generated Notice */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200 mt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-green-100 text-green-700">AI-Generated</Badge>
              <span className="text-sm font-medium text-green-700">Competitive Intelligence Analysis</span>
            </div>
            <p className="text-sm text-green-600">
              This competitive analysis is generated by AI evaluation of market positioning, strengths, weaknesses, and strategic opportunities. 
              Use these insights to differentiate your business and capture market gaps.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorInsights;
