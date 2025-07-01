
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PlatformRecommendationsProps {
  data: any;
}

const PlatformRecommendations = ({ data }: PlatformRecommendationsProps) => {
  const platforms = [
    {
      name: 'Facebook',
      priority: 1,
      score: 92,
      reasoning: 'Best ROI for your target audience with advanced targeting options and proven conversion rates.',
      expectedMetrics: {
        roas: 4.2,
        cpm: '$12.50',
        conversionRate: '3.8%'
      },
      budgetAllocation: 40
    },
    {
      name: 'Instagram',
      priority: 2,
      score: 88,
      reasoning: 'Strong visual platform ideal for engagement with your demographic and product type.',
      expectedMetrics: {
        roas: 3.8,
        cpm: '$15.20',
        conversionRate: '3.2%'
      },
      budgetAllocation: 30
    },
    {
      name: 'Google Ads',
      priority: 3,
      score: 85,
      reasoning: 'High-intent traffic perfect for capturing customers ready to purchase.',
      expectedMetrics: {
        roas: 5.1,
        cpm: '$22.80',
        conversionRate: '4.5%'
      },
      budgetAllocation: 20
    },
    {
      name: 'TikTok',
      priority: 4,
      score: 72,
      reasoning: 'Emerging platform with lower competition and high engagement rates.',
      expectedMetrics: {
        roas: 3.2,
        cpm: '$8.90',
        conversionRate: '2.8%'
      },
      budgetAllocation: 10
    }
  ];

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Recommendations</CardTitle>
        <CardDescription>
          AI-ranked marketing platforms optimized for your business goals and budget
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {platforms.map((platform, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge className={`${getPriorityColor(platform.priority)} text-white`}>
                    #{platform.priority}
                  </Badge>
                  <div>
                    <h4 className="font-semibold">{platform.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">Optimization Score:</span>
                      <span className="text-sm font-medium">{platform.score}/100</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{platform.budgetAllocation}% Budget</Badge>
              </div>
              
              <Progress value={platform.score} className="mb-3" />
              
              <p className="text-sm text-muted-foreground mb-3">{platform.reasoning}</p>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-green-600">{platform.expectedMetrics.roas}x</div>
                  <div className="text-muted-foreground">ROAS</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-blue-600">{platform.expectedMetrics.cpm}</div>
                  <div className="text-muted-foreground">CPM</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-purple-600">{platform.expectedMetrics.conversionRate}</div>
                  <div className="text-muted-foreground">Conv. Rate</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformRecommendations;
