
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LoadingStateProps {
  title: string;
  progress: number;
  currentStep?: string;
}

const LoadingState = ({ title, progress, currentStep }: LoadingStateProps) => {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Progress value={progress} className="w-full" />
          {currentStep && (
            <p className="text-sm text-muted-foreground">{currentStep}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
