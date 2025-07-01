
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, TrendingUp, Users, DollarSign } from 'lucide-react';

interface CompetitorInsightsProps {
  data: any;
}

const CompetitorInsights = ({ data }: CompetitorInsightsProps) => {
  const competitors = [
    {
      name: 'Market Leader A',
      marketShare: '34%',
      strategy: 'Problem-solution narrative with strong social proof elements',
      performance: '4.2% conversion rate, $18 CPM',
      application: 'Implement similar testimonial-driven approach with your unique value proposition',
      strengths: ['High conversion rates', 'Strong brand recognition', 'Effective retargeting'],
      weaknesses: ['High customer acquisition cost', 'Limited mobile optimization']
    },
    {
      name: 'Emerging Competitor B',
      marketShare: '18%',
      strategy: 'High-frequency posting with user-generated content',
      performance: '8.5% engagement rate, 22% monthly growth',
      application: 'Launch a branded hashtag campaign to generate authentic UGC',
      strengths: ['Viral content creation', 'Young audience engagement', 'Low cost per engagement'],
      weaknesses: ['Limited conversion tracking', 'Inconsistent messaging']
    },
    {
      name: 'Enterprise Player C',
      marketShare: '28%',
      strategy: 'Authority positioning through data-driven content',
      performance: '380% ROI on white paper campaigns',
      application: 'Create a simplified research report highlighting key industry trends',
      strengths: ['Thought leadership', 'High-value clients', 'Long-term contracts'],
      weaknesses: ['Slow to adapt to trends', 'Limited social media presence']
    }
  ];

  const marketGaps = [
    'Most competitors focus on features, not outcomes',
    'Limited use of storytelling in copy',
    'Weak emotional connection in messaging',
    'Opportunity to dominate mobile-first experience',
    'Gap in personalized customer journey mapping'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitive Intelligence</CardTitle>
        <CardDescription>
          Analysis of top competitors and market opportunities for your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Competitor Analysis */}
          <div className="space-y-4">
            <h4 className="font-semibold">Top Competitors Analysis</h4>
            {competitors.map((competitor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h5 className="font-medium">{competitor.name}</h5>
                    <Badge variant="outline">{competitor.marketShare} Market Share</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Key Strategy</label>
                    <p className="text-sm mt-1">{competitor.strategy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Performance Metrics</label>
                    <p className="text-sm mt-1 text-green-600 font-medium">{competitor.performance}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-muted-foreground">Application for Your Business</label>
                  <p className="text-sm mt-1 bg-blue-50 p-2 rounded border border-blue-200">{competitor.application}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-green-600">Strengths</label>
                    <ul className="text-sm mt-1 space-y-1">
                      {competitor.strengths.map((strength, strengthIndex) => (
                        <li key={strengthIndex} className="flex items-center space-x-2">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-red-600">Weaknesses</label>
                    <ul className="text-sm mt-1 space-y-1">
                      {competitor.weaknesses.map((weakness, weaknessIndex) => (
                        <li key={weaknessIndex} className="flex items-center space-x-2">
                          <div className="h-3 w-3 bg-red-500 rounded-full" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Market Gaps & Opportunities */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50">
            <h4 className="font-semibold mb-3 flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Market Opportunities</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Identified Gaps</label>
                <ul className="text-sm mt-2 space-y-1">
                  {marketGaps.map((gap, gapIndex) => (
                    <li key={gapIndex} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Recommended Actions</label>
                <ul className="text-sm mt-2 space-y-1">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Focus on outcome-based messaging over feature lists</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Develop emotional storytelling framework</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Create mobile-optimized customer journey</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Implement advanced personalization tactics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorInsights;
