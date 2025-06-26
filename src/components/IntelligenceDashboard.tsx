
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
import IntelligenceOverview from './intelligence/IntelligenceOverview';
import BusinessTypeSelector from './intelligence/BusinessTypeSelector';

const IntelligenceDashboard = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'wizard' | 'results'>('overview');
  const [intelligenceData, setIntelligenceData] = useState(null);
  const [businessType, setBusinessType] = useState<'ecommerce' | 'agency' | 'sales' | 'copywriting' | null>(null);
  const [intelligenceMode, setIntelligenceMode] = useState<'full' | 'copywriting' | 'marketing' | 'competitor'>('full');

  const handleBusinessTypeSelect = (type: any) => {
    setBusinessType(type);
    // If copywriting business type is selected, force copywriting mode
    if (type === 'copywriting') {
      setIntelligenceMode('copywriting');
    } else {
      setIntelligenceMode('full');
    }
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
    setIntelligenceMode('full');
  };

  // Get available intelligence modes based on business type
  const getAvailableIntelligenceModes = () => {
    if (businessType === 'copywriting') {
      return [
        { value: 'copywriting', label: 'Copywriting Intelligence' }
      ];
    }
    return [
      { value: 'full', label: 'Full Intelligence' },
      { value: 'copywriting', label: 'Copywriting Only' },
      { value: 'marketing', label: 'Marketing Only' },
      { value: 'competitor', label: 'Competitor Analysis' }
    ];
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
            onClick={resetToOverview}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Overview</span>
          </Button>
          {businessType && (
            <>
              <Button
                variant={activeSection === 'wizard' ? 'default' : 'outline'}
                onClick={() => setActiveSection('wizard')}
                className="flex items-center space-x-2"
              >
                <Target className="h-4 w-4" />
                <span>Intelligence Wizard</span>
              </Button>
              
              {/* Intelligence Mode Selector - only show if not copywriting business type */}
              {businessType !== 'copywriting' && (
                <select
                  value={intelligenceMode}
                  onChange={(e) => setIntelligenceMode(e.target.value as any)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  {getAvailableIntelligenceModes().map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              )}
              
              {/* Show current mode for copywriting business type */}
              {businessType === 'copywriting' && (
                <Badge variant="default" className="px-3 py-1">
                  Copywriting Intelligence
                </Badge>
              )}
            </>
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
          <IntelligenceOverview />
        </div>
      )}

      {activeSection === 'wizard' && businessType && (
        <UnifiedIntelligenceWizard 
          businessType={businessType}
          onIntelligenceGenerated={handleIntelligenceGenerated}
          intelligenceMode={intelligenceMode}
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

export default IntelligenceDashboard;
