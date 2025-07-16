import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

interface ClientCurrentMetricsFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
  businessType: 'agency' | 'copywriting';
}

const ClientCurrentMetricsForm = ({ data, onChange, businessType }: ClientCurrentMetricsFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Client Current Metrics</span>
        </CardTitle>
        <CardDescription>
          Help us understand your client's current performance to provide better recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Marketing Metrics */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Current Marketing Performance
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientCurrentTraffic">Monthly Website Traffic</Label>
              <Input
                id="clientCurrentTraffic"
                value={data.clientMetrics?.currentTraffic || ''}
                onChange={(e) => onChange('clientMetrics.currentTraffic', e.target.value)}
                placeholder="e.g., 10,000 visitors"
              />
            </div>
            
            <div>
              <Label htmlFor="clientConversionRate">Current Conversion Rate</Label>
              <Input
                id="clientConversionRate"
                value={data.clientMetrics?.conversionRate || ''}
                onChange={(e) => onChange('clientMetrics.conversionRate', e.target.value)}
                placeholder="e.g., 2.5%"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="clientEmailSubscribers">Email Subscribers</Label>
              <Input
                id="clientEmailSubscribers"
                value={data.clientMetrics?.emailSubscribers || ''}
                onChange={(e) => onChange('clientMetrics.emailSubscribers', e.target.value)}
                placeholder="e.g., 5,000"
              />
            </div>
            
            <div>
              <Label htmlFor="clientEmailOpenRate">Email Open Rate</Label>
              <Input
                id="clientEmailOpenRate"
                value={data.clientMetrics?.emailOpenRate || ''}
                onChange={(e) => onChange('clientMetrics.emailOpenRate', e.target.value)}
                placeholder="e.g., 25%"
              />
            </div>
          </div>
        </div>

        {/* Current Sales Metrics */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Current Sales Performance
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientMonthlyLeads">Monthly Leads Generated</Label>
              <Input
                id="clientMonthlyLeads"
                value={data.clientMetrics?.monthlyLeads || ''}
                onChange={(e) => onChange('clientMetrics.monthlyLeads', e.target.value)}
                placeholder="e.g., 100 leads"
              />
            </div>
            
            <div>
              <Label htmlFor="clientLeadToSale">Lead to Sale Conversion</Label>
              <Input
                id="clientLeadToSale"
                value={data.clientMetrics?.leadToSaleConversion || ''}
                onChange={(e) => onChange('clientMetrics.leadToSaleConversion', e.target.value)}
                placeholder="e.g., 15%"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="clientAverageOrderValue">Average Order Value</Label>
              <Input
                id="clientAverageOrderValue"
                value={data.clientMetrics?.averageOrderValue || ''}
                onChange={(e) => onChange('clientMetrics.averageOrderValue', e.target.value)}
                placeholder="e.g., $150"
              />
            </div>
            
            <div>
              <Label htmlFor="clientCustomerLifetimeValue">Customer Lifetime Value</Label>
              <Input
                id="clientCustomerLifetimeValue"
                value={data.clientMetrics?.customerLifetimeValue || ''}
                onChange={(e) => onChange('clientMetrics.customerLifetimeValue', e.target.value)}
                placeholder="e.g., $500"
              />
            </div>
          </div>
        </div>

        {/* Current Challenges */}
        <div>
          <Label htmlFor="clientCurrentChallenges">Biggest Marketing/Sales Challenges</Label>
          <Textarea
            id="clientCurrentChallenges"
            value={data.clientMetrics?.currentChallenges || ''}
            onChange={(e) => onChange('clientMetrics.currentChallenges', e.target.value)}
            placeholder="What are the main challenges your client is facing with their current marketing and sales efforts?"
            rows={4}
          />
        </div>

        {/* Previous Efforts */}
        <div>
          <Label htmlFor="clientPreviousEfforts">Previous Marketing Efforts</Label>
          <Textarea
            id="clientPreviousEfforts"
            value={data.clientMetrics?.previousEfforts || ''}
            onChange={(e) => onChange('clientMetrics.previousEfforts', e.target.value)}
            placeholder="What marketing strategies has your client tried before? What worked and what didn't?"
            rows={3}
          />
        </div>

        {/* Goals */}
        <div>
          <Label htmlFor="clientMetricGoals">Client's Metric Goals</Label>
          <Textarea
            id="clientMetricGoals"
            value={data.clientMetrics?.goals || ''}
            onChange={(e) => onChange('clientMetrics.goals', e.target.value)}
            placeholder="What specific metrics does your client want to improve? (e.g., double conversion rate, increase monthly revenue by 50%)"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCurrentMetricsForm;