
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
  
  // Ensure we're accessing the correct data structure
  const businessData = data.formData || data.businessData || {};
  const budgetStrategy = data.budgetStrategy || {};
  // Ensure copywritingRecommendations is always an array
  const copywritingRecs = Array.isArray(data.copywritingRecommendations) 
    ? data.copywritingRecommendations 
    : [];

  console.log('ResultsOverview - Full data:', data);
  console.log('ResultsOverview - Budget strategy:', budgetStrategy);
  console.log('ResultsOverview - Copywriting recommendations:', copywritingRecs);

  const getCurrentCopyRecommendations = () => {
    // Double-check that copywritingRecs is an array before using array methods
    if (!Array.isArray(copywritingRecs) || copywritingRecs.length === 0) {
      return {
        copyType: selectedCopyType,
        recommendations: ['No specific recommendations generated for this copy type. Please regenerate the report.'],
        examples: [],
        emotionalTriggers: []
      };
    }

    const currentRec = copywritingRecs.find((rec: any) => rec.copyType === selectedCopyType);
    
    if (currentRec) {
      console.log('Found copy recommendations for', selectedCopyType, ':', currentRec);
      return currentRec;
    }

    // If no specific recommendations found, try to get the first available one
    if (copywritingRecs.length > 0) {
      console.log('Using first available copy recommendation:', copywritingRecs[0]);
      return copywritingRecs[0];
    }

    // Return default structure if nothing found
    return {
      copyType: selectedCopyType,
      recommendations: ['No specific recommendations generated for this copy type. Please regenerate the report.'],
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
                <p className="font-semibold capitalize">{businessType || businessData.businessType || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Revenue Stage</Label>
                <p className="font-semibold">{businessData.monthlyRevenue ? `$${businessData.monthlyRevenue}/month` : 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
                <p className="font-semibold">{businessData.targetAudience || 'N/A'}</p>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Unique Value Proposition</Label>
              <p className="text-sm bg-gray-50 p-2 rounded">{businessData.uniqueValue || businessData.productService || 'N/A'}</p>
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
            {budgetStrategy && Object.keys(budgetStrategy).length > 0 ? (
              <>
                {budgetStrategy.recommendedStrategy && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Recommended Strategy</Label>
                    <p className="text-sm bg-green-50 p-3 rounded border border-green-200">
                      {budgetStrategy.recommendedStrategy}
                    </p>
                  </div>
                )}

                {budgetStrategy.monthlyBudgetAllocation && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">AI Budget Allocation</Label>
                    <div className="space-y-2 bg-blue-50 p-3 rounded border border-blue-200">
                      {budgetStrategy.monthlyBudgetAllocation.primaryPlatform && (
                        <div className="flex justify-between text-sm">
                          <span>Primary Platform:</span>
                          <span className="font-semibold">{budgetStrategy.monthlyBudgetAllocation.primaryPlatform}</span>
                        </div>
                      )}
                      {budgetStrategy.monthlyBudgetAllocation.secondaryPlatform && (
                        <div className="flex justify-between text-sm">
                          <span>Secondary Platform:</span>
                          <span className="font-semibold">{budgetStrategy.monthlyBudgetAllocation.secondaryPlatform}</span>
                        </div>
                      )}
                      {budgetStrategy.monthlyBudgetAllocation.testing && (
                        <div className="flex justify-between text-sm">
                          <span>Testing & Optimization:</span>
                          <span className="font-semibold">{budgetStrategy.monthlyBudgetAllocation.testing}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="font-semibold text-blue-600">{budgetStrategy.expectedROAS || budgetStrategy.targetROAS || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">Expected ROAS</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <div className="font-semibold text-green-600">{budgetStrategy.targetCPM || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">Target CPM</div>
                  </div>
                </div>

                {budgetStrategy.reasoning && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">AI Strategy Reasoning</Label>
                    <p className="text-sm bg-blue-50 p-3 rounded border border-blue-200 mt-1">
                      {budgetStrategy.reasoning}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">AI budget strategy data not available. Please regenerate the report to get comprehensive budget recommendations.</p>
              </div>
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
                  <div className="mt-2 space-y-2">
                    {currentRecommendations.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {currentRecommendations.examples && currentRecommendations.examples.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">AI Copy Examples & Improvements</Label>
                    <div className="mt-2 space-y-3">
                      {currentRecommendations.examples.map((example: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs font-medium text-red-600 flex items-center space-x-1">
                                <span>❌</span>
                                <span>Before (Original)</span>
                              </Label>
                              <p className="text-sm bg-red-50 p-3 rounded border border-red-200 mt-1">{example.before}</p>
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-green-600 flex items-center space-x-1">
                                <span>✅</span>
                                <span>After (AI Improved)</span>
                              </Label>
                              <p className="text-sm bg-green-50 p-3 rounded border border-green-200 mt-1">{example.after}</p>
                            </div>
                          </div>
                          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                            <Label className="text-xs font-medium text-blue-700">🧠 AI Improvement Analysis</Label>
                            <p className="text-xs text-blue-700 mt-1">{example.improvement}</p>
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
                        <Badge key={index} variant="outline" className="text-xs bg-purple-50 border-purple-200 text-purple-700">
                          🎯 {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <Lightbulb className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-yellow-700 font-medium mb-1">
                  No copywriting recommendations available for {selectedCopyType}
                </p>
                <p className="text-xs text-yellow-600">
                  Try selecting a different content type or regenerate the report for comprehensive copy recommendations.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-700">AI</p>
                <p className="text-xs text-blue-600">Generated Content</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-700">{budgetStrategy.expectedROAS || budgetStrategy.targetROAS || 'N/A'}</p>
                <p className="text-xs text-green-600">Expected ROAS</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-700">{budgetStrategy.targetCPM || 'N/A'}</p>
                <p className="text-xs text-purple-600">Target CPM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-700">100%</p>
                <p className="text-xs text-orange-600">API Powered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsOverview;
