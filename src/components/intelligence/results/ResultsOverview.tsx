
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, DollarSign, Users } from 'lucide-react';

interface ResultsOverviewProps {
  data: any;
  businessType: string | null;
}

const ResultsOverview = ({ data, businessType }: ResultsOverviewProps) => {
  const mockMetrics = {
    expectedROAS: 4.2,
    projectedRevenue: '$125,000',
    targetAudience: '25,000+ people',
    campaignDuration: '90 days'
  };

  const overviewCards = [
    {
      title: 'Expected ROAS',
      value: mockMetrics.expectedROAS + 'x',
      description: 'Return on ad spend',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Projected Revenue',
      value: mockMetrics.projectedRevenue,
      description: 'Next 90 days',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: 'Target Reach',
      value: mockMetrics.targetAudience,
      description: 'Potential customers',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Campaign Focus',
      value: businessType?.charAt(0).toUpperCase() + businessType?.slice(1) || 'Business',
      description: 'Industry optimization',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Intelligence Overview</CardTitle>
        <CardDescription>
          Key insights and projections based on your business data and competitive analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <card.icon className={`h-8 w-8 ${card.color}`} />
                <div>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.title}</div>
                  <div className="text-xs text-muted-foreground">{card.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Key Recommendations</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Focus on Facebook and Instagram for maximum reach and engagement</li>
            <li>• Implement retargeting campaigns to improve conversion rates by 35%</li>
            <li>• Use emotion-driven copy to increase click-through rates</li>
            <li>• A/B test landing pages to optimize for your target metrics</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsOverview;
