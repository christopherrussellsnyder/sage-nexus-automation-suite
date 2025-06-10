
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
import { Rocket, Target, DollarSign, Calendar, Users, Sparkles } from 'lucide-react';

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
    competitors: ''
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Real Estate',
    'Food & Beverage', 'Fashion', 'Automotive', 'Travel', 'Professional Services', 'Other'
  ];

  const objectives = [
    'Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Customer Engagement',
    'Website Traffic', 'App Downloads', 'Event Promotion', 'Customer Retention'
  ];

  const durations = ['1 week', '2 weeks', '1 month', '3 months', '6 months', '1 year'];
  const budgetRanges = [1000, 5000, 10000, 25000, 50000, 100000];

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
    if (step < 4) setStep(step + 1);
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
        return formData.clientName && formData.industry;
      case 2:
        return formData.objectives.length > 0 && formData.targetAudience;
      case 3:
        return formData.budget > 0 && formData.duration;
      case 4:
        return formData.keyMessages;
      default:
        return false;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Rocket className="h-5 w-5" />
          <span>Campaign Creation Wizard</span>
        </CardTitle>
        <CardDescription>
          Create AI-powered multi-platform campaigns in 4 simple steps
        </CardDescription>
        <Progress value={(step / 4) * 100} className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 1: Client Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  placeholder="Enter client name"
                  value={formData.clientName}
                  onChange={(e) => updateField('clientName', e.target.value)}
                />
              </div>
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
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 2: Campaign Objectives & Audience</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Campaign Objectives *</Label>
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
                <Label htmlFor="targetAudience">Target Audience Description *</Label>
                <Textarea
                  id="targetAudience"
                  placeholder="Describe your target audience (demographics, interests, behaviors, etc.)"
                  value={formData.targetAudience}
                  onChange={(e) => updateField('targetAudience', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 3: Budget & Timeline</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Campaign Budget *</Label>
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
                  placeholder="e.g., United States, California, San Francisco"
                  value={formData.geographic}
                  onChange={(e) => updateField('geographic', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 4: Messaging & Competition</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyMessages">Key Messages & USPs *</Label>
                <Textarea
                  id="keyMessages"
                  placeholder="What are your key messages, unique selling propositions, and value propositions?"
                  value={formData.keyMessages}
                  onChange={(e) => updateField('keyMessages', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitors">Competitor Information</Label>
                <Textarea
                  id="competitors"
                  placeholder="List main competitors and what differentiates your client from them"
                  value={formData.competitors}
                  onChange={(e) => updateField('competitors', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {isCreating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Creating your campaign strategy...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
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
          
          {step < 4 ? (
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
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isCreating ? 'Creating Campaign...' : 'Create Campaign'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignWizard;
