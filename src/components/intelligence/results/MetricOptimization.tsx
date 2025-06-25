
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface MetricOptimizationProps {
  data: any;
}

const MetricOptimization = ({ data }: MetricOptimizationProps) => {
  console.log('Metric Optimization - Checking data structure:', data);
  console.log('AI Metric data:', data.insights?.metricOptimization);

  // Use correct data path: data.insights.metricOptimization
  const aiMetricOptimization = data.insights?.metricOptimization || [];
  const isAIGenerated = aiMetricOptimization.length > 0;

  const businessType = data.businessType || 'general';
  const industry = data.formData?.industry || 'general';

  console.log('Using AI metric data:', isAIGenerated);
  console.log('Metric count:', aiMetricOptimization.length);

  const getOptimizationMetrics = () => {
    // If we have AI data, use it, otherwise generate template metrics
    if (isAIGenerated) {
      return aiMetricOptimization.map((metric: any) => ({
        metric: metric.metric,
        targetBenchmark: parseFloat(metric.industryBenchmark?.currentPosition?.replace('%', '') || '3.0'),
        currentAnalysis: metric.currentAnalysis,
        targetImprovement: metric.targetImprovement,
        optimizationProtocol: metric.optimizationProtocol || [],
        roiCalculation: metric.roiCalculation,
        warningThresholds: {
          poor: 1.0,
          average: 2.5,
          good: 4.0,
          excellent: 6.0
        },
        improvementStrategies: metric.optimizationProtocol?.map((step: any) => step.action) || [
          'Optimize conversion funnel',
          'Implement A/B testing',
          'Improve targeting accuracy'
        ],
        priority: 'High'
      }));
    }

    // Template metrics for fallback
    const baseMetrics = [
      {
        metric: 'Conversion Rate',
        targetBenchmark: getTargetByIndustry('conversion', industry),
        warningThresholds: {
          poor: 1.0,
          average: 2.5,
          good: 4.0,
          excellent: 6.0
        },
        improvementStrategies: [
          'Optimize landing page load speed and mobile experience',
          'A/B test headlines and call-to-action buttons',
          'Implement social proof and testimonials',
          'Reduce form fields and simplify checkout process',
          'Add urgency elements like limited-time offers'
        ],
        priority: 'High'
      },
      {
        metric: 'Cost Per Click (CPC)',
        targetBenchmark: getTargetByIndustry('cpc', industry),
        warningThresholds: {
          poor: 5.0,
          average: 3.0,
          good: 2.0,
          excellent: 1.0
        },
        improvementStrategies: [
          'Improve ad relevance and quality scores',
          'Target more specific, long-tail keywords',
          'Optimize ad scheduling for peak performance hours',
          'Refine audience targeting to reduce competition',
          'Use negative keywords to filter irrelevant traffic'
        ],
        priority: 'Medium'
      },
      {
        metric: 'Return on Ad Spend (ROAS)',
        targetBenchmark: getTargetByIndustry('roas', industry),
        warningThresholds: {
          poor: 2.0,
          average: 3.0,
          good: 4.0,
          excellent: 5.0
        },
        improvementStrategies: [
          'Focus budget on highest-performing campaigns',
          'Implement dynamic product ads for better targeting',
          'Optimize for lifetime value, not just initial purchase',
          'Use retargeting campaigns to re-engage warm audiences',
          'Create lookalike audiences based on best customers'
        ],
        priority: 'High'
      }
    ];

    // Add business-specific metrics
    if (businessType === 'ecommerce') {
      baseMetrics.push({
        metric: 'Average Order Value (AOV)',
        targetBenchmark: getTargetByIndustry('aov', industry),
        warningThresholds: {
          poor: 50,
          average: 75,
          good: 100,
          excellent: 150
        },
        improvementStrategies: [
          'Implement product bundling strategies',
          'Add upsell and cross-sell recommendations',
          'Offer free shipping thresholds',
          'Create volume discount incentives',
          'Use exit-intent popups with special offers'
        ],
        priority: 'High'
      });
    }

    return baseMetrics;
  };

  const getTargetByIndustry = (metric: string, industry: string): number => {
    const targets: Record<string, Record<string, number>> = {
      'ecommerce': {
        conversion: 4.5,
        cpc: 1.8,
        roas: 4.2,
        ctr: 3.8,
        aov: 120
      },
      'saas': {
        conversion: 3.2,
        cpc: 2.5,
        roas: 3.8,
        ctr: 2.9,
        aov: 250
      },
      'fitness': {
        conversion: 5.1,
        cpc: 2.1,
        roas: 4.8,
        ctr: 4.2,
        aov: 85
      },
      'coaching': {
        conversion: 6.2,
        cpc: 3.2,
        roas: 5.5,
        ctr: 3.5,
        aov: 350
      }
    };

    return targets[industry]?.[metric] || targets['ecommerce'][metric] || 3.0;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const metrics = getOptimizationMetrics();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>{isAIGenerated ? 'AI-Generated' : 'Template'} Metric Optimization</span>
        </CardTitle>
        <CardDescription>
          {isAIGenerated 
            ? `AI-powered optimization targets and strategies for your ${businessType} business`
            : `Industry benchmarks and actionable strategies to improve your ${businessType} performance`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">{metric.metric}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        className={`${getPriorityColor(metric.priority)} text-white`}
                        variant="secondary"
                      >
                        {metric.priority} Priority
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Target: <span className="font-medium text-blue-600">
                          {metric.metric.includes('Rate') || metric.metric.includes('CTR') ? 
                            `${metric.targetBenchmark}%` : 
                            metric.metric.includes('Cost') || metric.metric.includes('AOV') ? 
                              `$${metric.targetBenchmark}` : 
                              `${metric.targetBenchmark}x`
                          }
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI-specific analysis */}
              {isAIGenerated && metric.currentAnalysis && (
                <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1">AI Current Analysis</h5>
                  <p className="text-sm text-blue-700">{metric.currentAnalysis}</p>
                  {metric.targetImprovement && (
                    <div className="mt-2">
                      <span className="font-medium text-blue-800">Target Improvement: </span>
                      <span className="text-sm text-blue-700">{metric.targetImprovement}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Optimization Protocol (AI) or Improvement Strategies (Template) */}
              <div>
                <h5 className="font-medium mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  {isAIGenerated ? 'AI Optimization Protocol' : 'Improvement Strategies'}
                </h5>
                <ul className="space-y-2">
                  {(isAIGenerated ? metric.optimizationProtocol : metric.improvementStrategies)?.map((item: any, strategyIndex: number) => (
                    <li key={strategyIndex} className="flex items-start space-x-2 text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div className="flex-1">
                        {isAIGenerated ? (
                          <div>
                            <span className="font-medium">Step {item.step}: </span>
                            <span className="text-muted-foreground">{item.action}</span>
                            {item.expectedImpact && (
                              <div className="mt-1">
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                  {item.expectedImpact}
                                </Badge>
                              </div>
                            )}
                            {item.timeline && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Timeline: {item.timeline}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">{item}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ROI Calculation (AI only) */}
              {isAIGenerated && metric.roiCalculation && (
                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">ROI Calculation</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Investment Required: </span>
                      <span className="text-green-700">${metric.roiCalculation.investmentRequired?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">Expected Return: </span>
                      <span className="text-green-700">${metric.roiCalculation.expectedReturn?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">Payback Period: </span>
                      <span className="text-green-700">{metric.roiCalculation.paybackPeriod}</span>
                    </div>
                    <div>
                      <span className="font-medium">Long-term Value: </span>
                      <span className="text-green-700">{metric.roiCalculation.longTermValue}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Template thresholds (for template data only) */}
              {!isAIGenerated && metric.warningThresholds && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded border">
                    <div className="text-red-600 font-semibold">
                      {metric.metric.includes('Rate') || metric.metric.includes('CTR') ? 
                        `<${metric.warningThresholds.poor}%` : 
                        metric.metric.includes('Cost') || metric.metric.includes('AOV') ? 
                          `>$${metric.warningThresholds.poor}` : 
                          `<${metric.warningThresholds.poor}x`
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">Poor</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded border">
                    <div className="text-yellow-600 font-semibold">
                      {metric.metric.includes('Rate') || metric.metric.includes('CTR') ? 
                        `${metric.warningThresholds.average}%` : 
                        metric.metric.includes('Cost') || metric.metric.includes('AOV') ? 
                          `$${metric.warningThresholds.average}` : 
                          `${metric.warningThresholds.average}x`
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">Average</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded border">
                    <div className="text-blue-600 font-semibold">
                      {metric.metric.includes('Rate') || metric.metric.includes('CTR') ? 
                        `${metric.warningThresholds.good}%` : 
                        metric.metric.includes('Cost') || metric.metric.includes('AOV') ? 
                          `$${metric.warningThresholds.good}` : 
                          `${metric.warningThresholds.good}x`
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">Good</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded border">
                    <div className="text-green-600 font-semibold">
                      {metric.metric.includes('Rate') || metric.metric.includes('CTR') ? 
                        `${metric.warningThresholds.excellent}%+` : 
                        metric.metric.includes('Cost') || metric.metric.includes('AOV') ? 
                          `$${metric.warningThresholds.excellent}+` : 
                          `${metric.warningThresholds.excellent}x+`
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">Excellent</div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Data Status Indicator */}
          {!isAIGenerated && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                ⚠️ Displaying template metric optimization - AI analysis not available
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricOptimization;
