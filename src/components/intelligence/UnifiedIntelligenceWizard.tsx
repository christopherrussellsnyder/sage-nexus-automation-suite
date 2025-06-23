
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
}

const UnifiedIntelligenceWizard = ({ 
  businessType, 
  onIntelligenceGenerated,
  intelligenceMode = 'full'
}: UnifiedIntelligenceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({});

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
        description: 'Basic business details and industry information',
        status: getStatus(1)
      }
    ];

    if (intelligenceMode === 'copywriting') {
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

    // Full intelligence mode
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const mockIntelligenceData = {
        businessType,
        formData,
        intelligenceMode,
        generatedAt: new Date().toISOString(),
        insights: {
          overview: 'Comprehensive intelligence analysis complete',
          recommendations: [],
          metrics: {},
          competitorAnalysis: {},
          optimization: {}
        }
      };
      
      onIntelligenceGenerated(mockIntelligenceData);
    } catch (error) {
      console.error('Error generating intelligence:', error);
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
          />
        );
      case 2:
        if (intelligenceMode === 'copywriting') {
          return (
            <Card>
              <CardHeader>
                <CardTitle>Copy Requirements</CardTitle>
                <CardDescription>Tell us about your specific copywriting needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What type of copy do you need?</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={formData.copyType || ''}
                    onChange={(e) => handleFieldChange('copyType', e.target.value)}
                  >
                    <option value="">Select copy type</option>
                    <option value="website">Website Copy</option>
                    <option value="ads">Ad Copy</option>
                    <option value="email">Email Marketing</option>
                    <option value="social">Social Media Content</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current challenges with your copy</label>
                  <textarea 
                    className="w-full p-2 border rounded"
                    rows={3}
                    value={formData.copywritingChallenges || ''}
                    onChange={(e) => handleFieldChange('copywritingChallenges', e.target.value)}
                    placeholder="e.g., Low conversion rates, unclear messaging, not resonating with audience..."
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

  if (loading) {
    return <IntelligenceLoading businessType={businessType} />;
  }

  const getModeTitle = () => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {businessType.charAt(0).toUpperCase() + businessType.slice(1)} {getModeTitle()}
        </h2>
        <p className="text-muted-foreground">
          Complete the setup to receive personalized {intelligenceMode === 'full' ? 'comprehensive' : intelligenceMode} insights
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
                      Generate Intelligence
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
