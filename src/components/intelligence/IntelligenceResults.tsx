
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
import BudgetStrategy from './results/BudgetStrategy';
import CopywritingRecommendations from './results/CopywritingRecommendations';
import ContentCalendar from './results/ContentCalendar';
import EnhancedEmailTemplatesGenerator from './copywriting/EnhancedEmailTemplatesGenerator';
import EnhancedSalesScriptsGenerator from './sales/EnhancedSalesScriptsGenerator';
import IndustryInsights from './results/IndustryInsights';
import ActionPlans from './results/ActionPlans';

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
    switch (intelligenceMode) {
      case 'copywriting':
        return 'Copywriting Intelligence Report';
      case 'marketing':
        return 'Marketing Intelligence Report';
      case 'competitor':
        return 'Competitor Intelligence Report';
      default:
        return 'Full Intelligence Report';
    }
  };

  // New business type specific section mapping based on user requirements
  const getBusinessTypeSections = () => {
    switch (businessType) {
      case 'ecommerce':
        return [
          'budgetStrategy',
          'copywritingRecommendations', 
          'platforms',
          'contentCalendar',
          'metrics',
          'competitors'
        ];
      case 'agency':
        return [
          'budgetStrategy',
          'copywritingRecommendations',
          'platforms', 
          'contentCalendar',
          'contentCalendarClient',
          'metrics',
          'competitors'
        ];
      case 'sales':
        return [
          'budgetStrategy',
          'copywritingRecommendations',
          'contentCalendar',
          'metrics',
          'salesScripts'
        ];
      case 'copywriting':
        return [
          'copywritingRecommendations',
          'contentCalendar', 
          'metrics',
          'emailTemplates'
        ];
      default:
        return [];
    }
  };

  const shouldShowSection = (section: string) => {
    const allowedSections = getBusinessTypeSections();
    return allowedSections.includes(section);
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
              Generated for {businessType?.charAt(0).toUpperCase() + businessType?.slice(1)} business
              {intelligenceData.generatedAt && (
                <span className="ml-2">
                  on {new Date(intelligenceData.generatedAt).toLocaleDateString()}
                </span>
              )}
            </p>
            <Badge variant="outline" className="mt-1">
              Mode: {intelligenceMode.charAt(0).toUpperCase() + intelligenceMode.slice(1)}
            </Badge>
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

      {/* Results Content - Restructured by Business Type */}
      <div className="space-y-6">
        {/* Budget Strategy */}
        {shouldShowSection('budgetStrategy') && (
          <BudgetStrategy data={intelligenceData} businessType={businessType} />
        )}

        {/* AI Copywriting Recommendations */}
        {shouldShowSection('copywritingRecommendations') && (
          <CopywritingRecommendations data={intelligenceData} businessType={businessType} />
        )}

        {/* Platform Recommendations */}
        {shouldShowSection('platforms') && (
          <PlatformRecommendations data={intelligenceData} businessType={businessType} />
        )}

        {/* AI Generated 30 Day Optimized Content Calendar (User) */}
        {shouldShowSection('contentCalendar') && (
          <ContentCalendar 
            data={intelligenceData} 
            businessType={businessType}
            variant="user"
            title="30-Day Content Calendar (Your Business)"
          />
        )}

        {/* AI Generated 30 Day Optimized Content Calendar (Client) - Agency Only */}
        {shouldShowSection('contentCalendarClient') && businessType === 'agency' && (
          <ContentCalendar 
            data={intelligenceData} 
            businessType={businessType}
            variant="client"
            title="30-Day Content Calendar (Client Services)"
          />
        )}

        {/* AI Metric Optimization Targets */}
        {shouldShowSection('metrics') && (
          <MetricOptimization data={intelligenceData} businessType={businessType} />
        )}

        {/* Competitive Intelligence */}
        {shouldShowSection('competitors') && (
          <CompetitorInsights data={intelligenceData} businessType={businessType} />
        )}

        {/* Email Templates for Copywriting */}
        {shouldShowSection('emailTemplates') && businessType === 'copywriting' && (
          <EnhancedEmailTemplatesGenerator 
            data={intelligenceData.formData} 
            clientInfo={intelligenceData.formData?.clientDetails}
          />
        )}

        {/* Sales Scripts for Sales */}
        {shouldShowSection('salesScripts') && businessType === 'sales' && (
          <EnhancedSalesScriptsGenerator 
            data={intelligenceData.formData} 
            idealCustomer={intelligenceData.formData?.idealCustomerProfile}
          />
        )}
      </div>
    </div>
  );
};

export default IntelligenceResults;
