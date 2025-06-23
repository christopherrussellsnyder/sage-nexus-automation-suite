
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Zap, BarChart3, Lightbulb } from 'lucide-react';

interface BusinessData {
  businessName: string;
  industry: string;
  targetAudience: string;
  productService: string;
  uniqueValue: string;
  monthlyRevenue: string;
  monthlyVisitors: number;
  conversionRate: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  marketingBudget: number;
  primaryGoals: string[];
  currentChallenges: string[];
  competitorUrls: string[];
  focusAreas: string[];
}

interface UnifiedIntelligenceWizardProps {
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
  onIntelligenceGenerated: (data: any) => void;
}

const UnifiedIntelligenceWizard = ({ businessType, onIntelligenceGenerated }: UnifiedIntelligenceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [businessData, setBusinessData] = useState<BusinessData>({
    businessName: '',
    industry: '',
    targetAudience: '',
    productService: '',
    uniqueValue: '',
    monthlyRevenue: '',
    monthlyVisitors: 0,
    conversionRate: 0,
    averageOrderValue: 0,
    customerLifetimeValue: 0,
    marketingBudget: 0,
    primaryGoals: [],
    currentChallenges: [],
    competitorUrls: [],
    focusAreas: []
  });

  const totalSteps = 4;

  const getBusinessTypeConfig = () => {
    switch (businessType) {
      case 'ecommerce':
        return {
          title: 'E-commerce Intelligence Setup',
          description: 'Optimize your online store with AI-powered insights',
          goals: ['Increase conversion rate', 'Reduce cart abandonment', 'Improve product discovery', 'Boost average order value', 'Enhance customer retention'],
          challenges: ['Low conversion rates', 'High cart abandonment', 'Poor product visibility', 'Ineffective marketing', 'Customer acquisition costs'],
          focusAreas: ['Product research', 'Competitor analysis', 'Marketing campaigns', 'Customer journey optimization', 'Pricing strategy']
        };
      case 'agency':
        return {
          title: 'Agency Intelligence Setup',
          description: 'Scale your agency with data-driven client management',
          goals: ['Improve client retention', 'Increase project profitability', 'Streamline workflows', 'Better lead qualification', 'Scale operations'],
          challenges: ['Client churn', 'Project scope creep', 'Inefficient processes', 'Poor lead quality', 'Resource management'],
          focusAreas: ['Client analytics', 'Lead scoring', 'Project management', 'Performance tracking', 'ROI optimization']
        };
      case 'sales':
        return {
          title: 'Sales Intelligence Setup',
          description: 'Accelerate your sales process with intelligent insights',
          goals: ['Increase close rates', 'Reduce sales cycle', 'Better lead qualification', 'Improve pipeline management', 'Scale sales team'],
          challenges: ['Low close rates', 'Long sales cycles', 'Poor lead quality', 'Ineffective follow-up', 'Pipeline visibility'],
          focusAreas: ['Prospect research', 'Deal tracking', 'Email sequences', 'Performance analytics', 'Conversion optimization']
        };
      case 'copywriting':
        return {
          title: 'Copy Intelligence Setup',
          description: 'Optimize your content with performance-driven insights',
          goals: ['Improve conversion rates', 'Increase engagement', 'Better A/B test results', 'Enhance brand voice', 'Scale content creation'],
          challenges: ['Low conversion rates', 'Poor engagement', 'Ineffective copy', 'Brand inconsistency', 'Content scaling issues'],
          focusAreas: ['Copy performance', 'A/B testing', 'Metric analysis', 'Competitive research', 'Content optimization']
        };
      default:
        return {
          title: 'Intelligence Setup',
          description: 'Set up your AI-powered business intelligence',
          goals: [],
          challenges: [],
          focusAreas: []
        };
    }
  };

  const config = getBusinessTypeConfig();

  const handleGoalToggle = (goal: string) => {
    setBusinessData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }));
  };

  const handleChallengeToggle = (challenge: string) => {
    setBusinessData(prev => ({
      ...prev,
      currentChallenges: prev.currentChallenges.includes(challenge)
        ? prev.currentChallenges.filter(c => c !== challenge)
        : [...prev.currentChallenges, challenge]
    }));
  };

  const handleFocusAreaToggle = (area: string) => {
    setBusinessData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const generateIntelligence = async () => {
    setIsGenerating(true);
    setProgress(0);

    const steps = [
      'Analyzing business data and metrics...',
      'Researching competitor strategies...',
      'Identifying performance gaps...',
      'Generating optimization recommendations...',
      'Creating comprehensive intelligence report...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProgress((i + 1) * 20);
    }

    // Generate comprehensive intelligence data
    const intelligenceData = {
      businessData,
      businessType,
      performanceAnalysis: {
        strengths: [
          'Strong brand positioning in target market',
          'Good customer retention rates',
          'Effective use of social media platforms'
        ],
        weaknesses: [
          'Below-average conversion rates for industry',
          'Limited email marketing automation',
          'Inconsistent content publishing schedule'
        ],
        opportunities: [
          '15% improvement potential in conversion rates',
          'Untapped mobile traffic optimization',
          'Cross-selling opportunities with existing customers'
        ],
        threats: [
          'Increasing competition in target keywords',
          'Rising customer acquisition costs',
          'Market saturation in primary demographic'
        ]
      },
      metricInsights: {
        conversionRate: {
          current: businessData.conversionRate,
          industry: 2.4,
          target: businessData.conversionRate * 1.5,
          recommendations: [
            'Optimize landing page load speed',
            'A/B test call-to-action buttons',
            'Implement exit-intent popups',
            'Add social proof elements'
          ]
        },
        customerAcquisitionCost: {
          current: businessData.marketingBudget / (businessData.monthlyVisitors * (businessData.conversionRate / 100)),
          target: businessData.customerLifetimeValue * 0.33,
          recommendations: [
            'Focus on high-converting traffic sources',
            'Improve organic search rankings',
            'Optimize ad targeting parameters'
          ]
        }
      },
      optimizationPlan: {
        immediate: [
          'Implement conversion rate optimization testing',
          'Set up comprehensive analytics tracking',
          'Audit current marketing channels performance'
        ],
        shortTerm: [
          'Launch A/B testing program for key pages',
          'Develop customer segmentation strategy',
          'Create automated email sequences'
        ],
        longTerm: [
          'Build comprehensive customer data platform',
          'Implement advanced personalization',
          'Scale successful marketing channels'
        ]
      }
    };

    setIsGenerating(false);
    onIntelligenceGenerated(intelligenceData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Tell us about your business to customize insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your business name"
                    value={businessData.businessName}
                    onChange={(e) => setBusinessData({...businessData, businessName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., SaaS, E-commerce, Consulting"
                    value={businessData.industry}
                    onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="Describe your ideal customers"
                  value={businessData.targetAudience}
                  onChange={(e) => setBusinessData({...businessData, targetAudience: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productService">Main Product/Service</Label>
                <Input
                  id="productService"
                  placeholder="What do you offer?"
                  value={businessData.productService}
                  onChange={(e) => setBusinessData({...businessData, productService: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                <Textarea
                  id="uniqueValue"
                  placeholder="What makes you different from competitors?"
                  value={businessData.uniqueValue}
                  onChange={(e) => setBusinessData({...businessData, uniqueValue: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Business Metrics</CardTitle>
              <CardDescription>Provide current performance data for accurate analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
                  <Select value={businessData.monthlyRevenue} onValueChange={(value) => setBusinessData({...businessData, monthlyRevenue: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10k">$0 - $10K</SelectItem>
                      <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                      <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                      <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                      <SelectItem value="500k+">$500K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthlyVisitors">Monthly Website Visitors</Label>
                  <Input
                    id="monthlyVisitors"
                    type="number"
                    placeholder="e.g., 10000"
                    value={businessData.monthlyVisitors}
                    onChange={(e) => setBusinessData({...businessData, monthlyVisitors: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                  <Input
                    id="conversionRate"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 2.5"
                    value={businessData.conversionRate}
                    onChange={(e) => setBusinessData({...businessData, conversionRate: parseFloat(e.target.value) || 0})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="averageOrderValue">Average Order Value ($)</Label>
                  <Input
                    id="averageOrderValue"
                    type="number"
                    placeholder="e.g., 150"
                    value={businessData.averageOrderValue}
                    onChange={(e) => setBusinessData({...businessData, averageOrderValue: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerLifetimeValue">Customer Lifetime Value ($)</Label>
                  <Input
                    id="customerLifetimeValue"
                    type="number"
                    placeholder="e.g., 500"
                    value={businessData.customerLifetimeValue}
                    onChange={(e) => setBusinessData({...businessData, customerLifetimeValue: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="marketingBudget">Monthly Marketing Budget ($)</Label>
                  <Input
                    id="marketingBudget"
                    type="number"
                    placeholder="e.g., 5000"
                    value={businessData.marketingBudget}
                    onChange={(e) => setBusinessData({...businessData, marketingBudget: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Goals & Challenges</CardTitle>
              <CardDescription>Select your primary objectives and current challenges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Primary Goals</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  {config.goals.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={businessData.primaryGoals.includes(goal)}
                        onCheckedChange={() => handleGoalToggle(goal)}
                      />
                      <Label htmlFor={goal} className="text-sm">{goal}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Current Challenges</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  {config.challenges.map((challenge) => (
                    <div key={challenge} className="flex items-center space-x-2">
                      <Checkbox
                        id={challenge}
                        checked={businessData.currentChallenges.includes(challenge)}
                        onCheckedChange={() => handleChallengeToggle(challenge)}
                      />
                      <Label htmlFor={challenge} className="text-sm">{challenge}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Focus Areas</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  {config.focusAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={businessData.focusAreas.includes(area)}
                        onCheckedChange={() => handleFocusAreaToggle(area)}
                      />
                      <Label htmlFor={area} className="text-sm">{area}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Generate Intelligence Report</CardTitle>
              <CardDescription>Review your information and generate comprehensive insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isGenerating ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Business Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      {businessData.businessName} - {businessData.industry} business targeting {businessData.targetAudience}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monthly Revenue: {businessData.monthlyRevenue} | Conversion Rate: {businessData.conversionRate}%
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Selected Goals ({businessData.primaryGoals.length})</h4>
                    <div className="flex flex-wrap gap-1">
                      {businessData.primaryGoals.slice(0, 3).map((goal) => (
                        <Badge key={goal} variant="secondary" className="text-xs">{goal}</Badge>
                      ))}
                      {businessData.primaryGoals.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{businessData.primaryGoals.length - 3} more</Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Focus Areas ({businessData.focusAreas.length})</h4>
                    <div className="flex flex-wrap gap-1">
                      {businessData.focusAreas.slice(0, 3).map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">{area}</Badge>
                      ))}
                      {businessData.focusAreas.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{businessData.focusAreas.length - 3} more</Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={generateIntelligence}
                    className="w-full"
                    size="lg"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Generate Intelligence Report
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <Brain className="h-12 w-12 mx-auto text-blue-500 mb-4 animate-pulse" />
                    <h4 className="text-lg font-semibold">Generating Intelligence Report...</h4>
                    <p className="text-sm text-muted-foreground">Analyzing your business data and generating insights</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{config.title}</h3>
          <p className="text-muted-foreground">{config.description}</p>
        </div>
        <Badge variant="outline">
          Step {currentStep} of {totalSteps}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Setup Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} />
      </div>

      {/* Current Step */}
      {renderStep()}

      {/* Navigation */}
      {!isGenerating && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < totalSteps && (
            <Button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            >
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UnifiedIntelligenceWizard;
