import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, DollarSign, Users, Calendar, Zap, Eye } from 'lucide-react';
import { MarketingIntelligenceService } from '@/services/MarketingIntelligenceService';
import LoadingState from './LoadingState';
import ApiKeySetup from '../ApiKeySetup';
import { useToast } from '@/components/ui/use-toast';

interface EnhancedMarketingWizardProps {
  onCreateSolution: (data: any) => void;
  isCreating: boolean;
  progress: number;
}

const EnhancedMarketingWizard = ({ onCreateSolution, isCreating, progress }: EnhancedMarketingWizardProps) => {
  const [step, setStep] = useState(1);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    businessType: '',
    targetAudience: '',
    productPrice: 0,
    productDescription: '',
    monthlyUsers: 0,
    conversionRate: 0,
    budget: 0,
    timeline: '',
    campaignGoal: '',
    marketingType: 'paid' as 'paid' | 'organic'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSubmit = async () => {
    // Check if API key exists
    const apiKey = MarketingIntelligenceService.getApiKey();
    if (!apiKey) {
      setShowApiSetup(true);
      return;
    }

    try {
      setLoading(true);
      setCurrentStep('Analyzing market and generating comprehensive solution...');
      
      const solution = await MarketingIntelligenceService.generateMarketingSolution(formData);

      onCreateSolution({
        businessData: formData,
        solution
      });
    } catch (error) {
      console.error('Error creating solution:', error);
      toast({
        title: "Error generating solution",
        description: error.message || "Please check your API key and try again",
        variant: "destructive"
      });
      if (error.message && error.message.includes('API key')) {
        setShowApiSetup(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySet = () => {
    setShowApiSetup(false);
    // Wait a moment before submitting to ensure the API key is saved
    setTimeout(handleSubmit, 500);
  };

  if (showPreview) {
    const MockSolutionPreview = require('./MockSolutionPreview').default;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            ← Back to Form
          </Button>
          <Button onClick={handleSubmit} className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Generate Real Solution</span>
          </Button>
        </div>
        <MockSolutionPreview />
      </div>
    );
  }

  if (loading || isCreating) {
    return (
      <LoadingState
        title="Creating Your Marketing Intelligence Solution"
        progress={progress}
        currentStep={currentStep}
      />
    );
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span>Marketing Intelligence Wizard</span>
              </CardTitle>
              <CardDescription>
                Generate a comprehensive marketing solution with competitor analysis and 30-day action plan
              </CardDescription>
            </div>
            <Badge variant="outline">Step {step} of 3</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step 1: Business Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Business Information</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Your Business Name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="fitness">Fitness & Health</SelectItem>
                      <SelectItem value="coaching">Coaching & Consulting</SelectItem>
                      <SelectItem value="agency">Marketing Agency</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="e.g., Small business owners, Young professionals"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="productDescription">Product/Service Description</Label>
                <Textarea
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  placeholder="Describe your main product or service..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 2: Current Metrics */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Current Performance Metrics</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productPrice">Product Price ($)</Label>
                  <Input
                    id="productPrice"
                    type="number"
                    value={formData.productPrice}
                    onChange={(e) => handleInputChange('productPrice', parseInt(e.target.value) || 0)}
                    placeholder="99"
                  />
                </div>
                
                <div>
                  <Label htmlFor="monthlyUsers">Monthly Website Visitors</Label>
                  <Input
                    id="monthlyUsers"
                    type="number"
                    value={formData.monthlyUsers}
                    onChange={(e) => handleInputChange('monthlyUsers', parseInt(e.target.value) || 0)}
                    placeholder="10000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="conversionRate">Current Conversion Rate (%)</Label>
                  <Input
                    id="conversionRate"
                    type="number"
                    step="0.1"
                    value={formData.conversionRate}
                    onChange={(e) => handleInputChange('conversionRate', parseFloat(e.target.value) || 0)}
                    placeholder="2.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="budget">Monthly Marketing Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Campaign Goals */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Campaign Goals & Strategy</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaignGoal">Primary Campaign Goal</Label>
                  <Select onValueChange={(value) => handleInputChange('campaignGoal', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Increase Sales</SelectItem>
                      <SelectItem value="leads">Generate Leads</SelectItem>
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="traffic">Website Traffic</SelectItem>
                      <SelectItem value="engagement">Social Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timeline">Campaign Timeline</Label>
                  <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30-days">30 Days</SelectItem>
                      <SelectItem value="60-days">60 Days</SelectItem>
                      <SelectItem value="90-days">90 Days</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="marketingType">Marketing Strategy Focus</Label>
                  <Select onValueChange={(value) => handleInputChange('marketingType', value as 'paid' | 'organic')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marketing focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid Advertising Focus</SelectItem>
                      <SelectItem value="organic">Organic Content Focus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <div className="flex space-x-2">
              {step === 3 && (
                <Button
                  variant="outline"
                  onClick={handlePreview}
                  disabled={!formData.businessName || !formData.industry}
                  className="flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview Solution</span>
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!formData.businessName || !formData.industry}
                className="flex items-center space-x-2"
              >
                <span>{step === 3 ? 'Generate Solution' : 'Next'}</span>
                {step === 3 && <Brain className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ApiKeySetup
        isVisible={showApiSetup}
        onApiKeySet={handleApiKeySet}
      />
    </>
  );
};

export default EnhancedMarketingWizard;
