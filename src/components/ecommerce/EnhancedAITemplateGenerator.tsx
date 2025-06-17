
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wand2, Sparkles, Zap, Target, Palette, Type, Layout } from 'lucide-react';

interface EnhancedAIOptions {
  businessType?: string;
  targetAudience?: string;
  contentTone?: string;
  industry?: string;
  colorPalette?: string;
  fontStyle?: string;
  layoutStyle?: string;
  language?: string;
  features?: string[];
  customTone?: string;
  seoFocused?: boolean;
  ecommerceFeatures?: boolean;
  multiLanguage?: boolean;
}

interface EnhancedAITemplateGeneratorProps {
  onGenerate: (prompt: string, options: EnhancedAIOptions) => void;
  isGenerating: boolean;
  progress: number;
}

const EnhancedAITemplateGenerator = ({
  onGenerate,
  isGenerating,
  progress
}: EnhancedAITemplateGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<EnhancedAIOptions>({
    businessType: 'ecommerce',
    targetAudience: 'general',
    contentTone: 'professional',
    industry: 'general',
    colorPalette: 'modern-blue',
    fontStyle: 'modern',
    layoutStyle: 'clean',
    language: 'en',
    features: [],
    seoFocused: true,
    ecommerceFeatures: true,
    multiLanguage: false
  });

  const businessTypes = [
    { value: 'ecommerce', label: '🛍️ E-commerce Store' },
    { value: 'saas', label: '💻 SaaS Platform' },
    { value: 'agency', label: '🏢 Agency/Services' },
    { value: 'portfolio', label: '🎨 Portfolio' },
    { value: 'blog', label: '📝 Blog/Magazine' },
    { value: 'restaurant', label: '🍽️ Restaurant' },
    { value: 'fitness', label: '💪 Fitness/Health' },
    { value: 'education', label: '🎓 Education' },
    { value: 'nonprofit', label: '❤️ Non-Profit' },
    { value: 'real-estate', label: '🏠 Real Estate' }
  ];

  const targetAudiences = [
    { value: 'general', label: 'General Public' },
    { value: 'millennials', label: 'Millennials (25-40)' },
    { value: 'gen-z', label: 'Gen Z (18-25)' },
    { value: 'professionals', label: 'Business Professionals' },
    { value: 'parents', label: 'Parents & Families' },
    { value: 'seniors', label: 'Seniors (55+)' },
    { value: 'students', label: 'Students' },
    { value: 'entrepreneurs', label: 'Entrepreneurs' }
  ];

  const contentTones = [
    { value: 'professional', label: '👔 Professional' },
    { value: 'friendly', label: '😊 Friendly & Casual' },
    { value: 'luxury', label: '✨ Luxury & Premium' },
    { value: 'playful', label: '🎉 Playful & Fun' },
    { value: 'minimalist', label: '🎯 Clean & Minimalist' },
    { value: 'bold', label: '💥 Bold & Energetic' },
    { value: 'trustworthy', label: '🤝 Trustworthy & Reliable' },
    { value: 'innovative', label: '🚀 Innovative & Modern' }
  ];

  const colorPalettes = [
    { value: 'modern-blue', label: '🔵 Modern Blue', colors: ['#3b82f6', '#8b5cf6'] },
    { value: 'warm-orange', label: '🟠 Warm Orange', colors: ['#f59e0b', '#ef4444'] },
    { value: 'nature-green', label: '🟢 Nature Green', colors: ['#10b981', '#059669'] },
    { value: 'luxury-purple', label: '🟣 Luxury Purple', colors: ['#8b5cf6', '#7c3aed'] },
    { value: 'sunset-gradient', label: '🌅 Sunset Gradient', colors: ['#f59e0b', '#ef4444'] },
    { value: 'ocean-blue', label: '🌊 Ocean Blue', colors: ['#0ea5e9', '#0284c7'] },
    { value: 'forest-green', label: '🌲 Forest Green', colors: ['#059669', '#047857'] },
    { value: 'rose-gold', label: '🌹 Rose Gold', colors: ['#f43f5e', '#ec4899'] }
  ];

  const industries = [
    { value: 'general', label: 'General Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'fashion', label: 'Fashion & Beauty' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'travel', label: 'Travel & Tourism' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports & Recreation' }
  ];

  const features = [
    { value: 'conversion-focused', label: 'Conversion Optimization' },
    { value: 'mobile-first', label: 'Mobile-First Design' },
    { value: 'accessibility', label: 'Accessibility Features' },
    { value: 'analytics', label: 'Analytics Integration' },
    { value: 'social-proof', label: 'Social Proof Elements' },
    { value: 'testimonials', label: 'Customer Testimonials' },
    { value: 'newsletter', label: 'Newsletter Signup' },
    { value: 'live-chat', label: 'Live Chat Support' },
    { value: 'multilingual', label: 'Multi-language Support' },
    { value: 'dark-mode', label: 'Dark Mode Toggle' }
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) {
      return;
    }
    onGenerate(prompt, options);
  };

  const updateOptions = (key: keyof EnhancedAIOptions, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (feature: string, checked: boolean) => {
    const currentFeatures = options.features || [];
    if (checked) {
      updateOptions('features', [...currentFeatures, feature]);
    } else {
      updateOptions('features', currentFeatures.filter(f => f !== feature));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5" />
            <span>AI Website Generator</span>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              Advanced AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isGenerating && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Generating your website...</span>
                <span className="text-sm">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div>
            <Label className="text-base font-semibold">Describe Your Website</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want your website to be about, your business goals, target customers, and any specific features you need..."
              className="mt-2 min-h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Business Type</span>
              </Label>
              <Select value={options.businessType} onValueChange={(value) => updateOptions('businessType', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Target Audience</Label>
              <Select value={options.targetAudience} onValueChange={(value) => updateOptions('targetAudience', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {targetAudiences.map((audience) => (
                    <SelectItem key={audience.value} value={audience.value}>
                      {audience.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Content Tone</span>
              </Label>
              <Select value={options.contentTone} onValueChange={(value) => updateOptions('contentTone', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTones.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Industry</Label>
              <Select value={options.industry} onValueChange={(value) => updateOptions('industry', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Color Palette</span>
              </Label>
              <Select value={options.colorPalette} onValue

Change={(value) => updateOptions('colorPalette', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorPalettes.map((palette) => (
                    <SelectItem key={palette.value} value={palette.value}>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {palette.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span>{palette.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center space-x-2">
                <Layout className="h-4 w-4" />
                <span>Layout Style</span>
              </Label>
              <Select value={options.layoutStyle} onValueChange={(value) => updateOptions('layoutStyle', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clean">Clean & Minimal</SelectItem>
                  <SelectItem value="modern">Modern & Bold</SelectItem>
                  <SelectItem value="classic">Classic & Traditional</SelectItem>
                  <SelectItem value="creative">Creative & Artistic</SelectItem>
                  <SelectItem value="corporate">Corporate & Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Advanced Features</Label>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={options.features?.includes(feature.value)}
                    onCheckedChange={(checked) => toggleFeature(feature.value, checked as boolean)}
                  />
                  <Label className="text-sm">{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={options.seoFocused}
                onCheckedChange={(checked) => updateOptions('seoFocused', checked)}
              />
              <Label>SEO Optimized</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={options.ecommerceFeatures}
                onCheckedChange={(checked) => updateOptions('ecommerceFeatures', checked)}
              />
              <Label>E-commerce Ready</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={options.multiLanguage}
                onCheckedChange={(checked) => updateOptions('multiLanguage', checked)}
              />
              <Label>Multi-language</Label>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating Website...' : 'Generate AI Website'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAITemplateGenerator;
