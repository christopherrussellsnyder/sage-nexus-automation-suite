import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Rocket, Target, DollarSign, Calendar, Users, Sparkles, Brain, TrendingUp, Zap } from 'lucide-react';
import { CompetitiveIntelligenceService } from '@/services/CompetitiveIntelligenceService';
import ApiKeySetup from '../ApiKeySetup';

interface CampaignData {
  clientName: string;
  industry: string;
  objectives: string[];
  targetAudience: string;
  budget: number;
  duration: string;
  geographic: string;
  keyMessages: string;
  competitors: string;
  businessModel: string;
  currentChallenges: string;
  successMetrics: string;
  brandPersonality: string;
  competitiveInsights?: any;
  personalizedStrategy?: string;
}

interface CampaignWizardProps {
  onCreateCampaign: (data: CampaignData) => void;
  isCreating: boolean;
  progress: number;
}

const CampaignWizard = ({ onCreateCampaign, isCreating, progress }: CampaignWizardProps) => {
  const [step, setStep] = useState(1);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [analyzingCompetitors, setAnalyzingCompetitors] = useState(false);
  const [formData, setFormData] = useState<CampaignData>({
    clientName: '',
    industry: '',
    objectives: [],
    targetAudience: '',
    budget: 0,
    duration: '',
    geographic: '',
    keyMessages: '',
    competitors: '',
    businessModel: '',
    currentChallenges: '',
    successMetrics: '',
    brandPersonality: ''
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Real Estate',
    'Food & Beverage', 'Fashion', 'Automotive', 'Travel', 'Professional Services', 
    'Legal Services', 'Insurance', 'Fitness & Wellness', 'Home Services', 'SaaS', 'Other'
  ];

  const objectives = [
    'Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Customer Engagement',
    'Website Traffic', 'App Downloads', 'Event Promotion', 'Customer Retention',
    'Market Penetration', 'Thought Leadership', 'Community Building', 'Product Launch'
  ];

  const durations = ['2 weeks', '1 month', '2 months', '3 months', '6 months', '1 year', 'Ongoing'];
  const budgetRanges = [5000, 10000, 25000, 50000, 100000, 250000];

  const businessModels = [
    'B2B Services', 'B2C Products', 'E-commerce', 'SaaS', 'Marketplace', 
    'Subscription', 'Consulting', 'Agency', 'Local Business', 'Enterprise'
  ];

  const brandPersonalities = [
    'Professional & Authoritative', 'Friendly & Approachable', 'Innovative & Cutting-edge',
    'Trustworthy & Reliable', 'Creative & Artistic', 'Bold & Disruptive',
    'Warm & Community-focused', 'Premium & Luxury', 'Fun & Energetic'
  ];

  const handleObjectiveToggle = (objective: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.includes(objective)
        ? prev.objectives.filter(o => o !== objective)
        : [...prev.objectives, objective]
    }));
  };

  const updateField = (field: keyof CampaignData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const analyzeCompetitors = async () => {
    const apiKey = CompetitiveIntelligenceService.getApiKey();
    if (!apiKey) {
      setShowApiSetup(true);
      return;
    }

    setAnalyzingCompetitors(true);
    try {
      const insights = await CompetitiveIntelligenceService.analyzeIndustryCompetitors(
        formData.industry,
        formData.businessModel,
        formData.targetAudience,
        formData.clientName,
        formData.keyMessages
      );

      const personalizedStrategy = await CompetitiveIntelligenceService.generatePersonalizedStrategy(
        insights,
        formData.clientName,
        formData.keyMessages,
        formData.objectives.join(', ')
      );

      setFormData(prev => ({
        ...prev,
        competitiveInsights: insights,
        personalizedStrategy
      }));
    } catch (error) {
      console.error('Error analyzing competitors:', error);
    } finally {
      setAnalyzingCompetitors(false);
    }
  };

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onCreateCampaign(formData);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.clientName && formData.industry && formData.businessModel;
      case 2:
        return formData.objectives.length > 0 && formData.targetAudience;
      case 3:
        return formData.budget > 0 && formData.duration;
      case 4:
        return formData.keyMessages && formData.currentChallenges;
      case 5:
        return formData.successMetrics && formData.brandPersonality;
      case 6:
        return true; // Competitive analysis is optional but recommended
      default:
        return false;
    }
  };

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
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI-Powered Campaign Strategy Builder</span>
          </CardTitle>
          <CardDescription>
            Create data-driven campaigns using competitive intelligence from top performers in your industry
          </CardDescription>
          <Progress value={(step / 6) * 100} className="mt-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {step} of 6</span>
            <span>{Math.round((step / 6) * 100)}% Complete</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Client & Business Information</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client/business name"
                    value={formData.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select value={formData.industry} onValueChange={(value) => updateField('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessModel">Business Model *</Label>
                    <Select value={formData.businessModel} onValueChange={(value) => updateField('businessModel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business model" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Campaign Objectives & Target Audience</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Campaign Objectives * (Select multiple)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {objectives.map((objective) => (
                      <div key={objective} className="flex items-center space-x-2">
                        <Checkbox
                          id={objective}
                          checked={formData.objectives.includes(objective)}
                          onCheckedChange={() => handleObjectiveToggle(objective)}
                        />
                        <Label htmlFor={objective} className="text-sm">
                          {objective}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.objectives.map((objective) => (
                      <Badge key={objective} variant="secondary">
                        {objective}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Detailed Target Audience Description *</Label>
                  <Textarea
                    id="targetAudience"
                    placeholder="Describe your ideal customer: demographics, psychographics, pain points, behaviors, interests, and where they spend time online..."
                    value={formData.targetAudience}
                    onChange={(e) => updateField('targetAudience', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Budget & Timeline Planning</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Monthly Campaign Budget *</Label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {budgetRanges.map((budget) => (
                      <Button
                        key={budget}
                        variant={formData.budget === budget ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateField('budget', budget)}
                      >
                        ${budget.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Or enter custom amount"
                    value={formData.budget || ''}
                    onChange={(e) => updateField('budget', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Campaign Duration *</Label>
                    <Select value={formData.duration} onValueChange={(value) => updateField('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem key={duration} value={duration}>
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="geographic">Geographic Targeting</Label>
                    <Input
                      id="geographic"
                      placeholder="e.g., United States, California, San Francisco Bay Area"
                      value={formData.geographic}
                      onChange={(e) => updateField('geographic', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Brand Messaging & Market Position</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyMessages">Key Messages & Value Propositions *</Label>
                  <Textarea
                    id="keyMessages"
                    placeholder="What are your core value propositions? What makes you different? What specific benefits do you provide? Include any taglines or key messaging..."
                    value={formData.keyMessages}
                    onChange={(e) => updateField('keyMessages', e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentChallenges">Current Marketing Challenges *</Label>
                  <Textarea
                    id="currentChallenges"
                    placeholder="What specific challenges are you facing? What hasn't worked in the past? What obstacles need to be overcome?"
                    value={formData.currentChallenges}
                    onChange={(e) => updateField('currentChallenges', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competitors">Competitor Analysis</Label>
                  <Textarea
                    id="competitors"
                    placeholder="Who are your main competitors? What are they doing well/poorly? How do you differentiate from them?"
                    value={formData.competitors}
                    onChange={(e) => updateField('competitors', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Success Metrics & Brand Personality</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="successMetrics">Success Metrics & Goals *</Label>
                  <Textarea
                    id="successMetrics"
                    placeholder="What specific metrics will define success? Include numbers where possible (e.g., 50 qualified leads per month, 3:1 ROAS, 25% increase in brand awareness)..."
                    value={formData.successMetrics}
                    onChange={(e) => updateField('successMetrics', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandPersonality">Brand Personality & Voice *</Label>
                  <Select value={formData.brandPersonality} onValueChange={(value) => updateField('brandPersonality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand personality" />
                    </SelectTrigger>
                    <SelectContent>
                      {brandPersonalities.map((personality) => (
                        <SelectItem key={personality} value={personality}>
                          {personality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Competitive Intelligence Analysis</span>
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">🚀 Supercharge Your Campaign</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Get data-driven insights from your top competitors to create campaigns that outperform the market average by 3-5x.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-blue-600">
                    <div>✓ Analyze top 10 competitors</div>
                    <div>✓ Extract winning ad copy</div>
                    <div>✓ Identify market gaps</div>
                    <div>✓ Emotional trigger analysis</div>
                    <div>✓ Pricing strategy insights</div>
                    <div>✓ Content theme optimization</div>
                  </div>
                </div>

                {!formData.competitiveInsights && (
                  <Button 
                    onClick={analyzeCompetitors}
                    disabled={analyzingCompetitors}
                    size="lg"
                    className="w-full"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {analyzingCompetitors ? 'Analyzing Top Competitors...' : 'Analyze Competitors & Market Data'}
                  </Button>
                )}

                {analyzingCompetitors && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Scraping competitor data...</span>
                      <span>Processing...</span>
                    </div>
                    <Progress value={75} />
                    <div className="text-center text-sm text-muted-foreground">
                      Analyzing top performers in {formData.industry} industry...
                    </div>
                  </div>
                )}

                {formData.competitiveInsights && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-green-600">
                      <Sparkles className="h-4 w-4" />
                      <span className="font-semibold">Analysis Complete!</span>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">Key Insights Discovered:</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• {formData.competitiveInsights.topPerformers?.length || 0} top competitors analyzed</li>
                        <li>• {formData.competitiveInsights.commonEmotions?.length || 0} winning emotional triggers identified</li>
                        <li>• {formData.competitiveInsights.marketGaps?.length || 0} market opportunities found</li>
                        <li>• Personalized strategy generated based on your unique edge</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {(isCreating || analyzingCompetitors) && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>
                  {analyzingCompetitors 
                    ? "Analyzing competitive landscape..." 
                    : "Creating comprehensive strategy with competitive insights..."
                  }
                </span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
              <div className="text-center text-sm text-muted-foreground">
                {progress < 25 && "Analyzing industry trends and competitive landscape..."}
                {progress >= 25 && progress < 50 && "Generating audience insights and persona mapping..."}
                {progress >= 50 && progress < 75 && "Creating platform-specific campaign strategies..."}
                {progress >= 75 && "Finalizing optimization recommendations and success metrics..."}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1 || isCreating || analyzingCompetitors}
            >
              Previous
            </Button>
            
            {step < 6 ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid() || isCreating || analyzingCompetitors}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isCreating || analyzingCompetitors}
                size="lg"
              >
                <Brain className="h-4 w-4 mr-2" />
                {isCreating ? 'Creating Data-Driven Strategy...' : 'Generate AI-Powered Campaign'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CampaignWizard;
