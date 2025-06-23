
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BusinessInformationFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const BusinessInformationForm = ({ data, onChange }: BusinessInformationFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>Tell us about your business to generate personalized intelligence and content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Your business name"
              value={data.businessName || ''}
              onChange={(e) => onChange('businessName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry/Niche</Label>
            <Select value={data.industry || ''} onValueChange={(value) => onChange('industry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="fitness">Fitness & Health</SelectItem>
                <SelectItem value="coaching">Coaching & Consulting</SelectItem>
                <SelectItem value="agency">Marketing Agency</SelectItem>
                <SelectItem value="finance">Finance & Investment</SelectItem>
                <SelectItem value="education">Education & Training</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="restaurant">Restaurant & Food</SelectItem>
                <SelectItem value="retail">Retail & Fashion</SelectItem>
                <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
                <SelectItem value="technology">Technology & IT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience">Target Audience (be specific)</Label>
          <Input
            id="targetAudience"
            placeholder="e.g., Small business owners aged 25-45, busy working mothers, tech startups"
            value={data.targetAudience || ''}
            onChange={(e) => onChange('targetAudience', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productService">Product/Service Description</Label>
          <Textarea
            id="productService"
            placeholder="Describe what you offer, your unique value proposition, and main benefits"
            value={data.productService || ''}
            onChange={(e) => onChange('productService', e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
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
            <Label htmlFor="monthlyAdBudget">Monthly Advertising Budget</Label>
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
            <Label htmlFor="teamSize">Team Size</Label>
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
            <Label htmlFor="businessStage">Business Stage</Label>
            <Select value={data.businessStage || ''} onValueChange={(value) => onChange('businessStage', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startup">Startup (0-2 years)</SelectItem>
                <SelectItem value="growth">Growth (2-5 years)</SelectItem>
                <SelectItem value="established">Established (5+ years)</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryGoal">Primary Business Goal</Label>
          <Select value={data.primaryGoal || ''} onValueChange={(value) => onChange('primaryGoal', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select primary goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="increase-sales">Increase Sales & Revenue</SelectItem>
              <SelectItem value="brand-awareness">Build Brand Awareness</SelectItem>
              <SelectItem value="lead-generation">Generate More Leads</SelectItem>
              <SelectItem value="customer-retention">Improve Customer Retention</SelectItem>
              <SelectItem value="market-expansion">Expand to New Markets</SelectItem>
              <SelectItem value="reduce-costs">Reduce Marketing Costs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contentPreference">Preferred Content Type for Intelligence</Label>
          <Select value={data.contentPreference || ''} onValueChange={(value) => onChange('contentPreference', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select content focus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Website Copy & Landing Pages</SelectItem>
              <SelectItem value="ads">Advertising & Paid Campaigns</SelectItem>
              <SelectItem value="email">Email Marketing Sequences</SelectItem>
              <SelectItem value="social">Social Media Content</SelectItem>
              <SelectItem value="mixed">Mixed Content Strategy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentChallenges">Biggest Marketing Challenges</Label>
          <Textarea
            id="currentChallenges"
            placeholder="Describe your current marketing challenges and what you'd like to improve"
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
