
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wand2, Shuffle, RefreshCw, Palette, Type, Globe, Sparkles } from 'lucide-react';

interface AITemplateGeneratorProps {
  onGenerate: (prompt: string, options: AIGenerationOptions) => void;
  isGenerating: boolean;
  progress: number;
}

interface AIGenerationOptions {
  colorPalette?: string;
  fontStyle?: string;
  layoutStyle?: string;
  businessType?: string;
  regenerate?: boolean;
}

const AITemplateGenerator = ({ onGenerate, isGenerating, progress }: AITemplateGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<AIGenerationOptions>({
    colorPalette: 'modern-blue',
    fontStyle: 'clean-sans',
    layoutStyle: 'modern',
    businessType: 'general'
  });

  const colorPalettes = [
    { id: 'modern-blue', name: 'Modern Blue', colors: ['#3B82F6', '#1E40AF', '#F8FAFC'] },
    { id: 'elegant-purple', name: 'Elegant Purple', colors: ['#8B5CF6', '#7C3AED', '#F3F4F6'] },
    { id: 'warm-orange', name: 'Warm Orange', colors: ['#F97316', '#EA580C', '#FEF3C7'] },
    { id: 'nature-green', name: 'Nature Green', colors: ['#10B981', '#059669', '#ECFDF5'] },
    { id: 'minimal-gray', name: 'Minimal Gray', colors: ['#6B7280', '#374151', '#F9FAFB'] }
  ];

  const fontStyles = [
    { id: 'clean-sans', name: 'Clean Sans-Serif', preview: 'Aa' },
    { id: 'modern-serif', name: 'Modern Serif', preview: 'Aa' },
    { id: 'tech-mono', name: 'Tech Monospace', preview: 'Aa' },
    { id: 'creative-display', name: 'Creative Display', preview: 'Aa' }
  ];

  const layoutStyles = [
    { id: 'modern', name: 'Modern Minimal', description: 'Clean, spacious layouts with bold typography' },
    { id: 'creative', name: 'Creative Agency', description: 'Dynamic layouts with creative elements' },
    { id: 'corporate', name: 'Corporate Professional', description: 'Traditional business layouts' },
    { id: 'startup', name: 'Startup Landing', description: 'Conversion-focused startup pages' }
  ];

  const promptSuggestions = [
    "Create a modern portfolio website for a graphic designer with a dark theme and bold typography",
    "Design a landing page for a tech startup with clean aesthetics and conversion-focused layout",
    "Build a professional service website with elegant styling and client testimonial sections",
    "Generate a creative agency site with dynamic layouts and vibrant color schemes",
    "Create an e-commerce store with product showcases and modern shopping experience"
  ];

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt, selectedOptions);
    }
  };

  const handleShuffle = (type: 'color' | 'font' | 'layout') => {
    if (type === 'color') {
      const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      setSelectedOptions(prev => ({ ...prev, colorPalette: randomPalette.id }));
    } else if (type === 'font') {
      const randomFont = fontStyles[Math.floor(Math.random() * fontStyles.length)];
      setSelectedOptions(prev => ({ ...prev, fontStyle: randomFont.id }));
    } else if (type === 'layout') {
      const randomLayout = layoutStyles[Math.floor(Math.random() * layoutStyles.length)];
      setSelectedOptions(prev => ({ ...prev, layoutStyle: randomLayout.id }));
    }
  };

  const handleRegenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt, { ...selectedOptions, regenerate: true });
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wand2 className="h-5 w-5" />
          <span>AI Template Generator</span>
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Powered by AI
          </Badge>
        </CardTitle>
        <CardDescription>
          Describe your vision and let AI create a complete website in seconds
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* AI Prompt Input */}
        <div className="space-y-3">
          <Label htmlFor="aiPrompt" className="text-base font-medium">
            Describe Your Website Vision
          </Label>
          <div className="relative">
            <Input
              id="aiPrompt"
              placeholder="e.g., Create a modern portfolio for a photographer with dark theme..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="pr-12 min-h-[60px] resize-none"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-2"
              onClick={() => setPrompt(promptSuggestions[Math.floor(Math.random() * promptSuggestions.length)])}
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.slice(0, 2).map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-1 px-2"
                onClick={() => setPrompt(suggestion)}
              >
                {suggestion.length > 50 ? suggestion.slice(0, 50) + '...' : suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Style Customization */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>Style Customization</span>
          </h4>
          
          {/* Color Palette Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Color Palette</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShuffle('color')}
                className="h-6 px-2"
              >
                <Shuffle className="h-3 w-3" />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {colorPalettes.map((palette) => (
                <button
                  key={palette.id}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    selectedOptions.colorPalette === palette.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, colorPalette: palette.id }))}
                >
                  <div className="flex space-x-1">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-xs mt-1 truncate">{palette.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Font Style Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Typography</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShuffle('font')}
                className="h-6 px-2"
              >
                <Shuffle className="h-3 w-3" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {fontStyles.map((font) => (
                <button
                  key={font.id}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedOptions.fontStyle === font.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, fontStyle: font.id }))}
                >
                  <div className="text-lg font-bold mb-1">{font.preview}</div>
                  <p className="text-xs text-muted-foreground">{font.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Layout Style Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Layout Style</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShuffle('layout')}
                className="h-6 px-2"
              >
                <Shuffle className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-2">
              {layoutStyles.map((layout) => (
                <button
                  key={layout.id}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedOptions.layoutStyle === layout.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, layoutStyle: layout.id }))}
                >
                  <div className="font-medium">{layout.name}</div>
                  <p className="text-xs text-muted-foreground mt-1">{layout.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Generating your AI-powered website...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              ✨ AI is crafting your perfect design in ~15 seconds
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="flex-1"
            size="lg"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </Button>
          
          {!isGenerating && (
            <Button
              variant="outline"
              onClick={handleRegenerate}
              disabled={!prompt.trim()}
              size="lg"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
          <h5 className="font-medium mb-2 flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>AI-Powered Features</span>
          </h5>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>• Instant 15-second generation</div>
            <div>• Responsive breakpoints</div>
            <div>• Brand voice consistency</div>
            <div>• Advanced customization</div>
            <div>• Multiple regeneration options</div>
            <div>• Professional quality output</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AITemplateGenerator;
