
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Download, RefreshCw, Globe, Mail, Megaphone, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ResultsOverviewProps {
  data: any;
  businessType: string | null;
}

const ResultsOverview = ({ data, businessType }: ResultsOverviewProps) => {
  const [selectedCopyType, setSelectedCopyType] = useState('website');
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCopyTypeIcon = (type: string) => {
    switch (type) {
      case 'website': return Globe;
      case 'ads': return Megaphone;
      case 'email': return Mail;
      case 'social': return Share2;
      default: return Globe;
    }
  };

  const renderCopywritingSection = () => {
    if (!data.insights?.copywritingRecommendations?.length) return null;

    const copyTypes = ['website', 'ads', 'email', 'social'];
    const selectedCopy = data.insights.copywritingRecommendations.find(
      (copy: any) => copy.type === selectedCopyType
    ) || data.insights.copywritingRecommendations[0];

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Copy className="h-5 w-5" />
                <span>AI-Generated Copy Variations</span>
              </CardTitle>
              <CardDescription>
                High-converting copy optimized for your target audience
              </CardDescription>
            </div>
            <Select value={selectedCopyType} onValueChange={setSelectedCopyType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {copyTypes.map(type => {
                  const Icon = getCopyTypeIcon(type);
                  return (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span className="capitalize">{type} Copy</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedCopy && (
            <>
              {/* Emotional Triggers */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  🎯 Emotional Triggers for {selectedCopyType.charAt(0).toUpperCase() + selectedCopyType.slice(1)}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCopy.emotionalTriggers?.map((trigger: string, index: number) => (
                    <Badge key={index} variant="secondary">{trigger}</Badge>
                  ))}
                </div>
              </div>

              {/* Awareness Stage Variations */}
              <div className="space-y-4">
                <h4 className="font-semibold">Copy Variations by Awareness Stage</h4>
                {selectedCopy.awarenessStages?.map((stage: any, index: number) => (
                  <Card key={index} className="bg-blue-50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{stage.stage} Awareness</CardTitle>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(stage.copy)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Headline:</label>
                          <p className="font-semibold">{stage.headline}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Body Copy:</label>
                          <p className="text-sm">{stage.copy}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Call to Action:</label>
                          <p className="text-sm font-medium text-blue-600">{stage.cta}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* A/B Testing Framework */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🧪 A/B Testing Framework</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Version A (Control)</h5>
                    <p className="text-sm">{selectedCopy.abTesting?.versionA}</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Version B (Variant)</h5>
                    <p className="text-sm">{selectedCopy.abTesting?.versionB}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="font-medium mb-1">Testing Hypothesis:</h5>
                  <p className="text-sm text-muted-foreground">{selectedCopy.abTesting?.hypothesis}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderOverviewMetrics = () => {
    const metrics = [
      {
        title: 'Intelligence Score',
        value: data.insights?.overallScore || '8.5/10',
        description: 'Comprehensive analysis rating',
        color: 'text-green-600'
      },
      {
        title: 'Market Opportunity',
        value: data.insights?.marketOpportunity || 'High',
        description: 'Based on competitive analysis',
        color: 'text-blue-600'
      },
      {
        title: 'Recommended Focus',
        value: data.insights?.recommendedFocus || 'Digital Marketing',
        description: 'Primary growth channel',
        color: 'text-purple-600'
      },
      {
        title: 'Timeline to Results',
        value: data.insights?.timeline || '30-60 days',
        description: 'Expected implementation time',
        color: 'text-orange-600'
      }
    ];

    return (
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">{metric.title}</p>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Intelligence Overview</span>
            <Badge variant="secondary">
              {businessType?.charAt(0).toUpperCase() + businessType?.slice(1)} Business
            </Badge>
          </CardTitle>
          <CardDescription>
            AI-powered insights and recommendations for your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderOverviewMetrics()}
          
          {data.insights?.executiveSummary && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Executive Summary</h4>
              <p className="text-sm">{data.insights.executiveSummary}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Copywriting Section */}
      {renderCopywritingSection()}

      {/* Key Recommendations */}
      {data.insights?.keyRecommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Key Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.insights.keyRecommendations.map((rec: any, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h5 className="font-medium">{rec.title}</h5>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <Badge variant="outline" className="mt-1">
                      {rec.priority} Priority
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsOverview;
