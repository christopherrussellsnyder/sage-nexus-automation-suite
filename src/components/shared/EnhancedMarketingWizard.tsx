
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Target, BarChart3 } from 'lucide-react';
import { CompetitorAnalysisService } from '@/services/CompetitorAnalysisService';
import { MarketingSolutionGenerator } from '@/services/MarketingSolutionGenerator';
import ApiKeySetup from '../ApiKeySetup';

interface EnhancedMarketingWizardProps {
  onCreateSolution: (data: any) => void;
  isCreating: boolean;
  progress: number;
}

const EnhancedMarketingWizard = ({ onCreateSolution, isCreating, progress }: EnhancedMarketingWizardProps) => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    businessType: '',
    targetAudience: '',
    productPrice: '',
    productDescription: '',
    monthlyUsers: '',
    conversionRate: '',
    budget: '',
    timeline: '',
    campaignGoal: '',
    marketingType: 'paid' as 'paid' | 'organic'
  });
  
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [analyzingData, setAnalyzingData] = useState(false);

  const generateSolution = async () => {
    const apiKey = CompetitorAnalysisService.getApiKey();
    if (!apiKey) {
      setShowApiSetup(true);
      return;
    }

    setAnalyzingData(true);
    try {
      const businessData = {
        businessName: formData.businessName,
        industry: formData.industry,
        businessType: formData.businessType,
        targetAudience: formData.targetAudience,
        productPrice: Number(formData.productPrice),
        productDescription: formData.productDescription,
        monthlyUsers: Number(formData.monthlyUsers),
        conversionRate: Number(formData.conversionRate),
        budget: Number(formData.budget),
        timeline: formData.timeline,
        campaignGoal: formData.campaignGoal,
        marketingType: formData.marketingType
      };

      console.log('Analyzing competitors for:', businessData);
      
      // Step 1: Analyze competitors
      const competitorData = await CompetitorAnalysisService.analyzeCompetitors(
        businessData.industry,
        businessData.businessType,
        businessData.targetAudience,
        businessData.productPrice,
        businessData.budget
      );

      console.log('Competitor analysis complete:', competitorData);

      // Step 2: Generate comprehensive marketing solution
      const marketingSolution = await MarketingSolutionGenerator.generateComprehensiveSolution(
        businessData,
        competitorData
      );

      console.log('Marketing solution generated:', marketingSolution);

      onCreateSolution({
        businessData,
        competitorData,
        marketingSolution,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error generating marketing solution:', error);
    } finally {
      setAnalyzingData(false);
    }
  };

  const canGenerate = formData.businessName && 
                     formData.industry && 
                     formData.businessType &&
                     formData.targetAudience && 
                     formData.productPrice &&
                     formData.productDescription &&
                     formData.monthlyUsers &&
                     formData.conversionRate &&
                     formData.budget &&
                     formData.campaignGoal;

  return (
    <>
      <ApiKeySetup 
        isVisible={showApiSetup}
        onApiKeySet={() => {
          setShowApiSetup(false);
          generateSolution();
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Advanced Marketing Intelligence Generator</span>
          </CardTitle>
          <CardDescription>
            AI-powered marketing solutions with real competitor analysis and 30-day detailed plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCreating ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Generating Your Marketing Solution...</h3>
                <Progress value={progress} className="w-full mb-4" />
                <p className="text-sm text-muted-foreground">
                  {progress < 25 && "Scraping competitor websites and ad libraries..."}
                  {progress >= 25 && progress < 50 && "Analyzing top performing ads and organic content..."}
                  {progress >= 50 && progress < 75 && "Generating personalized 30-day marketing plan..."}
                  {progress >= 75 && "Creating optimization recommendations..."}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Business Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      placeholder="Your business name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry/Niche</Label>
                    <Input
                      id="industry"
                      placeholder="e.g., Fitness, SaaS, E-commerce"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Input
                      id="businessType"
                      placeholder="e.g., B2B Service, D2C Product, Coaching"
                      value={formData.businessType}
                      onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      placeholder="e.g., Small business owners 25-45"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product/Service Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productPrice">Product/Service Price ($)</Label>
                    <Input
                      id="productPrice"
                      type="number"
                      placeholder="Enter price"
                      value={formData.productPrice}
                      onChange={(e) => setFormData({...formData, productPrice: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyUsers">Monthly Website Visitors</Label>
                    <Input
                      id="monthlyUsers"
                      type="number"
                      placeholder="Enter monthly visitors"
                      value={formData.monthlyUsers}
                      onChange={(e) => setFormData({...formData, monthlyUsers: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="conversionRate">Current Conversion Rate (%)</Label>
                    <Input
                      id="conversionRate"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 2.5"
                      value={formData.conversionRate}
                      onChange={(e) => setFormData({...formData, conversionRate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Monthly Marketing Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="Enter budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="productDescription">Product/Service Description</Label>
                  <Textarea
                    id="productDescription"
                    placeholder="Describe what you sell and its key benefits"
                    value={formData.productDescription}
                    onChange={(e) => setFormData({...formData, productDescription: e.target.value})}
                  />
                </div>
              </div>

              {/* Campaign Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Campaign Configuration</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="campaignGoal">Campaign Goal</Label>
                    <Select 
                      value={formData.campaignGoal} 
                      onValueChange={(value) => setFormData({...formData, campaignGoal: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead-generation">Lead Generation</SelectItem>
                        <SelectItem value="sales-conversion">Sales Conversion</SelectItem>
                        <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                        <SelectItem value="website-traffic">Website Traffic</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeline">Campaign Timeline</Label>
                    <Select 
                      value={formData.timeline} 
                      onValueChange={(value) => setFormData({...formData, timeline: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="3-months">3 Months</SelectItem>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="12-months">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Marketing Strategy Type</Label>
                  <RadioGroup 
                    value={formData.marketingType} 
                    onValueChange={(value: 'paid' | 'organic') => setFormData({...formData, marketingType: value})}
                    className="flex space-x-8 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paid" id="paid" />
                      <Label htmlFor="paid">Paid Advertising (Facebook, Google, TikTok, Instagram)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organic" id="organic" />
                      <Label htmlFor="organic">Organic Content Marketing</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button 
                onClick={generateSolution}
                disabled={!canGenerate || analyzingData}
                className="w-full"
                size="lg"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                {analyzingData ? 'Analyzing Competitors & Generating Solution...' : 'Generate Complete Marketing Solution'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default EnhancedMarketingWizard;
