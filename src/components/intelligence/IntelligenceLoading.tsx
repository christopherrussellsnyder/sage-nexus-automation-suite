
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Brain, BarChart3, Target, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IntelligenceLoadingProps {
  businessType: string;
}

const IntelligenceLoading = ({ businessType }: IntelligenceLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, text: `Analyzing ${businessType} business data...` },
    { icon: BarChart3, text: 'Processing performance metrics...' },
    { icon: Target, text: 'Identifying optimization opportunities...' },
    { icon: Lightbulb, text: 'Generating strategic recommendations...' },
    { icon: Sparkles, text: 'Finalizing intelligence report...' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        return Math.min(newProgress, 95);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full mx-auto">
        <CardContent className="py-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CurrentIcon className="h-16 w-16 text-blue-500 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">Generating Intelligence Report</h3>
              <p className="text-muted-foreground text-lg">
                {steps[currentStep].text}
              </p>
            </div>
            
            <div className="space-y-2">
              <Progress value={progress} className="w-full max-w-md mx-auto h-3" />
              <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
            </div>

            <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg border transition-colors ${
                    index <= currentStep 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <step.icon className={`h-4 w-4 mx-auto ${
                    index <= currentStep ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center space-x-2 text-blue-700">
                <Sparkles className="h-4 w-4" />
                <p className="text-sm font-medium">AI is generating comprehensive insights for your business</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligenceLoading;
