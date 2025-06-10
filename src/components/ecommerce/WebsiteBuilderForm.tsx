
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Globe, Sparkles } from 'lucide-react';

interface WebsiteData {
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  colorScheme: string;
  businessGoals: string;
  existingWebsite: string;
}

interface WebsiteBuilderFormProps {
  onGenerate: (data: WebsiteData) => void;
  isGenerating: boolean;
  progress: number;
}

const WebsiteBuilderForm = ({ onGenerate, isGenerating, progress }: WebsiteBuilderFormProps) => {
  const [formData, setFormData] = useState<WebsiteData>({
    businessName: '',
    businessDescription: '',
    industry: '',
    targetAudience: '',
    colorScheme: '',
    businessGoals: '',
    existingWebsite: ''
  });

  const industries = [
    'Fashion & Apparel', 'Electronics & Tech', 'Food & Beverage', 'Health & Beauty',
    'Home & Garden', 'Sports & Fitness', 'Automotive', 'Education', 'Professional Services',
    'Real Estate', 'Financial Services', 'Entertainment', 'Travel & Tourism', 'Other'
  ];

  const colorSchemes = [
    'Professional Blue', 'Modern Black & White', 'Vibrant Green', 'Elegant Purple',
    'Warm Orange', 'Cool Gray', 'Bold Red', 'Calming Teal', 'Custom Colors'
  ];

  const businessGoals = [
    'Increase Online Sales', 'Generate More Leads', 'Build Brand Awareness',
    'Improve Customer Engagement', 'Showcase Portfolio', 'Provide Information'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const updateField = (field: keyof WebsiteData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.businessName && formData.businessDescription && 
                     formData.industry && formData.targetAudience;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>AI Website Builder</span>
        </CardTitle>
        <CardDescription>
          Tell us about your business and we'll create a custom website in minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description *</Label>
            <Textarea
              id="businessDescription"
              placeholder="Describe what your business does and what makes it unique"
              value={formData.businessDescription}
              onChange={(e) => updateField('businessDescription', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Select value={formData.industry} onValueChange={(value) => updateField('industry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience *</Label>
            <Input
              id="targetAudience"
              placeholder="e.g., Young professionals, Families with children, Small business owners"
              value={formData.targetAudience}
              onChange={(e) => updateField('targetAudience', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="colorScheme">Preferred Color Scheme</Label>
            <Select value={formData.colorScheme} onValueChange={(value) => updateField('colorScheme', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a color scheme" />
              </SelectTrigger>
              <SelectContent>
                {colorSchemes.map((scheme) => (
                  <SelectItem key={scheme} value={scheme}>
                    {scheme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessGoals">Primary Business Goal</Label>
            <Select value={formData.businessGoals} onValueChange={(value) => updateField('businessGoals', value)}>
              <SelectTrigger>
                <SelectValue placeholder="What's your main goal?" />
              </SelectTrigger>
              <SelectContent>
                {businessGoals.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="existingWebsite">Existing Website (Optional)</Label>
            <Input
              id="existingWebsite"
              placeholder="https://yourwebsite.com (for style analysis)"
              value={formData.existingWebsite}
              onChange={(e) => updateField('existingWebsite', e.target.value)}
            />
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating your website...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={!isFormValid || isGenerating}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating Website...' : 'Generate My Website'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WebsiteBuilderForm;
