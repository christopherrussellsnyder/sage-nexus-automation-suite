
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
import EmailTemplatesGenerator from './copywriting/EmailTemplatesGenerator';
import SalesScriptsGenerator from './sales/SalesScriptsGenerator';
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

  const shouldShowSection = (section: string) => {
    if (intelligenceMode === 'full') return true;
    
    const sectionMapping = {
      overview: ['full', 'copywriting', 'marketing', 'competitor'],
      budgetStrategy: ['full', 'marketing', 'ecommerce', 'agency', 'sales'],
      copywritingRecommendations: ['full', 'copywriting', 'marketing', 'ecommerce', 'agency', 'sales'],
      contentCalendar: ['full', 'marketing', 'ecommerce', 'agency', 'sales', 'copywriting'],
      platforms: ['full', 'marketing', 'ecommerce', 'agency'],
      monthlyPlan: ['full', 'marketing'],
      metrics: ['full', 'marketing', 'ecommerce', 'agency', 'sales', 'copywriting'],
      competitors: ['full', 'competitor', 'ecommerce', 'agency'],
      copywriting: ['full', 'copywriting'],
      emailTemplates: ['copywriting'],
      salesScripts: ['sales']
    };
    
    return sectionMapping[section]?.includes(intelligenceMode) || 
           sectionMapping[section]?.includes(businessType) || false;
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

      {/* Results Content */}
      <div className="space-y-6">
        {shouldShowSection('overview') && (
          <ResultsOverview data={intelligenceData} businessType={businessType} />
        )}

        {/* Budget Strategy - Show for all business types except copywriting */}
        {shouldShowSection('budgetStrategy') && businessType !== 'copywriting' && (
          <BudgetStrategy data={intelligenceData} businessType={businessType} />
        )}

        {/* AI Copywriting Recommendations - Show for all business types */}
        {shouldShowSection('copywritingRecommendations') && (
          <CopywritingRecommendations data={intelligenceData} businessType={businessType} />
        )}

        {/* Platform Recommendations - Show for ecommerce and agency */}
        {shouldShowSection('platforms') && (
          <PlatformRecommendations data={intelligenceData} />
        )}

        {/* AI Generated 30 Day Optimized Content Calendar */}
        {shouldShowSection('contentCalendar') && (
          <ContentCalendar data={intelligenceData} businessType={businessType} />
        )}

        {/* AI Metric Optimization Targets */}
        {shouldShowSection('metrics') && (
          <MetricOptimization data={intelligenceData} />
        )}

        {/* Competitive Intelligence */}
        {shouldShowSection('competitors') && (
          <CompetitorInsights data={intelligenceData} />
        )}

        {/* Industry Insights */}
        {shouldShowSection('overview') && (
          <IndustryInsights data={intelligenceData} businessType={businessType} />
        )}

        {/* 30-Day Action Plans */}
        {shouldShowSection('overview') && businessType === 'agency' && (
          <ActionPlans data={intelligenceData} businessType={businessType} />
        )}

        {/* Business Type Specific Features */}
        {businessType === 'copywriting' && (
          <EmailTemplatesGenerator 
            data={intelligenceData.formData} 
            clientInfo={intelligenceData.formData?.clientDetails}
          />
        )}

        {businessType === 'sales' && (
          <SalesScriptsGenerator 
            data={intelligenceData.formData} 
            idealCustomer={intelligenceData.formData?.idealCustomerProfile}
          />
        )}

        {/* Marketing-specific message */}
        {intelligenceMode === 'marketing' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Marketing Focus Mode</h3>
                <p className="text-sm text-muted-foreground">
                  This report focuses specifically on marketing strategy and campaign recommendations. 
                  Switch to "Full Intelligence" mode for comprehensive insights including copywriting analysis.
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
