
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  BarChart3,
  Zap,
  Lightbulb,
  TrendingUp,
  MessageSquare,
  Globe,
  Megaphone,
  Mail,
  Share2,
  ShoppingCart
} from 'lucide-react';
import UnifiedIntelligenceWizard from './intelligence/UnifiedIntelligenceWizard';
import IntelligenceResults from './intelligence/IntelligenceResults';

const IntelligenceDashboard = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'wizard' | 'results'>('overview');
  const [intelligenceData, setIntelligenceData] = useState(null);
  const [businessType, setBusinessType] = useState<'ecommerce' | 'agency' | 'sales' | 'copywriting' | null>(null);

  const businessTypes = [
    {
      type: 'ecommerce',
      title: 'E-commerce Intelligence',
      description: 'Product research, competitor analysis, and marketing optimization',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      features: ['Product Research', 'Competitor Analysis', 'Marketing Campaigns', 'Performance Metrics']
    },
    {
      type: 'agency',
      title: 'Agency Intelligence',
      description: 'Client management, lead generation, and campaign optimization',
      icon: Target,
      color: 'bg-green-500',
      features: ['Lead Scoring', 'Client Analytics', 'Campaign Performance', 'ROI Tracking']
    },
    {
      type: 'sales',
      title: 'Sales Intelligence',
      description: 'Prospect research, deal tracking, and conversion optimization',
      icon: TrendingUp,
      color: 'bg-purple-500',
      features: ['Prospect Analysis', 'Deal Pipeline', 'Conversion Metrics', 'Email Sequences']
    },
    {
      type: 'copywriting',
      title: 'Copy Intelligence',
      description: 'Content optimization, performance metrics, and conversion analysis',
      icon: MessageSquare,
      color: 'bg-orange-500',
      features: ['Copy Performance', 'Metric Analysis', 'A/B Testing', 'Conversion Optimization']
    }
  ];

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

  const handleBusinessTypeSelect = (type: any) => {
    setBusinessType(type);
    setActiveSection('wizard');
  };

  const handleIntelligenceGenerated = (data: any) => {
    setIntelligenceData(data);
    setActiveSection('results');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Unified Intelligence Suite</h2>
          <p className="text-muted-foreground">AI-powered insights and optimization across all business functions</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeSection === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveSection('overview')}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Overview</span>
          </Button>
          {businessType && (
            <Button
              variant={activeSection === 'wizard' ? 'default' : 'outline'}
              onClick={() => setActiveSection('wizard')}
              className="flex items-center space-x-2"
            >
              <Target className="h-4 w-4" />
              <span>Intelligence Wizard</span>
            </Button>
          )}
          {intelligenceData && (
            <Button
              variant={activeSection === 'results' ? 'default' : 'outline'}
              onClick={() => setActiveSection('results')}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Results</span>
            </Button>
          )}
        </div>
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Business Type Selection */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Choose Your Business Focus</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {businessTypes.map((business) => (
                <Card key={business.type} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleBusinessTypeSelect(business.type)}>
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

          {/* Intelligence Features */}
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
        </div>
      )}

      {/* Intelligence Wizard */}
      {activeSection === 'wizard' && businessType && (
        <UnifiedIntelligenceWizard 
          businessType={businessType}
          onIntelligenceGenerated={handleIntelligenceGenerated}
        />
      )}

      {/* Results Section */}
      {activeSection === 'results' && intelligenceData && (
        <IntelligenceResults 
          data={intelligenceData}
          businessType={businessType}
          onBack={() => setActiveSection('wizard')}
        />
      )}
    </div>
  );
};

export default IntelligenceDashboard;
