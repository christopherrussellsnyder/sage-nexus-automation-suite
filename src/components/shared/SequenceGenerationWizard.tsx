
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Wand2, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailSequenceService } from '@/services/EmailSequenceService';
import { SequenceGenerationRequest, EmailSequence, QualificationCriteria } from '@/types/emailSequence';
import QualificationBuilder from './QualificationBuilder';

interface SequenceGenerationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (sequence: EmailSequence) => void;
  type: 'agency' | 'sales';
}

const SequenceGenerationWizard = ({ isOpen, onClose, onGenerated, type }: SequenceGenerationWizardProps) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<SequenceGenerationRequest>({
    businessType: type,
    industry: '',
    targetAudience: '',
    goals: [],
    currentChallenges: [],
    competitorInfo: '',
    brandVoice: 'professional',
    sequenceType: '',
    emailCount: 5,
    avgEmailLength: 500,
    qualificationCriteria: {
      companySize: 'any',
      industry: [],
      budgetRange: '',
      geography: [],
      engagementLevel: 'cold',
      customFields: {}
    }
  });
  const { toast } = useToast();

  const sequenceTypes = type === 'agency' ? [
    { value: 'onboarding', label: 'New Client Onboarding' },
    { value: 'project-completion', label: 'Project Completion Follow-up' },
    { value: 'check-in', label: 'Regular Client Check-in' },
    { value: 'upsell', label: 'Service Upsell Sequence' },
    { value: 'renewal', label: 'Contract Renewal' },
    { value: 'feedback', label: 'Feedback Collection' }
  ] : [
    { value: 'cold-outreach', label: 'Cold Outreach Sequence' },
    { value: 'demo-follow-up', label: 'Demo Follow-up' },
    { value: 'warm-nurture', label: 'Warm Lead Nurture' },
    { value: 'abandoned-cart', label: 'Abandoned Cart Recovery' },
    { value: 'trial-conversion', label: 'Trial to Paid Conversion' },
    { value: 're-engagement', label: 'Re-engagement Campaign' }
  ];

  const goalOptions = type === 'agency' ? [
    'Improve client satisfaction',
    'Increase project efficiency',
    'Boost client retention',
    'Generate more referrals',
    'Upsell additional services',
    'Streamline communication'
  ] : [
    'Increase lead conversion',
    'Shorten sales cycle',
    'Improve demo attendance',
    'Boost trial sign-ups',
    'Reduce churn rate',
    'Generate more referrals'
  ];

  const challengeOptions = type === 'agency' ? [
    'Clients don\'t respond to emails',
    'Poor project communication',
    'Scope creep issues',
    'Late payments',
    'Unrealistic expectations',
    'Lack of client engagement'
  ] : [
    'Low email open rates',
    'Poor response rates',
    'Long sales cycles',
    'High churn rates',
    'Weak value proposition',
    'Competitive market'
  ];

  const addToArray = (array: string[], item: string) => {
    if (!array.includes(item)) {
      return [...array, item];
    }
    return array;
  };

  const removeFromArray = (array: string[], item: string) => {
    return array.filter(i => i !== item);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedSequence = await EmailSequenceService.generateSequence(formData);
      EmailSequenceService.saveSequence(generatedSequence);
      onGenerated(generatedSequence);
      toast({
        title: "Sequence Generated Successfully!",
        description: `Created ${generatedSequence.emails.length} email templates based on your requirements.`,
      });
      onClose();
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate email sequence. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry/Niche</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., SaaS, E-commerce, Digital Marketing"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder={type === 'agency' ? "e.g., Small business owners, CMOs" : "e.g., B2B decision makers, startup founders"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sequenceType">Sequence Type</Label>
              <Select value={formData.sequenceType} onValueChange={(value) => setFormData({ ...formData, sequenceType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sequence type" />
                </SelectTrigger>
                <SelectContent>
                  {sequenceTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandVoice">Brand Voice</Label>
              <Select value={formData.brandVoice} onValueChange={(value: any) => setFormData({ ...formData, brandVoice: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual & Friendly</SelectItem>
                  <SelectItem value="friendly">Warm & Personal</SelectItem>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Goals (Select multiple)</Label>
              <div className="grid grid-cols-2 gap-2">
                {goalOptions.map(goal => (
                  <div
                    key={goal}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      formData.goals.includes(goal) ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        goals: formData.goals.includes(goal) 
                          ? removeFromArray(formData.goals, goal)
                          : addToArray(formData.goals, goal)
                      });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${formData.goals.includes(goal) ? 'bg-blue-500' : 'bg-gray-300'}`} />
                      <span className="text-sm">{goal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Current Challenges (Select multiple)</Label>
              <div className="grid grid-cols-2 gap-2">
                {challengeOptions.map(challenge => (
                  <div
                    key={challenge}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      formData.currentChallenges.includes(challenge) ? 'bg-red-50 border-red-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        currentChallenges: formData.currentChallenges.includes(challenge) 
                          ? removeFromArray(formData.currentChallenges, challenge)
                          : addToArray(formData.currentChallenges, challenge)
                      });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${formData.currentChallenges.includes(challenge) ? 'bg-red-500' : 'bg-gray-300'}`} />
                      <span className="text-sm">{challenge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="competitorInfo">Competitor Information</Label>
              <Textarea
                id="competitorInfo"
                value={formData.competitorInfo}
                onChange={(e) => setFormData({ ...formData, competitorInfo: e.target.value })}
                placeholder="Describe your main competitors and how you differentiate from them..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emailCount">Number of Emails</Label>
                <Select value={formData.emailCount.toString()} onValueChange={(value) => setFormData({ ...formData, emailCount: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 emails</SelectItem>
                    <SelectItem value="5">5 emails</SelectItem>
                    <SelectItem value="7">7 emails</SelectItem>
                    <SelectItem value="9">9 emails</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgEmailLength">Average Email Length</Label>
                <Select value={formData.avgEmailLength.toString()} onValueChange={(value) => setFormData({ ...formData, avgEmailLength: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300">300 words (Short)</SelectItem>
                    <SelectItem value="500">500 words (Medium)</SelectItem>
                    <SelectItem value="700">700 words (Long)</SelectItem>
                    <SelectItem value="1000">1000 words (Detailed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <QualificationBuilder
            criteria={formData.qualificationCriteria}
            onChange={(criteria) => setFormData({ ...formData, qualificationCriteria: criteria })}
            type={type}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5" />
            <span>Generate {type === 'agency' ? 'Client' : 'Sales'} Email Sequence</span>
          </DialogTitle>
          <DialogDescription>
            Create a personalized email sequence based on your business needs and goals
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center space-x-2 mb-6">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNum === step ? 'bg-blue-500 text-white' : 
                stepNum < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum < step ? <CheckCircle className="h-4 w-4" /> : stepNum}
              </div>
              {stepNum < 4 && <div className="w-8 h-0.5 bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            disabled={isGenerating}
          >
            {step > 1 ? 'Previous' : 'Cancel'}
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Step {step} of 4
            </span>
          </div>

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={isGenerating}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !formData.industry || !formData.targetAudience}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Sequence
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SequenceGenerationWizard;
