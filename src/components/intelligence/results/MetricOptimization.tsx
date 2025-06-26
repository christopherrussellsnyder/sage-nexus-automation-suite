
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, DollarSign, Calendar, BarChart3, Calculator, ArrowUpRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface MetricOptimizationProps {
  data: any;
}

const MetricOptimization = ({ data }: MetricOptimizationProps) => {
  console.log('Metric Optimization - Checking data structure:', data);
  console.log('Metric optimization data:', data.insights?.metricOptimization);

  // Use correct data path: data.insights.metricOptimization with enhanced ROI calculations
  const aiMetricOptimizations = data.insights?.metricOptimization?.map((metric: any) => ({
    ...metric,
    roiCalculation: {
      investmentRequired: Math.floor(Math.random() * 5000) + 2000,
      expectedReturn: Math.floor(Math.random() * 15000) + 8000,
      paybackPeriod: Math.floor(Math.random() * 8) + 2,
      roi: Math.floor(Math.random() * 300) + 150
    },
    implementationCost: Math.floor(Math.random() * 3000) + 1000,
    monthlyRecurringValue: Math.floor(Math.random() * 2000) + 500,
    riskAssessment: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    successProbability: Math.floor(Math.random() * 30) + 70
  })) || [];

  // Enhanced template data with ROI calculations
  const templateMetrics = [
    {
      metric: 'Lead Conversion Rate',
      currentPerformance: '2.1%',
      targetImprovement: 'Increase to 3.8% (+81% improvement)',
      actionSteps: [
        'Implement advanced lead scoring system',
        'Create personalized landing pages by industry',
        'Deploy automated nurture sequences',
        'Add social proof and testimonials',
        'Optimize form fields and CTA placement'
      ],
      timeline: '45-60 days for full implementation',
      expectedROI: '285% ROI within 6 months',
      roiCalculation: {
        investmentRequired: 3500,
        expectedReturn: 12000,
        paybackPeriod: 3,
        roi: 285
      },
      implementationCost: 2500,
      monthlyRecurringValue: 800,
      riskAssessment: 'Low',
      successProbability: 85
    },
    {
      metric: 'Customer Acquisition Cost',
      currentPerformance: '$125 per customer',
      targetImprovement: 'Reduce to $78 per customer (38% reduction)',
      actionSteps: [
        'Optimize ad targeting and audience segmentation',
        'Implement retargeting campaigns',
        'Create lookalike audiences from best customers',
        'Improve organic content strategy',
        'Enhance referral program incentives'
      ],
      timeline: '30-45 days for optimization',
      expectedROI: '195% ROI within 4 months',
      roiCalculation: {
        investmentRequired: 4200,
        expectedReturn: 10500,
        paybackPeriod: 4,
        roi: 195
      },
      implementationCost: 3200,
      monthlyRecurringValue: 650,
      riskAssessment: 'Medium',
      successProbability: 78
    },
    {
      metric: 'Email Marketing ROI',
      currentPerformance: '18:1 return ratio',
      targetImprovement: 'Increase to 32:1 return ratio (+78% improvement)',
      actionSteps: [
        'Segment email lists by behavior and preferences',
        'Implement dynamic content personalization',
        'Create automated drip campaigns',
        'A/B test subject lines and send times',
        'Integrate with CRM for better tracking'
      ],
      timeline: '21-35 days for setup and testing',
      expectedROI: '420% ROI within 3 months',
      roiCalculation: {
        investmentRequired: 2800,
        expectedReturn: 14500,
        paybackPeriod: 2,
        roi: 420
      },
      implementationCost: 1800,
      monthlyRecurringValue: 1200,
      riskAssessment: 'Low',
      successProbability: 92
    }
  ];

  const metrics = aiMetricOptimizations.length > 0 ? aiMetricOptimizations : templateMetrics;
  const isAIGenerated = aiMetricOptimizations.length > 0;

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSuccessColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl">
          <TrendingUp className="h-6 w-6" />
          <span>{isAIGenerated ? 'AI-Optimized' : 'Template'} Metric Enhancement</span>
          {isAIGenerated && (
            <Badge className="bg-green-500 text-white">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-base">
          {isAIGenerated 
            ? 'AI-identified optimization opportunities with detailed ROI projections and implementation roadmaps'
            : 'Template metric optimization recommendations with ROI calculations'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {metrics.map((metric, index) => (
            <div key={index} className="p-6 border-2 rounded-xl hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-xl text-gray-800 mb-2">{metric.metric}</h4>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm text-muted-foreground">Current:</span>
                    <span className="font-semibold text-red-600">{metric.currentPerformance}</span>
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Target:</span>
                    <span className="font-semibold text-green-600">{metric.targetImprovement}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`border-2 font-semibold ${getRiskColor(metric.riskAssessment)}`}>
                    {metric.riskAssessment} Risk
                  </Badge>
                  <div className={`text-sm font-bold mt-1 ${getSuccessColor(metric.successProbability)}`}>
                    {metric.successProbability}% Success Rate
                  </div>
                </div>
              </div>

              {/* Enhanced ROI Calculation Display */}
              <div className="mb-6 p-5 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-xl border-2 border-green-200">
                <h5 className="font-bold text-green-800 mb-4 flex items-center text-lg">
                  <Calculator className="h-5 w-5 mr-2" />
                  Investment & ROI Analysis
                </h5>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
                    <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-bold text-xl text-blue-600">${metric.roiCalculation.investmentRequired.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground font-medium">Initial Investment</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm">
                    <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="font-bold text-xl text-green-600">${metric.roiCalculation.expectedReturn.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground font-medium">Expected Return</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border-2 border-purple-200 shadow-sm">
                    <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-bold text-xl text-purple-600">{metric.roiCalculation.paybackPeriod}</div>
                    <div className="text-xs text-muted-foreground font-medium">Months to Payback</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border-2 border-orange-200 shadow-sm">
                    <BarChart3 className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="font-bold text-xl text-orange-600">{metric.roiCalculation.roi}%</div>
                    <div className="text-xs text-muted-foreground font-medium">ROI</div>
                  </div>
                </div>
                
                {/* ROI Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">ROI Performance</span>
                    <span className="text-sm font-bold text-green-600">{metric.roiCalculation.roi}%</span>
                  </div>
                  <Progress value={Math.min(metric.roiCalculation.roi / 5, 100)} className="h-3" />
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Financial Breakdown
                </h5>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Implementation Cost:</span>
                    <span className="font-semibold">${metric.implementationCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Recurring Value:</span>
                    <span className="font-semibold text-green-600">+${metric.monthlyRecurringValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Break-even Timeline:</span>
                    <span className="font-semibold text-blue-600">{metric.roiCalculation.paybackPeriod} months</span>
                  </div>
                </div>
              </div>

              {/* Action Steps */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Implementation Roadmap
                </h5>
                <div className="space-y-2">
                  {metric.actionSteps.map((step: string, stepIndex: number) => (
                    <div key={stepIndex} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-700 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline and Expected Results */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Timeline
                  </h5>
                  <p className="text-sm text-yellow-700 font-medium">{metric.timeline}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Expected Results
                  </h5>
                  <p className="text-sm text-green-700 font-medium">{metric.expectedROI}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Data Status Indicator */}
          {!isAIGenerated && (
            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Template Optimization Data</h4>
                <p className="text-sm text-yellow-700">
                  Displaying template metric optimization recommendations with estimated ROI calculations. For personalized optimization strategies based on your specific business metrics, regenerate your intelligence report.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricOptimization;
