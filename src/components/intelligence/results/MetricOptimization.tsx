
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Zap,
  Clock,
  DollarSign,
  Users,
  MousePointer,
  Eye,
  ArrowUp,
  ArrowDown,
  AlertTriangle
} from 'lucide-react';

interface MetricOptimizationProps {
  data: any;
}

const MetricOptimization = ({ data }: MetricOptimizationProps) => {
  // Ensure we access the correct data structure
  const metricOptimization = Array.isArray(data.metricOptimization) 
    ? data.metricOptimization 
    : [];
  
  console.log('MetricOptimization - Full data:', data);
  console.log('MetricOptimization - Metric optimization array:', metricOptimization);

  const getMetricIcon = (metric: string) => {
    const lowerMetric = metric?.toLowerCase() || '';
    if (lowerMetric.includes('conversion')) return <MousePointer className="h-5 w-5 text-purple-600" />;
    if (lowerMetric.includes('roas') || lowerMetric.includes('return')) return <TrendingUp className="h-5 w-5 text-green-600" />;
    if (lowerMetric.includes('cpm') || lowerMetric.includes('cost')) return <DollarSign className="h-5 w-5 text-blue-600" />;
    if (lowerMetric.includes('engagement')) return <Users className="h-5 w-5 text-orange-600" />;
    if (lowerMetric.includes('reach') || lowerMetric.includes('impression')) return <Eye className="h-5 w-5 text-indigo-600" />;
    return <BarChart3 className="h-5 w-5 text-gray-600" />;
  };

  const parseMetricValue = (value: string | number): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      // Remove common symbols and convert to number
      const cleanValue = value.replace(/[%$,x]/g, '');
      const numValue = parseFloat(cleanValue);
      return isNaN(numValue) ? 0 : numValue;
    }
    return 0;
  };

  const getProgressPercentage = (current: string | number, target: string | number): number => {
    const currentNum = parseMetricValue(current);
    const targetNum = parseMetricValue(target);
    
    if (targetNum === 0) return 0;
    return Math.min((currentNum / targetNum) * 100, 100);
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImprovementDirection = (current: string | number, target: string | number) => {
    const currentNum = parseMetricValue(current);
    const targetNum = parseMetricValue(target);
    
    if (targetNum > currentNum) {
      return { icon: <ArrowUp className="h-4 w-4 text-green-600" />, color: 'text-green-600', direction: 'increase' };
    } else if (targetNum < currentNum) {
      return { icon: <ArrowDown className="h-4 w-4 text-blue-600" />, color: 'text-blue-600', direction: 'decrease' };
    } else {
      return { icon: <Target className="h-4 w-4 text-gray-600" />, color: 'text-gray-600', direction: 'maintain' };
    }
  };

  if (!Array.isArray(metricOptimization) || metricOptimization.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>AI Metric Optimization Targets</span>
          </CardTitle>
          <CardDescription>AI-generated performance improvement strategies and benchmarks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <BarChart3 className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-700 mb-2">No Metric Optimization Data</h3>
            <p className="text-sm text-yellow-600 mb-4">
              The AI metric optimization analysis was not generated or is missing from the response.
            </p>
            <p className="text-xs text-yellow-600">
              Please regenerate the report to get comprehensive performance optimization strategies.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>AI Metric Optimization Targets</span>
        </CardTitle>
        <CardDescription>
          AI-generated performance improvement strategies and benchmarks ({metricOptimization.length} metrics analyzed)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metricOptimization.map((metric: any, index: number) => {
            const progressPercentage = getProgressPercentage(metric.currentBenchmark, metric.targetBenchmark);
            const improvement = getImprovementDirection(metric.currentBenchmark, metric.targetBenchmark);
            
            return (
              <Card key={`${metric.metric}-${index}`} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getMetricIcon(metric.metric)}
                      <div>
                        <h3 className="font-semibold text-lg">{metric.metric}</h3>
                        {metric.timeline && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{metric.timeline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Current:</span>
                          <span className="font-semibold">{metric.currentBenchmark}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Target:</span>
                          <span className="font-semibold text-blue-600">{metric.targetBenchmark}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {improvement.icon}
                        <span className={`text-sm font-medium ${improvement.color}`}>
                          {improvement.direction}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Visualization */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Current Progress to Target</span>
                      <span className={`text-sm font-semibold ${getProgressColor(progressPercentage)}`}>
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Starting Point</span>
                      <span>Target Achievement</span>
                    </div>
                  </div>

                  {/* Expected ROI */}
                  {metric.expectedROI && (
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Expected ROI Impact</span>
                      </div>
                      <p className="text-sm text-green-600">{metric.expectedROI}</p>
                    </div>
                  )}

                  {/* AI Improvement Strategies */}
                  {metric.improvementStrategies && metric.improvementStrategies.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">AI Improvement Strategies</span>
                      </div>
                      <div className="space-y-2">
                        {metric.improvementStrategies.map((strategy: string, strategyIndex: number) => (
                          <div key={strategyIndex} className="flex items-start space-x-2 bg-blue-50 p-3 rounded border border-blue-200">
                            <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {strategyIndex + 1}
                            </div>
                            <span className="text-sm text-blue-700">{strategy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline and ROI Summary */}
                  {(metric.timeline || metric.expectedROI) && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded border border-purple-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {metric.timeline && (
                          <div>
                            <span className="font-medium text-purple-700">Timeline: </span>
                            <span className="text-purple-600">{metric.timeline}</span>
                          </div>
                        )}
                        {metric.expectedROI && (
                          <div>
                            <span className="font-medium text-purple-700">Expected ROI: </span>
                            <span className="text-purple-600">{metric.expectedROI}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* AI-Generated Notice */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200 mt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-green-100 text-green-700">AI-Generated</Badge>
              <span className="text-sm font-medium text-green-700">Metric Optimization Analysis</span>
            </div>
            <p className="text-sm text-green-600">
              These metric targets and improvement strategies are generated by AI analysis of your current performance, 
              industry benchmarks, and growth opportunities specific to your business.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricOptimization;
