
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, TrendingUp, Users, DollarSign, Target, AlertTriangle } from 'lucide-react';

interface CompetitorInsightsProps {
  data: any;
}

const CompetitorInsights = ({ data }: CompetitorInsightsProps) => {
  console.log('Competitor Insights - Checking data structure:', data);
  console.log('AI Competitor data:', data.insights?.competitorInsights);

  // Use correct data path: data.insights.competitorInsights
  const aiCompetitorInsights = data.insights?.competitorInsights || [];
  const isAIGenerated = aiCompetitorInsights.length > 0;

  console.log('Using AI competitor data:', isAIGenerated);
  console.log('Competitor count:', aiCompetitorInsights.length);

  // Template fallback data
  const templateCompetitors = [
    {
      competitor: 'AI Automation Leader A',
      marketPosition: 'Dominant player in enterprise AI automation with 35% market share',
      pricingAnalysis: {
        averagePackages: '$5000-12000/month for similar services',
        pricingStrategy: 'Position 15-20% below market leader while emphasizing superior ROI',
        valueGapOpportunity: 'Opportunity to provide 2x value at 80% of their pricing'
      },
      marketingStrategy: {
        commonApproaches: ['LinkedIn executive outreach', 'Webinar marketing', 'Case study content'],
        weaknesses: ['Generic messaging', 'Limited industry specialization', 'Slow response times'],
        opportunities: ['Executive-focused positioning', 'Industry-specific case studies', 'Rapid implementation']
      },
      contentStrategy: {
        typicalContent: 'Generic automation benefits and technical features',
        contentGaps: ['Executive time-savings calculators', 'Industry-specific ROI data', 'Competitive benchmarking'],
        opportunityAreas: ['Thought leadership on AI trends', 'Executive productivity content', 'Industry-specific automation']
      },
      conversionTactics: {
        commonApproaches: ['Free consultations', 'ROI calculators', 'Technical demos'],
        improvementOpportunities: ['Executive-focused assessments', 'Industry-specific case studies', 'Rapid value demonstration'],
        differentiationStrategy: 'Position as executive productivity specialists with proven industry expertise'
      },
      weaknessExploitation: [
        {
          weakness: 'Generic, one-size-fits-all automation approaches',
          strategy: 'Position as industry-specialized automation experts',
          implementation: 'Develop industry-specific case studies and demos',
          expectedImpact: '25-40% higher conversion rates vs generic competitors'
        }
      ]
    }
  ];

  const competitors = isAIGenerated ? aiCompetitorInsights : templateCompetitors;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>{isAIGenerated ? 'AI-Generated' : 'Template'} Competitive Intelligence</span>
        </CardTitle>
        <CardDescription>
          {isAIGenerated 
            ? 'Real-time analysis of top competitors and strategic market opportunities'
            : 'Template competitive analysis (AI data not available)'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Competitor Analysis */}
          <div className="space-y-4">
            <h4 className="font-semibold">Competitive Landscape Analysis</h4>
            {competitors.map((comp: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <h5 className="font-medium">{comp.competitor}</h5>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Analyze
                  </Button>
                </div>

                {/* Market Position */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-muted-foreground">Market Position</label>
                  <p className="text-sm mt-1 bg-blue-50 p-2 rounded border border-blue-200">{comp.marketPosition}</p>
                </div>

                {/* Pricing Analysis */}
                {comp.pricingAnalysis && (
                  <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      AI Pricing Intelligence
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Market Pricing: </span>
                        <span>{comp.pricingAnalysis.averagePackages}</span>
                      </div>
                      <div>
                        <span className="font-medium">Recommended Strategy: </span>
                        <span className="text-green-700 font-medium">{comp.pricingAnalysis.pricingStrategy}</span>
                      </div>
                      <div>
                        <span className="font-medium">Value Opportunity: </span>
                        <span>{comp.pricingAnalysis.valueGapOpportunity}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Marketing Strategy Analysis */}
                {comp.marketingStrategy && (
                  <div className="mb-4 p-3 bg-purple-50 rounded border border-purple-200">
                    <h5 className="font-medium text-purple-800 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Marketing Strategy Intel
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-purple-700">Common Approaches:</span>
                        <ul className="mt-1 space-y-1">
                          {comp.marketingStrategy.commonApproaches?.map((approach: string, i: number) => (
                            <li key={i} className="flex items-center space-x-2">
                              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                              <span>{approach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium text-red-600">Identified Weaknesses:</span>
                        <ul className="mt-1 space-y-1">
                          {comp.marketingStrategy.weaknesses?.map((weakness: string, i: number) => (
                            <li key={i} className="flex items-center space-x-2">
                              <AlertTriangle className="w-3 h-3 text-red-500" />
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded border">
                      <span className="font-medium text-purple-800">Your Opportunities: </span>
                      <span className="text-sm">{comp.marketingStrategy.opportunities?.join(', ')}</span>
                    </div>
                  </div>
                )}

                {/* Content Strategy Analysis */}
                {comp.contentStrategy && (
                  <div className="mb-4 p-3 bg-orange-50 rounded border border-orange-200">
                    <h5 className="font-medium text-orange-800 mb-2">Content Strategy Analysis</h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Their Content: </span>
                        <span>{comp.contentStrategy.typicalContent}</span>
                      </div>
                      <div>
                        <span className="font-medium text-orange-700">Content Gaps: </span>
                        <span>{comp.contentStrategy.contentGaps?.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-medium text-green-700">Your Opportunities: </span>
                        <span>{comp.contentStrategy.opportunityAreas?.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Conversion Tactics Analysis */}
                {comp.conversionTactics && (
                  <div className="mb-4 p-3 bg-pink-50 rounded border border-pink-200">
                    <h5 className="font-medium text-pink-800 mb-2">Conversion Strategy Analysis</h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Common Tactics: </span>
                        <span>{comp.conversionTactics.commonApproaches?.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-medium text-pink-700">Improvement Areas: </span>
                        <span>{comp.conversionTactics.improvementOpportunities?.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-medium text-green-700">Your Strategy: </span>
                        <span>{comp.conversionTactics.differentiationStrategy}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Weakness Exploitation Strategies */}
                {comp.weaknessExploitation && comp.weaknessExploitation.length > 0 && (
                  <div className="p-3 bg-red-50 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Strategic Advantage Opportunities
                    </h5>
                    {comp.weaknessExploitation.map((exploit: any, i: number) => (
                      <div key={i} className="mb-3 last:mb-0">
                        <div className="p-2 bg-white rounded border">
                          <div className="text-sm space-y-1">
                            <div>
                              <span className="font-medium text-red-700">Their Weakness: </span>
                              <span>{exploit.weakness}</span>
                            </div>
                            <div>
                              <span className="font-medium text-blue-700">Your Strategy: </span>
                              <span>{exploit.strategy}</span>
                            </div>
                            <div>
                              <span className="font-medium text-green-700">Implementation: </span>
                              <span>{exploit.implementation}</span>
                            </div>
                            <div>
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Expected Impact: {exploit.expectedImpact}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data Source Indicator */}
          {!isAIGenerated && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                ⚠️ Displaying template competitive analysis - AI competitor intelligence not available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorInsights;
