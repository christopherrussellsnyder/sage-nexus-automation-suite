
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wand2, Shuffle, RefreshCw, Palette, Type, Globe, Sparkles, 
  Brain, Store, Users, Target, Languages, Zap, ShoppingBag,
  TrendingUp, Search, MessageSquare, Camera
} from 'lucide-react';

interface EnhancedAIGeneratorProps {
  onGenerate: (prompt: string, options: EnhancedAIOptions) => void;
  isGenerating: boolean;
  progress: number;
}

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

const EnhancedAITemplateGenerator = ({ onGenerate, isGenerating, progress }: EnhancedAIGeneratorProps) => {
  const [activeTab, setActiveTab] = useState<'business' | 'design' | 'content' | 'features'>('business');
  const [businessDescription, setBusinessDescription] = useState('');
  const [options, setOptions] = useState<EnhancedAIOptions>({
    businessType: 'ecommerce',
    targetAudience: 'general',
    contentTone: 'professional',
    industry: 'general',
    colorPalette: 'modern-blue',
    fontStyle: 'clean-sans',
    layoutStyle: 'modern',
    language: 'english',
    features: [],
    seoFocused: true,
    ecommerceFeatures: false,
    multiLanguage: false
  });

  const businessTypes = [
    { id: 'ecommerce', name: 'E-commerce Store', icon: ShoppingBag },
    { id: 'portfolio', name: 'Portfolio/Personal', icon: Users },
    { id: 'startup', name: 'Startup Landing', icon: TrendingUp },
    { id: 'service', name: 'Service Business', icon: Target },
    { id: 'blog', name: 'Blog/Content', icon: MessageSquare },
    { id: 'agency', name: 'Creative Agency', icon: Camera }
  ];

  const industries = [
    'Technology', 'Fashion', 'Health & Wellness', 'Food & Beverage',
    'Real Estate', 'Education', 'Finance', 'Travel', 'Arts & Crafts',
    'Beauty & Cosmetics', 'Sports & Fitness', 'Home & Garden'
  ];

  const contentTones = [
    { id: 'professional', name: 'Professional', description: 'Formal, trustworthy, expert' },
    { id: 'friendly', name: 'Friendly', description: 'Warm, approachable, conversational' },
    { id: 'bold', name: 'Bold', description: 'Confident, assertive, energetic' },
    { id: 'luxury', name: 'Luxury', description: 'Elegant, sophisticated, premium' },
    { id: 'playful', name: 'Playful', description: 'Fun, creative, casual' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple, focused' }
  ];

  const aiFeatures = [
    { id: 'seo-optimization', name: 'SEO Optimization', description: 'Auto-generated meta tags and descriptions' },
    { id: 'responsive-design', name: 'Responsive Design', description: 'Mobile, tablet, desktop breakpoints' },
    { id: 'performance-optimized', name: 'Performance Optimized', description: 'Fast loading and efficient code' },
    { id: 'accessibility', name: 'Accessibility Ready', description: 'WCAG compliant structure' },
    { id: 'conversion-focused', name: 'Conversion Focused', description: 'CTA optimization and user flow' },
    { id: 'brand-consistent', name: 'Brand Consistency', description: 'Cohesive visual identity' }
  ];

  const handleGenerate = () => {
    if (businessDescription.trim()) {
      onGenerate(businessDescription, options);
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setOptions(prev => ({
      ...prev,
      features: prev.features?.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...(prev.features || []), featureId]
    }));
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>Enhanced AI Website Generator</span>
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Framer + Shopify AI
          </Badge>
        </CardTitle>
        <CardDescription>
          Advanced AI-powered website generation with business intelligence and design automation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="business" className="text-xs">Business</TabsTrigger>
            <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
            <TabsTrigger value="features" className="text-xs">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="businessDesc" className="text-base font-medium">
                Describe Your Business
              </Label>
              <Textarea
                id="businessDesc"
                placeholder="e.g., I run a sustainable fashion brand that sells eco-friendly clothing for young professionals. We focus on quality, style, and environmental responsibility..."
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Business Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {businessTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        options.businessType === type.id
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setOptions(prev => ({ ...prev, businessType: type.id }))}
                    >
                      <type.icon className="h-4 w-4 mb-1" />
                      <p className="text-xs font-medium">{type.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Select value={options.industry} onValueChange={(value) => setOptions(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry.toLowerCase()}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Layout Style</Label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'modern', name: 'Modern Minimal', desc: 'Clean, spacious, bold typography' },
                    { id: 'shopify-dawn', name: 'Shopify Dawn Style', desc: 'E-commerce optimized, conversion-focused' },
                    { id: 'framer-portfolio', name: 'Framer Portfolio', desc: 'Creative, dynamic, interactive' },
                    { id: 'startup-landing', name: 'Startup Landing', desc: 'High-converting, feature-rich' }
                  ].map((layout) => (
                    <button
                      key={layout.id}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        options.layoutStyle === layout.id
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setOptions(prev => ({ ...prev, layoutStyle: layout.id }))}
                    >
                      <div className="font-medium text-sm">{layout.name}</div>
                      <p className="text-xs text-muted-foreground">{layout.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Content Tone & Voice</Label>
                <div className="grid grid-cols-2 gap-2">
                  {contentTones.map((tone) => (
                    <button
                      key={tone.id}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        options.contentTone === tone.id
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setOptions(prev => ({ ...prev, contentTone: tone.id }))}
                    >
                      <div className="font-medium text-sm">{tone.name}</div>
                      <p className="text-xs text-muted-foreground">{tone.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Custom Tone (Optional)</Label>
                <Input
                  placeholder="e.g., witty and informative with a tech-savvy edge"
                  value={options.customTone || ''}
                  onChange={(e) => setOptions(prev => ({ ...prev, customTone: e.target.value }))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>AI-Powered Features</Label>
                <div className="space-y-2">
                  {aiFeatures.map((feature) => (
                    <button
                      key={feature.id}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        options.features?.includes(feature.id)
                          ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleFeatureToggle(feature.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{feature.name}</div>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                        {options.features?.includes(feature.id) && (
                          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.seoFocused}
                    onChange={(e) => setOptions(prev => ({ ...prev, seoFocused: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">SEO Optimization (meta tags, descriptions)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.ecommerceFeatures}
                    onChange={(e) => setOptions(prev => ({ ...prev, ecommerceFeatures: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">E-commerce Features (cart, checkout, products)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.multiLanguage}
                    onChange={(e) => setOptions(prev => ({ ...prev, multiLanguage: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Multi-language Support</span>
                </label>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Generation Progress */}
        {isGenerating && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Generating your enhanced AI website...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              🧠 AI is analyzing your business and crafting the perfect design...
            </div>
          </div>
        )}

        {/* Generate Button */}
        <Button 
          onClick={handleGenerate}
          disabled={!businessDescription.trim() || isGenerating}
          className="w-full"
          size="lg"
        >
          <Brain className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating Enhanced Website...' : 'Generate with Enhanced AI'}
        </Button>

        {/* AI Capabilities Showcase */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 p-4 rounded-lg border">
          <h5 className="font-medium mb-2 flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span>Enhanced AI Capabilities</span>
          </h5>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>• Business Intelligence Analysis</div>
            <div>• Multi-breakpoint Generation</div>
            <div>• SEO & Performance Optimization</div>
            <div>• Brand Voice Consistency</div>
            <div>• Shopify-grade E-commerce</div>
            <div>• Framer-level Interactivity</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedAITemplateGenerator;
