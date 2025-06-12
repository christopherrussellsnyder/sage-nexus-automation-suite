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
import { Rocket, Target, DollarSign, Calendar, Users, Sparkles, Brain, TrendingUp } from 'lucide-react';

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
}

interface CampaignWizardProps {
  onCreateCampaign: (data: CampaignData) => void;
  isCreating: boolean;
  progress: number;
}

const CampaignWizard = ({ onCreateCampaign, isCreating, progress }: CampaignWizardProps) => {
  const [step, setStep] = useState(1);
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

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
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
      default:
        return false;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>Advanced Campaign Strategy Builder</span>
        </CardTitle>
        <CardDescription>
          Create comprehensive, data-driven campaigns with platform-specific optimization strategies
        </CardDescription>
        <Progress value={(step / 5) * 100} className="mt-4" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {step} of 5</span>
          <span>{Math.round((step / 5) * 100)}% Complete</span>
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

        {isCreating && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Analyzing your business and creating comprehensive strategy...</span>
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
            disabled={step === 1 || isCreating}
          >
            Previous
          </Button>
          
          {step < 5 ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid() || isCreating}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isCreating}
              size="lg"
            >
              <Brain className="h-4 w-4 mr-2" />
              {isCreating ? 'Creating Advanced Strategy...' : 'Generate Comprehensive Campaign Strategy'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignWizard;
