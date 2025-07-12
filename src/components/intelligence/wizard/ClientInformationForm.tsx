
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Users, Building, Target } from 'lucide-react';

interface ClientInformationFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
  businessType: 'ecommerce' | 'agency' | 'sales' | 'copywriting';
  onSkip?: () => void;
}

const ClientInformationForm = ({ data, onChange, businessType, onSkip }: ClientInformationFormProps) => {
  const getFormTitle = () => {
    switch (businessType) {
      case 'agency':
        return 'Client Information';
      case 'sales':
        return 'Ideal Customer Profile';
      case 'copywriting':
        return 'Client Details';
      default:
        return 'Customer Information';
    }
  };

  const getFormDescription = () => {
    switch (businessType) {
      case 'agency':
        return 'Tell us about the client you\'re providing marketing services for';
      case 'sales':
        return 'Describe your ideal customer and who you want to sell to';
      case 'copywriting':
        return 'Provide details about the client you\'re writing copy for';
      default:
        return 'Customer information for better targeting';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>{getFormTitle()}</span>
        </CardTitle>
        <CardDescription>{getFormDescription()}</CardDescription>
        {businessType === 'agency' && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={onSkip} size="sm">
              Skip - Focus on Agency Growth
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {businessType === 'sales' ? (
          // Sales - Ideal Customer Profile
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerType">Customer Type</Label>
                <Select onValueChange={(value) => onChange('idealCustomerProfile.customerType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b2b">B2B (Business)</SelectItem>
                    <SelectItem value="b2c">B2C (Consumer)</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="small-business">Small Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="customerIndustry">Customer Industry</Label>
                <Input
                  id="customerIndustry"
                  value={data.idealCustomerProfile?.customerIndustry || ''}
                  onChange={(e) => onChange('idealCustomerProfile.customerIndustry', e.target.value)}
                  placeholder="e.g., Healthcare, Real Estate, Finance"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="productToSell">Product/Service You're Selling</Label>
              <Input
                id="productToSell"
                value={data.productToSell || ''}
                onChange={(e) => onChange('productToSell', e.target.value)}
                placeholder="e.g., Life Insurance, Solar Panels, Software Solution"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="averageDealSize">Average Deal Size</Label>
                <Input
                  id="averageDealSize"
                  value={data.idealCustomerProfile?.averageDealSize || ''}
                  onChange={(e) => onChange('idealCustomerProfile.averageDealSize', e.target.value)}
                  placeholder="e.g., $5,000"
                />
              </div>
              
              <div>
                <Label htmlFor="salesCycle">Sales Cycle Length</Label>
                <Select onValueChange={(value) => onChange('idealCustomerProfile.salesCycle', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sales cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-4-weeks">2-4 Weeks</SelectItem>
                    <SelectItem value="1-3-months">1-3 Months</SelectItem>
                    <SelectItem value="3-6-months">3-6 Months</SelectItem>
                    <SelectItem value="6-months-plus">6+ Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="customerDescription">Ideal Customer Description</Label>
              <Textarea
                id="customerDescription"
                value={data.idealCustomerProfile?.description || ''}
                onChange={(e) => onChange('idealCustomerProfile.description', e.target.value)}
                placeholder="Describe your ideal customer's demographics, pain points, decision-making process..."
                rows={4}
              />
            </div>
          </>
        ) : (
          // Agency/Copywriting - Client Information
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientBusinessName">Client Business Name</Label>
                <Input
                  id="clientBusinessName"
                  value={data.clientDetails?.businessName || ''}
                  onChange={(e) => onChange('clientDetails.businessName', e.target.value)}
                  placeholder="Client's business name"
                />
              </div>
              
              <div>
                <Label htmlFor="clientIndustry">Client Industry</Label>
                <Select onValueChange={(value) => onChange('clientDetails.industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="fitness">Fitness & Health</SelectItem>
                    <SelectItem value="coaching">Coaching & Consulting</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="clientTargetAudience">Client's Target Audience</Label>
              <Input
                id="clientTargetAudience"
                value={data.clientDetails?.targetAudience || ''}
                onChange={(e) => onChange('clientDetails.targetAudience', e.target.value)}
                placeholder="Who is your client trying to reach?"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientMonthlyRevenue">Client Monthly Revenue</Label>
                <Input
                  id="clientMonthlyRevenue"
                  value={data.clientDetails?.monthlyRevenue || ''}
                  onChange={(e) => onChange('clientDetails.monthlyRevenue', e.target.value)}
                  placeholder="e.g., $50,000"
                />
              </div>
              
              <div>
                <Label htmlFor="clientMarketingBudget">Client Marketing Budget</Label>
                <Input
                  id="clientMarketingBudget"
                  value={data.clientDetails?.marketingBudget || ''}
                  onChange={(e) => onChange('clientDetails.marketingBudget', e.target.value)}
                  placeholder="e.g., $10,000"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="clientGoals">Client Goals & Objectives</Label>
              <Textarea
                id="clientGoals"
                value={data.clientDetails?.goals || ''}
                onChange={(e) => onChange('clientDetails.goals', e.target.value)}
                placeholder="What does your client want to achieve?"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="clientChallenges">Client Current Challenges</Label>
              <Textarea
                id="clientChallenges"
                value={data.clientDetails?.challenges || ''}
                onChange={(e) => onChange('clientDetails.challenges', e.target.value)}
                placeholder="What challenges is your client facing?"
                rows={3}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientInformationForm;
