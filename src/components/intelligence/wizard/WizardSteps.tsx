
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface WizardStepsProps {
  steps: Step[];
  currentStep: number;
}

const WizardSteps = ({ steps, currentStep }: WizardStepsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Intelligence Setup Progress</CardTitle>
        <CardDescription>Complete each step to generate your intelligence report</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center space-x-3">
              {step.status === 'completed' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className={`h-5 w-5 ${step.status === 'current' ? 'text-blue-500' : 'text-gray-300'}`} />
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-medium ${step.status === 'current' ? 'text-blue-600' : ''}`}>
                    {step.title}
                  </h4>
                  {step.status === 'current' && (
                    <Badge variant="default" className="text-xs">Current</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WizardSteps;
