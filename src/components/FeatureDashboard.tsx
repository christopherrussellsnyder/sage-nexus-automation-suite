
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Building2, 
  ShoppingCart, 
  TrendingUp,
  Users,
  Target,
  Mail,
  BarChart3,
  Zap,
  Globe,
  Calendar,
  Search,
  UserCheck
} from 'lucide-react';
import IntelligenceDashboard from './IntelligenceDashboard';
import AgencyDashboard from './AgencyDashboard';
import SalesDashboard from './SalesDashboard';

const FeatureDashboard = () => {
  const [activeFeature, setActiveFeature] = useState<'intelligence' | 'agency' | 'sales'>('intelligence');

  const features = [
    {
      id: 'intelligence' as const,
      name: 'Unified Intelligence',
      description: 'AI-powered business intelligence and optimization',
      icon: Brain,
      color: 'bg-purple-500',
      stats: { campaigns: '150+', insights: '50K+', optimization: '300%' },
      capabilities: [
        'Full Intelligence Reports',
        'Marketing Strategy Optimization', 
        'Copywriting Analysis',
        'Competitor Intelligence',
        '30-Day Content Calendar',
        'Platform Recommendations'
      ]
    },
    {
      id: 'agency' as const,
      name: 'Agency Suite',
      description: 'Complete agency management and client intelligence',
      icon: Building2,
      color: 'bg-blue-500',
      stats: { clients: '24', revenue: '$127K', retention: '94%' },
      capabilities: [
        'Client Project Management',
        'Lead Scoring & Management',
        'Client Nurture Sequences',
        'Meeting Scheduling',
        'Client Research Engine',
        'Performance Analytics'
      ]
    },
    {
      id: 'sales' as const,
      name: 'Sales Operations',
      description: 'Intelligent prospect research and sales automation',
      icon: TrendingUp,
      color: 'bg-green-500',
      stats: { prospects: '0', deals: '$0', meetings: '0' },
      capabilities: [
        'Deal Tracking & Management',
        'Prospect Research Engine',
        'Email Sequence Builder',
        'Meeting Scheduler',
        'Lead Management',
        'Sales Analytics'
      ]
    }
  ];

  const currentFeature = features.find(f => f.id === activeFeature);

  return (
    <div className="space-y-6">
      {/* Feature Selection Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Business Intelligence Platform</h1>
          <p className="text-xl text-muted-foreground">AI-powered insights and automation for modern businesses</p>
        </div>
        <div className="flex space-x-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Button
                key={feature.id}
                variant={activeFeature === feature.id ? 'default' : 'outline'}
                onClick={() => setActiveFeature(feature.id)}
                className="flex items-center space-x-2"
                size="lg"
              >
                <Icon className="h-5 w-5" />
                <span>{feature.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isActive = activeFeature === feature.id;
          
          return (
            <Card 
              key={feature.id} 
              className={`cursor-pointer transition-all duration-200 ${
                isActive ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:shadow-md'
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  {isActive && <Badge variant="default">Active</Badge>}
                </div>
                <CardTitle className="text-xl">{feature.name}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {Object.entries(feature.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-lg font-bold">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                {/* Capabilities */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Key Capabilities:</h4>
                  <div className="space-y-1">
                    {feature.capabilities.slice(0, 3).map((capability, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span>{capability}</span>
                      </div>
                    ))}
                    {feature.capabilities.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{feature.capabilities.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Feature Highlight */}
      {currentFeature && (
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-xl ${currentFeature.color} flex items-center justify-center`}>
                <currentFeature.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{currentFeature.name}</CardTitle>
                <CardDescription className="text-lg">{currentFeature.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">All Capabilities:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {currentFeature.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-background/50">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Performance Metrics:</h4>
                <div className="space-y-3">
                  {Object.entries(currentFeature.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                      <span className="capitalize font-medium">{key}:</span>
                      <span className="text-lg font-bold text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature Content */}
      <div className="min-h-screen">
        {activeFeature === 'intelligence' && <IntelligenceDashboard />}
        {activeFeature === 'agency' && <AgencyDashboard />}
        {activeFeature === 'sales' && <SalesDashboard />}
      </div>
    </div>
  );
};

export default FeatureDashboard;
