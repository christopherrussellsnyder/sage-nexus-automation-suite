
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, 
  Target, 
  TrendingUp, 
  MessageSquare
} from 'lucide-react';

interface BusinessTypeSelectorProps {
  onSelect: (type: 'ecommerce' | 'agency' | 'sales' | 'copywriting') => void;
}

const BusinessTypeSelector = ({ onSelect }: BusinessTypeSelectorProps) => {
  const businessTypes = [
    {
      type: 'ecommerce' as const,
      title: 'E-commerce Intelligence',
      description: 'Product research, competitor analysis, and marketing optimization',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      features: ['Product Research', 'Competitor Analysis', 'Marketing Campaigns', 'Performance Metrics']
    },
    {
      type: 'agency' as const,
      title: 'Agency Intelligence',
      description: 'Client management, lead generation, and campaign optimization',
      icon: Target,
      color: 'bg-green-500',
      features: ['Lead Scoring', 'Client Analytics', 'Campaign Performance', 'ROI Tracking']
    },
    {
      type: 'sales' as const,
      title: 'Sales Intelligence',
      description: 'Prospect research, deal tracking, and conversion optimization',
      icon: TrendingUp,
      color: 'bg-purple-500',
      features: ['Prospect Analysis', 'Deal Pipeline', 'Conversion Metrics', 'Email Sequences']
    },
    {
      type: 'copywriting' as const,
      title: 'Copy Intelligence',
      description: 'Content optimization, performance metrics, and conversion analysis',
      icon: MessageSquare,
      color: 'bg-orange-500',
      features: ['Copy Performance', 'Metric Analysis', 'A/B Testing', 'Conversion Optimization']
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Choose Your Business Focus</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {businessTypes.map((business) => (
          <Card 
            key={business.type} 
            className="cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => onSelect(business.type)}
          >
            <CardHeader>
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${business.color} text-white`}>
                  <business.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{business.title}</CardTitle>
                  <CardDescription className="mt-2">{business.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {business.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{feature}</span>
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

export default BusinessTypeSelector;
