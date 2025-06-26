import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { downloadJSON } from '@/utils/downloadUtils';
import ResultsOverview from './results/ResultsOverview';
import PlatformRecommendations from './results/PlatformRecommendations';
import MonthlyPlan from './results/MonthlyPlan';
import MetricOptimization from './results/MetricOptimization';
import CompetitorInsights from './results/CompetitorInsights';
import IndustryInsights from './results/IndustryInsights';

interface IntelligenceResultsProps {
  data: any;
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting' | null;
  onBack: () => void;
}

const IntelligenceResults = ({ data, businessType, onBack }: IntelligenceResultsProps) => {
  const intelligenceMode = data.intelligenceMode || 'full';

  // Enhanced debug logging for data validation
  console.log('=== INTELLIGENCE RESULTS DEBUG ===');
  console.log('Full data object:', data);
  console.log('Data structure check:');
  console.log('- data.insights exists:', !!data.insights);
  console.log('- Platform Recommendations:', data.insights?.platformRecommendations?.length || 0);
  console.log('- Monthly Plan:', data.insights?.monthlyPlan?.length || 0);
  console.log('- Copywriting Recommendations:', data.insights?.copywritingRecommendations?.length || 0);
  console.log('- Competitor Insights:', data.insights?.competitorInsights?.length || 0);
  console.log('- Metric Optimization:', data.insights?.metricOptimization?.length || 0);
  console.log('- Budget Strategy:', data.insights?.budgetStrategy?.length || 0);
  console.log('- Industry Insights:', data.insights?.industryInsights?.length || 0);
  console.log('Intelligence Mode:', intelligenceMode);
  console.log('Business Type:', businessType);

  // Enhanced data validation helper
  const validateAIData = (data: any) => {
    const checks = {
      hasInsights: !!data.insights,
      hasPlatforms: !!data.insights?.platformRecommendations?.length,
      hasMonthlyPlan: !!data.insights?.monthlyPlan?.length,
      hasCopywriting: !!data.insights?.copywritingRecommendations?.length,
      hasCompetitors: !!data.insights?.competitorInsights?.length,
      hasMetrics: !!data.insights?.metricOptimization?.length,
      hasBudget: !!data.insights?.budgetStrategy?.length,
      hasIndustry: !!data.insights?.industryInsights?.length,
      totalSections: 0
    };
    
    // Count valid sections
    checks.totalSections = Object.values(checks).filter(Boolean).length - 1; // -1 for totalSections itself
    
    console.log('AI Data Validation Results:', checks);
    return checks;
  };

  // Run validation
  const dataValidation = validateAIData(data);
  const isAIGenerated = dataValidation.hasInsights && dataValidation.totalSections > 0;

  const handleExport = () => {
    const exportData = {
      ...data,
      exportedAt: new Date().toISOString(),
      dataValidation: dataValidation
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
    
    const sectionMapping: Record<string, string[]> = {
      overview: ['full', 'copywriting', 'marketing', 'competitor'],
      platforms: ['full', 'marketing'],
      monthlyPlan: ['full', 'marketing'],
      metrics: ['full', 'marketing'],
      competitors: ['full', 'competitor'],
      industry: ['full', 'competitor']
    };
    
    return sectionMapping[section]?.includes(intelligenceMode) || false;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with debugging info */}
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
              {data.generatedAt && (
                <span className="ml-2">
                  on {new Date(data.generatedAt).toLocaleDateString()}
                </span>
              )}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline">
                Mode: {intelligenceMode.charAt(0).toUpperCase() + intelligenceMode.slice(1)}
              </Badge>
              <Badge variant={isAIGenerated ? "default" : "secondary"}>
                {isAIGenerated ? "AI Generated" : "Template Data"}
              </Badge>
              {dataValidation.hasPlatforms && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  ✓ Platforms ({data.insights?.platformRecommendations?.length})
                </Badge>
              )}
              {dataValidation.hasMonthlyPlan && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  ✓ Calendar ({data.insights?.monthlyPlan?.length} days)
                </Badge>
              )}
              {dataValidation.hasCopywriting && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  ✓ Copywriting ({data.insights?.copywritingRecommendations?.length})
                </Badge>
              )}
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

      {/* Enhanced Data Quality Alert */}
      {!isAIGenerated && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Template Data Notice</h3>
              <p className="text-sm text-amber-700 mt-1">
                This report is using template data because AI-generated insights are not available. 
                Valid AI sections detected: {dataValidation.totalSections}/8. 
                Please regenerate the report for personalized intelligence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Content */}
      <div className="space-y-6">
        {shouldShowSection('overview') && (
          <ResultsOverview data={data} businessType={businessType} />
        )}
        
        {shouldShowSection('platforms') && (
          <PlatformRecommendations data={data} />
        )}
        
        {shouldShowSection('monthlyPlan') && (
          <MonthlyPlan data={data} />
        )}
        
        {shouldShowSection('metrics') && (
          <MetricOptimization data={data} />
        )}
        
        {shouldShowSection('competitors') && (
          <CompetitorInsights data={data} />
        )}

        {shouldShowSection('industry') && (
          <IndustryInsights data={data} />
        )}

        {/* Debug Information (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-mono">
                <div>AI Generated: {String(isAIGenerated)}</div>
                <div>Has Insights Object: {String(dataValidation.hasInsights)}</div>
                <div>Platform Count: {data.insights?.platformRecommendations?.length || 0}</div>
                <div>Monthly Plan Days: {data.insights?.monthlyPlan?.length || 0}</div>
                <div>Copywriting Sections: {data.insights?.copywritingRecommendations?.length || 0}</div>
                <div>Competitor Count: {data.insights?.competitorInsights?.length || 0}</div>
                <div>Metric Count: {data.insights?.metricOptimization?.length || 0}</div>
                <div>Budget Strategy Count: {data.insights?.budgetStrategy?.length || 0}</div>
                <div>Industry Insights Count: {data.insights?.industryInsights?.length || 0}</div>
                <div>Intelligence Mode: {intelligenceMode}</div>
                <div>Valid Sections: {dataValidation.totalSections}/8</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Intelligence mode-specific messages */}
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

        {intelligenceMode === 'copywriting' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Copywriting Focus Mode</h3>
                <p className="text-sm text-muted-foreground">
                  This report focuses on advanced copywriting strategies and content optimization. 
                  Switch to "Full Intelligence" mode for platform recommendations and campaign planning.
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
