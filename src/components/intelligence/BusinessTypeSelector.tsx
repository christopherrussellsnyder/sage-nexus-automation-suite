
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Users, Phone, PenTool } from 'lucide-react';

interface BusinessTypeSelectorProps {
  onSelect: (type: 'ecommerce' | 'agency' | 'sales' | 'copywriting') => void;
}

const BusinessTypeSelector = ({ onSelect }: BusinessTypeSelectorProps) => {
  const businessTypes = [
    {
      type: 'ecommerce' as const,
      title: 'E-commerce Business',
      description: 'Online stores, product sales, marketplace sellers',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      features: ['Product optimization', 'Conversion funnels', 'Cart abandonment', 'Upselling strategies']
    },
    {
      type: 'agency' as const,
      title: 'Marketing Agency',
      description: 'Digital agencies, consultants, service providers',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      features: ['Client acquisition', 'Lead generation', 'Service positioning', 'Retention strategies']
    },
    {
      type: 'sales' as const,
      title: 'Sales Organization',
      description: 'B2B sales, lead generation, pipeline management',
      icon: Phone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      features: ['Prospect research', 'Email sequences', 'Deal tracking', 'Follow-up automation']
    },
    {
      type: 'copywriting' as const,
      title: 'Copywriting Business',
      description: 'Copywriters, content creators, freelance writers',
      icon: PenTool,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      features: ['Copy optimization', 'Client acquisition', 'Portfolio building', 'Rate optimization']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Select Your Business Type</h2>
        <p className="text-muted-foreground">
          Choose the category that best describes your business to get personalized AI intelligence
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {businessTypes.map((business) => (
          <Card key={business.type} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className={`${business.bgColor} group-hover:opacity-90 transition-opacity`}>
              <CardTitle className="flex items-center space-x-3">
                <business.icon className={`h-6 w-6 ${business.color}`} />
                <span>{business.title}</span>
              </CardTitle>
              <CardDescription className="text-sm">
                {business.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <ul className="space-y-2">
                {business.features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 ${business.color.replace('text-', 'bg-')} rounded-full`}></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => onSelect(business.type)}
                className="w-full"
                variant="outline"
              >
                Get {business.title} Intelligence
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessTypeSelector;
