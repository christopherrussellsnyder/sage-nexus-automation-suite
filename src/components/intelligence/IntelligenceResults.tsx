
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { downloadJSON } from '@/utils/downloadUtils';
import ResultsOverview from './results/ResultsOverview';
import PlatformRecommendations from './results/PlatformRecommendations';
import MonthlyPlan from './results/MonthlyPlan';
import MetricOptimization from './results/MetricOptimization';
import CompetitorInsights from './results/CompetitorInsights';
import IndustryInsights from './results/IndustryInsights';

interface IntelligenceResultsProps {
  data: any;
  businessType: string | null;
  onBack: () => void;
}

const IntelligenceResults = ({ data, businessType, onBack }: IntelligenceResultsProps) => {
  const intelligenceMode = data.intelligenceMode || 'full';

  // Enhanced data validation with better detection
  const validateIntelligenceData = (data: any) => {
    const insights = data.insights || {};
    
    const sectionChecks = {
      platformRecommendations: {
        exists: !!insights.platformRecommendations?.length,
        count: insights.platformRecommendations?.length || 0,
        quality: insights.platformRecommendations?.some((p: any) => p.targetingParameters) ? 'high' : 'basic'
      },
      monthlyPlan: {
        exists: !!insights.monthlyPlan?.length,
        count: insights.monthlyPlan?.length || 0,
        quality: insights.monthlyPlan?.length >= 30 ? 'complete' : 'partial'
      },
      copywritingRecommendations: {
        exists: !!insights.copywritingRecommendations?.length,
        count: insights.copywritingRecommendations?.length || 0,
        quality: insights.copywritingRecommendations?.some((c: any) => c.awarenessStageVariations) ? 'detailed' : 'basic'
      },
      competitorInsights: {
        exists: !!insights.competitorInsights?.length,
        count: insights.competitorInsights?.length || 0,
        quality: insights.competitorInsights?.some((c: any) => c.marketingTactics) ? 'comprehensive' : 'basic'
      },
      industryInsights: {
        exists: !!insights.industryInsights?.length,
        count: insights.industryInsights?.length || 0,
        quality: insights.industryInsights?.some((i: any) => i.economicFactors) ? 'advanced' : 'basic'
      },
      budgetStrategy: {
        exists: !!insights.budgetStrategy?.length,
        count: insights.budgetStrategy?.length || 0,
        quality: insights.budgetStrategy?.some((b: any) => b.allocation) ? 'detailed' : 'basic'
      },
      metricOptimization: {
        exists: !!insights.metricOptimization?.length,
        count: insights.metricOptimization?.length || 0,
        quality: insights.metricOptimization?.some((m: any) => m.improvementStrategies) ? 'actionable' : 'basic'
      }
    };

    const totalSections = Object.keys(sectionChecks).length;
    const completedSections = Object.values(sectionChecks).filter(section => section.exists).length;
    const highQualitySections = Object.values(sectionChecks).filter(section => 
      section.quality === 'high' || section.quality === 'complete' || 
      section.quality === 'detailed' || section.quality === 'comprehensive' || 
      section.quality === 'advanced' || section.quality === 'actionable'
    ).length;

    return {
      sectionChecks,
      completedSections,
      totalSections,
      completionRate: completedSections / totalSections,
      qualityScore: highQualitySections / totalSections,
      isAIGenerated: data.isAIGenerated || completedSections >= 5,
      dataQuality: data.dataQuality || {
        completeness: completedSections / totalSections,
        aiContentRatio: highQualitySections / totalSections,
        sectionsGenerated: completedSections
      }
    };
  };

  const validation = validateIntelligenceData(data);

  console.log('=== ENHANCED INTELLIGENCE RESULTS DEBUG ===');
  console.log('Full data object:', data);
  console.log('Validation results:', validation);
  console.log('Data quality metrics:', validation.dataQuality);

  const handleExport = () => {
    const exportData = {
      ...data,
      exportedAt: new Date().toISOString(),
      validation: validation
    };
    
    const filename = `intelligence-report-${intelligenceMode}-${data.businessName?.replace(/\s+/g, '-') || 'business'}-${new Date().toISOString().split('T')[0]}.json`;
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

  const getQualityBadgeColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getQualityLabel = (score: number) => {
    if (score >= 0.8) return 'High Quality';
    if (score >= 0.6) return 'Good Quality';
    return 'Basic Quality';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with quality metrics */}
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
              <Badge variant={validation.isAIGenerated ? "default" : "secondary"}>
                {validation.isAIGenerated ? "AI Generated" : "Template Data"}
              </Badge>
              <Badge className={getQualityBadgeColor(validation.qualityScore)}>
                {getQualityLabel(validation.qualityScore)}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {validation.completedSections}/{validation.totalSections} Sections
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

      {/* Enhanced Quality Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                validation.completionRate >= 0.8 ? 'bg-green-100 text-green-800' : 
                validation.completionRate >= 0.6 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                <CheckCircle className="h-4 w-4 mr-1" />
                {Math.round(validation.completionRate * 100)}% Complete
              </div>
              <p className="text-xs text-muted-foreground mt-1">Section Coverage</p>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getQualityBadgeColor(validation.dataQuality.aiContentRatio)}`}>
                <Info className="h-4 w-4 mr-1" />
                {Math.round(validation.dataQuality.aiContentRatio * 100)}% AI Content
              </div>
              <p className="text-xs text-muted-foreground mt-1">AI vs Template Ratio</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {validation.dataQuality.sectionsGenerated} Active Sections
              </div>
              <p className="text-xs text-muted-foreground mt-1">Generated Sections</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Intelligence Sections Status</CardTitle>
          <CardDescription>Overview of generated content quality by section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(validation.sectionChecks).map(([section, check]) => (
              <div key={section} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <span className="font-medium capitalize">{section.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-sm text-muted-foreground ml-2">({check.count} items)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={check.exists ? "default" : "secondary"} className="text-xs">
                    {check.quality}
                  </Badge>
                  {check.exists ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Alert */}
      {validation.completionRate < 0.7 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Incomplete Intelligence Generation</h3>
              <p className="text-sm text-amber-700 mt-1">
                This report has {Math.round(validation.completionRate * 100)}% completion rate with {validation.qualityScore < 0.5 ? 'limited' : 'moderate'} AI-generated content. 
                Consider regenerating for more comprehensive insights.
              </p>
              <div className="mt-2">
                <Button onClick={handleRegenerate} size="sm" variant="outline" className="text-amber-800 border-amber-300">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate Report
                </Button>
              </div>
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
                <div>AI Generated: {String(validation.isAIGenerated)}</div>
                <div>Completion Rate: {Math.round(validation.completionRate * 100)}%</div>
                <div>Quality Score: {Math.round(validation.qualityScore * 100)}%</div>
                <div>Platform Count: {validation.sectionChecks.platformRecommendations.count}</div>
                <div>Monthly Plan Days: {validation.sectionChecks.monthlyPlan.count}</div>
                <div>Copywriting Sections: {validation.sectionChecks.copywritingRecommendations.count}</div>
                <div>Competitor Count: {validation.sectionChecks.competitorInsights.count}</div>
                <div>Industry Count: {validation.sectionChecks.industryInsights.count}</div>
                <div>Budget Count: {validation.sectionChecks.budgetStrategy.count}</div>
                <div>Metrics Count: {validation.sectionChecks.metricOptimization.count}</div>
                <div>Intelligence Mode: {intelligenceMode}</div>
                <div>Business Type: {businessType}</div>
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
