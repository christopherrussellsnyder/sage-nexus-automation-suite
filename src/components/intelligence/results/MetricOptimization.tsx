
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, Target } from 'lucide-react';

interface MetricOptimizationProps {
  data: any;
}

const MetricOptimization = ({ data }: MetricOptimizationProps) => {
  const metrics = [
    {
      metric: 'Conversion Rate',
      current: 2.1,
      target: 3.8,
      improvement: '81%',
      status: 'needs-attention',
      strategies: [
        'Optimize landing page load speed and mobile experience',
        'A/B test headlines and call-to-action buttons',
        'Implement social proof and testimonials',
        'Reduce form fields and simplify checkout process'
      ]
    },
    {
      metric: 'Cost Per Click',
      current: 2.85,
      target: 1.95,
      improvement: '32%',
      status: 'good',
      strategies: [
        'Improve ad relevance and quality scores',
        'Target more specific, long-tail keywords',
        'Optimize ad scheduling for peak performance hours',
        'Refine audience targeting to reduce competition'
      ]
    },
    {
      metric: 'Return on Ad Spend',
      current: 3.2,
      target: 5.0,
      improvement: '56%',
      status: 'warning',
      strategies: [
        'Focus budget on highest-performing campaigns',
        'Implement dynamic product ads for better targeting',
        'Optimize for lifetime value, not just initial purchase',
        'Use retargeting campaigns to re-engage warm audiences'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'needs-attention': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <TrendingUp className="h-4 w-4" />;
      case 'warning': return <Target className="h-4 w-4" />;
      case 'needs-attention': return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metric Optimization Guide</CardTitle>
        <CardDescription>
          Specific recommendations to improve underperforming metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold">{metric.metric}</h4>
                  <Badge className={getStatusColor(metric.status)}>
                    {getStatusIcon(metric.status)}
                    <span className="ml-1 capitalize">{metric.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Improvement Potential</div>
                  <div className="text-lg font-semibold text-green-600">+{metric.improvement}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-lg font-semibold">{metric.current}{metric.metric === 'Cost Per Click' ? '$' : metric.metric === 'Return on Ad Spend' ? 'x' : '%'}</div>
                  <div className="text-sm text-muted-foreground">Current</div>
                </div>
                <div className="flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                  <div className="text-lg font-semibold text-green-600">{metric.target}{metric.metric === 'Cost Per Click' ? '$' : metric.metric === 'Return on Ad Spend' ? 'x' : '%'}</div>
                  <div className="text-sm text-green-600">Target</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to Target</span>
                  <span>{Math.round((metric.current / metric.target) * 100)}%</span>
                </div>
                <Progress value={(metric.current / metric.target) * 100} className="h-2" />
              </div>

              <div>
                <h5 className="font-medium mb-2">Optimization Strategies:</h5>
                <ul className="space-y-1">
                  {metric.strategies.map((strategy, strategyIndex) => (
                    <li key={strategyIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricOptimization;
