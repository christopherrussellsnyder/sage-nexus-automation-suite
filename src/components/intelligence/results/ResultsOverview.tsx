
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Lightbulb,
  Globe,
  Mail,
  Megaphone,
  Share2
} from 'lucide-react';

interface ResultsOverviewProps {
  data: any;
  businessType: string | null;
}

const ResultsOverview = ({ data, businessType }: ResultsOverviewProps) => {
  const [selectedCopyType, setSelectedCopyType] = useState<'website' | 'ads' | 'email' | 'social'>('website');
  
  const businessData = data.formData || {};
  const budgetStrategy = data.budgetStrategy || {};
  const copywritingRecs = data.copywritingRecommendations || [];

  const getCurrentCopyRecommendations = () => {
    return copywritingRecs.find((rec: any) => rec.copyType === selectedCopyType) || {
      copyType: selectedCopyType,
      recommendations: ['API-generated recommendations not available'],
      examples: [],
      emotionalTriggers: []
    };
  };

  const currentRecommendations = getCurrentCopyRecommendations();

  return (
    <div className="space-y-6">
      {/* Business Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Business Overview</span>
            </CardTitle>
            <CardDescription>Key insights about your business and market position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Industry</Label>
                <p className="font-semibold capitalize">{businessData.industry || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Business Type</Label>
                <p className="font-semibold capitalize">{businessType || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Revenue Stage</Label>
                <p className="font-semibold">${businessData.monthlyRevenue || 'N/A'}/month</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
                <p className="font-semibold">{businessData.targetAudience || 'N/A'}</p>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Unique Value Proposition</Label>
              <p className="text-sm bg-gray-50 p-2 rounded">{businessData.uniqueValue || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>AI-Generated Budget Strategy</span>
            </CardTitle>
            <CardDescription>Budget recommendations from AI analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetStrategy.recommendedStrategy ? (
              <>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Recommended Strategy</Label>
                  <p className="text-sm bg-green-50 p-2 rounded border border-green-200">
                    {budgetStrategy.recommendedStrategy}
                  </p>
                </div>

                {budgetStrategy.monthlyBudgetAllocation && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">AI Budget Allocation</Label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Primary Platform</span>
                        <span className="font-semibold">{budgetStrategy.monthlyBudgetAllocation.primaryPlatform || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Secondary Platform</span>
                        <span className="font-semibold">{budgetStrategy.monthlyBudgetAllocation.secondaryPlatform || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Testing & Optimization</span>
                        <span className="font-semibold">{budgetStrategy.monthlyBudgetAllocation.testing || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-600">{budgetStrategy.expectedROAS || 'N/A'}x</div>
                    <div className="text-xs text-muted-foreground">Expected ROAS</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <div className="font-semibold text-green-600">${budgetStrategy.targetCPM || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">Target CPM</div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">AI budget strategy not generated. Please regenerate the report.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Copywriting Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>AI Copywriting Recommendations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="copyType" className="text-sm">Content Type:</Label>
              <Select value={selectedCopyType} onValueChange={(value: any) => setSelectedCopyType(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website Copy</SelectItem>
                  <SelectItem value="ads">Ad Copy</SelectItem>
                  <SelectItem value="email">Email Marketing</SelectItem>
                  <SelectItem value="social">Social Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
          <CardDescription>
            AI-generated copywriting recommendations for {businessData.businessName || 'your business'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentRecommendations.recommendations && currentRecommendations.recommendations.length > 0 ? (
              <>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">AI Recommendations</Label>
                  <ul className="mt-2 space-y-1">
                    {currentRecommendations.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm bg-gray-50 p-2 rounded flex items-start space-x-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {currentRecommendations.examples && currentRecommendations.examples.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">AI Copy Examples</Label>
                    <div className="mt-2 space-y-3">
                      {currentRecommendations.examples.map((example: any, index: number) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs font-medium text-red-600">Before</Label>
                              <p className="text-sm bg-red-50 p-2 rounded mt-1">{example.before}</p>
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-green-600">After (AI Improved)</Label>
                              <p className="text-sm bg-green-50 p-2 rounded mt-1">{example.after}</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Label className="text-xs font-medium text-muted-foreground">AI Improvement Explanation</Label>
                            <p className="text-xs text-muted-foreground mt-1">{example.improvement}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentRecommendations.emotionalTriggers && currentRecommendations.emotionalTriggers.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">AI-Identified Emotional Triggers</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentRecommendations.emotionalTriggers.map((trigger: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                AI copywriting recommendations not generated for {selectedCopyType}. Please regenerate the report.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">AI</p>
                <p className="text-xs text-muted-foreground">Generated</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{budgetStrategy.expectedROAS || 'N/A'}x</p>
                <p className="text-xs text-muted-foreground">Expected ROAS</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">${budgetStrategy.targetCPM || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">Target CPM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">API</p>
                <p className="text-xs text-muted-foreground">Powered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsOverview;
