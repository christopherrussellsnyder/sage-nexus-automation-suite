
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Target, Users, DollarSign, Globe } from 'lucide-react';
import { QualificationCriteria } from '@/types/emailSequence';

interface QualificationBuilderProps {
  criteria: QualificationCriteria;
  onChange: (criteria: QualificationCriteria) => void;
  type: 'agency' | 'sales';
}

const QualificationBuilder = ({ criteria, onChange, type }: QualificationBuilderProps) => {
  const [newIndustry, setNewIndustry] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [customFieldName, setCustomFieldName] = useState('');
  const [customFieldValue, setCustomFieldValue] = useState('');

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Manufacturing', 
    'Education', 'Real Estate', 'Consulting', 'Marketing', 'Legal',
    'Retail', 'Hospitality', 'Automotive', 'Energy', 'Media'
  ];

  const budgetRanges = type === 'agency' 
    ? ['$1K-$5K', '$5K-$15K', '$15K-$50K', '$50K-$100K', '$100K+']
    : ['$1K-$10K', '$10K-$25K', '$25K-$50K', '$50K-$100K', '$100K+'];

  const addIndustry = () => {
    if (newIndustry && !criteria.industry.includes(newIndustry)) {
      onChange({
        ...criteria,
        industry: [...criteria.industry, newIndustry]
      });
      setNewIndustry('');
    }
  };

  const removeIndustry = (industry: string) => {
    onChange({
      ...criteria,
      industry: criteria.industry.filter(i => i !== industry)
    });
  };

  const addLocation = () => {
    if (newLocation && !criteria.geography.includes(newLocation)) {
      onChange({
        ...criteria,
        geography: [...criteria.geography, newLocation]
      });
      setNewLocation('');
    }
  };

  const removeLocation = (location: string) => {
    onChange({
      ...criteria,
      geography: criteria.geography.filter(g => g !== location)
    });
  };

  const addCustomField = () => {
    if (customFieldName && customFieldValue) {
      onChange({
        ...criteria,
        customFields: {
          ...criteria.customFields,
          [customFieldName]: customFieldValue
        }
      });
      setCustomFieldName('');
      setCustomFieldValue('');
    }
  };

  const removeCustomField = (fieldName: string) => {
    const { [fieldName]: removed, ...rest } = criteria.customFields;
    onChange({
      ...criteria,
      customFields: rest
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Lead Qualification Criteria</span>
        </CardTitle>
        <CardDescription>
          Define your ideal {type === 'agency' ? 'client' : 'prospect'} profile for targeted email sequences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Size */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Company Size</span>
          </Label>
          <Select value={criteria.companySize} onValueChange={(value: any) => onChange({ ...criteria, companySize: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
              <SelectItem value="small">Small Business (11-50 employees)</SelectItem>
              <SelectItem value="medium">Medium Business (51-200 employees)</SelectItem>
              <SelectItem value="enterprise">Enterprise (200+ employees)</SelectItem>
              <SelectItem value="any">Any Size</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget Range */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Budget Range</span>
          </Label>
          <Select value={criteria.budgetRange} onValueChange={(value) => onChange({ ...criteria, budgetRange: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map(range => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Industries */}
        <div className="space-y-2">
          <Label>Target Industries</Label>
          <div className="flex space-x-2">
            <Select value={newIndustry} onValueChange={setNewIndustry}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addIndustry} disabled={!newIndustry}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {criteria.industry.map(industry => (
              <Badge key={industry} variant="secondary" className="flex items-center space-x-1">
                <span>{industry}</span>
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeIndustry(industry)} />
              </Badge>
            ))}
          </div>
        </div>

        {/* Geography */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Geographic Locations</span>
          </Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter location (e.g., North America, Europe, NYC)"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addLocation} disabled={!newLocation}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {criteria.geography.map(location => (
              <Badge key={location} variant="secondary" className="flex items-center space-x-1">
                <span>{location}</span>
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeLocation(location)} />
              </Badge>
            ))}
          </div>
        </div>

        {/* Engagement Level */}
        <div className="space-y-2">
          <Label>Engagement Level</Label>
          <Select value={criteria.engagementLevel} onValueChange={(value: any) => onChange({ ...criteria, engagementLevel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select engagement level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cold">Cold (No previous interaction)</SelectItem>
              <SelectItem value="warm">Warm (Some engagement/referral)</SelectItem>
              <SelectItem value="hot">Hot (High interest/requested info)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Custom Fields */}
        <div className="space-y-2">
          <Label>Custom Qualification Fields</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="Field name"
              value={customFieldName}
              onChange={(e) => setCustomFieldName(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Required value"
              value={customFieldValue}
              onChange={(e) => setCustomFieldValue(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addCustomField} disabled={!customFieldName || !customFieldValue}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {Object.entries(criteria.customFields).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm"><strong>{key}:</strong> {value}</span>
                <X className="h-4 w-4 cursor-pointer text-red-500" onClick={() => removeCustomField(key)} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualificationBuilder;
