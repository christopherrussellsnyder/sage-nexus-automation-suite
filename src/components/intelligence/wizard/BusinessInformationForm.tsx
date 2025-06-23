
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BusinessInformationFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
  businessType: 'ecommerce' | 'agency' | 'sales';
}

const BusinessInformationForm = ({ data, onChange, businessType }: BusinessInformationFormProps) => {
  const getIndustryOptions = () => {
    if (businessType === 'ecommerce') {
      return [
        { value: 'fashion', label: 'Fashion & Apparel' },
        { value: 'electronics', label: 'Electronics & Tech' },
        { value: 'health', label: 'Health & Beauty' },
        { value: 'home', label: 'Home & Garden' },
        { value: 'sports', label: 'Sports & Fitness' },
        { value: 'food', label: 'Food & Beverage' },
        { value: 'jewelry', label: 'Jewelry & Accessories' },
        { value: 'automotive', label: 'Automotive Parts' }
      ];
    } else if (businessType === 'agency') {
      return [
        { value: 'digital-marketing', label: 'Digital Marketing' },
        { value: 'advertising', label: 'Advertising Agency' },
        { value: 'social-media', label: 'Social Media Marketing' },
        { value: 'seo-sem', label: 'SEO/SEM Services' },
        { value: 'content-marketing', label: 'Content Marketing' },
        { value: 'branding', label: 'Branding & Design' },
        { value: 'pr', label: 'Public Relations' },
        { value: 'full-service', label: 'Full-Service Agency' }
      ];
    } else {
      return [
        { value: 'saas', label: 'SaaS & Technology' },
        { value: 'real-estate', label: 'Real Estate' },
        { value: 'insurance', label: 'Insurance' },
        { value: 'finance', label: 'Financial Services' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'education', label: 'Education & Training' },
        { value: 'consulting', label: 'Business Consulting' },
        { value: 'automotive', label: 'Automotive Sales' }
      ];
    }
  };

  const getBusinessStageOptions = () => {
    if (businessType === 'ecommerce') {
      return [
        { value: 'startup', label: 'New Store (0-6 months)' },
        { value: 'growing', label: 'Growing (6 months - 2 years)' },
        { value: 'established', label: 'Established (2+ years)' },
        { value: 'scaling', label: 'Scaling (Multi-million revenue)' }
      ];
    } else if (businessType === 'agency') {
      return [
        { value: 'freelancer', label: 'Solo Freelancer' },
        { value: 'small-agency', label: 'Small Agency (2-10 employees)' },
        { value: 'mid-agency', label: 'Mid-size Agency (10-50 employees)' },
        { value: 'large-agency', label: 'Large Agency (50+ employees)' }
      ];
    } else {
      return [
        { value: 'individual', label: 'Individual Sales Rep' },
        { value: 'small-team', label: 'Small Sales Team (2-5 reps)' },
        { value: 'large-team', label: 'Large Sales Team (5+ reps)' },
        { value: 'enterprise', label: 'Enterprise Sales Organization' }
      ];
    }
  };

  const getPrimaryGoalOptions = () => {
    if (businessType === 'ecommerce') {
      return [
        { value: 'increase-sales', label: 'Increase Online Sales' },
        { value: 'customer-acquisition', label: 'Acquire New Customers' },
        { value: 'improve-conversion', label: 'Improve Conversion Rate' },
        { value: 'reduce-cart-abandonment', label: 'Reduce Cart Abandonment' },
        { value: 'increase-aov', label: 'Increase Average Order Value' },
        { value: 'expand-market', label: 'Expand to New Markets' }
      ];
    } else if (businessType === 'agency') {
      return [
        { value: 'client-acquisition', label: 'Acquire New Clients' },
        { value: 'increase-revenue', label: 'Increase Agency Revenue' },
        { value: 'improve-roi', label: 'Improve Client ROI' },
        { value: 'scale-operations', label: 'Scale Operations' },
        { value: 'retention', label: 'Improve Client Retention' },
        { value: 'specialization', label: 'Develop Industry Specialization' }
      ];
    } else {
      return [
        { value: 'close-more-deals', label: 'Close More Deals' },
        { value: 'generate-leads', label: 'Generate More Leads' },
        { value: 'shorten-cycle', label: 'Shorten Sales Cycle' },
        { value: 'increase-deal-size', label: 'Increase Average Deal Size' },
        { value: 'improve-pipeline', label: 'Improve Pipeline Management' },
        { value: 'territory-expansion', label: 'Expand Sales Territory' }
      ];
    }
  };

  const getFormTitle = () => {
    switch (businessType) {
      case 'ecommerce':
        return 'E-commerce Business Information';
      case 'agency':
        return 'Marketing Agency Information';
      case 'sales':
        return 'Sales Organization Information';
      default:
        return 'Business Information';
    }
  };

  const getFormDescription = () => {
    switch (businessType) {
      case 'ecommerce':
        return 'Tell us about your e-commerce store to generate personalized product and marketing intelligence';
      case 'agency':
        return 'Tell us about your agency to generate client acquisition and campaign optimization strategies';
      case 'sales':
        return 'Tell us about your sales process to generate prospect research and conversion optimization insights';
      default:
        return 'Tell us about your business to generate personalized intelligence and content';
    }
  };

  const industryOptions = getIndustryOptions();
  const businessStageOptions = getBusinessStageOptions();
  const primaryGoalOptions = getPrimaryGoalOptions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getFormTitle()}</CardTitle>
        <CardDescription>{getFormDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">
              {businessType === 'sales' ? 'Company Name' : businessType === 'agency' ? 'Agency Name' : 'Store Name'}
            </Label>
            <Input
              id="businessName"
              placeholder={businessType === 'sales' ? 'Your company name' : businessType === 'agency' ? 'Your agency name' : 'Your store name'}
              value={data.businessName || ''}
              onChange={(e) => onChange('businessName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">
              {businessType === 'agency' ? 'Agency Specialization' : 'Industry/Niche'}
            </Label>
            <Select value={data.industry || ''} onValueChange={(value) => onChange('industry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience">
            {businessType === 'ecommerce' ? 'Target Customer Demographics' : 
             businessType === 'agency' ? 'Ideal Client Profile' : 
             'Target Prospect Profile'}
          </Label>
          <Input
            id="targetAudience"
            placeholder={
              businessType === 'ecommerce' ? 'e.g., Women aged 25-45, fashion-conscious, disposable income $50k+' :
              businessType === 'agency' ? 'e.g., Small businesses, $500k-5M revenue, need digital marketing help' :
              'e.g., Decision makers at mid-size companies, budget authority, pain points with current solution'
            }
            value={data.targetAudience || ''}
            onChange={(e) => onChange('targetAudience', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productService">
            {businessType === 'ecommerce' ? 'Product Catalog Description' : 
             businessType === 'agency' ? 'Services Offered' : 
             'Product/Service You Sell'}
          </Label>
          <Textarea
            id="productService"
            placeholder={
              businessType === 'ecommerce' ? 'Describe your main product categories, price ranges, and unique selling points' :
              businessType === 'agency' ? 'Describe your core services, specializations, and what makes you different' :
              'Describe what you sell, key benefits, and how it solves customer problems'
            }
            value={data.productService || ''}
            onChange={(e) => onChange('productService', e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue">
              {businessType === 'ecommerce' ? 'Monthly Store Revenue' : 
               businessType === 'agency' ? 'Monthly Agency Revenue' : 
               'Monthly Sales Revenue'}
            </Label>
            <Select value={data.monthlyRevenue || ''} onValueChange={(value) => onChange('monthlyRevenue', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10k">$0 - $10,000</SelectItem>
                <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                <SelectItem value="500k+">$500,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyAdBudget">
              {businessType === 'ecommerce' ? 'Monthly Marketing Budget' : 
               businessType === 'agency' ? 'Average Client Ad Spend' : 
               'Monthly Marketing Budget'}
            </Label>
            <Select value={data.monthlyAdBudget || ''} onValueChange={(value) => onChange('monthlyAdBudget', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-500">$0 - $500</SelectItem>
                <SelectItem value="500-2k">$500 - $2,000</SelectItem>
                <SelectItem value="2k-5k">$2,000 - $5,000</SelectItem>
                <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k+">$25,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teamSize">
              {businessType === 'ecommerce' ? 'Store Team Size' : 
               businessType === 'agency' ? 'Agency Team Size' : 
               'Sales Team Size'}
            </Label>
            <Select value={data.teamSize || ''} onValueChange={(value) => onChange('teamSize', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Just me</SelectItem>
                <SelectItem value="2-5">2-5 people</SelectItem>
                <SelectItem value="6-20">6-20 people</SelectItem>
                <SelectItem value="21-50">21-50 people</SelectItem>
                <SelectItem value="50+">50+ people</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessStage">
              {businessType === 'ecommerce' ? 'Store Stage' : 
               businessType === 'agency' ? 'Agency Stage' : 
               'Sales Organization Stage'}
            </Label>
            <Select value={data.businessStage || ''} onValueChange={(value) => onChange('businessStage', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {businessStageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryGoal">
            {businessType === 'ecommerce' ? 'Primary E-commerce Goal' : 
             businessType === 'agency' ? 'Primary Agency Goal' : 
             'Primary Sales Goal'}
          </Label>
          <Select value={data.primaryGoal || ''} onValueChange={(value) => onChange('primaryGoal', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select primary goal" />
            </SelectTrigger>
            <SelectContent>
              {primaryGoalOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentChallenges">
            {businessType === 'ecommerce' ? 'Biggest E-commerce Challenges' : 
             businessType === 'agency' ? 'Biggest Agency Challenges' : 
             'Biggest Sales Challenges'}
          </Label>
          <Textarea
            id="currentChallenges"
            placeholder={
              businessType === 'ecommerce' ? 'e.g., Low conversion rates, high cart abandonment, customer acquisition costs' :
              businessType === 'agency' ? 'e.g., Client acquisition, proving ROI, scaling operations, retaining clients' :
              'e.g., Generating qualified leads, long sales cycles, competition, pricing objections'
            }
            value={data.currentChallenges || ''}
            onChange={(e) => onChange('currentChallenges', e.target.value)}
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInformationForm;
