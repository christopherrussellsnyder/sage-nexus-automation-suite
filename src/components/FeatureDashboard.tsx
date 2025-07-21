import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  ShoppingCart, 
  Users, 
  PenTool, 
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Settings,
  HelpCircle
} from 'lucide-react';
import EcommerceDashboard from './EcommerceDashboard';
import SalesDashboard from './SalesDashboard';
import CopywritingIntelligenceDashboard from './CopywritingIntelligenceDashboard';
import IntelligenceDashboard from './IntelligenceDashboard';

const FeatureDashboard = () => {
  const [activeFeature, setActiveFeature] = useState<'intelligence' | 'ecommerce' | 'agency' | 'sales' | 'copywriting'>('intelligence');

  const features = [
    {
      id: 'intelligence',
      title: 'Unified Intelligence',
      description: 'AI-powered insights across all business functions',
      icon: Brain,
      color: 'bg-gradient-to-br from-purple-500 to-blue-600',
      badge: 'NEW',
      stats: { users: '2.1K', growth: '+15%' }
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Suite',
      description: 'Product research and marketing optimization',
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      badge: 'PRO',
      stats: { users: '1.8K', growth: '+23%' }
    },
    {
      id: 'sales',
      title: 'Sales Operations',
      description: 'CRM, pipeline management, and automation',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      badge: 'HOT',
      stats: { users: '1.2K', growth: '+31%' }
    },
    {
      id: 'copywriting',
      title: 'AI Copywriting Intelligence',
      description: 'AI-powered copywriting strategies and optimization',
      icon: PenTool,
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      badge: 'POPULAR',
      stats: { users: '3.4K', growth: '+18%' }
    }
  ];

  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const user = getCurrentUser();

  const renderFeatureDashboard = () => {
    switch (activeFeature) {
      case 'intelligence':
        return <IntelligenceDashboard />;
      case 'ecommerce':
        return <EcommerceDashboard />;
      case 'sales':
        return <SalesDashboard />;
      case 'copywriting':
        return <CopywritingIntelligenceDashboard />;
      default:
        return <IntelligenceDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">
            Welcome back{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Your AI-powered business intelligence platform
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="button-glow">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="button-glow">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
        </div>
      </div>

      {/* Feature Selection */}
      <div className="grid lg:grid-cols-4 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isActive = activeFeature === feature.id;
          
          return (
            <Card 
              key={feature.id}
              className={`card-hover cursor-pointer border-2 ${
                isActive 
                  ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                  : 'border-transparent hover:border-border'
              }`}
              onClick={() => setActiveFeature(feature.id as any)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${feature.color} text-white shadow-lg breathing`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {feature.badge && (
                    <Badge 
                      variant={feature.badge === 'NEW' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span className="counter">{feature.stats.users}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BarChart3 className="h-3 w-3" />
                        <span className="counter">{feature.stats.growth}</span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-600">Active</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Feature Dashboard */}
      <div className="min-h-[600px]">
        {renderFeatureDashboard()}
      </div>
    </div>
  );
};

export default FeatureDashboard;
