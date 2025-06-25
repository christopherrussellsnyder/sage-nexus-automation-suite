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
  const intelligenceMode = data.intelligenceMode || 'full';

  // Debug logging for data validation
  console.log('=== INTELLIGENCE RESULTS DEBUG ===');
  console.log('Full data object:', data);
  console.log('AI Generated flag:', data.aiGenerated);
  console.log('Platform Recommendations:', data.platformRecommendations);
  console.log('Monthly Plan length:', data.monthlyPlan?.length);
  console.log('Copywriting Recommendations:', data.copywritingRecommendations);
  console.log('Competitor Insights:', data.competitorInsights);
  console.log('Metric Optimization:', data.metricOptimization);
  console.log('Budget Strategy:', data.budgetStrategy);
  console.log('Industry Insights:', data.industryInsights);
  console.log('Intelligence Mode:', intelligenceMode);
  console.log('Business Type:', businessType);

  // Data validation helper
  const validateAIData = (data: any) => {
    const checks = {
      hasAIFlag: data.aiGenerated === true,
      hasInsights: !!data,
      hasPlatforms: !!data.platformRecommendations?.length,
      hasMonthlyPlan: !!data.monthlyPlan?.length,
      hasCopywriting: !!data.copywritingRecommendations?.length,
      hasCompetitors: !!data.competitorInsights?.length,
      hasMetrics: !!data.metricOptimization?.length,
      hasBudget: !!data.budgetStrategy?.length,
      hasIndustry: !!data.industryInsights?.length
    };
    console.log('AI Data Validation Results:', checks);
    return checks;
  };

  // Run validation
  const dataValidation = validateAIData(data);

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
      platforms: ['full', 'marketing'],
      monthlyPlan: ['full', 'marketing'],
      metrics: ['full', 'marketing'],
      competitors: ['full', 'competitor'],
      copywriting: ['full', 'copywriting'] // Only show for full and copywriting modes
    };
    
    return sectionMapping[section]?.includes(intelligenceMode) || false;
  };

  return (
    <div className="space-y-6">
      {/* Header with enhanced debugging info */}
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
              <Badge variant={data.aiGenerated ? "default" : "secondary"}>
                {data.aiGenerated ? "AI Generated" : "Template Data"}
              </Badge>
              {dataValidation.hasPlatforms && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  ✓ Platforms ({data.platformRecommendations?.length})
                </Badge>
              )}
              {dataValidation.hasMonthlyPlan && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  ✓ Calendar ({data.monthlyPlan?.length} days)
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

      {/* Data Quality Alert */}
      {!data.aiGenerated && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Template Data Notice</h3>
              <p className="text-sm text-amber-700 mt-1">
                This report is using template data because AI-generated insights are not available. 
                For personalized intelligence, please regenerate the report.
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

        {/* Debug Information (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-mono">
                <div>AI Generated: {String(data.aiGenerated)}</div>
                <div>Platform Count: {data.platformRecommendations?.length || 0}</div>
                <div>Monthly Plan Days: {data.monthlyPlan?.length || 0}</div>
                <div>Copywriting Sections: {data.copywritingRecommendations?.length || 0}</div>
                <div>Competitor Count: {data.competitorInsights?.length || 0}</div>
                <div>Intelligence Mode: {intelligenceMode}</div>
              </div>
            </CardContent>
          </Card>
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
