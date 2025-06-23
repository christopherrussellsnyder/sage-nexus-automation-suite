
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
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
  const handleExport = () => {
    const exportData = {
      ...data,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intelligence-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = () => {
    // This would trigger regeneration - for now just refresh
    window.location.reload();
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
            <h2 className="text-2xl font-bold">Intelligence Report</h2>
            <p className="text-muted-foreground">
              Generated for {businessType?.charAt(0).toUpperCase() + businessType?.slice(1)} business
              {data.generatedAt && (
                <span className="ml-2">
                  on {new Date(data.generatedAt).toLocaleDateString()}
                </span>
              )}
            </p>
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
        <ResultsOverview data={data} businessType={businessType} />
        <PlatformRecommendations data={data} />
        <MonthlyPlan data={data} />
        <MetricOptimization data={data} />
        <CompetitorInsights data={data} />
      </div>
    </div>
  );
};

export default IntelligenceResults;
