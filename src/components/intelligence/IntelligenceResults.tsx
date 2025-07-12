
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
import { downloadJSON } from '@/utils/downloadUtils';
import ResultsOverview from './results/ResultsOverview';
import PlatformRecommendations from './results/PlatformRecommendations';
import MonthlyPlan from './results/MonthlyPlan';
import MetricOptimization from './results/MetricOptimization';
import CompetitorInsights from './results/CompetitorInsights';

interface IntelligenceResultsProps {
  data: any;
  businessType: string | null;
  onBack: () => void;
}

const IntelligenceResults = ({ data, businessType, onBack }: IntelligenceResultsProps) => {
  // Extract the actual API insights data
  const intelligenceData = data.insights || data;
  const intelligenceMode = intelligenceData.intelligenceMode || data.intelligenceMode || 'full';

  const handleExport = () => {
    const exportData = {
      ...data,
      exportedAt: new Date().toISOString()
    };
    
    const filename = `intelligence-report-${intelligenceMode}-${new Date().toISOString().split('T')[0]}.json`;
    downloadJSON(exportData, filename);
  };

  const handleRegenerate = () => {
    // This would trigger regeneration - for now just refresh
    window.location.reload();
  };

  const getModeTitle = () => {
    if (businessType === 'copywriting') {
      return 'Copywriting Intelligence Report';
    }
    
    switch (intelligenceMode) {
      case 'copywriting':
        return 'Copy Intelligence Report';
      case 'marketing':
        return 'Marketing Intelligence Report';
      case 'competitor':
        return 'Competitor Intelligence Report';
      default:
        return 'Full Intelligence Report';
    }
  };

  const shouldShowSection = (section: string) => {
    if (intelligenceMode === 'full') return true;
    
    // Business type specific logic
    if (businessType === 'copywriting') {
      const copywritingSections = {
        overview: true,
        platforms: false, // Copywriters don't need platform recommendations
        monthlyPlan: true, // But adjusted for copywriting content
        metrics: true, // Adjusted for copywriting goals
        competitors: true, // Adjusted for copy analysis
        copywriting: true
      };
      return copywritingSections[section] || false;
    }

    if (businessType === 'agency') {
      const agencySections = {
        overview: true,
        platforms: true,
        monthlyPlan: true, // Will show dual calendar for agency
        metrics: true,
        competitors: true,
        copywriting: true
      };
      return agencySections[section] || false;
    }

    if (businessType === 'sales') {
      const salesSections = {
        overview: true,
        platforms: false, // Sales reps don't need ad platforms
        monthlyPlan: true, // Adjusted for sales activities
        metrics: true, // Adjusted for sales metrics
        competitors: true, // Market intelligence
        copywriting: false
      };
      return salesSections[section] || false;
    }
    
    const sectionMapping = {
      overview: ['full', 'copywriting', 'marketing', 'competitor'],
      platforms: ['full', 'marketing'],
      monthlyPlan: ['full', 'marketing'],
      metrics: ['full', 'marketing'],
      competitors: ['full', 'competitor'],
      copywriting: ['full', 'copywriting']
    };
    
    return sectionMapping[section]?.includes(intelligenceMode) || false;
  };

  const getBusinessTypeDescription = () => {
    switch (businessType) {
      case 'copywriting':
        return 'Specialized copywriting intelligence focused on high-converting copy and client results';
      case 'agency':
        return 'Marketing agency intelligence with dual-focus: client campaigns and agency growth';
      case 'sales':
        return 'Sales intelligence optimized for closing deals and lead conversion';
      case 'ecommerce':
        return 'E-commerce intelligence for product marketing and conversion optimization';
      default:
        return `Generated for ${businessType?.charAt(0).toUpperCase() + businessType?.slice(1)} business`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Setup
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{getModeTitle()}</h2>
            <p className="text-muted-foreground">
              {getBusinessTypeDescription()}
              {intelligenceData.generatedAt && (
                <span className="ml-2">
                  • Generated on {new Date(intelligenceData.generatedAt).toLocaleDateString()}
                </span>
              )}
            </p>
            <div className="flex space-x-2 mt-1">
              <Badge variant="outline">
                {businessType?.charAt(0).toUpperCase() + businessType?.slice(1)} Business
              </Badge>
              <Badge variant="outline">
                Mode: {intelligenceMode.charAt(0).toUpperCase() + intelligenceMode.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleRegenerate} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          <Button onClick={handleExport} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Results Content */}
      <div className="space-y-6">
        {shouldShowSection('overview') && (
          <ResultsOverview 
            data={intelligenceData} 
            businessType={businessType} 
          />
        )}
        
        {shouldShowSection('platforms') && (
          <PlatformRecommendations data={intelligenceData} />
        )}
        
        {shouldShowSection('monthlyPlan') && (
          <MonthlyPlan 
            data={intelligenceData} 
            businessType={businessType}
          />
        )}
        
        {shouldShowSection('metrics') && (
          <MetricOptimization 
            data={intelligenceData}
            businessType={businessType}
          />
        )}
        
        {shouldShowSection('competitors') && (
          <CompetitorInsights 
            data={intelligenceData}
            businessType={businessType}
          />
        )}

        {/* Business Type Specific Messages */}
        {businessType === 'copywriting' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Copywriting Intelligence Focus</h3>
                <p className="text-sm text-muted-foreground">
                  This report focuses on copywriting strategies, client conversion optimization, and industry-specific copy analysis. 
                  Content calendar is optimized for copywriting client work rather than advertising campaigns.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {businessType === 'agency' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Marketing Agency Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  This report includes dual-purpose content: strategies for your client campaigns AND agency growth tactics. 
                  Monthly plan includes both client work and agency marketing activities.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {businessType === 'sales' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Sales Intelligence Focus</h3>
                <p className="text-sm text-muted-foreground">
                  This report is optimized for closing deals and converting leads. Focus on sales metrics, 
                  competitive positioning, and activities that drive revenue rather than advertising campaigns.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default IntelligenceResults;
