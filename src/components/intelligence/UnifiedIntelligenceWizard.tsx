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

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface UnifiedIntelligenceWizardProps {
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
  onIntelligenceGenerated: (data: any) => void;
}

const UnifiedIntelligenceWizard = ({ businessType, onIntelligenceGenerated }: UnifiedIntelligenceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const steps: Step[] = [
    {
      id: 1,
      title: 'Business Information',
      description: 'Basic business details and industry information',
      status: (currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming') as 'completed' | 'current' | 'upcoming'
    },
    {
      id: 2,
      title: 'Current Metrics',
      description: 'Performance metrics and key challenges',
      status: (currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming') as 'completed' | 'current' | 'upcoming'
    },
    {
      id: 3,
      title: 'Goals & Objectives',
      description: 'Business goals and success metrics',
      status: (currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming') as 'completed' | 'current' | 'upcoming'
    },
    {
      id: 4,
      title: 'Competitive Analysis',
      description: 'Competitor information and market positioning',
      status: (currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'upcoming') as 'completed' | 'current' | 'upcoming'
    }
  ];

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
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
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockIntelligenceData = {
        businessType,
        formData,
        generatedAt: new Date().toISOString(),
        // Mock data structure - would be replaced with actual AI-generated insights
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

  const progress = (currentStep / 4) * 100;

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <Sparkles className="h-12 w-12 mx-auto text-blue-500 animate-spin" />
            <h3 className="text-xl font-semibold">Generating Intelligence Report</h3>
            <p className="text-muted-foreground">
              Analyzing your business data and generating personalized insights...
            </p>
            <Progress value={85} className="w-full max-w-md mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {businessType.charAt(0).toUpperCase() + businessType.slice(1)} Intelligence Setup
        </h2>
        <p className="text-muted-foreground">
          Complete the setup to receive personalized intelligence insights
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
                  {currentStep === 4 ? (
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
