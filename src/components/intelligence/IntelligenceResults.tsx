
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import ResultsOverview from './results/ResultsOverview';
import MonthlyPlan from './results/MonthlyPlan';
import CompetitorInsights from './results/CompetitorInsights';
import MetricOptimization from './results/MetricOptimization';
import PlatformRecommendations from './results/PlatformRecommendations';
import IndustryInsights from './results/IndustryInsights';

interface IntelligenceResultsProps {
  data: any;
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting' | null;
  onBack: () => void;
}

const IntelligenceResults = ({ data, businessType, onBack }: IntelligenceResultsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', component: ResultsOverview },
    { id: 'monthly-plan', label: 'Monthly Plan', component: MonthlyPlan },
    { id: 'competitor-insights', label: 'Competitor Analysis', component: CompetitorInsights },
    { id: 'metric-optimization', label: 'Metric Optimization', component: MetricOptimization },
    { id: 'platform-recommendations', label: 'Platform Recommendations', component: PlatformRecommendations },
    { id: 'industry-insights', label: 'Industry Insights', component: IndustryInsights }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ResultsOverview;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Wizard
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Intelligence Results</h2>
            <p className="text-muted-foreground">
              AI-generated insights for your {businessType} business
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          ✓ Analysis Complete
        </Badge>
        <Badge variant="outline">
          Generated {data.generatedAt ? new Date(data.generatedAt).toLocaleDateString() : 'recently'}
        </Badge>
        {data.intelligenceMode && (
          <Badge variant="outline">
            {data.intelligenceMode.charAt(0).toUpperCase() + data.intelligenceMode.slice(1)} Mode
          </Badge>
        )}
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="whitespace-nowrap"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Content */}
      <ActiveComponent data={data} businessType={businessType} />
    </div>
  );
};

export default IntelligenceResults;
