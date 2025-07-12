
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, CheckCircle, AlertTriangle } from 'lucide-react';

interface MetricOptimizationProps {
  data: any;
  businessType?: string;
}

const MetricOptimization = ({ data, businessType }: MetricOptimizationProps) => {
  const metricOptimization = data.metricOptimization || [];

  const getMetricColor = (current: number, target: number) => {
    if (!current || !target) return 'text-gray-600';
    const ratio = current / target;
    if (ratio >= 0.8) return 'text-green-600';
    if (ratio >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricIcon = (current: number, target: number) => {
    if (!current || !target) return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    const ratio = current / target;
    if (ratio >= 0.8) return <CheckCircle className="h-4 w-4 text-green-600" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
  };

  const getProgressValue = (current: number, target: number) => {
    if (!current || !target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getOptimizationTitle = () => {
    switch (businessType) {
      case 'copywriting':
        return 'AI Copywriting Performance Targets';
      case 'agency':
        return 'AI Agency Performance Targets';
      case 'sales':
        return 'AI Sales Performance Targets';
      default:
        return 'AI Metric Optimization Targets';
    }
  };

  const getOptimizationDescription = () => {
    switch (businessType) {
      case 'copywriting':
        return 'AI-generated copywriting performance improvement strategies and client success benchmarks';
      case 'agency':
        return 'AI-generated agency performance improvement strategies for client results and business growth';
      case 'sales':
        return 'AI-generated sales performance improvement strategies and deal-closing benchmarks';
      default:
        return 'AI-generated performance improvement strategies and benchmarks';
    }
  };

  if (!metricOptimization || metricOptimization.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>{getOptimizationTitle()}</span>
          </CardTitle>
          <CardDescription>
            {getOptimizationDescription()} not available. Please regenerate the report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No AI-generated metric optimization found in the current report.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>{getOptimizationTitle()}</span>
        </CardTitle>
        <CardDescription>
          {getOptimizationDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metricOptimization.map((metric: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{metric.metric || 'Metric Name'}</h3>
                <div className="flex items-center space-x-2">
                  {getMetricIcon(metric.currentBenchmark, metric.targetBenchmark)}
                  <span className={`text-sm font-medium ${getMetricColor(metric.currentBenchmark, metric.targetBenchmark)}`}>
                    {metric.currentBenchmark || 'N/A'} → {metric.targetBenchmark || 'N/A'}
                  </span>
                </div>
              </div>
              
              {metric.currentBenchmark && metric.targetBenchmark && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current Progress</span>
                    <span>{Math.round(getProgressValue(metric.currentBenchmark, metric.targetBenchmark))}%</span>
                  </div>
                  <Progress value={getProgressValue(metric.currentBenchmark, metric.targetBenchmark)} />
                </div>
              )}
              
              {metric.improvementStrategies && metric.improvementStrategies.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>AI Improvement Strategies</span>
                  </h4>
                  <ul className="space-y-2">
                    {metric.improvementStrategies.map((strategy: string, i: number) => (
                      <li key={i} className="text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {metric.timeline && (
                  <div>
                    <Badge variant="outline" className="mb-1">Timeline</Badge>
                    <p className="text-muted-foreground">{metric.timeline}</p>
                  </div>
                )}
                {metric.expectedROI && (
                  <div>
                    <Badge variant="outline" className="mb-1">Expected ROI</Badge>
                    <p className="text-green-600 font-medium">{metric.expectedROI}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-purple-50 rounded border border-purple-200">
          <p className="text-sm text-purple-800">
            <strong>AI-Powered Optimization:</strong> These metric targets and improvement strategies are generated 
            by AI analysis of your current performance, industry benchmarks, and growth opportunities specific to your {businessType || 'business'}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricOptimization;
