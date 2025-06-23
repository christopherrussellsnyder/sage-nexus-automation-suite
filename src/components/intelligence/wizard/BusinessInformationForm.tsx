
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
        <CardDescription>Tell us about your business to generate personalized intelligence</CardDescription>
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
            <Label htmlFor="industry">Industry</Label>
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
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Input
            id="targetAudience"
            placeholder="e.g., Small business owners, Young professionals"
            value={data.targetAudience || ''}
            onChange={(e) => onChange('targetAudience', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productService">Product/Service Description</Label>
          <Textarea
            id="productService"
            placeholder="Describe what you offer and your unique value proposition"
            value={data.productService || ''}
            onChange={(e) => onChange('productService', e.target.value)}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInformationForm;
