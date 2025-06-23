
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface CurrentMetricsFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
  businessType: string;
}

const CurrentMetricsForm = ({ data, onChange, businessType }: CurrentMetricsFormProps) => {
  const getMetricFields = () => {
    const commonFields = [
      { key: 'monthlyTraffic', label: 'Monthly Website Traffic', placeholder: 'e.g., 10000', type: 'number' },
      { key: 'conversionRate', label: 'Conversion Rate (%)', placeholder: 'e.g., 2.5', type: 'number' },
      { key: 'marketingBudget', label: 'Monthly Marketing Budget ($)', placeholder: 'e.g., 5000', type: 'number' }
    ];

    const specificFields = {
      ecommerce: [
        { key: 'averageOrderValue', label: 'Average Order Value ($)', placeholder: 'e.g., 85', type: 'number' },
        { key: 'cartAbandonmentRate', label: 'Cart Abandonment Rate (%)', placeholder: 'e.g., 70', type: 'number' }
      ],
      agency: [
        { key: 'clientRetentionRate', label: 'Client Retention Rate (%)', placeholder: 'e.g., 85', type: 'number' },
        { key: 'averageProjectValue', label: 'Average Project Value ($)', placeholder: 'e.g., 5000', type: 'number' }
      ],
      sales: [
        { key: 'leadConversionRate', label: 'Lead Conversion Rate (%)', placeholder: 'e.g., 15', type: 'number' },
        { key: 'averageDealSize', label: 'Average Deal Size ($)', placeholder: 'e.g., 2500', type: 'number' }
      ],
      copywriting: [
        { key: 'emailOpenRate', label: 'Email Open Rate (%)', placeholder: 'e.g., 25', type: 'number' },
        { key: 'adClickThroughRate', label: 'Ad Click-Through Rate (%)', placeholder: 'e.g., 2.1', type: 'number' }
      ]
    };

    return [...commonFields, ...(specificFields[businessType as keyof typeof specificFields] || [])];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Current Performance Metrics</span>
          <Badge variant="outline">{businessType.charAt(0).toUpperCase() + businessType.slice(1)}</Badge>
        </CardTitle>
        <CardDescription>
          Share your current metrics to identify optimization opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {getMetricFields().map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                id={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={data[field.key] || ''}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentChallenges">Primary Business Challenges</Label>
          <Select value={data.currentChallenges || ''} onValueChange={(value) => onChange('currentChallenges', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your biggest challenge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low-conversion">Low Conversion Rates</SelectItem>
              <SelectItem value="high-acquisition-cost">High Customer Acquisition Cost</SelectItem>
              <SelectItem value="poor-retention">Poor Customer Retention</SelectItem>
              <SelectItem value="low-traffic">Low Website Traffic</SelectItem>
              <SelectItem value="ineffective-marketing">Ineffective Marketing Campaigns</SelectItem>
              <SelectItem value="poor-copy-performance">Poor Copy Performance</SelectItem>
              <SelectItem value="scaling-challenges">Scaling Challenges</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentMetricsForm;
