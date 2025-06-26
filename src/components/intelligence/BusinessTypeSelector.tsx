
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, 
  Target, 
  TrendingUp,
  PenTool
} from 'lucide-react';

interface BusinessTypeSelectorProps {
  onSelect: (type: 'ecommerce' | 'agency' | 'sales' | 'copywriting') => void;
}

const BusinessTypeSelector = ({ onSelect }: BusinessTypeSelectorProps) => {
  const businessTypes = [
    {
      type: 'ecommerce' as const,
      title: 'E-commerce Business',
      description: 'Product research, competitor analysis, and marketing optimization for online stores',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      features: ['Product Research', 'Competitor Analysis', 'Conversion Optimization', 'Marketing Campaigns']
    },
    {
      type: 'agency' as const,
      title: 'Marketing Agency',
      description: 'Client management, lead generation, and campaign optimization for agencies',
      icon: Target,
      color: 'bg-green-500',
      features: ['Client Analytics', 'Lead Scoring', 'Campaign Performance', 'ROI Tracking']
    },
    {
      type: 'sales' as const,
      title: 'Sales Professional',
      description: 'Prospect research, deal tracking, and conversion optimization for sales teams',
      icon: TrendingUp,
      color: 'bg-purple-500',
      features: ['Prospect Analysis', 'Deal Pipeline', 'Email Sequences', 'Conversion Metrics']
    },
    {
      type: 'copywriting' as const,
      title: 'Copywriting Professional',
      description: 'AI-powered copy generation, optimization, and performance analysis for all content types',
      icon: PenTool,
      color: 'bg-orange-500',
      features: ['Copy Generation', 'A/B Testing', 'Performance Analysis', 'Content Optimization']
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Choose Your Business Type</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <CardTitle className="text-lg">{business.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm">{business.description}</CardDescription>
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
