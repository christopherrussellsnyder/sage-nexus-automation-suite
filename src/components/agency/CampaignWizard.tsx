
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Zap, TrendingUp } from 'lucide-react';
import { CompetitiveIntelligenceService } from '@/services/CompetitiveIntelligenceService';
import ApiKeySetup from '../ApiKeySetup';

interface CampaignWizardProps {
  onCreateCampaign: (data: any) => void;
  isCreating: boolean;
  progress: number;
}

const CampaignWizard = ({ onCreateCampaign, isCreating, progress }: CampaignWizardProps) => {
  const [campaignData, setCampaignData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    campaignGoal: '',
    budget: '',
    timeline: '',
    description: '',
    uniqueValue: ''
  });
  
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [analyzingCompetitors, setAnalyzingCompetitors] = useState(false);
  const [competitiveInsights, setCompetitiveInsights] = useState<any>(null);

  const analyzeCompetitors = async () => {
    const apiKey = CompetitiveIntelligenceService.getApiKey();
    if (!apiKey) {
      setShowApiSetup(true);
      return;
    }

    setAnalyzingCompetitors(true);
    try {
      const insights = await CompetitiveIntelligenceService.analyzeIndustryCompetitors(
        campaignData.industry,
        'Marketing',
        campaignData.targetAudience,
        campaignData.businessName,
        campaignData.uniqueValue
      );
      setCompetitiveInsights(insights);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
    } finally {
      setAnalyzingCompetitors(false);
    }
  };

  const handleCreateCampaign = () => {
    const enhancedData = {
      ...campaignData,
      competitiveInsights,
      timestamp: new Date().toISOString()
    };
    onCreateCampaign(enhancedData);
  };

  const canCreateCampaign = campaignData.businessName && 
                           campaignData.industry && 
                           campaignData.targetAudience && 
                           campaignData.campaignGoal &&
                           campaignData.budget;

  return (
    <>
      <ApiKeySetup 
        isVisible={showApiSetup}
        onApiKeySet={() => {
          setShowApiSetup(false);
          analyzeCompetitors();
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>AI Campaign Strategy Builder</CardTitle>
          <CardDescription>
            Create data-driven campaigns based on competitor analysis and industry insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCreating ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Creating Your Campaign Strategy...</h3>
                <Progress value={progress} className="w-full mb-4" />
                <p className="text-sm text-muted-foreground">
                  {progress < 25 && "Analyzing industry trends..."}
                  {progress >= 25 && progress < 50 && "Generating audience insights..."}
                  {progress >= 50 && progress < 75 && "Creating campaign strategy..."}
                  {progress >= 75 && "Setting up automation..."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your business name"
                    value={campaignData.businessName}
                    onChange={(e) => setCampaignData({...campaignData, businessName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry/Niche</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., SaaS, E-commerce, Consulting"
                    value={campaignData.industry}
                    onChange={(e) => setCampaignData({...campaignData, industry: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Small business owners, Parents"
                    value={campaignData.targetAudience}
                    onChange={(e) => setCampaignData({...campaignData, targetAudience: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="campaignGoal">Campaign Goal</Label>
                  <Select 
                    value={campaignData.campaignGoal} 
                    onValueChange={(value) => setCampaignData({...campaignData, campaignGoal: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead-generation">Lead Generation</SelectItem>
                      <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                      <SelectItem value="sales-conversion">Sales Conversion</SelectItem>
                      <SelectItem value="website-traffic">Website Traffic</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Campaign Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget amount"
                    value={campaignData.budget}
                    onChange={(e) => setCampaignData({...campaignData, budget: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="timeline">Campaign Timeline</Label>
                  <Select 
                    value={campaignData.timeline} 
                    onValueChange={(value) => setCampaignData({...campaignData, timeline: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign objectives and key messages"
                  value={campaignData.description}
                  onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="uniqueValue">Your Unique Advantage</Label>
                <Textarea
                  id="uniqueValue"
                  placeholder="What makes you different from competitors?"
                  value={campaignData.uniqueValue}
                  onChange={(e) => setCampaignData({...campaignData, uniqueValue: e.target.value})}
                />
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label className="text-sm font-medium flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Competitive Intelligence</span>
                </Label>
                {!competitiveInsights && (
                  <Button 
                    onClick={analyzeCompetitors}
                    disabled={analyzingCompetitors || !campaignData.industry}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {analyzingCompetitors ? 'Analyzing...' : 'Analyze Competitor Strategies'}
                  </Button>
                )}
                
                {competitiveInsights && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 text-green-600 mb-2">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm font-semibold">Competitor Analysis Complete!</span>
                    </div>
                    <div className="text-xs text-green-700 space-y-1">
                      <div>• Top performing campaigns analyzed</div>
                      <div>• {competitiveInsights.commonEmotions?.length || 0} emotional triggers identified</div>
                      <div>• {competitiveInsights.marketGaps?.length || 0} competitive advantages found</div>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleCreateCampaign}
                disabled={!canCreateCampaign}
                className="w-full"
                size="lg"
              >
                {competitiveInsights ? 'Create Data-Driven Campaign' : 'Create Campaign Strategy'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default CampaignWizard;
