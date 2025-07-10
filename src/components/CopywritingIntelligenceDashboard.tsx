
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PenTool, 
  Brain, 
  Target, 
  BarChart3,
  Zap,
  MessageSquare,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import UnifiedIntelligenceWizard from './intelligence/UnifiedIntelligenceWizard';
import IntelligenceResults from './intelligence/IntelligenceResults';
import BusinessTypeSelector from './intelligence/BusinessTypeSelector';

const CopywritingIntelligenceDashboard = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'wizard' | 'results'>('overview');
  const [intelligenceData, setIntelligenceData] = useState(null);
  const [businessType, setBusinessType] = useState<'ecommerce' | 'agency' | 'sales' | null>(null);

  const handleBusinessTypeSelect = (type: any) => {
    setBusinessType(type);
    setActiveSection('wizard');
  };

  const handleIntelligenceGenerated = (data: any) => {
    setIntelligenceData(data);
    setActiveSection('results');
  };

  const resetToOverview = () => {
    setActiveSection('overview');
    setBusinessType(null);
    setIntelligenceData(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI Copywriting Intelligence</h2>
          <p className="text-muted-foreground">AI-powered copywriting strategies and optimization</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeSection === 'overview' ? 'default' : 'outline'}
            onClick={resetToOverview}
            className="flex items-center space-x-2"
          >
            <PenTool className="h-4 w-4" />
            <span>Overview</span>
          </Button>
          {businessType && (
            <Button
              variant={activeSection === 'wizard' ? 'default' : 'outline'}
              onClick={() => setActiveSection('wizard')}
              className="flex items-center space-x-2"
            >
              <Brain className="h-4 w-4" />
              <span>Copywriting Wizard</span>
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

      {/* Content Sections */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <BusinessTypeSelector onSelect={handleBusinessTypeSelect} />
          
          {/* Copywriting Intelligence Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  <span>AI Copy Generation</span>
                </CardTitle>
                <CardDescription>
                  Generate high-converting copy for all marketing channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span>Headlines & hooks that convert</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span>Email sequences & automation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span>Ad copy for all platforms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span>Website copy architecture</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <span>Psychology Analysis</span>
                </CardTitle>
                <CardDescription>
                  AI-powered psychological trigger analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Lightbulb className="h-3 w-3 text-orange-500" />
                    <span>Emotional trigger mapping</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Lightbulb className="h-3 w-3 text-orange-500" />
                    <span>Audience psychology insights</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Lightbulb className="h-3 w-3 text-orange-500" />
                    <span>Persuasion framework selection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Lightbulb className="h-3 w-3 text-orange-500" />
                    <span>Conversion optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <span>Performance Optimization</span>
                </CardTitle>
                <CardDescription>
                  AI-driven copy testing and optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="h-3 w-3 text-blue-500" />
                    <span>A/B testing strategies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="h-3 w-3 text-blue-500" />
                    <span>Copy performance metrics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="h-3 w-3 text-blue-500" />
                    <span>Competitor copy analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="h-3 w-3 text-blue-500" />
                    <span>ROI improvement tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How AI Copywriting Intelligence Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold">Business Analysis</h3>
                  <p className="text-sm text-muted-foreground">AI analyzes your business, audience, and objectives</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="font-semibold">Copy Strategy</h3>
                  <p className="text-sm text-muted-foreground">Generate custom copywriting frameworks and strategies</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="font-semibold">Content Creation</h3>
                  <p className="text-sm text-muted-foreground">AI creates platform-specific copy variations</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl font-bold text-orange-600">4</span>
                  </div>
                  <h3 className="font-semibold">Optimization</h3>
                  <p className="text-sm text-muted-foreground">Continuous improvement recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeSection === 'wizard' && businessType && (
        <UnifiedIntelligenceWizard 
          businessType={businessType}
          onIntelligenceGenerated={handleIntelligenceGenerated}
          intelligenceMode="copywriting"
        />
      )}

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

export default CopywritingIntelligenceDashboard;
