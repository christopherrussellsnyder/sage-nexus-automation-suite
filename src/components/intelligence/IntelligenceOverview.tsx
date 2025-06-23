
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  BarChart3,
  Lightbulb,
  Zap
} from 'lucide-react';

const IntelligenceOverview = () => {
  const intelligenceFeatures = [
    {
      title: 'Unified Analytics Engine',
      description: 'Advanced AI that analyzes performance across all marketing channels and copy types',
      icon: Brain,
      features: ['Cross-platform analysis', 'Performance prediction', 'Optimization recommendations']
    },
    {
      title: 'Real-time Metric Monitoring',
      description: 'Track conversion rates, engagement, CTR, and ROI with actionable insights',
      icon: BarChart3,
      features: ['Live dashboard', 'Alert system', 'Benchmark comparisons']
    },
    {
      title: 'Competitive Intelligence',
      description: 'Analyze competitor strategies and identify market opportunities',
      icon: Lightbulb,
      features: ['Competitor tracking', 'Market gaps', 'Trend analysis']
    },
    {
      title: 'Optimization Recommendations',
      description: 'Get specific, actionable advice to improve underperforming metrics',
      icon: Zap,
      features: ['Performance gaps', 'Improvement strategies', 'Best practices']
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Unified Intelligence Features</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {intelligenceFeatures.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start space-x-3">
                <feature.icon className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="mt-1">{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntelligenceOverview;
