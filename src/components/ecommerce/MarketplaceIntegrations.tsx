
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Store, 
  Zap, 
  Mail, 
  MessageCircle, 
  Truck, 
  CreditCard,
  BarChart3,
  Globe,
  Smartphone,
  CheckCircle,
  ExternalLink,
  Settings,
  Plus
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'payment' | 'shipping' | 'marketing' | 'analytics' | 'social' | 'inventory';
  icon: any;
  connected: boolean;
  popular: boolean;
  price: string;
  features: string[];
}

interface MarketplaceIntegrationsProps {
  onIntegrationToggle: (integrationId: string, enabled: boolean) => void;
  onConfigureIntegration: (integrationId: string) => void;
}

const MarketplaceIntegrations = ({ onIntegrationToggle, onConfigureIntegration }: MarketplaceIntegrationsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const integrations: Integration[] = [
    // Payment Integrations
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Accept payments online with Stripe\'s secure payment processing',
      category: 'payment',
      icon: CreditCard,
      connected: true,
      popular: true,
      price: '2.9% + 30¢',
      features: ['Credit Cards', 'Digital Wallets', 'Bank Transfers', 'Recurring Billing']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Let customers pay with PayPal, Venmo, and other payment methods',
      category: 'payment',
      icon: CreditCard,
      connected: false,
      popular: true,
      price: '2.9% + 30¢',
      features: ['PayPal Checkout', 'Buy Now Pay Later', 'Venmo', 'International Payments']
    },

    // Shipping Integrations
    {
      id: 'ups',
      name: 'UPS',
      description: 'Real-time shipping rates and label printing with UPS',
      category: 'shipping',
      icon: Truck,
      connected: false,
      popular: false,
      price: 'Free',
      features: ['Real-time Rates', 'Label Printing', 'Tracking', 'Insurance']
    },
    {
      id: 'fedex',
      name: 'FedEx',
      description: 'Integrate FedEx shipping services for fast delivery',
      category: 'shipping',
      icon: Truck,
      connected: true,
      popular: false,
      price: 'Free',
      features: ['Express Shipping', 'Ground Shipping', 'International', 'Packaging']
    },

    // Marketing Integrations
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing automation and customer segmentation',
      category: 'marketing',
      icon: Mail,
      connected: true,
      popular: true,
      price: 'Free - $299/mo',
      features: ['Email Campaigns', 'Automation', 'Segmentation', 'Analytics']
    },
    {
      id: 'facebook-ads',
      name: 'Facebook Ads',
      description: 'Create and manage Facebook and Instagram advertising campaigns',
      category: 'marketing',
      icon: MessageCircle,
      connected: false,
      popular: true,
      price: 'Variable',
      features: ['Campaign Management', 'Pixel Tracking', 'Lookalike Audiences', 'Retargeting']
    },

    // Analytics Integrations
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior with Google Analytics',
      category: 'analytics',
      icon: BarChart3,
      connected: true,
      popular: true,
      price: 'Free',
      features: ['Traffic Analysis', 'Conversion Tracking', 'Custom Reports', 'Real-time Data']
    },
    {
      id: 'hotjar',
      name: 'Hotjar',
      description: 'Understand user behavior with heatmaps and session recordings',
      category: 'analytics',
      icon: BarChart3,
      connected: false,
      popular: false,
      price: 'Free - $389/mo',
      features: ['Heatmaps', 'Session Recordings', 'Surveys', 'Feedback Polls']
    },

    // Social Integrations
    {
      id: 'instagram',
      name: 'Instagram Shopping',
      description: 'Sell directly on Instagram with product tags and stories',
      category: 'social',
      icon: Smartphone,
      connected: false,
      popular: true,
      price: 'Free',
      features: ['Product Tags', 'Shopping Stories', 'Shop Tab', 'Checkout on Instagram']
    },
    {
      id: 'tiktok',
      name: 'TikTok for Business',
      description: 'Reach new customers through TikTok\'s advertising platform',
      category: 'social',
      icon: Smartphone,
      connected: false,
      popular: true,
      price: 'Variable',
      features: ['Video Ads', 'Spark Ads', 'Shopping Ads', 'Brand Takeover']
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Globe },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'marketing', name: 'Marketing', icon: Mail },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'social', name: 'Social', icon: Smartphone }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center space-x-2">
            <Store className="h-6 w-6" />
            <span>App Marketplace</span>
          </h3>
          <p className="text-muted-foreground">Extend your store with powerful integrations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Request Integration
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-1 whitespace-nowrap"
            >
              <category.icon className="h-3 w-3" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Connected Integrations Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Connected Integrations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {integrations.filter(i => i.connected).map((integration) => (
              <Badge key={integration.id} variant="default" className="flex items-center space-x-1">
                <integration.icon className="h-3 w-3" />
                <span>{integration.name}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className={`relative ${integration.connected ? 'ring-2 ring-green-500' : ''}`}>
            {integration.popular && (
              <Badge className="absolute top-3 right-3" variant="secondary">
                Popular
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <integration.icon className="h-6 w-6" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span>{integration.name}</span>
                    {integration.connected && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm font-normal text-muted-foreground">{integration.price}</p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{integration.description}</p>
              
              <div className="space-y-2">
                <Label className="text-xs font-medium">Features:</Label>
                <div className="flex flex-wrap gap-1">
                  {integration.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {integration.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{integration.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={integration.connected}
                    onCheckedChange={(checked) => onIntegrationToggle(integration.id, checked)}
                  />
                  <Label className="text-sm">
                    {integration.connected ? 'Connected' : 'Connect'}
                  </Label>
                </div>
                
                <div className="flex space-x-1">
                  {integration.connected && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onConfigureIntegration(integration.id)}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No integrations found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarketplaceIntegrations;
