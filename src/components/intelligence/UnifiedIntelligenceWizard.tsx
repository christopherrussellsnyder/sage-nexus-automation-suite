
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import WizardSteps from './wizard/WizardSteps';
import BusinessInformationForm from './wizard/BusinessInformationForm';
import CurrentMetricsForm from './wizard/CurrentMetricsForm';
import GoalsObjectivesForm from './wizard/GoalsObjectivesForm';
import CompetitorAnalysisForm from './wizard/CompetitorAnalysisForm';
import IntelligenceLoading from './IntelligenceLoading';
import { AIIntelligenceService } from '@/services/AIIntelligenceService';
import { useToast } from '@/components/ui/use-toast';

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface UnifiedIntelligenceWizardProps {
  businessType: 'ecommerce' | 'agency' | 'sales';
  onIntelligenceGenerated: (data: any) => void;
  intelligenceMode?: 'full' | 'marketing' | 'competitor';
}

interface FormData {
  [key: string]: any;
}

const UnifiedIntelligenceWizard = ({ 
  businessType, 
  onIntelligenceGenerated,
  intelligenceMode = 'full'
}: UnifiedIntelligenceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
        description: 'Basic business details and copywriting requirements',
        status: getStatus(1)
      }
    ];

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
          description: 'Business goals and copy objectives',
          status: getStatus(3)
        }
      ];
    }

    // Full intelligence mode (includes comprehensive copywriting)
    return [
      ...baseSteps,
      {
        id: 2,
        title: 'Current Metrics',
        description: 'Performance metrics and copy performance',
        status: getStatus(2)
      },
      {
        id: 3,
        title: 'Goals & Objectives',
        description: 'Business goals and copy objectives',
        status: getStatus(3)
      },
      {
        id: 4,
        title: 'Competitive Analysis',
        description: 'Competitor information and copy analysis',
        status: getStatus(4)
      }
    ];
  };

  const steps = getStepsForMode();
  const maxSteps = steps.length;

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
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
    setLoading(true);
    
    try {
      console.log('Starting AI intelligence generation with comprehensive copywriting...');
      
      const aiRequest = {
        formData: {
          businessName: formData.businessName || '',
          industry: formData.industry || '',
          targetAudience: formData.targetAudience || '',
          productService: formData.productService || '',
          uniqueValue: formData.uniqueValue || '',
          monthlyRevenue: formData.monthlyRevenue || '',
          businessType: businessType,
          currentChallenges: formData.currentChallenges,
          goals: formData.goals,
          timeline: formData.timeline,
          competitorData: formData.competitorData,
          currentMetrics: formData.currentMetrics,
          // Always include copywriting requirements
          copywritingNeeds: {
            website: true,
            ads: true,
            email: true,
            social: true,
            targetTone: formData.targetTone || 'professional',
            brandVoice: formData.brandVoice || 'authoritative'
          }
        },
        intelligenceMode,
        businessType,
        includeCopywriting: true // Always include comprehensive copywriting
      };

      const aiIntelligence = await AIIntelligenceService.generateIntelligence(aiRequest);
      
      const intelligenceData = {
        businessType,
        formData,
        intelligenceMode,
        generatedAt: new Date().toISOString(),
        aiGenerated: true,
        insights: aiIntelligence
      };
      
      console.log('AI intelligence with copywriting generated successfully');
      onIntelligenceGenerated(intelligenceData);
      
    } catch (error) {
      console.error('Error generating AI intelligence:', error);
      toast({
        title: "Error generating intelligence",
        description: error.message || "Please check your API configuration and try again",
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

  if (loading) {
    return <IntelligenceLoading businessType={businessType} />;
  };

  const getModeTitle = () => {
    switch (intelligenceMode) {
      case 'marketing':
        return 'Marketing + Copy Intelligence Setup';
      case 'competitor':
        return 'Competitor + Copy Intelligence Setup';
      default:
        return 'Full Intelligence + Copy Suite Setup';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {getModeTitle()}
        </h2>
        <p className="text-muted-foreground">
          Complete the setup to receive AI-powered {intelligenceMode === 'full' ? 'comprehensive' : intelligenceMode} insights with advanced copywriting analysis
        </p>
        <Progress value={progress} className="w-full max-w-md mx-auto" />
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Steps Sidebar */}
        <div className="lg:col-span-1">
          <WizardSteps steps={steps} currentStep={currentStep} />
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3 space-y-6">
          {renderCurrentStep()}

          {/* Navigation */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  variant="outline"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button onClick={handleNext}>
                  {currentStep === maxSteps ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Intelligence + Copy
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
