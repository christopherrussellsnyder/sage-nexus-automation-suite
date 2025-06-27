
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  Building, 
  Target, 
  BarChart3, 
  Users, 
  Settings,
  Sparkles,
  Mail,
  Plus,
  X
} from 'lucide-react';
import { SequenceWizardData } from '@/types/sequenceWizard';

interface SequenceWizardProps {
  onComplete: (data: SequenceWizardData) => void;
  onCancel: () => void;
  type: 'sales' | 'agency';
}

const SequenceWizard = ({ onComplete, onCancel, type }: SequenceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<SequenceWizardData>({
    businessName: '',
    industry: '',
    targetAudience: '',
    uniqueValueProp: '',
    productService: '',
    averageDealSize: '',
    salesCycle: '',
    audiencePainPoints: [],
    competitorAnalysis: '',
    marketPosition: '',
    campaignGoal: 'lead-generation',
    sequenceType: 'cold-outreach',
    preferredTone: 'professional',
    senderName: '',
    senderTitle: '',
    companyName: '',
    contactInfo: '',
    emailCount: type === 'sales' ? 15 : 8,
    sequenceLength: type === 'sales' ? 30 : 14,
    triggerType: type === 'sales' ? 'cold-outreach' : 'new-client'
  });

  const [newPainPoint, setNewPainPoint] = useState('');

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const addPainPoint = () => {
    if (newPainPoint.trim() && !wizardData.audiencePainPoints.includes(newPainPoint.trim())) {
      setWizardData(prev => ({
        ...prev,
        audiencePainPoints: [...prev.audiencePainPoints, newPainPoint.trim()]
      }));
      setNewPainPoint('');
    }
  };

  const removePainPoint = (painPoint: string) => {
    setWizardData(prev => ({
      ...prev,
      audiencePainPoints: prev.audiencePainPoints.filter(p => p !== painPoint)
    }));
  };

  const updateData = (field: keyof SequenceWizardData, value: any) => {
    setWizardData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return wizardData.businessName && wizardData.industry && wizardData.productService;
      case 2:
        return wizardData.targetAudience && wizardData.uniqueValueProp;
      case 3:
        return wizardData.audiencePainPoints.length > 0;
      case 4:
        return wizardData.campaignGoal && wizardData.sequenceType;
      case 5:
        return wizardData.senderName && wizardData.senderTitle;
      default:
        return true;
    }
  };

  const handleComplete = () => {
    onComplete(wizardData);
  };

  const getStepIcon = (step: number) => {
    const icons = [Building, Target, Users, BarChart3, Settings];
    const Icon = icons[step - 1];
    return <Icon className="h-5 w-5" />;
  };

  const getStepTitle = (step: number) => {
    const titles = [
      'Business Profile',
      'Value Proposition',
      'Audience Analysis',
      'Campaign Strategy',
      'Personalization'
    ];
    return titles[step - 1];
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span>AI Email Sequence Wizard</span>
              </CardTitle>
              <CardDescription>
                Create personalized, high-converting email sequences powered by AI
              </CardDescription>
            </div>
            <Badge variant="outline">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className={`flex items-center space-x-1 ${i + 1 <= currentStep ? 'text-primary' : ''}`}>
                  {getStepIcon(i + 1)}
                  <span>{getStepTitle(i + 1)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Tell us about your business</h3>
                <p className="text-muted-foreground">This helps us create content that resonates with your audience</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={wizardData.businessName}
                    onChange={(e) => updateData('businessName', e.target.value)}
                    placeholder="Your company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={wizardData.industry} onValueChange={(value) => updateData('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS & Technology</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance & Insurance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="productService">Product/Service Description *</Label>
                  <Textarea
                    id="productService"
                    value={wizardData.productService}
                    onChange={(e) => updateData('productService', e.target.value)}
                    placeholder="Describe what you offer and how it helps customers..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="averageDealSize">Average Deal Size</Label>
                  <Select value={wizardData.averageDealSize} onValueChange={(value) => updateData('averageDealSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deal size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1k">Under $1,000</SelectItem>
                      <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                      <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="over-100k">Over $100,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salesCycle">Sales Cycle Length</Label>
                  <Select value={wizardData.salesCycle} onValueChange={(value) => updateData('salesCycle', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How long to close?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (same day)</SelectItem>
                      <SelectItem value="1-7-days">1-7 days</SelectItem>
                      <SelectItem value="1-4-weeks">1-4 weeks</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-months-plus">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Define your value proposition</h3>
                <p className="text-muted-foreground">Help us understand who you serve and what makes you unique</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience *</Label>
                  <Input
                    id="targetAudience"
                    value={wizardData.targetAudience}
                    onChange={(e) => updateData('targetAudience', e.target.value)}
                    placeholder="e.g., Small business owners, Marketing managers, SaaS founders"
                  />
                  <p className="text-sm text-muted-foreground">Be specific about who you're trying to reach</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uniqueValueProp">Unique Value Proposition *</Label>
                  <Textarea
                    id="uniqueValueProp"
                    value={wizardData.uniqueValueProp}
                    onChange={(e) => updateData('uniqueValueProp', e.target.value)}
                    placeholder="What makes you different from competitors? What unique benefit do you provide?"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">Focus on the specific outcome or transformation you deliver</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketPosition">Market Position</Label>
                  <Select value={wizardData.marketPosition} onValueChange={(value) => updateData('marketPosition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How do you position yourself?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium/High-end</SelectItem>
                      <SelectItem value="value">Value/Cost-effective</SelectItem>
                      <SelectItem value="innovative">Innovative/Cutting-edge</SelectItem>
                      <SelectItem value="reliable">Reliable/Established</SelectItem>
                      <SelectItem value="personal">Personal/Boutique</SelectItem>
                      <SelectItem value="enterprise">Enterprise/Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Understand your audience</h3>
                <p className="text-muted-foreground">What challenges does your audience face?</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Audience Pain Points *</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newPainPoint}
                      onChange={(e) => setNewPainPoint(e.target.value)}
                      placeholder="Add a pain point your audience faces..."
                      onKeyPress={(e) => e.key === 'Enter' && addPainPoint()}
                    />
                    <Button onClick={addPainPoint} disabled={!newPainPoint.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {wizardData.audiencePainPoints.map((painPoint) => (
                      <Badge key={painPoint} variant="secondary" className="flex items-center space-x-1">
                        <span>{painPoint}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removePainPoint(painPoint)} 
                        />
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Add 3-5 specific challenges your audience faces</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competitorAnalysis">Competitive Landscape</Label>
                  <Textarea
                    id="competitorAnalysis"
                    value={wizardData.competitorAnalysis}
                    onChange={(e) => updateData('competitorAnalysis', e.target.value)}
                    placeholder="Who are your main competitors? How do you differentiate?"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Campaign strategy</h3>
                <p className="text-muted-foreground">Configure your email sequence settings</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="campaignGoal">Campaign Goal *</Label>
                  <Select value={wizardData.campaignGoal} onValueChange={(value: any) => updateData('campaignGoal', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead-generation">Lead Generation</SelectItem>
                      <SelectItem value="nurturing">Lead Nurturing</SelectItem>
                      <SelectItem value="conversion">Sales Conversion</SelectItem>
                      <SelectItem value="outreach">Cold Outreach</SelectItem>
                      <SelectItem value="retention">Customer Retention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sequenceType">Sequence Type *</Label>
                  <Select value={wizardData.sequenceType} onValueChange={(value: any) => updateData('sequenceType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {type === 'sales' ? (
                        <>
                          <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                          <SelectItem value="warm-follow-up">Warm Follow-up</SelectItem>
                          <SelectItem value="nurture-sequence">Nurture Sequence</SelectItem>
                          <SelectItem value="sales-sequence">Sales Sequence</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="client-onboarding">Client Onboarding</SelectItem>
                          <SelectItem value="project-completion">Project Completion</SelectItem>
                          <SelectItem value="referral-request">Referral Request</SelectItem>
                          <SelectItem value="nurture-sequence">Client Nurture</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTone">Preferred Tone *</Label>
                  <Select value={wizardData.preferredTone} onValueChange={(value: any) => updateData('preferredTone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="friendly">Warm & Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailCount">Number of Emails</Label>
                  <Select value={wizardData.emailCount.toString()} onValueChange={(value) => updateData('emailCount', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 emails</SelectItem>
                      <SelectItem value="7">7 emails</SelectItem>
                      <SelectItem value="10">10 emails</SelectItem>
                      <SelectItem value="15">15 emails</SelectItem>
                      <SelectItem value="20">20 emails</SelectItem>
                      <SelectItem value="25">25 emails</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Settings className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Personalization details</h3>
                <p className="text-muted-foreground">Add your contact information for email signatures</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Your Name *</Label>
                  <Input
                    id="senderName"
                    value={wizardData.senderName}
                    onChange={(e) => updateData('senderName', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderTitle">Your Title *</Label>
                  <Input
                    id="senderTitle"
                    value={wizardData.senderTitle}
                    onChange={(e) => updateData('senderTitle', e.target.value)}
                    placeholder="Sales Director, CEO, Account Manager"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={wizardData.companyName}
                    onChange={(e) => updateData('companyName', e.target.value)}
                    placeholder="Your company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Contact Information</Label>
                  <Input
                    id="contactInfo"
                    value={wizardData.contactInfo}
                    onChange={(e) => updateData('contactInfo', e.target.value)}
                    placeholder="Phone, email, or website"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Ready to Generate Your Sequence!</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Our AI will create a personalized {wizardData.emailCount}-email sequence with:
                </p>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• 500-1200 words per email</li>
                  <li>• Industry-specific content for {wizardData.industry}</li>
                  <li>• Personalized for {wizardData.targetAudience}</li>
                  <li>• {wizardData.preferredTone} tone throughout</li>
                  <li>• Built-in psychological triggers and CTAs</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button variant="outline" onClick={currentStep === 1 ? onCancel : prevStep}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>

            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                {wizardData.emailCount} emails • {wizardData.sequenceLength} days
              </span>
            </div>

            {currentStep === totalSteps ? (
              <Button onClick={handleComplete} disabled={!canProceed()}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Sequence
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={!canProceed()}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SequenceWizard;
