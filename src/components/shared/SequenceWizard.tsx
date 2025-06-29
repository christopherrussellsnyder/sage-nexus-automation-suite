import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Plus, X, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SequenceWizardData, EnhancedEmailSequence } from '@/types/sequenceWizard';

interface SequenceWizardProps {
  type: 'sales' | 'agency';
  onComplete: (data: SequenceWizardData) => void;
  onCancel: () => void;
}

const SequenceWizard = ({ type, onComplete, onCancel }: SequenceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SequenceWizardData>>({
    audiencePainPoints: ['']
  });
  const { toast } = useToast();

  const totalSteps = 4;

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePainPointChange = (index: number, value: string) => {
    const updatedPainPoints = [...(formData.audiencePainPoints || [''])];
    updatedPainPoints[index] = value;
    setFormData(prev => ({ ...prev, audiencePainPoints: updatedPainPoints }));
  };

  const addPainPoint = () => {
    setFormData(prev => ({
      ...prev,
      audiencePainPoints: [...(prev.audiencePainPoints || ['']), '']
    }));
  };

  const removePainPoint = (index: number) => {
    if ((formData.audiencePainPoints || []).length > 1) {
      const updatedPainPoints = (formData.audiencePainPoints || []).filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, audiencePainPoints: updatedPainPoints }));
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return !!(formData.businessName && formData.industry && formData.targetAudience);
      case 2:
        return !!(formData.audiencePainPoints && formData.audiencePainPoints.some(point => point.trim()));
      case 3:
        return !!(formData.campaignGoal && formData.sequenceType && formData.preferredTone);
      case 4:
        return !!(formData.senderName && formData.emailCount);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all required information before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete the wizard
      const completeData: SequenceWizardData = {
        businessName: formData.businessName || '',
        industry: formData.industry || '',
        targetAudience: formData.targetAudience || '',
        uniqueValueProp: formData.uniqueValueProp || '',
        productService: formData.productService || '',
        averageDealSize: formData.averageDealSize || '',
        salesCycle: formData.salesCycle || '',
        audiencePainPoints: formData.audiencePainPoints?.filter(point => point.trim()) || [],
        competitorAnalysis: formData.competitorAnalysis || '',
        marketPosition: formData.marketPosition || '',
        campaignGoal: formData.campaignGoal || 'lead-generation',
        sequenceType: formData.sequenceType || 'cold-outreach',
        preferredTone: formData.preferredTone || 'professional',
        senderName: formData.senderName || '',
        senderTitle: formData.senderTitle || '',
        companyName: formData.companyName || formData.businessName || '',
        contactInfo: formData.contactInfo || '',
        emailCount: type === 'agency' ? 15 : (formData.emailCount || 5),
        sequenceLength: type === 'agency' ? 30 : (formData.sequenceLength || 14),
        triggerType: formData.triggerType || 'manual'
      };
      onComplete(completeData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Tell us about your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName || ''}
                  onChange={(e) => handleFieldChange('businessName', e.target.value)}
                  placeholder="Your business name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  value={formData.industry || ''}
                  onChange={(e) => handleFieldChange('industry', e.target.value)}
                  placeholder="e.g., Software, Consulting, E-commerce"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience || ''}
                  onChange={(e) => handleFieldChange('targetAudience', e.target.value)}
                  placeholder="e.g., Small business owners, Marketing managers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productService">Product/Service</Label>
                <Textarea
                  id="productService"
                  value={formData.productService || ''}
                  onChange={(e) => handleFieldChange('productService', e.target.value)}
                  placeholder="Describe what you offer"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Audience Analysis</CardTitle>
              <CardDescription>Help us understand your audience's challenges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Audience Pain Points *</Label>
                <p className="text-sm text-muted-foreground">What challenges does your audience face?</p>
                {(formData.audiencePainPoints || ['']).map((painPoint, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={painPoint}
                      onChange={(e) => handlePainPointChange(index, e.target.value)}
                      placeholder={`Pain point ${index + 1}`}
                      className="flex-1"
                    />
                    {(formData.audiencePainPoints || []).length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePainPoint(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPainPoint}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Pain Point</span>
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitorAnalysis">Competitor Analysis</Label>
                <Textarea
                  id="competitorAnalysis"
                  value={formData.competitorAnalysis || ''}
                  onChange={(e) => handleFieldChange('competitorAnalysis', e.target.value)}
                  placeholder="Who are your main competitors and how do you differentiate?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uniqueValueProp">Unique Value Proposition</Label>
                <Textarea
                  id="uniqueValueProp"
                  value={formData.uniqueValueProp || ''}
                  onChange={(e) => handleFieldChange('uniqueValueProp', e.target.value)}
                  placeholder="What makes you different from competitors?"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Configuration</CardTitle>
              <CardDescription>Configure your email sequence settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaignGoal">Campaign Goal *</Label>
                <Select value={formData.campaignGoal} onValueChange={(value) => handleFieldChange('campaignGoal', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead-generation">Lead Generation</SelectItem>
                    <SelectItem value="nurturing">Lead Nurturing</SelectItem>
                    <SelectItem value="conversion">Sales Conversion</SelectItem>
                    <SelectItem value="outreach">Cold Outreach</SelectItem>
                    <SelectItem value="retention">Client Retention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sequenceType">Sequence Type *</Label>
                <Select value={formData.sequenceType} onValueChange={(value) => handleFieldChange('sequenceType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sequence type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                    <SelectItem value="warm-follow-up">Warm Follow-up</SelectItem>
                    <SelectItem value="nurture-sequence">Nurture Sequence</SelectItem>
                    <SelectItem value="sales-sequence">Sales Sequence</SelectItem>
                    <SelectItem value="client-onboarding">Client Onboarding</SelectItem>
                    <SelectItem value="referral-request">Referral Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTone">Preferred Tone *</Label>
                <Select value={formData.preferredTone} onValueChange={(value) => handleFieldChange('preferredTone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {type === 'sales' && (
                <div className="space-y-2">
                  <Label htmlFor="emailCount">Number of Emails</Label>
                  <Input
                    id="emailCount"
                    type="number"
                    min="3"
                    max="15"
                    value={formData.emailCount || 5}
                    onChange={(e) => handleFieldChange('emailCount', parseInt(e.target.value) || 5)}
                  />
                </div>
              )}
              {type === 'agency' && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Client Nurture Sequence:</strong> Will generate 15 comprehensive emails over 30 days for optimal client retention and growth.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personalization</CardTitle>
              <CardDescription>Add sender information for personalization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senderName">Your Name *</Label>
                <Input
                  id="senderName"
                  value={formData.senderName || ''}
                  onChange={(e) => handleFieldChange('senderName', e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderTitle">Your Title</Label>
                <Input
                  id="senderTitle"
                  value={formData.senderTitle || ''}
                  onChange={(e) => handleFieldChange('senderTitle', e.target.value)}
                  placeholder="e.g., CEO, Sales Manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName || formData.businessName || ''}
                  onChange={(e) => handleFieldChange('companyName', e.target.value)}
                  placeholder="Your company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information</Label>
                <Input
                  id="contactInfo"
                  value={formData.contactInfo || ''}
                  onChange={(e) => handleFieldChange('contactInfo', e.target.value)}
                  placeholder="Phone, email, or website"
                />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {type === 'sales' ? 'AI Email Sequence Setup' : 'Client Nurture Sequence Setup'}
        </h2>
        <p className="text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
        <Progress value={progress} className="w-full max-w-md mx-auto" />
      </div>

      {renderStep()}

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button
              onClick={currentStep === 1 ? onCancel : handlePrevious}
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>

            <Button onClick={handleNext}>
              {currentStep === totalSteps ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Sequence
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SequenceWizard;
