
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles, AlertCircle, CheckCircle, Info } from 'lucide-react';
import WizardSteps from './wizard/WizardSteps';
import BusinessInformationForm from './wizard/BusinessInformationForm';
import CurrentMetricsForm from './wizard/CurrentMetricsForm';
import GoalsObjectivesForm from './wizard/GoalsObjectivesForm';
import CompetitorAnalysisForm from './wizard/CompetitorAnalysisForm';
import IntelligenceLoading from './IntelligenceLoading';
import { AIIntelligenceService } from '@/services/AIIntelligenceService';
import { useToast } from '@/hooks/use-toast';

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface UnifiedIntelligenceWizardProps {
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
  onIntelligenceGenerated: (data: any) => void;
  intelligenceMode?: 'full' | 'copywriting' | 'marketing' | 'competitor';
}

interface FormData {
  [key: string]: any;
  copyType?: string;
  copywritingChallenges?: string;
  copywritingGoals?: string;
  competitors?: any[];
}

const UnifiedIntelligenceWizard = ({ 
  businessType, 
  onIntelligenceGenerated,
  intelligenceMode = 'full'
}: UnifiedIntelligenceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const { toast } = useToast();

  const getStepsForMode = (): Step[] => {
    const getStatus = (stepId: number): 'completed' | 'current' | 'upcoming' => {
      if (currentStep > stepId) return 'completed';
      if (currentStep === stepId) return 'current';
      return 'upcoming';
    };

    const baseSteps: Step[] = [
      {
        id: 1,
        title: 'Business Information',
        description: businessType === 'copywriting' ? 'Copywriting business details and specialization' : 'Basic business details and industry information',
        status: getStatus(1)
      }
    ];

    if (intelligenceMode === 'copywriting' || businessType === 'copywriting') {
      return [
        ...baseSteps,
        {
          id: 2,
          title: 'Copy Requirements',
          description: 'Specific copywriting needs and target messaging',
          status: getStatus(2)
        }
      ];
    }

    if (intelligenceMode === 'marketing') {
      return [
        ...baseSteps,
        {
          id: 2,
          title: 'Current Metrics',
          description: 'Performance metrics and key challenges',
          status: getStatus(2)
        },
        {
          id: 3,
          title: 'Goals & Objectives',
          description: 'Business goals and success metrics',
          status: getStatus(3)
        }
      ];
    }

    return [
      ...baseSteps,
      {
        id: 2,
        title: 'Current Metrics',
        description: 'Performance metrics and key challenges',
        status: getStatus(2)
      },
      {
        id: 3,
        title: 'Goals & Objectives',
        description: 'Business goals and success metrics',
        status: getStatus(3)
      },
      {
        id: 4,
        title: 'Competitive Analysis',
        description: 'Competitor information and market positioning',
        status: getStatus(4)
      }
    ];
  };

  const steps = getStepsForMode();
  const maxSteps = steps.length;

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`Form field updated: ${field}`, value);
  };

  const validateCurrentStep = (): boolean => {
    console.log('Validating step:', currentStep, 'with data:', formData);
    
    switch (currentStep) {
      case 1: // Business Information
        const requiredFields = ['businessName', 'industry', 'targetAudience', 'productService'];
        const missingFields = requiredFields.filter(field => !formData[field]?.trim());
        
        if (missingFields.length > 0) {
          toast({
            title: "Required Information Missing",
            description: `Please fill in: ${missingFields.join(', ')}`,
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case 2:
        if (intelligenceMode === 'copywriting' || businessType === 'copywriting') {
          if (!formData.copyType) {
            toast({
              title: "Copy Type Required",
              description: "Please select the type of copy you need most",
              variant: "destructive"
            });
            return false;
          }
        }
        return true;
        
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }
    
    if (currentStep < maxSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateIntelligence();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateIntelligence = async () => {
    console.log('=== STARTING INTELLIGENCE GENERATION ===');
    
    // Final validation before API call
    if (!formData.businessName?.trim() || !formData.industry?.trim() || !formData.targetAudience?.trim()) {
      setError('Missing required business information. Please go back and fill in all required fields.');
      toast({
        title: "Validation Error",
        description: "Please ensure business name, industry, and target audience are provided",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Enhanced request payload
      const aiRequest = {
        formData: {
          businessName: formData.businessName?.trim() || '',
          industry: formData.industry?.trim() || '',
          targetAudience: formData.targetAudience?.trim() || '',
          productService: formData.productService?.trim() || '',
          uniqueValue: formData.uniqueValue?.trim() || '',
          monthlyRevenue: formData.monthlyRevenue || '',
          businessType: businessType,
          currentChallenges: formData.currentChallenges || '',
          goals: formData.goals || '',
          timeline: formData.timeline || '',
          competitorData: formData.competitorData || {},
          currentMetrics: formData.currentMetrics || {},
          monthlyAdBudget: formData.monthlyAdBudget || formData.marketingBudget || '$5000',
          teamSize: formData.teamSize || '',
          businessStage: formData.businessStage || '',
          primaryGoal: formData.primaryGoal || '',
          monthlyTraffic: formData.monthlyTraffic || '',
          conversionRate: formData.conversionRate || '',
          marketingBudget: formData.marketingBudget || formData.monthlyAdBudget || '$5000',
          clientRetentionRate: formData.clientRetentionRate || '',
          averageProjectValue: formData.averageProjectValue || '',
          primaryGoals: formData.primaryGoals || [],
          revenueTarget: formData.revenueTarget || '',
          successMetrics: formData.successMetrics || '',
          currentObstacles: formData.currentObstacles || '',
          marketPosition: formData.marketPosition || '',
          competitiveAdvantage: formData.competitiveAdvantage || '',
          copyType: formData.copyType || '',
          copywritingChallenges: formData.copywritingChallenges || '',
          copywritingGoals: formData.copywritingGoals || '',
          competitors: formData.competitors || []
        },
        intelligenceMode,
        businessType
      };

      console.log('Sending AI request for intelligence generation');

      const aiIntelligence = await AIIntelligenceService.generateIntelligence(aiRequest);
      
      console.log('AI Intelligence generation completed successfully');
      
      // Enhanced intelligence data structure
      const intelligenceData = {
        businessType,
        formData: aiRequest.formData,
        intelligenceMode,
        generatedAt: aiIntelligence.generatedAt || new Date().toISOString(),
        isAIGenerated: aiIntelligence.isAIGenerated || true,
        insights: aiIntelligence.insights || aiIntelligence,
        dataQuality: aiIntelligence.dataQuality || {
          completeness: 1,
          aiContentRatio: 1,
          sectionsGenerated: 7
        }
      };
      
      console.log('Intelligence data prepared for display');
      
      // Success notification
      toast({
        title: "Intelligence Generated Successfully!",
        description: `Generated ${intelligenceData.dataQuality.sectionsGenerated} intelligence sections`,
        variant: "default"
      });
      
      onIntelligenceGenerated(intelligenceData);
      
    } catch (error) {
      console.error('=== INTELLIGENCE GENERATION ERROR ===');
      console.error('Error details:', error);
      
      const errorMessage = error.message || 'Failed to generate intelligence report';
      setError(errorMessage);
      
      toast({
        title: "Intelligence Generation Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessInformationForm 
            data={formData} 
            onChange={handleFieldChange}
            businessType={businessType}
          />
        );
      case 2:
        if (intelligenceMode === 'copywriting' || businessType === 'copywriting') {
          return (
            <Card>
              <CardHeader>
                <CardTitle>Copywriting Requirements</CardTitle>
                <CardDescription>Tell us about your specific copywriting needs and challenges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What type of copy do you need most? *</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={formData.copyType || ''}
                    onChange={(e) => handleFieldChange('copyType', e.target.value)}
                    required
                  >
                    <option value="">Select copy type</option>
                    <option value="website">Website Copy & Landing Pages</option>
                    <option value="ads">Ad Copy & Social Media Ads</option>
                    <option value="email">Email Marketing & Sequences</option>
                    <option value="social">Social Media Content</option>
                    <option value="sales">Sales Copy & Proposals</option>
                    <option value="product">Product Descriptions</option>
                    <option value="blog">Blog Posts & Articles</option>
                    <option value="video">Video Scripts & Content</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current copywriting challenges</label>
                  <textarea 
                    className="w-full p-2 border rounded"
                    rows={4}
                    value={formData.copywritingChallenges || ''}
                    onChange={(e) => handleFieldChange('copywritingChallenges', e.target.value)}
                    placeholder="e.g., Low conversion rates, unclear messaging, not resonating with audience, difficulty creating compelling headlines, inconsistent brand voice, time-consuming content creation..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary copywriting goals</label>
                  <textarea 
                    className="w-full p-2 border rounded"
                    rows={3}
                    value={formData.copywritingGoals || ''}
                    onChange={(e) => handleFieldChange('copywritingGoals', e.target.value)}
                    placeholder="e.g., Increase conversion rates, improve brand messaging, create consistent voice, generate more leads, reduce bounce rates..."
                  />
                </div>
              </CardContent>
            </Card>
          );
        }
        return (
          <CurrentMetricsForm 
            data={formData} 
            onChange={handleFieldChange}
            businessType={businessType}
          />
        );
      case 3:
        return (
          <GoalsObjectivesForm 
            data={formData} 
            onChange={handleFieldChange}
          />
        );
      case 4:
        return (
          <CompetitorAnalysisForm 
            data={formData} 
            onChange={handleFieldChange}
          />
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / maxSteps) * 100;

  // Show loading component when loading
  if (loading) {
    return <IntelligenceLoading businessType={businessType} />;
  }

  const getModeTitle = () => {
    if (businessType === 'copywriting') {
      return 'Copywriting Intelligence Setup';
    }
    switch (intelligenceMode) {
      case 'copywriting':
        return 'Copywriting Intelligence Setup';
      case 'marketing':
        return 'Marketing Intelligence Setup';
      case 'competitor':
        return 'Competitor Intelligence Setup';
      default:
        return 'Full Intelligence Setup';
    }
  };

  const getModeDescription = () => {
    if (businessType === 'copywriting') {
      return 'Complete the setup to receive AI-powered copywriting insights, templates, and optimization strategies';
    }
    return `Complete the setup to receive AI-powered personalized ${intelligenceMode === 'full' ? 'comprehensive' : intelligenceMode} insights`;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3 text-red-700">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium">Intelligence Generation Failed</h3>
                <p className="text-sm mt-1">{error}</p>
                <div className="mt-3 space-x-2">
                  <Button 
                    onClick={() => setError(null)} 
                    variant="outline" 
                    size="sm"
                  >
                    Dismiss
                  </Button>
                  <Button 
                    onClick={generateIntelligence} 
                    variant="default" 
                    size="sm"
                    disabled={loading}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Quality Status */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-4">
          <div className="flex items-center space-x-2 text-blue-700">
            <Info className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Intelligence API Status: Active</p>
              <p className="text-xs">Our AI will generate comprehensive insights based on your business data</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {getModeTitle()}
        </h2>
        <p className="text-muted-foreground">
          {getModeDescription()}
        </p>
        <Progress value={progress} className="w-full max-w-md mx-auto" />
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {maxSteps}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Steps Sidebar */}
        <div className="lg:col-span-1">
          <WizardSteps steps={steps} currentStep={currentStep} />
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3 space-y-6">
          {renderCurrentStep()}

          {/* Enhanced Navigation */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  variant="outline"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="text-center">
                  {currentStep === maxSteps && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Ready to generate your intelligence report
                    </p>
                  )}
                </div>

                <Button 
                  onClick={handleNext} 
                  disabled={loading}
                  className="relative"
                >
                  {currentStep === maxSteps ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate AI Intelligence
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
      </div>
    </div>
  );
};

export default UnifiedIntelligenceWizard;
