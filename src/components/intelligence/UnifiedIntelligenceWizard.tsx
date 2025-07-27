
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import WizardSteps from './wizard/WizardSteps';
import BusinessInformationForm from './wizard/BusinessInformationForm';
import ClientInformationForm from './wizard/ClientInformationForm';
import ClientCurrentMetricsForm from './wizard/ClientCurrentMetricsForm';
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
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
  onIntelligenceGenerated: (data: any) => void;
  intelligenceMode?: 'full' | 'copywriting' | 'marketing' | 'competitor';
}

interface FormData {
  [key: string]: any;
  copyType?: string;
  copywritingChallenges?: string;
  clientDetails?: any;
  idealCustomerProfile?: any;
  productToSell?: string;
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

  const getStepsForBusinessType = (): Step[] => {
    const getStatus = (stepId: number): 'completed' | 'current' | 'upcoming' => {
      if (currentStep > stepId) return 'completed';
      if (currentStep === stepId) return 'current';
      return 'upcoming';
    };

    const baseSteps: Step[] = [
      {
        id: 1,
        title: 'Business Information',
        description: getBusinessInfoDescription(),
        status: getStatus(1)
      }
    ];

    switch (businessType) {
      case 'copywriting':
        return [
          ...baseSteps,
          {
            id: 2,
            title: 'Client Details',
            description: 'Information about the client you\'re writing copy for',
            status: getStatus(2)
          },
          {
            id: 3,
            title: 'Current Metrics',
            description: 'Copy performance and client challenges',
            status: getStatus(3)
          },
          {
            id: 4,
            title: 'Goals & Objectives',
            description: 'Copywriting goals and success metrics',
            status: getStatus(4)
          }
        ];
        
      case 'agency':
        return [
          ...baseSteps,
          {
            id: 2,
            title: 'Client Information',
            description: 'Details about your client (optional - can skip)',
            status: getStatus(2)
          },
          {
            id: 3,
            title: 'Client Current Metrics',
            description: 'Client performance metrics and challenges',
            status: getStatus(3)
          },
          {
            id: 4,
            title: 'Current Metrics',
            description: 'Agency performance metrics',
            status: getStatus(4)
          },
          {
            id: 5,
            title: 'Goals & Objectives',
            description: 'Agency growth and client success goals',
            status: getStatus(5)
          },
          {
            id: 6,
            title: 'Competitive Analysis',
            description: 'Agency and client industry competition',
            status: getStatus(6)
          }
        ];
        
      case 'sales':
        return [
          ...baseSteps,
          {
            id: 2,
            title: 'Ideal Customer Profile',
            description: 'Details about who you want to sell to',
            status: getStatus(2)
          },
          {
            id: 3,
            title: 'Current Metrics',
            description: 'Sales performance and challenges',
            status: getStatus(3)
          },
          {
            id: 4,
            title: 'Goals & Objectives',
            description: 'Sales goals and success metrics',
            status: getStatus(4)
          }
        ];
        
      default: // ecommerce
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
    }
  };

  const getBusinessInfoDescription = () => {
    switch (businessType) {
      case 'copywriting':
        return 'Your copywriting business details and services';
      case 'agency':
        return 'Your marketing agency information and services';
      case 'sales':
        return 'Your sales organization and industry details';
      default:
        return 'Basic business details and industry information';
    }
  };

  const steps = getStepsForBusinessType();
  const maxSteps = steps.length;

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      // Handle nested field paths like 'clientDetails.businessName'
      if (field.includes('.')) {
        const keys = field.split('.');
        let current = newData;
        
        // Navigate to the nested object, creating it if it doesn't exist
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        
        // Set the final value
        current[keys[keys.length - 1]] = value;
      } else {
        // Handle simple field paths
        newData[field] = value;
      }
      
      return newData;
    });
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

  const handleSkipClientInfo = () => {
    if (businessType === 'agency' && currentStep === 2) {
      // Skip both client info and client metrics when skipping
      setCurrentStep(prev => prev + 2);
    }
  };

  const generateIntelligence = async () => {
    setLoading(true);
    
    try {
      console.log('Starting AI intelligence generation...');
      
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
          clientDetails: formData.clientDetails,
          idealCustomerProfile: formData.idealCustomerProfile,
          productToSell: formData.productToSell
        },
        intelligenceMode,
        businessType: businessType as 'ecommerce' | 'agency' | 'sales' | 'copywriting'
      };

      const aiIntelligence = await AIIntelligenceService.generateIntelligence(aiRequest);
      
      console.log('AI intelligence generated successfully');
      onIntelligenceGenerated(aiIntelligence);
      
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
    switch (businessType) {
      case 'copywriting':
        switch (currentStep) {
          case 1:
            return <BusinessInformationForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 2:
            return <ClientInformationForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 3:
            return <CurrentMetricsForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 4:
            return <GoalsObjectivesForm data={formData} onChange={handleFieldChange} />;
          default:
            return null;
        }
        
      case 'agency':
        switch (currentStep) {
          case 1:
            return <BusinessInformationForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 2:
            return <ClientInformationForm data={formData} onChange={handleFieldChange} businessType={businessType} onSkip={handleSkipClientInfo} />;
          case 3:
            return <ClientCurrentMetricsForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 4:
            return <CurrentMetricsForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 5:
            return <GoalsObjectivesForm data={formData} onChange={handleFieldChange} />;
          case 6:
            return <CompetitorAnalysisForm data={formData} onChange={handleFieldChange} />;
          default:
            return null;
        }
        
      case 'sales':
        switch (currentStep) {
          case 1:
            return <BusinessInformationForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 2:
            return <ClientInformationForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 3:
            return <CurrentMetricsForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 4:
            return <GoalsObjectivesForm data={formData} onChange={handleFieldChange} />;
          default:
            return null;
        }
        
      default: // ecommerce
        switch (currentStep) {
          case 1:
            return <BusinessInformationForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 2:
            return <CurrentMetricsForm data={formData} onChange={handleFieldChange} businessType={businessType} />;
          case 3:
            return <GoalsObjectivesForm data={formData} onChange={handleFieldChange} />;
          case 4:
            return <CompetitorAnalysisForm data={formData} onChange={handleFieldChange} />;
          default:
            return null;
        }
    }
  };

  const progress = (currentStep / maxSteps) * 100;

  if (loading) {
    return <IntelligenceLoading businessType={businessType} />;
  }

  const getModeTitle = () => {
    const businessTitles = {
      copywriting: 'Copywriting Intelligence Setup',
      agency: 'Marketing Agency Intelligence Setup',
      sales: 'Sales Intelligence Setup',
      ecommerce: 'E-commerce Intelligence Setup'
    };
    
    return businessTitles[businessType] || 'Intelligence Setup';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{getModeTitle()}</h2>
        <p className="text-muted-foreground">
          Complete the setup to receive AI-powered personalized insights for your {businessType} business
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
